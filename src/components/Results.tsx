'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, Zap, Quote } from 'lucide-react'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
}

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [hasStarted, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

const metrics = [
  {
    value: 5,
    suffix: '+',
    label: 'Hours Saved Daily',
    description: 'Per business, on average',
    icon: Clock,
    accent: 'accent-blue',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Non-Stop Operations',
    description: 'AI systems never take a day off',
    icon: Zap,
    accent: 'accent-emerald',
  },
  {
    value: 3,
    suffix: 'x',
    label: 'Conversion Rate Lift',
    description: 'With AI-powered follow-up',
    icon: TrendingUp,
    accent: 'accent-purple',
  },
]

export function Results() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-accent-blue/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent-emerald/7 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-white/40 tracking-wide uppercase">
              Proven Results
            </span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 text-white">
            Numbers That <span className="text-accent-emerald">Speak</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Real outcomes from businesses running on our AI infrastructure.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-10 text-center hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-6 ${
                    metric.accent === 'accent-blue' ? 'bg-accent-blue/15 text-accent-blue' :
                    metric.accent === 'accent-emerald' ? 'bg-accent-emerald/15 text-accent-emerald' :
                    'bg-accent-purple/15 text-accent-purple'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className={`text-7xl lg:text-8xl font-black mb-3 ${
                    metric.accent === 'accent-blue' ? 'text-accent-blue' :
                    metric.accent === 'accent-emerald' ? 'text-accent-emerald' :
                    'text-accent-purple'
                  }`}>
                    <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{metric.label}</h3>
                  <p className="text-white/50 text-sm">{metric.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 sm:p-10 text-center relative">
            <Quote className="w-8 h-8 text-accent-blue/50 mx-auto mb-4" />
            <blockquote className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-6">
              "MyHorizon transformed how we operate. What used to take my team hours now just happens automatically — every single day."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="text-left">
                <p className="font-semibold text-white text-sm">Sarah M.</p>
                <p className="text-white/50 text-sm">Business Owner</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
