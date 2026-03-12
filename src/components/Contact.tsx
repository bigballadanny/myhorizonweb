'use client'

import { useEffect, useState } from 'react'
import { Calendar, Clock, Video } from 'lucide-react'
import { LeadForm } from './LeadForm'
import { captureLead } from '@/lib/lead-capture'

export function Contact() {
  const [calLoaded, setCalLoaded] = useState(false)

  useEffect(() => {
    if (!calLoaded) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.innerHTML = `
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
              if(typeof namespace === "string"){
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
      setCalLoaded(true)
    }
  }, [calLoaded])

  useEffect(() => {
    if (!calLoaded) return
    const tryInit = () => {
      const Cal = (window as any).Cal
      if (!Cal) {
        setTimeout(tryInit, 300)
        return
      }
      Cal('init', 'consultation', { origin: 'https://app.cal.com' })
      Cal.ns['consultation']('inline', {
        elementOrSelector: '#cal-inline-consultation',
        config: { layout: 'month_view', theme: 'light' },
        calLink: 'myhorizon/consultation',
      })
      Cal.ns['consultation']('ui', { hideEventTypeDetails: false, layout: 'month_view' })

      // Track Cal.com booking events — fire Meta Pixel Lead event
      Cal.ns['consultation']('on', {
        action: 'bookingSuccessful',
        callback: (e: any) => {
          console.log('Cal.com booking successful:', e)
          // Fire Lead pixel
          const fbq = (window as any).fbq
          if (fbq) {
            fbq('track', 'Lead', {
              content_name: 'Cal.com Booking',
              content_category: 'cal_booking',
            })
            fbq('track', 'Schedule', {
              content_name: 'Consultation Booked',
            })
          }
          // Capture lead if we can extract email from the event
          const detail = e?.detail?.data
          if (detail?.email || detail?.booker?.email) {
            captureLead({
              email: detail?.email || detail?.booker?.email,
              name: detail?.name || detail?.booker?.name,
              source: 'cal_booking',
              notes: `Booked consultation via Cal.com`,
            })
          }
          // Clarity tag
          const clarity = (window as any).clarity
          if (clarity) clarity('set', 'booking_completed', 'true')
        },
      })
    }
    setTimeout(tryInit, 500)
  }, [calLoaded])

  const trustPoints = [
    { icon: Clock, text: '30-minute call' },
    { icon: Video, text: 'Video or phone' },
    { icon: Calendar, text: 'Pick any time that works' },
  ]

  return (
    <section id="contact" className="py-20 lg:py-24 bg-card">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="mb-12">
          <p className="section-label mb-5">Let's Build Together</p>
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
                Book a Free Consultation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Pick a time that works for you. We'll spend 30 minutes mapping out exactly where AI fits into your business — no pitch, no pressure.
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

        {/* Two-column layout: Lead form + Cal.com */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Lead capture form — lower friction alternative */}
          <div className="lg:col-span-2">
            <LeadForm />
          </div>

          {/* Cal.com embed — full booking */}
          <div className="lg:col-span-3 bg-background rounded-2xl border border-border overflow-hidden">
            <div
              id="cal-inline-consultation"
              className="w-full min-h-[580px]"
              style={{ overflow: 'hidden' }}
            />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-5">
          All calls are free. No sales pressure. We'll map out your opportunities together.
        </p>

      </div>
    </section>
  )
}
