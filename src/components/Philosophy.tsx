'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Philosophy() {
  return (
    <section className="py-24 lg:py-32 bg-background border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="section-label mb-6">Our Philosophy</motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-10"
          >
            The ATM didn't kill the bank teller. <br />
            The internet didn't kill retail. <br />
            <em className="text-highlight not-italic">AI won't replace your team.</em>
          </motion.h2>
          
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-10 text-left mt-16">
            <div>
              <h3 className="font-serif text-xl mb-4 text-foreground">It reveals what they're actually for.</h3>
              <p className="text-muted-foreground leading-relaxed">
                We don't automate people out of jobs. We automate the parts of jobs that people hate — the 2 AM follow-ups, the data entry, the endless scheduling. The goal isn't to replace your workforce; it's to give them superpowers so they can do the high-leverage work that actually grows the business.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-4 text-foreground">The most valuable skill is clear thinking.</h3>
              <p className="text-muted-foreground leading-relaxed">
                You don't need to know how to build an AI agent. You need to know what your business should be doing at 2 AM when nobody's there. SYNTHIOS handles the execution. You bring the judgment, the strategy, and the human connection.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
