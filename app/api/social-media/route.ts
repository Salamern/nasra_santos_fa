import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request: Request) {
  try {
    // Confirm that the person making the change is logged in.
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
      instagram,
      tiktok,
      facebook,
      youtube,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Social media information ID is required." },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
      .from("social_media")
      .update({
        instagram: instagram?.trim() || "",
        tiktok: tiktok?.trim() || "",
        facebook: facebook?.trim() || "",
        youtube: youtube?.trim() || "",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id, instagram, tiktok, facebook, youtube, updated_at")
      .single();

    if (error) {
      console.error("Social media update error:", error);

      return NextResponse.json(
        { error: "Unable to update social media information." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Social media information updated successfully.",
      socialMedia: data,
    });
  } catch (error) {
    console.error("Social media API error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while updating social media information.",
      },
      { status: 500 }
    );
  }
}