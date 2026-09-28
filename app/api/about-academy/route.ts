import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request: Request) {
  try {
    // Make sure the person making the change is logged in as an admin.
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { id, title, description, mission, vision } = body;

    if (!id) {
      return NextResponse.json(
        { error: "About Academy record ID is missing." },
        { status: 400 }
      );
    }

    if (
      !title?.trim() ||
      !description?.trim() ||
      !mission?.trim() ||
      !vision?.trim()
    ) {
      return NextResponse.json(
        { error: "Title, description, mission and vision are required." },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
      .from("about_academy")
      .update({
        title: title.trim(),
        description: description.trim(),
        mission: mission.trim(),
        vision: vision.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id, title, description, mission, vision, updated_at")
      .single();

    if (error) {
      console.error("About Academy update error:", error);

      return NextResponse.json(
        { error: "Unable to update About Academy information." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "About Academy information updated successfully.",
      about: data,
    });
  } catch (error) {
    console.error("About Academy API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating About Academy." },
      { status: 500 }
    );
  }
}