'use client'

import { motion } from 'framer-motion'
import { Phone, Wrench, Rocket } from 'lucide-react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Strategy Call',
    description:
      'We map your business processes and identify the highest-ROI automation opportunities. Free, no strings.',
    accent: 'accent-blue',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Custom Build',
    description:
      'Our team architects and deploys AI systems tailored to your exact workflows. No templates. No one-size-fits-all.',
    accent: 'accent-purple',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch & Scale',
    description:
      'Go live with full support. Your AI systems compound value every day they run — getting smarter over time.',
    accent: 'accent-emerald',
  },
]

export function Process() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-24 lg:py-32 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-background to-background pointer-events-none" />

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
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              Our Process
            </span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
            How It <span className="text-accent-emerald">Works</span>
          </h2>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From first call to live AI system — a clear, simple path to real results.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[4.5rem] left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-border to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-start">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.55 }}
                  className="relative flex flex-col items-center text-center lg:items-center"
                >
                  {/* Step number dot + icon */}
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center relative z-10 ${
                      step.accent === 'accent-blue' ? 'bg-accent-blue/10 ring-2 ring-accent-blue/30' :
                      step.accent === 'accent-purple' ? 'bg-accent-purple/10 ring-2 ring-accent-purple/30' :
                      'bg-accent-emerald/10 ring-2 ring-accent-emerald/30'
                    }`}>
                      <Icon className={`w-9 h-9 ${
                        step.accent === 'accent-blue' ? 'text-accent-blue' :
                        step.accent === 'accent-purple' ? 'text-accent-purple' :
                        'text-accent-emerald'
                      }`} />
                    </div>
                    {/* Step number badge */}
                    <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white z-20 ${
                      step.accent === 'accent-blue' ? 'bg-accent-blue' :
                      step.accent === 'accent-purple' ? 'bg-accent-purple' :
                      'bg-accent-emerald'
                    }`}>
                      {step.number.slice(-1)}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>

                  {/* Vertical connector — mobile only */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden w-px h-10 bg-border mt-8" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
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
