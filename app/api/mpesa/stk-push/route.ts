import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const ALLOWED_ITEMS = [
  "registration_fee",
  "yellow_kit",
  "luminous_kit",
  "monthly_training",
] as const;

type PaymentItem = (typeof ALLOWED_ITEMS)[number];

type ExistingPayment = {
  id: string;
  payment_items: string[] | null;
  status: string | null;
  checkout_request_id: string | null;
  created_at: string | null;
};

type DarajaTokenResponse = {
  access_token?: string;
  expires_in?: string;
  errorCode?: string;
  errorMessage?: string;
};

type StkPushResponse = {
  MerchantRequestID?: string;
  CheckoutRequestID?: string;
  ResponseCode?: string;
  ResponseDescription?: string;
  CustomerMessage?: string;
  errorCode?: string;
  errorMessage?: string;
};

function isPaymentItem(value: unknown): value is PaymentItem {
  return (
    typeof value === "string" &&
    ALLOWED_ITEMS.includes(value as PaymentItem)
  );
}

function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = `254${cleaned.substring(1)}`;
  } else if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
    cleaned = `254${cleaned}`;
  }

  return cleaned;
}

function formatPaymentItem(item: PaymentItem): string {
  switch (item) {
    case "registration_fee":
      return "Registration Fee";

    case "yellow_kit":
      return "Yellow Kit";

    case "luminous_kit":
      return "Luminous Kit";

    case "monthly_training":
      return "Monthly Training";

    default:
      return item;
  }
}

function samePaymentItems(
  existingItems: string[] | null,
  selectedItems: PaymentItem[]
): boolean {
  if (!Array.isArray(existingItems)) {
    return false;
  }

  const normalizedExisting = Array.from(new Set(existingItems)).sort();
  const normalizedSelected = Array.from(new Set(selectedItems)).sort();

  if (normalizedExisting.length !== normalizedSelected.length) {
    return false;
  }

  return normalizedExisting.every(
    (item, index) => item === normalizedSelected[index]
  );
}

// Daraja expects timestamp in Kenya/East Africa Time (UTC+3)
// Format: YYYYMMDDHHmmss
function generateTimestamp(): string {
  const kenyaTime = new Date(Date.now() + 3 * 60 * 60 * 1000);

  const year = kenyaTime.getUTCFullYear();
  const month = String(kenyaTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kenyaTime.getUTCDate()).padStart(2, "0");
  const hours = String(kenyaTime.getUTCHours()).padStart(2, "0");
  const minutes = String(kenyaTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(kenyaTime.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

async function getAccessToken(
  baseUrl: string,
  consumerKey: string,
  consumerSecret: string
): Promise<string> {
  const credentials = Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64");

  const response = await fetch(
    `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      cache: "no-store",
    }
  );

  const data = (await response.json()) as DarajaTokenResponse;

  if (!response.ok || !data.access_token) {
    console.error("Daraja authentication error:", {
      status: response.status,
      errorCode: data.errorCode,
      errorMessage: data.errorMessage,
    });

    throw new Error(
      data.errorMessage || "Unable to authenticate with Daraja."
    );
  }

  return data.access_token;
}

export async function POST(request: Request) {
  const adminSupabase = createAdminClient();

  let paymentId: string | null = null;

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

    const playerName =
      typeof requestBody.playerName === "string"
        ? requestBody.playerName.trim()
        : "";

    const phone =
      typeof requestBody.phone === "string"
        ? requestBody.phone.trim()
        : "";

    const registrationId =
      typeof requestBody.registrationId === "string" &&
      requestBody.registrationId.trim()
        ? requestBody.registrationId.trim()
        : null;

    const rawItems: unknown[] = Array.isArray(requestBody.items)
      ? requestBody.items
      : [];

    const validItems = rawItems.filter(isPaymentItem);

    const selectedItems: PaymentItem[] = Array.from(
      new Set<PaymentItem>(validItems)
    );

    if (!playerName) {
      return NextResponse.json(
        {
          success: false,
          message: "Player name is required.",
        },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "M-Pesa phone number is required.",
        },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhoneNumber(phone);

    if (!/^254(7|1)\d{8}$/.test(formattedPhone)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Enter a valid Kenyan phone number, for example 0712345678.",
        },
        { status: 400 }
      );
    }

    if (selectedItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Select at least one payment item.",
        },
        { status: 400 }
      );
    }

    if (rawItems.length !== selectedItems.length) {
      return NextResponse.json(
        {
          success: false,
          message:
            "One or more selected payment items are invalid or duplicated.",
        },
        { status: 400 }
      );
    }

    /*
      DUPLICATE PAYMENT PROTECTION

      Strong duplicate protection is applied when the payment belongs
      to a real registration.

      1. If any selected item has already been Paid for this registration,
         another STK Push is blocked.

      2. If the exact same item selection already has a recent Pending
         payment attempt, another STK Push is blocked temporarily.

      Old failed/cancelled attempts do not prevent another attempt.
    */
    if (registrationId) {
      const { data: existingPaymentData, error: existingPaymentError } =
        await adminSupabase
          .from("registration_payments")
          .select(
            "id, payment_items, status, checkout_request_id, created_at"
          )
          .eq("registration_id", registrationId)
          .in("status", ["Paid", "Pending"])
          .order("created_at", { ascending: false });

      if (existingPaymentError) {
        console.error(
          "Duplicate payment lookup error:",
          existingPaymentError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "Unable to verify the registration payment history. Please try again.",
          },
          { status: 500 }
        );
      }

      const existingPayments =
        (existingPaymentData ?? []) as ExistingPayment[];

      const paidItems = new Set<PaymentItem>();

      for (const existingPayment of existingPayments) {
        if (existingPayment.status !== "Paid") {
          continue;
        }

        const items = Array.isArray(existingPayment.payment_items)
          ? existingPayment.payment_items
          : [];

        for (const item of items) {
          if (isPaymentItem(item)) {
            paidItems.add(item);
          }
        }
      }

      const alreadyPaidItems = selectedItems.filter((item) =>
        paidItems.has(item)
      );

      if (alreadyPaidItems.length > 0) {
        const readableItems = alreadyPaidItems
          .map(formatPaymentItem)
          .join(", ");

        return NextResponse.json(
          {
            success: false,
            code: "ITEMS_ALREADY_PAID",
            message:
              alreadyPaidItems.length === 1
                ? `${readableItems} has already been paid for this registration.`
                : `${readableItems} have already been paid for this registration.`,
            alreadyPaidItems,
          },
          { status: 409 }
        );
      }

      /*
        Pending attempts are blocked for 5 minutes.

        This protects against accidental double-clicks or a parent
        pressing Pay again while the original STK prompt is still active.

        An old Pending record will not permanently lock the registration.
      */
      const pendingProtectionWindowMs = 5 * 60 * 1000;
      const pendingCutoff =
        Date.now() - pendingProtectionWindowMs;

      const matchingPendingPayment = existingPayments.find(
        (existingPayment) => {
          if (existingPayment.status !== "Pending") {
            return false;
          }

          if (
            !samePaymentItems(
              existingPayment.payment_items,
              selectedItems
            )
          ) {
            return false;
          }

          if (!existingPayment.created_at) {
            return false;
          }

          const createdAt = new Date(
            existingPayment.created_at
          ).getTime();

          if (Number.isNaN(createdAt)) {
            return false;
          }

          return createdAt >= pendingCutoff;
        }
      );

      if (matchingPendingPayment) {
        return NextResponse.json(
          {
            success: false,
            code: "PAYMENT_ALREADY_PENDING",
            message:
              "An M-Pesa payment request for these items is already pending. Complete the existing M-Pesa prompt or wait a few minutes before trying again.",
            paymentId: matchingPendingPayment.id,
            checkoutRequestId:
              matchingPendingPayment.checkout_request_id,
          },
          { status: 409 }
        );
      }
    }

    // Load the academy's current fees directly from Supabase.
    // The browser does not decide the amount.
    const { data: registrationInfo, error: registrationInfoError } =
      await adminSupabase
        .from("registration_information")
        .select(
          "registration_fee, yellow_kit_fee, luminous_kit_fee, monthly_training_fee"
        )
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

    if (registrationInfoError || !registrationInfo) {
      console.error(
        "Registration information error:",
        registrationInfoError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to load the academy payment fees.",
        },
        { status: 500 }
      );
    }

    const registrationFee = selectedItems.includes("registration_fee")
      ? Number(registrationInfo.registration_fee)
      : 0;

    const yellowKitFee = selectedItems.includes("yellow_kit")
      ? Number(registrationInfo.yellow_kit_fee)
      : 0;

    const luminousKitFee = selectedItems.includes("luminous_kit")
      ? Number(registrationInfo.luminous_kit_fee)
      : 0;

    const monthlyTrainingFee = selectedItems.includes("monthly_training")
      ? Number(registrationInfo.monthly_training_fee)
      : 0;

    const amountExpected =
      registrationFee +
      yellowKitFee +
      luminousKitFee +
      monthlyTrainingFee;

    if (!Number.isFinite(amountExpected) || amountExpected <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected payment amount is invalid.",
        },
        { status: 400 }
      );
    }

    // Server-only M-Pesa environment variables.
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;
    const environment = process.env.MPESA_ENVIRONMENT || "sandbox";

    if (
      !consumerKey ||
      !consumerSecret ||
      !shortcode ||
      !passkey
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "M-Pesa server configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    if (!callbackUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "M-Pesa callback URL has not been configured yet.",
        },
        { status: 500 }
      );
    }

    if (
      !callbackUrl.startsWith("https://") &&
      environment === "production"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Production M-Pesa callback URL must use HTTPS.",
        },
        { status: 500 }
      );
    }

    // Create our payment record before sending the STK request.
    const { data: payment, error: paymentError } =
      await adminSupabase
        .from("registration_payments")
        .insert({
          registration_id: registrationId,
          player_name: playerName,
          phone_number: formattedPhone,
          payment_items: selectedItems,

          registration_fee: registrationFee,
          yellow_kit_fee: yellowKitFee,
          luminous_kit_fee: luminousKitFee,
          monthly_training_fee: monthlyTrainingFee,

          amount_expected: amountExpected,
          amount_paid: 0,
          status: "Pending",
        })
        .select("id")
        .single();

    if (paymentError || !payment) {
      console.error(
        "Payment record creation error:",
        paymentError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to create the payment record.",
        },
        { status: 500 }
      );
    }

    paymentId = String(payment.id);

    const baseUrl =
      environment === "production"
        ? "https://api.safaricom.co.ke"
        : "https://sandbox.safaricom.co.ke";

    // During sandbox testing we only request KSh 1.
    // The real academy amount is still stored in amountExpected.
    const mpesaAmount =
      environment === "sandbox"
        ? 1
        : Math.round(amountExpected);

    const timestamp = generateTimestamp();

    // Daraja STK password:
    // Base64(BusinessShortCode + Passkey + Timestamp)
    const password = Buffer.from(
      `${shortcode}${passkey}${timestamp}`
    ).toString("base64");

    const accessToken = await getAccessToken(
      baseUrl,
      consumerKey,
      consumerSecret
    );

    /*
      This matches the successful Safaricom sandbox configuration.

      TransactionType: CustomerPayBillOnline
      Amount: 1 in sandbox
      PartyB: configured sandbox shortcode

      IMPORTANT:
      Never log Password, Passkey, Consumer Key,
      Consumer Secret or Access Token.
    */

    const stkRequestBody = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: mpesaAmount,
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: "NasraSantosFA",
      TransactionDesc: "Academy Payment",
    };

    // Safe diagnostic information only.
    // Password and private credentials are deliberately excluded.
    console.log("Sending Daraja STK Push:", {
      environment,
      BusinessShortCode: shortcode,
      Timestamp: timestamp,
      TransactionType: stkRequestBody.TransactionType,
      Amount: mpesaAmount,
      PartyA: "254*********",
      PartyB: shortcode,
      PhoneNumber: "254*********",
      CallBackURL: callbackUrl,
      AccountReference: stkRequestBody.AccountReference,
      TransactionDesc: stkRequestBody.TransactionDesc,
    });

    const response = await fetch(
      `${baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stkRequestBody),
        cache: "no-store",
      }
    );

    const data = (await response.json()) as StkPushResponse;

    if (!response.ok || data.ResponseCode !== "0") {
      console.error("STK Push request failed:", {
        status: response.status,
        errorCode: data.errorCode,
        errorMessage: data.errorMessage,
        responseCode: data.ResponseCode,
        responseDescription: data.ResponseDescription,
      });

      const failureMessage =
        data.errorMessage ||
        data.ResponseDescription ||
        "Safaricom rejected the STK Push request.";

      await adminSupabase
        .from("registration_payments")
        .update({
          status: "Failed",
          result_description: failureMessage,
          updated_at: new Date().toISOString(),
        })
        .eq("id", paymentId);

      return NextResponse.json(
        {
          success: false,
          message: failureMessage,
        },
        {
          status:
            response.status >= 400
              ? response.status
              : 400,
        }
      );
    }

    if (!data.CheckoutRequestID || !data.MerchantRequestID) {
      await adminSupabase
        .from("registration_payments")
        .update({
          status: "Failed",
          result_description:
            "Safaricom did not return the expected STK request IDs.",
          updated_at: new Date().toISOString(),
        })
        .eq("id", paymentId);

      return NextResponse.json(
        {
          success: false,
          message:
            "Safaricom did not return the expected STK request IDs.",
        },
        { status: 502 }
      );
    }

    const { error: updateError } = await adminSupabase
      .from("registration_payments")
      .update({
        checkout_request_id: data.CheckoutRequestID,
        merchant_request_id: data.MerchantRequestID,
        result_description:
          data.CustomerMessage ||
          data.ResponseDescription ||
          "STK Push initiated.",
        updated_at: new Date().toISOString(),
      })
      .eq("id", paymentId);

    if (updateError) {
      console.error(
        "Unable to save STK request IDs:",
        updateError
      );
    }

    console.log("Daraja STK Push accepted:", {
      MerchantRequestID: data.MerchantRequestID,
      CheckoutRequestID: data.CheckoutRequestID,
      ResponseCode: data.ResponseCode,
      ResponseDescription: data.ResponseDescription,
    });

    return NextResponse.json({
      success: true,
      message:
        data.CustomerMessage ||
        "M-Pesa payment prompt sent successfully.",
      paymentId,
      checkoutRequestId: data.CheckoutRequestID,
      selectedItems,
      amountExpected,
      mpesaTestAmount: mpesaAmount,
      environment,
    });
  } catch (error) {
    console.error("STK Push API error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unable to initiate M-Pesa payment.";

    if (paymentId) {
      try {
        await adminSupabase
          .from("registration_payments")
          .update({
            status: "Failed",
            result_description: errorMessage,
            updated_at: new Date().toISOString(),
          })
          .eq("id", paymentId);
      } catch (updateError) {
        console.error(
          "Unable to mark payment as failed:",
          updateError
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}