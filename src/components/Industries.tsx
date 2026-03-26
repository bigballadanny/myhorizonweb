'use client'

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { smoothScrollTo } from '../hooks/useSmoothScroll'

type IconProps = React.SVGProps<SVGSVGElement>

const MedSpaIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 4.5L19.5 9.5" />
    <path d="M12 7L17 12" />
    <path d="M17 12L20.5 15.5" />
    <path d="M20.5 15.5L21.5 16.5" strokeWidth="1" />
    <rect x="6" y="10" width="8" height="4" rx="1" transform="rotate(-45 6 10)" />
    <path d="M4.5 16.5L3 18" />
    <path d="M21.5 16.5L23 18L21.5 19.5L20 18Z" strokeWidth="1" fill="currentColor" opacity="0.6" />
    <path d="M8 4L9 5.5M10 2.5L10.5 4.5M6 6L4.5 6.5" strokeWidth="1" opacity="0.5" />
  </svg>
)

const TradesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    <circle cx="8" cy="16" r="0.75" fill="currentColor" />
    <circle cx="10.5" cy="13.5" r="0.75" fill="currentColor" />
    <path d="M17 2L15 7H18L16 12" strokeWidth="1.5" opacity="0.7" />
  </svg>
)

const ConstructionIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21H21" />
    <path d="M5 21V7L12 3L19 7V21" />
    <rect x="9" y="13" width="3" height="4" rx="0.5" />
    <rect x="13.5" y="10" width="2.5" height="2.5" rx="0.5" />
    <rect x="8" y="9" width="2.5" height="2.5" rx="0.5" />
    <circle cx="12" cy="3" r="1.5" />
    <path d="M12 4.5V6" strokeWidth="1" opacity="0.6" />
    <path d="M11.2 3.8L9 5" strokeWidth="1" opacity="0.6" />
    <path d="M12.8 3.8L15 5" strokeWidth="1" opacity="0.6" />
  </svg>
)

const ProfessionalServicesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="13" y2="13" />
    <line x1="8" y1="17" x2="11" y2="17" />
    <circle cx="17" cy="14" r="1" />
    <circle cx="19" cy="16" r="1" />
    <circle cx="15" cy="16" r="1" />
    <path d="M17 15L17 15.5M18 14.5L18.5 15.5M16 14.5L15.5 15.5" strokeWidth="1" opacity="0.7" />
  </svg>
)

const RealEstateIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21H21" />
    <path d="M5 21V11" />
    <path d="M19 21V11" />
    <polyline points="3 11 7 7 10 9 12 5 14 7 17 4 21 11" />
    <rect x="9.5" y="15" width="5" height="6" rx="0.5" />
    <circle cx="17" cy="4" r="1.5" fill="currentColor" opacity="0.8" />
    <circle cx="21" cy="11" r="1" opacity="0.5" />
    <circle cx="3" cy="11" r="1" opacity="0.5" />
  </svg>
)

const SmallBusinessIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 7h20l-2 8H4L2 7z" />
    <path d="M17 7V5H7V7" />
    <path d="M2 7L3 3H21L22 7" />
    <rect x="9" y="11" width="6" height="4" rx="0.5" />
    <path d="M1 17H4L5.5 14L7 19L8.5 16L10 18" strokeWidth="1" opacity="0.5" />
    <path d="M11 19V15H13V19" />
  </svg>
)

const UnderwritersIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2L4 6V12C4 16.418 7.582 20.418 12 22C16.418 20.418 20 16.418 20 12V6L12 2Z" />
    <line x1="12" y1="6" x2="12" y2="18" strokeWidth="1" opacity="0.5" />
    <line x1="6.5" y1="12" x2="17.5" y2="12" strokeWidth="1" opacity="0.5" />
    <rect x="7.5" y="13.5" width="1.5" height="2.5" rx="0.5" fill="currentColor" opacity="0.6" />
    <rect x="9.5" y="12.5" width="1.5" height="3.5" rx="0.5" fill="currentColor" opacity="0.6" />
    <rect x="13.5" y="8" width="1.5" height="2.5" rx="0.5" fill="currentColor" opacity="0.6" />
    <rect x="15.5" y="7" width="1.5" height="3.5" rx="0.5" fill="currentColor" opacity="0.6" />
  </svg>
)

const MADueDiligenceIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="12" r="5" />
    <circle cx="15" cy="12" r="5" opacity="0.7" />
    <circle cx="12" cy="10" r="0.75" fill="currentColor" />
    <circle cx="12" cy="12.5" r="0.75" fill="currentColor" />
    <circle cx="12" cy="15" r="0.75" fill="currentColor" />
    <path d="M19 19L22 22" strokeWidth="2" />
    <rect x="15" y="14" width="1" height="2" rx="0.3" fill="currentColor" opacity="0.5" />
    <rect x="17" y="13" width="1" height="3" rx="0.3" fill="currentColor" opacity="0.5" />
  </svg>
)

const FinancialServicesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 18 7 13 10 15 13 10 15 12" />
    <path d="M15 12H17" strokeWidth="1.5" />
    <circle cx="18" cy="12" r="1" />
    <path d="M19 12H20" strokeWidth="1.5" />
    <path d="M20 12V10M20 10H22M20 12V14M20 14H22" strokeWidth="1" />
    <circle cx="13" cy="10" r="1" />
    <circle cx="10" cy="15" r="0.75" opacity="0.5" />
    <line x1="3" y1="20" x2="21" y2="20" strokeWidth="1" opacity="0.3" />
    <line x1="3" y1="20" x2="3" y2="8" strokeWidth="1" opacity="0.3" />
  </svg>
)

interface Industry {
  slug: string
  icon: React.FC<IconProps>
  name: string
  tagline: string
  accentColor: string       // Tailwind arbitrary or utility for border
  accentIconBg: string      // Icon box bg on hover
  accentText: string        // Name text color on hover (inline style)
}

const industries: Industry[] = [
  {
    slug: 'med-spas',
    icon: MedSpaIcon,
    name: 'Med Spas & Aesthetics',
    tagline: 'Automated booking, follow-ups, and patient retention that keeps your chairs full.',
    accentColor: 'hover:border-l-4 hover:border-l-pink-400',
    accentIconBg: 'group-hover:bg-pink-50 group-hover:border-pink-200 dark:group-hover:bg-pink-950/30 dark:group-hover:border-pink-800',
    accentText: '#f472b6',
  },
  {
    slug: 'trades',
    icon: TradesIcon,
    name: 'Trades & Home Services',
    tagline: 'Lead gen that books jobs while you\'re on the job — no missed calls, no lost estimates.',
    accentColor: 'hover:border-l-4 hover:border-l-orange-400',
    accentIconBg: 'group-hover:bg-orange-50 group-hover:border-orange-200 dark:group-hover:bg-orange-950/30 dark:group-hover:border-orange-800',
    accentText: '#fb923c',
  },
  {
    slug: 'construction',
    icon: ConstructionIcon,
    name: 'Construction',
    tagline: 'Bid tracking, subcontractor coordination, and client updates running on autopilot.',
    accentColor: 'hover:border-l-4 hover:border-l-amber-400',
    accentIconBg: 'group-hover:bg-amber-50 group-hover:border-amber-200 dark:group-hover:bg-amber-950/30 dark:group-hover:border-amber-800',
    accentText: '#fbbf24',
  },
  {
    slug: 'professional-services',
    icon: ProfessionalServicesIcon,
    name: 'Professional Services',
    tagline: 'Client intake, document automation, and follow-up sequences built around how you work.',
    accentColor: 'hover:border-l-4 hover:border-l-slate-500',
    accentIconBg: 'group-hover:bg-slate-100 group-hover:border-slate-300 dark:group-hover:bg-slate-800/50 dark:group-hover:border-slate-600',
    accentText: '#64748b',
  },
  {
    slug: 'real-estate',
    icon: RealEstateIcon,
    name: 'Real Estate',
    tagline: 'AI agents that qualify leads and schedule showings 24/7 — even when you\'re showing another property.',
    accentColor: 'hover:border-l-4 hover:border-l-emerald-500',
    accentIconBg: 'group-hover:bg-emerald-50 group-hover:border-emerald-200 dark:group-hover:bg-emerald-950/30 dark:group-hover:border-emerald-800',
    accentText: '#10b981',
  },
  {
    slug: 'small-business',
    icon: SmallBusinessIcon,
    name: 'General Small Business',
    tagline: 'Custom AI systems built around your exact operation, whatever that looks like.',
    accentColor: 'hover:border-l-4 hover:border-l-blue-500',
    accentIconBg: 'group-hover:bg-blue-50 group-hover:border-blue-200 dark:group-hover:bg-blue-950/30 dark:group-hover:border-blue-800',
    accentText: '#3b82f6',
  },
  {
    slug: 'underwriters',
    icon: UnderwritersIcon,
    name: 'Underwriters',
    tagline: 'AI-powered risk assessment, automated document analysis, and faster approvals with fewer errors.',
    accentColor: 'hover:border-l-4 hover:border-l-purple-500',
    accentIconBg: 'group-hover:bg-purple-50 group-hover:border-purple-200 dark:group-hover:bg-purple-950/30 dark:group-hover:border-purple-800',
    accentText: '#a855f7',
  },
  {
    slug: 'ma-due-diligence',
    icon: MADueDiligenceIcon,
    name: 'M&A & Due Diligence',
    tagline: 'Deal analysis, financial modeling, and automated quality of earnings reports in a fraction of the time.',
    accentColor: 'hover:border-l-4 hover:border-l-yellow-500',
    accentIconBg: 'group-hover:bg-yellow-50 group-hover:border-yellow-200 dark:group-hover:bg-yellow-950/30 dark:group-hover:border-yellow-800',
    accentText: '#eab308',
    hasDemo: true,
  },
  {
    slug: 'financial-services',
    icon: FinancialServicesIcon,
    name: 'Financial Services',
    tagline: 'Portfolio analytics, compliance automation, and client reporting that runs itself.',
    accentColor: 'hover:border-l-4 hover:border-l-teal-500',
    accentIconBg: 'group-hover:bg-teal-50 group-hover:border-teal-200 dark:group-hover:bg-teal-950/30 dark:group-hover:border-teal-800',
    accentText: '#14b8a6',
  },
]

export function Industries() {
  const navigate = useNavigate()

  const scrollToContact = () => smoothScrollTo('contact')

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                onClick={() => navigate(`/industry/${industry.slug}`)}
                className={`group cursor-pointer transition-all duration-400 ease-out px-5 py-7 rounded-xl bg-white dark:bg-card border border-transparent hover:border-border/50 hover:-translate-y-1 glass-card-hover dark:hover:bg-white/[0.04] dark:hover:backdrop-blur-xl dark:hover:border-white/10 dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${industry.accentColor}`}
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
          {/* spacer */}
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
