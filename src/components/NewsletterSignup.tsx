'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { captureLead } from '@/lib/lead-capture'

interface NewsletterSignupProps {
  /** Visual variant */
  variant?: 'inline' | 'banner' | 'minimal'
  /** Custom heading */
  heading?: string
  /** Custom subtext */
  subtext?: string
}

export function NewsletterSignup({
  variant = 'inline',
  heading = 'Get AI insights for your industry',
  subtext = 'Weekly tips on how businesses like yours are using AI to save time and grow. No spam, unsubscribe anytime.',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) return

    setLoading(true)
    await captureLead({
      email: trimmed,
      source: 'newsletter',
      notes: `Newsletter signup from ${variant} variant`,
    })
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-3 ${
          variant === 'minimal' ? 'py-2' : 'py-4 px-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-emerald-500" />
        </div>
        <p className="text-sm text-foreground font-medium">
          You're in! We'll send your first AI insights this week.
        </p>
      </motion.div>
    )
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-1.5"
        >
          {loading ? '...' : 'Subscribe'}
          {!loading && <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </form>
    )
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-primary/5 via-card to-emerald-500/5 border-y border-border py-8">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-xs uppercase tracking-widest font-semibold text-primary">
                  Free AI Newsletter
                </p>
              </div>
              <h3 className="text-lg font-serif text-foreground mb-1">{heading}</h3>
              <p className="text-sm text-muted-foreground">{subtext}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto shrink-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 md:w-64 bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground rounded-xl px-5 py-3 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors whitespace-nowrap"
              >
                {loading ? '...' : 'Get Insights →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Default: inline card
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <p className="text-xs uppercase tracking-widest font-semibold text-primary">
          Free AI Newsletter
        </p>
      </div>
      <h3 className="font-serif text-2xl text-foreground mb-2">{heading}</h3>
      <p className="text-sm text-muted-foreground mb-5 max-w-md">{subtext}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground rounded-xl px-5 py-3 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          {loading ? '...' : 'Subscribe →'}
        </button>
      </form>
      <p className="text-xs text-muted-foreground mt-3">
        Join 500+ business owners getting smarter about AI. Unsubscribe anytime.
      </p>
    </div>
  )
}
