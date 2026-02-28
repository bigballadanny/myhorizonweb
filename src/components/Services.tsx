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
    <section id="services" className="py-20 lg:py-32 relative z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-32 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-300">What We Build</span>
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] text-foreground leading-[1] mb-6 tracking-tight drop-shadow-xl max-w-4xl">
            Systems that <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-400 dark:from-white dark:to-zinc-500">think & execute.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed max-w-2xl drop-shadow-md">
            From autonomous voice agents to full pipeline infrastructure—we build the intelligence that runs your business natively.
          </p>
        </motion.div>

        {/* Featured services — Massive alternating floating cards */}
        <div className="space-y-24 lg:space-y-40 mb-32">
          {featuredServices.map((service, index) => {
            const Icon = service.icon
            // Slide in from left for even, right for odd
            const xInitial = service.flip ? 60 : -60

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40, x: xInitial }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className={`flex flex-col ${service.flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>

                  {/* Text Block - Floating Glass */}
                  <div className="w-full lg:w-1/2 relative z-10">
                    <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500">

                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                            <Icon className="w-6 h-6 text-zinc-300" />
                          </div>
                          <span className="text-sm font-bold tracking-widest text-zinc-500 font-mono">{service.number}</span>
                        </div>

                        <h3 className="font-serif text-4xl sm:text-5xl text-zinc-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                          {service.title}
                        </h3>

                        <p className="text-lg text-zinc-200 font-medium leading-relaxed mb-8 drop-shadow-sm">
                          {service.description}
                        </p>

                        <button
                          onClick={scrollToContact}
                          className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-medium hover:gap-4 transition-all duration-300 border-b border-transparent hover:border-zinc-900 dark:hover:border-white pb-1"
                        >
                          Explore Architecture
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Visual Block - Huge Editorial Image */}
                  <div className="w-full lg:w-1/2 relative">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-[2.5rem] overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 relative group"
                    >
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional services — Floating glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl text-zinc-900 dark:text-white mb-4">Ecosystem Integrations</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={scrollToContact}
                  className="rounded-[2rem] cursor-pointer group p-8 lg:p-10 border border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                >
                  <div className="w-[60px] h-[60px] rounded-[1rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                    <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-serif text-2xl text-zinc-900 dark:text-white mb-4 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-base text-zinc-300 font-medium leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-12 sm:p-20 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />
          <h2 className="font-serif text-3xl sm:text-5xl text-zinc-900 dark:text-white mb-6 tracking-tight relative z-10">Ready to build the future?</h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-100 font-medium mb-10 max-w-xl mx-auto relative z-10 drop-shadow-md">
            Book a free consultation and we'll map out your automation architecture together.
          </p>
          <Button onClick={scrollToContact} size="lg" className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 hover:scale-105 transition-all duration-300 px-10 py-7 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] relative z-10 font-semibold">
            Schedule Architecture Review
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
