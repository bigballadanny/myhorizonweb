/**
 * Centralized lead capture utility.
 * Every lead capture point on the site should use this.
 * Analytics fire only after the server confirms that the lead was saved.
 */

import { supabase } from '@/integrations/supabase/client'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ewlvyssrckqdyuxxwxiv.supabase.co'
const LEAD_CAPTURE_MODE = import.meta.env.VITE_LEAD_CAPTURE_MODE === 'edge' ? 'edge' : 'direct'

type AnalyticsWindow = Window & {
  fbq?: (...args: unknown[]) => void
  clarity?: (...args: unknown[]) => void
}

export interface LeadData {
  email: string
  name?: string
  phone?: string
  company?: string
  source:
    | 'chat_widget'
    | 'newsletter'
    | 'lead_form'
    | 'cal_booking'
    | 'exit_intent'
    | 'voice_widget'
  notes?: string
}

export type LeadCaptureResult =
  | { ok: true; action: 'created' | 'updated'; id?: string }
  | { ok: false; message: string }

/** Fire Meta Pixel Lead event */
function firePixelLead(data: LeadData) {
  try {
    const fbq = (window as AnalyticsWindow).fbq
    if (fbq) {
      fbq('track', 'Lead', {
        content_name: `Lead from ${data.source}`,
        content_category: data.source,
        value: 0,
        currency: 'USD',
      })
    }
  } catch {
    /* pixel not loaded */
  }
}

/** Fire Clarity tag */
function fireClarityTag(data: LeadData) {
  try {
    const clarity = (window as AnalyticsWindow).clarity
    if (clarity) {
      clarity('set', 'lead_captured', data.source)
    }
  } catch {
    /* clarity not loaded */
  }
}

/** Store lead via edge function (bypasses RLS) */
async function storeSupabase(data: LeadData): Promise<LeadCaptureResult> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/capture-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        phone: data.phone,
        company: data.company,
        source: data.source,
        notes: data.notes || `Captured via ${data.source} on ${window.location.pathname}`,
      }),
    })

    const payload = await res.json().catch(() => ({}))
    if (!res.ok || payload.success !== true) {
      return {
        ok: false,
        message: 'We could not save your request. Please try again or email daniel@myhorizon.ai.',
      }
    }

    return {
      ok: true,
      action: payload.action === 'updated' ? 'updated' : 'created',
      id: typeof payload.id === 'string' ? payload.id : undefined,
    }
  } catch {
    return {
      ok: false,
      message: 'We could not connect. Please check your connection and try again.',
    }
  }
}

/**
 * Persist through the existing anonymous-insert RLS policy when the edge
 * function has not been deployed yet. This never stores PII in the browser.
 */
async function storeDirect(data: LeadData): Promise<LeadCaptureResult> {
  const source = data.source === 'voice_widget'
    ? 'inbound_call'
    : data.source === 'newsletter'
      ? 'other'
      : 'website_chat'

  const { error } = await supabase.from('leads').insert({
    email: data.email.slice(0, 254),
    name: data.name?.trim().slice(0, 160) || null,
    phone: data.phone?.trim().slice(0, 60) || null,
    company: data.company?.trim().slice(0, 200) || null,
    source,
    status: 'new',
    notes: (data.notes || `Captured via ${data.source} on ${window.location.pathname}`).slice(0, 1000),
  })

  if (error) {
    return {
      ok: false,
      message: 'We could not save your request. Please try again or email daniel@myhorizon.ai.',
    }
  }

  return { ok: true, action: 'created' }
}

/**
 * Capture a lead from any source.
 * Returns an honest result so forms never claim success before persistence.
 */
export async function captureLead(data: LeadData): Promise<LeadCaptureResult> {
  const normalized: LeadData = {
    ...data,
    email: data.email.trim().toLowerCase(),
  }
  const result = LEAD_CAPTURE_MODE === 'edge'
    ? await storeSupabase(normalized)
    : await storeDirect(normalized)
  if (result.ok) {
    firePixelLead(normalized)
    fireClarityTag(normalized)
  }
  return result
}
