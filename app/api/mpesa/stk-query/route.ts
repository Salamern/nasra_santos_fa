import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function getMpesaBaseUrl() {
  const environment = process.env.MPESA_ENVIRONMENT || "sandbox";

  return environment === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

function generateTimestamp() {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

async function getAccessToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "M-Pesa Consumer Key or Consumer Secret is missing."
    );
  }

  const credentials = Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64");

  const response = await fetch(
    `${getMpesaBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    console.error("Daraja access token error:", data);
    throw new Error("Unable to authenticate with Safaricom Daraja.");
  }

  return String(data.access_token);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const paymentId = String(body.paymentId || "").trim();

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        { status: 400 }
      );
    }

    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;

    if (!shortcode || !passkey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "M-Pesa shortcode or passkey is missing from the server environment.",
        },
        { status: 500 }
      );
    }

    const adminSupabase = createAdminClient();

    const { data: payment, error: paymentError } =
      await adminSupabase
        .from("registration_payments")
        .select(
          `
            id,
            status,
            checkout_request_id,
            result_code,
            result_description
          `
        )
        .eq("id", paymentId)
        .maybeSingle();

    if (paymentError) {
      console.error(
        "STK query payment lookup error:",
        paymentError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to find the payment record.",
        },
        { status: 500 }
      );
    }

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment record was not found.",
        },
        { status: 404 }
      );
    }

    if (payment.status === "Paid") {
      return NextResponse.json({
        success: true,
        final: true,
        status: "Paid",
        message: "The payment has already been confirmed.",
      });
    }

    if (
      payment.status === "Failed" ||
      payment.status === "Cancelled"
    ) {
      return NextResponse.json({
        success: true,
        final: true,
        status: payment.status,
        resultCode: payment.result_code,
        resultDescription: payment.result_description,
        message:
          payment.result_description ||
          `The payment is already ${payment.status.toLowerCase()}.`,
      });
    }

    const checkoutRequestId = String(
      payment.checkout_request_id || ""
    ).trim();

    if (!checkoutRequestId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This payment does not have an M-Pesa checkout reference.",
        },
        { status: 400 }
      );
    }

    const timestamp = generateTimestamp();

    const password = Buffer.from(
      `${shortcode}${passkey}${timestamp}`
    ).toString("base64");

    const accessToken = await getAccessToken();

    const darajaResponse = await fetch(
      `${getMpesaBaseUrl()}/mpesa/stkpushquery/v1/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestId,
        }),
        cache: "no-store",
      }
    );

    const darajaResult = await darajaResponse.json();

    if (!darajaResponse.ok) {
      console.error(
        "Daraja STK query HTTP error:",
        darajaResult
      );

      return NextResponse.json(
        {
          success: false,
          pending: true,
          status: "Pending",
          message:
            darajaResult.errorMessage ||
            "Safaricom could not confirm the payment status yet.",
        },
        { status: 200 }
      );
    }

    const resultCode =
      darajaResult.ResultCode !== undefined &&
      darajaResult.ResultCode !== null
        ? Number(darajaResult.ResultCode)
        : null;

    const resultDescription =
      darajaResult.ResultDesc ||
      darajaResult.ResponseDescription ||
      "Safaricom returned a payment status update.";

    /*
     * ResultCode 0 means the transaction completed successfully.
     *
     * IMPORTANT:
     * STK Query does not give us the full transaction metadata
     * that the normal callback provides, such as the M-Pesa
     * receipt number and exact paid amount.
     *
     * Therefore, when ResultCode is 0 we do NOT manufacture a
     * receipt number or amount. We mark the record Paid based on
     * Safaricom's direct STK Query confirmation and preserve any
     * callback metadata that may already exist.
     */
    if (resultCode === 0) {
      const { error: updateError } = await adminSupabase
        .from("registration_payments")
        .update({
          status: "Paid",
          result_code: 0,
          result_description: resultDescription,
          updated_at: new Date().toISOString(),
        })
        .eq("id", paymentId);

      if (updateError) {
        console.error(
          "STK query paid update error:",
          updateError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "Safaricom confirmed the payment, but the academy payment record could not be updated.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        final: true,
        status: "Paid",
        resultCode,
        resultDescription,
        message:
          resultDescription ||
          "Safaricom confirmed the M-Pesa payment.",
      });
    }

    /*
     * Common M-Pesa STK final result codes:
     *
     * 1032 = user cancelled the request.
     *
     * Other non-zero ResultCodes represent an unsuccessful
     * transaction. We store them as Failed unless the code is
     * specifically recognised as a cancellation.
     */
    if (resultCode !== null) {
      const finalStatus =
        resultCode === 1032 ? "Cancelled" : "Failed";

      const { error: updateError } = await adminSupabase
        .from("registration_payments")
        .update({
          status: finalStatus,
          result_code: resultCode,
          result_description: resultDescription,
          updated_at: new Date().toISOString(),
        })
        .eq("id", paymentId);

      if (updateError) {
        console.error(
          "STK query final status update error:",
          updateError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "Safaricom returned the payment result, but the academy payment record could not be updated.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        final: true,
        status: finalStatus,
        resultCode,
        resultDescription,
        message: resultDescription,
      });
    }

    return NextResponse.json({
      success: true,
      final: false,
      pending: true,
      status: "Pending",
      resultDescription,
      message:
        "Safaricom has not returned a final payment result yet.",
    });
  } catch (error) {
    console.error("M-Pesa STK query error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to query the M-Pesa payment status.",
      },
      { status: 500 }
    );
  }
}