'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Brain, MessageSquare, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import synthiosImg from '@/assets/synthios-web.jpg'

const capabilities = [
  {
    icon: Brain,
    title: 'Persistent Memory',
    description: 'Learns your business over time. Every conversation, every decision, every preference — remembered and used to help you better every single day.',
  },
  {
    icon: MessageSquare,
    title: 'Works Where You Work',
    description: 'Connect through Telegram, WhatsApp, Discord, or email. No new apps to learn, no new habit to form.',
  },
  {
    icon: Clock,
    title: 'Always On',
    description: 'Runs 24/7 without the 24/7 payroll. Handles coordination, follow-ups, and scheduling around the clock.',
  },
  {
    icon: TrendingUp,
    title: 'Gets Smarter Over Time',
    description: 'The longer SYNTHIOS runs, the better it understands your operation. It compounds — like a great employee who never stops learning.',
  },
]

const handledItems = [
  'Email triage and response drafting',
  'Calendar management and scheduling',
  'Customer follow-up sequences',
  'Daily briefings and task prioritization',
  'Meeting prep and note-taking',
  'Cross-platform coordination',
  'Data research and analysis',
  'Workflow automation and monitoring',
]

export function SynthiosProduct() {
  const scrollToContact = () => {
    const contact = document.getElementById('contact')
    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="synthios" className="py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-300">Our Flagship Product</span>
          </div>
          <div className="max-w-3xl">
            <h2 className="font-serif text-5xl sm:text-6xl text-zinc-900 dark:text-white leading-[1.1] mb-6 tracking-tight drop-shadow-xl">
              Meet SYNTHIOS
            </h2>
            <p className="text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed mb-4 drop-shadow-md">
              Intelligence that grows with your business.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              SYNTHIOS is a personal AI system that understands your business deeply — your customers, your processes, your priorities — and helps you operate at a level that wasn't possible before.
            </p>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="rounded-[2rem] overflow-hidden w-full aspect-[16/7] border border-zinc-200 dark:border-white/10 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
            <img
              src={synthiosImg}
              alt="SYNTHIOS AI system"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </motion.div>

        {/* Two column layout: capabilities + checklist */}
        <div className="grid lg:grid-cols-2 gap-16 mb-14">

          {/* Left — capabilities as vertical list */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-zinc-500 mb-8">What makes it different</p>
            <div className="space-y-4">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: index * 0.09, duration: 0.5 }}
                    className="bg-zinc-100/50 dark:bg-black/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 p-6 rounded-2xl group hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:bg-white/10 transition-colors">
                        <Icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-zinc-900 dark:text-white mb-2 text-lg">
                          {cap.title}
                        </h3>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right — what it handles checklist */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-zinc-500 mb-8">What SYNTHIOS handles for you</p>
            <div className="bg-zinc-100/30 dark:bg-black/20 backdrop-blur-xl border border-zinc-200 dark:border-white/5 p-8 rounded-[2rem] space-y-5">
              {handledItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-zinc-300 dark:group-hover:bg-white/20 transition-colors">
                    <Check className="w-3.5 h-3.5 text-zinc-800 dark:text-white" />
                  </div>
                  <span className="text-zinc-900 dark:text-zinc-200 text-base leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start gap-3"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 hover:scale-105 transition-all duration-300 px-10 py-7 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] font-semibold"
            onClick={scrollToContact}
          >
            See SYNTHIOS in Action
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-black/20 text-black hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10 px-10 py-7 rounded-full text-lg font-medium backdrop-blur-sm hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://synthios.myhorizon.ai', '_blank')}
          >
            Learn More
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
