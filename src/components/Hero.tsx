'use client'

import { motion } from 'framer-motion'
import { Users, ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { ParticleNetwork } from './ParticleNetwork'

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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Animated Particle Background */}
      <ParticleNetwork />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Hero Content - Lower Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 lg:left-12 right-4 sm:right-auto z-40"
      >
        <div className="max-w-3xl">
          {/* Social Proof Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald border-2 border-black flex items-center justify-center"
                >
                  <Users className="w-4 h-4 text-white" />
                </div>
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">
              Trusted by innovative businesses
            </span>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-tight text-white mb-4 sm:mb-6">
            <span className="block">AI SYSTEMS THAT</span>
            <span className="block">ACTUALLY GENERATE</span>
            <span className="block">REVENUE</span>
          </h1>
          
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
            Complete AI systems, autonomous agents, and intelligent workflows that run your business 24/7.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-accent-blue hover:bg-accent-blue/90 text-white text-lg px-8 py-6"
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={scrollToServices}
              className="bg-white/15 border-white/40 text-white hover:bg-white/25 backdrop-blur-sm text-lg px-8 py-6"
            >
              See What We Build
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-white/50 hover:text-white/80 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </div>
  )
}
