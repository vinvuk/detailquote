import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SparklePattern } from "@/components/backgrounds/AutomotivePatterns";

/**
 * Dashboard home page.
 * Shows user overview and quick actions.
 */
export default async function DashboardPage() {
  const session = await auth();

  // Get quote count for the user
  const quoteCount = await prisma.quote.count({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="p-6 lg:p-12 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ color: "var(--copper)" }}>
        <SparklePattern />
      </div>

      <div className="max-w-5xl relative">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-3xl sm:text-4xl mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome back
          </h1>
          <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
            Here's what's happening with your quotes
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm mb-1" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
              Total Quotes
            </p>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--copper)" }}
            >
              {quoteCount}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm mb-1" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
              This Month
            </p>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--copper)" }}
            >
              0
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm mb-1" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
              Conversion Rate
            </p>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--copper)" }}
            >
              --
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <h2
          className="text-xl mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Quote */}
          <Link
            href="/dashboard/quotes/new"
            className="glass-card rounded-2xl p-6 transition-all hover:scale-[1.02] group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "var(--copper-glow)", color: "var(--copper)" }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3
              className="text-lg mb-1 group-hover:text-[var(--copper)] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Create Quote
            </h3>
            <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              Build a new quote for a customer
            </p>
          </Link>

          {/* View Quotes */}
          <Link
            href="/dashboard/quotes"
            className="glass-card rounded-2xl p-6 transition-all hover:scale-[1.02] group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "var(--copper-glow)", color: "var(--copper)" }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3
              className="text-lg mb-1 group-hover:text-[var(--copper)] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              View Quotes
            </h3>
            <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              See all your quotes and their status
            </p>
          </Link>

          {/* Configure Pricing */}
          <Link
            href="/dashboard/settings/pricing"
            className="glass-card rounded-2xl p-6 transition-all hover:scale-[1.02] group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "var(--copper-glow)", color: "var(--copper)" }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3
              className="text-lg mb-1 group-hover:text-[var(--copper)] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Configure Pricing
            </h3>
            <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              Customize your services and rates
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
