"use client";

import { useState } from "react";
import type { PricingConfig, Service, Addon, VehicleSize, Condition } from "@/lib/pricing-defaults";

interface PricingEditorProps {
  initialPricing: PricingConfig;
  hasSavedPricing: boolean;
}

/**
 * Component for editing pricing configuration.
 */
export function PricingEditor({ initialPricing, hasSavedPricing }: PricingEditorProps) {
  const [pricing, setPricing] = useState<PricingConfig>(initialPricing);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  /**
   * Updates a service's base price.
   */
  function updateServicePrice(id: string, basePrice: number) {
    setPricing((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, basePrice } : s)),
    }));
  }

  /**
   * Updates an addon's price.
   */
  function updateAddonPrice(id: string, price: number) {
    setPricing((prev) => ({
      ...prev,
      addons: prev.addons.map((a) => (a.id === id ? { ...a, price } : a)),
    }));
  }

  /**
   * Updates a vehicle size multiplier.
   */
  function updateVehicleMultiplier(id: string, multiplier: number) {
    setPricing((prev) => ({
      ...prev,
      vehicleSizes: prev.vehicleSizes.map((v) => (v.id === id ? { ...v, multiplier } : v)),
    }));
  }

  /**
   * Updates a condition multiplier.
   */
  function updateConditionMultiplier(id: string, multiplier: number) {
    setPricing((prev) => ({
      ...prev,
      conditions: prev.conditions.map((c) => (c.id === id ? { ...c, multiplier } : c)),
    }));
  }

  /**
   * Adds a new service.
   */
  function addService() {
    const newId = `service-${Date.now()}`;
    setPricing((prev) => ({
      ...prev,
      services: [...prev.services, { id: newId, label: "New Service", basePrice: 0 }],
    }));
  }

  /**
   * Removes a service.
   */
  function removeService(id: string) {
    setPricing((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  }

  /**
   * Updates a service label.
   */
  function updateServiceLabel(id: string, label: string) {
    setPricing((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, label } : s)),
    }));
  }

  /**
   * Adds a new addon.
   */
  function addAddon() {
    const newId = `addon-${Date.now()}`;
    setPricing((prev) => ({
      ...prev,
      addons: [...prev.addons, { id: newId, label: "New Add-on", price: 0 }],
    }));
  }

  /**
   * Removes an addon.
   */
  function removeAddon(id: string) {
    setPricing((prev) => ({
      ...prev,
      addons: prev.addons.filter((a) => a.id !== id),
    }));
  }

  /**
   * Updates an addon label.
   */
  function updateAddonLabel(id: string, label: string) {
    setPricing((prev) => ({
      ...prev,
      addons: prev.addons.map((a) => (a.id === id ? { ...a, label } : a)),
    }));
  }

  /**
   * Saves the pricing configuration.
   */
  async function handleSave() {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricing),
      });

      if (!response.ok) {
        throw new Error("Failed to save pricing");
      }

      setMessage({ type: "success", text: "Pricing saved successfully!" });
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Services */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-xl mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Services
            </h2>
            <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
              Your core detailing services
            </p>
          </div>
          <button
            onClick={addService}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--graphite)]"
            style={{ color: "var(--copper)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Service
          </button>
        </div>
        <div className="space-y-3">
          {pricing.services.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              onLabelChange={(label) => updateServiceLabel(service.id, label)}
              onPriceChange={(price) => updateServicePrice(service.id, price)}
              onRemove={() => removeService(service.id)}
            />
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-xl mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Add-ons
            </h2>
            <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
              Optional services you can add to any quote
            </p>
          </div>
          <button
            onClick={addAddon}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--graphite)]"
            style={{ color: "var(--copper)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Add-on
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {pricing.addons.map((addon) => (
            <AddonRow
              key={addon.id}
              addon={addon}
              onLabelChange={(label) => updateAddonLabel(addon.id, label)}
              onPriceChange={(price) => updateAddonPrice(addon.id, price)}
              onRemove={() => removeAddon(addon.id)}
            />
          ))}
        </div>
      </div>

      {/* Multipliers */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Vehicle Sizes */}
        <div className="glass-card rounded-2xl p-6">
          <h2
            className="text-xl mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vehicle Size Multipliers
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
            Adjust pricing based on vehicle size
          </p>
          <div className="space-y-4">
            {pricing.vehicleSizes.map((size) => (
              <MultiplierRow
                key={size.id}
                label={size.label}
                multiplier={size.multiplier}
                onChange={(multiplier) => updateVehicleMultiplier(size.id, multiplier)}
              />
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="glass-card rounded-2xl p-6">
          <h2
            className="text-xl mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Condition Multipliers
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
            Adjust pricing based on vehicle condition
          </p>
          <div className="space-y-4">
            {pricing.conditions.map((condition) => (
              <MultiplierRow
                key={condition.id}
                label={condition.label}
                description={condition.description}
                multiplier={condition.multiplier}
                onChange={(multiplier) => updateConditionMultiplier(condition.id, multiplier)}
              />
            ))}
          </div>
        </div>
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

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
          {hasSavedPricing ? "Your pricing is saved" : "Using default pricing - save to customize"}
        </p>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="btn-copper px-6 py-3 rounded-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Pricing"}
        </button>
      </div>
    </div>
  );
}

/**
 * Row component for editing a service.
 */
function ServiceRow({
  service,
  onLabelChange,
  onPriceChange,
  onRemove,
}: {
  service: Service;
  onLabelChange: (label: string) => void;
  onPriceChange: (price: number) => void;
  onRemove: () => void;
}) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{ background: "var(--charcoal)" }}
    >
      <input
        type="text"
        value={service.label}
        onChange={(e) => onLabelChange(e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
        style={{ background: "var(--graphite)", color: "var(--cream)" }}
      />
      <div className="flex items-center gap-1">
        <span className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
          $
        </span>
        <input
          type="number"
          value={service.basePrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-20 px-3 py-2 rounded-lg text-sm text-right outline-none"
          style={{ background: "var(--graphite)", color: "var(--cream)" }}
          min={0}
        />
      </div>
      <button
        onClick={onRemove}
        className="p-2 rounded-lg transition-colors hover:bg-[var(--graphite)]"
        style={{ color: "rgba(245, 240, 232, 0.5)" }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Row component for editing an addon.
 */
function AddonRow({
  addon,
  onLabelChange,
  onPriceChange,
  onRemove,
}: {
  addon: Addon;
  onLabelChange: (label: string) => void;
  onPriceChange: (price: number) => void;
  onRemove: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 p-3 rounded-xl"
      style={{ background: "var(--charcoal)" }}
    >
      <input
        type="text"
        value={addon.label}
        onChange={(e) => onLabelChange(e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
        style={{ background: "var(--graphite)", color: "var(--cream)" }}
      />
      <div className="flex items-center gap-1">
        <span className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
          $
        </span>
        <input
          type="number"
          value={addon.price}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-16 px-2 py-2 rounded-lg text-sm text-right outline-none"
          style={{ background: "var(--graphite)", color: "var(--cream)" }}
          min={0}
        />
      </div>
      <button
        onClick={onRemove}
        className="p-2 rounded-lg transition-colors hover:bg-[var(--graphite)]"
        style={{ color: "rgba(245, 240, 232, 0.5)" }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Row component for editing a multiplier.
 */
function MultiplierRow({
  label,
  description,
  multiplier,
  onChange,
}: {
  label: string;
  description?: string;
  multiplier: number;
  onChange: (multiplier: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium" style={{ color: "var(--cream)" }}>
          {label}
        </p>
        {description && (
          <p className="text-xs" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={multiplier}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20 px-3 py-2 rounded-lg text-sm text-right outline-none"
          style={{ background: "var(--charcoal)", color: "var(--cream)" }}
          min={0}
          step={0.05}
        />
        <span className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
          x
        </span>
      </div>
    </div>
  );
}
