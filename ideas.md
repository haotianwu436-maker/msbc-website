# MSBC Visual Redesign — TOKEN2049-Grade Direction

## Selected Direction: "Stage Presence"

A visual system inspired by the world's most premium crypto conference brands (TOKEN2049, Consensus, Devconnect). The website should feel like walking into a dark, spotlit conference stage — commanding, confident, and unmistakably high-end.

---

## Design Movement
**Conference-Grade Editorial Dark** — Merging the cinematic depth of luxury event branding with the precision of modern Web3 identity systems. Think: Apple keynote staging meets TOKEN2049 commercial confidence.

## Core Principles
1. **Commanding Presence**: Every section should feel like a stage moment. Oversized type, dramatic spacing, confident composition.
2. **Controlled Elegance**: Dark, polished surfaces with precise lighting accents. No noise, no clutter, no playfulness.
3. **Editorial Rhythm**: Sections alternate between full-bleed dramatic moments and clean information grids. Magazine-like pacing.
4. **Commercial Confidence**: Sponsor sections, ticket CTAs, and speaker cards must feel like premium partnerships, not student projects.

## Color Philosophy (3 Colors Only)

| Role | Color | OKLCH Value | Hex | Reasoning |
|------|-------|-------------|-----|-----------|
| **Canvas** | Void Black | `oklch(0.09 0.005 260)` | `#07090F` | Near-black with a cold blue undertone. The stage before the lights. |
| **Signal** | Electric Blue | `oklch(0.65 0.2 250)` | `#2563EB` | Confident, institutional, premium. Not neon — controlled energy. |
| **Text** | Platinum White | `oklch(0.95 0.005 260)` | `#F0F2F8` | Crisp, high-contrast readability against dark canvas. |

Supporting neutrals (derived, not primary):
- Elevated Surface: `oklch(0.13 0.008 260)` / `#111827` — Card backgrounds, elevated panels
- Muted Text: `oklch(0.55 0.01 260)` / `#6B7280` — Secondary copy, labels
- Divider: `oklch(0.2 0.005 260)` / `#1F2937` — Subtle borders, separators
- Blue Glow (accent): `oklch(0.65 0.2 250 / 0.15)` — Ambient lighting effects

## Layout Paradigm
- **Full-viewport hero** with oversized headline (clamp 4rem–7rem)
- **Generous vertical rhythm**: 120px–160px between major sections on desktop
- **Edge-to-edge dark sections** alternating with contained content grids
- **Asymmetric compositions** for speaker highlights and about sections
- **12-column grid** with deliberate negative space — never fill every column
- **No rounded corners on major containers** — sharp, architectural edges
- **Cards use very subtle border** (`1px solid rgba(255,255,255,0.06)`) not background elevation

## Signature Elements
1. **Blue Gradient Horizon Line**: A subtle horizontal gradient glow that appears between sections — like stage lighting spilling across a dark floor
2. **Spotlight Radials**: Soft radial gradients (blue, 5-10% opacity) placed behind key content to create depth and focus
3. **Precision Dividers**: Thin 1px lines with gradient opacity, used to separate content blocks with architectural precision

## Typography System
- **Headlines**: Space Grotesk — Bold, geometric, commanding. Used at oversized scales (4rem–7rem for hero, 2.5rem–3.5rem for sections)
- **Body**: Inter — Clean, professional, highly readable at all sizes. 16px base, 1.7 line-height
- **Mono/Labels**: JetBrains Mono — For dates, stats, countdown numbers, badge labels. Adds technical precision.
- **Hierarchy Rule**: Headlines are ALWAYS significantly larger than body. Minimum 2:1 ratio. No ambiguity about what's a heading.

## Interaction Philosophy
- **Restrained motion**: No bouncy or playful animations. Smooth fade-ups (0.6s ease), subtle scale on hover (1.02x)
- **Hover states**: Cards gain a faint blue border glow. Buttons brighten. Links underline.
- **No scroll-triggered theatrics**: Content appears cleanly, not dramatically.

## Animation Guidelines
- Entry: `opacity 0→1, translateY 20px→0, duration 0.6s, ease cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger: 0.08s between grid items
- Hover cards: `border-color transition 0.3s, subtle box-shadow glow`
- No parallax, no rotation, no scale-in effects
- Countdown numbers: Simple digit transition, clean

## Component Styling Rules
- **Buttons**: Sharp corners (border-radius: 4px max), solid fills for primary, ghost/outline for secondary. Tall padding (14px 32px).
- **Cards**: Dark surface (`#111827`), 1px border (`rgba(255,255,255,0.06)`), no shadow. On hover: border brightens to blue.
- **Speaker Cards**: Large photo (square, sharp corners), name in bold, org in muted. Clean, no decorative elements.
- **Sponsor Logos**: White/light logos on dark background. Generous spacing. Grouped by tier with clear hierarchy.
- **Section Headers**: Oversized title + short subtitle. Left-aligned or centered depending on section. Always with generous top margin.
- **Stats**: Large mono numbers (4rem+), small label below. Arranged in a clean row with dividers.
