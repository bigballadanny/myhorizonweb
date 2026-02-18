'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { captureLead } from '@/lib/lead-capture'

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const industries = [
    'Med Spa / Clinic',
    'Construction / Contractor',
    'Real Estate',
    'Restaurant / Food Service',
    'Professional Services (Law, Accounting)',
    'Trades (Plumbing, HVAC, Electric)',
    'Other',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const email = formData.email.trim()
    if (!email || !email.includes('@')) return

    setLoading(true)
    await captureLead({
      email,
      name: formData.name.trim() || undefined,
      company: formData.company.trim() || undefined,
      source: 'lead_form',
      notes: `Industry: ${formData.industry || 'Not specified'}. From contact section lead form.`,
    })
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-emerald-500" />
        </div>
        <h3 className="font-serif text-2xl text-foreground mb-2">You're on the list!</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          We'll review your info and reach out within 24 hours with a personalized AI game plan for your business.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Or book a time below to talk live ↓
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-primary" />
        <p className="text-xs uppercase tracking-widest font-semibold text-primary">
          Quick — 30 Seconds
        </p>
      </div>
      <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
        Not ready to book a call yet?
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Drop your info and we'll send you a personalized AI game plan for your business — free, no call required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            placeholder="Your name"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            placeholder="your@email.com *"
            required
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
          placeholder="Business name (optional)"
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
        />

        <select
          value={formData.industry}
          onChange={(e) => setFormData((p) => ({ ...p, industry: e.target.value }))}
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors appearance-none"
        >
          <option value="">What industry are you in?</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            'Sending...'
          ) : (
            <>
              Get My Free AI Game Plan
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        No spam. We'll review your business and respond with specific recommendations.
      </p>
    </div>
  )
}
