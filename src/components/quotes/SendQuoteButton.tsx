"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SendQuoteButtonProps {
  quoteId: string;
  customerEmail?: string | null;
  status: string;
}

/**
 * Button to send quote email to customer.
 * Opens a modal to confirm/enter email address.
 */
export function SendQuoteButton({ quoteId, customerEmail, status }: SendQuoteButtonProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(customerEmail || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Don't show send button if already sent
  const alreadySent = ["SENT", "VIEWED", "ACCEPTED", "DECLINED", "EXPIRED"].includes(status);

  /**
   * Sends the quote email.
   */
  async function handleSend() {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/quotes/${quoteId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send quote");
      }

      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send quote");
    } finally {
      setIsLoading(false);
    }
  }

  if (alreadySent) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-copper px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Send Quote
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !isLoading && setShowModal(false)}
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-md rounded-2xl p-6 sm:p-8"
            style={{
              background: "linear-gradient(145deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%)",
              border: "1px solid rgba(201, 166, 107, 0.2)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {success ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(74, 222, 128, 0.2)" }}
                >
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "#4ade80" }}
                >
                  Quote Sent!
                </h3>
                <p style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                  Your customer will receive the email shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Send Quote
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={isLoading}
                    className="p-2 rounded-lg hover:bg-[var(--graphite)] transition-colors"
                    style={{ color: "rgba(245, 240, 232, 0.5)" }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm mb-6" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                  We'll send a branded email with a link to view the full quote.
                </p>

                {/* Email Input */}
                <div className="mb-6">
                  <label
                    htmlFor="customer-email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--copper)" }}
                  >
                    Customer Email
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="customer@example.com"
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl text-[var(--cream)] placeholder-[rgba(245,240,232,0.3)] outline-none transition-all focus:ring-2 focus:ring-[var(--copper)]"
                    style={{
                      background: "var(--charcoal)",
                      border: "1px solid var(--slate)",
                    }}
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-[var(--graphite)]"
                    style={{
                      background: "var(--charcoal)",
                      border: "1px solid var(--slate)",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="flex-1 btn-copper px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Email
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
