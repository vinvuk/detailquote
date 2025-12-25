"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { PricingConfig, VehicleSize, Condition, Service, Addon } from "@/lib/pricing-defaults";

interface QuoteBuilderProps {
  pricing: PricingConfig;
  businessName?: string | null;
  businessEmail?: string | null;
  businessPhone?: string | null;
}

/**
 * Quote builder component for creating new quotes.
 */
export function QuoteBuilder({
  pricing,
  businessName,
  businessEmail,
  businessPhone,
}: QuoteBuilderProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Customer info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Vehicle info
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleSize, setVehicleSize] = useState<string>(pricing.vehicleSizes[0]?.id || "sedan");
  const [condition, setCondition] = useState<string>(pricing.conditions[0]?.id || "light");

  // Selections
  const [selectedServices, setSelectedServices] = useState<string[]>([pricing.services[0]?.id].filter(Boolean));
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Notes
  const [notes, setNotes] = useState("");

  /**
   * Toggles a service selection.
   */
  function toggleService(serviceId: string) {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  }

  /**
   * Toggles an addon selection.
   */
  function toggleAddon(addonId: string) {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  }

  /**
   * Calculates the total quote amount.
   */
  const quote = useMemo(() => {
    const vehicleMultiplier = pricing.vehicleSizes.find((v) => v.id === vehicleSize)?.multiplier ?? 1;
    const conditionMultiplier = pricing.conditions.find((c) => c.id === condition)?.multiplier ?? 1;

    // Calculate services total
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const service = pricing.services.find((s) => s.id === serviceId);
      return total + (service?.basePrice ?? 0);
    }, 0);

    // Apply multipliers to services
    const adjustedServicesTotal = Math.round(servicesTotal * vehicleMultiplier * conditionMultiplier);

    // Calculate addons total (flat rates, only vehicle size affects them)
    const addonsTotal = selectedAddons.reduce((total, addonId) => {
      const addon = pricing.addons.find((a) => a.id === addonId);
      return total + Math.round((addon?.price ?? 0) * vehicleMultiplier);
    }, 0);

    return {
      servicesTotal: adjustedServicesTotal,
      addonsTotal,
      total: adjustedServicesTotal + addonsTotal,
    };
  }, [vehicleSize, condition, selectedServices, selectedAddons, pricing]);

  /**
   * Creates the quote and redirects to the quote detail page.
   */
  async function handleCreate() {
    if (selectedServices.length === 0) {
      setError("Please select at least one service");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim() || null,
          customerEmail: customerEmail.trim() || null,
          customerPhone: customerPhone.trim() || null,
          vehicleYear: vehicleYear.trim() || null,
          vehicleMake: vehicleMake.trim() || null,
          vehicleModel: vehicleModel.trim() || null,
          vehicleSize,
          condition,
          services: selectedServices,
          addons: selectedAddons,
          notes: notes.trim() || null,
          pricingSnapshot: pricing,
          total: quote.total,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create quote");
      }

      const data = await response.json();
      router.push(`/dashboard/quotes/${data.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left: Configuration */}
      <div className="lg:col-span-2 space-y-8">
        {/* Customer Info */}
        <div className="glass-card rounded-2xl p-6">
          <h2
            className="text-xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Customer Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--copper)" }}
              >
                Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
                style={{
                  background: "var(--charcoal)",
                  border: "1px solid var(--slate)",
                  color: "var(--cream)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--copper)" }}
              >
                Email
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
                style={{
                  background: "var(--charcoal)",
                  border: "1px solid var(--slate)",
                  color: "var(--cream)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--copper)" }}
              >
                Phone
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
                style={{
                  background: "var(--charcoal)",
                  border: "1px solid var(--slate)",
                  color: "var(--cream)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="glass-card rounded-2xl p-6">
          <h2
            className="text-xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vehicle Information
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--copper)" }}
              >
                Year
              </label>
              <input
                type="text"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                placeholder="2024"
                className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
                style={{
                  background: "var(--charcoal)",
                  border: "1px solid var(--slate)",
                  color: "var(--cream)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--copper)" }}
              >
                Make
              </label>
              <input
                type="text"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                placeholder="Toyota"
                className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
                style={{
                  background: "var(--charcoal)",
                  border: "1px solid var(--slate)",
                  color: "var(--cream)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--copper)" }}
              >
                Model
              </label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="Camry"
                className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2"
                style={{
                  background: "var(--charcoal)",
                  border: "1px solid var(--slate)",
                  color: "var(--cream)",
                }}
              />
            </div>
          </div>

          {/* Vehicle Size */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-3"
              style={{ color: "var(--copper)" }}
            >
              Vehicle Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {pricing.vehicleSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setVehicleSize(size.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    vehicleSize === size.id ? "ring-2" : "hover:bg-[var(--graphite)]"
                  }`}
                  style={{
                    background: vehicleSize === size.id ? "var(--copper-glow)" : "var(--charcoal)",
                    color: vehicleSize === size.id ? "var(--copper)" : "var(--cream)",
                  }}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <label
              className="block text-sm font-medium mb-3"
              style={{ color: "var(--copper)" }}
            >
              Vehicle Condition
            </label>
            <div className="grid grid-cols-3 gap-2">
              {pricing.conditions.map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => setCondition(cond.id)}
                  className={`px-4 py-3 rounded-xl text-center transition-all ${
                    condition === cond.id ? "ring-2" : "hover:bg-[var(--graphite)]"
                  }`}
                  style={{
                    background: condition === cond.id ? "var(--copper-glow)" : "var(--charcoal)",
                    color: condition === cond.id ? "var(--copper)" : "var(--cream)",
                  }}
                >
                  <span className="block text-sm font-medium">{cond.label}</span>
                  <span
                    className="block text-xs mt-0.5"
                    style={{ color: "rgba(245, 240, 232, 0.5)" }}
                  >
                    {cond.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="glass-card rounded-2xl p-6">
          <h2
            className="text-xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Services
          </h2>
          <div className="space-y-2">
            {pricing.services.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  selectedServices.includes(service.id) ? "ring-2" : "hover:bg-[var(--graphite)]"
                }`}
                style={{
                  background: selectedServices.includes(service.id) ? "var(--copper-glow)" : "var(--charcoal)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center transition-all"
                    style={{
                      background: selectedServices.includes(service.id) ? "var(--copper)" : "var(--slate)",
                      color: selectedServices.includes(service.id) ? "var(--obsidian)" : "transparent",
                    }}
                  >
                    {selectedServices.includes(service.id) && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      color: selectedServices.includes(service.id) ? "var(--copper)" : "var(--cream)",
                    }}
                  >
                    {service.label}
                  </span>
                </div>
                <span style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                  from ${service.basePrice}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="glass-card rounded-2xl p-6">
          <h2
            className="text-xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Add-ons
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {pricing.addons.map((addon) => (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                  selectedAddons.includes(addon.id) ? "ring-2" : "hover:bg-[var(--graphite)]"
                }`}
                style={{
                  background: selectedAddons.includes(addon.id) ? "var(--copper-glow)" : "var(--charcoal)",
                }}
              >
                <span
                  style={{
                    color: selectedAddons.includes(addon.id) ? "var(--copper)" : "var(--cream)",
                  }}
                >
                  {addon.label}
                </span>
                <span style={{ color: "rgba(245, 240, 232, 0.4)" }}>
                  +${addon.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="glass-card rounded-2xl p-6">
          <h2
            className="text-xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Notes
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special instructions or notes for this quote..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2 resize-none"
            style={{
              background: "var(--charcoal)",
              border: "1px solid var(--slate)",
              color: "var(--cream)",
            }}
          />
        </div>
      </div>

      {/* Right: Quote Summary */}
      <div className="lg:col-span-1">
        <div
          className="sticky top-6 rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, var(--charcoal) 0%, var(--obsidian) 100%)",
            border: "1px solid var(--slate)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium" style={{ color: "var(--copper)" }}>
              Quote Summary
            </span>
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: "rgba(197, 147, 90, 0.2)",
                color: "var(--copper)",
              }}
            >
              {pricing.vehicleSizes.find((v) => v.id === vehicleSize)?.label}
            </span>
          </div>

          {/* Customer */}
          {customerName && (
            <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--slate)" }}>
              <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                Customer
              </p>
              <p className="font-medium">{customerName}</p>
            </div>
          )}

          {/* Vehicle */}
          {(vehicleMake || vehicleModel) && (
            <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--slate)" }}>
              <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.5)" }}>
                Vehicle
              </p>
              <p className="font-medium">
                {[vehicleYear, vehicleMake, vehicleModel].filter(Boolean).join(" ")}
              </p>
            </div>
          )}

          {/* Selected Services */}
          <div className="space-y-3 mb-6">
            {selectedServices.length === 0 ? (
              <p
                className="text-sm py-4 text-center"
                style={{ color: "rgba(245, 240, 232, 0.4)" }}
              >
                Select at least one service
              </p>
            ) : (
              selectedServices.map((serviceId) => {
                const service = pricing.services.find((s) => s.id === serviceId);
                const vehicleMultiplier = pricing.vehicleSizes.find((v) => v.id === vehicleSize)?.multiplier ?? 1;
                const conditionMultiplier = pricing.conditions.find((c) => c.id === condition)?.multiplier ?? 1;
                const price = Math.round((service?.basePrice ?? 0) * vehicleMultiplier * conditionMultiplier);
                return (
                  <div
                    key={serviceId}
                    className="flex justify-between items-center py-2 border-b"
                    style={{ borderColor: "var(--slate)" }}
                  >
                    <span style={{ color: "rgba(245, 240, 232, 0.8)" }}>{service?.label}</span>
                    <span className="font-medium">${price}</span>
                  </div>
                );
              })
            )}

            {/* Condition indicator */}
            {condition !== pricing.conditions[0]?.id && selectedServices.length > 0 && (
              <div
                className="flex justify-between items-center py-2 border-b"
                style={{ borderColor: "var(--slate)" }}
              >
                <span style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                  Condition:{" "}
                  <span
                    className="text-xs px-2 py-0.5 rounded ml-1"
                    style={{
                      background: "rgba(197, 147, 90, 0.2)",
                      color: "var(--copper)",
                    }}
                  >
                    {pricing.conditions.find((c) => c.id === condition)?.label}
                  </span>
                </span>
                <span className="text-sm" style={{ color: "var(--copper)" }}>
                  Included
                </span>
              </div>
            )}

            {/* Selected Add-ons */}
            {selectedAddons.map((addonId) => {
              const addon = pricing.addons.find((a) => a.id === addonId);
              const vehicleMultiplier = pricing.vehicleSizes.find((v) => v.id === vehicleSize)?.multiplier ?? 1;
              const price = Math.round((addon?.price ?? 0) * vehicleMultiplier);
              return (
                <div
                  key={addonId}
                  className="flex justify-between items-center py-2 border-b"
                  style={{ borderColor: "var(--slate)" }}
                >
                  <span style={{ color: "rgba(245, 240, 232, 0.6)" }}>{addon?.label}</span>
                  <span className="font-medium">+${price}</span>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="pt-4 border-t mb-6" style={{ borderColor: "var(--copper)" }}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span
                className="text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--copper)",
                }}
              >
                ${quote.total}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="px-4 py-3 rounded-xl text-sm mb-4"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
              }}
            >
              {error}
            </div>
          )}

          {/* Create Button */}
          <button
            onClick={handleCreate}
            disabled={isLoading || selectedServices.length === 0}
            className="btn-copper w-full py-4 rounded-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Quote"}
          </button>
        </div>
      </div>
    </div>
  );
}
