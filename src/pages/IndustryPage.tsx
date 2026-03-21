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
  Users,
  Zap,
} from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ElevenLabsWidget } from '@/components/ElevenLabsWidget'
import { industryData } from '@/data/industryData'
import { useSEO } from '@/hooks/useSEO'

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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

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

  const Icon = iconMap[industry.iconName] ?? Sparkles

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <main>
        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
          {/* Glass-morphism & Mesh Gradient Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base tint matching accent color lightly */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{ backgroundColor: industry.accentColorLight }} />
            
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-50 dark:opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Animated floating orbs */}
            <motion.div
              animate={{ 
                x: [0, 40, -20, 0], 
                y: [0, -50, 30, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
              style={{ backgroundColor: industry.accentColor }}
            />
            <motion.div
              animate={{ 
                x: [0, -30, 40, 0], 
                y: [0, 40, -40, 0],
                scale: [1, 0.95, 1.05, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen"
              style={{ backgroundColor: industry.accentColorLight }}
            />
            
            {/* Bottom gradient fade for smooth transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                All Industries
              </Link>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-4xl"
            >
              {/* Icon */}
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="relative inline-block mb-10">
                <div className="absolute inset-0 rounded-3xl blur-xl opacity-50" style={{ backgroundColor: industry.accentColor }} />
                <div 
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center bg-background/60 backdrop-blur-xl border shadow-2xl"
                  style={{ borderColor: `${industry.accentColor}40` }}
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" style={{ color: industry.accentColor }} />
                </div>
              </motion.div>

              {/* Label */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-5 flex items-center gap-2">
                <span className="w-8 h-px bg-muted-foreground/30" />
                <p className="section-label m-0" style={{ color: industry.accentColor }}>Industry Use Case</p>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-8 tracking-tight"
              >
                {industry.name}
              </motion.h1>

              {/* Hook */}
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                {industry.hook}
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-12"
              >
                <a
                  href="https://cal.com/myhorizon/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="w-full sm:w-auto text-white px-10 py-7 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    style={{ backgroundColor: industry.accentColor }}
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </motion.div>

              {/* Hero stat strip */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl"
              >
                {industry.metrics.slice(0, 3).map((m) => (
                  <div 
                    key={m.label} 
                    className="bg-background/40 dark:bg-background/20 backdrop-blur-md border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm group hover:shadow-md transition-shadow"
                  >
                    <p className="font-serif text-3xl sm:text-4xl mb-2 font-semibold" style={{ color: industry.accentColor }}>
                      {m.value}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground font-medium leading-tight">{m.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── LIVE DEMO (conditional) ──────────────────────────────── */}
        {industry.demoUrl && (
          <section className="py-20 bg-background relative z-20">
            <div className="container mx-auto px-5 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-border/50 overflow-hidden bg-background/50 backdrop-blur-xl shadow-2xl relative"
                style={{ boxShadow: `0 20px 40px -20px ${industry.accentColor}30` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="flex flex-col lg:flex-row gap-0">
                  <div className="p-10 sm:p-14 lg:w-1/2 flex flex-col justify-center relative z-10">
                    <div
                      className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase w-fit shadow-sm border"
                      style={{ backgroundColor: `${industry.accentColor}10`, color: industry.accentColor, borderColor: `${industry.accentColor}30` }}
                    >
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: industry.accentColor }} />
                      Live Platform
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4">
                      See the real thing in action
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                      Experience the AI system firsthand. Play with a working demo tailored for your workflow—not just slides or mockups.
                    </p>
                    <a
                      href={industry.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="w-full sm:w-fit text-white px-8 py-6 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
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
                    {/* Abstract demo visual */}
                    <div className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, ${industry.accentColor} 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                      }}
                    />
                    <div className="relative z-10 text-center bg-background/80 backdrop-blur-md p-8 rounded-3xl border border-border shadow-2xl">
                      <div className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-inner" style={{ backgroundColor: `${industry.accentColor}20` }}>
                        <Sparkles className="w-7 h-7" style={{ color: industry.accentColor }} />
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

        {/* ─── METRICS STRIP (Divider Style) ───────────────────────── */}
        <section className="py-16 border-y border-border/50 bg-background relative z-10">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x divide-border/50"
            >
              {industry.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="lg:px-8 flex flex-col items-center text-center first:lg:pl-0 last:lg:pr-0"
                >
                  <p
                    className="font-serif text-5xl sm:text-6xl mb-3 font-semibold tracking-tight"
                    style={{ color: industry.accentColor }}
                  >
                    {m.value}
                  </p>
                  <p className="text-base font-medium text-muted-foreground leading-snug max-w-[150px]">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── PAIN POINTS ──────────────────────────────────────────── */}
        <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
          {/* Subtle background gradient to connect sections */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center flex flex-col items-center"
            >
              <div 
                className="inline-flex items-center justify-center p-3.5 rounded-2xl mb-6 shadow-sm border border-border/50 bg-background/50 backdrop-blur-sm"
              >
                <AlertCircle className="w-6 h-6" style={{ color: industry.accentColor }} />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight max-w-2xl mb-5">
                Where the industry gets stuck
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                The hidden bottlenecks costing you time, scale, and revenue.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
              {industry.painPoints.map((p, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                    className={`flex flex-col sm:flex-row ${isEven ? 'sm:justify-start' : 'sm:justify-end'}`}
                  >
                    <div 
                      className="w-full sm:w-[85%] lg:w-[75%] relative bg-background/60 backdrop-blur-xl border rounded-3xl p-8 sm:p-10 shadow-lg group hover:shadow-xl transition-all duration-500"
                      style={{ 
                        borderColor: 'var(--border)', 
                        boxShadow: `0 10px 40px -10px ${industry.accentColor}10`
                      }}
                    >
                      {/* Subtle hover glow border */}
                      <div 
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 0 1px ${industry.accentColor}50` }}
                      />
                      
                      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative z-10">
                        <div
                          className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl font-bold border shadow-inner"
                          style={{ 
                            backgroundColor: `${industry.accentColor}15`, 
                            color: industry.accentColor,
                            borderColor: `${industry.accentColor}30`
                          }}
                        >
                          0{i + 1}
                        </div>
                        <div>
                          <h3 className="font-serif text-2xl text-foreground mb-3">{p.title}</h3>
                          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{p.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── SOLUTIONS ────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-muted/30">
          {/* Smooth gradient fade top and bottom */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
          
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center flex flex-col items-center"
            >
              <div 
                className="inline-flex items-center justify-center p-3.5 rounded-2xl mb-6 shadow-sm border border-border bg-background"
              >
                <Zap className="w-6 h-6" style={{ color: industry.accentColor }} />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight max-w-2xl mb-5">
                AI-powered systems built for {industry.name.toLowerCase()}
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                We build tailored AI solutions that directly address your bottlenecks and scale your operations.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {industry.solutions.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="relative bg-background rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group"
                >
                  {/* Left edge accent gradient */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-2 opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      background: `linear-gradient(to bottom, ${industry.accentColor}, ${industry.accentColorLight})` 
                    }} 
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 p-8 sm:p-10 ml-2">
                    <div className="sm:w-20 flex-shrink-0 flex items-start">
                      <span
                        className="font-serif text-6xl sm:text-7xl font-light tracking-tighter opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{ color: industry.accentColor }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl text-foreground mb-3">{s.title}</h3>
                      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── USE CASES (Bento Grid) ───────────────────────────────── */}
        <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
          {/* Subtle pattern texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-5">
                  <Lightbulb className="w-5 h-5" style={{ color: industry.accentColor }} />
                  <p className="section-label m-0" style={{ color: industry.accentColor }}>See It in Action</p>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
                  Real scenarios,<br className="hidden sm:block" /> real results
                </h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-md md:text-right pb-2">
                How our custom AI implementations transform day-to-day operations and bottom-line metrics.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {industry.useCases.map((uc, i) => {
                // Bento sizing - make every 1st and 4th card span 2 cols on lg screens
                const isWide = (i % 4 === 0) || (i % 4 === 3);
                return (
                  <motion.div
                    key={uc.title}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className={`relative bg-background/60 backdrop-blur-xl border border-border shadow-sm rounded-3xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-all duration-300 ${
                      isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                    }`}
                  >
                    {/* Colored top border */}
                    <div 
                      className="absolute top-0 inset-x-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity" 
                      style={{ backgroundColor: industry.accentColor }} 
                    />
                    
                    {/* Decorative background gradient orb */}
                    <div 
                      className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                      style={{ backgroundColor: industry.accentColor }}
                    />

                    <div className="relative z-10">
                      <div
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8 border"
                        style={{
                          backgroundColor: `${industry.accentColor}10`,
                          color: industry.accentColor,
                          borderColor: `${industry.accentColor}20`
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {uc.title}
                      </div>
                      <blockquote className="text-foreground text-xl sm:text-2xl leading-relaxed font-serif">
                        "{uc.scenario}"
                      </blockquote>
                    </div>
                    
                    <div className="relative z-10 mt-10 pt-6 border-t border-border/50 flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Proven Implementation</span>
                      <CheckCircle2 className="w-6 h-6" style={{ color: industry.accentColor }} />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────── */}
        <section className="relative py-28 lg:py-40 overflow-hidden">
          {/* Deep vibrant background */}
          <div 
            className="absolute inset-0 transition-colors duration-500" 
            style={{ backgroundColor: industry.accentColor }} 
          />
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" /> {/* Contrast overlay */}
          
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[150%] bg-white/10 rotate-12 blur-[120px] rounded-full" />
            <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[120%] bg-black/20 -rotate-12 blur-[100px] rounded-full" />
            
            {/* Subtle grid pattern for texture */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '4rem 4rem',
              }}
            />
          </div>

          <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <Users className="w-4 h-4" />
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
                    className="w-full sm:w-auto bg-white text-black hover:bg-white/90 px-10 py-7 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
