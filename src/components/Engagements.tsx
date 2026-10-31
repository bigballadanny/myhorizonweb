'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { SIGNUP_URL } from '../data/pricing'
import { smoothScrollTo } from '../hooks/useSmoothScroll'

const steps = [
  {
    number: '01',
    title: 'We map it first',
    description:
      'Every build starts with a free 30 minute consultation. We look at how your business actually runs and find where AI pays for itself fastest. You leave with a clear map of the opportunity, whether we build anything or not.',
    cardBg: 'bg-card/40',
  },
  {
    number: '02',
    title: 'You get a fixed scope',
    description:
      'We write down what gets built, what it connects to, and what it costs. Custom work is scoped and priced per project, and the price is agreed before we start. No open ended engagement, no surprise hours.',
    cardBg: 'bg-card/55',
  },
  {
    number: '03',
    title: 'We build on your workflows',
    description:
      'We build around how your team already works and connect the tools you already run on. Your people do not have to learn a new platform or change how they operate to get the benefit.',
    cardBg: 'bg-card/75',
  },
  {
    number: '04',
    title: 'It goes live on real work',
    description:
      'The system launches on your actual operation, not a demo environment. From there it does the job it was built for: answering, following up, and keeping things moving while your team does the work only people can do.',
    cardBg: 'bg-card/90',
  },
]

export function Engagements() {
  return (
    <section id="engagements" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-5">How Engagements Work</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
              A build is a project, not a subscription
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If the job is a custom build, here is exactly how it runs, so you know what you are signing up for before anything starts.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-14">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.12, duration: 0.55 }}
              className={`relative rounded-2xl p-7 border border-border/60 ${step.cardBg}`}
            >
              <div className="relative mb-5">
                <span className="font-serif text-5xl text-accent-blue/20 leading-none select-none">
                  {step.number}
                </span>
              </div>
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center gap-5"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl"
            onClick={() => smoothScrollTo('contact')}
          >
            Book a free consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Rather start with the product?{' '}
            <a href={SIGNUP_URL} className="text-accent-blue font-medium hover:underline">
              Start the 5-day free trial
            </a>{' '}
            and be live this week.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
