'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Megaphone, BarChart3 } from 'lucide-react'

const products = [
  {
    name: 'Pocket Marketer',
    tagline: 'AI-powered marketing platform for small businesses',
    description:
      'A full marketing intelligence platform — campaign generation, competitor analysis, ad copy, and social content — all AI-driven. Built to give small business owners an unfair advantage over much larger competitors.',
    url: 'https://pocketmarketer.ai',
    urlLabel: 'pocketmarketer.ai',
    icon: Megaphone,
    accentColor: '#8b5cf6',
    accentLight: 'rgba(139,92,246,0.08)',
    accentBorder: 'rgba(139,92,246,0.2)',
    tags: ['Marketing Automation', 'AI Content', 'Ad Intelligence'],
    stat: { value: '$8.6k', label: 'monthly recurring revenue' },
  },
  {
    name: 'DealFlow Lite',
    tagline: 'M&A deal intelligence for acquisition professionals',
    description:
      'An end-to-end deal analysis platform — CIM extraction, EBITDA normalization, quality of earnings, and scoring — all AI-powered. Built for buyers who need to evaluate more deals, faster, without sacrificing rigor.',
    url: 'https://dealflow-lite-143312280982.us-central1.run.app',
    urlLabel: 'dealflow-lite →',
    icon: BarChart3,
    accentColor: '#eab308',
    accentLight: 'rgba(234,179,8,0.08)',
    accentBorder: 'rgba(234,179,8,0.2)',
    tags: ['M&A Intelligence', 'Deal Scoring', 'QoE Automation'],
    stat: { value: '36+', label: 'deals analyzed in production' },
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 bg-muted border border-border px-4 py-1.5 rounded-full">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Built by MyHorizon</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight max-w-xl">
              Products we've shipped
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-sm leading-relaxed">
              Not mockups. Not case studies. Live platforms built on the same systems we deploy for clients.
            </p>
          </div>
        </motion.div>

        {/* Product Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {products.map((product) => {
            const Icon = product.icon
            return (
              <motion.a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[2rem] border border-border bg-card overflow-hidden hover:border-border/80 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 block"
                style={{ '--accent': product.accentColor } as React.CSSProperties}
              >
                {/* Subtle accent gradient background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
                  style={{ background: `radial-gradient(circle at 80% 20%, ${product.accentColor}12, transparent 60%)` }}
                />

                <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col h-full">

                  {/* Top row — icon + link indicator */}
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: product.accentLight, border: `1px solid ${product.accentBorder}` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: product.accentColor }} />
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: product.accentLight, color: product.accentColor }}
                    >
                      <span>{product.urlLabel}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Name + tagline */}
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: product.accentColor }}>
                      {product.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-1">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full border font-medium"
                        style={{
                          backgroundColor: product.accentLight,
                          borderColor: product.accentBorder,
                          color: product.accentColor,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stat + CTA row */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <p className="font-serif text-2xl font-semibold leading-none mb-1" style={{ color: product.accentColor }}>
                        {product.stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{product.stat.label}</p>
                    </div>
                    <div
                      className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                      style={{ color: product.accentColor }}
                    >
                      Visit site
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </motion.a>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
