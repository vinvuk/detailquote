import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { PricingConfig } from "@/lib/pricing-defaults";
import { QuoteResponse } from "@/components/quotes/QuoteResponse";

interface PublicQuotePageProps {
  params: Promise<{ shareId: string }>;
}

/**
 * Public quote view page.
 * Accessible via shareable link without authentication.
 */
export default async function PublicQuotePage({ params }: PublicQuotePageProps) {
  const { shareId } = await params;

  // Get quote by shareId
  const quote = await prisma.quote.findUnique({
    where: { shareId },
    include: {
      user: {
        include: {
          business: true,
        },
      },
    },
  });

  if (!quote) {
    notFound();
  }

  // Increment view count if not viewed before
  if (quote.status === "SENT") {
    await prisma.quote.update({
      where: { id: quote.id },
      data: {
        status: "VIEWED",
        viewCount: { increment: 1 },
      },
    });
  } else {
    await prisma.quote.update({
      where: { id: quote.id },
      data: { viewCount: { increment: 1 } },
    });
  }

  const business = quote.user.business;
  const pricing = quote.pricingSnapshot as unknown as PricingConfig;
  const services = quote.services as unknown as string[];
  const addons = quote.addons as unknown as string[];

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Quote Card */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "linear-gradient(135deg, var(--charcoal) 0%, var(--obsidian) 100%)",
            border: "1px solid var(--slate)",
          }}
        >
          {/* Business Header */}
          <div className="text-center mb-8 pb-6 border-b" style={{ borderColor: "var(--slate)" }}>
            <h1
              className="text-2xl sm:text-3xl mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--copper)" }}
            >
              {business?.name || "Quote"}
            </h1>
            {business?.email && (
              <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                {business.email}
              </p>
            )}
            {business?.phone && (
              <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                {business.phone}
              </p>
            )}
          </div>

          {/* Quote For */}
          <div className="mb-8">
            <p className="text-sm mb-1" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
              Quote For
            </p>
            <p className="text-xl" style={{ fontFamily: "var(--font-display)" }}>
              {quote.customerName || "Customer"}
            </p>
            {(quote.vehicleYear || quote.vehicleMake || quote.vehicleModel) && (
              <p className="text-sm mt-1" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                {[quote.vehicleYear, quote.vehicleMake, quote.vehicleModel].filter(Boolean).join(" ")}
              </p>
            )}
          </div>

          {/* Vehicle Details */}
          <div
            className="flex gap-4 mb-8 p-4 rounded-xl"
            style={{ background: "var(--charcoal)" }}
          >
            <div className="flex-1 text-center">
              <p className="text-xs mb-1" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                Size
              </p>
              <p className="text-sm font-medium">
                {pricing.vehicleSizes.find((v) => v.id === quote.vehicleSize)?.label}
              </p>
            </div>
            <div
              className="w-px"
              style={{ background: "var(--slate)" }}
            />
            <div className="flex-1 text-center">
              <p className="text-xs mb-1" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                Condition
              </p>
              <p className="text-sm font-medium">
                {pricing.conditions.find((c) => c.id === quote.condition)?.label}
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-4" style={{ color: "var(--copper)" }}>
              Services
            </h3>
            <div className="space-y-3">
              {services.map((serviceId) => {
                const service = pricing.services.find((s) => s.id === serviceId);
                const vehicleMultiplier = pricing.vehicleSizes.find((v) => v.id === quote.vehicleSize)?.multiplier ?? 1;
                const conditionMultiplier = pricing.conditions.find((c) => c.id === quote.condition)?.multiplier ?? 1;
                const price = Math.round((service?.basePrice ?? 0) * vehicleMultiplier * conditionMultiplier);
                return (
                  <div
                    key={serviceId}
                    className="flex justify-between items-center py-3 border-b"
                    style={{ borderColor: "var(--slate)" }}
                  >
                    <span>{service?.label}</span>
                    <span className="font-medium">${price}</span>
                  </div>
                );
              })}
              {addons.length > 0 && addons.map((addonId) => {
                const addon = pricing.addons.find((a) => a.id === addonId);
                const vehicleMultiplier = pricing.vehicleSizes.find((v) => v.id === quote.vehicleSize)?.multiplier ?? 1;
                const price = Math.round((addon?.price ?? 0) * vehicleMultiplier);
                return (
                  <div
                    key={addonId}
                    className="flex justify-between items-center py-3 border-b"
                    style={{ borderColor: "var(--slate)" }}
                  >
                    <span style={{ color: "rgba(245, 240, 232, 0.7)" }}>{addon?.label}</span>
                    <span className="font-medium">+${price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          {quote.notes && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3" style={{ color: "var(--copper)" }}>
                Notes
              </h3>
              <p
                className="text-sm p-4 rounded-xl"
                style={{ background: "var(--charcoal)", color: "rgba(245, 240, 232, 0.7)" }}
              >
                {quote.notes}
              </p>
            </div>
          )}

          {/* Total */}
          <div className="pt-6 border-t" style={{ borderColor: "var(--copper)" }}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">Total</span>
              <span
                className="text-5xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--copper)",
                }}
              >
                ${Number(quote.total).toFixed(0)}
              </span>
            </div>

            {/* Accept/Decline Buttons */}
            <QuoteResponse
              shareId={shareId}
              status={quote.status}
              businessEmail={business?.email}
              businessPhone={business?.phone}
            />
          </div>

          {/* Quote Details */}
          <p
            className="text-xs text-center mt-6"
            style={{ color: "rgba(245, 240, 232, 0.4)" }}
          >
            Quote created {new Date(quote.createdAt).toLocaleDateString()}
            {quote.validUntil && (
              <> &middot; Valid until {new Date(quote.validUntil).toLocaleDateString()}</>
            )}
          </p>
        </div>

        {/* Powered By */}
        <p
          className="text-center text-sm mt-8"
          style={{ color: "rgba(245, 240, 232, 0.3)" }}
        >
          Powered by{" "}
          <Link
            href="/"
            className="hover:underline"
            style={{ color: "var(--copper)" }}
          >
            DetailQuote
          </Link>
        </p>
      </div>
    </div>
  );
}
