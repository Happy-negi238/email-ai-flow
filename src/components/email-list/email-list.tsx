"use client";

import { type EmailThread } from "@/lib/validations";
import { type Dispatch, type SetStateAction } from "react";

export function EmailList({
  emails,
  selectedEmail,
  onSelect,
}: {
  emails: EmailThread[];
  selectedEmail: EmailThread | null;
  onSelect: Dispatch<SetStateAction<EmailThread | null>>;
}) {
  if (emails.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">No emails found</p>
          <p className="mt-1 text-sm">Your emails will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card flex h-full w-full flex-col rounded-lg border">
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {emails.map((thread) => {
            const email = thread.senderEmail;
            const sender = thread.senderName;
            const subject = thread.subject;
            const snippet = thread.snippet;
            const isSelected = selectedEmail?.id === thread.id;

            return (
              <div
                key={thread.id}
                onClick={() => onSelect(thread)}
                className={`hover:bg-muted/50 flex cursor-pointer items-start gap-4 px-4 py-4 transition-colors ${
                  isSelected ? "bg-muted" : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
                  {sender.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="truncate font-semibold">
                      {sender}{" "}
                      <span className="font-light text-zinc-500 text-sm">{" "}{`<${email}>`}</span>
                    </h3>

                    <span className="text-muted-foreground shrink-0 text-xs">
                      {new Date(thread.date).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-md">{subject}</p>

                  <p className="mt-1 line-clamp-2 text-zinc-500 text-sm">
                    {snippet}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
