'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'

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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Subtle grid overlay */}
      <div className="hero-grid-overlay" />

      {/* Radial glow accents */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent-purple/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Content — centered */}
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-5xl mx-auto pt-24 pb-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-accent-blue/15 border border-accent-blue/30 rounded-full text-accent-blue">
            <span className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-pulse" />
            AI Automation Agency
          </span>
        </motion.div>

        {/* Empathy-first headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight text-white mb-6"
        >
          Stop hiring for tasks{' '}
          <span className="text-gradient-blue">AI should</span>{' '}
          be doing.
        </motion.h1>

        {/* Empathy subhead — acknowledge the pain */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl lg:text-2xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-4"
        >
          You've tried the tools. You've hired the help. Things still fall through the cracks.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-xl mx-auto mb-12"
        >
          We build complete AI systems — not experiments — that run your business 24/7 and actually compound over time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-accent-blue hover:bg-accent-blue/90 text-white text-base px-9 py-6 rounded-xl shadow-lg shadow-accent-blue/25 transition-all duration-200 hover:shadow-accent-blue/40 hover:-translate-y-0.5"
          >
            Book Your Free Strategy Call
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToServices}
            className="text-base px-8 py-6 rounded-xl border-white/20 text-white/80 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
          >
            See What We Build
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-3 text-sm text-white/40"
        >
          <div className="flex -space-x-1.5">
            {['blue', 'emerald', 'purple', 'blue', 'emerald'].map((color, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold text-white ${
                  color === 'blue' ? 'bg-accent-blue' :
                  color === 'emerald' ? 'bg-accent-emerald' :
                  'bg-accent-purple'
                }`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span>Trusted by businesses across <strong className="text-white/70">6+ industries</strong></span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="text-white/30 hover:text-white/60 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-7 h-7" />
        </motion.button>
      </motion.div>
    </div>
  )
}
