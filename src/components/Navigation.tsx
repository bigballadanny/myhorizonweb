import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'
import logoIcon from '@/assets/myhorizon-logo-clean.png'

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
    setIsMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Not on homepage — navigate there and scroll after load
      navigate(`/#${sectionId}`)
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

    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Industries', id: 'industries' },
    { label: 'SYNTHIOS', id: 'synthios' },
    { label: 'Contact', id: 'contact' },
  ]

  const handleGetStarted = () => {
    navigate('/network')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-navbar py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity select-none shrink-0 min-w-max"
          >
            <img
              src={logoIcon}
              alt="MyHorizon Logo"
              className="w-10 h-10 rounded-full shrink-0"
            />
            <span className="text-lg font-bold text-foreground whitespace-nowrap" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              MyHorizon
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}

            <ThemeToggle />

            <Button
              onClick={handleGetStarted}
              size="sm"
              className="ml-2 bg-accent-blue hover:bg-accent-blue/90 text-white px-5 py-2 rounded-lg text-sm"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile — theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
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
          <div className="md:hidden fixed inset-0 top-[72px] z-40 bg-background border-t border-border flex flex-col px-6 py-8 space-y-2 overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-lg font-medium text-foreground hover:text-accent-blue transition-colors py-4 border-b border-border/40"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-6">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white rounded-xl py-6 text-base"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
