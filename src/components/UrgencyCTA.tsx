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
    <section className="relative py-20 bg-[#0a0a0a] overflow-hidden">
      {/* Accent glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-transparent to-accent-emerald/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-accent-blue/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
            Curious what AI could do for{' '}
            <span className="text-accent-blue">your specific business?</span>
          </h2>

          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            Every business is different — and the best way to find out where AI fits into yours is a real conversation. No pitch deck, no pressure. Just an honest look at what's possible.
          </p>

          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-10 py-6 rounded-xl text-base shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Let's Figure It Out Together
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-white/30 text-sm mt-4">Free call. Real conversation. That's it.</p>
        </motion.div>
      </div>
    </section>
  )
}
