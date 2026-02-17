'use client'

import { motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const traps = [
  {
    number: '01',
    mistake: 'Buying disconnected tools that don\'t talk to each other',
    reality:
      'Zapier, Make, 10 SaaS subscriptions — and still doing things manually. Tools aren\'t systems. They\'re just more things to manage.',
    fix: 'We architect everything to work together from day one. One system, not a pile of integrations.',
    accent: 'accent-blue',
  },
  {
    number: '02',
    mistake: 'Hiring agencies that build demos, not real systems',
    reality:
      'You get a slick presentation, a proof-of-concept that works once, and then a handoff with no ongoing support. Six months later, nothing\'s running.',
    fix: 'We build for production — not demos. Everything we deploy runs, gets monitored, and compounds over time.',
    accent: 'accent-purple',
  },
  {
    number: '03',
    mistake: 'Trying to DIY with ChatGPT and duct tape',
    reality:
      'You spent 40 hours building a workflow that breaks every other week. AI is powerful — but only when it\'s engineered properly for your specific business.',
    fix: 'We handle the engineering. You focus on running your business. That\'s the deal.',
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
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-purple/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

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
            <div className="w-3 h-3 bg-red-500/80 rounded-full" />
            <span className="text-sm font-semibold text-white/40 tracking-wide uppercase">
              The Problem
            </span>
            <div className="w-3 h-3 bg-red-500/80 rounded-full" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
            Why Most AI Projects{' '}
            <span className="text-red-400">Fail</span>
          </h2>

          <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto">
            It's not that AI doesn't work. It's that most businesses approach it the wrong way.
            Here are the three mistakes we see every single week.
          </p>
        </motion.div>

        {/* Mistake cards */}
        <div className="space-y-6 max-w-4xl mx-auto mb-20">
          {traps.map((trap, index) => (
            <motion.div
              key={trap.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.55 }}
              className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 lg:p-10 hover:border-white/[0.14] transition-all duration-300"
            >
              {/* Step number */}
              <div className={`absolute -top-3.5 left-8 px-3 py-1 rounded-full text-xs font-black tracking-wider ${
                trap.accent === 'accent-blue' ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' :
                trap.accent === 'accent-purple' ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' :
                'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30'
              }`}>
                MISTAKE {trap.number}
              </div>

              <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-8 items-start pt-2">
                {/* Left — the problem */}
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {trap.mistake}
                    </h3>
                  </div>
                  <p className="text-white/50 leading-relaxed pl-9">
                    {trap.reality}
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-white/[0.08] self-stretch" />

                {/* Right — the fix */}
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      trap.accent === 'accent-blue' ? 'bg-accent-blue/15' :
                      trap.accent === 'accent-purple' ? 'bg-accent-purple/15' :
                      'bg-accent-emerald/15'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 ${
                        trap.accent === 'accent-blue' ? 'text-accent-blue' :
                        trap.accent === 'accent-purple' ? 'text-accent-purple' :
                        'text-accent-emerald'
                      }`} />
                    </div>
                    <span className={`text-sm font-bold tracking-wide uppercase ${
                      trap.accent === 'accent-blue' ? 'text-accent-blue' :
                      trap.accent === 'accent-purple' ? 'text-accent-purple' :
                      'text-accent-emerald'
                    }`}>
                      The MyHorizon Way
                    </span>
                  </div>
                  <p className="text-white/70 leading-relaxed pl-9 font-medium">
                    {trap.fix}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Positioning statement + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-block bg-white/[0.04] border border-white/[0.10] rounded-2xl px-10 py-10 max-w-2xl">
            <p className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
              "We build complete systems,{' '}
              <span className="text-accent-blue">not science projects.</span>"
            </p>
            <p className="text-white/50 mb-8 text-lg">
              Every engagement ends with something that runs, that's supported, and that gets better over time.
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl"
            >
              Let's Talk About Your Business
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
