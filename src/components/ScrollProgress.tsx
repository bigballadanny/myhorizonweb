import { useScroll, useSpring, motion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #ff0080, #ff8c00, #ffe000, #00ff88, #00cfff, #a855f7, #ff0080)',
        boxShadow: '0 0 8px rgba(168,85,247,0.8), 0 0 20px rgba(0,207,255,0.4)',
      }}
    />
  )
}
