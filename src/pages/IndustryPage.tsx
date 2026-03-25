import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Users,
  ChevronDown,
  Calendar,
  MessageSquare,
  BarChart,
  Zap,
} from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ElevenLabsWidget } from '@/components/ElevenLabsWidget'
import { industryData, type IndustryData } from '@/data/industryData'
import { useSEO } from '@/hooks/useSEO'

type IconProps = React.SVGProps<SVGSVGElement>

const MedSpaIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
    <circle cx="12" cy="14" r="7"/>
    <path d="M12 7V3M9 5l3-3 3 3"/>
  </svg>
)

const TradesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
  </svg>
)

const ConstructionIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
    <rect x="3" y="18" width="18" height="3" rx="1"/>
    <rect x="5" y="12" width="14" height="4" rx="1"/>
    <rect x="8" y="6" width="8" height="4" rx="1"/>
    <rect x="10" y="2" width="4" height="3" rx="1"/>
  </svg>
)

const ProfessionalServicesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
    <path d="M4 6h16M4 12h10M4 18h13"/>
  </svg>
)

const RealEstateIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 12L12 3L21 12"/>
    <path d="M5 10v10h14V10"/>
    <rect x="9" y="15" width="6" height="5"/>
  </svg>
)

const SmallBusinessIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="1"/>
    <path d="M3 9h18"/>
    <path d="M9 21V9"/>
  </svg>
)

const UnderwritersIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2Z"/>
  </svg>
)

const MADueDiligenceIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <circle cx="9" cy="12" r="7"/>
    <circle cx="15" cy="12" r="7"/>
  </svg>
)

const FinancialServicesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
    <path d="M4 20V12"/>
    <path d="M10 20V6"/>
    <path d="M16 20V10"/>
    <path d="M22 20V4"/>
    <path d="M2 20h21"/>
  </svg>
)

const iconMap: Record<string, React.FC<IconProps>> = {
  MedSpaIcon,
  TradesIcon,
  ConstructionIcon,
  ProfessionalServicesIcon,
  RealEstateIcon,
  SmallBusinessIcon,
  UnderwritersIcon,
  MADueDiligenceIcon,
  FinancialServicesIcon,
}

const solutionIcons = [Calendar, MessageSquare, BarChart, Zap, Users]

const faqs = [
  {
    q: 'How long does setup take?',
    a: 'Most implementations go live within 3-6 weeks. Simpler automations can be running in under 2 weeks.',
  },
  {
    q: 'Do I need technical staff or developers?',
    a: 'No. We handle the entire build and integration. Your team just uses the finished system.',
  },
  {
    q: 'What tools does it connect to?',
    a: 'We integrate with the tools you already use — Google Workspace, QuickBooks, most CRMs, scheduling software, and more. If you use it, we can almost certainly connect to it.',
  },
  {
    q: 'How is this different from a generic chatbot?',
    a: 'Generic chatbots answer FAQs. SYNTHIOS agents take actions — they book appointments, send follow-ups, qualify leads, and run workflows. Built specifically for your business, not a template.',
  },
  {
    q: 'What happens if something breaks or needs updating?',
    a: 'We monitor the system and handle updates. You have a direct line to us, not a support ticket queue.',
  },
  {
    q: 'What does it cost?',
    a: 'Every build is different. We start with a free 30-minute strategy call to understand your situation — no pitch, just honest answers about what is and is not worth automating for your business.',
  },
]

/* ─── Animated counter ────────────────────────────────────── */
function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    // Extract the numeric part and suffix
    const match = value.match(/^([<>~]?)(\d+)(.*)$/)
    if (!match) { setDisplay(value); return }

    const prefix = match[1]
    const target = parseInt(match[2], 10)
    const suffix = match[3]
    const duration = 1200
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(target * eased)
      setDisplay(`${prefix}${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{display}</span>
}

/* ─── Use Cases (tabbed) ──────────────────────────────────── */
function UseCaseTabs({ industry }: { industry: IndustryData }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
            Real scenarios, real results
          </h2>
        </motion.div>

        {/* Tab bar */}
        <div className="mb-10 overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-2 min-w-max">
            {industry.useCases.map((uc, i) => (
              <button
                key={uc.title}
                onClick={() => setActiveTab(i)}
                className="relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer"
                style={
                  activeTab === i
                    ? { backgroundColor: industry.accentColor, color: '#fff' }
                    : { backgroundColor: 'transparent', color: 'var(--muted-foreground)' }
                }
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="activeUseCaseTab"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: industry.accentColor }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{uc.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-950 rounded-3xl p-10 sm:p-14 overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-6">
                  Case {String(activeTab + 1).padStart(2, '0')}
                </p>
                <h3 className="text-white text-lg font-medium mb-6">
                  {industry.useCases[activeTab].title}
                </h3>
                <blockquote className="text-zinc-300 text-2xl sm:text-3xl leading-relaxed font-serif">
                  <span className="text-zinc-600">&ldquo;</span>
                  {industry.useCases[activeTab].scenario}
                  <span className="text-zinc-600">&rdquo;</span>
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════ */
export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const industry = slug ? industryData[slug] : undefined

  useSEO({
    title: industry ? `${industry.name} AI Operations | SYNTHIOS by MyHorizon` : 'Industry AI | MyHorizon',
    description: industry ? `SYNTHIOS AI infrastructure tailored for ${industry.name}. ${industry.tagline}` : '',
    keywords: `AI for ${industry?.name}, AI agent, business automation, SYNTHIOS, MyHorizon AI`,
    schema: industry ? {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': `SYNTHIOS AI for ${industry.name}`,
      'provider': {
        '@type': 'Organization',
        'name': 'MyHorizon AI',
        'url': 'https://myhorizon.ai'
      },
      'description': industry.hook
    } : undefined
  });

  if (!industry) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />
        <div className="flex-1 container mx-auto px-6 py-40 text-center flex flex-col items-center justify-center">
          <p className="section-label mb-4">404 — Not Found</p>
          <h1 className="font-serif text-4xl sm:text-5xl mb-6 text-foreground">
            Industry not found
          </h1>
          <p className="text-muted-foreground mb-10 text-lg max-w-md mx-auto">
            We couldn't find a page for that industry. Head back to see all the industries we serve.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-xl text-lg font-medium"
          >
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const Icon = iconMap[industry.iconName] ?? MedSpaIcon

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <main>
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-white dark:bg-black">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
            {/* Breadcrumb with icon */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-14 flex items-center gap-3"
            >
              <Icon className="w-10 h-10 text-muted-foreground" />
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Industries
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
              {/* Left: text */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-serif text-5xl sm:text-6xl lg:text-[72px] text-foreground leading-[1.05] tracking-tight mb-6"
                >
                  {industry.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl line-clamp-2 mb-10"
                >
                  {industry.hook}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <a
                    href="https://cal.com/myhorizon/consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="text-white px-10 py-7 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                      style={{ backgroundColor: industry.accentColor }}
                    >
                      Book a Free Consultation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* Right: metric cards 2x2 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-2 gap-4"
              >
                {industry.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm"
                  >
                    <p
                      className="font-serif text-3xl sm:text-4xl font-semibold mb-1.5"
                      style={{ color: industry.accentColor }}
                    >
                      <AnimatedMetric value={m.value} />
                    </p>
                    <p className="text-sm text-muted-foreground font-medium leading-tight">{m.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── LIVE DEMO (conditional) ──────────────────────────── */}
        {industry.demoUrl && (
          <section className="py-20 bg-background relative z-20">
            <div className="container mx-auto px-5 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-border/50 overflow-hidden bg-background shadow-lg"
              >
                <div className="flex flex-col lg:flex-row gap-0">
                  <div className="p-10 sm:p-14 lg:w-1/2 flex flex-col justify-center">
                    <div
                      className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase w-fit border"
                      style={{ backgroundColor: `${industry.accentColor}10`, color: industry.accentColor, borderColor: `${industry.accentColor}30` }}
                    >
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: industry.accentColor }} />
                      Live Platform
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4">
                      See the real thing in action
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                      Experience the AI system firsthand. Play with a working demo tailored for your workflow.
                    </p>
                    <a href={industry.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="w-full sm:w-fit text-white px-8 py-6 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-base"
                        style={{ backgroundColor: industry.accentColor }}
                      >
                        Try the Live Demo
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </a>
                  </div>
                  <div
                    className="lg:w-1/2 flex items-center justify-center p-10 min-h-[300px] relative overflow-hidden"
                    style={{ backgroundColor: `${industry.accentColor}08` }}
                  >
                    <div className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, ${industry.accentColor} 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                      }}
                    />
                    <div className="relative z-10 text-center bg-background/80 backdrop-blur-md p-8 rounded-3xl border border-border shadow-lg">
                      <div className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${industry.accentColor}20` }}>
                        <Zap className="w-7 h-7" style={{ color: industry.accentColor }} />
                      </div>
                      <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: industry.accentColor }}>Interactive Sandbox</p>
                      <p className="text-muted-foreground text-sm font-medium">No signup required</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ─── PAIN POINTS — dark magazine section ─────────────── */}
        <section className="relative overflow-hidden">
          <div className="bg-zinc-950 py-24 lg:py-32">
            <div className="container mx-auto px-5 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight">
                  Where it breaks down
                </h2>
              </motion.div>

              <div className="max-w-2xl">
                {industry.painPoints.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <div className="border-l-2 border-zinc-700 pl-6 py-2">
                      <h3 className="text-white text-xl sm:text-2xl font-medium mb-2">{p.title}</h3>
                      <p className="text-zinc-400 text-base leading-relaxed">{p.description}</p>
                    </div>
                    {i < industry.painPoints.length - 1 && (
                      <hr className="border-zinc-800 my-8" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Gradient fade back to light */}
          <div className="h-24 bg-gradient-to-b from-zinc-950 to-background" />
        </section>

        {/* ─── SOLUTIONS — alternating layout ─────────────────── */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
                How we fix it
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              {industry.solutions.map((s, i) => {
                const isReversed = i % 2 !== 0
                const SolIcon = solutionIcons[i % solutionIcons.length]
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="py-16 first:pt-0 last:pb-0"
                  >
                    <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isReversed ? 'lg:[direction:rtl]' : ''}`}>
                      {/* Text */}
                      <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                        <SolIcon className="w-5 h-5 text-muted-foreground mb-4" />
                        <h3 className="font-serif text-2xl sm:text-[28px] text-foreground leading-snug mb-3">{s.title}</h3>
                        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{s.description}</p>
                      </div>
                      {/* Visual card */}
                      <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                        <div
                          className="bg-zinc-900 rounded-2xl p-10 sm:p-12 relative overflow-hidden min-h-[180px] flex items-end"
                          style={{ borderTop: `2px solid ${industry.accentColor}` }}
                        >
                          <span className="absolute top-6 left-8 font-serif text-[56px] leading-none font-light text-zinc-800 select-none pointer-events-none">
                            {s.title.split(' ').slice(0, 2).join(' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── USE CASES (Tabbed) ─────────────────────────────── */}
        <UseCaseTabs industry={industry} />

        {/* ─── FAQ ────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32 bg-background relative">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="mb-14 text-center"
            >
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
                Questions Worth Asking
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Accordion.Root type="multiple" className="divide-y divide-border border-y border-border">
                {faqs.map((faq, i) => (
                  <Accordion.Item key={i} value={`faq-${i}`} className="group">
                    <Accordion.Trigger className="flex w-full items-center justify-between py-6 text-left text-lg font-medium text-foreground hover:text-foreground/80 transition-colors cursor-pointer [&[data-state=open]>svg]:rotate-180">
                      {faq.q}
                      <ChevronDown className="w-5 h-5 shrink-0 ml-4 text-muted-foreground transition-transform duration-300" />
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <p className="pb-6 text-muted-foreground text-base leading-relaxed pr-8">
                        {faq.a}
                      </p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────── */}
        <section className="relative py-32 lg:py-48 overflow-hidden">
          {industry.ctaImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${industry.ctaImage})` }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: industry.accentColor }}
            />
          )}

          <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />

          <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <Users className="w-4 h-4 text-white/80" />
                <span className="text-sm font-semibold tracking-wide">Join 50+ businesses already using AI</span>
              </div>

              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-8">
                Ready to scale your <br className="hidden sm:block" />
                <span className="opacity-90">{industry.name}</span> operations?
              </h2>

              <p className="text-white/80 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-12 max-w-2xl mx-auto font-light">
                Stop losing hours to manual workflows. Let's map out exactly what AI can do for your business in a free, no-obligation consultation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <a
                  href="https://cal.com/myhorizon/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    className="w-full sm:w-auto bg-white text-black hover:bg-white/90 px-10 py-7 rounded-2xl text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Book Your Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link to="/" className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto text-white hover:bg-white/10 px-8 py-7 rounded-2xl text-lg font-medium transition-all duration-300"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <ElevenLabsWidget
        accentColor={industry.accentColor}
        industryName={industry.name}
        openingMessage={`Hi! I'm the ${industry.name} AI specialist at MyHorizon. I can walk you through exactly how AI automation would work for your business. What's your biggest challenge right now?`}
      />
    </div>
  )
}
