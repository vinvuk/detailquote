import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ImpersonationBanner } from "@/components/admin/ImpersonationBanner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard layout with sidebar navigation.
 * Protects all dashboard routes requiring authentication.
 */
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <ImpersonationBanner />
      <div className="flex min-h-screen">
        <Sidebar userEmail={session.user.email} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
