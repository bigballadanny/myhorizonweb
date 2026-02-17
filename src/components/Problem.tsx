'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

const possibilities = [
  {
    number: '01',
    today: "You ask ChatGPT for help — and it gives you great answers. But tomorrow, it's forgotten everything.",
    tomorrow:
      "What if your AI remembered every conversation, every customer preference, every decision you've ever made — and used all of it to help you better every single day?",
  },
  {
    number: '02',
    today: "You've automated a few things — emails, maybe scheduling. But each tool lives on its own little island.",
    tomorrow:
      'What if your entire operation ran as one connected system? Your CRM talks to your calendar, your calendar talks to your AI, and your AI handles the follow-ups — automatically.',
  },
  {
    number: '03',
    today: 'Your team is talented. But they spend hours every week on work that\'s important, just... repetitive.',
    tomorrow:
      'What if AI handled the routine — the data entry, the scheduling, the first-pass analysis — so your people could focus entirely on the work that actually grows your business?',
  },
]

export function Problem() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-32 lg:py-40 bg-card">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="section-label mb-6">The Bigger Picture</p>
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              You're already using AI. Here's <span className="text-highlight">what comes next.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              If you're getting real value from ChatGPT or other AI tools — and most business owners are — imagine what becomes possible when that intelligence is woven into your actual operations.
            </p>
          </div>
        </motion.div>

        {/* Possibility items */}
        <div className="space-y-0 max-w-4xl mb-20">
          {possibilities.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.55 }}
              className="border-t border-border py-10"
            >
              <div className="grid lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-10 items-start">
                {/* Number */}
                <p className="section-label pt-0.5">{item.number}</p>

                {/* Where you are */}
                <div>
                  <p className="section-label mb-3">Where you are</p>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {item.today}
                  </p>
                </div>

                {/* What's possible */}
                <div>
                  <p className="section-label mb-3 text-accent-blue" style={{ color: 'var(--accent-blue)' }}>What's possible</p>
                  <p className="text-foreground leading-relaxed text-[15px]">
                    {item.tomorrow}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="font-serif text-2xl sm:text-3xl text-foreground mb-4 max-w-2xl leading-snug">
            The businesses that figure this out first will have an incredible advantage — and it's still early.
          </p>
          <p className="text-muted-foreground mb-8 max-w-lg leading-relaxed">
            We help you see exactly where AI fits into your operation, and then we build it. One conversation is all it takes to start.
          </p>
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl"
          >
            Let's Map It Out Together
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
