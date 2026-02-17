'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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
    label: 'Hours Reclaimed Daily',
    description: 'Time your team gets back to focus on what matters',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Always-On Operations',
    description: 'Your AI systems work while you sleep, travel, and live',
  },
  {
    value: 3,
    suffix: 'x',
    label: 'Follow-Up Rate',
    description: 'Because AI never forgets to follow up',
  },
]

export function Results() {
  return (
    <section className="py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="section-label mb-6">What This Looks Like</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              The numbers behind <span className="text-highlight">real AI systems</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These aren't projections. They're what happens when AI is actually built into how a business operates — not bolted on as an afterthought.
            </p>
          </div>
        </motion.div>

        {/* Metrics — left-aligned row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="border-t border-border pt-10 pb-10 pr-10"
            >
              <div className="font-serif text-6xl lg:text-7xl text-accent-blue mb-4 leading-none">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              </div>
              <h3 className="font-sans font-medium text-foreground mb-2 text-base">
                {metric.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {metric.description}
              </p>
            </motion.div>
          ))}
          <div className="col-span-full border-t border-border" />
        </div>

      </div>
    </section>
  )
}
