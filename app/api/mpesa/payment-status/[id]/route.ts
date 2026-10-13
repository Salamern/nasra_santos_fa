import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const paymentId = id?.trim();

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    const { data: payment, error } = await adminSupabase
      .from("registration_payments")
      .select(
        `
          id,
          registration_id,
          player_name,
          payment_items,
          amount_expected,
          amount_paid,
          status,
          mpesa_receipt_number,
          result_code,
          result_description,
          transaction_date,
          created_at,
          updated_at
        `
      )
      .eq("id", paymentId)
      .maybeSingle();

    if (error) {
      console.error("Payment status lookup error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to check payment status.",
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

    return NextResponse.json(
      {
        success: true,

        payment: {
          id: payment.id,
          registrationId: payment.registration_id,
          playerName: payment.player_name,

          items: payment.payment_items ?? [],

          amountExpected: Number(payment.amount_expected ?? 0),
          amountPaid: Number(payment.amount_paid ?? 0),

          status: payment.status,

          mpesaReceiptNumber:
            payment.mpesa_receipt_number ?? null,

          resultCode:
            payment.result_code ?? null,

          resultDescription:
            payment.result_description ?? null,

          transactionDate:
            payment.transaction_date ?? null,

          createdAt:
            payment.created_at ?? null,

          updatedAt:
            payment.updated_at ?? null,
        },
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Payment status API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to check payment status.",
      },
      { status: 500 }
    );
  }
}