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
   * We convert the time to UTC before storing it in Supabase.
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
     * Expected callback structure:
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
      console.error("Invalid M-Pesa callback:", body);

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
        "M-Pesa callback missing CheckoutRequestID:",
        callback
      );

      return NextResponse.json(
        {
          ResultCode: 1,
          ResultDesc: "CheckoutRequestID is required.",
        },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    /*
     * Find the payment created when the STK Push was initiated.
     */
    const { data: payment, error: paymentLookupError } =
      await adminSupabase
        .from("registration_payments")
        .select(
          "id, status, amount_expected, checkout_request_id"
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
     * Safaricom may retry callbacks.
     *
     * If we already processed this successful transaction,
     * acknowledge the callback without creating another payment.
     */
    if (payment?.status === "Paid") {
      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: "Callback already processed.",
      });
    }

    if (!payment) {
      console.error(
        "No payment found for CheckoutRequestID:",
        checkoutRequestId
      );

      /*
       * We acknowledge the callback so Safaricom does not
       * continuously retry an unknown transaction.
       */
      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: "Callback received.",
      });
    }

    /*
     * ResultCode 0 means the customer successfully completed
     * the M-Pesa transaction.
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

      const amountPaid = Number(amountValue || 0);

      const mpesaReceiptNumber = receiptValue
        ? String(receiptValue)
        : null;

      const phoneNumber = phoneValue
        ? String(phoneValue)
        : null;

      const transactionDate =
        parseMpesaTransactionDate(transactionDateValue);

      /*
       * A successful callback must contain a real positive amount
       * and an M-Pesa receipt number before we mark it as Paid.
       */
      if (
        !Number.isFinite(amountPaid) ||
        amountPaid <= 0 ||
        !mpesaReceiptNumber
      ) {
        console.error(
          "Successful callback missing payment metadata:",
          callback
        );

        await adminSupabase
          .from("registration_payments")
          .update({
            status: "Failed",
            result_code: resultCode,
            result_description:
              "Successful M-Pesa callback was missing required payment details.",
            updated_at: new Date().toISOString(),
          })
          .eq("id", payment.id);

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
        .eq("id", payment.id);

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
     * Result code 1032 commonly represents a cancelled STK
     * request, so we distinguish it from other failures.
     */
    const finalStatus =
      resultCode === 1032 ? "Cancelled" : "Failed";

    const { error: failedUpdateError } = await adminSupabase
      .from("registration_payments")
      .update({
        status: finalStatus,
        merchant_request_id:
          merchantRequestId || undefined,
        result_code: Number.isFinite(resultCode)
          ? resultCode
          : null,
        result_description:
          resultDescription ||
          "M-Pesa payment was not completed.",
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id);

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