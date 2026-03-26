import { motion } from 'framer-motion'
import { Navigation } from './components/Navigation'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { MarqueeStrip } from './components/MarqueeStrip'
import { Services } from './components/Services'
import { PullQuote } from './components/PullQuote'
import { Problem } from './components/Problem'
import { Industries } from './components/Industries'
import { Process } from './components/Process'
import { Results } from './components/Results'
import { UrgencyCTA } from './components/UrgencyCTA'
import { SynthiosProduct } from './components/SynthiosProduct'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Philosophy } from './components/Philosophy'
import { ElevenLabsWidget } from './components/ElevenLabsWidget'
import { NewsletterSignup } from './components/NewsletterSignup'
import { useVisitorTracking } from './hooks/useVisitorTracking'
import { useSmoothScroll } from './hooks/useSmoothScroll'
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
    title: 'MyHorizon | SYNTHIOS - AI Infrastructure for Business',
    description: 'We build custom AI agents that run your operations, remember your customers, and make decisions alongside your team.',
    keywords: 'AI agent, AI infrastructure, business automation, SYNTHIOS, MyHorizon AI, generative AI, AI assistant, operations automation',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'SYNTHIOS',
      'operatingSystem': 'Cloud',
      'applicationCategory': 'BusinessApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': 'SYNTHIOS is an AI infrastructure platform that remembers every customer, executes follow-ups, and operates business workflows 24/7.',
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
          el.scrollIntoView({ behavior: 'smooth' })
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

        {/* 2 — Services */}
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
