

# Site Cleanup & Copy Modernization Plan

## Summary

This plan addresses two major issues:
1. **Remove outdated/misplaced sections** - The "film reel" style Portfolio display with random images doesn't fit the modern aesthetic
2. **Modernize all copy** - Shift language from "chatbots" to "AI systems, agents, workflows, and swarms" to reflect what MyHorizon actually builds

---

## What We're Fixing

### Problem 1: The Portfolio Section Display Issue
The screenshot shows a chaotic grid of forest/animal images that don't belong. Looking at the code, the Portfolio section has proper case study cards - but there may be rendering issues or the section itself is competing with the modern aesthetic.

**Decision:** Either completely redesign Portfolio or temporarily remove it since the case studies could be better showcased through a different approach (testimonials, logos, or results-focused design).

### Problem 2: Outdated Copy Throughout Site
Current language uses terms like "chatbots" which undersells what you actually build. You're working with:
- Full AI **systems**
- Autonomous **agents**
- Intelligent **workflows**
- Multi-agent **swarms**

---

## Changes to Make

### 1. Navigation Cleanup
**File:** `src/components/Navigation.tsx`

- Remove "Team" from nav links (section was already deleted)
- Update nav to reflect actual sections: Portfolio → "Case Studies" or remove

### 2. Hero Section Copy Update
**File:** `src/components/Hero.tsx`

**Current:**
> "Custom AI chatbots, workflow automation, and intelligent systems..."

**New:**
> "Complete AI systems, autonomous agents, and intelligent workflows that run your business 24/7."

### 3. Services Section Overhaul
**File:** `src/components/Services.tsx`

| Current Title | New Title | Why |
|--------------|-----------|-----|
| "AI Chatbots & Agents" | "AI Agents & Voice Systems" | You build full agents, not just chatbots |
| "Workflow Automation" | "Intelligent Workflows" | Emphasize AI-driven, not just Zapier |
| "CRM Integration" | "CRM & Pipeline Automation" | Same |
| "Content Generation" | "Content & Marketing AI" | Same |
| "Data & Insights" | "AI Analytics & Insights" | Same |
| "Custom Solutions" | "Custom AI Systems" | Emphasize systems thinking |

**Section header update:**
- Current: "What We Automate"
- New: "What We Build"
- Subtitle: From "Stop paying for tools you don't use..." to "Enterprise-grade AI infrastructure scaled for your business."

### 4. Portfolio Section Decision
**File:** `src/App.tsx` and `src/components/Portfolio.tsx`

**Option A (Recommended):** Simplify to a "Results" section
- Keep the 3 case studies but present as compact cards
- Remove the "View More Projects" button if there aren't more
- Focus on metrics and outcomes

**Option B:** Remove temporarily
- Delete Portfolio section entirely
- Add it back when you have proper video testimonials and client logos

### 5. About Section Copy Update
**File:** `src/components/About.tsx`

The storyboard image caption currently says:
> "Every automation journey is unique — tailored to your specific business needs"

**New:**
> "Every AI system is architected for your specific business requirements"

### 6. Contact Section Copy Update
**File:** `src/components/Contact.tsx`

**Current header:**
> "Ready to Automate Your Business?"

**New:**
> "Ready to Deploy AI Systems That Work?"

**Current subtitle:**
> "Choose the call type that fits your needs"

**New:**
> "Schedule a strategy session with our team"

---

## Updated Messaging Framework

### New Language to Use Throughout

| Old Term | New Term |
|----------|----------|
| Chatbot | AI Agent / Voice Agent / System |
| Automation | Intelligent Workflow / AI System |
| Tools | AI Infrastructure |
| Integrate | Architect / Deploy |
| Repetitive tasks | Manual operations |

### Tagline Options
- "AI Systems That Actually Work"
- "AI Infrastructure for Growing Businesses"
- "Deploy AI. Automate Everything."

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/Navigation.tsx` | Remove "Team" link from navLinks array |
| `src/components/Hero.tsx` | Update tagline copy |
| `src/components/Services.tsx` | Update service titles, descriptions, and section headers |
| `src/components/About.tsx` | Update caption text |
| `src/components/Contact.tsx` | Update section headers |
| `src/App.tsx` | Optionally remove Portfolio section or keep |

### Estimated Changes

Navigation cleanup:
```tsx
const navLinks = [
  { label: 'Results', id: 'portfolio' },  // or remove
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  // Team removed
  { label: 'Contact', id: 'contact' }
]
```

Services array update example:
```tsx
const services = [
  {
    id: 'agents',
    title: "AI Agents & Voice Systems",
    description: "Autonomous agents that handle customer conversations, qualify leads, and execute tasks without human intervention.",
    icon: Bot,
    accent: 'accent-blue',
    stats: "24/7 Operations"
  },
  // ...more updated services
]
```

---

## Summary of Changes

1. Remove "Team" from navigation (already deleted section)
2. Update Hero copy to emphasize "AI systems" over "chatbots"
3. Modernize all 6 Services titles and descriptions
4. Update section headers across About, Contact
5. Either simplify Portfolio or remove temporarily
6. Consistent language: agents, systems, workflows throughout

This positions MyHorizon as a serious AI infrastructure company, not just a "chatbot builder."

