import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook for creating scroll-triggered GSAP animations.
 * Returns a ref to attach to the trigger element.
 */
export function useScrollAnimation<T extends HTMLElement>(
  animation: (el: T, tl: gsap.core.Timeline) => void,
  options?: {
    start?: string
    end?: string
    scrub?: boolean | number
    markers?: boolean
    once?: boolean
  }
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: options?.start ?? 'top 85%',
        end: options?.end ?? 'bottom 20%',
        scrub: options?.scrub ?? false,
        markers: options?.markers ?? false,
        once: options?.once ?? true,
      },
    })

    animation(el, tl)

    return () => {
      tl.kill()
    }
  }, [])

  return ref
}

/**
 * Simple GSAP countUp animation for numbers
 */
export function useCountUp(
  target: number,
  options?: { duration?: number; suffix?: string; prefix?: string }
) {
  const ref = useRef<HTMLElement>(null)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(countRef.current, {
        value: target,
        duration: options?.duration ?? 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          const val = Math.round(countRef.current.value)
          el.textContent = `${options?.prefix ?? ''}${val}${options?.suffix ?? ''}`
        },
      })
    })

    return () => ctx.revert()
  }, [target])

  return ref
}

export { gsap, ScrollTrigger }
