import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";
import { ADMIN_EMAILS } from "./admin";

/**
 * Demo mode test user ID.
 * TODO: Remove after testing is complete.
 */
const DEMO_USER_ID = "cmjllegpj00000zib9qofyevi";
const DEMO_MODE = true;

/**
 * NextAuth.js configuration for DetailQuote.
 * Uses Magic Link (passwordless) authentication via Resend.
 * Extends the edge-compatible config with PrismaAdapter.
 */
const nextAuth = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    ...authConfig.callbacks,
    /**
     * Adds user ID to the session for client-side access.
     */
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    /**
     * Creates default business profile when a new user signs up.
     */
    async createUser({ user }) {
      if (user.id && user.email) {
        await prisma.business.create({
          data: {
            userId: user.id,
            name: user.email.split("@")[0] + "'s Business",
            email: user.email,
          },
        });
      }
    },
  },
});

export const { handlers, signIn, signOut } = nextAuth;

const IMPERSONATE_COOKIE = "admin_impersonate_user_id";

/**
 * Auth wrapper that returns demo user when in demo mode.
 * Also handles admin impersonation of other users.
 */
export async function auth() {
  if (DEMO_MODE) {
    const demoSession = {
      user: {
        id: DEMO_USER_ID,
        email: "test@detailquote.com",
        name: "Test User",
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    // Check for impersonation in demo mode
    const cookieStore = await cookies();
    const impersonatedUserId = cookieStore.get(IMPERSONATE_COOKIE)?.value;

    if (impersonatedUserId && ADMIN_EMAILS.includes(demoSession.user.email || "")) {
      const impersonatedUser = await prisma.user.findUnique({
        where: { id: impersonatedUserId },
      });

      if (impersonatedUser) {
        return {
          user: {
            id: impersonatedUser.id,
            email: impersonatedUser.email,
            name: impersonatedUser.name,
          },
          expires: demoSession.expires,
          isImpersonating: true,
          realAdminEmail: demoSession.user.email,
        };
      }
    }

    return demoSession;
  }

  const session = await nextAuth.auth();

  if (!session?.user?.email) {
    return session;
  }

  // Check for impersonation
  const cookieStore = await cookies();
  const impersonatedUserId = cookieStore.get(IMPERSONATE_COOKIE)?.value;

  if (impersonatedUserId && ADMIN_EMAILS.includes(session.user.email)) {
    const impersonatedUser = await prisma.user.findUnique({
      where: { id: impersonatedUserId },
    });

    if (impersonatedUser) {
      return {
        ...session,
        user: {
          id: impersonatedUser.id,
          email: impersonatedUser.email,
          name: impersonatedUser.name,
        },
        isImpersonating: true,
        realAdminEmail: session.user.email,
      };
    }
  }

  return session;
}

/**
 * Extended session type with user ID and impersonation support.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
    isImpersonating?: boolean;
    realAdminEmail?: string;
  }
}
