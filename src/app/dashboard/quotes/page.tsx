import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Force dynamic rendering to always show fresh data
export const dynamic = "force-dynamic";

/**
 * Quotes list page.
 */
export default async function QuotesPage() {
  const session = await auth();

  // Get user's quotes
  const quotes = await prisma.quote.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 lg:p-12">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-3xl mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quotes
            </h1>
            <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              Manage your customer quotes
            </p>
          </div>
          <Link
            href="/dashboard/quotes/new"
            className="btn-copper px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Quote
          </Link>
        </div>

        {/* Quotes List */}
        {quotes.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--copper-glow)" }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: "var(--copper)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2
              className="text-xl mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              No quotes yet
            </h2>
            <p className="text-sm mb-6" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              Create your first quote to get started
            </p>
            <Link
              href="/dashboard/quotes/new"
              className="btn-copper px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Quote
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <Link
                key={quote.id}
                href={`/dashboard/quotes/${quote.id}`}
                className="glass-card rounded-2xl p-5 flex items-center justify-between transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--copper-glow)" }}
                  >
                    <svg
                      className="w-6 h-6"
                      style={{ color: "var(--copper)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-[var(--copper)] transition-colors">
                      {quote.customerName || "Unnamed Quote"}
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                      {quote.vehicleMake && quote.vehicleModel
                        ? `${quote.vehicleYear || ""} ${quote.vehicleMake} ${quote.vehicleModel}`.trim()
                        : quote.vehicleSize}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <StatusBadge status={quote.status} />
                  <div className="text-right">
                    <p
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "var(--copper)" }}
                    >
                      ${Number(quote.total).toFixed(0)}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(245, 240, 232, 0.4)" }}>
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5"
                    style={{ color: "rgba(245, 240, 232, 0.3)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
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
      className="px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: style.bg, color: style.text }}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
