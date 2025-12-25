"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Trash2 } from "lucide-react";

interface AdminQuoteActionsProps {
  quoteId: string;
  shareId: string;
}

/**
 * Admin action buttons for quote management.
 * Includes view and delete functionality.
 */
export function AdminQuoteActions({ quoteId, shareId }: AdminQuoteActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /**
   * Handles quote deletion with confirmation.
   */
  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete quote");
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete quote");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  /**
   * Opens public quote view in new tab.
   */
  function handleView() {
    window.open(`/q/${shareId}`, "_blank");
  }

  return (
    <div className="flex items-center gap-2">
      {/* View Button */}
      <button
        onClick={handleView}
        className="p-2 rounded-lg transition-colors hover:opacity-80"
        style={{
          background: "var(--copper-glow)",
          color: "var(--copper)",
        }}
        title="View public quote"
      >
        <ExternalLink size={16} />
      </button>

      {/* Delete Button */}
      {!showDeleteConfirm && (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{
            background: "rgba(239, 68, 68, 0.2)",
            color: "#ef4444",
          }}
          title="Delete quote"
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
            style={{
              background: "#ef4444",
              color: "white",
            }}
          >
            {isDeleting ? "..." : "Confirm"}
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
            style={{
              background: "var(--charcoal)",
              color: "var(--cream)",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
