/**
 * Centralized lead capture utility.
 * Every lead capture point on the site should use this.
 * - Fires Meta Pixel Lead event
 * - Stores to localStorage (always works)
 * - Attempts Supabase insert
 */

import { supabase } from '@/integrations/supabase/client'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ewlvyssrckqdyuxxwxiv.supabase.co'

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

const LEADS_STORAGE_KEY = 'myhorizon_captured_leads'

/** Fire Meta Pixel Lead event */
function firePixelLead(data: LeadData) {
  try {
    const fbq = (window as any).fbq
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
    const clarity = (window as any).clarity
    if (clarity) {
      clarity('set', 'lead_captured', data.source)
      if (data.email) clarity('set', 'lead_email', data.email)
    }
  } catch {
    /* clarity not loaded */
  }
}

/** Store lead in localStorage (always works, no RLS issues) */
function storeLocal(data: LeadData) {
  try {
    const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]')
    existing.push({ ...data, captured_at: new Date().toISOString() })
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing.slice(-100)))
  } catch {
    /* storage full or blocked */
  }
}

/** Store lead via edge function (bypasses RLS) */
async function storeSupabase(data: LeadData) {
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

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.warn('Lead capture edge function failed:', err)
    }
  } catch {
    /* network error — localStorage has it */
  }
}

/**
 * Capture a lead from any source.
 * Fires pixel, stores locally, attempts Supabase.
 */
export async function captureLead(data: LeadData): Promise<void> {
  // Dedupe — don't capture the same email twice in one session
  const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]')
  const isDupe = existing.some(
    (l: any) => l.email === data.email && l.source === data.source,
  )
  if (isDupe) return

  // Fire everything
  firePixelLead(data)
  fireClarityTag(data)
  storeLocal(data)
  await storeSupabase(data)
}

/** Get all locally stored leads (for admin/debug) */
export function getLocalLeads(): LeadData[] {
  try {
    return JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}
