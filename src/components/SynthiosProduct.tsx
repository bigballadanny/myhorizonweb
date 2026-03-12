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
    description: 'Connect through Telegram. No new apps to learn, no new habit to form.',
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
    <section id="synthios" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <Zap className="w-3.5 h-3.5 text-accent-blue" />
            <p className="section-label" style={{ margin: 0 }}>Our Flagship Product</p>
          </div>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
              Meet SYNTHIOS
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-3">
              Intelligence that grows with your business.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
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
          <div className="rounded-2xl overflow-hidden w-full aspect-[16/7]">
            <img
              src={synthiosImg}
              alt="SYNTHIOS AI system"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Two column layout: capabilities + checklist */}
        <div className="grid lg:grid-cols-2 gap-16 mb-14">

          {/* Left — capabilities as vertical list */}
          <div>
            <p className="section-label mb-8">What makes it different</p>
            <div className="space-y-0">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: index * 0.09, duration: 0.5 }}
                    className="border-t border-border py-7"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-sans font-medium text-foreground mb-2 text-base">
                          {cap.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-[15px]">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
              <div className="border-t border-border" />
            </div>
          </div>

          {/* Right — what it handles checklist */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="section-label mb-8">What SYNTHIOS handles for you</p>
            <div className="space-y-4">
              {handledItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent-blue" />
                  </div>
                  <span className="text-foreground text-[15px] leading-relaxed">{item}</span>
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
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl"
            onClick={scrollToContact}
          >
            See SYNTHIOS in Action
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-card px-8 py-6 rounded-xl"
            onClick={() => window.location.href = '/network'}
          >
            Learn More
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
