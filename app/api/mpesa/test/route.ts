import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const environment = process.env.MPESA_ENVIRONMENT || "sandbox";

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "M-Pesa Consumer Key or Consumer Secret is missing from the server environment.",
        },
        { status: 500 }
      );
    }

    const baseUrl =
      environment === "production"
        ? "https://api.safaricom.co.ke"
        : "https://sandbox.safaricom.co.ke";

    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const response = await fetch(
      `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.access_token) {
      console.error("Daraja authentication failed:", data);

      return NextResponse.json(
        {
          success: false,
          message: "Daraja authentication failed.",
        },
        { status: response.status || 500 }
      );
    }

    // Important:
    // Never return the Daraja access token to the browser.
    return NextResponse.json({
      success: true,
      message: "Nasra Santos FA successfully connected to Daraja.",
      environment,
    });
  } catch (error) {
    console.error("M-Pesa test error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to Daraja.",
      },
      { status: 500 }
    );
  }
}