import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ shareId: string }>;
}

/**
 * POST /api/quotes/public/[shareId]
 * Allows customers to accept or decline a quote.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { shareId } = await params;
    const body = await request.json();
    const { action } = body;

    if (!action || !["accept", "decline"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'accept' or 'decline'" },
        { status: 400 }
      );
    }

    // Get quote by shareId
    const quote = await prisma.quote.findUnique({
      where: { shareId },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Check if quote is still actionable
    if (quote.status === "ACCEPTED" || quote.status === "DECLINED") {
      return NextResponse.json(
        { error: "This quote has already been responded to" },
        { status: 400 }
      );
    }

    if (quote.status === "EXPIRED") {
      return NextResponse.json(
        { error: "This quote has expired" },
        { status: 400 }
      );
    }

    // Check if quote has expired based on validUntil date
    if (quote.validUntil && new Date(quote.validUntil) < new Date()) {
      await prisma.quote.update({
        where: { id: quote.id },
        data: { status: "EXPIRED" },
      });
      return NextResponse.json(
        { error: "This quote has expired" },
        { status: 400 }
      );
    }

    // Update quote status
    const newStatus = action === "accept" ? "ACCEPTED" : "DECLINED";
    const updatedQuote = await prisma.quote.update({
      where: { id: quote.id },
      data: { status: newStatus },
    });

    return NextResponse.json({
      success: true,
      status: updatedQuote.status,
    });
  } catch (error) {
    console.error("Error responding to quote:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
