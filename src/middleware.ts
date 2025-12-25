import { NextResponse } from "next/server";

/**
 * Middleware - temporarily disabled for testing.
 * TODO: Re-enable auth after testing is complete.
 */
export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
