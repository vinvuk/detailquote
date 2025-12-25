"use client";

import { useState } from "react";

/**
 * Main landing page for DetailQuote.
 * Displays value proposition and waitlist signup form.
 * @returns The landing page component
 */
export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  /**
   * Handles waitlist form submission.
   * Sends email to the API endpoint for storage.
   * @param e - Form submit event
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll notify you when we launch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
            Coming Soon
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Stop guessing
            <span className="block text-blue-400">what to charge</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            The simple quote calculator for auto detailers.
            Create professional, instant price quotes your customers can trust.
            No bloated software. No monthly contracts.
          </p>
        </div>

        {/* Pain Points */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <PainPoint
            icon="❓"
            title="'How much do you charge?'"
            description="The dreaded question. You pause, guess, and hope you didn't underprice yourself."
          />
          <PainPoint
            icon="📝"
            title="Mental math every time"
            description="Vehicle size, condition, services... calculating on the spot looks unprofessional."
          />
          <PainPoint
            icon="💸"
            title="Leaving money on the table"
            description="Without consistent pricing, you're probably charging too little—or losing jobs by charging too much."
          />
        </div>

        {/* Solution */}
        <div className="mt-20 rounded-2xl bg-zinc-800/50 p-8 sm:p-12">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
            One tool. Instant quotes. Every time.
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Feature
              title="Set your prices once"
              description="Configure your base rates for different vehicle sizes and services."
            />
            <Feature
              title="Adjust for condition"
              description="Light, moderate, or heavy? The calculator handles the math."
            />
            <Feature
              title="Add-ons included"
              description="Interior, engine bay, wheels—add extras with one tap."
            />
            <Feature
              title="Share professional quotes"
              description="Send customers a clean quote link. No scribbled napkin math."
            />
          </div>
        </div>

        {/* Pricing Teaser */}
        <div className="mt-16 text-center">
          <p className="text-zinc-500">Simple pricing for simple tools</p>
          <p className="mt-2 text-3xl font-bold text-white">
            $9<span className="text-lg font-normal text-zinc-500">/month</span>
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Less than the cost of one interior detail
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="mt-16 rounded-2xl bg-blue-500/10 p-8 sm:p-12">
          <h2 className="text-center text-2xl font-semibold text-white">
            Get early access
          </h2>
          <p className="mt-2 text-center text-zinc-400">
            Join the waitlist. First 50 signups get lifetime access at launch price.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === "loading" || status === "success"}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </div>

            {message && (
              <p className={`mt-4 text-center text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-zinc-600">
          <p>Built for detailers, by people who get it.</p>
        </footer>
      </main>
    </div>
  );
}

/**
 * Pain point card component.
 * @param icon - Emoji icon to display
 * @param title - Pain point title
 * @param description - Pain point description
 */
function PainPoint({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="rounded-xl bg-zinc-800/30 p-6 text-center">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-500">{description}</p>
    </div>
  );
}

/**
 * Feature card component.
 * @param title - Feature title
 * @param description - Feature description
 */
function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
        ✓
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
