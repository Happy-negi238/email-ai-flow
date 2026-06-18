import { corsair } from "@/server/corsair";
import { processWebhook } from "corsair";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const url = new URL(request.url);

  // 1. Capture Request Headers
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // 2. Identify and filter Google Calendar Sync/Handshake notifications
  // Google sends a 'sync' state when first establishing the webhook channel.
  // We MUST ignore this to avoid running sync operations on empty handshake calls.
  const googleResourceState = headers["x-goog-resource-state"];
  if (googleResourceState === "sync") {
    console.info(
      "Received Google Calendar handshake validation. Acknowledging safely.",
    );
    return new NextResponse("Sync Acknowledged", { status: 200 });
  }

  // 3. Decode Webhook Body Safely
  const contentType = request.headers.get("content-type");
  let body: string | Record<string, unknown>;
  try {
    if (contentType?.includes("application/json")) {
      body = await request.json();
    } else {
      const text = await request.text();
      body = text && text.trim() ? text : {};
    }
  } catch (err) {
    console.error("Failed to parse webhook body:", err);
    return NextResponse.json(
      { success: false, error: "Invalid body format" },
      { status: 200 },
    ); // Return 200 to prevent retry loops
  }

  // 4. Process the webhook using Corsair middleware
  const tenantId = "dev";
  const result = await processWebhook(corsair, headers, body, { tenantId });

  console.info("Plugin processed trigger:", result.plugin, result.action);

  // 5. Setup outgoing headers
  const responseHeaders = result.responseHeaders;
  const nextHeaders = new Headers();
  if (responseHeaders) {
    for (const [key, value] of Object.entries(responseHeaders)) {
      nextHeaders.set(key, value);
    }
  }

  // 6. 🚨 CRITICAL GUARD: Only allow DB operations on matching event triggers
  // Standard calendar action triggers are typically: 'event.created', 'booking.created', 'event.set'.
  // If Corsair triggers on pings, sync timers, or metadata updates, we bail out early.
  const allowedActions = ["event.created", "booking.created", "event.set"];
  if (result.action && !allowedActions.includes(result.action)) {
    console.info(
      `Skipping DB entry. Action '${result.action}' is not an event creation event.`,
    );
    return NextResponse.json(
      {
        success: true,
        message: `Skipped DB operations for action: ${result.action}`,
      },
      { headers: nextHeaders, status: 200 },
    );
  }

  // 7. Standard Validation
  if (!result.response) {
    return NextResponse.json(
      {
        success: false,
        message: "No matching webhook handle found",
      },
      { status: 200 }, // Using 200 rather than 400 stops calendar vendors from flooding you with retries
    );
  }

  if (result.response !== undefined) {
    return NextResponse.json(result.response, { headers: nextHeaders });
  }

  return new NextResponse(null, { status: 200, headers: nextHeaders });
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Webhook endpoint is active",
    timestamp: new Date().toISOString(),
  });
}
