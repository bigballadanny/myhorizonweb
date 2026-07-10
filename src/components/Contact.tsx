'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, Clock, ExternalLink, Video } from 'lucide-react'
import { LeadForm } from './LeadForm'
import { BOOKING_URL, CAL_EMBED_LINK, USES_GOOGLE_APPOINTMENTS } from '@/lib/booking'

const CAL_BOOTSTRAP_ID = 'myhorizon-cal-bootstrap'

type CalNamespace = ((...args: unknown[]) => void)
type CalApi = ((...args: unknown[]) => void) & {
  ns: Record<string, CalNamespace>
}
type TrackingWindow = Window & {
  Cal?: CalApi
  fbq?: (...args: unknown[]) => void
  clarity?: (...args: unknown[]) => void
}

function ensureCalBootstrap() {
  if (document.getElementById(CAL_BOOTSTRAP_ID)) return

  const script = document.createElement('script')
  script.id = CAL_BOOTSTRAP_ID
  script.type = 'text/javascript'
  script.text = `
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
  `
  document.body.appendChild(script)
}

export function Contact() {
  const [mobileChoice, setMobileChoice] = useState<'plan' | 'book'>('plan')
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
  const [calendarNearViewport, setCalendarNearViewport] = useState(false)
  const [calendarStatus, setCalendarStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [calendarAttempt, setCalendarAttempt] = useState(0)
  const bookingPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(media.matches)
    media.addEventListener('change', onChange)
    onChange()
    return () => media.removeEventListener('change', onChange)
  }, [])

  const bookingVisible = isDesktop || mobileChoice === 'book'

  useEffect(() => {
    if (!bookingVisible || USES_GOOGLE_APPOINTMENTS) return
    const element = bookingPanelRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setCalendarNearViewport(true),
      { rootMargin: '500px 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [bookingVisible])

  useEffect(() => {
    if (!calendarNearViewport || USES_GOOGLE_APPOINTMENTS) return

    ensureCalBootstrap()
    const target = document.getElementById('cal-inline-consultation')
    if (!target) return
    const alreadyInitialized = target.dataset.calInitialized === 'true'
    if (!alreadyInitialized) target.dataset.calInitialized = 'true'
    setCalendarStatus('loading')

    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const failureTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (!cancelled && !target.querySelector('iframe')) setCalendarStatus('error')
    }, 6500)
    let attempts = 0
    const markReady = () => {
      if (!cancelled && target.querySelector('iframe')) setCalendarStatus('ready')
    }
    const observer = new MutationObserver(markReady)
    observer.observe(target, { childList: true, subtree: true })
    const initialize = () => {
      if (cancelled) return
      const Cal = (window as TrackingWindow).Cal
      if (!Cal) {
        attempts += 1
        if (attempts < 20) timer = setTimeout(initialize, 250)
        else setCalendarStatus('error')
        return
      }

      Cal('init', 'consultation', { origin: 'https://app.cal.com' })
      Cal.ns.consultation('inline', {
        elementOrSelector: '#cal-inline-consultation',
        config: { layout: 'month_view', theme: 'light' },
        calLink: CAL_EMBED_LINK,
      })
      Cal.ns.consultation('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      Cal.ns.consultation('on', {
        action: 'bookingSuccessfulV2',
        callback: () => {
          const fbq = (window as TrackingWindow).fbq
          fbq?.('track', 'Schedule', { content_name: 'Consultation Booked' })
          const clarity = (window as TrackingWindow).clarity
          clarity?.('set', 'booking_completed', 'true')
        },
      })
      markReady()
    }

    if (alreadyInitialized) markReady()
    else initialize()
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
      clearTimeout(failureTimer)
      observer.disconnect()
    }
  }, [calendarAttempt, calendarNearViewport])

  const retryCalendar = () => {
    const target = document.getElementById('cal-inline-consultation')
    target?.removeAttribute('data-cal-initialized')
    if (target) target.replaceChildren()
    setCalendarStatus('idle')
    setCalendarAttempt((attempt) => attempt + 1)
  }

  const trustPoints = [
    { icon: Clock, text: '30-minute call' },
    { icon: Video, text: 'Video or phone' },
    { icon: Calendar, text: 'Pick any time that works' },
  ]

  return (
    <section id="contact" className="py-20 lg:py-24 bg-card">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-12">
          <p className="section-label mb-5">Let&apos;s Build Together</p>
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
                Book a Free Consultation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Pick a time that works for you. We&apos;ll spend 30 minutes mapping out exactly where AI fits into your business — no pitch, no pressure.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 lg:justify-end">
              {trustPoints.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-accent-blue flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-2 gap-2 p-1 bg-background border border-border rounded-xl mb-5" aria-label="Contact options">
          <button
            type="button"
            onClick={() => setMobileChoice('plan')}
            className={`min-h-11 rounded-lg px-3 text-sm font-medium transition-colors ${mobileChoice === 'plan' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
            aria-pressed={mobileChoice === 'plan'}
          >
            Get my AI game plan
          </button>
          <button
            type="button"
            onClick={() => setMobileChoice('book')}
            className={`min-h-11 rounded-lg px-3 text-sm font-medium transition-colors ${mobileChoice === 'book' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
            aria-pressed={mobileChoice === 'book'}
          >
            Book a call
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className={`${!isDesktop && mobileChoice !== 'plan' ? 'hidden' : 'block'} lg:col-span-2`}>
            <LeadForm />
          </div>

          <div
            ref={bookingPanelRef}
            className={`${!bookingVisible ? 'hidden' : 'block'} lg:col-span-3 bg-background rounded-2xl border border-border overflow-hidden`}
          >
            {USES_GOOGLE_APPOINTMENTS ? (
              <div className="min-h-[420px] flex flex-col items-center justify-center text-center px-6 py-12">
                <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-5">
                  <Calendar className="w-6 h-6 text-accent-blue" />
                </div>
                <h3 className="font-serif text-3xl text-foreground mb-3">Choose a time in Google Calendar</h3>
                <p className="text-muted-foreground max-w-md mb-7">
                  See live availability and add the meeting to your calendar in one step.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-blue text-white px-6 font-medium hover:bg-accent-blue/90 transition-colors"
                >
                  Open appointment schedule
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <>
                <div className="relative min-h-[580px]">
                  {(calendarStatus === 'idle' || calendarStatus === 'loading') && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background text-sm text-muted-foreground" role="status">
                      Loading live availability…
                    </div>
                  )}
                  {calendarStatus === 'error' && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background text-center px-6" role="alert">
                      <Calendar className="w-7 h-7 text-accent-blue mb-4" />
                      <h3 className="font-serif text-2xl text-foreground mb-2">Live availability did not load</h3>
                      <p className="text-sm text-muted-foreground max-w-sm mb-6">
                        You can retry here or open the secure scheduler directly.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button type="button" onClick={retryCalendar} className="min-h-11 rounded-xl border border-border px-5 text-sm font-medium hover:bg-card">
                          Try again
                        </button>
                        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-blue text-white px-5 text-sm font-medium">
                          Open scheduler <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                  <div
                    id="cal-inline-consultation"
                    className={`w-full min-h-[580px] ${calendarNearViewport ? 'block' : 'hidden'} ${calendarStatus === 'ready' ? 'opacity-100' : 'opacity-0'}`}
                    style={{ overflow: 'hidden' }}
                  />
                </div>
                <div className="border-t border-border p-3 text-center">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-accent-blue hover:underline">
                    Open the scheduler in a new tab
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-5">
          All calls are free. No sales pressure. We&apos;ll map out your opportunities together.
        </p>
      </div>
    </section>
  )
}
