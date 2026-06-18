import { corsair } from "@/server/corsair";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const response = await corsair
      .withTenant("dev")
      .googlecalendar.db.events.list({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events = response.map((event: any) => ({
      id: event.data.id,
      title: event.data.summary,
      status: event.data.status,
      startTime: event.data.start?.dateTime ?? event.data.start?.date,
      endTime: event.data.end?.dateTime ?? event.data.end?.date,
      organizer: event.data.organizer?.email,
      creator: event.data.creator?.email,
      attendeesCount: event.data.attendees?.length ?? 0,
      meetLink: event.data.hangoutLink,
      eventLink: event.data.htmlLink,
      createdAt: event.data.created,
      updatedAt: event.data.updated,
    }));

    return NextResponse.json(
      {
        success: true,
        data: events,
      },
      { headers: corsHeaders },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch calendar events",
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
}
