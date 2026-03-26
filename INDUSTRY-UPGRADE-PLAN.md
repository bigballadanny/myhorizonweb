# Industry Pages Premium Upgrade — Execution Plan

## Goal
Make each industry page feel niche-specific and premium — not generic.

## What Exists
- 9 industries: med-spas, trades, construction, professional-services, real-estate, small-business, underwriters, ma-due-diligence, financial-services
- Industry data in src/data/industryData.ts (739 lines) — has pain points, solutions, use cases, metrics per industry
- Industry landing page in src/pages/IndustryPage.tsx (783 lines) — shared template
- Industry grid on homepage in src/components/Industries.tsx
- Premium images just generated and saved to src/assets/industry-*.jpg

## Changes Required

### 1. Add heroImage field to industryData.ts
Add `heroImage?: string` to IndustryData interface.
Add import for each industry image and assign to heroImage field:

```typescript
import industryMedSpa from '@/assets/industry-med-spa.jpg'
import industryTrades from '@/assets/industry-trades.jpg'
import industryConstruction from '@/assets/industry-construction.jpg'
import industryProfessionalServices from '@/assets/industry-professional-services.jpg'
import industryRealEstate from '@/assets/industry-real-estate.jpg'
import industrySmallBusiness from '@/assets/industry-small-business.jpg'
import industryUnderwriters from '@/assets/industry-underwriters.jpg'
import industryMADueDiligence from '@/assets/industry-ma-due-diligence.jpg'
import industryFinancialServices from '@/assets/industry-financial-services.jpg'
```

### 2. IndustryPage.tsx Hero Section Upgrade
- Replace the plain colored hero with a full-width image hero
- Image as background with dark overlay gradient
- Industry icon + name + tagline overlaid
- Accent color as subtle gradient overlay
- Metrics displayed as glass cards over the hero image
- GSAP scroll-triggered entrance animations

### 3. IndustryPage.tsx Section Upgrades
- Solutions section: glass cards with accent-colored left border
- Pain Points: numbered list with accent color, staggered entrance
- Use Cases tabs: keep existing but add the industry image as tab content background
- FAQ: keep existing accordion
- CTA: use heroImage as background with overlay

### 4. Homepage Industry Grid (Industries.tsx)
- On hover, show a subtle preview of the industry hero image as card background
- Keep existing glassmorphism hover effect
- Add the industry image as a very faint bg on hover

## Files Modified
- src/data/industryData.ts — add heroImage imports + field
- src/pages/IndustryPage.tsx — hero rewrite, section polish
- src/components/Industries.tsx — hover image preview (optional, lower priority)

## DO NOT MODIFY
- industryData content (pain points, solutions, use cases, metrics text)
- Routing structure
- Lead capture forms
- ElevenLabs widget
