'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Start Your Trial',
    description:
      'Sign up at go.synthios.ai and start your 5-day free trial. No setup fee. Your agent team starts with your real work, not a demo.',
    cardBg: 'bg-card/40',
  },
  {
    number: '02',
    title: 'Connect Your Tools',
    description:
      'Link the email, calendar, and apps you already run on. Synthios connects inside the AI assistant you already use.',
    cardBg: 'bg-card/55',
  },
  {
    number: '03',
    title: 'Teach It Your Business',
    description:
      'Your customers, your prices, your way of working. Synthios remembers all of it, so every answer and follow-up sounds like you.',
    cardBg: 'bg-card/75',
  },
  {
    number: '04',
    title: 'Grow the Team',
    description:
      'It gets sharper every week it runs. When your people need their own agents, add team seats at $100 per seat per month.',
    cardBg: 'bg-card/90',
  },
]

export function Process() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">

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
              Live in days, not months
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Four steps from signup to an AI team that knows your business. No install project. Nothing new to maintain.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.12, duration: 0.55 }}
                className={`relative rounded-2xl p-7 border border-border/60 ${step.cardBg}`}
              >
                {/* Large ghost number — behind the title */}
                <div className="relative mb-5">
                  <span className="font-serif text-5xl text-accent-blue/20 leading-none select-none">
                    {step.number}
                  </span>
                </div>

                {/* Step number circle — compact, sits on top */}
                <div className="relative z-10 inline-flex items-center justify-center w-10 h-10 mb-5 bg-background border border-border rounded-full">
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
            asChild
            className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl"
          >
            <a href="https://go.synthios.ai">
              Start your 5-day free trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          <p className="text-muted-foreground text-sm mt-3">No setup fee. Cancel anytime.</p>
        </motion.div>

      </div>
    </section>
  )
}
