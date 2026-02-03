'use client'

import { useState } from 'react'
import { Bot, Workflow, Users, FileText, BarChart3, Cog, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

export function Services() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const services = [
    {
      id: 'chatbots',
      title: "AI Chatbots & Agents",
      description: "24/7 customer support that understands context, handles complex queries, and never sleeps.",
      icon: Bot,
      accent: 'accent-blue',
      stats: "90% query resolution"
    },
    {
      id: 'workflow',
      title: "Workflow Automation", 
      description: "Eliminate repetitive tasks. Connect your tools. Let AI handle the boring stuff.",
      icon: Workflow,
      accent: 'accent-emerald',
      stats: "20+ hrs saved/week"
    },
    {
      id: 'crm',
      title: "CRM Integration",
      description: "Intelligent lead scoring, automated follow-ups, and pipeline optimization that converts.",
      icon: Users,
      accent: 'accent-purple',
      stats: "3x conversion rate"
    },
    {
      id: 'content',
      title: "Content Generation",
      description: "AI-powered content that maintains your brand voice across all channels.",
      icon: FileText,
      accent: 'accent-blue',
      stats: "10x faster output"
    },
    {
      id: 'analytics',
      title: "Data & Insights",
      description: "Transform raw data into actionable intelligence with automated reporting.",
      icon: BarChart3,
      accent: 'accent-emerald',
      stats: "Real-time dashboards"
    },
    {
      id: 'custom',
      title: "Custom Solutions",
      description: "Tailored automation systems designed for your unique business challenges.",
      icon: Cog,
      accent: 'accent-purple',
      stats: "Built for you"
    }
  ]

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-background">
      
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              What We Automate
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
            AI Solutions That <span className="text-accent-blue">Actually Work</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Stop paying for tools you don't use. Get automation that delivers measurable ROI from day one.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon
            const isHovered = hoveredService === service.id
            
            return (
              <div
                key={service.id}
                className={`group relative bg-card clean-border rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                  isHovered ? 'elevated-shadow -translate-y-1' : 'subtle-shadow'
                }`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  service.accent === 'accent-blue' ? 'bg-accent-blue/10 text-accent-blue' :
                  service.accent === 'accent-emerald' ? 'bg-accent-emerald/10 text-accent-emerald' :
                  'bg-accent-purple/10 text-accent-purple'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* Stats badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  service.accent === 'accent-blue' ? 'bg-accent-blue/10 text-accent-blue' :
                  service.accent === 'accent-emerald' ? 'bg-accent-emerald/10 text-accent-emerald' :
                  'bg-accent-purple/10 text-accent-purple'
                }`}>
                  {service.stats}
                </div>
                
                {/* Hover arrow */}
                <div className={`absolute bottom-8 right-8 transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-card clean-border rounded-2xl p-6 sm:p-8">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-foreground mb-1">
                Not sure where to start?
              </p>
              <p className="text-muted-foreground">
                Book a free consultation and we'll map out your automation opportunities.
              </p>
            </div>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="whitespace-nowrap"
            >
              Get Custom Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
