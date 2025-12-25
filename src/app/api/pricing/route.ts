import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET /api/pricing
 * Returns the authenticated user's pricing configuration.
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const business = await prisma.business.findUnique({
      where: { userId: session.user.id },
      include: { pricing: true },
    });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    return NextResponse.json(business.pricing);
  } catch (error) {
    console.error("Error fetching pricing:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PUT /api/pricing
 * Creates or updates the authenticated user's pricing configuration.
 */
export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { vehicleSizes, conditions, services, addons } = body;

    // Validate required fields
    if (!vehicleSizes || !conditions || !services || !addons) {
      return NextResponse.json({ error: "Missing required pricing fields" }, { status: 400 });
    }

    // Get business ID
    const business = await prisma.business.findUnique({
      where: { userId: session.user.id },
    });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Upsert pricing
    const pricing = await prisma.pricing.upsert({
      where: { businessId: business.id },
      update: {
        vehicleSizes,
        conditions,
        services,
        addons,
      },
      create: {
        businessId: business.id,
        vehicleSizes,
        conditions,
        services,
        addons,
      },
    });

    return NextResponse.json(pricing);
  } catch (error) {
    console.error("Error updating pricing:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
