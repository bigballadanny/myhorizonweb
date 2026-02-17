'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

const industries = [
  {
    emoji: '🏗️',
    name: 'Roofing & Construction',
    tagline: 'Lead gen that books jobs while you sleep.',
  },
  {
    emoji: '💆',
    name: 'Med Spas & Aesthetics',
    tagline: 'Automated booking, follow-ups, and patient retention.',
  },
  {
    emoji: '🍽️',
    name: 'Restaurants & Hospitality',
    tagline: 'Smart ordering, staff scheduling, and review management.',
  },
  {
    emoji: '🏠',
    name: 'Real Estate',
    tagline: 'AI agents that qualify leads and schedule showings 24/7.',
  },
  {
    emoji: '⚖️',
    name: 'Legal & Professional Services',
    tagline: 'Document automation, client intake, and case management.',
  },
  {
    emoji: '🛒',
    name: 'E-Commerce',
    tagline: 'AI-driven inventory, customer service, and marketing automation.',
  },
]

export function Industries() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="industries" className="py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-6">Industries We Serve</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              Built for your industry
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've built AI systems across dozens of verticals. Chances are, we know yours.
            </p>
          </div>
        </motion.div>

        {/* Industry grid — clean text blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              onClick={scrollToContact}
              className="group border-t border-border py-8 pr-8 cursor-pointer hover:bg-card/60 transition-colors duration-200 -mx-0"
            >
              <span className="text-3xl mb-4 block">{industry.emoji}</span>
              <h3 className="font-serif text-xl text-foreground mb-2 leading-snug group-hover:text-accent-blue transition-colors duration-200">
                {industry.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {industry.tagline}
              </p>
            </motion.div>
          ))}
          <div className="col-span-full border-t border-border" />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
