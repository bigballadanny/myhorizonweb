
# Image Upgrade & Back Office Deep Build

## Overview

Two tracks: (1) Generate fresh, professional AI images for the public site using AI image generation, and (2) significantly deepen the back office with missing features that make it a true all-in-one business management system.

---

## Track 1: Image Upgrades

The project has many legacy image assets from a previous film/awards era that are no longer used. Only two images are actively used on the public site:
- `synthios-box-hero.jpg` -- the SYNTHIOS product photo
- `myhorizon-logo-clean.png` -- the logo (used in nav, footer, admin)

### 1.1 Generate New SYNTHIOS Product Image
**File:** `src/components/SynthiosProduct.tsx`

Use AI image generation (Lovable AI) to create a premium product lifestyle shot:
- A sleek Mac Mini M4 on a clean desk with ambient emerald/blue lighting
- Modern, minimal workspace setting
- Professional product photography style

The generated image will be stored in Lovable Cloud file storage and referenced via URL instead of the local asset.

### 1.2 Generate Service Card Visuals
**File:** `src/components/Services.tsx`

Add a small illustrative image or icon visual to each of the 6 service cards to make them more visually distinct:
- Generate 6 abstract/minimal AI-themed illustrations (one per service: AI Agents, Workflows, CRM, Content, Analytics, Custom Systems)
- Each image will be a subtle background or top-of-card visual
- Upload to file storage

### 1.3 Clean Up Unused Assets
Remove all legacy images that are no longer imported anywhere:
- All `award` images (beyond-border, creative-vision, digital-arts, etc.)
- All `team-member` images (1-7)
- All `testimonial-avatar` images (1-3)
- `storyboard-image.avif`, `ai-workflow-visual.png`
- Keep: `myhorizon-logo-clean.png`, `synthios-box-hero.jpg` (will be replaced), other logo variants

---

## Track 2: Back Office Deep Build

The current back office has good foundations but several tabs feel thin. Here's what each tab needs:

### 2.1 Dashboard -- Add Revenue Tracking Widget
**File:** `src/components/admin/DashboardOverview.tsx`

- Add an estimated pipeline value card: sum of leads by stage with assigned values (e.g., qualified = $2,000, appointment = $3,500, closed_won = actual)
- Add a "This Week" vs "Last Week" comparison row showing leads gained, appointments booked, conversations had

### 2.2 Pipeline -- Add Drag-and-Drop
**File:** `src/components/admin/LeadPipelineBoard.tsx`

The current pipeline uses a `<select>` dropdown to change status. Enhance it:
- Make the board visually richer with a horizontal scrolling Kanban layout (already exists but basic)
- Add drag-and-drop between columns using HTML5 drag events (no extra dependency)
- Show lead age (days since created) on each card
- Add a "Last Activity" line showing the most recent interaction

### 2.3 Appointments -- Add Edit/Delete & Lead Association
**File:** `src/components/admin/AppointmentsCalendar.tsx`

- Add ability to click an appointment to edit it (title, time, status)
- Add delete appointment button
- Show the associated lead name on each appointment card
- Add "Mark Complete" and "Mark No-Show" quick actions

### 2.4 Conversations -- Add Full Transcript Viewer
**File:** `src/components/admin/ConversationInsights.tsx`

- When clicking a conversation card, open a dialog showing the full transcript
- Format the transcript as a chat-style view (alternating agent/user messages)
- Add a "Re-analyze" button to re-run AI analysis
- Show conversation recording duration as a visual timeline bar

### 2.5 Campaigns -- Add Send Functionality & Templates
**File:** `src/components/admin/EmailCampaigns.tsx`

- Add a "Send Campaign" button on draft campaigns (with confirmation dialog)
- Add 3 pre-built email templates users can start from:
  - "Introduction" -- introducing MyHorizon's services
  - "Follow-Up" -- checking in after a conversation
  - "Case Study" -- sharing results/ROI data
- Add campaign duplication ("Clone Campaign")
- Add delete campaign

### 2.6 Lead Detail -- Deeper Timeline with Campaign History
**File:** `src/components/admin/LeadDetailDialog.tsx`

- Add email campaign engagement section: which campaigns were sent to this lead, did they open/click
- Add a "Send Individual Email" button (for one-off messages)
- Add "Add Note" quick action that creates an interaction record
- Show lead age and last activity timestamp

### 2.7 Settings -- Add Webhook & API Configuration Panel
**File:** `src/components/admin/IntegrationsSettings.tsx`

- Add a section showing active webhook URLs (ElevenLabs webhook endpoint)
- Add a "Test Webhook" button
- Show system health: edge function status, last sync time
- Add email configuration section (sender domain, from address)

---

## Database Changes

### New table: `email_templates`
```text
email_templates:
  - id (uuid, PK)
  - name (text)
  - subject (text)
  - body_html (text)
  - created_at (timestamptz)
```

### Add column to leads: `estimated_value`
```text
ALTER TABLE leads ADD COLUMN estimated_value numeric DEFAULT 0;
```

This allows pipeline value tracking per lead.

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/SynthiosProduct.tsx` | Replace product image with AI-generated one |
| `src/components/Services.tsx` | Add generated visuals to service cards |
| `src/components/admin/DashboardOverview.tsx` | Pipeline value widget, week comparison |
| `src/components/admin/LeadPipelineBoard.tsx` | Drag-and-drop, lead age, last activity |
| `src/components/admin/AppointmentsCalendar.tsx` | Edit/delete appointments, lead names, quick actions |
| `src/components/admin/ConversationInsights.tsx` | Full transcript viewer dialog |
| `src/components/admin/EmailCampaigns.tsx` | Send button, templates, clone, delete |
| `src/components/admin/LeadDetailDialog.tsx` | Campaign history, individual email, notes |
| `src/components/admin/IntegrationsSettings.tsx` | Webhook status, system health, email config |
| Database migration | email_templates table, leads.estimated_value column |
| Asset cleanup | Delete ~25 unused image files |

---

## Implementation Order

1. Database migration (email_templates + estimated_value column)
2. Generate and upload new SYNTHIOS product image
3. Generate and upload 6 service card visuals
4. Update SynthiosProduct.tsx and Services.tsx with new images
5. Clean up unused asset files
6. Dashboard pipeline value + weekly comparison
7. Pipeline drag-and-drop + lead enrichment
8. Appointments edit/delete + lead association
9. Conversation full transcript viewer
10. Campaigns send/templates/clone/delete
11. Lead detail campaign history + notes
12. Settings webhook/health panel

---

## Technical Details

### Drag-and-Drop (Pipeline)
Using HTML5 native drag events -- no new dependencies:
```text
- onDragStart: store lead ID + current status in dataTransfer
- onDragOver: highlight target column
- onDrop: update lead status via Supabase, optimistic UI update
- Visual: dragged card gets opacity reduction, target column gets border highlight
```

### AI Image Generation
Using Lovable AI's image generation endpoint to create:
- 1 SYNTHIOS product photo (1024x1024)
- 6 service illustrations (512x512 each)
Images stored in Lovable Cloud file storage bucket, referenced by public URL.

### Transcript Chat View
Parse transcript text (typically "Agent: ... User: ..." format) into alternating message bubbles:
```text
- Split on "Agent:" and "User:" markers
- Render as chat bubbles: agent on left (blue), user on right (gray)
- Show timestamps if available in metadata
```

### Pipeline Value Calculation
```text
Stage values (configurable):
  new: $500
  contacted: $1,000
  qualified: $2,000
  nurturing: $1,500
  appointment_scheduled: $3,500
  closed_won: lead.estimated_value or $5,000
  closed_lost: $0

Total pipeline = sum of all non-lost leads * stage value
```
