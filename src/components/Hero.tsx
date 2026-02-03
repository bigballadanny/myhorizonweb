'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX, Users, ArrowRight, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'

export function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      
      videoRef.current.addEventListener('play', () => {
        if (videoRef.current) {
          videoRef.current.muted = isMuted
          videoRef.current.volume = isMuted ? 0 : 0.7
        }
      })
      
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Video autoplay successful'))
          .catch(error => console.error('Video autoplay failed:', error))
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = isMuted ? 0 : 0.7
    }
  }, [isMuted])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />

      {/* Video Control */}
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
          
          {isMuted && (
            <div className="absolute -bottom-10 right-0 flex items-center text-white/80">
              <span className="whitespace-nowrap font-medium text-sm mr-2">Sound On</span>
              <span className="text-lg">↗</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Hero Content - Lower Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 lg:left-12 right-4 sm:right-auto z-40"
      >
        <div className="max-w-3xl">
          {/* Social Proof Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald border-2 border-black flex items-center justify-center"
                >
                  <Users className="w-4 h-4 text-white" />
                </div>
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">
              Trusted by innovative businesses
            </span>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-tight text-white mb-4 sm:mb-6">
            <span className="block">AI SYSTEMS THAT</span>
            <span className="block">ACTUALLY GENERATE</span>
            <span className="block">REVENUE</span>
          </h1>
          
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
            Complete AI systems, autonomous agents, and intelligent workflows that run your business 24/7.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-accent-blue hover:bg-accent-blue/90 text-white text-lg px-8 py-6"
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={scrollToServices}
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              See What We Build
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-white/50 hover:text-white/80 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </div>
  )
}
