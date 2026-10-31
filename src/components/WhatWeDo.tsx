'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { SIGNUP_URL } from '../data/pricing'
import { smoothScrollTo } from '../hooks/useSmoothScroll'

export function WhatWeDo() {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start max-w-6xl">

          {/* Label + headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-5">What MyHorizon Does</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
              An AI systems company, built for owners
            </h2>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              MyHorizon builds the layer that answers, follows up, remembers, and keeps the operation moving while you and your team do the actual work. Most businesses do not lose jobs on skill. They lose them on response time, on follow-up that never happened, on details that lived in one person's head. That is the layer we build.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              There are two ways to work with us. Synthios is our product. You subscribe, connect it inside the AI assistant you already use, and your agent team starts on your real work this week. Custom builds are the other path. We design and build a system around one business and one specific job, scoped and priced as a project.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-10">
              Either way, the point is the same. No lead waits. No follow-up depends on somebody remembering. Your customers hear back fast, and you get hours of your week back.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl text-base"
              >
                <a href={SIGNUP_URL}>
                  Start your 5-day free trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 rounded-xl text-base border-border text-foreground hover:bg-card"
                onClick={() => smoothScrollTo('engagements')}
              >
                See how a build works
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
