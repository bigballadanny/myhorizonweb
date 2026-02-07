

# AI-Native Back Office & Smart Visitor Intelligence

## Vision

Transform the admin dashboard from a traditional click-through CRM into an AI-first command center where you interact conversationally, and upgrade the public site's voice agent to automatically detect, create, and enrich leads from every conversation.

---

## Part 1: Smart Lead Creation from Voice Conversations

### 1.1 Enhance the Client-Side Conversation Capture
**File:** `src/components/ElevenLabsWidget.tsx`

The current widget saves conversations to the database on disconnect, but does NOT trigger lead extraction or scoring. After saving the conversation, it will:
- Call a new edge function `process-conversation` that uses AI to extract contact details (name, email, phone, company, project needs) from the transcript
- Automatically create or match a lead in the database
- Run AI scoring on the new lead
- Store a visitor fingerprint (browser fingerprint hash using screen resolution, timezone, language, user agent) alongside the conversation for returning visitor detection

### 1.2 New Edge Function: `process-conversation`
**File:** `supabase/functions/process-conversation/index.ts`

This function:
1. Takes a conversation_id
2. Fetches the transcript
3. Calls Lovable AI (Gemini Flash) with a structured extraction prompt to pull out: name, email, phone, company, project type, budget range, timeline, pain points
4. Creates or matches a lead (dedup by email/phone)
5. Triggers `score-lead` on the result
6. Triggers `analyze-conversation` for sentiment/intent
7. Returns the lead data

This replaces the current pattern where lead creation only happens via the ElevenLabs webhook (which may not always fire). Now every conversation captured client-side also gets processed.

### 1.3 Visitor Fingerprinting & Returning Visitor Detection
**Database:** New `visitor_sessions` table

```text
visitor_sessions:
  - id (uuid, PK)
  - fingerprint_hash (text) -- SHA-256 of browser characteristics
  - lead_id (uuid, nullable, FK to leads)
  - conversation_id (uuid, nullable, FK to conversations)
  - page_url (text)
  - referrer (text, nullable)
  - user_agent (text)
  - screen_resolution (text)
  - timezone (text)
  - language (text)
  - is_returning (boolean, default false)
  - visit_count (integer, default 1)
  - first_seen_at (timestamptz)
  - last_seen_at (timestamptz)
  - session_duration_seconds (integer, nullable)
  - pages_viewed (jsonb) -- array of {url, time_spent_seconds}
  - created_at (timestamptz)
```

**File:** `src/hooks/useVisitorTracking.ts` (NEW)

A hook that runs on every page load:
- Generates a browser fingerprint from: screen resolution, timezone, language, platform, color depth, available fonts sampling
- Stores/updates a `visitor_sessions` record
- Tracks which sections the user scrolls to and how long they spend (using Intersection Observer)
- On conversation start, links the session to the conversation
- Detects returning visitors by matching fingerprint_hash

### 1.4 Section Engagement Tracking
**File:** `src/hooks/useVisitorTracking.ts`

Uses Intersection Observer API to track time spent viewing each section (hero, services, results, synthios, contact). Data stored in the `pages_viewed` JSONB field as:
```text
[
  { "section": "hero", "seconds": 12 },
  { "section": "services", "seconds": 45 },
  { "section": "contact", "seconds": 8 }
]
```

This data shows up in the admin dashboard so you can see which parts of your site hold attention.

---

## Part 2: AI Command Center (Back Office Chat Interface)

### 2.1 The AI Admin Assistant
**File:** `src/components/admin/AICommandCenter.tsx` (NEW)

A persistent chat panel on the right side of the admin dashboard (collapsible). This is a conversational AI assistant powered by Lovable AI (Gemini Flash) that can:

- **Query your data naturally**: "How many new leads came in this week?" / "Show me leads with score above 70" / "What's our pipeline value?"
- **Take actions via conversation**: "Create a new lead named John Smith from Acme Corp" / "Move lead Sarah to qualified" / "Draft a follow-up campaign for all nurturing leads"
- **Analyze and recommend**: "Which leads should I follow up with today?" / "What's our best performing lead source?" / "Summarize the last 5 conversations"
- **Campaign management**: "Create a campaign targeting qualified leads about our AI agents service" / "How did our last campaign perform?"

The assistant has access to your database context via an edge function that fetches relevant data based on the query.

### 2.2 New Edge Function: `admin-ai-assistant`
**File:** `supabase/functions/admin-ai-assistant/index.ts`

This is the brain. It:
1. Receives the user's message + conversation history
2. Uses Lovable AI with tool calling to determine what data to fetch or actions to take
3. Tools available to the AI:
   - `query_leads` -- search/filter leads
   - `query_conversations` -- search conversations
   - `query_campaigns` -- get campaign data
   - `query_appointments` -- get appointment data
   - `create_lead` -- create a new lead
   - `update_lead_status` -- move a lead
   - `create_campaign_draft` -- draft a campaign
   - `get_dashboard_stats` -- fetch summary stats
   - `get_visitor_analytics` -- visitor engagement data
4. Returns the AI response with any data/actions taken

The system prompt tells the AI it's "Horizon AI" -- the admin assistant for MyHorizon, with full context about the business (AI automation agency).

### 2.3 Admin Chat Tab
**File:** `src/pages/Admin.tsx`

Add a new "AI Assistant" tab (with a sparkle/brain icon) that renders the AICommandCenter as a full-width chat interface within the tab content area. The chat:
- Shows a welcome message with suggested actions
- Has a text input with send button
- Supports streaming responses (token-by-token)
- Displays data tables/cards inline when the AI returns structured data
- Has quick-action suggestion chips below messages

### 2.4 Visitor Analytics in Dashboard
**File:** `src/components/admin/DashboardOverview.tsx`

Add a new "Visitor Insights" card showing:
- Total unique visitors (by fingerprint)
- Returning vs new visitors ratio
- Most engaged sections (ranked by avg time spent)
- Active sessions (last 30 min)

---

## Part 3: UI Polish & Visual Improvements

### 3.1 Admin Layout Refinement
**File:** `src/pages/Admin.tsx`

- Add subtle gradient backgrounds to tab content areas
- Improve card spacing and shadows for depth
- Add micro-animations on stat card hover (scale + shadow)
- Better mobile responsiveness for the tabs (horizontal scroll on mobile)

### 3.2 Dashboard Visual Enhancement
**File:** `src/components/admin/DashboardOverview.tsx`

- Add gradient fills to stat cards (subtle colored gradients matching each metric's theme color)
- Animate numbers counting up on load using a simple counter animation
- Add sparkline mini-charts inside stat cards showing 7-day trend

---

## Database Changes Summary

### New table: `visitor_sessions`
```text
visitor_sessions:
  - id (uuid, PK, default gen_random_uuid())
  - fingerprint_hash (text, not null)
  - lead_id (uuid, nullable, FK leads)
  - conversation_id (uuid, nullable, FK conversations)
  - page_url (text)
  - referrer (text, nullable)
  - user_agent (text)
  - screen_resolution (text)
  - timezone (text)
  - language (text)
  - is_returning (boolean, default false)
  - visit_count (integer, default 1)
  - first_seen_at (timestamptz, default now())
  - last_seen_at (timestamptz, default now())
  - session_duration_seconds (integer, nullable)
  - pages_viewed (jsonb, default '[]')
  - created_at (timestamptz, default now())

RLS: INSERT allowed for anon (visitors), SELECT restricted to authenticated admins.
Index on fingerprint_hash for fast returning-visitor lookups.
```

### New table: `admin_chat_messages`
```text
admin_chat_messages:
  - id (uuid, PK)
  - admin_user_id (text, not null) -- auth user id
  - role (text) -- 'user' or 'assistant'
  - content (text)
  - metadata (jsonb, nullable) -- tool calls, data returned, etc.
  - created_at (timestamptz, default now())

RLS: Users can only see their own messages.
```

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/ElevenLabsWidget.tsx` | Add post-conversation processing + fingerprint linking |
| `src/hooks/useVisitorTracking.ts` | NEW -- fingerprinting, section engagement, returning visitor detection |
| `src/components/admin/AICommandCenter.tsx` | NEW -- conversational AI admin assistant with streaming |
| `src/pages/Admin.tsx` | Add AI Assistant tab, UI polish |
| `src/components/admin/DashboardOverview.tsx` | Add visitor insights card, visual polish |
| `src/App.tsx` | Wire up visitor tracking hook |
| `supabase/functions/process-conversation/index.ts` | NEW -- AI-powered lead extraction from transcripts |
| `supabase/functions/admin-ai-assistant/index.ts` | NEW -- AI assistant backend with tool calling |
| `supabase/config.toml` | Add new function configs |
| Database migration | visitor_sessions + admin_chat_messages tables |

---

## Implementation Order

1. Database migration (visitor_sessions + admin_chat_messages)
2. Visitor tracking hook + wire into App.tsx
3. process-conversation edge function
4. Update ElevenLabsWidget to call process-conversation
5. admin-ai-assistant edge function (with tool calling)
6. AICommandCenter chat component
7. Add AI Assistant tab to Admin.tsx
8. Visitor analytics in dashboard
9. UI polish pass on admin

---

## Technical Details

### Browser Fingerprinting (No External Library)
```text
Combines:
- screen.width + screen.height + screen.colorDepth
- Intl.DateTimeFormat().resolvedOptions().timeZone
- navigator.language
- navigator.platform
- navigator.hardwareConcurrency
- canvas fingerprint (draw text, hash the pixel data)

Hash via SubtleCrypto SHA-256 -> hex string
Not personally identifiable, just a consistency marker.
```

### AI Assistant Tool Calling Schema
```text
Tools defined for Lovable AI:
- query_leads: { filters: { status?, source?, min_score?, search? }, limit? }
- query_conversations: { lead_id?, date_range?, limit? }
- create_lead: { name, email?, phone?, company?, source? }
- update_lead_status: { lead_id, new_status }
- create_campaign_draft: { subject, body, recipient_filter }
- get_dashboard_stats: {} (no params)
- get_visitor_analytics: { days?: number }

The AI decides which tools to call based on natural language input.
Results are formatted into readable responses.
```

### Streaming Chat Pattern
```text
Frontend calls edge function with messages array.
Edge function streams SSE from Lovable AI.
Frontend parses SSE line-by-line, updating assistant message token-by-token.
Tool call results are appended as structured data blocks in the chat.
```

### Section Engagement Tracking
```text
IntersectionObserver watches each section element.
When section is >50% visible, start a timer.
When it exits viewport, record elapsed time.
On page unload (or conversation start), batch-update the visitor_session record.
Uses navigator.sendBeacon for reliable unload reporting.
```

