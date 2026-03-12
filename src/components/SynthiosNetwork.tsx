'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap, Shield, RefreshCw, Clock, X, Brain, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/eVq6oH57a6pjgctenx63K03'

const pillars = [
  {
    icon: Brain,
    title: 'Knows your business',
    description: 'Remembers your clients, your voice, your workflows, and your priorities — and builds on that context every single day. The longer it runs, the more useful it gets.',
  },
  {
    icon: Sparkles,
    title: 'Always getting better',
    description: "We push improvements continuously. New capabilities, sharper responses, better automations — your system stays current without you lifting a finger.",
  },
  {
    icon: RefreshCw,
    title: 'Fully managed',
    description: 'Monitored every few minutes, self-healing when something breaks, updated when platforms change. You never think about maintenance — we handle it.',
  },
  {
    icon: Clock,
    title: 'Works while you sleep',
    description: 'Runs 24/7 on a private server. Handles follow-ups, briefs, research, and analysis in the background — so you wake up ahead instead of catching up.',
  },
]

const beforeAfter = [
  {
    before: 'Starts from zero every session',
    after: 'Remembers everything — picks up exactly where you left off',
  },
  {
    before: 'You maintain it, update it, restart it',
    after: 'Fully managed — we handle everything in the background',
  },
  {
    before: 'Generic answers for generic users',
    after: 'Built around your business, your industry, your way of working',
  },
  {
    before: 'Another tool to keep up with',
    after: 'An operator running your back office while you focus forward',
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

const included = [
  'Dedicated SYNTHIOS instance on a private server',
  'Agents configured for your specific workflows and industry',
  'Persistent memory — your context, always available',
  'Telegram integration',
  'Proactive monitoring every 5–10 minutes',
  'Self-healing scripts — issues fixed before you notice',
  'Continuous updates and capability improvements',
  'Direct support from the MyHorizon team',
]

export function SynthiosNetwork() {
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
            Every time you open ChatGPT or Claude, you start from scratch. It doesn't know your clients, your voice, your processes, or what worked last week. You spend half your time just getting it up to speed.
          </p>
          <p className="text-xl text-zinc-600 dark:text-white/70 leading-relaxed">
            SYNTHIOS is different. We deploy a dedicated AI system that lives on a private server, runs 24/7, and builds a deep understanding of how your business works — then gets sharper every single day. We manage everything. You just use it.
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

        {/* Before / After */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-8">What changes</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {beforeAfter.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="grid grid-cols-2 divide-x divide-zinc-200 dark:divide-white/10 bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="p-4 sm:p-5 flex items-start gap-2 sm:gap-3">
                  <X className="w-4 h-4 text-zinc-300 dark:text-zinc-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 leading-snug">{item.before}</p>
                </div>
                <div className="p-4 sm:p-5 flex items-start gap-2 sm:gap-3 bg-zinc-50 dark:bg-white/5">
                  <Check className="w-4 h-4 text-zinc-700 dark:text-white/70 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-zinc-800 dark:text-white/80 font-medium leading-snug">{item.after}</p>
                </div>
              </motion.div>
            ))}
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

        {/* Offer */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Included — order-2 on mobile so pricing card shows first */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-8">Everything included</p>
            <div className="space-y-4 mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white dark:text-black" />
                  </div>
                  <span className="text-zinc-700 dark:text-white/70 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Value anchor */}
            <div className="p-6 bg-zinc-100 dark:bg-white/5 rounded-2xl border border-zinc-200 dark:border-white/10">
              <p className="font-semibold text-zinc-900 dark:text-white text-sm mb-2">Think about what your time is worth.</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                If SYNTHIOS gives you back 10 hours a week — that's 40 hours a month. At any reasonable rate, $400 isn't a cost. It's one of the highest-ROI decisions you'll make this year.
              </p>
            </div>
          </motion.div>

          {/* Pricing card */}
          {/* Pricing card — order-1 on mobile so it shows first */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 lg:sticky lg:top-24 order-1 lg:order-2"
          >
            <div className="bg-zinc-900 dark:bg-black border border-white/10 rounded-[2rem] p-6 sm:p-8">

              <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-6">Get started</p>

              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">$1,500</span>
                </div>
                <p className="text-zinc-400 text-sm">One-time setup</p>
                <p className="text-zinc-500 text-xs mt-1">We handle everything — you're live in 48 hours</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-white">$400</span>
                  <span className="text-zinc-400 text-sm">/month</span>
                </div>
                <p className="text-zinc-400 text-sm">Fully managed, always improving</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">Private server — your data stays yours</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">Cancel anytime after the first 30 days</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">Live within 48 hours of setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">Continuously updated — no effort required</span>
                </div>
              </div>

              <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  size="lg"
                  className="w-full bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 py-6 rounded-full text-base font-semibold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>

              <p className="text-zinc-500 text-xs text-center mt-4 leading-relaxed">
                Early access — limited spots available.<br />
                Checkout handled securely by Stripe.
              </p>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
