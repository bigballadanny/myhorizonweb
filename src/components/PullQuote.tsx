'use client'

import { motion } from 'framer-motion'

interface PullQuoteProps {
  quote: string
  author?: string
  bg?: 'background' | 'card'
}

export function PullQuote({ quote, author }: PullQuoteProps) {
  return (
    <div className="relative z-10">
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
        <p className="font-serif italic text-xl sm:text-2xl text-foreground/65 leading-relaxed">
          {quote}
        </p>
        {author && (
          <p className="mt-6 text-sm sm:text-base font-medium text-foreground/40 tracking-wider uppercase">
            — {author}
          </p>
        )}
      </motion.div>
    </div>
  )
}
