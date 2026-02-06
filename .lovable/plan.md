

# Comprehensive Site Fix and Polish Plan

## Overview
This plan addresses 10 priority items: removing the irrelevant hero video, removing Admin from nav, removing fake testimonials, fixing the Results section image, polishing SYNTHIOS and Services sections, improving Contact, cleaning up the Footer, and enhancing the ElevenLabs widget.

---

## Changes by Priority

### 1. Replace Hero Video with Animated Background
**File:** `src/components/Hero.tsx`

Remove the video element entirely and replace with a CSS/canvas animated particle network background. The implementation will use a canvas element with slowly moving, connected nodes on a deep navy (#0a1628) background -- suggesting AI systems working together.

- Remove the `<video>` tag and all video-related state/refs (isMuted, videoRef, volume controls)
- Remove the mute/unmute button (top-right)
- Remove the "Sound On" tooltip
- Add a new `ParticleNetwork` component using HTML Canvas that renders ~80 particles drifting slowly, drawing connection lines between nearby nodes with subtle opacity
- Keep all hero text, CTA buttons, social proof bar, and scroll indicator exactly as-is

### 2. Remove "Admin" from Navigation
**File:** `src/components/Navigation.tsx`

- Remove lines 41-47 (handleAdminClick function)
- Remove lines 84-89 (the Admin button in desktop nav)
- The admin route still exists via direct URL `/auth` -- just hidden from public nav
- Keep: Services, SYNTHIOS, Contact, Get Started

### 3. Remove Fake Testimonials
**File:** `src/App.tsx`

- Remove the `<Testimonials />` component and its import
- Clean removal, no replacement section

### 4. Fix Results Section -- Remove Robot Image, Enlarge Stats
**File:** `src/components/Results.tsx`

- Remove the two-column layout with the AI workflow image
- Make the section single-column: centered header text on top, then the 3 stat cards below
- Make stat cards larger: increase number size to `text-6xl lg:text-7xl`, increase padding to `p-10`
- Remove the `aiWorkflowVisual` import
- Keep the animated counters and all metric data

### 5. Polish SYNTHIOS Box Section
**File:** `src/components/SynthiosProduct.tsx`

- Make headline larger: `text-5xl sm:text-6xl lg:text-7xl`
- Add subtle emerald glow behind the product image card (larger blur radius on the ambient glow divs)
- Feature list already has check icons -- keep as-is (they have emerald circles)
- Add price anchoring: Show "Value: $5,000+" with strikethrough before the $2,000 price
- Add urgency text: "Founder's Batch -- Limited Units" below the price line
- Make "Learn More" button more visually distinct (keep emerald fill) and "Book a Demo" as ghost/outline style (already is, but ensure contrast)

### 6. Services Section Polish
**File:** `src/components/Services.tsx`

- Increase icon size from `w-7 h-7` to `w-8 h-8` and container from `w-14 h-14` to `w-16 h-16`
- Make "Learn more" arrow links scroll to contact on click (add onClick to the card)
- Hover animation already exists (lift + shadow via `-translate-y-1` and `elevated-shadow`) -- keep

### 7. Contact Section -- Add Reassurance Line
**File:** `src/components/Contact.tsx`

- Add text below the tabs: "All calls are free. No sales pressure. We'll map out your opportunities together."
- Keep heading, tabs, and Cal.com embed as-is

### 8. Footer -- Remove Brownsville, TX
**File:** `src/components/Footer.tsx`

- Remove "Brownsville, TX, USA" from the bottom bar (lines 132-134)

### 9. Clean Up Legacy CSS
**File:** `src/index.css`

- Remove unused legacy animation keyframes: `filmGrain`, `projectorLight`, `filmScroll`, `perforationsScroll`, `photoSway1/2/3`, `ropeSlackSway`
- Remove their corresponding utility classes: `.photo-sway-1/2/3`, `.rope-sway`, `.film-scroll-animation`, `.perforations-scroll-animation`
- Remove legacy Team section CSS overrides (lines 537-562)

### 10. Enhance ElevenLabs Widget
**File:** `src/components/ElevenLabsWidget.tsx`

- Add a persistent subtle pulsing ring animation around the button when not connected (so visitors notice it)
- Change tooltip text from "Talk to our AI assistant" to "Talk to our AI"
- Keep tooltip auto-hide after 5 seconds behavior

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/Hero.tsx` | Major rewrite -- replace video with canvas particle animation |
| `src/components/Navigation.tsx` | Remove Admin link |
| `src/App.tsx` | Remove Testimonials import and component |
| `src/components/Results.tsx` | Remove image, single-column layout, bigger stat cards |
| `src/components/SynthiosProduct.tsx` | Bigger title, price anchoring, urgency text, glow effect |
| `src/components/Services.tsx` | Larger icons, clickable cards |
| `src/components/Contact.tsx` | Add reassurance line below tabs |
| `src/components/Footer.tsx` | Remove Brownsville, TX |
| `src/index.css` | Remove legacy animations and team CSS |
| `src/components/ElevenLabsWidget.tsx` | Add idle pulse animation |

---

## Technical Details

### Particle Network Animation (Hero)
A self-contained canvas component inside Hero.tsx:
- Canvas fills the full hero viewport (`absolute inset-0`)
- Background color: deep navy gradient (`#070b14` to `#0f172a`)
- ~80 particles with random positions, slow random velocity
- Particles rendered as small circles (radius 1.5-2px) with low opacity white/cyan
- Connection lines drawn between particles within 150px distance, opacity based on distance
- Uses `requestAnimationFrame` loop, cleaned up on unmount
- Responsive: resizes with window
- Overlay gradient kept for text readability

### Price Anchoring (SYNTHIOS)
```tsx
<div className="flex items-baseline gap-3">
  <span className="text-xl text-muted-foreground line-through">$5,000+</span>
  <span className="text-4xl font-black text-foreground">$2,000</span>
  <span className="text-muted-foreground">one-time</span>
</div>
<p className="text-sm text-accent-emerald font-semibold mt-2">
  Founder's Batch -- Limited Units
</p>
```

