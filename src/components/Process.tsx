'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'We map your business processes and identify the highest-ROI automation opportunities. Free, no strings attached.',
    // Lightest background
    cardBg: 'bg-card/40',
  },
  {
    number: '02',
    title: 'Custom Strategy',
    description:
      'Our team architects a system tailored to your exact workflows. No templates, no one-size-fits-all. Built around how you actually operate.',
    cardBg: 'bg-card/65',
  },
  {
    number: '03',
    title: 'Launch & Optimize',
    description:
      'Go live with full support. Your AI systems compound value every day they run — getting smarter, saving more time, and closing more business.',
    // Slightly darker
    cardBg: 'bg-card/90',
  },
]

export function Process() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 lg:py-32 relative z-10">
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
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-300">How We Work</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-6 max-w-3xl drop-shadow-xl">
            From architecture to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">autonomous execution.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-200 leading-relaxed max-w-2xl drop-shadow-md">
            A precise, engineering-first approach to building your AI infrastructure. No guesswork, just scalable systems.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-14">
          {/* Dashed connecting line — desktop only, sits between steps */}
          <div className="hidden lg:block absolute top-10 left-[calc(33.333%+1.5rem)] right-[calc(33.333%+1.5rem)] border-t-2 border-dashed border-border pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="premium-hover h-full p-8 sm:p-10 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden group"
              >
                {/* Large ghost number — behind the title */}
                <div className="relative mb-5">
                  <span className="font-serif text-5xl text-accent-blue/20 leading-none select-none">
                    {step.number}
                  </span>
                </div>

                {/* Step number circle — compact, sits on top */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                  <span className="section-label text-zinc-400 group-hover:text-white transition-colors" style={{ letterSpacing: '0' }}>{step.number}</span>
                </div>

                <h3 className="font-serif text-2xl text-white mb-3 drop-shadow-sm">
                  {step.title}
                </h3>
                <p className="text-base text-zinc-200 leading-relaxed drop-shadow-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl"
          >
            Start with a Free Discovery Call
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-muted-foreground text-sm mt-3">No commitment. No pressure. Just clarity.</p>
        </motion.div>

      </div>
    </section>
  )
}
