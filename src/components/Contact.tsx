'use client'

import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Clock, Video, MessageSquare } from 'lucide-react'

const bookingOptions = [
  {
    id: 'consultation',
    title: 'General Consultation',
    duration: '30 min',
    calLink: 'myhorizon/consultation',
    description: 'Explore how AI can help your business',
    icon: MessageSquare
  },
  {
    id: 'business-integration',
    title: 'Custom Automation',
    duration: '30 min',
    calLink: 'myhorizon/business-integration',
    description: 'Discuss custom AI solutions for your business',
    icon: Video
  },
  {
    id: 'synthios-box',
    title: 'SYNTHIOS Box',
    duration: '15 min',
    calLink: 'myhorizon/synthios-box',
    description: 'Quick call about our AI hardware product',
    icon: Clock
  }
]

export function Contact() {
  const [activeTab, setActiveTab] = useState('consultation')
  const [calLoaded, setCalLoaded] = useState(false)

  useEffect(() => {
    // Load Cal.com embed script once
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
    // Initialize the active calendar embed
    if (calLoaded && typeof window !== 'undefined' && (window as any).Cal) {
      const activeOption = bookingOptions.find(opt => opt.id === activeTab)
      if (activeOption) {
        const Cal = (window as any).Cal
        
        // Initialize namespace for this booking type
        Cal("init", activeOption.id, {origin:"https://app.cal.com"})
        
        Cal.ns[activeOption.id]("inline", {
          elementOrSelector: `#cal-inline-${activeOption.id}`,
          config: {"layout":"month_view","theme":"auto"},
          calLink: activeOption.calLink,
        })
        
        Cal.ns[activeOption.id]("ui", {"hideEventTypeDetails":false,"layout":"month_view"})
      }
    }
  }, [activeTab, calLoaded])

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
              Let's Build Together
            </span>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 sm:mb-8 px-2">
            <span className="block mb-2">Let's Build Something Together</span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
            Pick a time that works. Every call is free, no pressure.
          </p>
        </div>

        {/* Tabbed Booking Widget */}
        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab List */}
            <TabsList className="grid grid-cols-3 w-full mb-6 h-auto bg-muted/50 p-1 rounded-xl">
              {bookingOptions.map((option) => {
                const Icon = option.icon
                return (
                  <TabsTrigger 
                    key={option.id} 
                    value={option.id}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                      {option.title}
                    </span>
                    <span className="hidden sm:inline text-xs text-muted-foreground">
                      ({option.duration})
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Reassurance line */}
            <p className="text-center text-sm text-muted-foreground mb-6">
              All calls are free. No sales pressure. We'll map out your opportunities together.
            </p>

            {/* Tab Content */}
            {bookingOptions.map((option) => (
              <TabsContent key={option.id} value={option.id} className="mt-0">
                <div className="bg-background clean-border rounded-2xl sm:rounded-3xl overflow-hidden elevated-shadow">
                  {/* Widget Header */}
                  <div className="bg-card/50 px-4 sm:px-8 py-4 sm:py-6 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-foreground mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {option.duration} • Video call • {option.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-emerald rounded-full" />
                        <span className="text-xs sm:text-sm text-muted-foreground font-medium">Available now</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cal.com Embed Container */}
                  <div className="p-0 bg-background dark:bg-card/50">
                    <div 
                      className="w-full min-h-[500px] sm:min-h-[600px]"
                      style={{ overflow: 'auto' }} 
                      id={`cal-inline-${option.id}`}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

      </div>
    </section>
  )
}
