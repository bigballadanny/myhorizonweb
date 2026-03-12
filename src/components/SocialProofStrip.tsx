'use client'

import { motion } from 'framer-motion'

const partners = [
  { name: 'OpenAI', logo: '🤖' },
  { name: 'Stripe', logo: '💳' },
  { name: 'Make.com', logo: '⚡' },
  { name: 'ElevenLabs', logo: '🎙️' },
  { name: 'Supabase', logo: '⚡' },
  { name: 'Cal.com', logo: '📅' },
]

export function SocialProofStrip() {
  return (
    <section className="relative py-8 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Powered by
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-xl">{partner.logo}</span>
                <span className="text-sm font-medium">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
