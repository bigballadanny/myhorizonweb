import { useEffect } from 'react'

export function Contact() {

  useEffect(() => {
    // Load Cal.com embed script
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
      
      Cal("init", "myhorizon-consultation", {origin:"https://app.cal.com"});
      
      Cal.ns["myhorizon-consultation"]("inline", {
        elementOrSelector:"#my-cal-inline-myhorizon-consultation",
        config: {"layout":"month_view","theme":"auto"},
        calLink: "myhorizon/consultation",
      });
      
      Cal.ns["myhorizon-consultation"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `
    
    document.body.appendChild(script)
    
    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

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
            <span className="block mb-2">Ready to Automate Your Business?</span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
            Book a discovery call to discuss your automation needs and discover how AI can transform your operations
          </p>
        </div>

        {/* Cal.com Booking Widget - Full width on mobile */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-background clean-border rounded-2xl sm:rounded-3xl overflow-hidden elevated-shadow">
            {/* Widget Header */}
            <div className="bg-card/50 px-4 sm:px-8 py-4 sm:py-6 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-foreground mb-1">
                    MyHorizon Discovery Call
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    30 minutes • Video call • Free consultation
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-emerald rounded-full" />
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">Available now</span>
                </div>
              </div>
            </div>
            
            {/* Cal.com Embed Container - Responsive height */}
            <div className="p-0 bg-white">
              <div 
                className="w-full min-h-[500px] sm:min-h-[600px]"
                style={{
                  overflow: 'auto'
                }} 
                id="my-cal-inline-myhorizon-consultation"
              />
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="bg-background clean-border rounded-xl sm:rounded-2xl p-4 sm:p-6 subtle-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent-blue rounded-full" />
              </div>
              <h4 className="font-black text-foreground mb-2 text-sm sm:text-base">Project Discussion</h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Share your vision and requirements with our team
              </p>
            </div>
            
            <div className="bg-background clean-border rounded-xl sm:rounded-2xl p-4 sm:p-6 subtle-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-emerald/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent-emerald rounded-full" />
              </div>
              <h4 className="font-black text-foreground mb-2 text-sm sm:text-base">Custom Strategy</h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Get a tailored approach for your unique project
              </p>
            </div>
            
            <div className="bg-background clean-border rounded-xl sm:rounded-2xl p-4 sm:p-6 subtle-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent-purple rounded-full" />
              </div>
              <h4 className="font-black text-foreground mb-2 text-sm sm:text-base">Next Steps</h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Clear timeline and roadmap to bring your idea to life
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}