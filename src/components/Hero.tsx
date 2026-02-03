'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Ensure video is muted immediately on load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      
      // Force mute on play
      videoRef.current.addEventListener('play', () => {
        if (videoRef.current) {
          videoRef.current.muted = isMuted
          videoRef.current.volume = isMuted ? 0 : 0.7
        }
      })
      
      // Try to play the video
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Video autoplay successful'))
          .catch(error => console.error('Video autoplay failed:', error))
      }
    }
  }, [])

  // Update video mute state when isMuted changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = isMuted ? 0 : 0.7
    }
  }, [isMuted])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Video Control - Fixed at top right, below navbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed top-24 right-6 sm:right-8 lg:right-12 z-40"
      >
        <div className="relative">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="glass-effect p-3 rounded-full text-white hover:bg-white/20 gentle-animation cursor-pointer"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          
          {/* Sound On indicator */}
          {isMuted && (
            <div className="absolute -bottom-10 right-0 flex items-center text-white/80">
              <span className="whitespace-nowrap font-medium text-sm mr-2">Sound On</span>
              <span className="text-lg">↗</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Hero Title - Lower Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 sm:bottom-12 left-4 sm:left-6 lg:left-12 right-4 sm:right-auto z-40"
      >
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-tight text-white mb-4 sm:mb-6">
            <span className="block">AI SYSTEMS THAT</span>
            <span className="block">ACTUALLY GENERATE</span>
            <span className="block">REVENUE</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/80 leading-relaxed max-w-2xl">
            Custom AI chatbots, workflow automation, and intelligent systems that save 20+ hours/week and drive measurable results.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
