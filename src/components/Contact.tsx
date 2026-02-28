'use client'

import { Calendar, Clock, Video } from 'lucide-react'
import { LeadForm } from './LeadForm'

export function Contact() {

  const trustPoints = [
    { icon: Clock, text: '30-minute call' },
    { icon: Video, text: 'Video or phone' },
    { icon: Calendar, text: 'Pick any time that works' },
  ]

  return (
    <section id="contact" className="py-24 lg:py-32 border-t border-white/5 bg-black/40 backdrop-blur-3xl relative z-10">
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

          {/* Google Calendar Appointment Embed */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-white/10 overflow-hidden min-h-[600px] relative">
            {/* 
              TODO FOR DANIEL: 
              Paste your Google Calendar Appointment Schedule link inside the src="" below.
              Make sure to append "?gv=true" to the end of the URL if it isn't there, so it renders cleanly.
            */}
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0vUQQ7-PIfBhwG-iY6V1T7q-c-sBmwO9S-p1r2_C3A_hS_N0bM-_8AEX_W8cZqk-c_3_yL8U6Z?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              title="Google Calendar Booking"
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
