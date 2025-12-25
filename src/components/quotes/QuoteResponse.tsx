"use client";

import { useState } from "react";

interface QuoteResponseProps {
  shareId: string;
  status: string;
  businessEmail?: string | null;
  businessPhone?: string | null;
}

/**
 * Accept/Decline buttons for public quote view.
 */
export function QuoteResponse({ shareId, status, businessEmail, businessPhone }: QuoteResponseProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isLoading, setIsLoading] = useState<"accept" | "decline" | null>(null);
  const [error, setError] = useState("");

  /**
   * Handles quote response (accept or decline).
   */
  async function handleResponse(action: "accept" | "decline") {
    setIsLoading(action);
    setError("");

    try {
      const response = await fetch(`/api/quotes/public/${shareId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit response");
      }

      setCurrentStatus(data.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(null);
    }
  }

  // Show confirmation message if already responded
  if (currentStatus === "ACCEPTED") {
    return (
      <div className="space-y-4">
        <div
          className="w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
          style={{ background: "rgba(74, 222, 128, 0.15)", color: "#4ade80" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Quote Accepted
        </div>
        {(businessEmail || businessPhone) && (
          <p className="text-sm text-center" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
            The business will contact you to schedule your appointment.
          </p>
        )}
      </div>
    );
  }

  if (currentStatus === "DECLINED") {
    return (
      <div
        className="w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
        style={{ background: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Quote Declined
      </div>
    );
  }

  if (currentStatus === "EXPIRED") {
    return (
      <div
        className="w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
        style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Quote Expired
      </div>
    );
  }

  // Show Accept/Decline buttons
  return (
    <div className="space-y-3">
      {error && (
        <p className="text-sm text-center text-red-400 mb-2">{error}</p>
      )}

      <button
        onClick={() => handleResponse("accept")}
        disabled={isLoading !== null}
        className="w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
          color: "#0a0a0a",
        }}
      >
        {isLoading === "accept" ? (
          <>
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Accepting...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Accept Quote
          </>
        )}
      </button>

      <button
        onClick={() => handleResponse("decline")}
        disabled={isLoading !== null}
        className="w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[rgba(239,68,68,0.15)]"
        style={{
          background: "transparent",
          border: "1px solid var(--slate)",
          color: "rgba(245, 240, 232, 0.7)",
        }}
      >
        {isLoading === "decline" ? (
          <>
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Declining...
          </>
        ) : (
          "Decline Quote"
        )}
      </button>
    </div>
  );
}
