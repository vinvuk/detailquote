import { auth } from "@/lib/auth";

/**
 * Admin emails that have access to admin features.
 */
export const ADMIN_EMAILS = [
  "vincent.vukovic@gmail.com",
  "test@detailquote.com", // Demo mode
];

/**
 * Checks if the current user is an admin.
 * Returns the session if admin, null otherwise.
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return null;
  }

  return session;
}
