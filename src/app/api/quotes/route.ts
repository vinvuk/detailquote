import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET /api/quotes
 * Returns all quotes for the authenticated user.
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const quotes = await prisma.quote.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/quotes
 * Creates a new quote for the authenticated user.
 */
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      pricingSnapshot,
      total,
    } = body;

    // Validate required fields
    if (!vehicleSize || !condition || !services || !addons || !pricingSnapshot || total === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(services) || services.length === 0) {
      return NextResponse.json({ error: "At least one service is required" }, { status: 400 });
    }

    const quote = await prisma.quote.create({
      data: {
        userId: session.user.id,
        customerName: customerName || null,
        customerEmail: customerEmail || null,
        customerPhone: customerPhone || null,
        vehicleYear: vehicleYear || null,
        vehicleMake: vehicleMake || null,
        vehicleModel: vehicleModel || null,
        vehicleSize,
        condition,
        services,
        addons,
        notes: notes || null,
        pricingSnapshot,
        total,
      },
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
