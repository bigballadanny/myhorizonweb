import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Awards } from './components/Awards'
import { About } from './components/About'
import { Services } from './components/Services'
import { SynthiosProduct } from './components/SynthiosProduct'
// Team import removed - section deprecated
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ElevenLabsWidget } from './components/ElevenLabsWidget'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <Navigation />
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <section id="portfolio" aria-label="Portfolio section">
          <Portfolio />
        </section>
        <section id="awards" aria-label="Awards section">
          <Awards />
        </section>
        <section id="about" aria-label="About section">
          <About />
        </section>
        <section id="services" aria-label="Services section">
          <Services />
        </section>
        <section id="synthios" aria-label="SYNTHIOS Product section">
          <SynthiosProduct />
        </section>
        {/* Team section removed - outdated aesthetic */}
        <section id="contact" aria-label="Contact section">
          <Contact />
        </section>
      </main>
      <Footer />
      <ElevenLabsWidget />
    </div>
  )
}