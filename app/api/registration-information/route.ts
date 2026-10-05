import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/*
 * PUBLIC GET
 *
 * Returns only the registration information that is safe to display
 * publicly on the player registration page.
 */
export async function GET() {
  try {
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
      .from("registration_information")
      .select(
        "id, registration_fee, yellow_kit_fee, luminous_kit_fee, monthly_training_fee, payment_method, till_number, equipment_requirement, payment_instructions"
      )
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Registration information fetch error:", error);

      return NextResponse.json(
        { error: "Unable to load registration information." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Registration information was not found." },
        { status: 404 }
      );
    }

    const total_fee =
      Number(data.registration_fee || 0) +
      Number(data.yellow_kit_fee || 0) +
      Number(data.luminous_kit_fee || 0) +
      Number(data.monthly_training_fee || 0);

    return NextResponse.json({
      registration: {
        ...data,
        total_fee,
      },
    });
  } catch (error) {
    console.error("Registration information GET API error:", error);

    return NextResponse.json(
      { error: "Unable to load registration information." },
      { status: 500 }
    );
  }
}

/*
 * ADMIN PATCH
 *
 * Only a logged-in Supabase user can change the registration
 * information.
 */
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      id,
      registration_fee,
      yellow_kit_fee,
      luminous_kit_fee,
      monthly_training_fee,
      payment_method,
      till_number,
      equipment_requirement,
      payment_instructions,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Registration information ID is required." },
        { status: 400 }
      );
    }

    const fees = [
      registration_fee,
      yellow_kit_fee,
      luminous_kit_fee,
      monthly_training_fee,
    ];

    if (
      fees.some(
        (fee) =>
          typeof fee !== "number" ||
          !Number.isFinite(fee) ||
          fee < 0
      )
    ) {
      return NextResponse.json(
        { error: "All registration fees must be valid amounts." },
        { status: 400 }
      );
    }

    if (
      typeof payment_method !== "string" ||
      !payment_method.trim()
    ) {
      return NextResponse.json(
        { error: "Payment method is required." },
        { status: 400 }
      );
    }

    if (
      typeof till_number !== "string" ||
      !till_number.trim()
    ) {
      return NextResponse.json(
        { error: "Buy Goods Till Number is required." },
        { status: 400 }
      );
    }

    if (!/^\d+$/.test(till_number.trim())) {
      return NextResponse.json(
        { error: "Till Number must contain numbers only." },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
      .from("registration_information")
      .update({
        registration_fee,
        yellow_kit_fee,
        luminous_kit_fee,
        monthly_training_fee,
        payment_method: payment_method.trim(),
        till_number: till_number.trim(),
        equipment_requirement:
          typeof equipment_requirement === "string" &&
          equipment_requirement.trim()
            ? equipment_requirement.trim()
            : null,
        payment_instructions:
          typeof payment_instructions === "string" &&
          payment_instructions.trim()
            ? payment_instructions.trim()
            : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        "id, registration_fee, yellow_kit_fee, luminous_kit_fee, monthly_training_fee, payment_method, till_number, equipment_requirement, payment_instructions, updated_at"
      )
      .single();

    if (error) {
      console.error("Registration information update error:", error);

      return NextResponse.json(
        { error: "Unable to update registration information." },
        { status: 500 }
      );
    }

    const total_fee =
      Number(data.registration_fee || 0) +
      Number(data.yellow_kit_fee || 0) +
      Number(data.luminous_kit_fee || 0) +
      Number(data.monthly_training_fee || 0);

    return NextResponse.json({
      message: "Registration information updated successfully.",
      registration: {
        ...data,
        total_fee,
      },
    });
  } catch (error) {
    console.error("Registration information API error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while updating registration information.",
      },
      { status: 500 }
    );
  }
}