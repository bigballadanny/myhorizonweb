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
      className="marquee-track overflow-hidden border-y border-black/5 dark:border-white/5 py-6 bg-white/30 dark:bg-black/20 backdrop-blur-md"
      aria-hidden="true"
    >
      {/* Two copies ensure seamless loop at all viewport widths */}
      <div className="animate-marquee flex items-center gap-0">
        {[...industries, ...industries].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium whitespace-nowrap px-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
