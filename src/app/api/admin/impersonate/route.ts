import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const IMPERSONATE_COOKIE = "admin_impersonate_user_id";

/**
 * POST /api/admin/impersonate
 * Starts impersonating a user.
 */
export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Check user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Set impersonation cookie
    const cookieStore = await cookies();
    cookieStore.set(IMPERSONATE_COOKIE, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error starting impersonation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/impersonate
 * Stops impersonating a user.
 */
export async function DELETE() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Remove impersonation cookie
    const cookieStore = await cookies();
    cookieStore.delete(IMPERSONATE_COOKIE);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error stopping impersonation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/impersonate
 * Gets current impersonation status.
 */
export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cookieStore = await cookies();
    const impersonatedUserId = cookieStore.get(IMPERSONATE_COOKIE)?.value;

    if (!impersonatedUserId) {
      return NextResponse.json({ impersonating: false });
    }

    const user = await prisma.user.findUnique({
      where: { id: impersonatedUserId },
    });

    if (!user) {
      // Clear invalid cookie
      cookieStore.delete(IMPERSONATE_COOKIE);
      return NextResponse.json({ impersonating: false });
    }

    return NextResponse.json({
      impersonating: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error checking impersonation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
