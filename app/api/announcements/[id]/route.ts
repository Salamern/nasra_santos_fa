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

type RouteContext = {
  params: Promise<{ id: string }>;
};

// EDIT AN ANNOUNCEMENT
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Announcement ID is required." },
        { status: 400 }
      );
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
      .update({
        title,
        message,
        type,
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Announcement update error:", error);

      return NextResponse.json(
        { error: "Could not update announcement." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      announcement: data,
    });
  } catch (error) {
    console.error("Announcement PATCH error:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating the announcement." },
      { status: 500 }
    );
  }
}

// DELETE AN ANNOUNCEMENT
export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Announcement ID is required." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const { error } = await admin
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Announcement deletion error:", error);

      return NextResponse.json(
        { error: "Could not delete announcement." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Announcement DELETE error:", error);

    return NextResponse.json(
      { error: "Something went wrong while deleting the announcement." },
      { status: 500 }
    );
  }
}