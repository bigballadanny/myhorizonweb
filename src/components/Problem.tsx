'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

const possibilities = [
  {
    number: '01',
    today: "You're already using ChatGPT and getting real value. But every conversation starts from scratch — it doesn't remember you.",
    tomorrow:
      'What if your AI remembered every conversation, every customer preference, every decision you\'ve ever made — and used all of it to help you better, every single day?',
  },
  {
    number: '02',
    today: "You've automated a few things — maybe emails or scheduling. But each tool is on its own island, disconnected from everything else.",
    tomorrow:
      'What if your entire operation ran as one connected system? CRM talks to calendar, calendar talks to AI, and your AI handles follow-ups — automatically.',
  },
  {
    number: '03',
    today: 'Your team is talented. But hours every week go to work that\'s important, just repetitive — data entry, scheduling, first-pass drafts.',
    tomorrow:
      'What if AI handled all of that, so your people could focus entirely on the work that actually grows your business?',
  },
]

export function Problem() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-5">The Bigger Picture</p>
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
              You're already using AI. Here's{' '}
              <span className="text-highlight">what comes next.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              If you're getting real value from AI tools — and most business owners are — imagine what becomes possible when that intelligence is woven into your actual operations.
            </p>
          </div>
        </motion.div>

        {/* Possibility items */}
        <div className="space-y-0 max-w-4xl mb-14">
          {possibilities.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="border-t border-border py-9"
            >
              <div className="grid lg:grid-cols-[72px_1fr_1fr] gap-5 lg:gap-8 items-start">
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
                  <p className="section-label mb-3" style={{ color: 'var(--accent-blue)' }}>What's possible</p>
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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="font-serif text-2xl sm:text-3xl text-foreground mb-4 max-w-2xl leading-snug">
            The businesses that figure this out first will have an incredible advantage — and it's still early.
          </p>
          <p className="text-muted-foreground mb-7 max-w-lg leading-relaxed">
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
