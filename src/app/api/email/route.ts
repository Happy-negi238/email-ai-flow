import { corsair } from "@/server/corsair";
import {
  EmailListResponseSchema,
  type EmailListResponse,
} from "@/lib/validations";
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
    const response = await corsair.withTenant("dev").gmail.db.messages.list({});

    if (!response.length) {
      return NextResponse.json(
        {
          status: 404,
          message: "No emails found",
          data: [],
        },
        { headers: corsHeaders }
      );
    }

    const emails = response.map((mail: any) => {
      const email = mail.data ?? {};

      const from = email.from ?? "";

      const senderName =
        from.match(/^(.*?)\s*</)?.[1]?.trim() ||
        from.split("@")[0] ||
        "Unknown";

      const senderEmail = from.match(/<(.+?)>/)?.[1] || from;

      return {
        id: mail.id,
        threadId: email.threadId,
        senderName,
        senderEmail,
        from,
        to: email.to ?? "",
        subject: email.subject ?? "(No Subject)",
        snippet: email.snippet ?? "",
        body: email.body ?? "",
        date: email.createdAt ?? mail.created_at,
      };
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Emails fetched successfully",
        data: emails,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error fetching emails:", error);

    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
        data: null,
      },
      { headers: corsHeaders }
    );
  }
}
