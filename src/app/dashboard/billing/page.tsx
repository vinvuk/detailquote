import Link from "next/link";

/**
 * Billing page.
 * Shows subscription status and upgrade options.
 */
export default function BillingPage() {
  return (
    <div className="p-6 lg:p-12">
      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Billing
          </h1>
          <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
            Manage your subscription
          </p>
        </div>

        {/* Current Plan */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-xl mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Current Plan
              </h2>
              <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                You're on the early access plan
              </p>
            </div>
            <span
              className="px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: "rgba(74, 222, 128, 0.2)",
                color: "#4ade80",
              }}
            >
              Early Access
            </span>
          </div>

          <div
            className="p-6 rounded-xl mb-6"
            style={{ background: "var(--charcoal)" }}
          >
            <div className="flex items-baseline gap-1 mb-4">
              <span
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--copper)" }}
              >
                Free
              </span>
              <span style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                during early access
              </span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#4ade80" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited quotes
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#4ade80" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Custom pricing configuration
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#4ade80" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Shareable quote links
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#4ade80" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Quote tracking & analytics
              </li>
            </ul>
          </div>

          <p
            className="text-sm text-center"
            style={{ color: "rgba(245, 240, 232, 0.5)" }}
          >
            As an early access user, you'll get all features free while we build.
            <br />
            When we launch paid plans, you'll get a special early bird discount.
          </p>
        </div>

        {/* Future Plans Preview */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h2
            className="text-xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Coming Soon
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="p-4 rounded-xl"
              style={{ background: "var(--charcoal)" }}
            >
              <p className="font-medium mb-2">Pro Plan</p>
              <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                For growing detailing businesses with team features and advanced analytics.
              </p>
            </div>
            <div
              className="p-4 rounded-xl"
              style={{ background: "var(--charcoal)" }}
            >
              <p className="font-medium mb-2">Enterprise</p>
              <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                For shops with multiple locations and custom integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
