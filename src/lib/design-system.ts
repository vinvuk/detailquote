/**
 * DetailQuote Design System
 *
 * AESTHETIC: "Showroom Polish"
 * Evokes the gleam of freshly detailed paint under showroom lights.
 * Dark, refined, with copper metallic accents. Luxury automotive meets
 * professional craftsmanship.
 *
 * PRINCIPLES:
 * 1. Refined, not flashy - Subtle sophistication over loud effects
 * 2. Copper as accent, not dominant - Used sparingly for emphasis
 * 3. Typography-led hierarchy - Let the fonts do the work
 * 4. Intentional animation - Every motion has purpose
 * 5. Professional trust - This is a business tool, not a toy
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const colors = {
  // Core palette - Dark foundation
  obsidian: '#0C0C0C',      // Deepest black - page background
  charcoal: '#1A1A1A',      // Card backgrounds, elevated surfaces
  graphite: '#2A2A2A',      // Hover states, subtle elevation
  slate: '#3D3D3D',         // Borders, dividers, muted elements

  // Light palette - Text and highlights
  cream: '#F5F0E8',         // Primary text color
  warmWhite: '#FAF8F5',     // Emphasized text, headings

  // Accent palette - Copper metallic
  copper: '#C5935A',        // Primary accent - CTAs, links, emphasis
  copperLight: '#D4A86A',   // Hover states, gradients
  copperGlow: 'rgba(197, 147, 90, 0.15)', // Subtle backgrounds, glows

  // Semantic colors
  success: '#4ade80',       // Green - confirmations, positive states
  error: '#ef4444',         // Red - errors, negative states, warnings

  // Opacity variants for text
  textPrimary: 'rgba(245, 240, 232, 1)',      // 100% cream
  textSecondary: 'rgba(245, 240, 232, 0.7)',  // 70% cream
  textMuted: 'rgba(245, 240, 232, 0.5)',      // 50% cream
  textDisabled: 'rgba(245, 240, 232, 0.3)',   // 30% cream
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  // Font families
  fontDisplay: "'DM Serif Display', Georgia, serif",
  fontBody: "'Plus Jakarta Sans', system-ui, sans-serif",

  // Font sizes (rem-based for accessibility)
  sizes: {
    xs: '0.75rem',    // 12px - Fine print, labels
    sm: '0.875rem',   // 14px - Secondary text, captions
    base: '1rem',     // 16px - Body text
    lg: '1.125rem',   // 18px - Lead paragraphs
    xl: '1.25rem',    // 20px - Section intros
    '2xl': '1.5rem',  // 24px - Card titles
    '3xl': '1.875rem', // 30px - Section headings
    '4xl': '2.25rem', // 36px - Page headings
    '5xl': '3rem',    // 48px - Hero text
    '6xl': '3.75rem', // 60px - Display text
    '7xl': '4.5rem',  // 72px - Hero headlines
    '8xl': '6rem',    // 96px - Giant display (pricing)
  },

  // Font weights
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeights: {
    tight: 1.1,       // Headlines
    snug: 1.25,       // Subheadings
    normal: 1.5,      // Body text
    relaxed: 1.625,   // Long-form reading
  },

  // Letter spacing
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',  // Uppercase labels
  },
} as const;

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  32: '8rem',       // 128px
} as const;

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const radii = {
  none: '0',
  sm: '0.25rem',    // 4px - Small elements, tags
  md: '0.5rem',     // 8px - Buttons, inputs
  lg: '0.75rem',    // 12px - Cards
  xl: '1rem',       // 16px - Large cards
  '2xl': '1.5rem',  // 24px - Hero cards, modals
  '3xl': '2rem',    // 32px - Feature sections
  full: '9999px',   // Pills, avatars
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 25px rgba(0, 0, 0, 0.4)',
  xl: '0 20px 50px rgba(0, 0, 0, 0.5)',

  // Copper glow effects
  copperSm: '0 0 10px rgba(197, 147, 90, 0.2)',
  copperMd: '0 0 20px rgba(197, 147, 90, 0.3)',
  copperLg: '0 0 40px rgba(197, 147, 90, 0.3)',

  // Inner shadows for depth
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
} as const;

// =============================================================================
// ANIMATION
// =============================================================================

export const animation = {
  // Durations
  durations: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
    slowest: '1000ms',
  },

  // Easings
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Stagger delays for sequential animations
  stagger: {
    fast: 50,   // ms between items
    normal: 100,
    slow: 150,
  },
} as const;

// =============================================================================
// ICONOGRAPHY GUIDELINES
// =============================================================================

/**
 * ICON POLICY: SVG only, no emojis
 *
 * This is a professional business tool. Icons should reinforce trust and
 * competence, not playfulness. We use SVG icons exclusively for a refined,
 * consistent look.
 *
 * USE SVG ICONS FOR:
 * - Navigation elements
 * - Action buttons (add, edit, delete, share)
 * - Status indicators (check, error, warning)
 * - Feature illustrations
 * - Form elements
 * - Decorative icons in mockups
 *
 * SVG STYLE:
 * - Stroke-based, 1.5-2px weight
 * - Rounded caps and joins (strokeLinecap="round" strokeLinejoin="round")
 * - Sized at 16-24px for UI, 32-48px for features
 * - Color: inherit from parent (currentColor)
 *
 * NEVER USE EMOJIS:
 * - They are inconsistent across platforms
 * - They undermine the professional aesthetic
 * - They don't match our refined copper/dark theme
 */

export const iconSizes = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '48px',
} as const;

// =============================================================================
// COMPONENT PATTERNS
// =============================================================================

/**
 * BUTTON HIERARCHY
 *
 * Primary (btn-copper):
 *   - Main CTA actions
 *   - Copper gradient background
 *   - Dark text
 *   - Use sparingly: 1-2 per viewport
 *
 * Secondary:
 *   - Alternative actions
 *   - Transparent with slate border
 *   - Cream text
 *   - Hover: charcoal background
 *
 * Ghost:
 *   - Tertiary actions, navigation
 *   - No background or border
 *   - Copper text
 *   - Hover: copper-glow background
 */

export const buttonStyles = {
  primary: {
    background: `linear-gradient(135deg, ${colors.copper} 0%, ${colors.copperLight} 50%, ${colors.copper} 100%)`,
    color: colors.obsidian,
    fontWeight: typography.weights.semibold,
  },
  secondary: {
    background: 'transparent',
    border: `1px solid ${colors.slate}`,
    color: colors.cream,
  },
  ghost: {
    background: 'transparent',
    color: colors.copper,
  },
} as const;

/**
 * CARD STYLES
 *
 * Glass Card:
 *   - For elevated content sections
 *   - Semi-transparent with blur
 *   - Subtle copper border on hover
 *
 * Solid Card:
 *   - For grouped content
 *   - Charcoal background
 *   - Slate border
 */

export const cardStyles = {
  glass: {
    background: 'linear-gradient(135deg, rgba(42, 42, 42, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(197, 147, 90, 0.1)',
  },
  solid: {
    background: colors.charcoal,
    border: `1px solid ${colors.slate}`,
  },
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
  max: 9999,
} as const;
