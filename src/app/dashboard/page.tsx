import "dotenv/config";
import { EmailView } from "@/components/email-list/email-view";
import type { EmailThread } from "@/lib/validations";

export default async function Page() {
  let emails: EmailThread[] = [];

  const appUrl = process.env.APP_URL ?? `https://${process.env.VERCEL_URL}`;

  try {
    const response = await fetch(`${appUrl}/api/email`, {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      const result = await response.json();
      emails = result.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch emails:", error);
  }

  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <EmailView emails={emails} />
      </div>
    </>
  );
}
