/**
 * Automotive-themed SVG icons for DetailQuote.
 * All icons use currentColor for easy theming.
 */

interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Compact car silhouette (sedan).
 */
export function CarSedan({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 17h14M3 14l2-7h3l2 3h4l2-3h3l2 7" />
      <circle cx="6.5" cy="17" r="2" />
      <circle cx="17.5" cy="17" r="2" />
      <path d="M8.5 17h7" />
    </svg>
  );
}

/**
 * SUV/Crossover silhouette.
 */
export function CarSUV({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 14h18v3H3zM5 14V9h4l2 2h6l2-2h2v5" />
      <circle cx="6.5" cy="17" r="2" />
      <circle cx="17.5" cy="17" r="2" />
      <path d="M8.5 17h7" />
    </svg>
  );
}

/**
 * Truck silhouette.
 */
export function CarTruck({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 14h15V8H7l-2 2H2v4zM17 14h5v-3l-2-3h-3v6z" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
      <path d="M8 17h8" />
    </svg>
  );
}

/**
 * Sports car silhouette.
 */
export function CarSports({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 13h20M4 13l1-4h4l3 2h4l3-2h3l1 4" />
      <circle cx="6" cy="15" r="2" />
      <circle cx="18" cy="15" r="2" />
      <path d="M8 15h8" />
    </svg>
  );
}

/**
 * Water droplet icon (for detailing/washing).
 */
export function WaterDroplet({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

/**
 * Spray bottle icon (for detailing products).
 */
export function SprayBottle({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 6h8v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6z" />
      <path d="M10 6V4h4v2" />
      <path d="M8 12v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8" />
      <path d="M6 6l-2-2" />
    </svg>
  );
}

/**
 * Shine/sparkle icon (for clean finish).
 */
export function Sparkle({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

/**
 * Steering wheel icon.
 */
export function SteeringWheel({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9V4M9 12H3M15 12h6M12 15v4" />
    </svg>
  );
}

/**
 * Car wash / foam icon.
 */
export function CarWash({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="8" cy="6" rx="2" ry="1.5" />
      <ellipse cx="12" cy="4" rx="2" ry="1.5" />
      <ellipse cx="16" cy="6" rx="2" ry="1.5" />
      <path d="M4 16l2-6h3l2 2h2l2-2h3l2 6" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M9 18h6" />
    </svg>
  );
}

/**
 * Generic car icon for UI elements.
 */
export function CarIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 17h2V9l-3-6H6L3 9v8h2" />
      <path d="M3 9h18" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 17h6" />
    </svg>
  );
}
