# DetailQuote Design System

## Aesthetic Direction: "Showroom Polish"

Evokes the gleam of freshly detailed paint under showroom lights. Dark, refined, with copper metallic accents. Luxury automotive meets professional craftsmanship.

### Design Principles

1. **Refined, not flashy** - Subtle sophistication over loud effects
2. **Copper as accent, not dominant** - Used sparingly for maximum impact
3. **Typography-led hierarchy** - Let the fonts establish visual order
4. **Intentional animation** - Every motion has purpose
5. **Professional trust** - This is a business tool, not a toy

---

## Color Palette

### Core Colors (Dark Foundation)

| Token       | Hex       | Usage                              |
|-------------|-----------|-----------------------------------|
| `obsidian`  | `#0C0C0C` | Page background                   |
| `charcoal`  | `#1A1A1A` | Card backgrounds, elevated areas  |
| `graphite`  | `#2A2A2A` | Hover states, subtle elevation    |
| `slate`     | `#3D3D3D` | Borders, dividers, muted elements |

### Light Colors (Text & Highlights)

| Token        | Hex       | Usage                    |
|--------------|-----------|--------------------------|
| `cream`      | `#F5F0E8` | Primary text             |
| `warm-white` | `#FAF8F5` | Emphasized text, headings|

### Accent Colors (Copper Metallic)

| Token         | Value                        | Usage                          |
|---------------|------------------------------|--------------------------------|
| `copper`      | `#C5935A`                    | CTAs, links, emphasis          |
| `copper-light`| `#D4A86A`                    | Hover states, gradient ends    |
| `copper-glow` | `rgba(197, 147, 90, 0.15)`   | Subtle backgrounds, glows      |

### Semantic Colors

| Token     | Hex       | Usage                    |
|-----------|-----------|--------------------------|
| `success` | `#4ade80` | Confirmations, positive  |
| `error`   | `#ef4444` | Errors, warnings         |

### Text Opacity Scale

Use opacity variants for text hierarchy:

```css
--text-primary: rgba(245, 240, 232, 1);     /* 100% - Headings */
--text-secondary: rgba(245, 240, 232, 0.7); /* 70% - Body text */
--text-muted: rgba(245, 240, 232, 0.5);     /* 50% - Captions */
--text-disabled: rgba(245, 240, 232, 0.3);  /* 30% - Disabled */
```

---

## Typography

### Font Families

| Role    | Font              | Fallback          | Usage                    |
|---------|-------------------|-------------------|--------------------------|
| Display | DM Serif Display  | Georgia, serif    | Headlines, hero text     |
| Body    | Plus Jakarta Sans | system-ui, sans   | Everything else          |

### Type Scale

| Size  | Rem     | Px  | Usage                     |
|-------|---------|-----|---------------------------|
| xs    | 0.75    | 12  | Fine print, labels        |
| sm    | 0.875   | 14  | Secondary text, captions  |
| base  | 1       | 16  | Body text                 |
| lg    | 1.125   | 18  | Lead paragraphs           |
| xl    | 1.25    | 20  | Section intros            |
| 2xl   | 1.5     | 24  | Card titles               |
| 3xl   | 1.875   | 30  | Section headings          |
| 4xl   | 2.25    | 36  | Page headings             |
| 5xl   | 3       | 48  | Hero text                 |
| 6xl   | 3.75    | 60  | Display text              |
| 7xl   | 4.5     | 72  | Hero headlines            |
| 8xl   | 6       | 96  | Giant display (pricing)   |

### Usage Guidelines

- **Headlines**: DM Serif Display, tight line-height (1.1)
- **Body**: Plus Jakarta Sans, normal line-height (1.5)
- **Labels**: Plus Jakarta Sans, uppercase, widest tracking (0.1em)

---

## Iconography

### Policy: SVG Only, No Emojis

This is a professional business tool. Icons reinforce trust and competence. We use SVG icons exclusively for a refined, consistent look.

### Use SVG Icons For

- Navigation elements
- Action buttons (add, edit, delete, share)
- Status indicators (check, error, warning)
- Feature illustrations
- Form elements
- Decorative icons in mockups

### SVG Style

```
- Stroke-based, 1.5-2px weight
- Rounded caps and joins (strokeLinecap="round" strokeLinejoin="round")
- Color: currentColor (inherits from parent)
```

### Icon Sizes

| Size | Pixels | Usage                |
|------|--------|----------------------|
| xs   | 16px   | Inline with text     |
| sm   | 20px   | Buttons, form fields |
| md   | 24px   | Standard UI icons    |
| lg   | 32px   | Feature icons        |
| xl   | 48px   | Hero/marketing icons |

### No Emojis

Emojis are **never** used in this project because:
- They render inconsistently across platforms
- They undermine the professional aesthetic
- They don't match our refined copper/dark theme

---

## Spacing

Use consistent spacing based on 4px increments:

| Token | Rem    | Pixels | Usage                    |
|-------|--------|--------|--------------------------|
| 1     | 0.25   | 4      | Tight gaps               |
| 2     | 0.5    | 8      | Small gaps, padding      |
| 3     | 0.75   | 12     | Compact padding          |
| 4     | 1      | 16     | Standard padding         |
| 6     | 1.5    | 24     | Card padding             |
| 8     | 2      | 32     | Section gaps             |
| 12    | 3      | 48     | Large gaps               |
| 16    | 4      | 64     | Section spacing          |
| 24    | 6      | 96     | Major section spacing    |

---

## Border Radius

| Token | Rem  | Usage                    |
|-------|------|--------------------------|
| sm    | 0.25 | Small elements, tags     |
| md    | 0.5  | Buttons, inputs          |
| lg    | 0.75 | Cards                    |
| xl    | 1    | Large cards              |
| 2xl   | 1.5  | Hero cards, modals       |
| 3xl   | 2    | Feature sections         |
| full  | 9999 | Pills, avatars           |

---

## Shadows

### Dark Shadows (Depth)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.4);
--shadow-xl: 0 20px 50px rgba(0, 0, 0, 0.5);
```

### Copper Glow (Accent)

```css
--shadow-copper-sm: 0 0 10px rgba(197, 147, 90, 0.2);
--shadow-copper-md: 0 0 20px rgba(197, 147, 90, 0.3);
--shadow-copper-lg: 0 0 40px rgba(197, 147, 90, 0.3);
```

---

## Animation

### Durations

| Token    | Duration | Usage                    |
|----------|----------|--------------------------|
| fast     | 150ms    | Micro-interactions       |
| normal   | 300ms    | Standard transitions     |
| slow     | 500ms    | Emphasis animations      |
| slower   | 800ms    | Page-load reveals        |

### Easings

| Token     | Curve                          | Usage              |
|-----------|--------------------------------|--------------------|
| easeOut   | cubic-bezier(0, 0, 0.2, 1)     | Enter animations   |
| easeInOut | cubic-bezier(0.4, 0, 0.2, 1)   | Standard           |
| bounce    | cubic-bezier(0.68, -0.55, ...) | Playful emphasis   |

### Stagger Delays

For sequential reveals, stagger elements by 100ms:

```css
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
```

---

## Component Patterns

### Buttons

**Primary (btn-copper)**
- Main CTA actions
- Copper gradient background, dark text
- Use sparingly: 1-2 per viewport

**Secondary**
- Alternative actions
- Transparent with slate border, cream text

**Ghost**
- Tertiary actions, navigation
- No background, copper text

### Cards

**Glass Card (.glass-card)**
- Semi-transparent with blur
- Copper border on hover
- Use for elevated content sections

**Solid Card**
- Charcoal background, slate border
- Use for grouped content

### Inputs

**Standard (.input-showroom)**
- Charcoal background
- Slate border, copper on focus
- Copper glow ring on focus

---

## 3D Effects

### CSS 3D Transforms

We use CSS 3D transforms to add depth and premium feel to the interface.

### Available Classes

| Class | Effect | Usage |
|-------|--------|-------|
| `perspective-container` | Sets up 3D perspective (1000px) | Wrap parent of 3D elements |
| `phone-3d` | Tilted phone mockup with glare | Mobile preview mockups |
| `demo-3d` | Subtle rotateX with hover lift | Feature sections, CTAs |
| `float-3d` | Continuous floating animation | Hero elements |
| `shine-effect` | Hover shine sweep | Cards, buttons |
| `tilt-card` | Base for interactive tilt | Used with TiltCard component |

### TiltCard Component

Interactive 3D card that tilts toward the cursor:

```tsx
import { TiltCard } from "@/components/TiltCard";

<TiltCard
  maxTilt={8}      // Max rotation degrees (default: 10)
  scale={1.02}     // Hover scale (default: 1.02)
  glare            // Enable glare effect (default: true)
  glareOpacity={0.15}  // Glare intensity (default: 0.15)
>
  <CardContent />
</TiltCard>
```

### Depth Layers

For elements that should "pop out" of their containers:

```css
.depth-layer-1 { transform: translateZ(10px); }
.depth-layer-2 { transform: translateZ(20px); }
.depth-layer-3 { transform: translateZ(40px); }
```

### Guidelines

- Always wrap 3D elements in `perspective-container`
- Use subtle tilt angles (6-10 degrees max)
- Add `transform-style: preserve-3d` to parents
- Combine with shadows for realistic depth
- Keep animations smooth (400-500ms transitions)

---

## Do's and Don'ts

### Do

- Use copper sparingly as an accent
- Maintain high contrast for accessibility
- Use the display font for headlines only
- Animate with purpose (entrance, feedback, emphasis)
- Keep interface elements professional

### Don't

- Overuse copper (it loses impact)
- Use emojis in functional UI elements
- Mix fonts within the same hierarchy level
- Add gratuitous animations
- Use rounded corners inconsistently

---

## File Reference

Design tokens are defined in:
- CSS Variables: `/src/app/globals.css`
- TypeScript: `/src/lib/design-system.ts`

Import tokens in components:
```typescript
import { colors, typography, spacing } from '@/lib/design-system';
```
