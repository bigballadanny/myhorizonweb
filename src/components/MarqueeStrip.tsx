'use client'

const industries = [
  'Med Spas & Aesthetics',
  'Trades & Home Services',
  'Construction',
  'Real Estate',
  'Professional Services',
  'Underwriters',
  'M&A & Due Diligence',
  'Financial Services',
  'General Small Business',
  'Healthcare',
]

export function MarqueeStrip() {
  return (
    <div
      className="marquee-track overflow-hidden border-y border-white/5 py-6 bg-black/20"
      aria-hidden="true"
    >
      {/* Two copies ensure seamless loop at all viewport widths */}
      <div className="animate-marquee flex items-center gap-0">
        {[...industries, ...industries].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-sm text-muted-foreground/70 font-medium whitespace-nowrap px-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/40 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
