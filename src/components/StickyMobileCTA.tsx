import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA only after scrolling past the hero section (approx 400px)
      // and hide it when reaching the contact section
      const scrollY = window.scrollY
      const contactSection = document.getElementById('contact')
      
      let hideAtContact = false
      if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top
        // Hide if contact section is in view
        hideAtContact = contactTop < window.innerHeight
      }

      if (scrollY > 400 && !hideAtContact) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="md:hidden fixed bottom-0 left-0 w-full z-[100] p-4 bg-background/85 backdrop-blur-xl border-t border-border/40 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)] pb-safe"
        >
          <Button 
            onClick={scrollToContact}
            className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white font-medium py-6 rounded-xl shadow-lg shadow-accent-blue/20 border border-accent-blue/30 flex items-center justify-center gap-2 text-base transition-all active:scale-[0.98]"
          >
            Book a Free Strategy Call
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
