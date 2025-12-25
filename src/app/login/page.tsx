import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

/**
 * Login page with Magic Link authentication.
 * Matches the DetailQuote design system.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-10 px-6 py-8 lg:px-12">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" style={{ fontFamily: "var(--font-display)" }}>
            <span
              className="text-2xl tracking-tight"
              style={{ color: "var(--cream)" }}
            >
              Detail<span style={{ color: "var(--copper)" }}>Quote</span>
            </span>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Suspense fallback={<LoginSkeleton />}>
            <LoginForm />
          </Suspense>

          <p
            className="text-center text-sm mt-6"
            style={{ color: "rgba(245, 240, 232, 0.4)" }}
          >
            Don't have an account?{" "}
            <span style={{ color: "var(--copper)" }}>
              One will be created automatically.
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

/**
 * Loading skeleton for the login form.
 */
function LoginSkeleton() {
  return (
    <div className="glass-card rounded-3xl p-8 sm:p-10 animate-pulse">
      <div className="text-center mb-8">
        <div
          className="h-8 w-48 mx-auto rounded mb-2"
          style={{ background: "var(--charcoal)" }}
        />
        <div
          className="h-4 w-32 mx-auto rounded"
          style={{ background: "var(--charcoal)" }}
        />
      </div>
      <div className="space-y-6">
        <div>
          <div
            className="h-4 w-24 rounded mb-2"
            style={{ background: "var(--charcoal)" }}
          />
          <div
            className="h-12 w-full rounded-xl"
            style={{ background: "var(--charcoal)" }}
          />
        </div>
        <div
          className="h-14 w-full rounded-xl"
          style={{ background: "var(--charcoal)" }}
        />
      </div>
    </div>
  );
}
