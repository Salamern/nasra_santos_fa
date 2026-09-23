import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    // Confirm that the request comes from a logged-in admin session.
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const matchDate = body.match_date?.trim();
    const kickoffTime = body.kickoff_time?.trim() || null;
    const competition = body.competition?.trim() || "Match";
    const venue = body.venue?.trim() || null;
    const homeTeam = body.home_team?.trim();
    const awayTeam = body.away_team?.trim();
    const matchStatus = body.match_status || "Upcoming";
    const notes = body.notes?.trim() || null;

    // Required fields
    if (!matchDate || !homeTeam || !awayTeam) {
      return NextResponse.json(
        {
          error:
            "Match date, home team and away team are required.",
        },
        { status: 400 }
      );
    }

    // Allowed match statuses
    const allowedStatuses = [
      "Upcoming",
      "Completed",
      "Postponed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(matchStatus)) {
      return NextResponse.json(
        { error: "Invalid match status." },
        { status: 400 }
      );
    }

    // Prevent negative scores.
    const homeScore =
      body.home_score === "" ||
      body.home_score === null ||
      body.home_score === undefined
        ? null
        : Number(body.home_score);

    const awayScore =
      body.away_score === "" ||
      body.away_score === null ||
      body.away_score === undefined
        ? null
        : Number(body.away_score);

    if (
      (homeScore !== null &&
        (!Number.isInteger(homeScore) || homeScore < 0)) ||
      (awayScore !== null &&
        (!Number.isInteger(awayScore) || awayScore < 0))
    ) {
      return NextResponse.json(
        { error: "Scores must be whole numbers of 0 or greater." },
        { status: 400 }
      );
    }

    // Completed matches must have both scores.
    if (
      matchStatus === "Completed" &&
      (homeScore === null || awayScore === null)
    ) {
      return NextResponse.json(
        {
          error:
            "A completed match must have both home and away scores.",
        },
        { status: 400 }
      );
    }

    // Upcoming matches should not accidentally contain scores.
    const finalHomeScore =
      matchStatus === "Completed" ? homeScore : null;

    const finalAwayScore =
      matchStatus === "Completed" ? awayScore : null;

    const admin = createAdminClient();

    const { data, error } = await admin
      .from("fixtures")
      .insert({
        match_date: matchDate,
        kickoff_time: kickoffTime,
        competition,
        venue,
        home_team: homeTeam,
        away_team: awayTeam,
        home_score: finalHomeScore,
        away_score: finalAwayScore,
        match_status: matchStatus,
        notes,
      })
      .select()
      .single();

    if (error) {
      console.error("Fixture creation error:", error);

      return NextResponse.json(
        { error: "Could not create fixture." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        fixture: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Fixture POST error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while creating the fixture.",
      },
      { status: 500 }
    );
  }
}