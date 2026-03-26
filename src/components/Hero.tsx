'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { HeroCapture } from './HeroCapture'
import { smoothScrollTo } from '../hooks/useSmoothScroll'
import gsap from 'gsap'

/* ─── Magnetic button wrapper ─── */
function MagneticWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' })
  }

  const handleLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}>
      {children}
    </div>
  )
}

/* ─── Animated gradient orbs (background) ─── */
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large primary orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] animate-drift-1"
        style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', top: '10%', right: '-10%' }}
      />
      {/* Secondary orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px] animate-drift-2"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', bottom: '5%', left: '-5%' }}
      />
      {/* Accent orb */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-10 blur-[80px] animate-drift-3"
        style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)', top: '50%', left: '40%' }}
      />
    </div>
  )
}

/* ─── Word-by-word animated headline ─── */
function KineticHeadline() {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.hero-word')
    gsap.set(words, { opacity: 0, y: 30, rotateX: 15 })
    gsap.to(words, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.05,
      delay: 0.4,
    })

    // Shimmer on "Now it can."
    const shimmer = el.querySelector('.hero-shimmer')
    if (shimmer) {
      gsap.to(shimmer, {
        backgroundPosition: '200% center',
        duration: 3,
        repeat: -1,
        ease: 'none',
        delay: 1.5,
      })
    }
  }, [])

  const line1 = 'Your business runs 24/7.'.split(' ')
  const line2 = "Your team doesn't.".split(' ')
  const highlight = 'Now it can.'

  return (
    <h1
      ref={containerRef}
      className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-8"
      style={{ perspective: '600px' }}
    >
      {line1.map((word, i) => (
        <span key={`a${i}`} className="hero-word inline-block mr-[0.3em]">{word}</span>
      ))}
      {line2.map((word, i) => (
        <span key={`b${i}`} className="hero-word inline-block mr-[0.3em]">{word}</span>
      ))}
      <br className="hidden sm:block" />
      <em className="not-italic">
        <span
          className="hero-word hero-shimmer inline-block bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(90deg, #2563eb, #7c3aed, #059669, #2563eb)',
            backgroundSize: '200% auto',
          }}
        >
          {highlight}
        </span>
      </em>
    </h1>
  )
}

/* ─── Floating visual for right column ─── */
function FloatingVisual() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Layered glowing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] h-[80%] rounded-full border border-accent-blue/20 animate-spin-slow" />
        <div className="absolute w-[60%] h-[60%] rounded-full border border-purple-500/15 animate-spin-reverse" />
        <div className="absolute w-[40%] h-[40%] rounded-full border border-emerald-500/20 animate-pulse" />
      </div>
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-accent-blue/10 blur-2xl animate-pulse" />
        <div className="absolute w-20 h-20 rounded-full glass-card flex items-center justify-center">
          <span className="text-3xl font-serif text-accent-blue font-bold">S</span>
        </div>
      </div>
      {/* Floating feature tags */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] right-[5%] glass-card px-3 py-1.5 rounded-lg text-xs text-muted-foreground"
      >
        24/7 Agents
      </motion.div>
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-[20%] left-[0%] glass-card px-3 py-1.5 rounded-lg text-xs text-muted-foreground"
      >
        AI Workflows
      </motion.div>
      <motion.div
        animate={{ y: [-5, 7, -5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[55%] right-[-2%] glass-card px-3 py-1.5 rounded-lg text-xs text-muted-foreground"
      >
        Smart CRM
      </motion.div>
    </div>
  )
}

/* ─── Main Hero ─── */
export function Hero() {
  const scrollToContact = () => smoothScrollTo('contact')
  const scrollToServices = () => smoothScrollTo('services')

  return (
    <div className="relative min-h-screen w-full bg-background flex items-center overflow-hidden">
      {/* Animated gradient orbs */}
      <GradientOrbs />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

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

            {/* Kinetic headline */}
            <KineticHeadline />

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mb-10"
            >
              SYNTHIOS is the AI infrastructure that remembers every customer, executes every follow-up, and never misses a lead — while you focus on the work only you can do.
            </motion.p>

            {/* CTAs with magnetic hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mb-12"
            >
              <MagneticWrap>
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl text-base transition-all duration-200 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                >
                  See SYNTHIOS in Action
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </MagneticWrap>
              <MagneticWrap>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToServices}
                  className="w-full sm:w-auto px-8 py-6 rounded-xl text-base border-border text-foreground hover:bg-card transition-all duration-200"
                >
                  Get Your Free AI Roadmap
                </Button>
              </MagneticWrap>
            </motion.div>

            {/* Hero email capture */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="border-t border-border/40 pt-4 mt-2">
                <p className="text-sm text-muted-foreground mb-0.5">
                  Not ready to book? Get a free AI game plan for your business:
                </p>
                <HeroCapture />
              </div>

              {/* Social proof */}
              <p className="text-sm text-muted-foreground mt-5">
                Working with businesses in M&A, financial services, construction, healthcare, and more
              </p>
            </motion.div>
          </div>

          {/* Right — floating visual (replaces static JPG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <FloatingVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
      >
        <span className="text-xs text-muted-foreground/60 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </div>
  )
}
