import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      dob,
      gender,
      nationality,
      category,
      position,
      address,
      phone,
      emergencyName,
      emergencyRelation,
      emergencyPhone,
      allergies,
      medicalConditions,
      mpesaCode,
    } = body;

    // Check required fields
    if (
      !fullName ||
      !dob ||
      !gender ||
      !nationality ||
      !category ||
      !position ||
      !address ||
      !phone ||
      !emergencyName ||
      !emergencyRelation ||
      !emergencyPhone
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required registration fields.",
        },
        { status: 400 }
      );
    }

    // Create secure server-only Supabase connection
    const supabase = createAdminClient();

    // Save registration
    const { data, error } = await supabase
      .from("registrations")
      .insert({
        full_name: fullName.trim(),
        date_of_birth: dob,
        gender: gender.trim(),
        nationality: nationality.trim(),
        category: category.trim(),
        position: position.trim(),
        address: address.trim(),
        phone: phone.trim(),

        emergency_name: emergencyName.trim(),
        emergency_relation: emergencyRelation.trim(),
        emergency_phone: emergencyPhone.trim(),

        allergies: allergies?.trim() || null,
        medical_conditions: medicalConditions?.trim() || null,

        mpesa_code: mpesaCode?.trim().toUpperCase() || null,

        payment_status: "pending",
        registration_status: "pending",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase registration error:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to save the registration. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully.",
        registration: {
          id: data.id,
          createdAt: data.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting the registration.",
      },
      { status: 500 }
    );
  }
}