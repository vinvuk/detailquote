import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDefaultPricing, type PricingConfig } from "@/lib/pricing-defaults";
import { QuoteBuilder } from "@/components/quotes/QuoteBuilder";

/**
 * Create new quote page.
 */
export default async function NewQuotePage() {
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
      <div className="max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Create Quote
          </h1>
          <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
            Build a quote for your customer
          </p>
        </div>

        {/* Quote Builder */}
        <QuoteBuilder
          pricing={pricingConfig}
          businessName={business?.name}
          businessEmail={business?.email}
          businessPhone={business?.phone}
        />
      </div>
    </div>
  );
}
