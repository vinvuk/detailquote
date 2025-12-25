"use client";

import { useState } from "react";
import type { Business } from "@prisma/client";

interface BusinessFormProps {
  business: Business | null;
}

/**
 * Form for editing business profile.
 */
export function BusinessForm({ business }: BusinessFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: business?.name || "",
    email: business?.email || "",
    phone: business?.phone || "",
    website: business?.website || "",
    address: business?.address || "",
  });

  /**
   * Handles form input changes.
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Handles form submission.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/business", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update business profile");
      }

      setMessage({ type: "success", text: "Business profile updated successfully!" });
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--copper)" }}
        >
          Business Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Detailing Business"
          className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
          style={{
            background: "var(--charcoal)",
            border: "1px solid var(--slate)",
            color: "var(--cream)",
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--copper)" }}
        >
          Business Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="contact@yourbusiness.com"
          className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
          style={{
            background: "var(--charcoal)",
            border: "1px solid var(--slate)",
            color: "var(--cream)",
          }}
        />
        <p className="text-xs mt-1.5" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
          This will appear on your quotes
        </p>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--copper)" }}
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
          style={{
            background: "var(--charcoal)",
            border: "1px solid var(--slate)",
            color: "var(--cream)",
          }}
        />
      </div>

      {/* Website */}
      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--copper)" }}
        >
          Website
        </label>
        <input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourbusiness.com"
          className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
          style={{
            background: "var(--charcoal)",
            border: "1px solid var(--slate)",
            color: "var(--cream)",
          }}
        />
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--copper)" }}
        >
          Address
        </label>
        <textarea
          id="address"
          name="address"
          rows={2}
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main St, City, State 12345"
          className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2 resize-none"
          style={{
            background: "var(--charcoal)",
            border: "1px solid var(--slate)",
            color: "var(--cream)",
          }}
        />
      </div>

      {/* Message */}
      {message && (
        <div
          className="px-4 py-3 rounded-xl text-sm"
          style={{
            background: message.type === "success" ? "rgba(74, 222, 128, 0.1)" : "rgba(239, 68, 68, 0.1)",
            border: `1px solid ${message.type === "success" ? "rgba(74, 222, 128, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
            color: message.type === "success" ? "#4ade80" : "#ef4444",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-copper px-6 py-3 rounded-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
