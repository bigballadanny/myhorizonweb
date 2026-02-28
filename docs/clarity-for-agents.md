# Microsoft Clarity — Agent Access Guide

> For AI coding agents (Antigravity, Claude Code, etc.) working on myhorizon.ai

---

## Project ID
`vf1hpu63ir`

## Dashboard
https://clarity.microsoft.com/projects/view/vf1hpu63ir/

---

## What Clarity Tells You (Before Touching Any Code)

Always check Clarity before making UI/UX changes. It shows:

| Signal | Where to Find It | What to Do With It |
|--------|-----------------|-------------------|
| **Dead clicks** | Heatmaps → Click | Elements users click that aren't clickable → make them clickable or remove confusion |
| **Rage clicks** | Heatmaps → Click → Rage | Broken UX — highest priority fix |
| **Scroll depth** | Heatmaps → Scroll | If <30% reach the CTA, move CTA up |
| **Session recordings** | Recordings → filter by "Rage click" or "Quick back" | Watch 5–10 sessions before any redesign |
| **Conversion funnel** | Recordings → filter by goal event | Which pages/sections precede bookings |

---

## Custom Events Already Tracked

These fire automatically via `src/lib/lead-capture.ts` and `src/components/Contact.tsx`:

```js
clarity('set', 'lead_captured', source)    // when form submits
clarity('set', 'lead_email', email)        // user email on capture
clarity('set', 'booking_completed', 'true') // after Cal.com booking
```

**Use these to filter recordings** — e.g., "show me sessions where lead_captured fired" to see what converted users did differently.

---

## Clarity REST API (for programmatic access)

```bash
# Get project summary
curl -s "https://www.clarity.ms/api/v1/projects/vf1hpu63ir" \
  -H "Authorization: Bearer YOUR_CLARITY_TOKEN"

# Get top pages by engagement
curl -s "https://www.clarity.ms/api/v1/projects/vf1hpu63ir/metrics?metric=pageviews&period=7d" \
  -H "Authorization: Bearer YOUR_CLARITY_TOKEN"
```

**Note:** Clarity API token is separate from the project ID. Daniel can generate one at:
https://clarity.microsoft.com/projects/view/vf1hpu63ir/settings/api

---

## Agent Workflow: Before Any UI Change

1. Open Clarity dashboard → Heatmaps → check the page you're modifying
2. Filter Recordings by "Rage click" — fix those first
3. Check scroll depth — if CTA is below the fold for most users, raise it
4. After shipping: check Clarity again in 24–48h to validate the fix worked

---

## Key Pages to Monitor

| Page / Section | What to Watch |
|---------------|---------------|
| Hero / Landing | Scroll past fold? Click on CTA? |
| Services section | Which services get most attention |
| Contact / Booking | Form completion rate, rage clicks on Cal embed |
| ElevenLabs voice widget | Interaction rate (fires `lead_captured`) |

---

## Reading Heatmaps as Code Decisions

- **Cold zone on CTA button** → button text or placement is wrong
- **Hot zone on non-clickable text** → wrap it in a link or make it a button
- **Users scroll past a section fast** → that section isn't earning attention, simplify or cut it
- **High scroll + low click** → content is readable but CTA isn't compelling enough

---

*Last updated: 2026-02-27 by SYNTHIOS*
