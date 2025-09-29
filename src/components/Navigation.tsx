import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const navLinks = [
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' }
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-navbar py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-black text-foreground hover:text-accent-blue transition-colors"
          >
            MyHorizon
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="ml-4"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="w-full mt-4"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
