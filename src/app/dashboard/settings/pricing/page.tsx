import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PricingEditor } from "@/components/settings/PricingEditor";
import { getDefaultPricing, type PricingConfig } from "@/lib/pricing-defaults";

/**
 * Pricing settings page.
 */
export default async function PricingSettingsPage() {
  const session = await auth();

  // Get user's business and pricing
  const business = await prisma.business.findUnique({
    where: { userId: session?.user?.id },
    include: { pricing: true },
  });

  // Use saved pricing or defaults
  const pricingConfig: PricingConfig = business?.pricing
    ? {
        vehicleSizes: business.pricing.vehicleSizes as unknown as PricingConfig["vehicleSizes"],
        conditions: business.pricing.conditions as unknown as PricingConfig["conditions"],
        services: business.pricing.services as unknown as PricingConfig["services"],
        addons: business.pricing.addons as unknown as PricingConfig["addons"],
      }
    : getDefaultPricing();

  return (
    <div className="p-6 lg:p-12">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Settings
          </h1>
          <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
            Manage your business profile and preferences
          </p>
        </div>

        {/* Navigation Tabs */}
        <div
          className="flex gap-1 mb-8 p-1 rounded-xl"
          style={{ background: "var(--charcoal)" }}
        >
          <Link
            href="/dashboard/settings"
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-center transition-colors hover:bg-[var(--graphite)]"
            style={{ color: "rgba(245, 240, 232, 0.7)" }}
          >
            Business Profile
          </Link>
          <Link
            href="/dashboard/settings/pricing"
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-center"
            style={{ background: "var(--copper-glow)", color: "var(--copper)" }}
          >
            Pricing
          </Link>
        </div>

        {/* Pricing Editor */}
        <PricingEditor initialPricing={pricingConfig} hasSavedPricing={!!business?.pricing} />
      </div>
    </div>
  );
}
