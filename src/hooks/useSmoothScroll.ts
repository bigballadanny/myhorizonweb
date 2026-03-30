import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    // Add lenis class to html — signals CSS to yield scroll control
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP ticker for frame-perfect sync
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickHandler)
    gsap.ticker.lagSmoothing(0)

    // Override native scrollIntoView so CTA buttons work with Lenis
    // Store on window so components can use it
    ;(window as any).__lenis = lenis

    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      gsap.ticker.remove(tickHandler)
      lenis.destroy()
      delete (window as any).__lenis
    }
  }, [])
}

/**
 * Smooth scroll to an element ID using Lenis (falls back to native)
 */
export function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const lenis = (window as any).__lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
