import { prisma } from "@/lib/prisma";
import { AdminQuoteActions } from "@/components/admin/AdminQuoteActions";
import { AdminExportButton } from "@/components/admin/AdminExportButton";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * Admin quotes page - lists all quotes across all users.
 */
export default async function AdminQuotesPage() {
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        include: { business: true },
      },
    },
  });

  // Calculate totals
  const totalValue = quotes.reduce((sum, q) => sum + Number(q.total), 0);

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-3xl mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quotes
            </h1>
            <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              {quotes.length} quotes totaling ${totalValue.toLocaleString()}
            </p>
          </div>
          <AdminExportButton type="quotes" />
        </div>

        {/* Quotes Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--slate)" }}>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Business
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Vehicle
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Total
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Created
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-[var(--graphite)] transition-colors"
                    style={{ borderBottom: "1px solid var(--slate)" }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{quote.customerName || "Unnamed"}</p>
                        {quote.customerEmail && (
                          <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                            {quote.customerEmail}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{quote.user.business?.name || quote.user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {[quote.vehicleYear, quote.vehicleMake, quote.vehicleModel]
                          .filter(Boolean)
                          .join(" ") || quote.vehicleSize}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold" style={{ color: "var(--copper)" }}>
                        ${Number(quote.total).toFixed(0)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {new Date(quote.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs" style={{ color: "rgba(245, 240, 232, 0.4)" }}>
                        {quote.viewCount} views
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <AdminQuoteActions
                          quoteId={quote.id}
                          shareId={quote.shareId}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {quotes.length === 0 && (
            <div className="p-12 text-center">
              <p style={{ color: "rgba(245, 240, 232, 0.4)" }}>No quotes yet</p>
            </div>
          )}
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
      className="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: style.bg, color: style.text }}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
