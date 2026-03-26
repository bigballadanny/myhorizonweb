# Premium Web Animation Patterns — Research Reference

## Sources: Awwwards, Linear, Stripe, Vercel, FreeFrontend, CSSAuthor (March 2026)

---

## Tier 1: Core Techniques (We Use Now)

### 1. Scroll-Triggered Reveals (GSAP ScrollTrigger)
- `gsap.from('.el', { y:24, opacity:0, duration:0.6, ease:'power2.out', scrollTrigger: { trigger:'.el', start:'top 80%' } })`
- Key: **vary the animation per section** — don't repeat the same fade-up everywhere

### 2. Kinetic Typography (Word/Char Stagger)
- Split text into `<span>` per word or character
- Stagger: 0.03-0.08s per word, `y:30→0, opacity:0→1, rotateX:15→0`
- Premium: add slight `skewY` on enter for a "falling into place" feel

### 3. Smooth Scroll (Lenis)
- Duration: 1.0-1.4 (faster = snappier, slower = floatier)
- Easing: exponential decay `1.001 - Math.pow(2, -10 * t)`
- Sync with GSAP ticker for ScrollTrigger compatibility

### 4. Glassmorphism
- `backdrop-filter: blur(12-20px); background: rgba(255,255,255,0.05-0.08); border: 1px solid rgba(255,255,255,0.1)`
- Key: needs a gradient or image behind it to be visible
- Light mode: `rgba(255,255,255,0.6)` with `border: rgba(0,0,0,0.08)`

---

## Tier 2: Next Level (Phase 2)

### 5. Parallax Layers
- Images: `scrollTrigger.scrub` with `y: -20%` (scroll at 0.8x speed)
- Text: `y: 10%` (scroll at 1.1x speed) — creates depth between text and images
- Background elements: `y: -40%` for max depth

### 6. Horizontal Scroll Sections
- Pin a container, animate `x` of inner content on vertical scroll
- Use `pin: true` on ScrollTrigger
- Great for portfolio, feature showcases, timeline views

### 7. Text Line Reveal (Philosophy-style)
- Wrap each line in `<div>` with `overflow: hidden`
- GSAP: `y: '100%' → 0` per line with stagger
- Triggered by scroll — each line appears as you scroll past it

### 8. Magnetic Buttons
- Track mouse position relative to button center
- `gsap.to(el, { x: dx * 0.15, y: dy * 0.15 })` — max 4-6px shift
- Spring back: `ease: 'elastic.out(1, 0.4)'`

### 9. Counter Animation (Power-Eased)
- `gsap.to(obj, { value: target, ease: 'power2.out', duration: 2.2 })`
- Suffix pop-in: `gsap.to(suffix, { opacity:1, scale:1, ease:'back.out(2)' })` on complete

---

## Tier 3: Wow Factor (Phase 3)

### 10. SVG Path Morphing
- GSAP MorphSVG plugin (paid) or manual path animation
- Use for logo animations, loading states, section transitions

### 11. 3D Card Tilt (CSS perspective)
- `transform: perspective(800px) rotateY(calc(var(--mx) * 15deg)) rotateX(calc(var(--my) * -15deg))`
- Track mouse position with CSS custom properties
- Subtle: max 5-8 degrees rotation

### 12. Scroll-Scrubbed Video
- Pin a `<video>` element, scrub `currentTime` with scroll position
- `onUpdate: (self) => { video.currentTime = self.progress * video.duration }`
- Requires short (3-8s) optimized video

### 13. Cursor Effects
- Radial gradient glow following cursor (low opacity 0.05-0.1)
- Custom cursor that morphs on hover targets
- Cursor trail (array of dots with decreasing opacity)

### 14. Staggered Grid Reveals (Masonry-style)
- Each card delays by `index * 0.08s`
- Use `randomize` option in GSAP for organic feel
- Cards can come from different directions based on grid position

### 15. Pinned Section Transitions
- Pin section A, fade/transform in section B content
- Creates "app-like" navigation between full-screen views
- Great for product tours, feature walkthroughs

---

## Performance Rules

1. **Only animate `transform` and `opacity`** — never `top`, `left`, `width`, `height`
2. **Use `will-change: transform`** on animated elements (remove after animation completes)
3. **Respect `prefers-reduced-motion`** — disable or simplify all animations
4. **GSAP matchMedia** for responsive — disable complex animations on mobile
5. **Target 60fps** — if GPU can't keep up, simplify (remove blur, reduce particle count)
6. **Animation sweet spot**: 150-400ms for UI interactions, 600-1000ms for scroll reveals

---

## Tool Choices (2026 Consensus)

| Use Case | Best Tool |
|---|---|
| Scroll storytelling | GSAP + ScrollTrigger |
| UI micro-interactions | Framer Motion (React) |
| Smooth scroll | Lenis |
| Icon/illustration animation | Lottie (Bodymovin) |
| Complex 3D | Three.js / react-three-fiber |
| Simple fades/slides | CSS transitions |

**GSAP vs Motion (Framer):** GSAP wins for complex scroll-driven sequences. Motion wins for component-level React animations (mount/unmount, layout). Use both — they coexist well.

---

## Inspiration Sources
- [Awwwards GSAP Collection](https://www.awwwards.com/websites/gsap/)
- [FreeFrontend ScrollTrigger Examples](https://freefrontend.com/scroll-trigger-js/) — 57 codepen demos
- [Webflow ScrollTrigger Gallery](https://webflow.com/made-in-webflow/scrolltrigger)
- Linear.app — pinned sections, smooth transitions, minimal but cinematic
- Stripe.com — gradient meshes, glass, horizontal scrolling
- Vercel.com — dark theme, kinetic text, parallax feature cards
