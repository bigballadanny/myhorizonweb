

# MyHorizon Complete Transformation Plan

## Executive Summary

This plan transforms MyHorizon from a creative agency-styled website into a premium, modern AI automation platform inspired by pocketmarketer.ai's directness and simplicity. The goal is to create "the tool that builds the tool" - a sophisticated system that captures leads through an ElevenLabs AI voice agent, manages them through a professional back office, and converts them to customers via Google Calendar scheduling.

---

## Part 1: ElevenLabs Webhook Fix (Priority 1)

### Current Problem
The webhook is deployed and functional, but ElevenLabs is never calling it. No logs appear in the edge function, meaning the issue is on the ElevenLabs configuration side.

### Root Cause Analysis
Based on ElevenLabs documentation research:
1. **Signature format mismatch**: ElevenLabs uses header format `elevenlabs-signature: t=timestamp,v0=signature` (NOT `x-elevenlabs-signature`)
2. **Payload structure**: Webhook payload has a `data` wrapper with fields like `data.conversation_id`, `data.metadata`, etc.
3. **Webhook configuration**: Must be set up in agent's "Webhooks" section (not Tools)

### Technical Fix

**Update elevenlabs-webhook/index.ts:**
```typescript
// Fix signature header parsing
const signatureHeader = req.headers.get('elevenlabs-signature');
if (signatureHeader) {
  const [timestampPart, signaturePart] = signatureHeader.split(',');
  const timestamp = timestampPart.split('=')[1]; // Extract after "t="
  const signature = signaturePart; // "v0=hash"
  
  // Validate timestamp within 30 minutes
  const tolerance = Math.floor(Date.now() / 1000) - (30 * 60);
  if (parseInt(timestamp) < tolerance) {
    throw new Error('Webhook timestamp too old');
  }
  
  // Validate signature
  const payloadToSign = `${timestamp}.${rawBody}`;
  // HMAC-SHA256 with secret, compare to signature
}

// Access data correctly
const { data } = payload;
const conversationId = data.conversation_id;
const transcript = data.transcript;
const analysis = data.analysis;
```

**Create fallback manual sync:**
- Add "Sync Conversations" button in admin panel
- Edge function to poll ElevenLabs API for recent conversations
- Requires ELEVENLABS_API_KEY secret

### User Action Required
1. In ElevenLabs Dashboard > Agent > Webhooks section:
   - Add webhook URL: `https://ewlvyssrckqdyuxxwxiv.supabase.co/functions/v1/elevenlabs-webhook`
   - Event type: "Conversation Completed" or "Post-call"
   - Copy the webhook secret shown to you
2. Provide the webhook secret so I can update the ELEVENLABS_WEBHOOK_SECRET

---

## Part 2: Landing Page Simplification

### Design Philosophy (Inspired by pocketmarketer.ai)
- **Direct messaging**: Clear value proposition, no fluff
- **Clean hierarchy**: Hero > Problem > Solution > Proof > CTA
- **Minimal sections**: Remove anything that doesn't convert
- **Premium feel**: Lots of whitespace, refined typography

### Sections to KEEP (with refinements)
1. **Hero** - Keep video (as requested), refine overlay messaging
2. **Portfolio/Case Studies** - Anonymized real work
3. **Contact/Calendar** - Replace Cal.com with Google Calendar

### Sections to REMOVE/REPLACE
1. **Services (Clothesline)** - Complete rebuild
2. **Team (Wanted Posters)** - Remove entirely or replace with tool showcase
3. **About (Film Strip)** - Simplify to modern process section
4. **Awards** - Merge into a simpler trust/tools section

### New Page Structure
```
1. Hero (keep video)
   - Refined headline: "AI That Works While You Sleep"
   - Sub-headline: Direct value prop
   - Single CTA: "Book Your Strategy Call"

2. Problem Section (NEW - inspired by pocketmarketer.ai)
   - "Why You're Still Doing Everything Manually"
   - 3 pain points with solutions
   
3. What We Build (replaces Services)
   - Clean grid of automation types
   - No clotheslines, no vintage effects
   - Icon + Title + Brief description
   
4. Case Studies (refined Portfolio)
   - Anonymized but real
   - Clear metrics: "70% reduction in X"
   - Tool stack badges
   
5. Tools We Use (simplified Awards)
   - Logo grid: OpenAI, ElevenLabs, Zapier, etc.
   - Single line description each
   
6. How It Works (simplified About)
   - 3-4 step horizontal timeline
   - No film strip aesthetic
   
7. Book a Call (Contact)
   - Google Calendar integration
   - Clean, minimal interface
```

---

## Part 3: Google Calendar Integration

### Why Replace Cal.com
- Direct control over scheduling
- Integrated with your ecosystem
- More professional appearance
- Data stays in your system

### Implementation Approach

**Option A: Google Calendar API (Full Control)**
```
Requires:
- Google Cloud Console project
- OAuth 2.0 credentials
- Edge function for API calls
- Custom availability UI

Pros: Complete customization
Cons: 8-12 hours implementation
```

**Option B: Google Appointment Schedules (Quick)**
```
Requires:
- Google Workspace account
- Simple embed code

Pros: 30 min implementation
Cons: Less customization, requires Workspace
```

**Option C: Cal.com connected to Google (Hybrid)**
```
Keep Cal.com but ensure it syncs with Google Calendar
Already partially implemented

Pros: Already working
Cons: Third-party dependency
```

### Recommended: Option A (Google Calendar API)

**Implementation Steps:**
1. Create Supabase edge function `google-calendar`
2. OAuth 2.0 flow for admin authentication
3. Fetch available time slots
4. Create events when user books
5. Store credentials securely in secrets
6. Custom booking UI in React

**New secrets needed:**
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_REFRESH_TOKEN

---

## Part 4: Back Office Enhancement

### Current State
The admin panel already has:
- Dashboard with stats
- Lead pipeline board
- Appointments calendar
- Conversation insights
- User management

### Enhancements Needed

**4.1 Lead Management Improvements**
- Quick actions: Email, Call, Schedule from lead card
- Lead notes/activity timeline
- AI-generated summary of conversations
- Automated follow-up reminders

**4.2 Email Integration**
- Connect to email provider (SendGrid/Postmark)
- Send follow-up emails from admin panel
- Email templates for different stages
- Track email opens/clicks

**4.3 CRM Features**
- Custom fields for leads
- Tags and filtering
- Deal value tracking
- Revenue attribution

**4.4 Conversation Analysis**
- Sentiment analysis visualization
- Key topics extracted
- Action items from calls
- Lead scoring improvements

**4.5 Business Metrics**
- Sign-ups tracking
- Conversion funnel visualization
- Revenue forecasting
- ROI calculator

### Database Additions Needed
```sql
-- Email tracking
CREATE TABLE email_sends (
  id uuid PRIMARY KEY,
  lead_id uuid REFERENCES leads(id),
  template_name text,
  sent_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz
);

-- Custom fields
CREATE TABLE lead_custom_fields (
  id uuid PRIMARY KEY,
  lead_id uuid REFERENCES leads(id),
  field_name text,
  field_value text
);

-- Deal tracking
ALTER TABLE leads ADD COLUMN deal_value numeric;
ALTER TABLE leads ADD COLUMN expected_close_date date;
```

---

## Part 5: ElevenLabs Widget Refinement

### Current State
Widget is embedded and functional, but conversations aren't being captured.

### Improvements
1. **Fix webhook** (Part 1) - Critical
2. **Custom styling** - Match new site aesthetic
3. **Positioning** - Strategic placement for conversions
4. **Context passing** - Send page context to agent
5. **Conversation handoff** - Smooth transition to calendar booking

### Widget Enhancement Code
```typescript
// Enhanced widget with page context
const widget = document.createElement('elevenlabs-convai');
widget.setAttribute('agent-id', 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g');
widget.setAttribute('context', JSON.stringify({
  page: window.location.pathname,
  referrer: document.referrer,
  // Pass any lead info if available
}));
```

---

## Implementation Sprints

### Sprint 1: Webhook Fix + Diagnostic (2-3 days)
- Fix signature parsing in webhook
- Add `elevenlabs-signature` header support
- Create diagnostic logging
- Test with real conversation
- Add manual sync fallback

### Sprint 2: Landing Page Simplification (3-4 days)
- Remove clothesline Services section
- Remove wanted poster Team section
- Simplify About to clean process steps
- Consolidate Awards to tool logos
- Keep Hero video intact
- Implement new Problem section

### Sprint 3: Google Calendar Integration (4-5 days)
- Set up Google Cloud project
- Create OAuth flow
- Build edge function for calendar API
- Create booking UI component
- Replace Cal.com embed

### Sprint 4: Back Office Enhancements (5-7 days)
- Email send functionality
- Enhanced lead management
- Conversation analysis display
- Business metrics dashboard
- Custom fields and tags

### Sprint 5: Polish + Testing (2-3 days)
- End-to-end testing
- Mobile responsiveness
- Performance optimization
- Documentation

---

## Files to Modify

### Frontend Components
| File | Action | Description |
|------|--------|-------------|
| `src/components/Services.tsx` | Rewrite | Remove clothesline, modern grid |
| `src/components/Team.tsx` | Remove/Rewrite | Replace with tools or remove |
| `src/components/About.tsx` | Simplify | Remove film strip, clean timeline |
| `src/components/Awards.tsx` | Simplify | Logo grid with descriptions |
| `src/components/Contact.tsx` | Rewrite | Google Calendar instead of Cal.com |
| `src/components/Hero.tsx` | Minor edits | Refine overlay messaging |
| `src/components/Portfolio.tsx` | Minor edits | Ensure anonymized properly |

### Edge Functions
| File | Action | Description |
|------|--------|-------------|
| `elevenlabs-webhook/index.ts` | Fix | Correct signature parsing |
| `google-calendar/index.ts` | Create | New calendar integration |
| `send-email/index.ts` | Create | Email sending capability |
| `sync-elevenlabs/index.ts` | Create | Manual conversation sync |

### Admin Components
| File | Action | Description |
|------|--------|-------------|
| `LeadDetailDialog.tsx` | Enhance | Add email, notes, timeline |
| `ConversationInsights.tsx` | Enhance | Better analysis display |
| `DashboardOverview.tsx` | Enhance | More business metrics |
| `IntegrationsSettings.tsx` | Enhance | Google Calendar OAuth setup |

### Database Migrations
- Add email tracking table
- Add custom fields table
- Add deal value to leads
- Add lead tags

---

## Design Direction

### Color Palette (Modern, Clean)
```
Primary: #0066FF (Trust Blue)
Accent: #10B981 (Success Green)
Background: #FAFAFA (Light) / #0F172A (Dark)
Text: #1F2937 (Primary) / #6B7280 (Secondary)
```

### Typography
```
Headlines: Inter, 600-700 weight
Body: Inter, 400 weight
Code/Technical: JetBrains Mono
```

### Spacing
- More whitespace between sections
- Consistent padding (24px, 48px, 96px)
- Clean card designs with subtle shadows

---

## Success Metrics

After implementation, track:
1. **Webhook success rate**: 100% of conversations captured
2. **Lead capture rate**: Conversations -> Leads conversion
3. **Booking rate**: Leads -> Appointments conversion
4. **Page performance**: Lighthouse score > 90
5. **User engagement**: Time on page, scroll depth

---

## Technical Notes

### Required Secrets
| Secret | Purpose | Status |
|--------|---------|--------|
| ELEVENLABS_WEBHOOK_SECRET | Webhook verification | Exists (may need update) |
| ELEVENLABS_API_KEY | API calls for sync | May exist as "Eleven_Labs" |
| GOOGLE_CLIENT_ID | Calendar OAuth | Need to add |
| GOOGLE_CLIENT_SECRET | Calendar OAuth | Need to add |
| SENDGRID_API_KEY | Email sending | Need to add |

### Dependencies to Add
- None for frontend (using existing stack)
- Google APIs via fetch in edge functions

