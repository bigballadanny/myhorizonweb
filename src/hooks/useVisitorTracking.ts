import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SectionTime {
  section: string;
  seconds: number;
}

async function generateFingerprint(): Promise<string> {
  const components = [
    screen.width,
    screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.language,
    navigator.platform,
    navigator.hardwareConcurrency,
  ].join('|');

  // Canvas fingerprint
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);
  }
  const canvasData = canvas.toDataURL();

  const raw = components + '|' + canvasData;
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function useVisitorTracking() {
  const sessionIdRef = useRef<string | null>(null);
  const fingerprintRef = useRef<string | null>(null);
  const sectionTimers = useRef<Map<string, number>>(new Map());
  const sectionTotals = useRef<Map<string, number>>(new Map());
  const startTimeRef = useRef<number>(Date.now());

  const flushEngagement = useCallback(async () => {
    if (!sessionIdRef.current) return;

    const pagesViewed: Array<Record<string, string | number>> = [];
    sectionTotals.current.forEach((seconds, section) => {
      if (seconds > 0) pagesViewed.push({ section, seconds: Math.round(seconds) });
    });

    // Also finalize any currently-visible sections
    sectionTimers.current.forEach((startTime, section) => {
      const elapsed = (Date.now() - startTime) / 1000;
      const existing = pagesViewed.find(p => p.section === section);
      if (existing) existing.seconds = (Number(existing.seconds) || 0) + Math.round(elapsed);
      else pagesViewed.push({ section, seconds: Math.round(elapsed) });
    });

    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

    try {
      await supabase
        .from('visitor_sessions')
        .update({
          pages_viewed: pagesViewed,
          session_duration_seconds: duration,
          last_seen_at: new Date().toISOString(),
        })
        .eq('id', sessionIdRef.current);
    } catch (e) {
      console.error('Failed to flush engagement:', e);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const fingerprint = await generateFingerprint();
      if (!mounted) return;
      fingerprintRef.current = fingerprint;

      // Check for existing session with this fingerprint
      const { data: existing } = await supabase
        .from('visitor_sessions')
        .select('id, visit_count')
        .eq('fingerprint_hash', fingerprint)
        .order('last_seen_at', { ascending: false })
        .limit(1);

      if (existing && existing.length > 0) {
        // Returning visitor - update existing
        const { data } = await supabase
          .from('visitor_sessions')
          .update({
            is_returning: true,
            visit_count: (existing[0].visit_count || 1) + 1,
            last_seen_at: new Date().toISOString(),
            page_url: window.location.href,
            referrer: document.referrer || null,
          })
          .eq('id', existing[0].id)
          .select('id')
          .single();

        if (data) sessionIdRef.current = data.id;
      } else {
        // New visitor
        const { data } = await supabase
          .from('visitor_sessions')
          .insert({
            fingerprint_hash: fingerprint,
            page_url: window.location.href,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
          })
          .select('id')
          .single();

        if (data) sessionIdRef.current = data.id;
      }
    };

    init();

    // Section engagement tracking via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id || entry.target.getAttribute('aria-label') || 'unknown';
          if (entry.isIntersecting) {
            sectionTimers.current.set(sectionId, Date.now());
          } else if (sectionTimers.current.has(sectionId)) {
            const start = sectionTimers.current.get(sectionId)!;
            const elapsed = (Date.now() - start) / 1000;
            const prev = sectionTotals.current.get(sectionId) || 0;
            sectionTotals.current.set(sectionId, prev + elapsed);
            sectionTimers.current.delete(sectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    setTimeout(() => {
      document.querySelectorAll('section[id], section[aria-label]').forEach((el) => {
        observer.observe(el);
      });
    }, 1000);

    // Flush on unload
    const handleUnload = () => {
      flushEngagement();
    };
    window.addEventListener('beforeunload', handleUnload);

    // Periodic flush every 30s
    const interval = setInterval(flushEngagement, 30000);

    return () => {
      mounted = false;
      observer.disconnect();
      window.removeEventListener('beforeunload', handleUnload);
      clearInterval(interval);
      flushEngagement();
    };
  }, [flushEngagement]);

  const linkConversation = useCallback(async (conversationId: string) => {
    if (!sessionIdRef.current) return;
    try {
      await supabase
        .from('visitor_sessions')
        .update({ conversation_id: conversationId })
        .eq('id', sessionIdRef.current);
    } catch (e) {
      console.error('Failed to link conversation:', e);
    }
  }, []);

  const linkLead = useCallback(async (leadId: string) => {
    if (!sessionIdRef.current) return;
    try {
      await supabase
        .from('visitor_sessions')
        .update({ lead_id: leadId })
        .eq('id', sessionIdRef.current);
    } catch (e) {
      console.error('Failed to link lead:', e);
    }
  }, []);

  return {
    fingerprint: fingerprintRef.current,
    sessionId: sessionIdRef.current,
    linkConversation,
    linkLead,
  };
}
