import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

/**
 * Admin emails that have access to the admin dashboard.
 */
const ADMIN_EMAILS = [
  "vincent.vukovic@gmail.com",
  "test@detailquote.com", // Demo mode
];

/**
 * Admin layout with access control.
 * Only allows access to specified admin emails.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is authenticated and is an admin
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className="w-64 p-6 flex flex-col"
        style={{
          background: "linear-gradient(180deg, var(--charcoal) 0%, var(--obsidian) 100%)",
          borderRight: "1px solid var(--slate)",
        }}
      >
        {/* Logo */}
        <Link href="/admin" className="mb-8">
          <h1
            className="text-xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--copper)" }}
          >
            Admin Panel
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <NavLink href="/admin" icon="dashboard">
            Dashboard
          </NavLink>
          <NavLink href="/admin/users" icon="users">
            Users
          </NavLink>
          <NavLink href="/admin/quotes" icon="quotes">
            Quotes
          </NavLink>
        </nav>

        {/* Back to App */}
        <div className="pt-6 border-t" style={{ borderColor: "var(--slate)" }}>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm hover:underline"
            style={{ color: "rgba(245, 240, 232, 0.6)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

/**
 * Navigation link component.
 */
function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: "dashboard" | "users" | "quotes";
  children: React.ReactNode;
}) {
  const icons = {
    dashboard: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
      />
    ),
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
  };

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--graphite)]"
      style={{ color: "rgba(245, 240, 232, 0.8)" }}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icons[icon]}
      </svg>
      {children}
    </Link>
  );
}
