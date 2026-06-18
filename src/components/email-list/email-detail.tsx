
import type { EmailThread } from "@/lib/validations";

export function EmailDetail({
  email,
}: {
  email: EmailThread | null;
}) {
  if (!email) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Select an email
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h1 className="text-2xl font-bold">
        {email.subject}
      </h1>

      <div className="mt-4 space-y-2">
        <p>
          <strong>From:</strong>{" "}
          {email.from}
        </p>

        <p>
          <strong>To:</strong>{" "}
          {email.to}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(
            email.date
          ).toLocaleString()}
        </p>
      </div>

      <div className="mt-8 whitespace-pre-wrap"
      >
        {email.body ?? email.snippet}
      </div>
    </div>
  );
}
