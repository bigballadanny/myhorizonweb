/**
 * Centralized lead capture utility.
 * Every lead capture point on the site should use this.
 * - Fires Meta Pixel Lead event
 * - Stores to localStorage (always works)
 * - Attempts Supabase insert
 */

import { supabase } from '@/integrations/supabase/client'

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

/** Attempt Supabase insert */
async function storeSupabase(data: LeadData) {
  try {
    const sourceMap: Record<string, string> = {
      chat_widget: 'website_chat',
      newsletter: 'other',
      lead_form: 'website_chat',
      cal_booking: 'website_chat',
      exit_intent: 'other',
      voice_widget: 'inbound_call',
    }

    const { error } = await supabase.from('leads').insert({
      email: data.email,
      name: data.name || null,
      phone: data.phone || null,
      company: data.company || null,
      source: sourceMap[data.source] || 'other',
      status: 'new',
      notes: data.notes || `Captured via ${data.source} on ${window.location.pathname}`,
    })

    if (error) {
      console.warn('Supabase lead insert failed (RLS):', error.message)
      // Will still be in localStorage
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
