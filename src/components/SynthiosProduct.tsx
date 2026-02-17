'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Brain, MessageSquare, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

const capabilities = [
  {
    icon: Brain,
    title: 'Persistent Memory',
    description: 'Learns your business over time. Every conversation, every decision, every preference — remembered and used.',
  },
  {
    icon: MessageSquare,
    title: 'Works Where You Work',
    description: 'Connect through Telegram, WhatsApp, Discord, or email. No new apps to learn.',
  },
  {
    icon: Clock,
    title: 'Always On',
    description: 'Runs 24/7 without the 24/7 payroll. Handles coordination, follow-ups, and scheduling around the clock.',
  },
  {
    icon: TrendingUp,
    title: 'Gets Smarter Over Time',
    description: 'The longer SYNTHIOS runs, the better it understands your operation. It compounds — like a great employee that never stops learning.',
  },
]

export function SynthiosProduct() {
  const scrollToContact = () => {
    const contact = document.getElementById('contact')
    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="synthios" className="relative py-24 lg:py-32 bg-gradient-to-b from-background via-card/40 to-background overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-emerald/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent-emerald/10 text-accent-emerald px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            Our Flagship Product
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
            Meet{' '}
            <span className="text-accent-emerald">SYNTHIOS</span>
          </h2>

          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
            Intelligence that grows with your business.
          </p>

          <p className="text-base lg:text-lg text-muted-foreground/70 leading-relaxed max-w-2xl mx-auto">
            SYNTHIOS is a personal AI system that understands your business deeply — your customers, your processes, your priorities — and helps you operate at a level that wasn't possible before.
          </p>
        </motion.div>

        {/* Capability cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card clean-border rounded-2xl p-8 hover:elevated-shadow transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-emerald/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-accent-emerald" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {cap.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* What it handles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-card clean-border rounded-2xl p-8 lg:p-10">
            <h3 className="text-lg font-bold text-foreground mb-6 text-center">
              What SYNTHIOS handles for you
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Email triage and response drafting',
                'Calendar management and scheduling',
                'Customer follow-up sequences',
                'Daily briefings and task prioritization',
                'Meeting prep and note-taking',
                'Cross-platform coordination',
                'Data research and analysis',
                'Workflow automation and monitoring',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent-emerald" />
                  </div>
                  <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent-emerald hover:bg-accent-emerald/90 text-white px-8 py-6 rounded-xl"
              onClick={scrollToContact}
            >
              See SYNTHIOS in Action
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted px-8 py-6 rounded-xl"
              onClick={() => window.open('https://synthios.myhorizon.ai', '_blank')}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
