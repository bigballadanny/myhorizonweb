'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import serviceAgents from '@/assets/service-ai-agents.png'
import serviceWorkflows from '@/assets/service-workflows.png'
import serviceCrm from '@/assets/service-crm.png'
import serviceContent from '@/assets/service-content.png'
import serviceAnalytics from '@/assets/service-analytics.png'
import serviceCustom from '@/assets/service-custom.png'

const featuredServices = [
  {
    id: 'agents',
    title: 'AI Agents & Voice Systems',
    description:
      'Autonomous agents that handle customer conversations, qualify leads, and execute tasks around the clock. Your business stays responsive whether your team is in the office or not.',
    image: serviceAgents,
    flip: false,
  },
  {
    id: 'workflow',
    title: 'Intelligent Workflows',
    description:
      'AI-driven process automation that connects your systems and makes real-time decisions across your business. When one thing happens, the right things follow — automatically.',
    image: serviceWorkflows,
    flip: true,
  },
  {
    id: 'crm',
    title: 'CRM & Pipeline Automation',
    description:
      'Smart lead scoring, automated nurturing, and pipeline optimization built around how your sales team actually works. Fewer dropped balls, more closed deals.',
    image: serviceCrm,
    flip: false,
  },
]

const additionalServices = [
  {
    id: 'content',
    title: 'Content & Marketing AI',
    description: 'Multi-agent systems that create, schedule, and optimize content across every channel you use.',
    image: serviceContent,
  },
  {
    id: 'analytics',
    title: 'AI Analytics & Insights',
    description: 'Intelligent reporting that surfaces what matters and triggers automated actions — no analyst required.',
    image: serviceAnalytics,
  },
  {
    id: 'custom',
    title: 'Custom AI Systems',
    description: 'Full-stack AI infrastructure — agents, automations, and workflows — architected around your exact business.',
    image: serviceCustom,
  },
]

export function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <p className="section-label mb-6">What We Build</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              AI Systems That Work for You
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From voice agents to full automation stacks — we build the infrastructure that runs your business while you focus on growing it.
            </p>
          </div>
        </motion.div>

        {/* Featured services — alternating layout */}
        <div className="space-y-32 lg:space-y-40 mb-32">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Text — always first on mobile, alternates on desktop */}
              <div className={service.flip ? 'lg:order-2' : 'lg:order-1'}>
                <p className="section-label mb-4">0{index + 1}</p>
                <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-6 leading-snug">
                  {service.title}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  {service.description}
                </p>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 text-accent-blue text-sm font-medium hover:gap-3 transition-all duration-200"
                >
                  Learn more about this service
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Image */}
              <div className={service.flip ? 'lg:order-1' : 'lg:order-2'}>
                <div className="rounded-2xl overflow-hidden bg-card aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional services — compact vertical list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-border pt-20 mb-16"
        >
          <p className="section-label mb-10">More Capabilities</p>
          <div className="grid sm:grid-cols-3 gap-10">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={scrollToContact}
                className="cursor-pointer group"
              >
                <div className="aspect-[3/2] rounded-xl overflow-hidden bg-card mb-5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-sans font-medium text-foreground mb-2 text-base">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-foreground font-medium mb-3">Not sure where to start?</p>
          <p className="text-muted-foreground mb-6 max-w-md">
            Book a free consultation and we'll map out your automation opportunities together.
          </p>
          <Button onClick={scrollToContact} size="lg" className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl">
            Book a Free Consultation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
