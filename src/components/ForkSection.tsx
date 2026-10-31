'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from './ui/button'
import { SIGNUP_URL } from '../data/pricing'
import { smoothScrollTo } from '../hooks/useSmoothScroll'

const appFit = [
  'You want an AI team running this week, not a project on a roadmap.',
  'Your pain is missed calls, slow follow-up, and work that lives in your head.',
  'You already use an AI assistant and want it to actually know your business.',
]

const customFit = [
  'You need AI wired into systems nobody else runs.',
  'You are buying or rolling up businesses and need diligence and operations tooling.',
  'The job is a build, not a subscription.',
]

export function ForkSection() {
  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-5">Which One Is You?</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight max-w-2xl">
            Two ways in. Pick the one that fits.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl">
          {/* Synthios app */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-accent-blue bg-background p-8"
          >
            <h3 className="font-serif text-2xl text-foreground mb-6">
              The Synthios app is right for you if:
            </h3>
            <div className="space-y-4 mb-8">
              {appFit.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent-blue" />
                  </div>
                  <span className="text-foreground text-[15px] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <Button size="lg" asChild className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl">
              <a href={SIGNUP_URL}>
                Start your 5-day free trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>

          {/* Custom build */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-background p-8"
          >
            <h3 className="font-serif text-2xl text-foreground mb-6">
              A custom build is right for you if:
            </h3>
            <div className="space-y-4 mb-8">
              {customFit.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent-blue" />
                  </div>
                  <span className="text-foreground text-[15px] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border hover:bg-card px-8 py-6 rounded-xl"
              onClick={() => smoothScrollTo('contact')}
            >
              Book a free consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
