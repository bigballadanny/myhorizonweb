'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Wrench, HardHat, Briefcase, Home, Store } from 'lucide-react'
import { Button } from './ui/button'

const industries = [
  {
    icon: Sparkles,
    name: 'Med Spas & Aesthetics',
    tagline: 'Automated booking, follow-ups, and patient retention that keeps your chairs full.',
  },
  {
    icon: Wrench,
    name: 'Trades & Home Services',
    tagline: 'Lead gen that books jobs while you\'re on the job — no missed calls, no lost estimates.',
  },
  {
    icon: HardHat,
    name: 'Construction',
    tagline: 'Bid tracking, subcontractor coordination, and client updates running on autopilot.',
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    tagline: 'Client intake, document automation, and follow-up sequences built around how you work.',
  },
  {
    icon: Home,
    name: 'Real Estate',
    tagline: 'AI agents that qualify leads and schedule showings 24/7 — even when you\'re showing another property.',
  },
  {
    icon: Store,
    name: 'General Small Business',
    tagline: 'Custom AI systems built around your exact operation, whatever that looks like.',
  },
]

export function Industries() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="industries" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-5">Industries We Serve</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
              Built for your industry
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've built AI systems across dozens of verticals. Chances are, we know yours.
            </p>
          </div>
        </motion.div>

        {/* Industry grid — icon + text blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 mb-14">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                onClick={scrollToContact}
                className="group border-t border-border py-8 pr-6 cursor-pointer hover:bg-card/50 transition-colors duration-200 px-2"
              >
                <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center mb-5">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2 leading-snug group-hover:text-accent-blue transition-colors duration-200">
                  {industry.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {industry.tagline}
                </p>
              </motion.div>
            )
          })}
          <div className="col-span-full border-t border-border" />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-foreground font-medium mb-3">Don't see your industry?</p>
          <p className="text-muted-foreground mb-6 max-w-md">
            We build custom solutions for businesses of every kind.
          </p>
          <Button
            onClick={scrollToContact}
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-7 py-5 rounded-xl"
          >
            Let's Talk
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
