'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Wrench, HardHat, Briefcase, Home, Store, ShieldCheck, FileSearch, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'

interface Industry {
  icon: React.ElementType
  name: string
  tagline: string
  accentColor: string       // Tailwind arbitrary or utility for border
  accentIconBg: string      // Icon box bg on hover
  accentText: string        // Name text color on hover (inline style)
}

const industries: Industry[] = [
  {
    icon: Sparkles,
    name: 'Med Spas & Aesthetics',
    tagline: 'Automated booking, follow-ups, and patient retention that keeps your chairs full.',
    accentColor: 'hover:border-l-4 hover:border-l-pink-400',
    accentIconBg: 'group-hover:bg-pink-50 group-hover:border-pink-200 dark:group-hover:bg-pink-950/30 dark:group-hover:border-pink-800',
    accentText: '#f472b6',
  },
  {
    icon: Wrench,
    name: 'Trades & Home Services',
    tagline: 'Lead gen that books jobs while you\'re on the job — no missed calls, no lost estimates.',
    accentColor: 'hover:border-l-4 hover:border-l-orange-400',
    accentIconBg: 'group-hover:bg-orange-50 group-hover:border-orange-200 dark:group-hover:bg-orange-950/30 dark:group-hover:border-orange-800',
    accentText: '#fb923c',
  },
  {
    icon: HardHat,
    name: 'Construction',
    tagline: 'Bid tracking, subcontractor coordination, and client updates running on autopilot.',
    accentColor: 'hover:border-l-4 hover:border-l-amber-400',
    accentIconBg: 'group-hover:bg-amber-50 group-hover:border-amber-200 dark:group-hover:bg-amber-950/30 dark:group-hover:border-amber-800',
    accentText: '#fbbf24',
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    tagline: 'Client intake, document automation, and follow-up sequences built around how you work.',
    accentColor: 'hover:border-l-4 hover:border-l-slate-500',
    accentIconBg: 'group-hover:bg-slate-100 group-hover:border-slate-300 dark:group-hover:bg-slate-800/50 dark:group-hover:border-slate-600',
    accentText: '#64748b',
  },
  {
    icon: Home,
    name: 'Real Estate',
    tagline: 'AI agents that qualify leads and schedule showings 24/7 — even when you\'re showing another property.',
    accentColor: 'hover:border-l-4 hover:border-l-emerald-500',
    accentIconBg: 'group-hover:bg-emerald-50 group-hover:border-emerald-200 dark:group-hover:bg-emerald-950/30 dark:group-hover:border-emerald-800',
    accentText: '#10b981',
  },
  {
    icon: Store,
    name: 'General Small Business',
    tagline: 'Custom AI systems built around your exact operation, whatever that looks like.',
    accentColor: 'hover:border-l-4 hover:border-l-blue-500',
    accentIconBg: 'group-hover:bg-blue-50 group-hover:border-blue-200 dark:group-hover:bg-blue-950/30 dark:group-hover:border-blue-800',
    accentText: '#3b82f6',
  },
  {
    icon: ShieldCheck,
    name: 'Underwriters',
    tagline: 'AI-powered risk assessment, automated document analysis, and faster approvals with fewer errors.',
    accentColor: 'hover:border-l-4 hover:border-l-purple-500',
    accentIconBg: 'group-hover:bg-purple-50 group-hover:border-purple-200 dark:group-hover:bg-purple-950/30 dark:group-hover:border-purple-800',
    accentText: '#a855f7',
  },
  {
    icon: FileSearch,
    name: 'M&A & Due Diligence',
    tagline: 'Deal analysis, financial modeling, and automated quality of earnings reports in a fraction of the time.',
    accentColor: 'hover:border-l-4 hover:border-l-yellow-500',
    accentIconBg: 'group-hover:bg-yellow-50 group-hover:border-yellow-200 dark:group-hover:bg-yellow-950/30 dark:group-hover:border-yellow-800',
    accentText: '#eab308',
  },
  {
    icon: TrendingUp,
    name: 'Financial Services',
    tagline: 'Portfolio analytics, compliance automation, and client reporting that runs itself.',
    accentColor: 'hover:border-l-4 hover:border-l-teal-500',
    accentIconBg: 'group-hover:bg-teal-50 group-hover:border-teal-200 dark:group-hover:bg-teal-950/30 dark:group-hover:border-teal-800',
    accentText: '#14b8a6',
  },
]

export function Industries() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="industries" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-5">Industries We Serve</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
              Built for your industry
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've built AI systems across dozens of verticals. Chances are, we know yours.
            </p>
          </div>
        </motion.div>

        {/* Industry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 mb-14">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                onClick={scrollToContact}
                className={`group border-t border-border py-8 pr-6 cursor-pointer hover:bg-card/50 transition-all duration-200 px-3 ${industry.accentColor}`}
              >
                {/* Icon box — tints on hover */}
                <div className={`w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center mb-5 transition-all duration-200 ${industry.accentIconBg}`}>
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-current transition-colors duration-200" />
                </div>

                {/* Name — accent color on hover */}
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className="font-serif text-xl text-foreground leading-snug transition-colors duration-200"
                    style={{ '--hover-color': industry.accentText } as React.CSSProperties}
                  >
                    <span className="group-hover:[color:var(--hover-color)] transition-colors duration-200">
                      {industry.name}
                    </span>
                  </h3>
                  {/* Arrow appears on hover */}
                  <span
                    className="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200 text-sm"
                    style={{ color: industry.accentText }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {industry.tagline}
                </p>
              </motion.div>
            )
          })}
          <div className="col-span-full border-t border-border" />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-foreground font-medium mb-3">Don't see your industry?</p>
          <p className="text-muted-foreground mb-6 max-w-md">
            We build custom solutions for businesses of every kind.
          </p>
          <Button
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-7 py-5 rounded-xl"
          >
            Let's Talk
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
