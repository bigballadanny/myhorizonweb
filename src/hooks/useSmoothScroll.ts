import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickHandler)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickHandler)
      lenis.destroy()
    }
  }, [])
}
