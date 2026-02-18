'use client'

import { motion } from 'framer-motion'

interface PullQuoteProps {
  quote: string
  bg?: 'background' | 'card'
}

export function PullQuote({ quote, bg = 'background' }: PullQuoteProps) {
  return (
    <div className={bg === 'card' ? 'bg-card' : 'bg-background'}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto px-6 sm:px-8 py-14 sm:py-16 text-center"
      >
        {/* Opening mark */}
        <span
          className="block font-serif text-6xl leading-none text-foreground/15 mb-2 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="font-serif italic text-2xl sm:text-3xl text-foreground/65 leading-relaxed">
          {quote}
        </p>
      </motion.div>
    </div>
  )
}
