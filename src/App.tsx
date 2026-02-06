import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Results } from './components/Results'
import { SynthiosProduct } from './components/SynthiosProduct'
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
        <section id="services" aria-label="Services section">
          <Services />
        </section>
        <Results />
        <section id="synthios" aria-label="SYNTHIOS Product section">
          <SynthiosProduct />
        </section>
        <section id="contact" aria-label="Contact section">
          <Contact />
        </section>
      </main>
      <Footer />
      <ElevenLabsWidget />
    </div>
  )
}
