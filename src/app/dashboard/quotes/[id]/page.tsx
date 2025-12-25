import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { PricingConfig } from "@/lib/pricing-defaults";
import { ShareButton } from "@/components/quotes/ShareButton";
import { QuoteActions } from "@/components/quotes/QuoteActions";
import { SendQuoteButton } from "@/components/quotes/SendQuoteButton";

// Force dynamic rendering to always show fresh data
export const dynamic = "force-dynamic";

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Quote detail page.
 */
export default async function QuotePage({ params }: QuotePageProps) {
  const session = await auth();
  const { id } = await params;

  // Get quote
  const quote = await prisma.quote.findFirst({
    where: {
      id,
      userId: session?.user?.id,
    },
  });

  if (!quote) {
    notFound();
  }

  // Get business info for display
  const business = await prisma.business.findUnique({
    where: { userId: session?.user?.id },
  });

  const pricing = quote.pricingSnapshot as unknown as PricingConfig;
  const services = quote.services as unknown as string[];
  const addons = quote.addons as unknown as string[];

  return (
    <div className="p-6 lg:p-12">
      <div className="max-w-4xl">
        {/* Back Link */}
        <Link
          href="/dashboard/quotes"
          className="inline-flex items-center gap-2 text-sm mb-6 hover:underline"
          style={{ color: "var(--copper)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Quotes
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1
              className="text-3xl mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {quote.customerName || "Quote"}
            </h1>
            <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              Created {new Date(quote.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SendQuoteButton
              quoteId={quote.id}
              customerEmail={quote.customerEmail}
              status={quote.status}
            />
            <ShareButton shareId={quote.shareId} />
            <QuoteActions quoteId={quote.id} status={quote.status} />
          </div>
        </div>

        {/* Quote Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Business Header */}
          <div className="flex items-start justify-between mb-8 pb-6 border-b" style={{ borderColor: "var(--slate)" }}>
            <div>
              <h2
                className="text-xl mb-1"
                style={{ fontFamily: "var(--font-display)", color: "var(--copper)" }}
              >
                {business?.name || "Your Business"}
              </h2>
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
            <StatusBadge status={quote.status} />
          </div>

          {/* Customer & Vehicle Info */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: "var(--copper)" }}>
                Customer
              </h3>
              {quote.customerName || quote.customerEmail || quote.customerPhone ? (
                <div className="space-y-1">
                  {quote.customerName && <p>{quote.customerName}</p>}
                  {quote.customerEmail && (
                    <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                      {quote.customerEmail}
                    </p>
                  )}
                  {quote.customerPhone && (
                    <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                      {quote.customerPhone}
                    </p>
                  )}
                </div>
              ) : (
                <p style={{ color: "rgba(245, 240, 232, 0.4)" }}>No customer info</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: "var(--copper)" }}>
                Vehicle
              </h3>
              <div className="space-y-1">
                {(quote.vehicleYear || quote.vehicleMake || quote.vehicleModel) && (
                  <p>
                    {[quote.vehicleYear, quote.vehicleMake, quote.vehicleModel].filter(Boolean).join(" ")}
                  </p>
                )}
                <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                  {pricing.vehicleSizes.find((v) => v.id === quote.vehicleSize)?.label} &middot;{" "}
                  {pricing.conditions.find((c) => c.id === quote.condition)?.label} condition
                </p>
              </div>
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
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span
                className="text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--copper)",
                }}
              >
                ${Number(quote.total).toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Status badge component.
 */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    DRAFT: { bg: "rgba(156, 163, 175, 0.2)", text: "#9ca3af" },
    SENT: { bg: "rgba(59, 130, 246, 0.2)", text: "#3b82f6" },
    VIEWED: { bg: "rgba(168, 85, 247, 0.2)", text: "#a855f7" },
    ACCEPTED: { bg: "rgba(74, 222, 128, 0.2)", text: "#4ade80" },
    DECLINED: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" },
    EXPIRED: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b" },
  };

  const style = styles[status] || styles.DRAFT;

  return (
    <span
      className="px-3 py-1.5 rounded-full text-sm font-medium"
      style={{ background: style.bg, color: style.text }}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
