"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

/**
 * Login form component with Magic Link authentication.
 * Uses useSearchParams which requires Suspense boundary.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const isVerifyMode = searchParams.get("verify") === "true";
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  /**
   * Handles form submission for Magic Link sign in.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("resend", {
        email,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError("Something went wrong. Please try again.");
        setIsLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  if (isVerifyMode) {
    return (
      <div className="glass-card rounded-3xl p-8 sm:p-10">
        <div className="text-center">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1
            className="text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Check your email
          </h1>
          <p
            className="text-base mb-6"
            style={{ color: "rgba(245, 240, 232, 0.7)" }}
          >
            We sent a magic link to your inbox. Click the link to sign in.
          </p>
          <p
            className="text-sm"
            style={{ color: "rgba(245, 240, 232, 0.5)" }}
          >
            Didn't receive it?{" "}
            <button
              onClick={() => window.location.reload()}
              className="hover:underline"
              style={{ color: "var(--copper)" }}
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-8 sm:p-10">
      <div className="text-center mb-8">
        <h1
          className="text-2xl sm:text-3xl mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome back
        </h1>
        <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
          Sign in to manage your quotes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--copper)" }}
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
            style={{
              background: "var(--charcoal)",
              border: "1px solid var(--slate)",
              color: "var(--cream)",
            }}
          />
        </div>

        {error && (
          <div
            className="px-4 py-3 rounded-xl text-sm"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email}
          className="btn-copper w-full py-4 rounded-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending magic link...
            </span>
          ) : (
            "Continue with Email"
          )}
        </button>
      </form>

      <p
        className="text-center text-sm mt-6"
        style={{ color: "rgba(245, 240, 232, 0.5)" }}
      >
        No password needed. We'll send you a magic link.
      </p>
    </div>
  );
}
