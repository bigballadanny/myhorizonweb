import { motion } from 'framer-motion'
import { Navigation } from './components/Navigation'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { MarqueeStrip } from './components/MarqueeStrip'
import { Services } from './components/Services'
import { WhatWeDo } from './components/WhatWeDo'
import { Engagements } from './components/Engagements'
import { PullQuote } from './components/PullQuote'
import { Problem } from './components/Problem'
import { Industries } from './components/Industries'
import { Process } from './components/Process'
import { Results } from './components/Results'
import { UrgencyCTA } from './components/UrgencyCTA'
import { SynthiosProduct } from './components/SynthiosProduct'
import { PricingSection } from './components/PricingSection'
import { ForkSection } from './components/ForkSection'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Philosophy } from './components/Philosophy'
import { ElevenLabsWidget } from './components/ElevenLabsWidget'
import { NewsletterSignup } from './components/NewsletterSignup'
import { useVisitorTracking } from './hooks/useVisitorTracking'
import { useSmoothScroll, smoothScrollTo } from './hooks/useSmoothScroll'
import { useSEO } from './hooks/useSEO'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

export default function App() {
  useVisitorTracking()
  useSmoothScroll()
  const location = useLocation()
  
  useSEO({
    title: 'MyHorizon | Synthios - The AI Agent Team for Your Business',
    description: 'Synthios is an AI agent team that answers every lead, follows up until the job books, and remembers every customer. Business $197/mo, Personal $100/mo, 5-day free trial.',
    keywords: 'AI agents, AI agent team, business automation, lead follow-up, Synthios, MyHorizon, AI for service businesses',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Synthios',
      'operatingSystem': 'Cloud',
      'applicationCategory': 'BusinessApplication',
      'url': 'https://go.synthios.ai',
      'offers': {
        '@type': 'AggregateOffer',
        'lowPrice': '100',
        'highPrice': '197',
        'priceCurrency': 'USD',
        'offerCount': '2'
      },
      'description': 'Synthios is an AI agent team that answers every lead, follows up until the job books, and remembers every customer.',
      'creator': {
        '@type': 'Organization',
        'name': 'MyHorizon AI',
        'url': 'https://myhorizon.ai'
      }
    }
  });

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id)
        if (el) {
          smoothScrollTo(id)
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 100)
        }
      }
      tryScroll()
    }
  }, [location])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navigation />
      <main className="relative" role="main">

        {/* 1 — Hero */}
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>

        {/* Marquee trust strip — industries we serve */}
        <MarqueeStrip />

        {/* What MyHorizon does — the company, in plain terms */}
        <WhatWeDo />

        {/* 2 — Synthios, the flagship product */}
        <motion.section
          id="synthios"
          aria-label="Synthios product section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <SynthiosProduct />
        </motion.section>

        {/* 3 — Services */}
        <motion.section
          id="services"
          aria-label="Services section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <Services />
        </motion.section>

        {/* How a custom engagement runs, step by step */}
        <Engagements />

        {/* Pull quote — seeds the bigger-picture thinking */}
        <PullQuote
          quote="Artificial intelligence will be infrastructure — like water, electricity and the internet."
          author="Jensen Huang, CEO of NVIDIA"
          bg="card"
        />

        {/* 4 — Industries */}
        <motion.section
          id="industries"
          aria-label="Industries section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <Industries />
        </motion.section>

        {/* 5 — How it works */}
        <motion.section
          id="process"
          aria-label="How it works section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <Process />
        </motion.section>

        {/* 6 — Pricing */}
        <motion.section
          id="pricing"
          aria-label="Pricing section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <PricingSection />
        </motion.section>

        {/* 7 — Self-selection fork */}
        <ForkSection />

        {/* ATM Philosophy Section */}
        <Philosophy />

        {/* 6 — Results */}
        <motion.section
          aria-label="Results section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <Results />
        </motion.section>

        {/* 9 — Contact */}
        <motion.section
          id="contact"
          aria-label="Contact section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <Contact />
        </motion.section>

      </main>
      <Footer />
      <ElevenLabsWidget hasStickyMobileCTA />
    </div>
  )
}
