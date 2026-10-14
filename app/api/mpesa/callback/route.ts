import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type CallbackItem = {
  Name?: string;
  Value?: string | number;
};

function getCallbackValue(
  items: CallbackItem[],
  name: string
): string | number | null {
  const item = items.find((entry) => entry.Name === name);

  if (!item || item.Value === undefined || item.Value === null) {
    return null;
  }

  return item.Value;
}

function parseMpesaTransactionDate(
  value: string | number | null
): string | null {
  if (!value) {
    return null;
  }

  const raw = String(value);

  // Expected M-Pesa format: YYYYMMDDHHmmss
  if (!/^\d{14}$/.test(raw)) {
    return null;
  }

  const year = Number(raw.slice(0, 4));
  const month = Number(raw.slice(4, 6));
  const day = Number(raw.slice(6, 8));
  const hour = Number(raw.slice(8, 10));
  const minute = Number(raw.slice(10, 12));
  const second = Number(raw.slice(12, 14));

  /*
   * M-Pesa transaction timestamps are treated as East Africa Time.
   * Convert the time to UTC before storing it in Supabase.
   */
  const utcMilliseconds = Date.UTC(
    year,
    month - 1,
    day,
    hour - 3,
    minute,
    second
  );

  return new Date(utcMilliseconds).toISOString();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    /*
     * Expected Safaricom callback structure:
     *
     * {
     *   Body: {
     *     stkCallback: {
     *       MerchantRequestID,
     *       CheckoutRequestID,
     *       ResultCode,
     *       ResultDesc,
     *       CallbackMetadata
     *     }
     *   }
     * }
     */
    const callback = body?.Body?.stkCallback;

    if (!callback) {
      console.error("Invalid M-Pesa callback received.");

      return NextResponse.json(
        {
          ResultCode: 1,
          ResultDesc: "Invalid callback.",
        },
        { status: 400 }
      );
    }

    const checkoutRequestId = String(
      callback.CheckoutRequestID || ""
    ).trim();

    const merchantRequestId = String(
      callback.MerchantRequestID || ""
    ).trim();

    const resultCode = Number(callback.ResultCode);

    const resultDescription = String(
      callback.ResultDesc || ""
    ).trim();

    if (!checkoutRequestId) {
      console.error(
        "M-Pesa callback missing CheckoutRequestID."
      );

      return NextResponse.json(
        {
          ResultCode: 1,
          ResultDesc: "CheckoutRequestID is required.",
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(resultCode)) {
      console.error(
        "M-Pesa callback contains an invalid ResultCode."
      );

      return NextResponse.json(
        {
          ResultCode: 1,
          ResultDesc: "Invalid ResultCode.",
        },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    /*
     * Find the payment created when the STK Push was initiated.
     *
     * mpesa_amount_requested is the exact amount that our server
     * sent to Safaricom:
     *
     * Sandbox    -> normally KSh 1
     * Production -> actual requested academy payment amount
     */
    const { data: payment, error: paymentLookupError } =
      await adminSupabase
        .from("registration_payments")
        .select(
          "id, status, amount_expected, mpesa_amount_requested, checkout_request_id, merchant_request_id"
        )
        .eq("checkout_request_id", checkoutRequestId)
        .maybeSingle();

    if (paymentLookupError) {
      console.error(
        "Payment lookup error:",
        paymentLookupError
      );

      return NextResponse.json(
        {
          ResultCode: 1,
          ResultDesc: "Unable to locate payment.",
        },
        { status: 500 }
      );
    }

    /*
     * If we don't know this CheckoutRequestID, do not modify
     * any payment record.
     *
     * Acknowledge receipt so an unknown callback does not
     * continuously retry against this endpoint.
     */
    if (!payment) {
      console.error(
        "No payment found for the supplied CheckoutRequestID."
      );

      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: "Callback received.",
      });
    }

    /*
     * Safaricom may retry a callback.
     *
     * Once this payment has already been confirmed as Paid,
     * never process a later callback in a way that could
     * downgrade or modify the confirmed payment.
     */
    if (payment.status === "Paid") {
      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: "Callback already processed.",
      });
    }

    /*
     * Validate MerchantRequestID when our payment record has one.
     *
     * The CheckoutRequestID remains the primary lookup key.
     * MerchantRequestID gives us an additional consistency check
     * against the identifiers returned when the STK Push started.
     */
    const storedMerchantRequestId =
      typeof payment.merchant_request_id === "string"
        ? payment.merchant_request_id.trim()
        : "";

    if (
      storedMerchantRequestId &&
      (!merchantRequestId ||
        merchantRequestId !== storedMerchantRequestId)
    ) {
      console.error(
        `M-Pesa callback MerchantRequestID mismatch for payment ${payment.id}.`
      );

      /*
       * Do not change the payment status when identifiers conflict.
       */
      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: "Callback received.",
      });
    }

    /*
     * ResultCode 0 means Safaricom reports that the customer
     * successfully completed the M-Pesa transaction.
     */
    if (resultCode === 0) {
      const metadata: CallbackItem[] = Array.isArray(
        callback?.CallbackMetadata?.Item
      )
        ? callback.CallbackMetadata.Item
        : [];

      const amountValue = getCallbackValue(metadata, "Amount");

      const receiptValue = getCallbackValue(
        metadata,
        "MpesaReceiptNumber"
      );

      const phoneValue = getCallbackValue(
        metadata,
        "PhoneNumber"
      );

      const transactionDateValue = getCallbackValue(
        metadata,
        "TransactionDate"
      );

      const amountPaid = Number(amountValue);

      const mpesaReceiptNumber = receiptValue
        ? String(receiptValue).trim()
        : "";

      const phoneNumber = phoneValue
        ? String(phoneValue).trim()
        : null;

      const transactionDate =
        parseMpesaTransactionDate(transactionDateValue);

      /*
       * A successful callback must contain a positive numeric
       * amount and an M-Pesa receipt number.
       */
      if (
        !Number.isFinite(amountPaid) ||
        amountPaid <= 0 ||
        !mpesaReceiptNumber
      ) {
        console.error(
          `Successful callback missing required payment metadata for payment ${payment.id}.`
        );

        /*
         * Do not mark this record Paid.
         *
         * We leave it Pending so it can still be reconciled using
         * the STK Query route instead of turning a potentially valid
         * transaction into a permanent failure because of malformed
         * callback metadata.
         */
        return NextResponse.json({
          ResultCode: 0,
          ResultDesc: "Callback received.",
        });
      }

      /*
       * Verify that the amount Safaricom says was paid is exactly
       * the amount our server requested from M-Pesa.
       *
       * We intentionally DO NOT compare against amount_expected.
       * In Sandbox, amount_expected may be KSh 6,500 while the
       * actual STK test request is only KSh 1.
       */
      const mpesaAmountRequested = Number(
        payment.mpesa_amount_requested
      );

      if (
        !Number.isFinite(mpesaAmountRequested) ||
        mpesaAmountRequested <= 0
      ) {
        console.error(
          `Payment ${payment.id} has no valid requested M-Pesa amount.`
        );

        /*
         * Fail closed: without the original requested amount,
         * this callback cannot safely confirm the payment.
         */
        return NextResponse.json({
          ResultCode: 0,
          ResultDesc: "Callback received.",
        });
      }

      if (amountPaid !== mpesaAmountRequested) {
        console.error(
          `M-Pesa callback amount mismatch for payment ${payment.id}.`
        );

        /*
         * Never mark the payment Paid when the amount does not
         * match what our server originally sent to Safaricom.
         */
        return NextResponse.json({
          ResultCode: 0,
          ResultDesc: "Callback received.",
        });
      }

      const { error: updateError } = await adminSupabase
        .from("registration_payments")
        .update({
          status: "Paid",
          amount_paid: amountPaid,
          mpesa_receipt_number: mpesaReceiptNumber,
          phone_number: phoneNumber || undefined,
          merchant_request_id:
            merchantRequestId || undefined,
          result_code: resultCode,
          result_description:
            resultDescription ||
            "The service request was processed successfully.",
          transaction_date:
            transactionDate || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", payment.id)
        .neq("status", "Paid");

      if (updateError) {
        console.error(
          "Successful payment update error:",
          updateError
        );

        return NextResponse.json(
          {
            ResultCode: 1,
            ResultDesc: "Unable to update payment.",
          },
          { status: 500 }
        );
      }

      console.log(
        `M-Pesa payment ${payment.id} confirmed successfully.`
      );

      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: "Callback processed successfully.",
      });
    }

    /*
     * A non-zero ResultCode means the transaction did not
     * complete successfully.
     *
     * ResultCode 1032 commonly represents a cancelled STK request.
     */
    const finalStatus =
      resultCode === 1032 ? "Cancelled" : "Failed";

    /*
     * Only update a payment that has not already become Paid.
     * This gives us another layer of protection against callback
     * ordering or retry races.
     */
    const { error: failedUpdateError } = await adminSupabase
      .from("registration_payments")
      .update({
        status: finalStatus,
        merchant_request_id:
          merchantRequestId || undefined,
        result_code: resultCode,
        result_description:
          resultDescription ||
          "M-Pesa payment was not completed.",
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id)
      .neq("status", "Paid");

    if (failedUpdateError) {
      console.error(
        "Failed payment update error:",
        failedUpdateError
      );

      return NextResponse.json(
        {
          ResultCode: 1,
          ResultDesc: "Unable to update payment.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Callback processed successfully.",
    });
  } catch (error) {
    console.error("M-Pesa callback error:", error);

    return NextResponse.json(
      {
        ResultCode: 1,
        ResultDesc: "Unable to process callback.",
      },
      { status: 500 }
    );
  }
}