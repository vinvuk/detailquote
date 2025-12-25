"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { TiltCard } from "@/components/TiltCard";

/**
 * Main landing page for DetailQuote.
 * Showroom Polish aesthetic - evoking the gleam of freshly detailed paint.
 * @returns The landing page component
 */
export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const calculatorRef = useRef<HTMLElement>(null);
  const signupRef = useRef<HTMLElement>(null);

  /**
   * Scrolls to the calculator section.
   */
  function scrollToCalculator() {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  /**
   * Scrolls to the signup section.
   */
  function scrollToSignup() {
    signupRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  /**
   * Handles waitlist form submission.
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
        setMessage("You're on the list. We'll be in touch.");
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
    <div className="min-h-screen relative">

      {/* Header */}
      <header className="relative z-10 px-6 py-8 lg:px-12">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="animate-fade-in opacity-0" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-2xl tracking-tight" style={{ color: 'var(--cream)' }}>
              Detail<span style={{ color: 'var(--copper)' }}>Quote</span>
            </span>
          </div>
          <button
            onClick={scrollToCalculator}
            className="hidden sm:block text-sm px-4 py-2 rounded-lg transition-colors opacity-0 animate-fade-in delay-200 hover:bg-[var(--charcoal)]"
            style={{ color: 'var(--copper)' }}
          >
            Try the Demo
          </button>
        </nav>
      </header>

      <main className="relative z-10 px-6 lg:px-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto pt-12 lg:pt-20 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-in-up"
              style={{
                background: 'var(--copper-glow)',
                border: '1px solid rgba(197, 147, 90, 0.2)'
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--copper)' }}
              />
              <span className="text-sm font-medium" style={{ color: 'var(--copper)' }}>
                Now accepting early access
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 opacity-0 animate-fade-in-up delay-100"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Stop guessing.
              <br />
              <span style={{ color: 'var(--copper)' }}>Start quoting.</span>
            </h1>

            <p
              className="text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200"
              style={{ color: 'rgba(245, 240, 232, 0.7)' }}
            >
              The quote calculator for detailers who are done guessing prices,
              quoting differently every time, and leaving money on the table.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-300">
              <button
                onClick={scrollToCalculator}
                className="btn-copper px-8 py-4 rounded-xl text-base font-semibold"
              >
                Try the Calculator
              </button>
              <button
                onClick={scrollToSignup}
                className="px-8 py-4 rounded-xl text-base font-medium transition-all hover:bg-[var(--charcoal)]"
                style={{
                  border: '1px solid var(--slate)',
                  color: 'var(--cream)'
                }}
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Calculator Demo */}
        <section ref={calculatorRef} className="max-w-7xl mx-auto py-16 scroll-mt-8">
          <QuoteCalculator onSignupClick={scrollToSignup} />
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto">
          <div className="divider-copper" />
        </div>

        {/* Pain Points */}
        <section className="max-w-7xl mx-auto py-24">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl mb-4 opacity-0 animate-fade-in-up"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sound familiar?
            </h2>
            <p
              className="text-lg opacity-0 animate-fade-in-up delay-100"
              style={{ color: 'rgba(245, 240, 232, 0.6)' }}
            >
              Every detailer knows these struggles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 perspective-container">
            <TiltCard className="opacity-0 animate-fade-in-up delay-200" maxTilt={8} glare>
              <PainCard
                number="01"
                title="The awkward pause"
                description="Customer asks 'how much?' and you freeze. You're doing math in your head while they wait. Not a great look."
              />
            </TiltCard>
            <TiltCard className="opacity-0 animate-fade-in-up delay-300" maxTilt={8} glare>
              <PainCard
                number="02"
                title="Every quote is different"
                description="Same SUV, same services, different price every time. If you have a team, they're quoting differently too."
              />
            </TiltCard>
            <TiltCard className="opacity-0 animate-fade-in-up delay-400" maxTilt={8} glare>
              <PainCard
                number="03"
                title="Leaving money on the table"
                description="You quote low to avoid sticker shock, then regret it halfway through. Or you forget to charge for add-ons."
              />
            </TiltCard>
          </div>
        </section>

        {/* Solution Section */}
        <section className="max-w-7xl mx-auto py-24 perspective-container">
          <div
            className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 opacity-0 animate-scale-in demo-3d shine-effect"
          >
            <div className="text-center mb-16">
              <span
                className="text-sm font-medium tracking-widest uppercase mb-4 block"
                style={{ color: 'var(--copper)' }}
              >
                The Solution
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                One tool. Instant quotes.
                <br />
                <span style={{ color: 'var(--copper)' }}>Every single time.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
              <Feature
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                }
                title="Set your prices once"
                description="Configure your base rates for sedans, SUVs, trucks. Your prices, your margins."
              />
              <Feature
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                }
                title="Adjust for condition"
                description="Light, moderate, heavy—one tap. No more $15/hour nightmare jobs because you didn't charge for the mess."
              />
              <Feature
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
                title="Never forget add-ons"
                description="Engine bay, ceramic coating, pet hair removal. They're all there—just tap to add."
              />
              <Feature
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                }
                title="Send a link, not a text"
                description="Customers see a professional breakdown—not just a number. It helps justify the price."
              />
            </div>
          </div>
        </section>

        {/* Before/After Comparison */}
        <section className="max-w-7xl mx-auto py-24">
          <div
            className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16"
          >
            <div className="text-center mb-12">
              <span
                className="text-sm font-medium tracking-widest uppercase mb-4 block"
                style={{ color: 'var(--copper)' }}
              >
                The Difference
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                From awkward to <span style={{ color: 'var(--copper)' }}>professional</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative">
              {/* Connecting arrow for desktop */}
              <div
                className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--copper) 0%, var(--copper-light) 100%)',
                    boxShadow: '0 0 30px rgba(197, 147, 90, 0.4)'
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="var(--obsidian)">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Before */}
              <div
                className="rounded-2xl p-6 lg:p-8 h-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.03) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)'
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#ef4444'
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <div>
                    <span className="text-lg font-semibold block" style={{ color: '#ef4444' }}>
                      Without DetailQuote
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(239, 68, 68, 0.6)' }}>
                      The old way
                    </span>
                  </div>
                </div>
                <ul className="space-y-4">
                  <ComparisonItem negative text="Doing math in your head while they wait" />
                  <ComparisonItem negative text="'Uh, probably around... $250ish?'" />
                  <ComparisonItem negative text="Texting a number with no breakdown" />
                  <ComparisonItem negative text="Forgetting what you quoted last week" />
                  <ComparisonItem negative text="Quoting low to avoid sticker shock" />
                  <ComparisonItem negative text="Realizing halfway through you undercharged" />
                </ul>
              </div>

              {/* After */}
              <div
                className="rounded-2xl p-6 lg:p-8 h-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(197, 147, 90, 0.12) 0%, rgba(197, 147, 90, 0.05) 100%)',
                  border: '1px solid rgba(197, 147, 90, 0.25)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, var(--copper) 0%, var(--copper-light) 100%)',
                      color: 'var(--obsidian)'
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <span className="text-lg font-semibold block" style={{ color: 'var(--copper)' }}>
                      With DetailQuote
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(197, 147, 90, 0.7)' }}>
                      The professional way
                    </span>
                  </div>
                </div>
                <ul className="space-y-4">
                  <ComparisonItem text="Quote in 30 seconds, on the spot" />
                  <ComparisonItem text="'That's $287. Here's the breakdown.'" />
                  <ComparisonItem text="Send a link they can review later" />
                  <ComparisonItem text="Condition slider = fair price every time" />
                  <ComparisonItem text="Same price whether you quote or your team does" />
                  <ComparisonItem text="Actually get paid for the work you do" />
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Experience Preview */}
        <section className="max-w-7xl mx-auto py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span
                className="text-sm font-medium tracking-widest uppercase mb-4 block"
                style={{ color: 'var(--copper)' }}
              >
                Customer Experience
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Send a link.
                <br />
                <span style={{ color: 'var(--copper)' }}>Not a text message.</span>
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: 'rgba(245, 240, 232, 0.7)' }}
              >
                Instead of texting "around $300", send your customer a professional
                quote link. They see exactly what they're paying for—and you look
                like the pro you are.
              </p>
              <ul className="space-y-4">
                <BenefitItem
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  }
                  title="Mobile-optimized"
                  description="Looks great on any device. Quote on-site from your phone."
                />
                <BenefitItem
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  }
                  title="One-tap sharing"
                  description="Text, email, or DM—share however your customers prefer."
                />
                <BenefitItem
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  }
                  title="Your branding"
                  description="Your business name on every quote. Professional from day one."
                />
              </ul>
            </div>

            {/* Customer Quote Preview Mockup */}
            <div className="relative" style={{ maxWidth: '380px', margin: '0 auto' }}>
              {/* Background glow */}
              <div
                className="absolute -inset-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(197, 147, 90, 0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  zIndex: 0
                }}
              />
              <TiltCard maxTilt={6} scale={1.01} glare={false} style={{ zIndex: 1 }}>
                <div className="glass-card rounded-3xl p-6">
                {/* Phone-like frame */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: 'var(--obsidian)' }}
                >
                  {/* Status bar mockup */}
                  <div
                    className="flex justify-between items-center px-6 py-3 text-xs"
                    style={{ color: 'var(--cream)' }}
                  >
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                      </svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 4h-3V2h-4v2H7v18h10V4zm-4 16h-2v-2h2v2zm0-4h-2V9h2v7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Quote content */}
                  <div className="px-6 pb-8">
                    <div className="text-center mb-6">
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                        style={{ background: 'var(--copper-glow)', color: 'var(--copper)' }}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 5h8m-4 5v-2m-6 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--copper)' }}>
                        Elite Auto Detailing
                      </p>
                      <h4
                        className="text-xl mt-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Your Quote
                      </h4>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div
                        className="flex justify-between py-2 border-b text-sm"
                        style={{ borderColor: 'var(--slate)' }}
                      >
                        <span style={{ color: 'rgba(245, 240, 232, 0.6)' }}>Full Exterior Detail</span>
                        <span>$180</span>
                      </div>
                      <div
                        className="flex justify-between py-2 border-b text-sm"
                        style={{ borderColor: 'var(--slate)' }}
                      >
                        <span style={{ color: 'rgba(245, 240, 232, 0.6)' }}>Interior Deep Clean</span>
                        <span>$120</span>
                      </div>
                      <div
                        className="flex justify-between py-2 border-b text-sm"
                        style={{ borderColor: 'var(--slate)' }}
                      >
                        <span style={{ color: 'rgba(245, 240, 232, 0.6)' }}>Engine Bay</span>
                        <span>$45</span>
                      </div>
                    </div>

                    <div
                      className="flex justify-between items-center py-4 border-t"
                      style={{ borderColor: 'var(--copper)' }}
                    >
                      <span className="font-medium">Total</span>
                      <span
                        className="text-2xl font-bold"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--copper)' }}
                      >
                        $345
                      </span>
                    </div>

                    <button
                      className="w-full py-3 rounded-xl text-sm font-semibold mt-4"
                      style={{
                        background: 'var(--copper)',
                        color: 'var(--obsidian)'
                      }}
                    >
                      Accept Quote
                    </button>

                    <p
                      className="text-xs text-center mt-4"
                      style={{ color: 'rgba(245, 240, 232, 0.4)' }}
                    >
                      Valid for 7 days • Questions? Reply to this link
                    </p>
                  </div>
                </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* Why Not Alternatives */}
        <section className="max-w-7xl mx-auto py-24">
          <div
            className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div
              className="absolute top-0 left-1/4 w-64 h-64 opacity-5 blur-3xl"
              style={{ background: 'var(--copper)' }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-48 h-48 opacity-5 blur-3xl"
              style={{ background: '#ef4444' }}
            />

            <div className="relative">
              <div className="text-center mb-12">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444'
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Common objection
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  "Can't I just use a spreadsheet?"
                </h2>
                <p
                  className="text-lg max-w-2xl mx-auto"
                  style={{ color: 'rgba(245, 240, 232, 0.6)' }}
                >
                  You could. But here's why detailers switch.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 perspective-container">
                <TiltCard maxTilt={5} glare glareOpacity={0.08}>
                  <AlternativeCard
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    }
                    title="Spreadsheets"
                    problems={[
                      "Good luck using Excel on-site",
                      "Can't send customers a link",
                      "One wrong formula = wrong price",
                      "Doesn't exactly scream 'professional'"
                    ]}
                  />
                </TiltCard>
                <TiltCard maxTilt={5} glare glareOpacity={0.08}>
                  <AlternativeCard
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    }
                    title="Mental Math"
                    problems={[
                      "'Uh, around... $250ish?'",
                      "Different price for the same SUV every time",
                      "Easy to forget add-ons (pet hair, engine bay...)",
                      "No record—so no way to repeat it"
                    ]}
                  />
                </TiltCard>
                <TiltCard maxTilt={5} glare glareOpacity={0.08}>
                  <AlternativeCard
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                    title="Expensive CRMs"
                    problems={[
                      "$50-200/month—for features you'll never touch",
                      "Weeks of setup before you send your first quote",
                      "Built for sales teams, not mobile detailers",
                      "You needed a quote tool, not a CRM degree"
                    ]}
                  />
                </TiltCard>
              </div>

              {/* Bottom callout */}
              <div
                className="mt-12 text-center p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(197, 147, 90, 0.1) 0%, rgba(197, 147, 90, 0.05) 100%)',
                  border: '1px solid rgba(197, 147, 90, 0.2)'
                }}
              >
                <p
                  className="text-lg"
                  style={{ color: 'rgba(245, 240, 232, 0.8)' }}
                >
                  DetailQuote does <span style={{ color: 'var(--copper)', fontWeight: 600 }}>one thing</span> exceptionally well:
                </p>
                <p
                  className="text-xl mt-2 font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}
                >
                  instant, professional quotes from your phone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto">
          <div className="divider-copper" />
        </div>

        {/* Pricing */}
        <section className="max-w-7xl mx-auto py-24 text-center">
          <span
            className="text-sm font-medium tracking-widest uppercase mb-4 block opacity-0 animate-fade-in"
            style={{ color: 'var(--copper)' }}
          >
            Simple Pricing
          </span>

          <div className="opacity-0 animate-fade-in-up delay-100">
            <div className="inline-flex items-baseline gap-1">
              <span
                className="text-7xl sm:text-8xl lg:text-9xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}
              >
                $9
              </span>
              <span
                className="text-2xl"
                style={{ color: 'var(--slate)' }}
              >
                /month
              </span>
            </div>
          </div>

          <p
            className="mt-6 text-lg opacity-0 animate-fade-in-up delay-200"
            style={{ color: 'rgba(245, 240, 232, 0.6)' }}
          >
            Less than the cost of one interior detail.
            <br />
            Pays for itself with your first properly priced job.
          </p>

          <div
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-0 animate-fade-in-up delay-300"
            style={{ color: 'var(--slate)' }}
          >
            <span className="flex items-center gap-2">
              <CheckIcon /> Unlimited quotes
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon /> Shareable quote links
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon /> Cancel anytime
            </span>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={signupRef} className="max-w-7xl mx-auto py-24 scroll-mt-8 perspective-container">
          <div
            className="rounded-3xl p-8 sm:p-12 lg:p-16 text-center opacity-0 animate-scale-in demo-3d shine-effect"
            style={{
              background: 'linear-gradient(135deg, rgba(197, 147, 90, 0.1) 0%, rgba(197, 147, 90, 0.05) 100%)',
              border: '1px solid rgba(197, 147, 90, 0.2)'
            }}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ready to quote with confidence?
            </h2>
            <p
              className="text-lg mb-10 max-w-xl mx-auto"
              style={{ color: 'rgba(245, 240, 232, 0.7)' }}
            >
              Join the waitlist. Be first to get access when we launch.
              <br />
              <span style={{ color: 'var(--copper)' }}>First 50 signups get lifetime access at launch price.</span>
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === "loading" || status === "success"}
                  className="input-showroom flex-1 px-5 py-4 rounded-xl text-base disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="btn-copper px-8 py-4 rounded-xl text-base disabled:opacity-50 whitespace-nowrap"
                >
                  {status === "loading" ? "Joining..." : "Join Waitlist"}
                </button>
              </div>
              {message && (
                <p
                  className="mt-4 text-sm"
                  style={{ color: status === "success" ? '#4ade80' : '#f87171' }}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="divider-copper mb-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-lg tracking-tight" style={{ color: 'var(--cream)' }}>
                Detail<span style={{ color: 'var(--copper)' }}>Quote</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm hover:underline transition-colors"
                style={{ color: 'var(--slate)' }}
              >
                Privacy Policy
              </Link>
              <p className="text-sm" style={{ color: 'var(--slate)' }}>
                Built for detailers, by people who get it.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Pain point card component with numbered styling.
 */
function PainCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-8 h-full">
      <span
        className="text-6xl font-bold mb-4 block"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--copper)',
          opacity: 0.3
        }}
      >
        {number}
      </span>
      <h3
        className="text-xl font-semibold mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p style={{ color: 'rgba(245, 240, 232, 0.6)' }}>
        {description}
      </p>
    </div>
  );
}

/**
 * Feature item component with icon.
 */
function Feature({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: 'var(--copper-glow)',
          color: 'var(--copper)'
        }}
      >
        {icon}
      </div>
      <div>
        <h3
          className="text-lg font-semibold mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
        <p style={{ color: 'rgba(245, 240, 232, 0.6)' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

/**
 * Checkmark icon component.
 */
function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{ color: 'var(--copper)' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

/**
 * Comparison list item for before/after sections.
 * @param text - The comparison text
 * @param negative - Whether this is a negative (before) item
 */
function ComparisonItem({
  text,
  negative = false
}: {
  text: string;
  negative?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{
          background: negative ? 'rgba(239, 68, 68, 0.2)' : 'rgba(197, 147, 90, 0.2)',
          color: negative ? '#ef4444' : 'var(--copper)'
        }}
      >
        {negative ? (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span style={{ color: 'rgba(245, 240, 232, 0.8)' }}>{text}</span>
    </li>
  );
}

/**
 * Benefit item with SVG icon for customer experience section.
 * @param icon - SVG icon element (ReactNode)
 * @param title - Benefit title
 * @param description - Benefit description
 */
function BenefitItem({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'var(--copper-glow)', color: 'var(--copper)' }}
      >
        {icon}
      </span>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm" style={{ color: 'rgba(245, 240, 232, 0.6)' }}>
          {description}
        </p>
      </div>
    </li>
  );
}

/**
 * Alternative comparison card showing problems with other solutions.
 * @param icon - SVG icon element (ReactNode)
 * @param title - The alternative name (e.g., "Spreadsheets")
 * @param problems - Array of problems with this alternative
 */
function AlternativeCard({
  icon,
  title,
  problems
}: {
  icon: React.ReactNode;
  title: string;
  problems: string[];
}) {
  return (
    <div
      className="rounded-2xl p-6 h-full"
      style={{
        background: 'var(--charcoal)',
        border: '1px solid var(--slate)'
      }}
    >
      <div
        className="flex items-center gap-3 mb-4 pb-4 border-b"
        style={{ borderColor: 'var(--slate)' }}
      >
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444'
          }}
        >
          {icon}
        </span>
        <h3
          className="text-lg font-semibold"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {problems.map((problem, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg
              className="w-4 h-4 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ef4444"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span style={{ color: 'rgba(245, 240, 232, 0.6)' }}>{problem}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
