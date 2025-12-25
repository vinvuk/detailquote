import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BusinessForm } from "@/components/settings/BusinessForm";

/**
 * Settings page for business profile.
 */
export default async function SettingsPage() {
  const session = await auth();

  // Get user's business profile
  const business = await prisma.business.findUnique({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="p-6 lg:p-12">
      <div className="max-w-3xl">
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
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-center"
            style={{ background: "var(--copper-glow)", color: "var(--copper)" }}
          >
            Business Profile
          </Link>
          <Link
            href="/dashboard/settings/pricing"
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-center transition-colors hover:bg-[var(--graphite)]"
            style={{ color: "rgba(245, 240, 232, 0.7)" }}
          >
            Pricing
          </Link>
        </div>

        {/* Business Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <BusinessForm business={business} />
        </div>
      </div>
    </div>
  );
}
