"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface AdminExportButtonProps {
  type: "users" | "quotes";
}

/**
 * Export button for downloading CSV data.
 */
export function AdminExportButton({ type }: AdminExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  /**
   * Handles CSV export download.
   */
  async function handleExport() {
    setIsExporting(true);
    try {
      const res = await fetch(`/api/admin/export?type=${type}`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to export data");
      }

      // Get filename from Content-Disposition header
      const contentDisposition = res.headers.get("Content-Disposition");
      const filename =
        contentDisposition?.match(/filename="(.+)"/)?.[1] ||
        `detailquote-${type}-export.csv`;

      // Download the file
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to export data");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 hover:opacity-80"
      style={{
        background: "var(--graphite)",
        color: "var(--cream)",
        border: "1px solid var(--slate)",
      }}
    >
      <Download size={16} />
      {isExporting ? "Exporting..." : `Export ${type === "users" ? "Users" : "Quotes"}`}
    </button>
  );
}
