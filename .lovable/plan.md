
# MyHorizon Complete Transformation Plan

## Executive Summary

This plan transforms MyHorizon from a creative agency-styled website into a premium, minimalist AI automation platform inspired by pocketmarketer.ai's directness and simplicity. The goal is to create "the tool that builds the tool" - a sophisticated CRM platform that captures leads via an ElevenLabs voice agent, manages them through a professional back office, and converts them to customers seamlessly.

---

## Part 1: ElevenLabs Integration Rebuild

### Current State Analysis
- **Widget**: Uses `elevenlabs-convai` embed with hardcoded agent ID `agent_3701k6bjf9q2e5wsc1y94xbg2r3g`
- **Webhook**: Comprehensive implementation exists but logs show no webhooks are being received
- **Root Cause**: Configuration mismatch between ElevenLabs dashboard and our endpoint

### New Connector Available
A new **"MyHorizon Asst"** ElevenLabs connector is available in the workspace but NOT currently linked to this project. Linking it will provide:
- `ELEVENLABS_API_KEY` - For API calls and manual sync
- Proper credentials management

### Implementation Strategy

**1.1 Link the MyHorizon Asst Connector**
- Connect the "MyHorizon Asst" ElevenLabs connector to get proper API credentials
- This provides ELEVENLABS_API_KEY for programmatic access

**1.2 Upgrade to React SDK (@elevenlabs/react)**
Replace the basic embed widget with the proper React SDK for:
- Better control over the conversation lifecycle
- Access to callbacks for conversation events
- Ability to pass page context to the agent
- Custom styling that matches the new design

**1.3 Implement Robust Data Capture**
- Use the SDK's `onMessage` callbacks to capture conversation events locally
- Store conversations client-side and sync to database
- Webhook as secondary backup (not primary)
- Manual sync endpoint using ElevenLabs API

**1.4 Create Conversation Token Endpoint**
- Edge function to generate secure conversation tokens
- Keeps API key server-side
- Enables authenticated conversations

### Files to Create/Modify
| File | Action | Description |
|------|--------|-------------|
| `src/components/ElevenLabsWidget.tsx` | Rewrite | Use React SDK with full callbacks |
| `supabase/functions/elevenlabs-conversation-token/index.ts` | Create | Token generation for secure conversations |
| `supabase/functions/elevenlabs-sync/index.ts` | Update | Enhanced sync with API polling |

---

## Part 2: Landing Page Transformation (pocketmarketer.ai Inspired)

### Design Philosophy (Learned from pocketmarketer.ai)

**What Makes pocketmarketer.ai Effective:**
1. **Direct, confrontational headlines** - "You're not bad at marketing - you've just never had control"
2. **Problem-first structure** - Names the pain before offering solutions
3. **Clean visual hierarchy** - Lots of whitespace, clear sections
4. **Social proof integrated naturally** - Testimonials with video and context
5. **Character/mascot element** - Creates personality and trust
6. **Comparison tables** - Shows value vs alternatives clearly
7. **No gimmicks** - No clotheslines, vintage effects, or film strips

### Current Sections to REMOVE
| Section | Issue | Action |
|---------|-------|--------|
| Services (Clothesline) | Hemp ropes, clothespins, darkroom effects - completely incongruent with AI automation | Complete rebuild |
| About (Film Strip) | Film perforations, projector effects - vintage aesthetic doesn't fit | Complete rebuild |
| Team (Wanted Posters) | "AUTOMATED" stamps, mugshot cards - gimmicky and confusing | Remove or rebuild as tool showcase |
| Awards | Text-only, no actual logos | Simplify to clean tool grid |

### New Page Structure

```text
1. HERO (Keep Video)
   └── Refined overlay with direct messaging
   └── "You don't need more tools. You need automation that works."
   └── Single clear CTA: "Book Strategy Call"

2. PROBLEM SECTION (NEW - pocketmarketer.ai inspired)
   └── "The 3 Traps Keeping Your Business Manual"
   └── Clean cards with specific pain points
   └── Each pain point → Our solution

3. WHAT WE BUILD (Replace Services)
   └── Clean grid of automation capabilities
   └── Icon + Title + Outcome metric
   └── No images, no vintage effects
   └── Modern workflow-style cards

4. CASE STUDIES (Refined Portfolio)
   └── Keep current structure (it's clean)
   └── Ensure truly anonymized
   └── Add more specific metrics

5. TOOLS WE USE (Simplified Awards)
   └── Logo grid with actual brand logos
   └── OpenAI, ElevenLabs, Zapier, Supabase, Stripe, Google Cloud
   └── Single line: "Built on battle-tested infrastructure"

6. HOW IT WORKS (Simplified About)
   └── 3-4 step horizontal timeline
   └── Clean numbered steps
   └── No film strip, no animations

7. BOOK A CALL (Contact)
   └── Keep Cal.com for now (Google Calendar is Phase 2)
   └── Cleaner wrapper styling
```

### Design System Updates

**Color Palette (Modern, Trust-Building):**
```
Primary: #0066FF (Trust Blue)
Accent: #10B981 (Success Green)  
Background: #FAFAFA (Light) / #0F172A (Dark)
Text Primary: #1F2937
Text Secondary: #6B7280
```

**Typography:**
```
Headlines: System font stack, 700-800 weight
Body: System font stack, 400 weight
Spacing: More generous (py-24, py-32)
```

### Files to Modify
| File | Action | Description |
|------|--------|-------------|
| `src/components/Services.tsx` | Complete rewrite | Remove clothesline, modern grid |
| `src/components/About.tsx` | Complete rewrite | Remove film strip, clean timeline |
| `src/components/Team.tsx` | Remove/Replace | Replace with tools showcase or remove entirely |
| `src/components/Awards.tsx` | Simplify | Clean logo grid |
| `src/components/Hero.tsx` | Minor edits | Keep video, refine overlay text |
| `src/components/Portfolio.tsx` | Minor edits | Keep structure, ensure anonymized |
| `src/index.css` | Update | Add new utility classes |

---

## Part 3: Back Office Enhancements

### Current State
The admin panel already has solid foundations:
- Dashboard with real-time stats
- Lead pipeline board
- Appointments calendar
- Conversation insights
- User management

### Enhancements for "The Tool That Builds The Tool"

**3.1 Lead Management Improvements**
- Activity timeline for each lead
- Quick actions: Email template, Schedule, Call
- AI-generated conversation summaries
- Lead scoring explanation

**3.2 Conversation Analysis Display**
- Highlight extracted contact info
- Show sentiment indicators
- Display action items from calls
- Link directly to full transcript

**3.3 Business Metrics**
- Conversion funnel visualization
- ElevenLabs widget engagement stats
- Time-to-qualification metrics
- ROI calculator integration

**3.4 Email Integration (Future Phase)**
- SendGrid/Postmark connection
- Template-based follow-ups
- Track email engagement

### Database Schema Additions (Minimal)
```sql
-- Lead activity timeline
ALTER TABLE interactions ADD COLUMN interaction_data jsonb;

-- Conversation analysis storage
ALTER TABLE conversations ADD COLUMN analysis_summary text;
ALTER TABLE conversations ADD COLUMN sentiment_score numeric;
ALTER TABLE conversations ADD COLUMN action_items jsonb;
```

---

## Part 4: Google Calendar Integration (Future Phase)

### Why Defer to Future Phase
- Cal.com currently works
- Google Calendar API requires OAuth flow complexity
- Better to stabilize ElevenLabs first

### When Ready to Implement
1. Create Google Cloud project
2. Enable Calendar API
3. Create OAuth credentials
4. Build edge function for token management
5. Create custom booking UI

---

## Implementation Sprints

### Sprint 1: ElevenLabs Integration Rebuild (3-4 days)
**Priority: HIGHEST - Core functionality**

1. Link MyHorizon Asst connector to project
2. Rewrite ElevenLabsWidget.tsx with React SDK
3. Create conversation token edge function
4. Implement client-side conversation capture
5. Update webhook with additional payload parsing
6. Add manual sync button to admin panel
7. Test end-to-end conversation flow

**Deliverables:**
- Conversations captured reliably
- Leads created from conversations
- Admin panel shows new data

### Sprint 2: Landing Page Transformation (4-5 days)
**Priority: HIGH - First impressions**

1. Create new Problem section component
2. Rebuild Services.tsx (remove clothesline)
3. Rebuild About.tsx (remove film strip)
4. Remove or replace Team.tsx
5. Simplify Awards.tsx to tool logos
6. Update Hero.tsx messaging
7. Update global styles for more whitespace

**Deliverables:**
- Clean, modern landing page
- Premium feel matching pocketmarketer.ai
- Consistent visual language

### Sprint 3: Back Office Polish (3-4 days)
**Priority: MEDIUM - Operational efficiency**

1. Add lead activity timeline
2. Enhance conversation display
3. Add quick action buttons
4. Improve dashboard metrics
5. Add "Last sync" status indicator

**Deliverables:**
- More actionable admin panel
- Better lead insights
- Faster workflows

### Sprint 4: Testing & Refinement (2 days)
**Priority: HIGH - Quality assurance**

1. End-to-end testing of full flow
2. Mobile responsiveness check
3. Performance optimization
4. Bug fixes from testing

---

## Technical Implementation Details

### ElevenLabs React SDK Integration
```typescript
// New approach using @elevenlabs/react
import { useConversation } from "@elevenlabs/react";

export function ElevenLabsWidget() {
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: async (message) => {
      // Capture transcript in real-time
      if (message.type === "user_transcript") {
        // Store locally or sync to database
      }
    },
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = async () => {
    // Get token from edge function
    const { data } = await supabase.functions.invoke("elevenlabs-conversation-token");
    
    await navigator.mediaDevices.getUserMedia({ audio: true });
    await conversation.startSession({
      conversationToken: data.token,
      connectionType: "webrtc",
    });
  };

  // Custom UI with matching design
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Custom styled button */}
    </div>
  );
}
```

### New Services Component Structure
```typescript
// Clean, modern service cards
const automations = [
  {
    icon: MessageSquare,
    title: "AI Voice Agents",
    metric: "24/7 Lead Qualification",
    description: "Conversations that convert while you sleep",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    metric: "20+ Hours Saved Weekly",
    description: "Connect your tools, eliminate manual work",
  },
  // ... more services
];

// Rendered as clean cards with hover effects
// No clotheslines, no vintage effects
```

---

## Required Secrets & Configuration

### Current Secrets
- `ELEVENLABS_WEBHOOK_SECRET` - Exists
- `Eleven_Labs` - Exists (legacy name)
- `LOVABLE_API_KEY` - System managed

### Secrets to Add
| Secret | Purpose | Source |
|--------|---------|--------|
| From MyHorizon Asst connector | ElevenLabs API access | Connector linking |

### Connector Action Required
Link the **"MyHorizon Asst"** (elevenlabs) connector to this project to get proper API credentials.

---

## Success Metrics

### ElevenLabs Integration
- 100% of conversations captured
- Lead creation within 30 seconds of call end
- Zero missed webhooks (with fallback)

### Landing Page
- Bounce rate reduction (target: <40%)
- Time on page increase (target: >2 minutes)
- CTA click rate improvement

### Back Office
- Time to qualify a lead: <5 minutes
- Actions per lead: trackable
- Zero data loss

---

## Risk Mitigation

### ElevenLabs Webhook Issues
- **Primary**: React SDK with client-side capture
- **Secondary**: Webhook with improved parsing
- **Tertiary**: Manual sync via API polling

### Design Subjectivity
- Follow pocketmarketer.ai patterns closely
- Maintain professional, clean aesthetic
- Remove all vintage/creative elements
- Get user approval at each sprint

---

## Immediate Next Step

**Start Sprint 1 by linking the MyHorizon Asst connector**, which will provide the proper API credentials for the ElevenLabs integration rebuild.
