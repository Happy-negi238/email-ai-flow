import React from "react";
import { RefreshButton } from "@/components/refresh-button";

type CalendarEvent = {
  id: string;
  title: string;
  status: string;
  organizer: string;
  creator: string;
  startTime: string;
  endTime: string;
  attendeesCount: number;
  meetLink?: string;
};

export default async function Calendar() {
  const appUrl =
  process.env.APP_URL ??
  `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${appUrl}/api/calendar`, {
    method: "GET",
    cache: "no-cache",
  });

  const result = await res.json();
  const events: CalendarEvent[] = result.data || [];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">
              View and manage upcoming events
            </p>
          </div>
          <RefreshButton />
        </div>
      </div>

      <div className="grid gap-4">
        {events.length === 0 ? (
          <div className="rounded-xl border p-8 text-center">
            No events found
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-card rounded-xl border p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-semibold">{event.title}</h2>

                    <div className="font-sm flex gap-1">
                      <p className="rounded-xl border border-green-400 bg-green-400/20 px-2 py-1 text-xs">
                        {event.organizer}
                      </p>
                      <p className="rounded-xl border border-amber-400 bg-amber-400/20 px-2 py-1 text-xs">
                        {event.creator}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-2 text-sm">
                    {new Date(event.startTime).toLocaleDateString()}
                  </p>

                  <p className="text-muted-foreground text-sm">
                    {new Date(event.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" - "}
                    {new Date(event.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    event.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm">👥 {event.attendeesCount} Attendees</p>

                {event.meetLink && (
                  <a
                    href={event.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-black px-4 py-2 text-sm text-white"
                  >
                    Join Meet
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
