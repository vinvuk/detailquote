"use client";

import { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";

interface ImpersonationStatus {
  impersonating: boolean;
  user?: {
    id: string;
    email: string;
    name: string | null;
  };
}

/**
 * Banner shown when admin is impersonating a user.
 * Allows stopping impersonation.
 */
export function ImpersonationBanner() {
  const [status, setStatus] = useState<ImpersonationStatus | null>(null);
  const [isStopping, setIsStopping] = useState(false);

  useEffect(() => {
    checkImpersonation();
  }, []);

  /**
   * Checks if currently impersonating a user.
   */
  async function checkImpersonation() {
    try {
      const res = await fetch("/api/admin/impersonate");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
      // Not an admin or not impersonating
    }
  }

  /**
   * Stops impersonation and returns to admin.
   */
  async function handleStopImpersonation() {
    setIsStopping(true);
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.href = "/admin";
      }
    } catch {
      setIsStopping(false);
    }
  }

  if (!status?.impersonating) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2 text-center text-sm flex items-center justify-center gap-2"
      style={{
        background: "linear-gradient(90deg, #ef4444, #dc2626)",
        color: "white",
      }}
    >
      <UserCheck size={16} />
      <span className="font-medium">
        Viewing as: {status.user?.name || status.user?.email}
      </span>
      <button
        onClick={handleStopImpersonation}
        disabled={isStopping}
        className="ml-4 px-3 py-1 text-xs font-medium rounded transition-colors"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
        }}
      >
        {isStopping ? "..." : "Stop Impersonating"}
      </button>
    </div>
  );
}
