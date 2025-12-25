import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AdminUserActions } from "@/components/admin/AdminUserActions";
import { AdminExportButton } from "@/components/admin/AdminExportButton";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * Admin users page - lists all users.
 */
export default async function AdminUsersPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      business: true,
      _count: {
        select: { quotes: true },
      },
    },
  });

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
              Users
            </h1>
            <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              {users.length} registered users
            </p>
          </div>
          <AdminExportButton type="users" />
        </div>

        {/* Users Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--slate)" }}>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Business
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Quotes
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Joined
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium" style={{ color: "var(--copper)" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[var(--graphite)] transition-colors"
                    style={{ borderBottom: "1px solid var(--slate)" }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{user.name || "—"}</p>
                        <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.business ? (
                        <div>
                          <p className="font-medium">{user.business.name}</p>
                          {user.business.phone && (
                            <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                              {user.business.phone}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: "rgba(245, 240, 232, 0.3)" }}>No business</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: user._count.quotes > 0 ? "var(--copper-glow)" : "var(--charcoal)",
                          color: user._count.quotes > 0 ? "var(--copper)" : "rgba(245, 240, 232, 0.4)",
                        }}
                      >
                        {user._count.quotes}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs" style={{ color: "rgba(245, 240, 232, 0.4)" }}>
                        {new Date(user.createdAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <AdminUserActions
                          userId={user.id}
                          userEmail={user.email}
                          userName={user.name}
                          isCurrentUser={user.id === currentUserId}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="p-12 text-center">
              <p style={{ color: "rgba(245, 240, 232, 0.4)" }}>No users yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
