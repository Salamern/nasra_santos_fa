import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const allowedTypes = [
  "General",
  "Training",
  "Match",
  "Parents",
  "Trials",
  "Important Notice",
];

const allowedStatuses = ["Published", "Draft"];

export async function POST(request: NextRequest) {
  try {
    // Make sure an authenticated admin is making the request.
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const title =
      typeof body.title === "string" ? body.title.trim() : "";

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    const type =
      typeof body.type === "string" ? body.type : "General";

    const status =
      typeof body.status === "string" ? body.status : "Draft";

    if (!title) {
      return NextResponse.json(
        { error: "Announcement title is required." },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Announcement message is required." },
        { status: 400 }
      );
    }

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid announcement type." },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid announcement status." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const { data, error } = await admin
      .from("announcements")
      .insert({
        title,
        message,
        type,
        status,
      })
      .select()
      .single();

    if (error) {
      console.error("Announcement creation error:", error);

      return NextResponse.json(
        { error: "Could not create announcement." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        announcement: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Announcement POST error:", error);

    return NextResponse.json(
      { error: "Something went wrong while creating the announcement." },
      { status: 500 }
    );
  }
}