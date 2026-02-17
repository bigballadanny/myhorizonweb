'use client'

import { motion } from 'framer-motion'
import { Bot, Workflow, Users, FileText, BarChart3, Cog, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import serviceAgents from '@/assets/service-ai-agents.png'
import serviceWorkflows from '@/assets/service-workflows.png'
import serviceCrm from '@/assets/service-crm.png'
import serviceContent from '@/assets/service-content.png'
import serviceAnalytics from '@/assets/service-analytics.png'
import serviceCustom from '@/assets/service-custom.png'

const services = [
  {
    id: 'agents',
    title: 'AI Agents & Voice Systems',
    description:
      'Autonomous agents that handle customer conversations, qualify leads, and execute tasks — no human needed.',
    icon: Bot,
    accent: 'accent-blue',
    stat: '24/7 Operations',
    image: serviceAgents,
  },
  {
    id: 'workflow',
    title: 'Intelligent Workflows',
    description:
      'AI-driven process automation that connects your systems and makes real-time decisions across your business.',
    icon: Workflow,
    accent: 'accent-emerald',
    stat: '20+ hrs saved/week',
    image: serviceWorkflows,
  },
  {
    id: 'crm',
    title: 'CRM & Pipeline Automation',
    description:
      'Smart lead scoring, automated nurturing, and pipeline optimization that closes more deals with less effort.',
    icon: Users,
    accent: 'accent-purple',
    stat: '3x conversion rate',
    image: serviceCrm,
  },
  {
    id: 'content',
    title: 'Content & Marketing AI',
    description:
      'Multi-agent systems that create, schedule, and optimize content across every channel you use.',
    icon: FileText,
    accent: 'accent-blue',
    stat: '10x faster output',
    image: serviceContent,
  },
  {
    id: 'analytics',
    title: 'AI Analytics & Insights',
    description:
      'Intelligent reporting that surfaces what matters and triggers automated actions — no analyst required.',
    icon: BarChart3,
    accent: 'accent-emerald',
    stat: 'Real-time intelligence',
    image: serviceAnalytics,
  },
  {
    id: 'custom',
    title: 'Custom AI Systems',
    description:
      'Full-stack AI infrastructure — agents, automations, and workflows — architected around your exact business.',
    icon: Cog,
    accent: 'accent-purple',
    stat: 'Built for you',
    image: serviceCustom,
  },
]

function accentClasses(accent: string) {
  if (accent === 'accent-blue') return { bg: 'bg-accent-blue/10', text: 'text-accent-blue', fill: 'bg-accent-blue/4' }
  if (accent === 'accent-emerald') return { bg: 'bg-accent-emerald/10', text: 'text-accent-emerald', fill: 'bg-accent-emerald/4' }
  return { bg: 'bg-accent-purple/10', text: 'text-accent-purple', fill: 'bg-accent-purple/4' }
}

export function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="relative py-24 lg:py-32 section-light">
      <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-card/40 to-card/10 pointer-events-none" />

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
            AI Systems That <span className="text-accent-blue">Work for You</span>
          </h2>

          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            From voice agents to full automation stacks — we build the infrastructure that runs your business while you focus on growing it.
          </p>
        </motion.div>

        {/* Bento Grid: 2 large on top, 4 smaller below */}
        <div className="bento-grid mb-16">
          {/* Row 1: 2 large cards */}
          {services.slice(0, 2).map((service, index) => {
            const Icon = service.icon
            const cl = accentClasses(service.accent)
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={scrollToContact}
                className="bento-large group relative bg-card clean-border rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:elevated-shadow transition-all duration-300"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>

                <div className="p-8 relative">
                  {/* Hover glow */}
                  <div className={`absolute inset-0 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${cl.fill}`} />

                  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cl.bg} ${cl.text}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="relative text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="relative text-muted-foreground leading-relaxed mb-4">{service.description}</p>

                  <div className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${cl.bg} ${cl.text}`}>
                    {service.stat}
                  </div>

                  <div className={`absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 ${cl.text}`}>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Row 2: 4 smaller cards */}
          {services.slice(2).map((service, index) => {
            const Icon = service.icon
            const cl = accentClasses(service.accent)
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 2) * 0.08, duration: 0.5 }}
                onClick={scrollToContact}
                className="bento-small group relative bg-card clean-border rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:elevated-shadow transition-all duration-300"
              >
                {/* Image — shorter */}
                <div className="h-32 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                </div>

                <div className="p-6 relative">
                  <div className={`absolute inset-0 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${cl.fill}`} />

                  <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${cl.bg} ${cl.text}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="relative text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="relative text-muted-foreground text-sm leading-relaxed mb-3">{service.description}</p>

                  <div className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cl.bg} ${cl.text}`}>
                    {service.stat}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-card clean-border rounded-2xl p-6 sm:p-8">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-foreground mb-1">Not sure where to start?</p>
              <p className="text-muted-foreground">Book a free consultation and we'll map out your automation opportunities.</p>
            </div>
            <Button onClick={scrollToContact} size="lg" className="whitespace-nowrap">
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
