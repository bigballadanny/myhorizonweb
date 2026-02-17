'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, Network, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

const possibilities = [
  {
    number: '01',
    icon: Brain,
    today: 'You ask ChatGPT for help — and it gives you great answers. But tomorrow, it\'s forgotten everything.',
    tomorrow:
      'What if your AI remembered every conversation, every customer preference, every decision you\'ve ever made — and used all of it to help you better every single day?',
    accent: 'accent-blue',
  },
  {
    number: '02',
    icon: Network,
    today: 'You\'ve automated a few things — emails, maybe scheduling. But each tool lives on its own little island.',
    tomorrow:
      'What if your entire operation ran as one connected system? Your CRM talks to your calendar, your calendar talks to your AI, and your AI handles the follow-ups — automatically.',
    accent: 'accent-purple',
  },
  {
    number: '03',
    icon: Sparkles,
    today: 'Your team is talented. But they spend hours every week on work that\'s important, just... repetitive.',
    tomorrow:
      'What if AI handled the routine — the data entry, the scheduling, the first-pass analysis — so your people could focus entirely on the work that actually grows your business?',
    accent: 'accent-emerald',
  },
]

export function Problem() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-blue/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-accent-blue/80 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-white/40 tracking-wide uppercase">
              The Bigger Picture
            </span>
            <div className="w-3 h-3 bg-accent-emerald/80 rounded-full animate-pulse" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
            You're Already Using AI.{' '}
            <span className="text-gradient-blue">Here's What Comes Next.</span>
          </h2>

          <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto">
            If you're getting real value from ChatGPT or other AI tools — and most business owners are — imagine what becomes possible when that intelligence is woven into your actual operations.
          </p>
        </motion.div>

        {/* Possibility cards */}
        <div className="space-y-6 max-w-4xl mx-auto mb-20">
          {possibilities.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.55 }}
                className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 lg:p-10 hover:border-white/[0.14] transition-all duration-300"
              >
                {/* Step indicator */}
                <div className={`absolute -top-3.5 left-8 px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                  item.accent === 'accent-blue'
                    ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/25'
                    : item.accent === 'accent-purple'
                    ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/25'
                    : 'bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/25'
                }`}>
                  {item.number}
                </div>

                <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start pt-2">
                  {/* Left — where you are now */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">Where you are</span>
                    </div>
                    <p className="text-white/50 leading-relaxed text-[15px]">
                      {item.today}
                    </p>
                  </div>

                  {/* Arrow / Divider */}
                  <div className="hidden lg:flex items-center justify-center self-stretch">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.accent === 'accent-blue' ? 'bg-accent-blue/10' :
                      item.accent === 'accent-purple' ? 'bg-accent-purple/10' :
                      'bg-accent-emerald/10'
                    }`}>
                      <ArrowRight className={`w-5 h-5 ${
                        item.accent === 'accent-blue' ? 'text-accent-blue' :
                        item.accent === 'accent-purple' ? 'text-accent-purple' :
                        'text-accent-emerald'
                      }`} />
                    </div>
                  </div>

                  {/* Right — what's possible */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`w-4 h-4 ${
                        item.accent === 'accent-blue' ? 'text-accent-blue' :
                        item.accent === 'accent-purple' ? 'text-accent-purple' :
                        'text-accent-emerald'
                      }`} />
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        item.accent === 'accent-blue' ? 'text-accent-blue' :
                        item.accent === 'accent-purple' ? 'text-accent-purple' :
                        'text-accent-emerald'
                      }`}>What's possible</span>
                    </div>
                    <p className="text-white/75 leading-relaxed font-medium text-[15px]">
                      {item.tomorrow}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Invitation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center"
        >
          <div className="inline-block bg-white/[0.03] border border-white/[0.08] rounded-2xl px-10 py-10 max-w-2xl">
            <p className="text-xl sm:text-2xl font-bold text-white/90 mb-3 leading-snug">
              The businesses that figure this out first will have an incredible advantage — and it's still early.
            </p>
            <p className="text-white/45 mb-8 text-base leading-relaxed">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
