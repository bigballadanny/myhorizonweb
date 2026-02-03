'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Shield, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import synthiosHeroImage from '@/assets/synthios-box-hero.jpg'

export function SynthiosProduct() {
  const features = [
    "Mac Mini M4 with pre-installed AI infrastructure",
    "Automates inbox, calendar, and coordination—freeing your mind",
    "Command via Telegram, WhatsApp, or Discord",
    "5+ Hours Reclaimed Daily—reinvest in what moves the needle",
    "One-time purchase, no subscriptions",
    "Full setup, training, and ongoing support included"
  ]

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-background via-card/50 to-background overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-emerald/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-emerald/10 text-accent-emerald px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Our Flagship Product
            </div>
            
            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
              Unlock Your Full Capacity
            </h2>
            
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              For professionals who want to do <span className="text-accent-emerald font-semibold">MORE</span>. Delegate the tedious, focus on what matters, and 10x your impact. The SYNTHIOS Box is your personal AI that lives on your desk.
            </p>
            
            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent-emerald/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent-emerald" />
                  </div>
                  <span className="text-foreground text-lg">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-foreground">$2,000</span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Includes hardware + setup + training
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg"
                  className="bg-accent-emerald hover:bg-accent-emerald/90 text-white"
                  onClick={() => window.open('https://synthios.myhorizon.ai', '_blank')}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const contact = document.getElementById('contact')
                    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
            
            {/* Trust badge */}
            <div className="flex items-center gap-2 mt-8 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-accent-blue" />
              <span>5 Hours Reclaimed Daily — More Time for What Matters</span>
            </div>
          </motion.div>
          
          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-card via-card to-muted rounded-3xl p-8 lg:p-12 clean-border elevated-shadow">
              
              {/* Limited Availability Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-accent-emerald text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Limited Availability
                </div>
              </div>
              
              {/* Product Visual */}
              <div className="aspect-square rounded-2xl relative overflow-hidden">
                {/* Hero Image */}
                <img 
                  src={synthiosHeroImage} 
                  alt="SYNTHIOS Box - Mac Mini M4 with AI holographic interface, entrepreneur relaxing in background" 
                  className="w-full h-full object-cover rounded-2xl"
                />
                
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent rounded-2xl" />
                
                {/* Floating status indicators */}
                <motion.div 
                  className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm clean-border rounded-lg px-3 py-2 text-xs font-medium shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <span className="text-accent-emerald">●</span> Active
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm clean-border rounded-lg px-3 py-2 text-xs font-medium shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                >
                  127 tasks automated today
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
