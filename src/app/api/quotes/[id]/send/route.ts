import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getResend, EMAIL_FROM } from "@/lib/resend";
import { quoteEmailTemplate, quoteEmailPlainText } from "@/lib/email-templates";
import { NextResponse } from "next/server";
import type { PricingConfig } from "@/lib/pricing-defaults";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/quotes/[id]/send
 * Sends the quote to the customer via email.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get quote and verify ownership
    const quote = await prisma.quote.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Get business info for email branding
    const business = await prisma.business.findUnique({
      where: { userId: session.user.id },
    });

    const businessName = business?.name || "Your Detailer";
    const pricing = quote.pricingSnapshot as unknown as PricingConfig;

    // Build vehicle info string
    const vehicleParts = [quote.vehicleYear, quote.vehicleMake, quote.vehicleModel].filter(Boolean);
    const vehicleInfo = vehicleParts.length > 0
      ? vehicleParts.join(" ")
      : pricing.vehicleSizes.find((v) => v.id === quote.vehicleSize)?.label || quote.vehicleSize;

    // Build quote URL
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const quoteUrl = `${baseUrl}/q/${quote.shareId}`;

    // Format total
    const total = `$${Number(quote.total).toFixed(0)}`;

    // Format valid until date if present
    const validUntil = quote.validUntil
      ? new Date(quote.validUntil).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : undefined;

    // Send email via Resend
    const { error: sendError } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: email,
      replyTo: business?.email || undefined,
      subject: `Your Quote from ${businessName}`,
      html: quoteEmailTemplate({
        businessName,
        customerName: quote.customerName || "",
        vehicleInfo,
        total,
        quoteUrl,
        validUntil,
      }),
      text: quoteEmailPlainText({
        businessName,
        customerName: quote.customerName || "",
        vehicleInfo,
        total,
        quoteUrl,
      }),
    });

    if (sendError) {
      console.error("Error sending email:", sendError);
      return NextResponse.json(
        { error: sendError.message || "Failed to send email" },
        { status: 500 }
      );
    }

    // Update quote: save customer email and set status to SENT
    await prisma.quote.update({
      where: { id },
      data: {
        customerEmail: email,
        status: "SENT",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
