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
    <section className="py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-300">What This Looks Like</span>
          </div>
          <div className="max-w-3xl">
            <h2 className="font-serif text-5xl sm:text-6xl text-zinc-900 dark:text-white leading-[1.1] mb-6 tracking-tight drop-shadow-xl">
              The numbers behind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-400 dark:from-white dark:to-zinc-500">real AI systems.</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
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

          {/* Floating Metrics Cards */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-zinc-100/50 dark:bg-black/40 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 sm:p-10 relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="font-serif text-6xl lg:text-7xl text-zinc-900 dark:text-white mb-6 leading-none tracking-tighter drop-shadow-sm">
                      <AnimatedCounter end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                    </div>
                    <h3 className="font-serif text-2xl text-zinc-900 dark:text-white mb-4 tracking-tight drop-shadow-sm">
                      {metric.label}
                    </h3>
                    <p className="text-base text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
