'use client'

import { motion } from 'framer-motion'
import { Zap, RefreshCw, Clock, Brain, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const pillars = [
  {
    icon: Brain,
    title: 'Knows your business',
    description: 'Remembers your clients, your voice, your workflows, and your priorities — and builds on that context every single day.',
  },
  {
    icon: Sparkles,
    title: 'Always getting better',
    description: "We push improvements continuously. New capabilities, sharper responses, better automations — your system stays current without you lifting a finger.",
  },
  {
    icon: RefreshCw,
    title: 'Fully managed',
    description: 'Monitored every few minutes, self-healing when something breaks, updated when platforms change. You never think about maintenance.',
  },
  {
    icon: Clock,
    title: 'Works while you sleep',
    description: 'Runs 24/7 on a private server. Handles follow-ups, briefs, research, and analysis in the background — so you wake up ahead.',
  },
]

const operatorOutcomes = [
  {
    outcome: 'Morning brief at 7am',
    detail: 'Industry news, open tasks, and your ONE thing for the day — before your first meeting.',
  },
  {
    outcome: 'Lead response in seconds',
    detail: 'New inquiry → personalized follow-up drafted and ready before you even see the notification.',
  },
  {
    outcome: 'Content on autopilot',
    detail: 'Full week of posts, email hooks, and ad variations ready Sunday night — written in your voice.',
  },
  {
    outcome: 'Research while you sleep',
    detail: 'Drop a document or question before bed. Wake up to a complete analysis with the key points pulled.',
  },
]

export function SynthiosNetwork() {
  const navigate = useNavigate()

  return (
    <section id="network" className="py-20 sm:py-24 lg:py-36 relative z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">

        {/* Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-500 dark:text-zinc-400">SYNTHIOS Intelligence Network</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
            AI that actually knows<br />
            <span className="text-zinc-400 dark:text-zinc-500">your business.</span>
          </h2>

          <p className="text-xl text-zinc-600 dark:text-white/70 leading-relaxed mb-5">
            Every time you open ChatGPT or Claude, you start from scratch. It doesn't know your clients, your voice, your processes, or what worked last week.
          </p>
          <p className="text-xl text-zinc-600 dark:text-white/70 leading-relaxed">
            SYNTHIOS is different. A dedicated AI system that lives on a private server, runs 24/7, and builds a deep understanding of how your business works — then gets sharper every single day.
          </p>
        </motion.div>

        {/* Four pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-8">Why it works</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 hover:border-zinc-300 dark:hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <p className="font-semibold text-zinc-900 dark:text-white text-sm mb-2 leading-tight">{item.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-8">What operators are doing with it</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {operatorOutcomes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 hover:border-zinc-300 dark:hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="font-semibold text-zinc-900 dark:text-white text-base mb-3 leading-tight">{item.outcome}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <Button
            size="lg"
            onClick={() => { navigate('/network'); window.scrollTo({ top: 0, behavior: 'instant' }) }}
            className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 px-8 py-6 rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.02]"
          >
            See pricing &amp; get started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-sm text-zinc-400">$1,500 setup · $400/mo · Live in 48 hours</p>
        </motion.div>

      </div>
    </section>
  )
}
