'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

const industries = [
  {
    emoji: '🏗️',
    name: 'Roofing & Construction',
    tagline: 'AI-powered lead gen that books jobs while you sleep',
    accent: 'accent-blue',
  },
  {
    emoji: '💆',
    name: 'Med Spas & Aesthetics',
    tagline: 'Automated booking, follow-ups, and patient retention',
    accent: 'accent-purple',
  },
  {
    emoji: '🍽️',
    name: 'Restaurants & Hospitality',
    tagline: 'Smart ordering, staff scheduling, and review management',
    accent: 'accent-emerald',
  },
  {
    emoji: '🏠',
    name: 'Real Estate',
    tagline: 'AI agents that qualify leads and schedule showings 24/7',
    accent: 'accent-blue',
  },
  {
    emoji: '⚖️',
    name: 'Legal & Professional Services',
    tagline: 'Document automation, client intake, and case management',
    accent: 'accent-purple',
  },
  {
    emoji: '🛒',
    name: 'E-Commerce',
    tagline: 'AI-driven inventory, customer service, and marketing automation',
    accent: 'accent-emerald',
  },
]

export function Industries() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="industries" className="relative py-24 lg:py-32 bg-background">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              Industries We Serve
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
            Built for <span className="text-accent-purple">Your Industry</span>
          </h2>

          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We've built AI systems across dozens of verticals. Chances are, we know yours.
          </p>
        </motion.div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              onClick={scrollToContact}
              className="group relative bg-card clean-border rounded-2xl p-7 cursor-pointer hover:-translate-y-1 hover:elevated-shadow transition-all duration-300"
            >
              {/* Hover accent fill */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                industry.accent === 'accent-blue' ? 'bg-accent-blue/4' :
                industry.accent === 'accent-emerald' ? 'bg-accent-emerald/4' :
                'bg-accent-purple/4'
              }`} />

              {/* Emoji */}
              <div className="text-4xl mb-4">{industry.emoji}</div>

              {/* Industry name */}
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-foreground transition-colors">
                {industry.name}
              </h3>

              {/* Tagline */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {industry.tagline}
              </p>

              {/* Arrow on hover */}
              <div className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className={`w-4 h-4 ${
                  industry.accent === 'accent-blue' ? 'text-accent-blue' :
                  industry.accent === 'accent-emerald' ? 'text-accent-emerald' :
                  'text-accent-purple'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-card clean-border rounded-2xl px-8 py-6">
            <p className="text-foreground font-medium">
              Don't see your industry? We build custom solutions.
            </p>
            <Button
              onClick={scrollToContact}
              className="whitespace-nowrap"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
