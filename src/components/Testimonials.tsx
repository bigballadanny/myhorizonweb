'use client'

import { motion } from 'framer-motion'
import { Quote, CheckCircle2 } from 'lucide-react'

const testimonials = [
  {
    quote: "MyHorizon's AI systems handle 80% of our customer conversations automatically. Our team can finally focus on high-value work.",
    name: "Sarah Chen",
    role: "COO",
    company: "TechFlow Solutions",
    avatar: "SC"
  },
  {
    quote: "The SYNTHIOS Box paid for itself in the first month. I save at least 3 hours every single day on email and scheduling.",
    name: "Marcus Rivera",
    role: "Founder",
    company: "Rivera Consulting",
    avatar: "MR"
  },
  {
    quote: "We went from 12 manual processes to 2 automated workflows. Our lead response time dropped from hours to seconds.",
    name: "Emily Zhang",
    role: "VP of Operations",
    company: "GrowthPath Inc",
    avatar: "EZ"
  }
]

export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 bg-card/50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent-purple/10 text-accent-purple px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Verified Results
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 text-foreground">
            Real Results, Real Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it—hear from businesses that run on our AI systems
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group"
            >
              <div className="h-full bg-background clean-border rounded-2xl p-8 hover:elevated-shadow transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-accent-blue/30" />
                </div>
                
                {/* Quote Text */}
                <blockquote className="text-foreground leading-relaxed mb-8 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{testimonial.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
