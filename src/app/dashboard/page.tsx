import "dotenv/config"
import { EmailView } from "@/components/email-list/email-view";
import type { EmailThread } from "@/lib/validations";

export default async function Page() {
  let emails: EmailThread[] = [];

  try {
    const response = await fetch(`${process.env.APP_URL}/api/email`, {
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
