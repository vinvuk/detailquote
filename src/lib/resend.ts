import { Resend } from "resend";

let resendClient: Resend | null = null;

/**
 * Gets the Resend client (lazy initialization).
 */
export function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

/**
 * Default sender email address.
 * Uses Resend's test sender if no custom domain is configured.
 */
export const EMAIL_FROM = process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>";
