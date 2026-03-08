'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Calendar, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const steps = [
  {
    icon: Mail,
    title: 'Check Your Email',
    description: 'Confirmation + onboarding guide sent to your inbox',
    delay: 0.4,
  },
  {
    icon: Calendar,
    title: 'Strategy Session Scheduled',
    description: "We'll reach out within 24 hours to book your kickoff call",
    delay: 0.5,
  },
  {
    icon: Zap,
    title: 'Your System Goes Live',
    description: 'First automations running within 2 weeks',
    delay: 0.6,
  },
]

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#080808' }}>
      <Navigation />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-3xl mx-auto text-center">

          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-0 rounded-full bg-emerald-400 blur-2xl"
              />
              <CheckCircle2 className="w-20 h-20 text-emerald-400 relative z-10" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SYNTHIOS Network · Active Member
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            You&apos;re in. Welcome to the Network.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
          >
            Your onboarding starts now. Check your email for next steps — we&apos;ll have your first session scheduled within 24 hours.
          </motion.p>
        </div>

        {/* What happens next */}
        <div className="w-full max-w-4xl mx-auto mt-20 px-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-xs font-semibold uppercase tracking-widest text-white/40 text-center mb-8"
          >
            What happens next
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step.delay, duration: 0.5 }}
                className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 flex flex-col gap-4 hover:border-white/15 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1.5">{step.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-white/25">Step {i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-14"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold bg-white text-black hover:bg-white/90 transition-colors"
          >
            <a href="https://myhorizon.ai" target="_blank" rel="noopener noreferrer">
              Explore Your Dashboard
            </a>
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
