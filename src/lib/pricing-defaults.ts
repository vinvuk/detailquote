/**
 * Default pricing configuration for new businesses.
 * Matches the demo calculator values.
 */

export interface VehicleSize {
  id: string;
  label: string;
  multiplier: number;
}

export interface Condition {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export interface Service {
  id: string;
  label: string;
  basePrice: number;
}

export interface Addon {
  id: string;
  label: string;
  price: number;
}

export interface PricingConfig {
  vehicleSizes: VehicleSize[];
  conditions: Condition[];
  services: Service[];
  addons: Addon[];
}

/**
 * Default vehicle sizes with base price multipliers.
 */
export const DEFAULT_VEHICLE_SIZES: VehicleSize[] = [
  { id: "sedan", label: "Sedan / Coupe", multiplier: 1.0 },
  { id: "suv", label: "SUV / Crossover", multiplier: 1.25 },
  { id: "truck", label: "Truck / Van", multiplier: 1.4 },
];

/**
 * Default condition levels with price adjustments.
 */
export const DEFAULT_CONDITIONS: Condition[] = [
  { id: "light", label: "Light", description: "Regular maintenance", multiplier: 1.0 },
  { id: "moderate", label: "Moderate", description: "Some buildup", multiplier: 1.25 },
  { id: "heavy", label: "Heavy", description: "Deep cleaning needed", multiplier: 1.5 },
];

/**
 * Default detailing services.
 */
export const DEFAULT_SERVICES: Service[] = [
  { id: "exterior", label: "Exterior Wash & Wax", basePrice: 80 },
  { id: "interior", label: "Interior Deep Clean", basePrice: 100 },
  { id: "polish", label: "Paint Correction / Polish", basePrice: 150 },
];

/**
 * Default add-on services.
 */
export const DEFAULT_ADDONS: Addon[] = [
  { id: "engine", label: "Engine Bay", price: 45 },
  { id: "wheels", label: "Wheel Detail", price: 35 },
  { id: "headlights", label: "Headlight Restoration", price: 60 },
  { id: "odor", label: "Odor Removal", price: 50 },
  { id: "pet", label: "Pet Hair Removal", price: 40 },
  { id: "ceramic", label: "Ceramic Spray Coating", price: 75 },
];

/**
 * Returns the complete default pricing configuration.
 */
export function getDefaultPricing(): PricingConfig {
  return {
    vehicleSizes: DEFAULT_VEHICLE_SIZES,
    conditions: DEFAULT_CONDITIONS,
    services: DEFAULT_SERVICES,
    addons: DEFAULT_ADDONS,
  };
}
