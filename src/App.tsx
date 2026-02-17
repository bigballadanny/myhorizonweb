import { motion } from 'framer-motion'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Problem } from './components/Problem'
import { Industries } from './components/Industries'
import { Process } from './components/Process'
import { Results } from './components/Results'
import { UrgencyCTA } from './components/UrgencyCTA'
import { SynthiosProduct } from './components/SynthiosProduct'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ElevenLabsWidget } from './components/ElevenLabsWidget'
import { useVisitorTracking } from './hooks/useVisitorTracking'

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function App() {
  useVisitorTracking()
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <Navigation />
      <main className="relative" role="main" style={{ overflow: 'visible' }}>

        {/* 1 — Hero: dark, empathy-first */}
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>

        {/* 2 — Services: light */}
        <motion.section
          id="services"
          aria-label="Services section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Services />
        </motion.section>

        {/* 3 — Problem: dark — why most AI projects fail */}
        <motion.section
          aria-label="Problem section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Problem />
        </motion.section>

        {/* 4 — Industries: light */}
        <motion.section
          id="industries"
          aria-label="Industries section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <Industries />
        </motion.section>

        {/* 5 — Process: light */}
        <motion.section
          aria-label="Process section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <Process />
        </motion.section>

        {/* 6 — Results: dark */}
        <motion.section
          aria-label="Results section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Results />
        </motion.section>

        {/* 7 — Urgency CTA: dark bridge */}
        <motion.section
          aria-label="Urgency CTA"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <UrgencyCTA />
        </motion.section>

        {/* 8 — SYNTHIOS: light */}
        <motion.section
          id="synthios"
          aria-label="SYNTHIOS Product section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SynthiosProduct />
        </motion.section>

        {/* 9 — Contact: subtle gray */}
        <motion.section
          id="contact"
          aria-label="Contact section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Contact />
        </motion.section>

      </main>
      <Footer />
      <ElevenLabsWidget />
    </div>
  )
}
