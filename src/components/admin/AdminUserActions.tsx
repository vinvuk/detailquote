"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCheck, Trash2, X } from "lucide-react";

interface AdminUserActionsProps {
  userId: string;
  userEmail: string;
  userName: string | null;
  isCurrentUser: boolean;
}

/**
 * Admin action buttons for user management.
 * Includes impersonate and delete functionality.
 */
export function AdminUserActions({
  userId,
  userEmail,
  userName,
  isCurrentUser,
}: AdminUserActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /**
   * Handles user deletion with confirmation.
   */
  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete user");
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  /**
   * Handles user impersonation.
   */
  async function handleImpersonate() {
    setIsImpersonating(true);
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to impersonate user");
      }

      // Redirect to dashboard as impersonated user
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to impersonate user");
      setIsImpersonating(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Impersonate Button */}
      {!isCurrentUser && (
        <button
          onClick={handleImpersonate}
          disabled={isImpersonating}
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{
            background: "var(--copper-glow)",
            color: "var(--copper)",
          }}
          title={`Impersonate ${userName || userEmail}`}
        >
          <UserCheck size={16} />
        </button>
      )}

      {/* Delete Button */}
      {!isCurrentUser && !showDeleteConfirm && (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{
            background: "rgba(239, 68, 68, 0.2)",
            color: "#ef4444",
          }}
          title="Delete user"
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
