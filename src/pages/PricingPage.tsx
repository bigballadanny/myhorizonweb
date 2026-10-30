'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'
import { Navigation } from '@/components/Navigation'
import { Link } from 'react-router-dom'
import { useSEO } from '@/hooks/useSEO'
import { plans, includedInEveryPlan, seatsLine, SIGNUP_URL } from '@/data/pricing'

const faqs = [
  {
    q: 'How does the 5-day free trial work?',
    a: 'Sign up at go.synthios.ai and run Synthios on your real work for five full days before your first monthly bill. No setup fee, ever.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No. Plans are month to month. Personal is $100 a month, Business is $300 a month, and that is the price, not a teaser rate.',
  },
  {
    q: 'What is a team seat?',
    a: 'A seat is $100 per seat per month. It gives one of your people their own agent team under your subscription.',
  },
  {
    q: 'Does one subscription really cover all my businesses?',
    a: 'Yes. One Synthios subscription covers every business you own. You do not buy a plan per company.',
  },
  {
    q: 'How do referrals work?',
    a: 'Send another owner your referral code. They get $50 off their first month. You get $50 a month off while they stay subscribed. Your bill can reach $0, and any credit past $0 turns into team seat credit.',
  },
  {
    q: 'What do I connect it to?',
    a: 'You connect Synthios inside the AI assistant app you already use, then link the tools you already run on, like email and calendar.',
  },
]

export default function PricingPage() {
  useSEO({
    title: 'Pricing | MyHorizon - Synthios Plans',
    description: 'Synthios pricing: Personal $100/mo, Business $300/mo, team seats $100 per seat/mo, 5-day free trial, no setup fee. One subscription covers every business you own.',
    keywords: 'Synthios pricing, AI agent pricing, Personal $100, Business $300, team seats',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Synthios',
      'url': SIGNUP_URL,
      'applicationCategory': 'BusinessApplication',
      'offers': {
        '@type': 'AggregateOffer',
        'lowPrice': '100',
        'highPrice': '300',
        'priceCurrency': 'USD',
        'offerCount': '2',
      },
    },
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="relative" role="main">

        {/* Header */}
        <section className="pt-32 pb-10 lg:pt-36 lg:pb-14">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="section-label mb-5">Pricing</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-5">
                One subscription. Every business you own.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Synthios is an AI agent team with memory. It answers every lead, follows up until the job books or dies, and remembers every customer. Start with a 5-day free trial. No setup fee.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cards */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl">

              {/* Personal */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-border bg-card/50 p-8"
              >
                <p className="section-label mb-3">{plans[0].audience}</p>
                <h2 className="font-serif text-3xl text-foreground mb-2">{plans[0].name}</h2>
                <p className="mb-6">
                  <span className="font-serif text-5xl text-foreground">{plans[0].price}</span>
                  <span className="text-muted-foreground">{plans[0].cadence}</span>
                </p>
                <p className="text-muted-foreground leading-relaxed text-[15px] mb-7">{plans[0].blurb}</p>
                <div className="space-y-3 mb-8">
                  {plans[0].features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent-blue" />
                      </div>
                      <span className="text-foreground text-[15px] leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" asChild className="w-full bg-secondary hover:bg-secondary/80 text-foreground px-8 py-6 rounded-xl">
                  <a href={SIGNUP_URL}>
                    {plans[0].cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>

              {/* Business, highlighted */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative rounded-2xl border border-accent-blue bg-card p-8"
              >
                <span className="absolute -top-3 left-8 bg-accent-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </span>
                <p className="section-label mb-3">{plans[1].audience}</p>
                <h2 className="font-serif text-3xl text-foreground mb-2">{plans[1].name}</h2>
                <p className="mb-6">
                  <span className="font-serif text-5xl text-foreground">{plans[1].price}</span>
                  <span className="text-muted-foreground">{plans[1].cadence}</span>
                </p>
                <p className="text-muted-foreground leading-relaxed text-[15px] mb-7">{plans[1].blurb}</p>
                <div className="space-y-3 mb-8">
                  {plans[1].features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent-blue" />
                      </div>
                      <span className="text-foreground text-[15px] leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" asChild className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl">
                  <a href={SIGNUP_URL}>
                    {plans[1].cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>

              {/* Custom build */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-border bg-card/50 p-8"
              >
                <p className="section-label mb-3">For a job that is not a subscription</p>
                <h2 className="font-serif text-3xl text-foreground mb-2">Custom Build</h2>
                <p className="mb-6">
                  <span className="font-serif text-5xl text-foreground">Custom</span>
                </p>
                <p className="text-muted-foreground leading-relaxed text-[15px] mb-7">
                  MyHorizon builds the AI system for you when the work is a build: custom workflows, diligence tooling, systems nobody else runs.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'Scoped and priced per project',
                    'Built around your actual workflows',
                    'Not a hosted server product',
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent-blue" />
                      </div>
                      <span className="text-foreground text-[15px] leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" variant="outline" asChild className="w-full border-border hover:bg-card px-8 py-6 rounded-xl">
                  <Link to="/#contact">
                    Book a free consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Seats strip + included list */}
        <section className="pb-16 lg:pb-20 bg-card">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-14">
            <div className="max-w-6xl">
              <p className="text-lg text-foreground leading-relaxed mb-10">{seatsLine}</p>
              <p className="section-label mb-8">Included in every plan</p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {includedInEveryPlan.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-blue" />
                    </div>
                    <span className="text-foreground text-[15px] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="section-label mb-5">Questions</p>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-10">
                Asked before you ask
              </h2>
              <div className="space-y-0">
                {faqs.map((faq) => (
                  <details key={faq.q} className="border-t border-border py-6 group">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-foreground text-lg font-medium leading-snug">
                      {faq.q}
                      <span className="text-accent-blue shrink-0 text-xl leading-none">+</span>
                    </summary>
                    <p className="text-muted-foreground leading-relaxed text-[15px] mt-3 max-w-2xl">
                      {faq.a}
                    </p>
                  </details>
                ))}
                <div className="border-t border-border" />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-20 lg:pb-24">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl rounded-2xl border border-accent-blue bg-card p-8 lg:p-10">
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4">
                Five days on your real work. Then decide.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                No setup fee. Business $300 a month, Personal $100 a month, seats $100 a month each.
              </p>
              <Button size="lg" asChild className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl">
                <a href={SIGNUP_URL}>
                  Start your 5-day free trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
