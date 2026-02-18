'use client'

const industries = [
  'Med Spas & Aesthetics',
  'Trades & Home Services',
  'Construction',
  'Real Estate',
  'Professional Services',
  'Restaurants & Hospitality',
  'Healthcare',
  'Legal Services',
  'E-Commerce',
  'General Small Business',
]

export function MarqueeStrip() {
  return (
    <div
      className="marquee-track overflow-hidden border-y border-border/50 py-4"
      style={{ background: 'color-mix(in srgb, var(--card) 40%, transparent)' }}
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
