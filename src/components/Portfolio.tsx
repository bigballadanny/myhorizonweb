'use client'

import { Brain, ShoppingCart, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

export function Portfolio() {
  const caseStudies = [
    {
      icon: Brain,
      industry: "Financial Services",
      title: "AI Knowledge Base Chatbot",
      challenge: "Support team overwhelmed with 500+ repetitive M&A policy questions monthly",
      solution: "Custom AI chatbot trained on company documentation with Stripe payment integration for premium access",
      results: [
        "70% reduction in support tickets",
        "24/7 instant answers for customers",
        "$15K/month in new subscription revenue"
      ],
      techStack: ["OpenAI GPT-4", "Supabase", "Stripe API"],
      color: "accent-blue",
      bgGradient: "from-blue-500/5 to-blue-600/5"
    },
    {
      icon: ShoppingCart,
      industry: "E-commerce",
      title: "Order Processing Automation",
      challenge: "Manual order entry causing 20+ hours/week of work and frequent inventory sync errors",
      solution: "End-to-end automation pipeline connecting Shopify to fulfillment center with real-time inventory sync",
      results: [
        "20 hours/week saved on manual entry",
        "85% reduction in order errors",
        "Same-day processing for 99% of orders"
      ],
      techStack: ["Zapier", "Shopify API", "Airtable"],
      color: "accent-emerald",
      bgGradient: "from-emerald-500/5 to-emerald-600/5"
    },
    {
      icon: TrendingUp,
      industry: "Real Estate",
      title: "AI Lead Scoring System",
      challenge: "Sales team wasting 15+ hours/week on unqualified leads, missing hot prospects",
      solution: "AI-powered lead scoring with automated nurture sequences and priority notifications for high-intent buyers",
      results: [
        "150% increase in qualified leads",
        "40% faster average closing time",
        "3x ROI on marketing spend"
      ],
      techStack: ["Google Gemini AI", "HubSpot CRM", "Twilio"],
      color: "accent-purple",
      bgGradient: "from-purple-500/5 to-purple-600/5"
    }
  ]

  return (
    <section id="portfolio" className="relative py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Featured Automation Projects
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            <span className="block mb-2">Real Results</span>
          </h2>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            See how we've helped businesses save time, reduce costs, and scale with intelligent automation
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => {
            const Icon = study.icon
            return (
              <div
                key={index}
                className="group relative bg-card clean-border rounded-3xl overflow-hidden elevated-shadow hover:scale-105 transition-all duration-300"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${study.bgGradient} opacity-50`} />
                
                <div className="relative p-8">
                  {/* Icon & Industry */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-${study.color}/10 border border-${study.color}/20 flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 text-${study.color}`} />
                    </div>
                    <span className={`text-sm font-semibold text-${study.color} px-3 py-1 rounded-full bg-${study.color}/10`}>
                      {study.industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {study.title}
                  </h3>

                  {/* Challenge */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Challenge
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Solution
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                      Results
                    </p>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${study.color} mt-1.5 flex-shrink-0`} />
                          <span className="text-sm text-foreground font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {study.techStack.map((tech, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 rounded-full bg-background border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="group">
            View More Projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}