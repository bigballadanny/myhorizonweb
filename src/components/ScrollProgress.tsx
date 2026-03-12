import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const [pct, setPct] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', v => setPct(Math.round(v * 100)))
  }, [scrollYProgress])

  return (
    <>
      {/* ── Horizontal neon rainbow bar at very top ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #ff0080, #ff8c00, #ffe000, #00ff88, #00cfff, #a855f7, #ff0080)',
          backgroundSize: '200% 100%',
          boxShadow: '0 0 8px rgba(168,85,247,0.8), 0 0 20px rgba(0,207,255,0.4)',
        }}
      />

      {/* ── Vertical progress pill on right edge ── */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-[99] flex flex-col items-center gap-1.5">
        {/* Track */}
        <div className="w-1 h-32 rounded-full bg-zinc-200/30 dark:bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{
              scaleY,
              originY: 0,
              height: '100%',
              background: 'linear-gradient(180deg, #a855f7, #00cfff, #00ff88)',
              boxShadow: '0 0 6px rgba(168,85,247,0.6)',
            }}
          />
        </div>
        {/* Percentage label */}
        {pct > 5 && pct < 98 && (
          <span
            className="text-[9px] font-semibold tabular-nums"
            style={{ color: 'rgb(168,85,247)', textShadow: '0 0 6px rgba(168,85,247,0.8)' }}
          >
            {pct}%
          </span>
        )}
      </div>
    </>
  )
}
