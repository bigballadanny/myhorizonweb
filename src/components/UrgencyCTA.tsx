'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

export function UrgencyCTA() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="section-label mb-6">Let's Talk</p>

          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
            Ready to see what AI can do for your business?
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Every business is different — and the best way to find out where AI fits into yours is a real conversation. No pitch deck, no pressure. Just an honest look at what's possible.
          </p>

          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-10 py-6 rounded-xl text-base transition-all duration-200"
          >
            Book a Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-muted-foreground text-sm mt-4">Free call. Real conversation. That's it.</p>
        </motion.div>
      </div>
    </section>
  )
}
