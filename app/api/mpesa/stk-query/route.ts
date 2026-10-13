import { createHash, timingSafeEqual } from "crypto";
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
  const kenyaTime = new Date(Date.now() + 3 * 60 * 60 * 1000);

  const year = kenyaTime.getUTCFullYear();
  const month = String(kenyaTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kenyaTime.getUTCDate()).padStart(2, "0");
  const hours = String(kenyaTime.getUTCHours()).padStart(2, "0");
  const minutes = String(kenyaTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(kenyaTime.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function hashPaymentStatusToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function tokensMatch(
  suppliedToken: string,
  storedTokenHash: string
): boolean {
  try {
    const suppliedHash = hashPaymentStatusToken(suppliedToken);

    const suppliedBuffer = Buffer.from(suppliedHash, "hex");
    const storedBuffer = Buffer.from(storedTokenHash, "hex");

    if (suppliedBuffer.length !== storedBuffer.length) {
      return false;
    }

    return timingSafeEqual(suppliedBuffer, storedBuffer);
  } catch {
    return false;
  }
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
    console.error("Daraja access token error:", {
      status: response.status,
      errorCode: data.errorCode,
      errorMessage: data.errorMessage,
    });

    throw new Error(
      data.errorMessage ||
        "Unable to authenticate with Safaricom Daraja."
    );
  }

  return String(data.access_token);
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const requestBody = body as Record<string, unknown>;

    const paymentId =
      typeof requestBody.paymentId === "string"
        ? requestBody.paymentId.trim()
        : "";

    const paymentStatusToken =
      typeof requestBody.paymentStatusToken === "string"
        ? requestBody.paymentStatusToken.trim()
        : "";

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        { status: 400 }
      );
    }

    if (!paymentStatusToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment status authorization is required.",
        },
        { status: 401 }
      );
    }

    if (!/^[a-f0-9]{64}$/i.test(paymentStatusToken)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status authorization.",
        },
        { status: 401 }
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
            result_description,
            payment_status_token_hash
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
          message: "Unable to check the payment.",
        },
        { status: 500 }
      );
    }

    /*
      Do not reveal whether a payment ID exists.

      A missing payment, missing token hash or incorrect token all
      receive the same authorization response.
    */
    if (
      !payment ||
      !payment.payment_status_token_hash ||
      !tokensMatch(
        paymentStatusToken,
        String(payment.payment_status_token_hash)
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status authorization.",
        },
        { status: 401 }
      );
    }

    /*
      If our database already has a final status, there is no need
      to contact Safaricom again.
    */
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

    /*
      A temporary Daraja query error must NOT automatically change
      the database payment to Failed.

      The original STK transaction may still be active or its
      callback may still arrive.
    */
    if (!darajaResponse.ok) {
      console.error("Daraja STK query HTTP error:", {
        status: darajaResponse.status,
        errorCode: darajaResult.errorCode,
        errorMessage: darajaResult.errorMessage,
      });

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
      ResultCode 0 means Safaricom confirms that the transaction
      completed successfully.

      The normal callback normally supplies additional metadata such
      as the receipt number and paid amount. STK Query may not provide
      all of that callback metadata, so we never invent those values.
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
      ResultCode 1032 is the common user-cancelled STK result.

      Other non-zero final result codes are recorded as Failed.
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