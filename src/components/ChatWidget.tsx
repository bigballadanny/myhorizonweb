'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'

/* ─── types ─── */
interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  ts: string
}

interface PatternResponse {
  patterns: string[]
  reply: string
}

/* ─── consultation-focused responses ─── */
const RESPONSES: PatternResponse[] = [
  {
    patterns: ['what can you do', 'what do you do', 'capabilities', 'features', 'how does it work', 'what is this'],
    reply: `We build custom AI systems for small businesses. Here's what that looks like:\n\n→ AI receptionist that answers every call 24/7\n→ Automated booking, confirmations & follow-ups\n→ Smart email handling & client communication\n→ Morning briefings with your key metrics\n→ CRM integration & lead tracking\n\nEvery business is different — that's why we start with a free consultation. What industry are you in?`,
  },
  {
    patterns: ['medspa', 'med spa', 'spa', 'aesthetics', 'botox', 'facial', 'clinic', 'cosmetic'],
    reply: `Med spas are one of our specialties! Here's what we typically set up:\n\n→ AI answers calls during treatments (no more missed bookings)\n→ Automated appointment confirmations & reminders\n→ Smart follow-ups after every visit\n→ Review requests sent automatically\n→ Morning brief: today's schedule, revenue, open slots\n\nOne med spa owner told us she recovered 15+ hours/week. Want to see what that looks like for yours?`,
  },
  {
    patterns: ['construction', 'contractor', 'roofing', 'plumb', 'electric', 'hvac', 'handyman', 'remodel'],
    reply: `Contractors and trades businesses are a perfect fit:\n\n→ Never miss a lead call while you're on a job\n→ Automated quote follow-ups (the #1 revenue leak)\n→ Job scheduling & crew coordination\n→ Invoice tracking & payment reminders\n→ Morning brief: today's jobs, pending bids, materials needed\n\nMost contractors we work with are leaving $5-10K/month on the table from missed calls alone. Want to book a free consultation?`,
  },
  {
    patterns: ['real estate', 'realtor', 'property', 'agent', 'broker', 'listing'],
    reply: `Real estate agents love what we build:\n\n→ Instant lead response (speed-to-lead wins deals)\n→ Automated showing scheduling & follow-ups\n→ CMA research & market data on demand\n→ Transaction coordination & deadline tracking\n→ Morning brief: new leads, upcoming showings, market updates\n\nIn real estate, the agent who responds first gets the deal. We make sure that's always you.`,
  },
  {
    patterns: ['restaurant', 'food', 'cafe', 'bar', 'catering'],
    reply: `Restaurant and food service businesses benefit hugely:\n\n→ Reservation management & waitlist automation\n→ Review monitoring & smart responses\n→ Vendor invoice tracking & price alerts\n→ Staff scheduling & shift reminders\n→ Morning brief: covers, food costs, what needs ordering\n\nLess time in the back office, more time on the floor. What kind of spot do you run?`,
  },
  {
    patterns: ['lawyer', 'law', 'attorney', 'legal', 'accountant', 'accounting', 'insurance', 'financial', 'professional service'],
    reply: `Professional services firms see huge efficiency gains:\n\n→ Client intake automation (forms, scheduling, welcome emails)\n→ Document organization & retrieval\n→ Deadline tracking & compliance reminders\n→ Billing & invoice follow-ups\n→ Morning brief: client meetings, deadlines, open items\n\nYour expertise is what clients pay for — let AI handle the admin. Want to explore what this looks like for your firm?`,
  },
  {
    patterns: ['how much', 'price', 'cost', 'pricing', 'pay', 'money', '$', 'expensive', 'afford', 'budget'],
    reply: `Great question — every business is different, so we customize.\n\nHere's how it works:\n→ Free consultation (30 min, no pitch deck, just answers)\n→ We assess your specific needs & quick wins\n→ You get a clear proposal with exactly what we'd build\n→ Solutions typically range from simple automations to full AI systems\n\nThe consultation is genuinely free — worst case, you walk away with ideas you can implement yourself. Want to book one?`,
  },
  {
    patterns: ['book', 'consultation', 'schedule', 'call', 'meeting', 'talk', 'free', 'get started', 'sign up', 'interested'],
    reply: `Love it! Here's how to book your free consultation:\n\n→ Click "Book Free Consultation" on our site\n→ Pick a time that works for you (30 min)\n→ We'll analyze your business beforehand so we come prepared\n→ No sales pitch — just a conversation about what AI can do for YOU\n\nOr tell me more about your business right here and I'll give you a preview of what's possible!`,
  },
  {
    patterns: ['hello', 'hi', 'hey', 'sup', 'yo', 'good morning', 'good evening', 'what\'s up'],
    reply: `Hey! 👋 Welcome to MyHorizon AI.\n\nWe help businesses save 15-20 hours/week by building custom AI systems — receptionists, booking automation, follow-ups, and more.\n\nTell me what kind of business you run, and I'll show you exactly how we'd help. Or ask me anything!`,
  },
  {
    patterns: ['who', 'about', 'team', 'company', 'myhorizon', 'my horizon'],
    reply: `MyHorizon AI is based in the Rio Grande Valley, TX.\n\nWe build custom AI solutions for local businesses — not cookie-cutter chatbots, but real systems that handle calls, bookings, follow-ups, and operations.\n\n→ Built on enterprise-grade AI (the same tech behind 146K+ GitHub stars)\n→ Every solution is customized to YOUR workflow\n→ Local team that understands Valley businesses\n\nWhat kind of business do you run? I'd love to show you what's possible.`,
  },
  {
    patterns: ['ai', 'artificial intelligence', 'robot', 'automat', 'machine learning', 'chatbot'],
    reply: `Good question! Here's what AI actually means for your business:\n\n→ It's not a generic chatbot — it's a system trained on YOUR operations\n→ Answers calls, books appointments, follows up with clients\n→ Learns your business over time (gets smarter every week)\n→ Works 24/7 without breaks or benefits\n→ Integrates with your existing tools (Google, CRM, phone)\n\nThink of it as a tireless team member who handles the work you shouldn't be doing. What takes up most of your time right now?`,
  },
  {
    patterns: ['busy', 'overwhelm', 'too much', 'no time', 'stress', 'wearing too many hats', 'behind'],
    reply: `That's exactly what we solve.\n\nMost business owners we talk to are spending 20+ hours/week on things AI can handle in minutes:\n→ Answering the same questions over and over\n→ Chasing down appointments and follow-ups\n→ Manually updating spreadsheets and CRMs\n→ Playing phone tag with clients\n\nImagine getting those hours back. What would you do with an extra 20 hours/week?\n\nBook a free consultation and we'll map out exactly where AI fits in your business.`,
  },
]

const DEFAULT_REPLY =
  "That's a great question! Tell me a bit more about your business — what industry you're in and what takes up most of your time — and I'll show you exactly how AI could help.\n\nOr book a free consultation and we'll dive deep together!"

const STORAGE_KEY = 'myhorizon_chat_history'
const UID_KEY = 'myhorizon_chat_uid'

function getReply(input: string): string {
  const lower = input.toLowerCase().trim()
  for (const r of RESPONSES) {
    if (r.patterns.some((p) => lower.includes(p))) return r.reply
  }
  return DEFAULT_REPLY
}

/* ─── component ─── */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const [nudgeDismissed, setNudgeDismissed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initialised = useRef(false)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Load saved history
  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: ChatMessage[] = JSON.parse(saved)
        if (parsed.length) setMessages(parsed.slice(-20))
      }
    } catch {
      /* ignore */
    }
    // Ensure uid
    if (!localStorage.getItem(UID_KEY)) {
      localStorage.setItem(
        UID_KEY,
        'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      )
    }
  }, [])

  // Save history on change
  useEffect(() => {
    if (messages.length) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)))
      } catch {
        /* ignore */
      }
    }
  }, [messages])

  // Nudge after 15s if chat never opened
  useEffect(() => {
    const t = setTimeout(() => {
      if (!isOpen && !nudgeDismissed) setShowNudge(true)
    }, 15_000)
    return () => clearTimeout(t)
  }, [isOpen, nudgeDismissed])

  const openChat = useCallback(() => {
    setIsOpen(true)
    setShowNudge(false)
    setNudgeDismissed(true)
    // Welcome message if first open
    setMessages((prev) => {
      if (prev.length > 0) return prev
      return [
        {
          role: 'bot',
          text: "Hey! 👋 I'm the MyHorizon AI assistant.\n\nWe build custom AI systems that save businesses 15-20 hours/week.\n\nTry asking:\n→ \"What can you do?\"\n→ \"I run a med spa\"\n→ \"How much does it cost?\"\n\nOr tell me about your business — I'll show you what's possible!",
          ts: new Date().toISOString(),
        },
      ]
    })
    setTimeout(() => inputRef.current?.focus(), 300)
  }, [])

  const closeChat = () => setIsOpen(false)

  const sendMessage = useCallback(() => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg: ChatMessage = { role: 'user', text, ts: new Date().toISOString() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate thinking delay (600-1200ms)
    const delay = 600 + Math.random() * 600
    setTimeout(() => {
      const reply = getReply(text)
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: reply, ts: new Date().toISOString() },
      ])
      setIsTyping(false)
    }, delay)
  }, [input, isTyping])

  return (
    <>
      {/* Nudge bubble */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 max-w-[220px]"
          >
            <div className="relative bg-foreground text-background px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
              👋 Ask me how AI can help <strong>your</strong> business
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowNudge(false)
                  setNudgeDismissed(true)
                }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs hover:bg-muted/80"
              >
                ✕
              </button>
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-foreground rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/40"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-48px)] sm:h-[580px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden
              max-[480px]:bottom-0 max-[480px]:right-0 max-[480px]:left-0 max-[480px]:w-full max-[480px]:h-full max-[480px]:max-w-full max-[480px]:max-h-[100dvh] max-[480px]:rounded-none"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-emerald-500/5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-sm text-foreground flex-1">MyHorizon AI</span>
              <button
                onClick={closeChat}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 scroll-smooth">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    msg.role === 'user'
                      ? 'self-end bg-primary text-primary-foreground rounded-br-sm'
                      : 'self-start bg-muted text-foreground rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="self-start flex gap-1.5 px-4 py-3 bg-muted rounded-2xl rounded-bl-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
                    />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 px-3 py-3 border-t border-border bg-card/80 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about your business..."
                className="flex-1 bg-muted border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-primary text-primary-foreground rounded-xl px-3.5 py-2.5 flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
