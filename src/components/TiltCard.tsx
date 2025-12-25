"use client";

import { useRef, useState, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Scale on hover */
  scale?: number;
  /** Transition speed in ms */
  speed?: number;
  /** Enable/disable the glare effect */
  glare?: boolean;
  /** Max glare opacity (0-1) */
  glareOpacity?: number;
}

/**
 * Interactive 3D tilt card component.
 * Tilts toward the cursor position for a premium, physical feel.
 * @param children - Card content
 * @param className - Additional CSS classes
 * @param style - Inline styles
 * @param maxTilt - Maximum rotation angle (default: 10)
 * @param scale - Hover scale factor (default: 1.02)
 * @param speed - Transition speed in ms (default: 400)
 * @param glare - Enable glare effect (default: true)
 * @param glareOpacity - Max glare opacity (default: 0.15)
 */
export function TiltCard({
  children,
  className = "",
  style = {},
  maxTilt = 10,
  scale = 1.02,
  speed = 400,
  glare = true,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, transform: "translate(-50%, -50%)" });

  /**
   * Handles mouse movement to calculate tilt angles.
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate position relative to center (-1 to 1)
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      // Calculate rotation (inverted for natural feel)
      const rotateX = -percentY * maxTilt;
      const rotateY = percentX * maxTilt;

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
      );

      // Update glare position
      if (glare) {
        const glareX = 50 + percentX * 30;
        const glareY = 50 + percentY * 30;
        setGlareStyle({
          opacity: glareOpacity,
          transform: `translate(${glareX - 50}%, ${glareY - 50}%)`,
        });
      }
    },
    [maxTilt, scale, glare, glareOpacity]
  );

  /**
   * Resets the card to its original position.
   */
  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlareStyle({ opacity: 0, transform: "translate(-50%, -50%)" });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{
        ...style,
        transform,
        transition: `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-inherit overflow-hidden"
          style={{ borderRadius: "inherit" }}
        >
          <div
            className="absolute w-[200%] h-[200%]"
            style={{
              top: "50%",
              left: "50%",
              background: `radial-gradient(circle, rgba(255,255,255,${glareOpacity}) 0%, transparent 50%)`,
              opacity: glareStyle.opacity,
              transform: glareStyle.transform,
              transition: `opacity ${speed}ms ease, transform ${speed}ms ease`,
            }}
          />
        </div>
      )}
    </div>
  );
}
