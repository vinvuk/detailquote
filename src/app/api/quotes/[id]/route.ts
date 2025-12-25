import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/quotes/[id]
 * Returns a specific quote by ID.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const quote = await prisma.quote.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PUT /api/quotes/[id]
 * Updates a specific quote by ID.
 */
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check quote exists and belongs to user
    const existingQuote = await prisma.quote.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleSize,
      condition,
      services,
      addons,
      notes,
      status,
      validUntil,
    } = body;

    const quote = await prisma.quote.update({
      where: { id },
      data: {
        ...(customerName !== undefined && { customerName }),
        ...(customerEmail !== undefined && { customerEmail }),
        ...(customerPhone !== undefined && { customerPhone }),
        ...(vehicleYear !== undefined && { vehicleYear }),
        ...(vehicleMake !== undefined && { vehicleMake }),
        ...(vehicleModel !== undefined && { vehicleModel }),
        ...(vehicleSize !== undefined && { vehicleSize }),
        ...(condition !== undefined && { condition }),
        ...(services !== undefined && { services }),
        ...(addons !== undefined && { addons }),
        ...(notes !== undefined && { notes }),
        ...(status !== undefined && { status }),
        ...(validUntil !== undefined && { validUntil: new Date(validUntil) }),
      },
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/quotes/[id]
 * Deletes a specific quote by ID.
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check quote exists and belongs to user
    const existingQuote = await prisma.quote.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    await prisma.quote.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
