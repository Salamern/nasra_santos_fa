import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // 1. Check that the person making the request is logged in.
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

    // 2. Get registration ID from the URL.
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Registration ID is required." },
        { status: 400 }
      );
    }

    // 3. Read the requested status.
    const body = await request.json();
    const status = body.status;

    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid registration status." },
        { status: 400 }
      );
    }

    // 4. Use the server-only admin client to update the database.
    const admin = createAdminClient();

    const { data, error } = await admin
      .from("registrations")
      .update({
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Registration update error:", error);

      return NextResponse.json(
        { error: "Could not update registration." },
        { status: 500 }
      );
    }

    // 5. Return the updated registration.
    return NextResponse.json({
      success: true,
      registration: data,
    });
  } catch (error) {
    console.error("Registration PATCH error:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating registration." },
      { status: 500 }
    );
  }
}