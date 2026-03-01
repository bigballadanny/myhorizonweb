'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import opportunityTransform from '@/assets/opportunity-transform.jpg'

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
    <section className="py-20 lg:py-24 relative z-10">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-300">The Bigger Picture</span>
          </div>
          <div className="max-w-4xl">
            <h2 className="font-serif text-5xl sm:text-6xl text-zinc-900 dark:text-white leading-[1.1] mb-6 tracking-tight drop-shadow-xl">
              You're already using AI. Here's{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-400 dark:from-white dark:to-zinc-500">what comes next.</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              If you're getting real value from AI tools — and most business owners are — imagine what becomes possible when that intelligence is woven right into your operations.
            </p>
          </div>
        </motion.div>

        {/* Banner image — full width */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="mb-12 aspect-[21/7] rounded-2xl overflow-hidden"
        >
          <img
            src={opportunityTransform}
            alt="AI transformation visualization"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Possibility items — Premium Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {possibilities.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[2rem] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <span className="text-sm font-bold tracking-widest text-zinc-500 font-mono mb-8 block">{item.number}</span>

                <div className="mb-8">
                  <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-3">Where you are</p>
                  <p className="text-zinc-300 dark:text-zinc-400 text-base leading-relaxed">
                    {item.today}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10">
                  <p className="text-xs font-medium tracking-widest uppercase text-zinc-800 dark:text-white mb-3">What's possible</p>
                  <p className="text-zinc-900 dark:text-white text-lg font-serif leading-relaxed">
                    {item.tomorrow}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-12 sm:p-16 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />
          <h2 className="font-serif text-3xl sm:text-4xl text-zinc-900 dark:text-white mb-6 max-w-2xl mx-auto leading-snug relative z-10 drop-shadow-md">
            The businesses that figure this out first will have an incredible advantage — and it's still early.
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-200 font-medium mb-10 max-w-xl mx-auto relative z-10 drop-shadow-md">
            We help you see exactly where AI fits into your operation, and then we build it. One conversation is all it takes to start.
          </p>
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 hover:scale-105 transition-all duration-300 px-10 py-7 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] relative z-10 font-semibold"
          >
            Let's Map It Out Together
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
