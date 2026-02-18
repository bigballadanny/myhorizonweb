'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import heroAbstract from '@/assets/hero-abstract-new.png'

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen w-full bg-background flex items-center overflow-hidden">
      {/* Animated gradient mesh — subtle Stripe-style depth */}
      <div className="hero-gradient-mesh" />

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text column */}
          <div>
            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="section-label mb-8"
            >
              AI Systems for Business
            </motion.p>

            {/* Headline — with keyword highlight */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-8"
            >
              What if AI actually{' '}
              <em className="not-italic"><span className="text-highlight">understood</span></em>{' '}
              your business?
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mb-10"
            >
              Not just answered questions — but remembered your customers, managed your operations, and made decisions alongside your team.{' '}
              <span className="text-foreground font-medium">That's what we build.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-3 mb-12"
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl text-base transition-all duration-200"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToServices}
                className="px-8 py-6 rounded-xl text-base border-border text-foreground hover:bg-card transition-all duration-200"
              >
                See What We Build
              </Button>
            </motion.div>

            {/* Social proof — simple text line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm text-muted-foreground"
            >
              Working with businesses in M&A, financial services, construction, healthcare, and more
            </motion.p>
          </div>

          {/* Right — visual column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src={heroAbstract}
                alt="AI systems visualization"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
