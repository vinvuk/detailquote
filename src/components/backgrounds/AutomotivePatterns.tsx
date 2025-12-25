/**
 * Subtle automotive-themed background patterns.
 * Designed to add texture without distracting from content.
 */

/**
 * Tire tread pattern - subtle diagonal lines resembling tire tracks.
 */
export function TireTreadPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="tire-tread"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 20h10M20 0v10M40 20h-10M20 40v-10M5 5l6 6M29 5l6 6M5 29l6 6M29 29l6 6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tire-tread)" />
    </svg>
  );
}

/**
 * Water droplet pattern - subtle circles for detailing/wash theme.
 */
export function WaterDropletPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="water-drops"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="10" cy="10" r="3" fill="currentColor" />
          <circle cx="40" cy="25" r="2" fill="currentColor" />
          <circle cx="25" cy="45" r="4" fill="currentColor" />
          <circle cx="50" cy="50" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#water-drops)" />
    </svg>
  );
}

/**
 * Abstract car silhouettes floating in background.
 */
export function CarSilhouettePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="car-silhouettes"
          x="0"
          y="0"
          width="200"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          {/* Sedan silhouette */}
          <path
            d="M20 60 L30 45 L50 45 L60 55 L80 55 L90 60 L90 70 L20 70 Z"
            fill="currentColor"
          />
          <circle cx="35" cy="70" r="6" fill="var(--charcoal, #1a1a1a)" />
          <circle cx="75" cy="70" r="6" fill="var(--charcoal, #1a1a1a)" />

          {/* SUV silhouette offset */}
          <path
            d="M120 80 L130 60 L150 60 L160 65 L180 65 L190 80 L190 95 L120 95 Z"
            fill="currentColor"
          />
          <circle cx="135" cy="95" r="7" fill="var(--charcoal, #1a1a1a)" />
          <circle cx="175" cy="95" r="7" fill="var(--charcoal, #1a1a1a)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#car-silhouettes)" />
    </svg>
  );
}

/**
 * Hexagon pattern - modern tech feel for ceramic coatings.
 */
export function HexagonPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hexagons"
          x="0"
          y="0"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M28 0 L56 17 L56 50 L28 67 L0 50 L0 17 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M28 67 L56 84 L56 117 L28 134 L0 117 L0 84 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            transform="translate(0, -34)"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  );
}

/**
 * Sparkle/shine pattern for clean finish theme.
 */
export function SparklePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="sparkles"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* 4-point star */}
          <path
            d="M20 15 L22 20 L20 25 L18 20 Z M15 20 L20 18 L25 20 L20 22 Z"
            fill="currentColor"
          />
          {/* Small dot */}
          <circle cx="60" cy="30" r="1.5" fill="currentColor" />
          {/* Another star */}
          <path
            d="M50 60 L52 65 L50 70 L48 65 Z M45 65 L50 63 L55 65 L50 67 Z"
            fill="currentColor"
          />
          <circle cx="15" cy="55" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sparkles)" />
    </svg>
  );
}

/**
 * Combined subtle pattern with multiple automotive elements.
 */
export function AutomotiveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ color: "var(--copper)" }}>
      <SparklePattern />
      <div className="absolute inset-0" style={{ color: "var(--cream)" }}>
        <WaterDropletPattern />
      </div>
    </div>
  );
}

/**
 * Hero section background with gradient and pattern.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(184, 115, 51, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(184, 115, 51, 0.05) 0%, transparent 40%)"
        }}
      />
      {/* Pattern */}
      <div style={{ color: "var(--copper)" }}>
        <SparklePattern />
      </div>
    </div>
  );
}
