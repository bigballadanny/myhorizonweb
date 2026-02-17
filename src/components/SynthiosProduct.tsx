'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Shield, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import synthiosHeroImage from '@/assets/synthios-box-hero.jpg'

const features = [
  'Runs 24/7 on dedicated hardware — no cloud dependency',
  'Command via Telegram, WhatsApp, or Discord',
  'Automates inbox, calendar, and daily coordination',
  '5+ hours reclaimed daily',
  'Full setup, training, and ongoing support',
]

export function SynthiosProduct() {
  const scrollToContact = () => {
    const contact = document.getElementById('contact')
    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="synthios" className="relative py-24 lg:py-32 bg-gradient-to-b from-background via-card/40 to-background overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-emerald/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Content */}
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
              Meet SYNTHIOS —<br />
              <span className="text-accent-emerald">Your AI Chief of Staff</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              A personal AI assistant that runs on dedicated hardware in your office. It manages your email, calendar, coordination, and more — so you can focus on the work that actually matters.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent-emerald/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent-emerald" />
                  </div>
                  <span className="text-foreground text-lg">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                size="lg"
                className="bg-accent-emerald hover:bg-accent-emerald/90 text-white"
                onClick={scrollToContact}
              >
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted"
                onClick={() => window.open('https://synthios.myhorizon.ai', '_blank')}
              >
                Learn More
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-accent-blue" />
              <span>5+ hours reclaimed daily — more time for what actually moves the needle</span>
            </div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-accent-emerald/8 rounded-[2rem] blur-2xl" />

            <div className="relative bg-gradient-to-br from-card via-card to-muted rounded-3xl p-8 lg:p-12 clean-border elevated-shadow">
              {/* Product visual */}
              <div className="aspect-square rounded-2xl relative overflow-hidden">
                <img
                  src={synthiosHeroImage}
                  alt="SYNTHIOS — AI Chief of Staff hardware"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent rounded-2xl" />

                {/* Status indicator */}
                <motion.div
                  className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm clean-border rounded-lg px-3 py-2 text-xs font-medium shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <span className="text-accent-emerald">●</span> Active
                </motion.div>

                {/* Live stat */}
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
