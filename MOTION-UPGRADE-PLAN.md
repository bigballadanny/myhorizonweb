# MyHorizon.ai Motion Upgrade — Execution Plan

## Status: IN PROGRESS
## Branch: `feat/motion-upgrade`
## Goal: Transform myhorizon.ai from "template fade-ups" to cinematic, MotionSites-level visual quality

---

## Current State Analysis

### What exists:
- React + Vite + TypeScript + Tailwind + shadcn/ui
- Framer Motion (installed, used for identical `opacity:0→1, y:15→0` on every section)
- GSAP 3.14.2 (installed in package.json, **NEVER IMPORTED**)
- Lenis (installed via @studio-freight/lenis, **NEVER IMPORTED**)
- ParticleNetwork.tsx — gorgeous space canvas with stars, nebula, shooting stars (**NOT USED on homepage**)
- ScrollProgress.tsx — rainbow progress bar (**NOT USED in App.tsx layout**)
- Instrument Serif + DM Sans typography
- Dark/light theme system
- ElevenLabs voice widget

### The Problem:
Every section uses the exact same animation:
```jsx
initial={{ opacity: 0, y: 15 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```
This creates a monotonous, predictable, "AI-generated" feel. Premium sites vary their animation patterns, use scroll-driven storytelling, and have depth/layering.

---

## Implementation Phases

### Phase 1: Foundation (Wire up GSAP + Lenis)

**File: `src/hooks/useSmoothScroll.ts`** — New hook
- Initialize Lenis smooth scroll on mount
- Sync Lenis with GSAP's ScrollTrigger ticker
- Handle cleanup on unmount

**File: `src/hooks/useGSAP.ts`** — New hook  
- Register ScrollTrigger plugin
- Provide a `useScrollAnimation` helper that creates scroll-triggered GSAP timelines
- Handle ref-based targeting

**File: `src/App.tsx`** — Update
- Import and use `useSmoothScroll()` at app level
- Add `<ScrollProgress />` to the layout (already exists, just not wired in)

### Phase 2: Hero Transformation

**File: `src/components/Hero.tsx`** — Major rewrite
1. **Background**: Replace static `hero-gradient-mesh` with the ParticleNetwork canvas (or a simplified dark gradient with subtle animated orbs)
2. **Kinetic Typography**: Split headline into words/chars, animate with GSAP SplitText-style stagger:
   - Each word fades up + slight rotation with 0.05s stagger
   - "Now it can." gets a special shimmer/gradient animation
3. **CTA Buttons**: Add magnetic hover effect (buttons subtly pull toward cursor)
4. **Remove static hero image**: Replace with an animated element — CSS gradient orb, animated mesh, or keep ParticleNetwork
5. **Scroll indicator**: Add a subtle "scroll down" animated chevron at bottom of hero

### Phase 3: Section-Specific Animations

**Services section** (`src/components/Services.tsx`):
- Service cards: slide in from alternating left/right (not just fade up)
- Service images: parallax (scroll slower than content)
- Icons: rotate/scale on scroll enter
- Staggered card entrance with spring physics

**Industries section** (`src/components/Industries.tsx`):
- Cards: staggered grid reveal (masonry-style timing)
- Hover: glassmorphism transform — `backdrop-filter: blur(12px)`, border glow, scale(1.02)
- Background: subtle gradient wash that shifts color as you scroll

**Results/Stats section** (`src/components/Results.tsx`):
- Counter numbers: GSAP countUp with easing (not linear)
- Triggered on scroll into view
- Add "+" and "%" symbols that pop in slightly after the number finishes

**Philosophy section** (`src/components/Philosophy.tsx`):
- Text reveal: line-by-line on scroll (each line becomes visible as you scroll past it)
- Parallax on the background

**Contact section** (`src/components/Contact.tsx`):
- Form fields: staggered slide-up on scroll
- Background: subtle particle/dot grid animation

### Phase 4: Micro-interactions & Polish

**Glassmorphism utility classes** (`src/index.css`):
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.glass-card-hover:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}
```

**Magnetic button component** (`src/components/ui/MagneticButton.tsx`):
- Track mouse position relative to button center
- Apply subtle transform toward cursor (max 4-6px shift)
- Spring back on mouse leave

**Cursor glow** (optional, `src/components/CursorGlow.tsx`):
- Subtle radial gradient that follows the cursor
- Only on desktop (check for touch device)
- Very low opacity (0.05-0.1) — accent color

### Phase 5: Dark Mode as Default
- In `src/main.tsx` or theme provider, set `defaultTheme: 'dark'`
- Ensure all new glass/animation styles work in both modes but are optimized for dark

---

## Files Modified (Summary)
- `src/App.tsx` — Add smooth scroll, scroll progress
- `src/hooks/useSmoothScroll.ts` — NEW
- `src/hooks/useGSAP.ts` — NEW  
- `src/components/Hero.tsx` — Major rewrite (kinetic text, animated bg)
- `src/components/Services.tsx` — Varied scroll animations
- `src/components/Industries.tsx` — Glassmorphism cards
- `src/components/Results.tsx` — GSAP counter animation
- `src/components/Philosophy.tsx` — Line-by-line text reveal
- `src/components/Contact.tsx` — Staggered form entrance
- `src/components/ui/MagneticButton.tsx` — NEW
- `src/index.css` — Glass utility classes, animation keyframes
- `src/components/ScrollProgress.tsx` — Already exists, just needs to be imported in App

## Files NOT Modified
- Navigation.tsx — already has glass blur, leave it
- ElevenLabsWidget.tsx — functional, don't touch
- Supabase integrations — don't touch
- Build config — don't touch

---

## Testing Checklist
- [ ] `npm run build` passes with zero errors
- [ ] Lenis smooth scroll works on Chrome, Safari, Firefox
- [ ] All GSAP animations trigger correctly on scroll
- [ ] Mobile: animations are reduced/simplified (respect prefers-reduced-motion)
- [ ] Dark mode: all glass effects render correctly  
- [ ] Light mode: fallback styles work
- [ ] ElevenLabs widget still works
- [ ] Lead forms still submit to Supabase
- [ ] No layout shift / CLS issues
- [ ] Performance: Lighthouse score stays above 85

---

## Key Constraints
- DO NOT change the copy/content — only the visual presentation
- DO NOT modify Supabase functions or backend logic
- DO NOT change the routing structure
- KEEP all existing Framer Motion animations working (enhance, don't break)
- PRESERVE all lead capture functionality
- USE existing installed packages (gsap, @studio-freight/lenis) — no new dependencies unless absolutely needed
