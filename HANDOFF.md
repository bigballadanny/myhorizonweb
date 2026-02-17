# MyHorizon — Premium Editorial Redesign

**Date:** 2026-02-17  
**Status:** ✅ Complete — `npx vite build` passes clean

---

## ✅ What Was Done

The site has been rebuilt from "dark AI startup template" to "premium editorial agency." Every decision was made to look like a human who cares about typography and whitespace made it — not a gradient-loving AI.

### The Core Shift
- **Typography:** Replaced all `font-black` + tight tracking with `Instrument Serif` at weight 400 (normal). This single change is the biggest visual transformation. Serif headlines at normal weight = editorial. Bold sans-serif headlines = template.
- **Background:** `#FAFAF7` warm off-white instead of white or dark. Sections alternate between `bg-background` and `bg-card` (`#F5F5F0`).
- **Layout:** Killed all card grids, bento grids, centered-everything. Services are alternating left/right editorial sections. Everything else flows with generous whitespace.
- **Decoration removed:** Every glow blob (`blur-[140px]`), every pulsing dot badge, every hero grid overlay — gone.
- **Default theme:** Light. The business owner landing experience is warm off-white, near-black text.

---

## 📁 Files Changed

| File | What Changed |
|------|-------------|
| `src/index.css` | Complete overhaul: new fonts (Instrument Serif + DM Sans), warm off-white color system, removed bento-grid/hero-grid/glow animations, added `.font-serif` + `.section-label` utilities, body font set to DM Sans |
| `src/components/ThemeProvider.tsx` | `defaultTheme` changed from `"dark"` to `"light"`, `enableSystem` set to `false` |
| `src/components/Hero.tsx` | Full rewrite: warm bg, left-aligned layout, serif headline in italic, hero-abstract.png on right, no glow blobs, no lettered avatar circles — replaced with a simple text line |
| `src/components/Services.tsx` | Full rewrite: 3 featured services as alternating editorial sections (lg:order-1/2), 3 remaining as compact text+image list, no bento grid at all |
| `src/components/Problem.tsx` | Full rewrite: `bg-card` background, clean numbered list (01/02/03) in a table-like grid, no glow blobs, section label replaces pulsing dots |
| `src/components/Industries.tsx` | Full rewrite: 6 industries as clean border-top text blocks (no heavy cards), emoji + serif name + sans tagline, hover is subtle bg shift only |
| `src/components/Process.tsx` | Full rewrite: horizontal flow with step numbers in border circles sitting on a single `bg-border` line, serif headings, no colored icon circles |
| `src/components/Results.tsx` | Full rewrite: light background, metrics in left-aligned border-top blocks, serif numbers in accent-blue, no dark bg, no glow blobs |
| `src/components/UrgencyCTA.tsx` | Full rewrite: `bg-card` section, left-aligned serif headline, clean CTA — soft invitation tone, no glow |
| `src/components/SynthiosProduct.tsx` | Full rewrite: capabilities as vertical border-top list (not 2x2 card grid), two-column layout on desktop (capabilities left, checklist right), serif headline |
| `src/components/Navigation.tsx` | Updated: smaller logo, DM Sans bold, lighter CTA button (`size="sm"`), mobile menu cleaned up, no heavy styling |
| `src/components/Footer.tsx` | Updated: `#1a1a1a` warm dark bg, DM Sans, three-column layout (brand, nav, social), social icons uniform color |
| `src/components/Contact.tsx` | Light edits only: header updated to serif, section background to `bg-card`, pulsing dot removed from widget header. Cal.com integration **unchanged**. |

### Files NOT Changed (as required)
- `src/components/ElevenLabsWidget.tsx` — untouched
- `src/pages/Admin.tsx` — untouched  
- `src/pages/Auth.tsx` — untouched
- All admin components under `src/components/admin/` — untouched

---

## ✔️ Verification

- [x] `npx vite build` passes with zero errors (chunk size warning is pre-existing, not an error)
- [x] Light theme is the default — `ThemeProvider defaultTheme="light"`, `enableSystem=false`
- [x] Dark theme still works via ThemeToggle (dark CSS vars unchanged)
- [x] Zero card grids on the public site
- [x] Instrument Serif loads from Google Fonts — all h1/h2 use `.font-serif`
- [x] All CTAs call `scrollToContact()` → `#contact`
- [x] No pricing anywhere in any component
- [x] No fake testimonials (Testimonials.tsx was already not in App.tsx)
- [x] No pulsing dots, no glow blobs — searched and confirmed removed
- [x] ElevenLabsWidget renders (unchanged)
- [x] Admin access still works via logo 8-click secret + `/auth` route
- [x] Cal.com booking with 3 booking types preserved exactly
- [x] Mobile-responsive (container padding, grid stacks to single column)
- [x] hero-abstract.png used in Hero section

---

## 🧠 Context for Future

### Typography — The Critical Pattern
The `.font-serif` class must be applied manually to each `h1`/`h2`. The global CSS base styles set the font-family and weight 400, but Tailwind utility classes on elements can override. Pattern used throughout:
```tsx
<h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
```

### Section Rhythm
- `bg-background` (#FAFAF7) and `bg-card` (#F5F5F0) alternate for visual separation without hard borders
- Order: Hero (bg-background) → Services (bg-background) → Problem (bg-card) → Industries (bg-background) → Process (bg-card) → Results (bg-background) → UrgencyCTA (bg-card) → Synthios (bg-background) → Contact (bg-card)

### `.section-label` Utility
Defined in `index.css` as a CSS class (not a Tailwind utility). Use it for all section labels:
```tsx
<p className="section-label mb-6">Industries We Serve</p>
```

### Services Alternating Layout
Uses `lg:order-1` / `lg:order-2` to swap text/image columns. Text is always first in DOM (good for accessibility/mobile), desktop reorders visually. The `service.flip` boolean controls this.

### Dark Mode
The dark CSS vars (`.dark {}` block in index.css) are preserved unchanged. The dark experience uses the same layout/components but with dark backgrounds. ThemeToggle still works — users can switch.

### What's Not Yet Done (Optional Future Polish)
- Real product screenshots could replace the abstract service images
- A "Featured in" or publication logos strip could go between Hero and Services
- The SynthiosProduct could benefit from an actual screenshot of the product interface
- Results section currently uses hypothetical metrics — could be swapped for case study data when available

---

## 📚 Learnings

### What Worked Well
- The `section-label` CSS utility class approach is cleaner than repeating Tailwind classes everywhere
- Using `lg:order-1/order-2` for layout flipping is simpler and more accessible than CSS `direction: rtl` tricks
- Removing glow blobs is a surgical `remove all absolute divs with blur` pass — easy to find by searching `blur-[`
- Warm off-white (`#FAFAF7`) feels dramatically more premium than pure white — one hex code change with huge visual impact

### What to Watch
- Instrument Serif at weight 400 requires the exact Google Fonts import with `ital@0;1` — if you add a new font variant, update the import URL
- The `@layer base` typography overrides apply to *unstyled* headings. Components using Tailwind `font-*` classes override these — that's intentional and correct.
- `enableSystem=false` in ThemeProvider prevents the OS dark mode from overriding the default light experience

### The Design Principle That Made This Work
The original site had 6+ accent colors used everywhere (blue, emerald, purple). This screams "AI-generated template." The redesign uses one accent (blue) used sparingly. Muted foreground for labels. Foreground for body copy. Serif for headlines. That's it. Constraint = premium.
