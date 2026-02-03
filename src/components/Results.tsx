'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, Zap } from 'lucide-react'
import aiWorkflowVisual from '@/assets/ai-workflow-visual.png'

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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
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
    description: 'Per business on average',
    icon: Clock,
    accent: 'accent-blue'
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Operations',
    description: 'AI systems never sleep',
    icon: Zap,
    accent: 'accent-emerald'
  },
  {
    value: 3,
    suffix: 'x',
    label: 'Conversion Rate',
    description: 'With AI-powered outreach',
    icon: TrendingUp,
    accent: 'accent-purple'
  }
]

export function Results() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-background via-card/30 to-background">
      {/* Subtle background accents */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-emerald/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Two-column layout: Visual + Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: AI Workflow Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden clean-border">
              <img 
                src={aiWorkflowVisual} 
                alt="AI workflow automation visualization" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </motion.div>
          
          {/* Right: Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 text-foreground">
              Systems That <span className="text-accent-emerald">Pay For Themselves</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results from businesses running on our AI infrastructure. These aren't projections—they're actual outcomes from clients who deployed our systems.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative group"
              >
                <div className="bg-card clean-border rounded-2xl p-8 text-center hover:elevated-shadow transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-6 ${
                    metric.accent === 'accent-blue' ? 'bg-accent-blue/10 text-accent-blue' :
                    metric.accent === 'accent-emerald' ? 'bg-accent-emerald/10 text-accent-emerald' :
                    'bg-accent-purple/10 text-accent-purple'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  {/* Number */}
                  <div className={`text-5xl lg:text-6xl font-black mb-2 ${
                    metric.accent === 'accent-blue' ? 'text-accent-blue' :
                    metric.accent === 'accent-emerald' ? 'text-accent-emerald' :
                    'text-accent-purple'
                  }`}>
                    <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {metric.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
