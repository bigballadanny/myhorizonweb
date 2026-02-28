'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { HeroCapture } from './HeroCapture'
import flowBg from '@/assets/flow-bg.png'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Create a gentle parallax fade as the user scrolls down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 150])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080808]">

      {/* 1. Full-Bleed Fixed Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* The image itself */}
        <motion.div
          style={{ y: yOffset }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={flowBg}
            alt="Minimal flow background"
            className="w-full h-full object-cover object-center opacity-80"
          />
        </motion.div>

        {/* Vignette / Grain Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-[#080808]/30 pointer-events-none" />
      </div>

      {/* 2. Content Layer - Centered & High Impact */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-12 flex flex-col items-center text-center mt-12"
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 bg-card/40 backdrop-blur-md border border-border/50 px-4 py-2 rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-foreground/90">
            AntiGravity Automation
          </span>
        </motion.div>

        {/* Headline - Massive Editorial Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="font-serif text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.05] tracking-tight mb-6 max-w-4xl drop-shadow-2xl"
        >
          An agency that makes your{' '}
          <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">workflows flow.</em>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-base sm:text-lg lg:text-xl text-white font-medium leading-relaxed max-w-2xl mb-10 drop-shadow-xl saturate-150"
        >
          Hyper-realistic AI agents and immersive automation infrastructure for premium businesses. Not just answered questions—decisions made alongside your team.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <div className="flex flex-col w-full sm:w-auto items-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-foreground text-background hover:bg-zinc-200 hover:scale-105 px-8 py-6 rounded-full text-base font-semibold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              Book a Free Meeting
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-zinc-400 mt-3 hidden sm:block">
              Free 30-min call · No commitment
            </p>
          </div>

          <Button
            size="lg"
            variant="outline"
            onClick={scrollToServices}
            className="w-full sm:w-auto px-8 py-6 rounded-full text-base border-zinc-700 bg-black/20 backdrop-blur-md text-foreground hover:bg-white/10 transition-all duration-300 group"
          >
            <span className="mr-2">▶</span>
            See Our Work
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none z-10"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">Scroll to explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-zinc-400 to-transparent" />
      </motion.div>

    </div>
  )
}
