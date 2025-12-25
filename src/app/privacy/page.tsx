import Link from "next/link";

/**
 * Privacy Policy page for DetailQuote.
 * Simple, straightforward policy for a waitlist-only product.
 */
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="relative z-10 px-6 py-8 lg:px-12">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href="/"
            className="animate-fade-in opacity-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span
              className="text-2xl tracking-tight"
              style={{ color: "var(--cream)" }}
            >
              Detail<span style={{ color: "var(--copper)" }}>Quote</span>
            </span>
          </Link>
        </nav>
      </header>

      <main className="relative z-10 px-6 lg:px-12 pb-24">
        <article className="max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Privacy Policy
          </h1>

          <p
            className="text-sm mb-12"
            style={{ color: "rgba(245, 240, 232, 0.5)" }}
          >
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div
            className="space-y-8 text-lg leading-relaxed"
            style={{ color: "rgba(245, 240, 232, 0.8)" }}
          >
            <section>
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
              >
                What we collect
              </h2>
              <p>
                When you join our waitlist, we collect only your{" "}
                <strong style={{ color: "var(--cream)" }}>email address</strong>.
                That's it. No tracking cookies, no analytics profiles, no personal data mining.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
              >
                How we use it
              </h2>
              <p>Your email is used to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                <li>Notify you when DetailQuote launches</li>
                <li>Send occasional product updates (no spam, we promise)</li>
                <li>Communicate important information about your account</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
              >
                We don't sell your data
              </h2>
              <p>
                Your email address will never be sold, rented, or shared with third parties
                for marketing purposes. Period. We're building a tool for detailers, not
                a data brokerage.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
              >
                How to unsubscribe
              </h2>
              <p>
                Every email we send includes an unsubscribe link. Click it, and you're off
                the list immediately. You can also email us directly at{" "}
                <a
                  href="mailto:hello@detailquote.com"
                  style={{ color: "var(--copper)" }}
                  className="hover:underline"
                >
                  hello@detailquote.com
                </a>{" "}
                to request removal.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
              >
                Data storage
              </h2>
              <p>
                Your email is stored securely on servers in the EU/US with industry-standard
                encryption. We use trusted infrastructure providers (Vercel, Neon) that
                comply with GDPR and other privacy regulations.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
              >
                Questions?
              </h2>
              <p>
                If you have any questions about this policy or your data, reach out to{" "}
                <a
                  href="mailto:hello@detailquote.com"
                  style={{ color: "var(--copper)" }}
                  className="hover:underline"
                >
                  hello@detailquote.com
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm hover:underline"
              style={{ color: "var(--copper)" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to home
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="divider-copper mb-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div style={{ fontFamily: "var(--font-display)" }}>
              <span
                className="text-lg tracking-tight"
                style={{ color: "var(--cream)" }}
              >
                Detail<span style={{ color: "var(--copper)" }}>Quote</span>
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--slate)" }}>
              Built for detailers, by people who get it.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
