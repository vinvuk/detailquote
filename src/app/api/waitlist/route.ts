import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Validates an email address format.
 * @param email - Email string to validate
 * @returns True if email format is valid
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * POST handler for waitlist signups.
 * Validates email, checks for duplicates, and stores new entries.
 * @param request - Incoming request with email in body
 * @returns JSON response with success/error status
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const existing = await prisma.waitlistEntry.findUnique({
      where: { email: trimmedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You're already on the waitlist!" },
        { status: 409 }
      );
    }

    await prisma.waitlistEntry.create({
      data: {
        email: trimmedEmail,
        source: "landing_page",
      },
    });

    const count = await prisma.waitlistEntry.count();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist",
        position: count,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET handler to retrieve waitlist count.
 * @returns JSON with waitlist statistics
 */
export async function GET() {
  try {
    const count = await prisma.waitlistEntry.count();
    return NextResponse.json({
      count,
      goal: 50,
      percentComplete: Math.round((count / 50) * 100),
    });
  } catch {
    return NextResponse.json({ count: 0, goal: 50, percentComplete: 0 });
  }
}
