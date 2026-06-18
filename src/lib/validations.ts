import { z } from "zod";

export const EmailDataSchema = z.object({
  from: z.string().optional(),
  sender: z.string().optional(),
  emailAddress: z.string().optional(),
  to: z.string().optional(),
  subject: z.string().optional(),
  snippet: z.string().optional(),
});

export const EmailThreadSchema = z.object({
  id: z.string(),
  threadId: z.string().optional(),
  senderName: z.string(),
  senderEmail: z.string(),
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  snippet: z.string(),
  body: z.string().optional(),
  date: z.string(),
});

export type EmailThread = z.infer<typeof EmailThreadSchema>;

export const EmailListResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(EmailThreadSchema),
});

export type EmailListResponse = z.infer<typeof EmailListResponseSchema>;

export const ErrorResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.null(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
