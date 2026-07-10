import { lazy, Suspense, useEffect, useState } from 'react'
import { Loader2, MessageCircle } from 'lucide-react'

const ChatWidget = lazy(() =>
  import('./ElevenLabsWidget').then((module) => ({ default: module.ElevenLabsWidget })),
)

export function DeferredChatWidget({ hasStickyMobileCTA = false }: { hasStickyMobileCTA?: boolean }) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [openAfterLoad, setOpenAfterLoad] = useState(false)
  const [contactInViewOnMobile, setContactInViewOnMobile] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return
    const mobile = window.matchMedia('(max-width: 639px)')
    const observer = new IntersectionObserver(
      ([entry]) => setContactInViewOnMobile(mobile.matches && entry.isIntersecting),
      { threshold: 0.08 },
    )
    observer.observe(contact)
    const onViewportChange = () => {
      if (!mobile.matches) setContactInViewOnMobile(false)
    }
    mobile.addEventListener('change', onViewportChange)
    return () => {
      observer.disconnect()
      mobile.removeEventListener('change', onViewportChange)
    }
  }, [])

  const launcherClass = `fixed right-4 sm:right-6 z-[110] ${
    hasStickyMobileCTA ? 'bottom-24 sm:bottom-6' : 'bottom-4 sm:bottom-6'
  }`

  if (!shouldLoad) {
    if (contactInViewOnMobile) return null
    return (
      <div className={launcherClass} data-chat-widget>
        <button
          type="button"
          onClick={() => {
            setOpenAfterLoad(true)
            setShouldLoad(true)
          }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl flex items-center justify-center bg-accent-blue text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-blue/30"
          aria-label="Open chat"
        >
          <MessageCircle aria-hidden="true" className="w-7 h-7" />
        </button>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className={launcherClass} data-chat-widget role="status" aria-label="Loading chat">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl flex items-center justify-center bg-accent-blue text-white">
            <Loader2 aria-hidden="true" className="w-6 h-6 animate-spin" />
          </div>
        </div>
      }
    >
      <ChatWidget hasStickyMobileCTA={hasStickyMobileCTA} initiallyOpen={openAfterLoad} />
    </Suspense>
  )
}
