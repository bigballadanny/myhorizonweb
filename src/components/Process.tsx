'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Strategy Call',
    description:
      'We map your business processes and identify the highest-ROI automation opportunities. Free, no strings attached.',
  },
  {
    number: '02',
    title: 'Custom Build',
    description:
      'Our team architects and deploys AI systems tailored to your exact workflows. No templates. No one-size-fits-all.',
  },
  {
    number: '03',
    title: 'Launch & Scale',
    description:
      'Go live with full support. Your AI systems compound value every day they run — getting smarter over time.',
  },
]

export function Process() {
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
          <p className="section-label mb-6">Our Process</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From first call to live AI system — a clear, simple path to real results.
            </p>
          </div>
        </motion.div>

        {/* Steps — horizontal on desktop */}
        <div className="relative mb-20">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-border pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.55 }}
                className="relative"
              >
                {/* Step number — sits on the connecting line */}
                <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 mb-8 bg-background border border-border rounded-full">
                  <span className="section-label text-foreground" style={{ letterSpacing: '0' }}>{step.number}</span>
                </div>

                <h3 className="font-serif text-2xl text-foreground mb-4">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl"
          >
            Start with a Free Strategy Call
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-muted-foreground text-sm mt-3">No commitment. No pressure. Just clarity.</p>
        </motion.div>

      </div>
    </section>
  )
}
