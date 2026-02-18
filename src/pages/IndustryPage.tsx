import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Wrench,
  HardHat,
  Briefcase,
  Home,
  Store,
  ShieldCheck,
  FileSearch,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  BarChart3,
} from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { industryData } from '@/data/industryData'

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Wrench,
  HardHat,
  Briefcase,
  Home,
  Store,
  ShieldCheck,
  FileSearch,
  TrendingUp,
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const industry = slug ? industryData[slug] : undefined

  if (!industry) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="container mx-auto px-6 py-40 text-center">
          <p className="section-label mb-4">404 — Not Found</p>
          <h1 className="font-serif text-4xl sm:text-5xl mb-6 text-foreground">
            Industry not found
          </h1>
          <p className="text-muted-foreground mb-10 text-lg max-w-md mx-auto">
            We couldn't find a page for that industry. Head back to see all the industries we serve.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-5 rounded-xl"
          >
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const Icon = iconMap[industry.iconName] ?? Sparkles

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section
          className="pt-32 pb-20 lg:pt-40 lg:pb-28"
          style={{ backgroundColor: industry.accentColorLight }}
        >
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Industries
              </Link>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              {/* Icon */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                  style={{ backgroundColor: industry.accentColor + '18', border: `1.5px solid ${industry.accentColor}40` }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: industry.accentColor }}
                  />
                </div>
              </motion.div>

              {/* Label */}
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="section-label mb-4">
                Industry Use Case
              </motion.p>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6"
              >
                {industry.name}
              </motion.h1>

              {/* Hook */}
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                {industry.hook}
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <a
                  href="https://cal.com/myhorizon/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="w-full sm:w-auto text-white px-8 py-5 rounded-xl text-base font-medium"
                    style={{ backgroundColor: industry.accentColor }}
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── METRICS STRIP ────────────────────────────────────────── */}
        <section className="py-14 border-y border-border bg-background">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-border"
            >
              {industry.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="lg:px-8 first:lg:pl-0 last:lg:pr-0"
                >
                  <p
                    className="font-serif text-4xl sm:text-5xl mb-1"
                    style={{ color: industry.accentColor }}
                  >
                    {m.value}
                  </p>
                  <p className="text-sm text-muted-foreground leading-snug">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── PAIN POINTS ──────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                <p className="section-label">The Problem</p>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-xl">
                Where businesses in this industry get stuck
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-0"
            >
              {industry.painPoints.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="border-t border-border py-8 sm:pr-12"
                  style={i % 2 === 1 ? { borderLeft: '1px solid var(--border)', paddingLeft: '3rem' } : {}}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center mb-4 text-xs font-bold text-white"
                    style={{ backgroundColor: industry.accentColor + 'cc' }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
              <div className="col-span-full border-t border-border" />
            </motion.div>
          </div>
        </section>

        {/* ─── SOLUTIONS ────────────────────────────────────────────── */}
        <section
          className="py-20 lg:py-28"
          style={{ backgroundColor: industry.accentColorLight }}
        >
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                <p className="section-label">How We Solve It</p>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-xl">
                AI-powered systems built for {industry.name.toLowerCase()}
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-0"
            >
              {industry.solutions.map((s, i) => (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-6 border-t border-border py-8"
                >
                  <div className="sm:w-8 flex-shrink-0 pt-1">
                    <span
                      className="font-serif text-2xl"
                      style={{ color: industry.accentColor }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-border" />
            </motion.div>
          </div>
        </section>

        {/* ─── USE CASES ────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-4 h-4 text-muted-foreground" />
                <p className="section-label">See It in Action</p>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-xl">
                Real scenarios, real results
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-6"
            >
              {industry.useCases.map((uc) => (
                <motion.div
                  key={uc.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-border bg-card p-8 sm:p-10"
                >
                  <div
                    className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-5"
                    style={{
                      backgroundColor: industry.accentColor + '15',
                      color: industry.accentColor,
                    }}
                  >
                    {uc.title}
                  </div>
                  <p className="text-foreground text-base sm:text-lg leading-relaxed font-serif">
                    "{uc.scenario}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── RESULTS METRICS (detail) ─────────────────────────────── */}
        <section
          className="py-20 lg:py-28"
          style={{ backgroundColor: industry.accentColorLight }}
        >
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <p className="section-label">What to Expect</p>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-xl">
                Outcomes that move the needle
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {industry.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-5 border-t border-border pt-6"
                >
                  <p
                    className="font-serif text-4xl sm:text-5xl leading-none flex-shrink-0"
                    style={{ color: industry.accentColor }}
                  >
                    {m.value}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed pt-1">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="section-label mb-5">Ready to get started?</p>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-6">
                Let's build something<br />
                <em>for your business</em>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
                Every system we build is custom. We start with a free consultation to understand your operation, identify the highest-leverage opportunities, and map out exactly what AI can do for you.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="https://cal.com/myhorizon/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="w-full sm:w-auto text-white px-9 py-5 rounded-xl text-base font-medium"
                    style={{ backgroundColor: industry.accentColor }}
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <Link to="/">
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto text-muted-foreground hover:text-foreground px-6 py-5 rounded-xl text-base"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
