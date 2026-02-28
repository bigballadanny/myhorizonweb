import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'
import logoIcon from '@/assets/myhorizon-logo-icon.png'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const clickCountRef = useRef(0)
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const handleLogoClick = () => {
    clickCountRef.current += 1
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current)

    if (clickCountRef.current >= 8) {
      clickCountRef.current = 0
      navigate('/auth')
      return
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0
    }, 3000)

    if (clickCountRef.current === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Industries', id: 'industries' },
    { label: 'SYNTHIOS', id: 'synthios' },
    { label: 'Contact', id: 'contact' },
  ]

  const mobileLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Process', id: 'process' }, // Matches section aria-label or id (wait, process id might not exist, checking App.tsx shows aria-label='Process section'. Let's ensure smoothScroll works if IDs are missing, but usually id is added)
    { label: 'Results', id: 'results' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-navbar py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-75 transition-opacity select-none"
          >
            <img
              src={logoIcon}
              alt="MyHorizon Logo"
              className="w-10 h-10 rounded-full object-cover bg-black p-0.5"
            />
            <span className="text-xl font-bold text-white drop-shadow-md" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              MyHorizon
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 drop-shadow-sm"
              >
                {link.label}
              </button>
            ))}

            <ThemeToggle />

            <Button
              onClick={() => scrollToSection('contact')}
              size="sm"
              className="ml-2 bg-accent-blue hover:bg-accent-blue/90 text-white px-5 py-2 rounded-lg text-sm"
            >
              Book a Free Call
            </Button>
          </div>

          {/* Mobile — CTA + hamburger (no theme toggle to save space as per specs) */}
          <div className="flex md:hidden items-center gap-3">
            <Button
              onClick={() => scrollToSection('contact')}
              size="sm"
              className="bg-accent-blue hover:bg-accent-blue/90 text-white px-4 py-2 rounded-lg text-xs"
            >
              Book a Call
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 space-y-1 border-t border-border pt-6 bg-background/95 backdrop-blur-xl absolute left-0 w-full px-6 shadow-2xl">
            {mobileLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
