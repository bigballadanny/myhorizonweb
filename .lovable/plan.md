

# MyHorizon Site Upgrade Plan

## What I Discovered

### Your Product Ecosystem (This is exciting!)

**1. SYNTHIOS Box** (synthios.myhorizon.ai) - Your flagship hardware product
- Mac Mini M4 with pre-installed AI assistant
- $2,000 one-time purchase
- Handles email, calendar, tasks
- Text via Telegram/WhatsApp
- "5 Hours Or Free" guarantee
- Clean, dark theme with cyan/teal accents

**2. Pocket Marketer** (pocketmarketer.ai) - Your SaaS product
- AI marketing strategy + execution platform
- "The Software That Replaces $100K Worth of Marketers"
- Strong social proof (testimonials, video testimonials, case studies)
- Clean, light theme with blue accents
- Great design patterns: problem/solution framing, comparison tables, persona targeting

### Design Patterns to Adopt from Pocket Marketer

| Pattern | What They Do | How to Apply |
|---------|--------------|--------------|
| Problem Framing | "3 Invisible Traps" section | Reframe services as solutions to pain points |
| Social Proof Bar | Avatar stack + "Join Hundreds of business owners" | Add trust indicators near CTAs |
| Comparison Table | Shows agency vs freelancer vs tools costs | Show ROI of AI automation |
| Persona Cards | "A Small Business Owner wants X, We give Y" | Target different customer types |
| Video Testimonials | Embedded testimonial.to videos | Add video proof section |
| Clean Hero | Split layout with illustration + clear value prop | Modernize hero (keep video but simplify overlay) |

### Current Issues with myhorizon.ai

1. **Outdated Aesthetic**: Clotheslines, wooden clothespins, vintage photo effects don't match the modern SYNTHIOS and Pocket Marketer brands
2. **No Product Integration**: SYNTHIOS Box is a real product but isn't featured
3. **Cal.com Setup**: Only using 1 of 3 booking links

---

## Cal.com Booking Strategy

### Recommended Configuration

| Booking Type | Link | Where to Use | Best For |
|--------------|------|--------------|----------|
| **SYNTHIOS Box** | `myhorizon/synthios-box` (15 min) | SYNTHIOS product cards, navigation "Buy SYNTHIOS" CTA | Prospects who want to buy the hardware product |
| **Business Integration** | `myhorizon/business-integration` (30 min) | Services section, "Get a Custom Quote" buttons | Companies needing custom automation work |
| **General Consultation** | `myhorizon/consultation` (30 min) | Main Contact section (keep as-is), Hero "Get Started" | General inquiries, first-time visitors |

### Implementation Approach

**Option A: Tabbed Calendar Interface (Recommended)**
Create a booking section with 3 tabs so visitors can self-select:

```
[ SYNTHIOS Box Questions ] [ Custom Automation ] [ General Consultation ]
         15 min                  30 min                30 min
```

Each tab loads the appropriate Cal.com embed.

**Option B: Smart CTA Routing**
Keep one calendar in Contact section (general), but add contextual booking buttons throughout:
- SYNTHIOS product cards link to `synthios-box`
- Services section links to `business-integration`
- Navigation/Hero links to `consultation`

---

## Site Redesign Plan

### Phase 1: Immediate Fixes (Clean Up)

1. **Remove vintage aesthetic from Services section**
   - Replace clotheslines with clean grid cards
   - Use icon + title + description format (like Pocket Marketer)
   - Keep the dark theme but modernize

2. **Add SYNTHIOS Box feature section**
   - Create a dedicated "Our Product" or "SYNTHIOS" section
   - Link to synthios.myhorizon.ai for full details
   - Add the $2,000 pricing and key features

3. **Implement all 3 Cal.com booking links**
   - Either tabbed interface or contextual buttons

### Phase 2: Adopt Pocket Marketer Patterns

1. **Add social proof bar** under hero headline
   - Avatar stack + "Trusted by X businesses"
   - Scrolling logo bar of client companies

2. **Create problem/solution framing**
   - "Why Your Current Approach Isn't Working" section
   - Mirror the "3 Invisible Traps" structure

3. **Add persona targeting section**
   - "Who We Help" with cards for different business types
   - Each persona links to appropriate booking type

4. **Video testimonials section**
   - Integrate testimonial.to or similar
   - Add 2-3 video testimonials

### Phase 3: Polish

1. **Modernize Team section** (remove "WANTED poster" aesthetic)
2. **Clean up About section** (remove film strip elements)
3. **Add Pocket Marketer cross-promotion** (as a featured product)
4. **Performance optimization** (compress hero video)

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/Services.tsx` | Complete redesign - remove clotheslines, use modern card grid |
| `src/components/Contact.tsx` | Add tabbed Cal.com interface with all 3 booking types |
| `src/components/Navigation.tsx` | Add direct booking link or dropdown for booking options |
| `src/components/Hero.tsx` | Add social proof bar, direct booking button |
| `src/App.tsx` | Add SYNTHIOS product section |
| New: `src/components/SynthiosProduct.tsx` | SYNTHIOS Box feature section |
| New: `src/components/WhoWeHelp.tsx` | Persona targeting section |

### Cal.com Tab Implementation

```tsx
const bookingOptions = [
  {
    id: 'synthios-box',
    title: 'SYNTHIOS Box Questions',
    duration: '15 min',
    calLink: 'myhorizon/synthios-box',
    description: 'Quick call about our AI hardware product'
  },
  {
    id: 'business-integration',
    title: 'Custom Automation',
    duration: '30 min',
    calLink: 'myhorizon/business-integration',
    description: 'Discuss custom AI solutions for your business'
  },
  {
    id: 'consultation',
    title: 'General Consultation',
    duration: '30 min',
    calLink: 'myhorizon/consultation',
    description: 'Explore how AI can help your business'
  }
]
```

### Cross-Site Brand Consistency

All three sites should share:
- Dark themes with cyan/teal accent colors
- Clean, modern typography (no vintage effects)
- Similar button styles and CTAs
- Consistent pricing presentation

---

## Summary

This plan unifies your three properties (myhorizon.ai, synthios.myhorizon.ai, pocketmarketer.ai) into a cohesive brand experience while implementing all three Cal.com booking options in a user-friendly way.

The key insight: **myhorizon.ai should be the "agency" hub that showcases SYNTHIOS Box as your product and Pocket Marketer as a partner tool, while offering custom automation services.**

Ready to implement when you approve.

