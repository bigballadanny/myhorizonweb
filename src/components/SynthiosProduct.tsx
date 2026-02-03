'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Shield, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

export function SynthiosProduct() {
  const features = [
    "Mac Mini M4 with pre-installed AI",
    "Handles email, calendar, and tasks automatically",
    "Text via Telegram or WhatsApp",
    "5 Hours Saved Or Free guarantee",
    "One-time purchase, no subscriptions",
    "Full setup and training included"
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
              The SYNTHIOS Box
            </h2>
            
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              Your personal AI assistant that lives on your desk. Not another subscription—a one-time purchase that saves you hours every single day.
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
              <span>5 Hours Saved Or Free — Our Guarantee</span>
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
              
              {/* Device mockup placeholder */}
              <div className="aspect-square bg-gradient-to-br from-muted via-background to-muted rounded-2xl flex items-center justify-center relative overflow-hidden">
                
                {/* Stylized Mac Mini representation */}
                <div className="relative">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-b from-muted-foreground to-foreground rounded-3xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-accent-blue to-accent-emerald rounded-2xl flex items-center justify-center">
                        <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                      </div>
                      <p className="text-primary-foreground font-bold text-lg sm:text-xl">SYNTHIOS</p>
                      <p className="text-muted text-sm">Mac Mini M4</p>
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-accent-blue/20 to-accent-emerald/20 rounded-3xl blur-xl -z-10" />
                </div>
                
                {/* Floating features */}
                <motion.div 
                  className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm clean-border rounded-lg px-3 py-2 text-xs font-medium"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  ✉️ Email Handled
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm clean-border rounded-lg px-3 py-2 text-xs font-medium"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                >
                  📅 Calendar Synced
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 left-4 bg-background/90 backdrop-blur-sm clean-border rounded-lg px-3 py-2 text-xs font-medium"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 2 }}
                >
                  💬 Messages Ready
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
