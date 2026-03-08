import { ArrowRight, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const contactSection = document.getElementById('contact')
      
      let hideAtContact = false
      if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top
        hideAtContact = contactTop < window.innerHeight * 0.8
      }

      setIsVisible(scrollY > 600 && !hideAtContact)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80
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
          transition={{ type: 'spring', stiffness: 350, damping: 35 }}
          className="md:hidden fixed bottom-0 left-0 w-full z-[100] px-4 pt-3 pb-6 bg-white/90 dark:bg-[#080808]/90 backdrop-blur-xl border-t border-zinc-200/80 dark:border-white/10 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.2)]"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <Button
            onClick={scrollToContact}
            className="w-full bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-black font-semibold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-base transition-all active:scale-[0.97] min-h-[54px]"
          >
            <Phone className="w-4 h-4" />
            Book Your Free Strategy Call
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <p className="text-center text-xs text-zinc-400 dark:text-white/30 mt-2">Free 30-min call · No commitment</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
