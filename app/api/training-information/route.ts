import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request: Request) {
  try {
    // Check that the person making the change is logged in.
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      id,
      training_days,
      training_time,
      venue,
      age_groups,
      additional_information,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Training information ID is required." },
        { status: 400 }
      );
    }

    if (
      !training_days?.trim() ||
      !training_time?.trim() ||
      !venue?.trim() ||
      !age_groups?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Training days, training time, venue and age groups are required.",
        },
        { status: 400 }
      );
    }

    // Use the server-only admin client for the database update.
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
      .from("training_information")
      .update({
        training_days: training_days.trim(),
        training_time: training_time.trim(),
        venue: venue.trim(),
        age_groups: age_groups.trim(),
        additional_information:
          additional_information?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        "id, training_days, training_time, venue, age_groups, additional_information, updated_at"
      )
      .single();

    if (error) {
      console.error("Training information update error:", error);

      return NextResponse.json(
        { error: "Unable to update training information." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Training information updated successfully.",
      training: data,
    });
  } catch (error) {
    console.error("Training information API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while updating training information.",
      },
      { status: 500 }
    );
  }
}