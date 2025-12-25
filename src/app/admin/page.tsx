import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * Admin dashboard with key metrics.
 */
export default async function AdminDashboardPage() {
  // Fetch all metrics in parallel
  const [
    totalUsers,
    totalQuotes,
    quotesByStatus,
    recentUsers,
    recentQuotes,
    totalQuoteValue,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.quote.count(),
    prisma.quote.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { quotes: true } } },
    }),
    prisma.quote.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
    prisma.quote.aggregate({
      _sum: { total: true },
    }),
  ]);

  // Calculate quote stats
  const statusCounts = quotesByStatus.reduce(
    (acc, item) => {
      acc[item.status] = item._count.status;
      return acc;
    },
    {} as Record<string, number>
  );

  const acceptedQuotes = statusCounts["ACCEPTED"] || 0;
  const sentQuotes = statusCounts["SENT"] || 0;
  const viewedQuotes = statusCounts["VIEWED"] || 0;
  const acceptanceRate =
    sentQuotes + viewedQuotes + acceptedQuotes > 0
      ? Math.round((acceptedQuotes / (sentQuotes + viewedQuotes + acceptedQuotes)) * 100)
      : 0;

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Dashboard
          </h1>
          <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
            Overview of your DetailQuote platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Users"
            value={totalUsers}
            icon="users"
          />
          <StatCard
            label="Total Quotes"
            value={totalQuotes}
            icon="quotes"
          />
          <StatCard
            label="Quote Value"
            value={`$${Number(totalQuoteValue._sum.total || 0).toLocaleString()}`}
            icon="dollar"
          />
          <StatCard
            label="Acceptance Rate"
            value={`${acceptanceRate}%`}
            icon="check"
          />
        </div>

        {/* Quote Status Breakdown */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2
            className="text-lg mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Quote Status Breakdown
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {["DRAFT", "SENT", "VIEWED", "ACCEPTED", "DECLINED", "EXPIRED"].map((status) => (
              <div key={status} className="text-center">
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {statusCounts[status] || 0}
                </p>
                <p className="text-xs" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="glass-card rounded-2xl p-6">
            <h2
              className="text-lg mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Recent Users
            </h2>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-2 border-b"
                  style={{ borderColor: "var(--slate)" }}
                >
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-xs" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className="text-sm px-2 py-1 rounded-lg"
                    style={{ background: "var(--charcoal)" }}
                  >
                    {user._count.quotes} quotes
                  </span>
                </div>
              ))}
              {recentUsers.length === 0 && (
                <p style={{ color: "rgba(245, 240, 232, 0.4)" }}>No users yet</p>
              )}
            </div>
          </div>

          {/* Recent Quotes */}
          <div className="glass-card rounded-2xl p-6">
            <h2
              className="text-lg mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Recent Quotes
            </h2>
            <div className="space-y-3">
              {recentQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="flex items-center justify-between py-2 border-b"
                  style={{ borderColor: "var(--slate)" }}
                >
                  <div>
                    <p className="font-medium">{quote.customerName || "Unnamed"}</p>
                    <p className="text-xs" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                      by {quote.user.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: "var(--copper)", fontWeight: 600 }}>
                      ${Number(quote.total).toFixed(0)}
                    </p>
                    <StatusBadge status={quote.status} />
                  </div>
                </div>
              ))}
              {recentQuotes.length === 0 && (
                <p style={{ color: "rgba(245, 240, 232, 0.4)" }}>No quotes yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Stat card component.
 */
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: "users" | "quotes" | "dollar" | "check";
}) {
  const icons = {
    users: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    ),
    quotes: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    dollar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    check: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: "var(--copper-glow)" }}
        >
          <svg
            className="w-5 h-5"
            style={{ color: "var(--copper)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {icons[icon]}
          </svg>
        </div>
      </div>
      <p
        className="text-2xl font-bold mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </p>
      <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
        {label}
      </p>
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
      className="text-xs px-2 py-0.5 rounded-full"
      style={{ background: style.bg, color: style.text }}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
