"use client";

import { useState, useMemo } from "react";

/**
 * Vehicle size options with base price multipliers.
 */
const VEHICLE_SIZES = [
  { id: "sedan", label: "Sedan / Coupe", multiplier: 1.0 },
  { id: "suv", label: "SUV / Crossover", multiplier: 1.25 },
  { id: "truck", label: "Truck / Van", multiplier: 1.4 },
] as const;

/**
 * Condition levels with price adjustments.
 */
const CONDITIONS = [
  { id: "light", label: "Light", description: "Regular maintenance", multiplier: 1.0 },
  { id: "moderate", label: "Moderate", description: "Some buildup", multiplier: 1.25 },
  { id: "heavy", label: "Heavy", description: "Deep cleaning needed", multiplier: 1.5 },
] as const;

/**
 * Available detailing services.
 */
const SERVICES = [
  { id: "exterior", label: "Exterior Wash & Wax", basePrice: 80 },
  { id: "interior", label: "Interior Deep Clean", basePrice: 100 },
  { id: "polish", label: "Paint Correction / Polish", basePrice: 150 },
] as const;

/**
 * Optional add-on services.
 */
const ADDONS = [
  { id: "engine", label: "Engine Bay", price: 45 },
  { id: "wheels", label: "Wheel Detail", price: 35 },
  { id: "headlights", label: "Headlight Restoration", price: 60 },
  { id: "odor", label: "Odor Removal", price: 50 },
  { id: "pet", label: "Pet Hair Removal", price: 40 },
  { id: "ceramic", label: "Ceramic Spray Coating", price: 75 },
] as const;

type VehicleSize = typeof VEHICLE_SIZES[number]["id"];
type Condition = typeof CONDITIONS[number]["id"];
type ServiceId = typeof SERVICES[number]["id"];
type AddonId = typeof ADDONS[number]["id"];

interface QuoteCalculatorProps {
  onSignupClick: () => void;
}

/**
 * Interactive quote calculator demo component.
 * Allows users to build a sample quote to experience the product.
 */
export function QuoteCalculator({ onSignupClick }: QuoteCalculatorProps) {
  const [vehicleSize, setVehicleSize] = useState<VehicleSize>("sedan");
  const [condition, setCondition] = useState<Condition>("light");
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>(["exterior"]);
  const [selectedAddons, setSelectedAddons] = useState<AddonId[]>([]);

  /**
   * Toggles a service selection.
   */
  function toggleService(serviceId: ServiceId) {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  }

  /**
   * Toggles an addon selection.
   */
  function toggleAddon(addonId: AddonId) {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  }

  /**
   * Calculates the total quote based on selections.
   */
  const quote = useMemo(() => {
    const vehicleMultiplier = VEHICLE_SIZES.find((v) => v.id === vehicleSize)?.multiplier ?? 1;
    const conditionMultiplier = CONDITIONS.find((c) => c.id === condition)?.multiplier ?? 1;

    // Calculate services total
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const service = SERVICES.find((s) => s.id === serviceId);
      return total + (service?.basePrice ?? 0);
    }, 0);

    // Apply multipliers to services
    const adjustedServicesTotal = Math.round(servicesTotal * vehicleMultiplier * conditionMultiplier);

    // Calculate addons total (flat rates, only vehicle size affects them)
    const addonsTotal = selectedAddons.reduce((total, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      return total + Math.round((addon?.price ?? 0) * vehicleMultiplier);
    }, 0);

    return {
      servicesTotal: adjustedServicesTotal,
      addonsTotal,
      total: adjustedServicesTotal + addonsTotal,
    };
  }, [vehicleSize, condition, selectedServices, selectedAddons]);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3
            className="text-2xl sm:text-3xl mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Try it yourself
          </h3>
          <p className="text-sm" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
            Build a sample quote in seconds
          </p>
        </div>
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: "rgba(74, 222, 128, 0.1)",
            color: "#4ade80",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Live Demo
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Configuration */}
        <div className="space-y-8">
          {/* Vehicle Size */}
          <div>
            <label
              className="block text-sm font-medium mb-3"
              style={{ color: "var(--copper)" }}
            >
              Vehicle Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {VEHICLE_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setVehicleSize(size.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    vehicleSize === size.id
                      ? "ring-2"
                      : "hover:bg-[var(--graphite)]"
                  }`}
                  style={{
                    background:
                      vehicleSize === size.id
                        ? "var(--copper-glow)"
                        : "var(--charcoal)",
                    borderColor: "var(--copper)",
                    color:
                      vehicleSize === size.id
                        ? "var(--copper)"
                        : "var(--cream)",
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
              {CONDITIONS.map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => setCondition(cond.id)}
                  className={`px-4 py-3 rounded-xl text-center transition-all ${
                    condition === cond.id
                      ? "ring-2"
                      : "hover:bg-[var(--graphite)]"
                  }`}
                  style={{
                    background:
                      condition === cond.id
                        ? "var(--copper-glow)"
                        : "var(--charcoal)",
                    ringColor: "var(--copper)",
                    color:
                      condition === cond.id ? "var(--copper)" : "var(--cream)",
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

          {/* Services */}
          <div>
            <label
              className="block text-sm font-medium mb-3"
              style={{ color: "var(--copper)" }}
            >
              Services
            </label>
            <div className="space-y-2">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    selectedServices.includes(service.id)
                      ? "ring-2"
                      : "hover:bg-[var(--graphite)]"
                  }`}
                  style={{
                    background: selectedServices.includes(service.id)
                      ? "var(--copper-glow)"
                      : "var(--charcoal)",
                    ringColor: "var(--copper)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center transition-all`}
                      style={{
                        background: selectedServices.includes(service.id)
                          ? "var(--copper)"
                          : "var(--slate)",
                        color: selectedServices.includes(service.id)
                          ? "var(--obsidian)"
                          : "transparent",
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
                        color: selectedServices.includes(service.id)
                          ? "var(--copper)"
                          : "var(--cream)",
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
          <div>
            <label
              className="block text-sm font-medium mb-3"
              style={{ color: "var(--copper)" }}
            >
              Add-ons
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ADDONS.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                    selectedAddons.includes(addon.id)
                      ? "ring-2"
                      : "hover:bg-[var(--graphite)]"
                  }`}
                  style={{
                    background: selectedAddons.includes(addon.id)
                      ? "var(--copper-glow)"
                      : "var(--charcoal)",
                    ringColor: "var(--copper)",
                  }}
                >
                  <span
                    style={{
                      color: selectedAddons.includes(addon.id)
                        ? "var(--copper)"
                        : "var(--cream)",
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
        </div>

        {/* Right: Quote Summary */}
        <div className="h-fit">
          <div
            className="rounded-2xl p-6 sm:p-8"
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
                {VEHICLE_SIZES.find((v) => v.id === vehicleSize)?.label}
              </span>
            </div>

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
                  const service = SERVICES.find((s) => s.id === serviceId);
                  const vehicleMultiplier =
                    VEHICLE_SIZES.find((v) => v.id === vehicleSize)?.multiplier ?? 1;
                  const conditionMultiplier =
                    CONDITIONS.find((c) => c.id === condition)?.multiplier ?? 1;
                  const price = Math.round(
                    (service?.basePrice ?? 0) * vehicleMultiplier * conditionMultiplier
                  );
                  return (
                    <div
                      key={serviceId}
                      className="flex justify-between items-center py-2 border-b"
                      style={{ borderColor: "var(--slate)" }}
                    >
                      <span style={{ color: "rgba(245, 240, 232, 0.8)" }}>
                        {service?.label}
                      </span>
                      <span className="font-medium">${price}</span>
                    </div>
                  );
                })
              )}

              {/* Condition adjustment indicator */}
              {condition !== "light" && selectedServices.length > 0 && (
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
                      {CONDITIONS.find((c) => c.id === condition)?.label}
                    </span>
                  </span>
                  <span className="text-sm" style={{ color: "var(--copper)" }}>
                    Included
                  </span>
                </div>
              )}

              {/* Selected Add-ons */}
              {selectedAddons.map((addonId) => {
                const addon = ADDONS.find((a) => a.id === addonId);
                const vehicleMultiplier =
                  VEHICLE_SIZES.find((v) => v.id === vehicleSize)?.multiplier ?? 1;
                const price = Math.round((addon?.price ?? 0) * vehicleMultiplier);
                return (
                  <div
                    key={addonId}
                    className="flex justify-between items-center py-2 border-b"
                    style={{ borderColor: "var(--slate)" }}
                  >
                    <span style={{ color: "rgba(245, 240, 232, 0.6)" }}>
                      {addon?.label}
                    </span>
                    <span className="font-medium">+${price}</span>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div
              className="pt-4 border-t"
              style={{ borderColor: "var(--copper)" }}
            >
              <div className="flex justify-between items-center mb-6">
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

              <button
                onClick={onSignupClick}
                className="btn-copper w-full py-4 rounded-xl text-base font-semibold"
              >
                Get Early Access to Save Quotes
              </button>

              <p
                className="text-xs text-center mt-4"
                style={{ color: "rgba(245, 240, 232, 0.4)" }}
              >
                This is a demo. Sign up to create and share real quotes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
