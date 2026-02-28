'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import resultsMetrics from '@/assets/results-metrics.jpg'

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
      { threshold: 0.3 }
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
    value: 12,
    suffix: '+',
    label: 'Hours Saved Per Week',
    description: 'Average time reclaimed when routine tasks move to AI — scheduling, follow-ups, first-pass drafts.',
  },
  {
    value: 5,
    suffix: 'min',
    prefix: '<',
    label: 'Response Time',
    description: 'AI agents respond to inbound leads in under 5 minutes, 24 hours a day, 7 days a week.',
  },
  {
    value: 3,
    suffix: 'x',
    label: 'Follow-Up Rate',
    description: 'Because AI never forgets. Every lead gets followed up, every time, at exactly the right moment.',
  },
  {
    value: 90,
    suffix: '%',
    label: 'Of Routine Work Automatable',
    description: 'The repetitive tasks your team handles daily can almost always be handed off to AI — immediately.',
  },
]

export function Results() {
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
          <p className="section-label mb-5">What This Looks Like</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-foreground leading-[1.1] mb-5">
              The numbers behind{' '}
              <span className="text-highlight">real AI systems</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Not projections — what actually happens when AI is built into how a business operates, not bolted on as an afterthought.
            </p>
          </div>
        </motion.div>

        {/* Background accent image */}
        <div className="relative mb-14">
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10 pointer-events-none">
            <img
              src={resultsMetrics}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Subtle gradient card behind metrics */}
          <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
            {/* Metrics — 2×2 grid on mobile, 4-col on lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  className="border-t border-border pt-9 pb-9 px-7"
                >
                  <div className="font-serif text-5xl sm:text-6xl text-foreground mb-3 leading-none">
                    <AnimatedCounter end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3 tracking-tight">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
              <div className="col-span-full border-t border-border" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
