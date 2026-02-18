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
  },
  {
    number: '02',
    title: 'Custom Strategy',
    description:
      'Our team architects a system tailored to your exact workflows. No templates, no one-size-fits-all. Built around how you actually operate.',
  },
  {
    number: '03',
    title: 'Launch & Optimize',
    description:
      'Go live with full support. Your AI systems compound value every day they run — getting smarter, saving more time, and closing more business.',
  },
]

export function Process() {
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
          <p className="section-label mb-5">How It Works</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
              From conversation to live AI system
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A clear, simple path. No jargon, no complexity — just real progress.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-14">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-border pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.12, duration: 0.55 }}
                className="relative"
              >
                {/* Step number — sits on the connecting line */}
                <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 mb-7 bg-background border border-border rounded-full">
                  <span className="section-label text-foreground" style={{ letterSpacing: '0' }}>{step.number}</span>
                </div>

                <h3 className="font-serif text-2xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
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
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl"
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
