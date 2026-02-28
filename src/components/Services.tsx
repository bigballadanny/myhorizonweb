'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Bot, Workflow, BarChart3, Megaphone, LineChart, Layers } from 'lucide-react'
import { Button } from './ui/button'
import serviceAgentsImg from '@/assets/service-agents-web.jpg'
import serviceWorkflowsImg from '@/assets/service-workflows-web.jpg'
import serviceCrmImg from '@/assets/service-crm-web.jpg'

const featuredServices = [
  {
    id: 'agents',
    icon: Bot,
    number: '01',
    title: 'AI Agents & Voice Systems',
    description:
      'Autonomous agents that handle customer conversations, qualify leads, and execute tasks around the clock. Your business stays responsive whether your team is in the office or not.',
    detail: 'Handles inbound inquiries, books appointments, answers FAQs, and escalates complex issues — all without human intervention.',
    image: serviceAgentsImg,
    imageAlt: 'AI Agents & Voice Systems',
    flip: false,
  },
  {
    id: 'workflow',
    icon: Workflow,
    number: '02',
    title: 'Intelligent Workflows',
    description:
      'AI-driven process automation that connects your systems and makes real-time decisions across your business. When one thing happens, the right things follow — automatically.',
    detail: 'Connects your CRM, calendar, email, and ops tools into a single intelligent layer that runs itself.',
    image: serviceWorkflowsImg,
    imageAlt: 'Intelligent Workflows',
    flip: true,
  },
  {
    id: 'crm',
    icon: BarChart3,
    number: '03',
    title: 'CRM & Pipeline Automation',
    description:
      'Smart lead scoring, automated nurturing, and pipeline optimization built around how your sales team actually works. Fewer dropped balls, more closed deals.',
    detail: 'AI that qualifies leads, triggers follow-ups at the right moment, and surfaces who\'s most likely to convert.',
    image: serviceCrmImg,
    imageAlt: 'CRM & Pipeline Automation',
    flip: false,
  },
]

const additionalServices = [
  {
    id: 'content',
    icon: Megaphone,
    title: 'Content & Marketing AI',
    description: 'Multi-agent systems that create, schedule, and optimize content across every channel you use.',
  },
  {
    id: 'analytics',
    icon: LineChart,
    title: 'AI Analytics & Insights',
    description: 'Intelligent reporting that surfaces what matters and triggers automated actions — no analyst required.',
  },
  {
    id: 'custom',
    icon: Layers,
    title: 'Custom AI Systems',
    description: 'Full-stack AI infrastructure — agents, automations, and workflows — architected around your exact business.',
  },
]

export function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-5">What We Build</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] mb-5 tracking-tight">
              AI Systems That Work for You
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From voice agents to full automation stacks — we build the infrastructure that runs your business while you focus on growing it.
            </p>
          </div>
        </motion.div>

        {/* Featured services — alternating editorial layout */}
        <div className="space-y-0 mb-16">
          {featuredServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-border py-12 lg:py-16"
              >
                <div className={`grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center ${service.flip ? 'lg:[direction:rtl]' : ''}`}>
                  {/* Text column */}
                  <div className={service.flip ? 'lg:[direction:ltr]' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="section-label">{service.number}</span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-4 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-md">
                      {service.description}
                    </p>
                    <button
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-2 text-accent-blue text-sm font-medium hover:gap-3 transition-all duration-200"
                    >
                      Talk to us about this
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image column */}
                  <div className={`${service.flip ? 'lg:[direction:ltr]' : ''} flex items-start`}>
                    <div className="rounded-2xl overflow-hidden bg-card aspect-[4/3] w-full">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          <div className="border-t border-border" />
        </div>

        {/* Additional services — compact horizontal list */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-8">More Capabilities</p>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  onClick={scrollToContact}
                  className="premium-hover rounded-2xl cursor-pointer group p-8 lg:p-10 border border-border/50 bg-card/30"
                >
                  <div className="w-[50px] h-[50px] rounded-[14px] bg-background border border-border/80 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <h3 className="font-sans font-medium text-foreground mb-3 text-lg group-hover:text-accent-blue transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
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
