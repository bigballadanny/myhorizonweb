# Google Calendar Integration Research

## Overview
Comparison of Google Calendar API integration vs Cal.com for MyHorizon appointment scheduling.

---

## Option 1: Cal.com (Current Approach)

### Pros
- ✅ **Easiest Implementation**: Embed widget with 3 lines of code
- ✅ **No API Keys**: Just connect your Google Calendar once in Cal.com dashboard
- ✅ **Automatic Sync**: Bidirectional sync with Google Calendar
- ✅ **Built-in Features**: 
  - Timezone detection
  - Email notifications
  - Rescheduling/cancellation
  - Payment integration (Stripe)
  - Custom booking questions
  - Multiple calendar types
- ✅ **No Backend Required**: Everything handled by Cal.com
- ✅ **Free Tier**: Generous free plan available
- ✅ **Professional**: Used by many businesses, looks polished

### Cons
- ❌ Third-party dependency
- ❌ Some customization limitations
- ❌ Another tool to manage

### Implementation Time: **5 minutes**

### What You Need:
1. Create Cal.com account (free)
2. Connect your Google Calendar (`daniel@myhorizon.ai` or `office@myhorizon.ai`)
3. Set up event type (e.g., "Discovery Call - 30 min")
4. Get embed code
5. Replace current embed in Contact.tsx

---

## Option 2: Google Calendar API (Direct Integration)

### Pros
- ✅ Full control over UI/UX
- ✅ No third-party dependency
- ✅ Direct integration with Google ecosystem
- ✅ Can add custom business logic

### Cons
- ❌ **Complex Setup**: Requires OAuth 2.0 flow
- ❌ **Backend Required**: Need Supabase Edge Function for API calls
- ❌ **Manual Features**: Must build:
  - Timezone conversion
  - Email notifications (separate service)
  - Conflict checking
  - Rescheduling UI
  - Cancellation handling
  - Confirmation emails
- ❌ **Security Complexity**: Managing OAuth tokens, refresh tokens
- ❌ **Maintenance**: Google API changes, token expiration handling

### What You Need:
1. **Google Cloud Console Setup**:
   - Create project
   - Enable Google Calendar API
   - Configure OAuth consent screen
   - Create OAuth 2.0 credentials
   - Set authorized redirect URIs

2. **Supabase Edge Function**:
   ```typescript
   // Store OAuth tokens securely
   // Handle token refresh
   // Make Calendar API calls
   // Handle conflicts and errors
   ```

3. **Frontend Implementation**:
   - OAuth login flow
   - Calendar availability display
   - Time slot selection UI
   - Confirmation flow
   - Email integration (SendGrid/Postmark)

4. **Secrets Needed**:
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - GOOGLE_REFRESH_TOKEN
   - EMAIL_SERVICE_API_KEY (for notifications)

### Implementation Time: **8-12 hours**

---

## Option 3: Google Appointment Schedule (Google Workspace)

### What It Is
Google's built-in appointment scheduling for Google Workspace accounts.

### Pros
- ✅ Native Google integration
- ✅ Simple setup if you have Google Workspace
- ✅ Familiar Google UI

### Cons
- ❌ **Requires Google Workspace Subscription** ($6-18/user/month)
- ❌ Limited customization
- ❌ Less features than Cal.com
- ❌ Still requires embedding (similar to Cal.com)
- ❌ Not as polished as dedicated booking tools

### Implementation Time: **Similar to Cal.com (if you have Workspace)**

---

## Recommendation: **Use Cal.com**

### Why Cal.com Wins:
1. **Speed**: Get booking live in 5 minutes vs 8-12 hours
2. **Features**: Professional features out of the box
3. **Maintenance**: Zero maintenance vs ongoing token management
4. **Cost**: Free tier vs development time cost
5. **Reliability**: Battle-tested by thousands of businesses
6. **Future**: If you need customization later, Cal.com API exists

### When to Use Google Calendar API:
- You need very specific custom booking logic
- You're building a multi-tenant scheduling platform
- You need to manipulate calendar events beyond booking
- You have strict data residency requirements

### Next Steps:
1. Go to [cal.com](https://cal.com)
2. Sign up with `daniel@myhorizon.ai`
3. Connect Google Calendar
4. Create "MyHorizon Discovery Call" event type (30 min)
5. Get embed code from event settings
6. I'll update Contact.tsx with your embed code

---

## Cal.com vs Google Meet Integration

**Note**: Cal.com automatically generates Google Meet links when connected to Google Calendar. So you get:
- Google Calendar sync ✅
- Google Meet video links ✅
- Professional booking page ✅
- No extra work required ✅

It's the best of both worlds!
