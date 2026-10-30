'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import heroSynthiosDragon from '@/assets/hero-synthios-dragon.jpg'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const painWords = 'Missed calls. Missed follow-ups. Lost jobs.'.split(' ')

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative w-full bg-background flex items-center overflow-hidden">
      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — text column */}
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="section-label mb-8"
            >
              SYNTHIOS BY MYHORIZON
            </motion.p>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              {painWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: reduceMotion ? 0 : 0.08 + i * 0.05, ease: EASE_OUT }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: reduceMotion ? 0 : 0.45, ease: EASE_OUT }}
              className="font-serif text-2xl sm:text-3xl text-accent-blue leading-snug mb-8"
            >
              It is not a people problem. It is a systems problem.
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: reduceMotion ? 0 : 0.55, ease: EASE_OUT }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mb-10"
            >
              Synthios is an AI agent team for owners whose business runs on referrals and response time. It answers every call and message, follows up until the job books or dies, and remembers every customer.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: reduceMotion ? 0 : 0.65, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mb-8"
            >
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl text-base transition-colors duration-200"
              >
                <a href="https://go.synthios.ai">
                  Start your 5-day free trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto px-8 py-6 rounded-xl text-base border-border text-foreground hover:bg-card transition-colors duration-200"
              >
                <Link to="/pricing">See plans and pricing</Link>
              </Button>
            </motion.div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28, delay: reduceMotion ? 0 : 0.75, ease: EASE_OUT }}
              className="text-sm text-muted-foreground"
            >
              Business $300/mo · Personal $100/mo · No setup fee · One subscription covers every business you own
            </motion.p>
          </div>

          {/* Right — Synthios mark, static poster */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.35, ease: EASE_OUT }}
            className="hidden lg:block"
          >
            <div className="relative w-full max-w-2xl mx-auto hero-image-mask">
              <img
                src={heroSynthiosDragon}
                alt="Synthios"
                width={1264}
                height={848}
                loading="eager"
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
