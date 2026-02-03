'use client'

import storyboardImage from '@/assets/storyboard-image.avif'

export function About() {
  const processSteps = [
    {
      number: "01",
      title: "Discovery & Assessment",
      description: "Understanding your business processes, pain points, and automation opportunities",
      color: "accent-blue"
    },
    {
      number: "02", 
      title: "Strategy & Design",
      description: "Architecting custom AI solutions with detailed workflow mapping and integration planning",
      color: "accent-emerald"
    },
    {
      number: "03",
      title: "Development & Integration",
      description: "Building AI tools and connecting them seamlessly to your existing systems",
      color: "accent-purple"
    },
    {
      number: "04",
      title: "Testing & Training",
      description: "Rigorous quality assurance and comprehensive team training on new automation tools",
      color: "accent-blue"
    },
    {
      number: "05",
      title: "Launch & Optimization",
      description: "Going live with continuous monitoring, support, and iterative improvements",
      color: "accent-purple"
    }
  ]

  return (
    <section id="about" className="relative py-16 sm:py-24 bg-background overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
              Our Process
            </span>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 sm:mb-6 text-foreground px-2">
            How We Transform Your Business
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-2">
            A proven 5-step process to implement AI automation that delivers results
          </p>
        </div>

        {/* Process Steps - Modern Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 mb-16 max-w-7xl mx-auto">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="group relative bg-card clean-border rounded-2xl p-6 transition-all duration-300 hover:elevated-shadow hover:-translate-y-1"
            >
              {/* Step Number */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-black text-lg ${
                step.color === 'accent-blue' ? 'bg-accent-blue/10 text-accent-blue' :
                step.color === 'accent-emerald' ? 'bg-accent-emerald/10 text-accent-emerald' :
                'bg-accent-purple/10 text-accent-purple'
              }`}>
                {step.number}
              </div>
              
              {/* Content */}
              <h3 className="font-bold text-lg text-foreground mb-2">
                {step.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="text-center mb-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-card/80 backdrop-blur-sm clean-border rounded-xl sm:rounded-2xl px-4 sm:px-8 py-3 sm:py-4 subtle-shadow">
            
            {/* Uptime Indicator */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-foreground">24/7 Uptime</span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-border" />
            
            {/* Duration */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
              <span className="text-xs sm:text-sm font-semibold text-foreground">2-4 Weeks</span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-border" />
            
            {/* Quality */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse" style={{animationDelay: '1s'}} />
              <span className="text-xs sm:text-sm font-semibold text-foreground">Enterprise Grade</span>
            </div>
          </div>
        </div>

        {/* Gallery Image */}
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              From manual processes to intelligent automation
            </p>
          </div>
          
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 overflow-hidden">
            
            {/* Film grain overlay for authenticity */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                 style={{
                   backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
                   backgroundSize: '4px 4px'
                 }} />
            
            {/* Main gallery image */}
            <img 
              src={storyboardImage}
              alt="Visual representation of workflow automation and AI integration processes"
              className="w-full h-auto rounded-xl"
              style={{
                filter: 'contrast(1.05) saturate(1.1) brightness(0.95)'
              }}
            />
            
            {/* Subtle overlay gradient for depth */}
            <div className="absolute inset-4 rounded-xl pointer-events-none"
                 style={{
                   background: 'linear-gradient(135deg, rgba(37,99,235,0.03) 0%, transparent 20%, transparent 80%, rgba(124,58,237,0.03) 100%)'
                 }} />
          </div>
          
          {/* Caption */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground italic">
              "Every automation journey is unique — tailored to your specific business needs"
            </p>
          </div>
        </div>
      </div>
      
    </section>
  )
}
