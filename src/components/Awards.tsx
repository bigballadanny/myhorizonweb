'use client'

export function Awards() {
  const partners = [
    {
      name: "OpenAI",
      description: "Leading AI & LLM provider for intelligent automation",
      logo: "text-5xl font-black",
      text: "OpenAI",
      color: "from-emerald-500/10 to-emerald-600/10",
      hoverColor: "group-hover:border-emerald-500/50"
    },
    {
      name: "Google Cloud AI",
      description: "Gemini models for advanced conversational AI",
      logo: "text-5xl font-black",
      text: "Google AI",
      color: "from-blue-500/10 to-blue-600/10",
      hoverColor: "group-hover:border-blue-500/50"
    },
    {
      name: "Stripe",
      description: "Secure payment processing and subscription management",
      logo: "text-5xl font-black",
      text: "Stripe",
      color: "from-purple-500/10 to-purple-600/10",
      hoverColor: "group-hover:border-purple-500/50"
    },
    {
      name: "Supabase",
      description: "Scalable database and backend infrastructure",
      logo: "text-5xl font-black",
      text: "Supabase",
      color: "from-emerald-500/10 to-emerald-600/10",
      hoverColor: "group-hover:border-emerald-500/50"
    },
    {
      name: "ElevenLabs",
      description: "Natural voice AI for human-like conversations",
      logo: "text-5xl font-black",
      text: "ElevenLabs",
      color: "from-orange-500/10 to-orange-600/10",
      hoverColor: "group-hover:border-orange-500/50"
    },
    {
      name: "Zapier",
      description: "Workflow automation connecting 6,000+ apps",
      logo: "text-5xl font-black",
      text: "Zapier",
      color: "from-amber-500/10 to-amber-600/10",
      hoverColor: "group-hover:border-amber-500/50"
    }
  ]

  return (
    <section id="awards" className="relative py-16 sm:py-20 bg-background">
      
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
              Technology Partners
            </span>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 sm:mb-6 text-foreground px-2">
            Powered By Industry Leaders
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-2">
            We leverage cutting-edge technologies to deliver world-class AI automation solutions
          </p>
        </div>

        {/* Partners Grid - 2 columns on mobile */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative h-full bg-gradient-to-br ${partner.color} rounded-xl sm:rounded-2xl border border-border ${partner.hoverColor} transition-all duration-500 hover:scale-105 overflow-hidden`}>
                  
                  {/* Card Content */}
                  <div className="relative p-4 sm:p-6 lg:p-8 flex flex-col items-center text-center h-full">
                    
                    {/* Logo/Text */}
                    <div className="mb-3 sm:mb-6 mt-2 sm:mt-4">
                      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                        {partner.text}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {partner.description}
                    </p>

                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-10 sm:mt-16 text-center">
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-2">
            Trusted by <span className="font-bold text-foreground">100+ businesses</span> to automate their workflows
          </p>
        </div>

      </div>
      
    </section>
  )
}
