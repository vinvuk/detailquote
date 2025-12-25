"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuoteActionsProps {
  quoteId: string;
  status: string;
}

/**
 * Action buttons for a quote (mark as sent, delete, etc).
 */
export function QuoteActions({ quoteId, status }: QuoteActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  /**
   * Updates the quote status.
   */
  async function updateStatus(newStatus: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
      setShowMenu(false);
    }
  }

  /**
   * Deletes the quote.
   */
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this quote?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/dashboard/quotes");
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-[var(--graphite)]"
        style={{ color: "rgba(245, 240, 232, 0.7)" }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />

          {/* Menu */}
          <div
            className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg z-20 py-1"
            style={{ background: "var(--charcoal)", border: "1px solid var(--slate)" }}
          >
            {status === "DRAFT" && (
              <button
                onClick={() => updateStatus("SENT")}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--graphite)] transition-colors"
              >
                Mark as Sent
              </button>
            )}
            {status === "SENT" && (
              <button
                onClick={() => updateStatus("VIEWED")}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--graphite)] transition-colors"
              >
                Mark as Viewed
              </button>
            )}
            {(status === "SENT" || status === "VIEWED") && (
              <>
                <button
                  onClick={() => updateStatus("ACCEPTED")}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--graphite)] transition-colors"
                  style={{ color: "#4ade80" }}
                >
                  Mark as Accepted
                </button>
                <button
                  onClick={() => updateStatus("DECLINED")}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--graphite)] transition-colors"
                  style={{ color: "#ef4444" }}
                >
                  Mark as Declined
                </button>
              </>
            )}
            <div className="border-t my-1" style={{ borderColor: "var(--slate)" }} />
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--graphite)] transition-colors"
              style={{ color: "#ef4444" }}
            >
              Delete Quote
            </button>
          </div>
        </>
      )}
    </div>
  );
}
