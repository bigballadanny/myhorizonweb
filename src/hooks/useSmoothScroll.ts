import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollWindow = Window & { __lenis?: Lenis }

export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      return
    }

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
    ;(window as SmoothScrollWindow).__lenis = lenis

    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      gsap.ticker.remove(tickHandler)
      lenis.destroy()
      delete (window as SmoothScrollWindow).__lenis
    }
  }, [])
}

/**
 * Smooth scroll to an element ID using Lenis (falls back to native)
 */
export function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const lenis = (window as SmoothScrollWindow).__lenis
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (lenis) {
    lenis.scrollTo(el, { offset: -88, duration: 1.2 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 88
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
  }
}
