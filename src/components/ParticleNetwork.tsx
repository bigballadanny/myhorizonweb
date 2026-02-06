'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  twinklePhase: number
  color: string
}

interface DriftParticle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  glowRadius: number
}

interface ShootingStar {
  x: number
  y: number
  angle: number
  speed: number
  length: number
  alpha: number
  active: boolean
}

interface NebulaCloud {
  x: number
  y: number
  radius: number
  color: string
  alpha: number
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []
    let driftParticles: DriftParticle[] = []
    let shootingStar: ShootingStar = { x: 0, y: 0, angle: 0, speed: 0, length: 0, alpha: 0, active: false }
    let nebulaClouds: NebulaCloud[] = []
    let nebulaCanvas: HTMLCanvasElement | null = null
    let frame = 0
    let nextShootingStarFrame = Math.floor(Math.random() * 300) + 480 // 8-12s at 60fps

    const dpr = window.devicePixelRatio || 1

    const starColors = ['#ffffff', '#c4d4ff', '#ffe8c4', '#d4e4ff', '#fff5e0']

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createElements()
      paintNebula()
    }

    const createElements = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      // Layer 1: Deep stars
      const starCount = Math.min(250, Math.floor((w * h) / 8000))
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.3,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      }))

      // Layer 2: Drifting particles
      const driftCount = Math.min(40, Math.floor((w * h) / 40000))
      driftParticles = Array.from({ length: driftCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2,
        glowRadius: Math.random() * 4 + 4,
      }))

      // Layer 3: Nebula clouds
      nebulaClouds = [
        { x: w * 0.2, y: h * 0.3, radius: Math.min(w, h) * 0.35, color: '30, 60, 180', alpha: 0.04 },
        { x: w * 0.7, y: h * 0.6, radius: Math.min(w, h) * 0.3, color: '100, 40, 160', alpha: 0.035 },
        { x: w * 0.5, y: h * 0.8, radius: Math.min(w, h) * 0.25, color: '20, 140, 140', alpha: 0.03 },
        { x: w * 0.85, y: h * 0.2, radius: Math.min(w, h) * 0.2, color: '60, 30, 120', alpha: 0.025 },
      ]
    }

    const paintNebula = () => {
      nebulaCanvas = document.createElement('canvas')
      nebulaCanvas.width = window.innerWidth * dpr
      nebulaCanvas.height = window.innerHeight * dpr
      const nCtx = nebulaCanvas.getContext('2d')
      if (!nCtx) return
      nCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      for (const cloud of nebulaClouds) {
        const gradient = nCtx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius)
        gradient.addColorStop(0, `rgba(${cloud.color}, ${cloud.alpha})`)
        gradient.addColorStop(0.5, `rgba(${cloud.color}, ${cloud.alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(${cloud.color}, 0)`)
        nCtx.fillStyle = gradient
        nCtx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }

    const spawnShootingStar = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const edge = Math.random()
      let x: number, y: number, angle: number

      if (edge < 0.5) {
        // From top
        x = Math.random() * w
        y = -10
        angle = Math.PI * 0.25 + Math.random() * Math.PI * 0.3
      } else {
        // From left
        x = -10
        y = Math.random() * h * 0.5
        angle = Math.PI * 0.1 + Math.random() * Math.PI * 0.3
      }

      shootingStar = {
        x, y, angle,
        speed: Math.random() * 3 + 3,
        length: Math.random() * 40 + 40,
        alpha: 1,
        active: true,
      }
    }

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      // Draw nebula (pre-rendered)
      if (nebulaCanvas) {
        ctx.drawImage(nebulaCanvas, 0, 0, w, h)
      }

      // Layer 1: Stars with twinkle
      for (const star of stars) {
        const alpha = star.baseAlpha * (0.6 + 0.4 * Math.sin(frame * star.twinkleSpeed + star.twinklePhase))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = alpha
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Layer 2: Drifting particles with glow
      for (const p of driftParticles) {
        ctx.save()
        ctx.shadowBlur = p.glowRadius
        ctx.shadowColor = 'rgba(148, 197, 248, 0.6)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 210, 255, ${p.alpha})`
        ctx.fill()
        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // Layer 4: Shooting star
      if (shootingStar.active) {
        const s = shootingStar
        const tailX = s.x - Math.cos(s.angle) * s.length
        const tailY = s.y - Math.sin(s.angle) * s.length

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()

        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.alpha -= 0.008

        if (s.alpha <= 0 || s.x > w + 100 || s.y > h + 100) {
          s.active = false
        }
      }

      // Spawn shooting star on timer
      frame++
      if (frame >= nextShootingStarFrame && !shootingStar.active) {
        spawnShootingStar()
        nextShootingStarFrame = frame + Math.floor(Math.random() * 300) + 480
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, #050a15 0%, #0c1425 50%, #080e1a 100%)' }}
    />
  )
}
