'use client'

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Wrench, HardHat, Briefcase, Home, Store, ShieldCheck, FileSearch, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'

interface Industry {
  slug: string
  icon: React.ElementType
  name: string
  tagline: string
  accentColor: string       // Tailwind arbitrary or utility for border
  accentIconBg: string      // Icon box bg on hover
  accentText: string        // Name text color on hover (inline style)
}

const industries: Industry[] = [
  {
    slug: 'med-spas',
    icon: Sparkles,
    name: 'Med Spas & Aesthetics',
    tagline: 'Automated booking, follow-ups, and patient retention that keeps your chairs full.',
    accentColor: 'hover:border-l-4 hover:border-l-pink-400',
    accentIconBg: 'group-hover:bg-pink-50 group-hover:border-pink-200 dark:group-hover:bg-pink-950/30 dark:group-hover:border-pink-800',
    accentText: '#f472b6',
  },
  {
    slug: 'trades',
    icon: Wrench,
    name: 'Trades & Home Services',
    tagline: 'Lead gen that books jobs while you\'re on the job — no missed calls, no lost estimates.',
    accentColor: 'hover:border-l-4 hover:border-l-orange-400',
    accentIconBg: 'group-hover:bg-orange-50 group-hover:border-orange-200 dark:group-hover:bg-orange-950/30 dark:group-hover:border-orange-800',
    accentText: '#fb923c',
  },
  {
    slug: 'construction',
    icon: HardHat,
    name: 'Construction',
    tagline: 'Bid tracking, subcontractor coordination, and client updates running on autopilot.',
    accentColor: 'hover:border-l-4 hover:border-l-amber-400',
    accentIconBg: 'group-hover:bg-amber-50 group-hover:border-amber-200 dark:group-hover:bg-amber-950/30 dark:group-hover:border-amber-800',
    accentText: '#fbbf24',
  },
  {
    slug: 'professional-services',
    icon: Briefcase,
    name: 'Professional Services',
    tagline: 'Client intake, document automation, and follow-up sequences built around how you work.',
    accentColor: 'hover:border-l-4 hover:border-l-slate-500',
    accentIconBg: 'group-hover:bg-slate-100 group-hover:border-slate-300 dark:group-hover:bg-slate-800/50 dark:group-hover:border-slate-600',
    accentText: '#64748b',
  },
  {
    slug: 'real-estate',
    icon: Home,
    name: 'Real Estate',
    tagline: 'AI agents that qualify leads and schedule showings 24/7 — even when you\'re showing another property.',
    accentColor: 'hover:border-l-4 hover:border-l-emerald-500',
    accentIconBg: 'group-hover:bg-emerald-50 group-hover:border-emerald-200 dark:group-hover:bg-emerald-950/30 dark:group-hover:border-emerald-800',
    accentText: '#10b981',
  },
  {
    slug: 'small-business',
    icon: Store,
    name: 'General Small Business',
    tagline: 'Custom AI systems built around your exact operation, whatever that looks like.',
    accentColor: 'hover:border-l-4 hover:border-l-blue-500',
    accentIconBg: 'group-hover:bg-blue-50 group-hover:border-blue-200 dark:group-hover:bg-blue-950/30 dark:group-hover:border-blue-800',
    accentText: '#3b82f6',
  },
  {
    slug: 'underwriters',
    icon: ShieldCheck,
    name: 'Underwriters',
    tagline: 'AI-powered risk assessment, automated document analysis, and faster approvals with fewer errors.',
    accentColor: 'hover:border-l-4 hover:border-l-purple-500',
    accentIconBg: 'group-hover:bg-purple-50 group-hover:border-purple-200 dark:group-hover:bg-purple-950/30 dark:group-hover:border-purple-800',
    accentText: '#a855f7',
  },
  {
    slug: 'ma-due-diligence',
    icon: FileSearch,
    name: 'M&A & Due Diligence',
    tagline: 'Deal analysis, financial modeling, and automated quality of earnings reports in a fraction of the time.',
    accentColor: 'hover:border-l-4 hover:border-l-yellow-500',
    accentIconBg: 'group-hover:bg-yellow-50 group-hover:border-yellow-200 dark:group-hover:bg-yellow-950/30 dark:group-hover:border-yellow-800',
    accentText: '#eab308',
  },
  {
    slug: 'financial-services',
    icon: TrendingUp,
    name: 'Financial Services',
    tagline: 'Portfolio analytics, compliance automation, and client reporting that runs itself.',
    accentColor: 'hover:border-l-4 hover:border-l-teal-500',
    accentIconBg: 'group-hover:bg-teal-50 group-hover:border-teal-200 dark:group-hover:bg-teal-950/30 dark:group-hover:border-teal-800',
    accentText: '#14b8a6',
  },
]

export function Industries() {
  const navigate = useNavigate()

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="industries" className="py-20 lg:py-32 relative z-10">
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
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-300">Industries We Serve</span>
          </div>
          <div className="max-w-3xl">
            <h2 className="font-serif text-5xl sm:text-6xl text-zinc-900 dark:text-white leading-[1.1] mb-6 tracking-tight drop-shadow-xl">
              Built for your industry
            </h2>
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              We've built AI systems across dozens of verticals. Chances are, we know yours.
            </p>
          </div>
        </motion.div>

        {/* Industry grid - Spaced Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate(`/industry/${industry.slug}`)}
                className={`group rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 cursor-pointer relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${industry.accentColor}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon box — tints on hover */}
                <div className={`w-14 h-14 rounded-xl relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-8 transition-all duration-500 shadow-sm group-hover:scale-110 ${industry.accentIconBg}`}>
                  <Icon className="w-6 h-6 text-zinc-400 group-hover:text-current transition-colors duration-200" />
                </div>

                {/* Name — accent color on hover */}
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <h3
                    className="font-serif text-2xl text-zinc-900 dark:text-white leading-snug transition-colors duration-200"
                    style={{ '--hover-color': industry.accentText } as React.CSSProperties}
                  >
                    <span className="group-hover:[color:var(--hover-color)] transition-colors duration-200">
                      {industry.name}
                    </span>
                  </h3>
                  {/* Arrow appears on hover */}
                  <span
                    className="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200 text-lg"
                    style={{ color: industry.accentText }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>

                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium relative z-10">
                  {industry.tagline}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-10 sm:p-14 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden max-w-4xl mx-auto"
        >
          <h3 className="font-serif text-3xl text-zinc-900 dark:text-white mb-4 relative z-10">Don't see your industry?</h3>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 max-w-md mx-auto relative z-10">
            We build custom solutions for businesses of every kind.
          </p>
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 hover:scale-105 transition-all duration-300 px-10 py-7 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] relative z-10 font-semibold"
          >
            Let's Talk
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
