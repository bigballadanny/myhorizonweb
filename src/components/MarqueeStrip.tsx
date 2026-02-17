'use client'

const industries = [
  'Construction & Roofing',
  'Med Spas & Aesthetics',
  'Restaurants & Hospitality',
  'Real Estate',
  'Legal Services',
  'E-Commerce',
  'Healthcare',
  'Professional Services',
]

// Double the list so the seamless loop works at any viewport
const items = [...industries, ...industries]

export function MarqueeStrip() {
  return (
    <div
      className="marquee-track overflow-hidden border-y border-border/50 py-4"
      style={{ background: 'color-mix(in srgb, var(--card) 40%, transparent)' }}
      aria-hidden="true"
    >
      <div className="flex">
        <div className="animate-marquee gap-12 flex items-center">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-sm text-muted-foreground/70 font-medium whitespace-nowrap px-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/40 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
