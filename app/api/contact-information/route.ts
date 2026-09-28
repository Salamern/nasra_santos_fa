import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request: Request) {
  try {
    // Confirm that the person making the change is logged in as an admin.
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

    const id = body.id;
    const phone = body.phone?.trim();
    const email = body.email?.trim();
    const location = body.location?.trim();
    const cityCountry = body.city_country?.trim();

    if (!id) {
      return NextResponse.json(
        { error: "Contact information ID is required." },
        { status: 400 }
      );
    }

    if (!phone || !email || !location || !cityCountry) {
      return NextResponse.json(
        { error: "All contact information fields are required." },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
      .from("contact_information")
      .update({
        phone,
        email,
        location,
        city_country: cityCountry,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id, phone, email, location, city_country")
      .single();

    if (error) {
      console.error("Contact information update error:", error);

      return NextResponse.json(
        { error: "Unable to update contact information." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: data,
    });
  } catch (error) {
    console.error("Contact information API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating contact information." },
      { status: 500 }
    );
  }
}