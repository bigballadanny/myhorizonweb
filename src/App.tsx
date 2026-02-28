import { motion } from 'framer-motion'
import { Navigation } from './components/Navigation'
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
import { ElevenLabsWidget } from './components/ElevenLabsWidget'
import { NewsletterSignup } from './components/NewsletterSignup'
import { StickyMobileCTA } from './components/StickyMobileCTA'
import { useVisitorTracking } from './hooks/useVisitorTracking'

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

export default function App() {
  useVisitorTracking()
  return (
    <div className="min-h-screen text-foreground selection:bg-accent-blue/30 selection:text-white" style={{ overflow: 'visible' }}>
      <Navigation />
      <main className="relative" role="main" style={{ overflow: 'visible' }}>

        {/* 1 — Hero */}
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>

        {/* Services & Lower Content Wrapper - Glassmorphic overlay to ensure readability over the fixed hero background while letting "flow" persist */}
        <div className="relative z-20 bg-black/40 backdrop-blur-[80px] border-t border-white/5">
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
            quote="The businesses that embrace AI early won't just save time — they'll build something their competitors can't catch up to."
          />

          {/* 3 — Opportunity (Problem) */}
          <motion.section
            aria-label="Opportunity section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Problem />
          </motion.section>

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

          {/* 5 — Process */}
          <motion.section
            aria-label="Process section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <Process />
          </motion.section>

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

          {/* 7 — Urgency CTA */}
          <motion.section
            aria-label="Urgency CTA"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <UrgencyCTA />
          </motion.section>

          {/* Newsletter signup — catches mid-page visitors */}
          <NewsletterSignup variant="banner" />

          {/* Pull quote — plants the SYNTHIOS seed */}
          <PullQuote
            quote="Imagine having a team member who knows every customer, never forgets a follow-up, and gets smarter every single day."
            bg="background"
          />

          {/* 8 — SYNTHIOS */}
          <motion.section
            id="synthios"
            aria-label="SYNTHIOS Product section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <SynthiosProduct />
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

          <StickyMobileCTA />
        </div>
      </main>
      <div className="relative z-20 bg-black/95 border-t border-white/10">
        <Footer />
      </div>
      <ElevenLabsWidget />
    </div>
  )
}
