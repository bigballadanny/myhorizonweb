'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { plans, seatsLine, SIGNUP_URL } from '../data/pricing'

export function PricingSection() {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-5">Plans and Pricing</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
              One subscription. Every business you own.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Start with a 5-day free trial. No setup fee. Cancel anytime.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mb-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? 'border-accent-blue bg-card'
                  : 'border-border bg-card/50'
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block bg-accent-blue text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most popular
                </span>
              )}
              <p className="section-label mb-3">{plan.audience}</p>
              <h3 className="font-serif text-3xl text-foreground mb-2">{plan.name}</h3>
              <p className="mb-6">
                <span className="font-serif text-5xl text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.cadence}</span>
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px] mb-7">
                {plan.blurb}
              </p>
              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-blue" />
                    </div>
                    <span className="text-foreground text-[15px] leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                asChild
                className={`w-full px-8 py-6 rounded-xl ${
                  plan.highlighted
                    ? 'bg-accent-blue hover:bg-accent-blue/90 text-white'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
              >
                <a href={SIGNUP_URL}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <p className="text-muted-foreground text-[15px] leading-relaxed flex-1">{seatsLine}</p>
          <Button variant="outline" asChild className="border-border hover:bg-card px-6 py-5 rounded-xl shrink-0">
            <Link to="/pricing">Compare plans and read the FAQ</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
