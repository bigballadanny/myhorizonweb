'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { captureLead } from '@/lib/lead-capture'

export function HeroCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setLoading(true)
    setError(null)
    const result = await captureLead({
      email,
      source: 'lead_form',
      notes: 'Hero section capture — free AI game plan',
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError(result.message)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mt-4"
        role="status"
        tabIndex={-1}
      >
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>We'll send your free AI game plan within 24 hours.</span>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 mt-4 max-w-md"
    >
      <label htmlFor="hero-email" className="sr-only">Work email</label>
      <input
        id="hero-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        autoComplete="email"
        aria-describedby={error ? 'hero-email-error' : undefined}
        className="flex-1 min-h-11 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-11 items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all whitespace-nowrap"
      >
        {loading ? 'Sending...' : 'Get Free AI Game Plan'}
        {!loading && <ArrowRight className="w-3.5 h-3.5" />}
      </button>
      {error && (
        <p id="hero-email-error" role="alert" className="basis-full text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </motion.form>
  )
}
