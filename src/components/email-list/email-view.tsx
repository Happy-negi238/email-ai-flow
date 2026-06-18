"use client";

import { useState } from "react";
import { EmailList } from "./email-list";
import { EmailDetail } from "@/components/email-list/email-detail";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { EmailThread } from "@/lib/validations";

export function EmailView({
  emails,
}: {
  emails: EmailThread[];
}) {
  const [selectedEmail, setSelectedEmail] =
    useState<EmailThread | null>(null);

  return (
    <>
      <div className="w-full h-full">
        <EmailList
          emails={emails}
          selectedEmail={selectedEmail}
          onSelect={setSelectedEmail}
        />
      </div>

      <Dialog open={!!selectedEmail} onOpenChange={(open) => !open && setSelectedEmail(null)}>
        <DialogContent className="max-w-[70vw]! w-full max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEmail?.subject}</DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <EmailDetail email={selectedEmail} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
