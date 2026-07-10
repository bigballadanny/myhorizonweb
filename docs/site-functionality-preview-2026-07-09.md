# MyHorizon functionality preview — 2026-07-09

## Intent

Keep the production homepage's existing voice and visual direction. Repair the interaction layer so navigation, CTAs, lead intake, scheduling, mobile chat, admin entry, and recovery routes behave honestly.

## Proof boundary

- Work branch: `codex/site-functionality-20260709`
- Production domain changed: **no**
- Local production build: passed
- Browser verification: passed at 320 px, 390 px, and desktop widths
- Live lead insertion: **not exercised** because it would create a real lead
- Live voice/microphone session: **not exercised** because it would request device permission and start an external session

## Important runtime decisions

- `VITE_LEAD_CAPTURE_MODE` defaults to `direct`. This uses the repository's existing anonymous `leads` INSERT policy and reports success only after Supabase confirms the write. It does not store lead PII in local storage.
- The repository contains `capture-lead`, but the configured Supabase project currently returns `404 NOT_FOUND` for that function and is not accessible from the connected Supabase account. Switch `VITE_LEAD_CAPTURE_MODE=edge` only after the function is deployed, rate-limited, and verified.
- `VITE_GOOGLE_APPOINTMENT_SCHEDULE_URL` is optional. When it contains a valid Google appointment-schedule URL, Contact uses it; otherwise the current Cal.com consultation remains the fallback.
- Secondary routes and the ElevenLabs implementation are split from the initial homepage bundle. The visitor still sees a lightweight chat launcher; the 500 KB chat implementation loads only after one tap.

## Verification performed

- `git diff --check`
- `tsc --noEmit`
- production `vite build`
- ESLint on every touched TypeScript/TSX file
- built-site route checks for `/`, `/welcome`, `/industry/legal`, and unknown routes
- unique section IDs and fixed-header alignment
- mobile menu focus loop and Escape close
- chat one-tap lazy load, 320/390 px bounds, dialog labels, Escape close, and focus return
- mobile Contact choice and real Cal.com iframe rendering
- reduced-motion state: Lenis disabled and kinetic headline immediately visible
- fresh browser console pass with no application warnings or errors

## Before production promotion

1. Submit one authorized test lead and confirm it appears in the admin pipeline.
2. Gain access to Supabase project `ewlvyssrckqdyuxxwxiv`, deploy the hardened `capture-lead` function, and add rate limiting or bot protection.
3. Set and verify the preferred Google Appointment Schedule URL if Google is replacing Cal.com.
4. Exercise one real text chat and one explicit voice session, then confirm conversation persistence in the back office.
5. Promote the preview only after Daniel approves the mobile and desktop review.
