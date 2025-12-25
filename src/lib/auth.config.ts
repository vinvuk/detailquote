import type { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

/**
 * Edge-compatible auth configuration.
 * Does not include PrismaAdapter to stay under Edge function size limits.
 */
export const authConfig: NextAuthConfig = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM || "DetailQuote <noreply@detailquote.com>",
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verify=true",
    error: "/login",
  },
  callbacks: {
    /**
     * Controls whether a user is authorized to access a route.
     */
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = request.nextUrl.pathname === "/login";

      if (isOnDashboard) {
        return isLoggedIn;
      }

      // Redirect logged-in users away from login page
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL("/dashboard", request.url));
      }

      return true;
    },
  },
};
