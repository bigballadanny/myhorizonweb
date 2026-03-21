'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { HeroCapture } from './HeroCapture'
import heroAbstract from '@/assets/hero-web.jpg'

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
    <div className="relative min-h-screen w-full bg-background flex items-center">
      {/* Animated gradient mesh — subtle Stripe-style depth */}
      <div className="hero-gradient-mesh" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* Left — text column */}
          <div>
            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="section-label mb-8"
            >
              SYNTHIOS BY MYHORIZON AI
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-8"
            >
              Your business runs 24/7. Your team doesn't. <em className="not-italic"><span className="text-highlight">Now it can.</span></em>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mb-10"
            >
              SYNTHIOS is the AI infrastructure that remembers every customer, executes every follow-up, and never misses a lead — while you focus on the work only you can do.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mb-12"
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl text-base transition-all duration-200"
              >
                See SYNTHIOS in Action
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToServices}
                className="w-full sm:w-auto px-8 py-6 rounded-xl text-base border-border text-foreground hover:bg-card transition-all duration-200"
              >
                Get Your Free AI Roadmap
              </Button>
            </motion.div>

            {/* Hero email capture — catches the 90% who never scroll */}
            <div className="border-t border-border/40 pt-4 mt-2">
              <p className="text-sm text-muted-foreground mb-0.5">
                Not ready to book? Get a free AI game plan for your business:
              </p>
              <HeroCapture />
            </div>

            {/* Social proof — simple text line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm text-muted-foreground mt-5"
            >
              Working with businesses in M&A, financial services, construction, healthcare, and more
            </motion.p>
          </div>

          {/* Right — visual column (desktop: side-by-side; mobile: stacked below text) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="block"
          >
            <div className="relative">
              <img
                src={heroAbstract}
                alt="AI systems visualization"
                className="w-full rounded-2xl object-cover aspect-video lg:aspect-auto lg:h-auto"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
