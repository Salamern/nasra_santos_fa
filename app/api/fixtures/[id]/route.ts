import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const allowedStatuses = [
  "Upcoming",
  "Completed",
  "Postponed",
  "Cancelled",
];

// UPDATE FIXTURE
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Confirm that an admin user is logged in
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Fixture ID is required." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      match_date,
      kickoff_time,
      home_team,
      away_team,
      competition,
      venue,
      match_status,
      home_score,
      away_score,
      notes,
    } = body;

    // Required fields
    if (!match_date || !home_team || !away_team) {
      return NextResponse.json(
        {
          error:
            "Match date, home team and away team are required.",
        },
        { status: 400 }
      );
    }

    // Validate match status
    if (!allowedStatuses.includes(match_status)) {
      return NextResponse.json(
        { error: "Invalid match status." },
        { status: 400 }
      );
    }

    // Completed matches must have scores
    if (
      match_status === "Completed" &&
      (home_score === null ||
        home_score === undefined ||
        home_score === "" ||
        away_score === null ||
        away_score === undefined ||
        away_score === "")
    ) {
      return NextResponse.json(
        {
          error:
            "Home score and away score are required for a completed match.",
        },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const updateData = {
      match_date,
      kickoff_time: kickoff_time || null,
      home_team: home_team.trim(),
      away_team: away_team.trim(),
      competition: competition?.trim() || "",
      venue: venue?.trim() || null,
      match_status,

      home_score:
        match_status === "Completed"
          ? Number(home_score)
          : null,

      away_score:
        match_status === "Completed"
          ? Number(away_score)
          : null,

      notes: notes?.trim() || null,
    };

    const { data, error } = await admin
      .from("fixtures")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Fixture update error:", error);

      return NextResponse.json(
        {
          error: error.message || "Could not update fixture.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      fixture: data,
    });
  } catch (error) {
    console.error("Fixture PATCH error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while updating the fixture.",
      },
      { status: 500 }
    );
  }
}

// DELETE FIXTURE
export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    // Confirm that an admin user is logged in
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Fixture ID is required." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const { error } = await admin
      .from("fixtures")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Fixture delete error:", error);

      return NextResponse.json(
        {
          error: error.message || "Could not delete fixture.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Fixture DELETE error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while deleting the fixture.",
      },
      { status: 500 }
    );
  }
}