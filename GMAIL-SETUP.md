# MyHorizon Gmail & Google Workspace Setup Guide

This guide covers setting up branded email icons and signatures for all MyHorizon @myhorizon.ai team members.

---

## 1. Set Organization Logo (Google Workspace Admin)

This makes the MyHorizon logo appear in various Google Workspace contexts.

**Steps:**
1. Go to **Google Admin Console** (`admin.google.com`)
2. Sign in with admin account
3. Go to **Settings** → **Organization Settings**
4. Under **Company Profile**, click **Logo & colors**
5. Click **Upload logo** and select the logo file:
   - **Recommended**: `myhorizon-logo-icon.png` or `myhorizon-logo-clean.png`
   - **Size**: 192x192 or 256x256 pixels (already generated)
   - **Format**: PNG with transparent background
6. Set **Organization color** (optional): Choose a brand color (MyHorizon uses dark blue/accent)
7. Click **Save**

**Result**: The logo will appear in Google Workspace apps and user profiles.

---

## 2. Set User Profile Pictures

Each team member needs a profile photo that appears in emails.

**For Admins (bulk setup):**
1. In **Google Admin Console** → **Users & accounts** → **Users**
2. Select a user
3. Click **Profile** section
4. Click **Upload profile photo**
5. Select the same logo file: `myhorizon-logo-icon.png`
6. **OR** each user can upload their own personal photo

**For Users (self-service):**
1. Go to **myaccount.google.com**
2. Click **Personal info** (left sidebar)
3. Scroll to **Profile picture**
4. Click the avatar and **Upload a photo**
5. Recommended: Use `myhorizon-logo-icon.png` for a unified brand look

---

## 3. Set Gmail Signature (Desktop)

Each user adds the branded email signature to their Gmail.

**Steps:**
1. Open **Gmail** in browser
2. Click **Settings** (gear icon, top right)
3. Go to **Settings** → **General** tab
4. Scroll down to **Signature** section
5. Click **Create new**
6. Name it: `MyHorizon` (or leave blank for default)
7. Paste the signature HTML below:

```html
<div style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 500px; padding: 16px 0; border-top: 1px solid #f0f0f0; font-size: 13px; color: #262626; line-height: 1.6;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <img src="https://myhorizon.ai/myhorizon-logo-icon.png" alt="MH" width="40" height="40" style="border-radius: 50%; background: #000;">
        <div>
            <div style="font-weight: 600; color: #000; font-size: 14px;">YOUR NAME HERE</div>
            <div style="font-size: 12px; color: #666;">Your Title</div>
        </div>
    </div>
    
    <div style="font-weight: 500; color: #000; font-size: 13px;">MyHorizon AI</div>
    <div style="font-size: 11px; color: #999; font-style: italic;">AI Systems & Automation for Business</div>
    
    <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 12px; flex-wrap: wrap;">
        <span>📧 <a href="mailto:YOUR.EMAIL@myhorizon.ai" style="color: #0066cc; text-decoration: none;">YOUR.EMAIL@myhorizon.ai</a></span>
        <span style="color: #e0e0e0;">|</span>
        <span>🌐 <a href="https://myhorizon.ai" style="color: #0066cc; text-decoration: none;">myhorizon.ai</a></span>
    </div>
    
    <div style="display: flex; gap: 8px; margin-top: 10px;">
        <a href="https://x.com/SynthiosAI" style="display: inline-block; width: 20px; height: 20px; background: #f0f0f0; color: #666; font-size: 11px; text-align: center; line-height: 20px; border-radius: 3px; text-decoration: none;">𝕏</a>
        <a href="https://www.instagram.com/myhorizon.ai" style="display: inline-block; width: 20px; height: 20px; background: #f0f0f0; color: #666; font-size: 11px; text-align: center; line-height: 20px; border-radius: 3px; text-decoration: none;">📷</a>
        <a href="https://linkedin.com/company/myhorizon" style="display: inline-block; width: 20px; height: 20px; background: #f0f0f0; color: #666; font-size: 11px; text-align: center; line-height: 20px; border-radius: 3px; text-decoration: none;">in</a>
    </div>
</div>
```

8. **Edit the signature:**
   - Replace `YOUR NAME HERE` with the user's name
   - Replace `Your Title` with their job title
   - Replace `YOUR.EMAIL` with their email address

9. Check **Set as default signature** for all outgoing emails
10. Click **Save Changes**

---

## 4. Set Gmail Signature (Mobile)

Gmail doesn't allow signature editing on mobile, but users can add it on desktop and it will sync to mobile.

---

## 5. Favicon & Logo on Site

Already completed:
- ✅ Favicon files generated (16x16, 32x32, 180x180, 192x192, 512x512)
- ✅ Logo is now 44px in Navigation and Footer (up from 40px)
- ✅ Chrome tab shows the MyHorizon logo (favicon)
- ✅ Apple devices show the logo in bookmark bar and home screen

**Testing:**
- Add myhorizon.ai to bookmarks → should show the round MyHorizon logo
- Add to iPhone home screen → should show the logo as app icon

---

## 6. Email Signature via Google Workspace Policy (Optional, Admin-Only)

If you want to enforce the signature on ALL users:

1. In **Google Admin Console** → **Apps & more** → **Google Workspace** → **Gmail**
2. Go to **Compliance & Security** → **Email Compliance**
3. Under **Signature**, paste the HTML signature
4. Check **Add organization signature to all outgoing messages**
5. Save

**Note**: This will append the signature to every email sent, even if users have their own signatures.

---

## 7. Custom Email Domain Branding

To add a custom header/footer to all emails:

1. In **Google Admin Console** → **Apps & more** → **Google Workspace** → **Gmail**
2. Go to **User Settings**
3. Under **Email Signature**, add the MyHorizon branding
4. Users can customize but the company branding stays

---

## File Locations

- **Logo Icon**: `/public/myhorizon-logo-icon.png` (deployed to myhorizon.ai)
- **Logo Clean**: `/public/myhorizon-logo-clean.png` (deployed to myhorizon.ai)
- **Favicon**: `/public/favicon.ico` (deployed to myhorizon.ai)
- **Email Signature HTML**: `/public/email-signature.html` (deployed to myhorizon.ai)
- **Apple Touch Icon**: `/public/apple-touch-icon.png` (180x180)
- **Android Icons**: `/public/android-chrome-192x192.png`, `/android-chrome-512x512.png`

---

## Checklist for Team Members

Each MyHorizon team member should:

- [ ] Set their Google Workspace profile picture (or use company logo)
- [ ] Add the branded email signature to their Gmail
- [ ] Test by sending a test email to themselves and a colleague
- [ ] Verify the logo appears in Sent folder and email thread

---

## Troubleshooting

**Q: Logo doesn't appear in emails I send?**
- A: Gmail only shows profile pictures to people who have you in their contacts or are in your organization. If recipient doesn't see it, Gmail may not be displaying it.
- A: Use Google Workspace directory to ensure your profile is up-to-date.

**Q: Signature looks broken in some email clients?**
- A: Some email clients strip styling. Test in Gmail, Outlook, Apple Mail, and mobile clients.
- A: Use the simpler text-based signature as fallback.

**Q: Can we use a different logo for different people?**
- A: Yes. Each person can upload their own profile photo. Use personal photos if preferred, or keep the brand logo for consistency.

---

## Links & Resources

- **Google Admin Console**: https://admin.google.com
- **Gmail Settings**: https://mail.google.com/mail/u/0/?tab=rm#settings/general
- **MyHorizon Logo Files**: https://myhorizon.ai/
- **Email Signature Generator** (optional): https://www.wisestamp.com/email-signature-generator/

---

## Next Steps

1. ✅ Favicon + logo files deployed to myhorizon.ai
2. ✅ Mobile UI optimized (padding, headings, theme toggle)
3. ✅ Light mode support added
4. 📋 **ACTION**: Go to Google Admin and set organization logo (step 1 above)
5. 📋 **ACTION**: Each team member adds signature to their Gmail (step 3 above)
6. ✅ Test email sending and verify logo appears

---

**Updated**: 2026-03-05  
**Status**: Ready for deployment
