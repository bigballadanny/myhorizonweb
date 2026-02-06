'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Workflow, Users, FileText, BarChart3, Cog, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

export function Services() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const services = [
    {
      id: 'agents',
      title: "AI Agents & Voice Systems",
      description: "Autonomous agents that handle customer conversations, qualify leads, and execute tasks without human intervention.",
      icon: Bot,
      accent: 'accent-blue',
      stats: "24/7 Operations"
    },
    {
      id: 'workflow',
      title: "Intelligent Workflows", 
      description: "AI-driven process automation that connects your systems and makes decisions in real-time.",
      icon: Workflow,
      accent: 'accent-emerald',
      stats: "20+ hrs saved/week"
    },
    {
      id: 'crm',
      title: "CRM & Pipeline Automation",
      description: "Smart lead scoring, automated nurturing sequences, and pipeline optimization that closes deals.",
      icon: Users,
      accent: 'accent-purple',
      stats: "3x conversion rate"
    },
    {
      id: 'content',
      title: "Content & Marketing AI",
      description: "Multi-agent systems that create, schedule, and optimize content across all your channels.",
      icon: FileText,
      accent: 'accent-blue',
      stats: "10x faster output"
    },
    {
      id: 'analytics',
      title: "AI Analytics & Insights",
      description: "Intelligent reporting systems that surface insights and trigger automated actions.",
      icon: BarChart3,
      accent: 'accent-emerald',
      stats: "Real-time intelligence"
    },
    {
      id: 'custom',
      title: "Custom AI Systems",
      description: "Full-stack AI infrastructure—agents, swarms, and workflows—architected for your business.",
      icon: Cog,
      accent: 'accent-purple',
      stats: "Enterprise-grade"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              What We Build
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
            AI Infrastructure That <span className="text-accent-blue">Scales</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Enterprise-grade AI systems, agents, and workflows—architected for your business.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            const isHovered = hoveredService === service.id
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative bg-card clean-border rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                  isHovered ? 'elevated-shadow -translate-y-1' : 'subtle-shadow'
                }`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={scrollToContact}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                } ${
                  service.accent === 'accent-blue' ? 'bg-accent-blue/5' :
                  service.accent === 'accent-emerald' ? 'bg-accent-emerald/5' :
                  'bg-accent-purple/5'
                }`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  service.accent === 'accent-blue' ? 'bg-accent-blue/10 text-accent-blue' :
                  service.accent === 'accent-emerald' ? 'bg-accent-emerald/10 text-accent-emerald' :
                  'bg-accent-purple/10 text-accent-purple'
                }`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                {/* Content */}
                <h3 className="relative text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="relative text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* Stats badge */}
                <div className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
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
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
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
        </motion.div>
      </div>
    </section>
  )
}
