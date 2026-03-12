'use client'

import { motion } from 'framer-motion'
import {
  Check, ArrowRight, Zap, Shield, RefreshCw,
  Clock, X, Brain, Sparkles, ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'
import { Navigation } from '@/components/Navigation'
import { useEffect } from 'react'
import { useState } from 'react'

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/eVq6oH57a6pjgctenx63K03?success_url=https%3A%2F%2Fmyhorizon.ai%2Fwelcome'
const STRIPE_SPLIT_A = 'https://buy.stripe.com/9B614n9nq14Z6BT5R163K04'
const STRIPE_SPLIT_B = 'https://buy.stripe.com/aFaaEX0QU8xraS9frB63K06'

const pillars = [
  {
    icon: Brain,
    title: 'Knows your business',
    description: 'Remembers your clients, your voice, your workflows, and priorities — builds on that context every single day.',
  },
  {
    icon: Sparkles,
    title: 'Always getting better',
    description: 'We push updates continuously. New capabilities, sharper responses, better automations — you stay current without touching a thing.',
  },
  {
    icon: RefreshCw,
    title: 'Fully managed',
    description: 'Monitored every few minutes, self-healing when something breaks. You never think about maintenance.',
  },
  {
    icon: Clock,
    title: 'Works while you sleep',
    description: 'Runs 24/7 on a private server. Follow-ups, briefs, research, analysis — handled in the background.',
  },
]

const beforeAfter = [
  { before: 'Starts from zero every session', after: 'Picks up exactly where you left off' },
  { before: 'You maintain it, update it, restart it', after: 'Fully managed — we handle everything' },
  { before: 'Generic answers for generic users', after: 'Built around your business specifically' },
  { before: 'Another tool to keep up with', after: 'An operator running your back office' },
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

const faqs = [
  {
    q: 'What exactly am I getting?',
    a: 'A dedicated AI system built specifically for your business — configured with your workflows, connected to your messaging channels, and managed by our team. You interact with it through Telegram. It handles follow-ups, research, content, briefings, and more — 24/7.',
  },
  {
    q: 'Do I need to buy any hardware?',
    a: "No. Your SYNTHIOS instance runs on our private server infrastructure. Nothing to buy, nothing to set up on your end. We handle all of that.",
  },
  {
    q: 'What do I need to provide?',
    a: 'Just your time for a 30-minute onboarding call where we learn your business, configure your agents, and connect your messaging channels. After that, you\'re live.',
  },
  {
    q: 'How long does setup take?',
    a: 'Your system is live within 48 hours of your onboarding call. Most clients are using it the same week they sign up.',
  },
  {
    q: 'What if I want to cancel?',
    a: "You can cancel anytime after the first 30 days. No long-term contracts. The setup fee is non-refundable — it covers the real work of configuring your system.",
  },
  {
    q: 'Is my data secure?',
    a: "Yes. Your data lives on a private server managed exclusively by our team. We don't share it, sell it, or use it for anything other than running your system.",
  },
  {
    q: 'How is this different from just using ChatGPT?',
    a: "ChatGPT resets every session. It doesn't know your clients, your processes, your voice, or your history. SYNTHIOS builds persistent memory over time and runs automations in the background — you don't prompt it, it just works.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-zinc-200 dark:border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
      >
        <span className="font-medium text-zinc-900 dark:text-white text-base group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="pb-5 text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">{a}</p>
      )}
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export default function NetworkPage() {
  const [splitPayment, setSplitPayment] = useState(false)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] text-foreground">

      <Navigation />

      <main className="pt-20">

        {/* ── Hero + pricing above the fold ── */}
        <section className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl pt-10 pb-24">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* Left — hero copy */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="inline-flex items-center gap-2 mb-8 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-4 py-1.5 rounded-full">
                <Zap className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-xs font-medium tracking-widest uppercase text-zinc-400">Early Access — Limited Spots</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-zinc-900 dark:text-white leading-[1.05] mb-8 tracking-tight">
                AI that actually knows<br />
                <span className="text-zinc-400 dark:text-zinc-500">your business.</span>
              </h1>

              <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
                Every time you open ChatGPT or Claude, you start from scratch. It doesn't know your clients, your voice, your processes, or what worked last week.
              </p>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-10">
                SYNTHIOS is different. A dedicated AI system that runs 24/7 on a private server, builds a deep understanding of your operation, and gets sharper every day. We manage everything. You just use it.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {['24/7 uptime', 'Fully managed', '48hr setup', 'Cancel anytime'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{item}</span>
                  </div>
                ))}
              </div>

              <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-10 py-7 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(0,0,0,0.25)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)]">
                  Get Started — $1,500 setup
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <p className="text-zinc-400 text-sm mt-3">Then $400/month. Checkout via Stripe.</p>
            </motion.div>

            {/* Right — pricing card above fold */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 sticky top-24"
            >
              {/* Payment type selector */}
              <div className="flex gap-2 mb-5 bg-zinc-800/60 p-1 rounded-full">
                <button
                  onClick={() => setSplitPayment(false)}
                  className={`flex-1 text-xs font-semibold py-2 px-4 rounded-full transition-all duration-200 ${!splitPayment ? 'bg-white text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  Single company
                </button>
                <button
                  onClick={() => setSplitPayment(true)}
                  className={`flex-1 text-xs font-semibold py-2 px-4 rounded-full transition-all duration-200 ${splitPayment ? 'bg-white text-black shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  Split between 2
                </button>
              </div>

              {!splitPayment ? (
                <div className="bg-zinc-900 dark:bg-black border border-white/10 rounded-[2rem] p-8">
                  <p className="text-xs font-medium tracking-widest uppercase text-zinc-500 mb-6">SYNTHIOS Network</p>
                  <div className="mb-5 pb-5 border-b border-white/10">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">One-time setup</p>
                    <span className="text-5xl font-bold text-white">$1,500</span>
                    <p className="text-zinc-500 text-sm mt-1">We configure and deploy everything. Live in 48 hours.</p>
                  </div>
                  <div className="mb-8">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Then monthly</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">$400</span>
                      <span className="text-zinc-400 text-sm">/month</span>
                    </div>
                    <p className="text-zinc-500 text-sm mt-1">Monitoring, updates, support — all in.</p>
                  </div>
                  <div className="space-y-3 mb-8">
                    {[
                      { icon: Shield, text: 'Private server — your data stays yours' },
                      { icon: RefreshCw, text: 'Cancel anytime after 30 days' },
                      { icon: Clock, text: 'Live within 48 hours of setup' },
                      { icon: Sparkles, text: 'Continuously updated, no effort required' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                        <span className="text-zinc-400 text-sm">{text}</span>
                      </div>
                    ))}
                  </div>
                  <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="block mb-4">
                    <Button size="lg" className="w-full bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 py-6 rounded-full text-base font-semibold shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <p className="text-zinc-600 text-xs text-center">Secured by Stripe. Apple Pay, card, and more accepted.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-zinc-500 px-1 mb-2">Each company completes their own secure checkout. Service activates when both are paid.</p>
                  {/* Company A */}
                  <div className="bg-zinc-900 dark:bg-black border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-medium tracking-widest uppercase text-zinc-500">Company A</p>
                      <span className="text-xs bg-white/5 border border-white/10 text-zinc-400 rounded-full px-3 py-1">Setup only</span>
                    </div>
                    <div className="mb-3">
                      <span className="text-4xl font-bold text-white">$750</span>
                      <span className="text-zinc-500 text-sm ml-2">one-time</span>
                    </div>
                    <p className="text-zinc-500 text-sm mb-5">Your share of the setup fee. One payment, no recurring charges.</p>
                    <a href={STRIPE_SPLIT_A} target="_blank" rel="noopener noreferrer" className="block">
                      <Button size="lg" className="w-full bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 py-5 rounded-full text-sm font-semibold">
                        Pay Company A Share <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                  {/* Company B */}
                  <div className="bg-zinc-900 dark:bg-black border border-zinc-600 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-medium tracking-widest uppercase text-zinc-500">Company B</p>
                      <span className="text-xs bg-zinc-700 text-zinc-300 rounded-full px-3 py-1 font-medium">Activates service</span>
                    </div>
                    <div className="mb-1">
                      <span className="text-4xl font-bold text-white">$750</span>
                      <span className="text-zinc-500 text-sm ml-2">setup</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl font-bold text-zinc-400">+ $400</span>
                      <span className="text-zinc-500 text-sm">/month</span>
                    </div>
                    <p className="text-zinc-500 text-sm mb-5">Setup share + monthly subscription. Service goes live the moment this is paid.</p>
                    <a href={STRIPE_SPLIT_B} target="_blank" rel="noopener noreferrer" className="block">
                      <Button size="lg" className="w-full bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 py-5 rounded-full text-sm font-semibold">
                        Pay Company B Share + Start <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                  <p className="text-zinc-600 text-xs text-center pt-1">Both checkouts secured by Stripe. Separate invoices per company.</p>
                </div>
              )}
            </motion.div>

          </div>
        </section>

        {/* ── Why it works ── */}
        <section className="bg-zinc-50 dark:bg-zinc-950/60 border-y border-zinc-100 dark:border-white/5 py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
            <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-10">Why it works</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pillars.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <p className="font-semibold text-zinc-900 dark:text-white text-sm mb-2">{item.title}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Before / After ── */}
        <section className="py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
            <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-10">What changes</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {beforeAfter.map((item, i) => (
                <div key={i} className="grid grid-cols-2 divide-x divide-zinc-200 dark:divide-white/10 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden">
                  <div className="p-5 flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-300 dark:text-zinc-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 leading-snug">{item.before}</p>
                  </div>
                  <div className="p-5 flex items-start gap-3">
                    <Check className="w-4 h-4 text-zinc-600 dark:text-zinc-300 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-snug">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What's included + mid-page CTA ── */}
        <section className="bg-zinc-50 dark:bg-zinc-950/60 border-y border-zinc-100 dark:border-white/5 py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-8">Everything included</p>
                <div className="space-y-4">
                  {included.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white dark:text-black" />
                      </div>
                      <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-zinc-200 dark:border-white/10">
                  <p className="font-semibold text-zinc-900 dark:text-white text-sm mb-2">Think about what your time is worth.</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    If SYNTHIOS gives you back 10 hours a week — that's 40 hours a month. At any reasonable billing rate, $400 isn't a cost. It's one of the highest-ROI decisions you'll make this year.
                  </p>
                </div>

                <div className="p-6 bg-zinc-900 dark:bg-black rounded-2xl border border-white/10 text-center">
                  <p className="text-white font-semibold mb-1">$1,500 setup · $400/month</p>
                  <p className="text-zinc-500 text-sm mb-5">Live in 48 hours. Cancel anytime after 30 days.</p>
                  <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="lg" className="w-full bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 py-5 rounded-full font-semibold">
                      Get Started <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-10">Common questions</p>
            <div>
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-zinc-900 dark:bg-black border-t border-white/5 py-20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-3xl text-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl text-white mb-6 tracking-tight leading-tight">
                Ready to have an AI that<br />actually knows your business?
              </h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                Limited spots available during early access. Setup takes 30 minutes on your end. We handle the rest.
              </p>
              <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-100 hover:scale-105 transition-all duration-300 px-12 py-7 rounded-full text-lg font-semibold shadow-[0_0_60px_-10px_rgba(255,255,255,0.2)]">
                  Get Started — $1,500 setup
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <p className="text-zinc-600 text-sm mt-4">Then $400/month. Secured by Stripe.</p>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
