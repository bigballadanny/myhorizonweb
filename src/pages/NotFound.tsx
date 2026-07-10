import { ArrowLeft, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main id="main-content" className="flex-1 flex items-center pt-28 pb-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="section-label mb-5">Page not found</p>
          <h1 className="font-serif text-5xl sm:text-6xl mb-5">Let&apos;s get you back on track.</h1>
          <p className="text-muted-foreground max-w-lg mx-auto mb-9">
            That page may have moved. You can return home or go directly to a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl px-7 py-6">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to MyHorizon
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl px-7 py-6">
              <Link to="/#contact">
                <Calendar className="w-4 h-4 mr-2" />
                Book a consultation
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
