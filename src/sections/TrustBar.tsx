'use client'

import { Counter, StaggerGroup, StaggerItem } from '@/components/motion/primitives'

const METRICS = [
  { value: 500, suffix: '+', label: 'Poojas Performed' },
  { value: 25, suffix: '+', label: 'Verified Pandits' },
  { value: 4.9, suffix: '★', label: 'Devotee Rating', decimals: 1 },
  { raw: '2024', label: 'Serving Since' },
]

/**
 * A dark band immediately under the hero. The page was cream end to end,
 * which read flat — this gives the eye somewhere to land and makes the gold
 * numerals actually glow.
 */
export default function TrustBar() {
  return (
    <section aria-label="Trust metrics" className="relative bg-night">
      {/* hairline gold seam top and bottom */}
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-saffron/35 to-transparent" />

      <StaggerGroup
        className="mx-auto grid max-w-[1200px] grid-cols-2 gap-y-11 px-6 py-14 md:grid-cols-4 md:gap-y-0 md:px-10 md:py-16"
        stagger={0.1}
      >
        {METRICS.map((m, i) => (
          <StaggerItem
            key={m.label}
            className={`flex flex-col items-center text-center ${
              i > 0 ? 'md:border-l md:border-cream/12' : ''
            }`}
          >
            <span className="nums font-[family-name:var(--font-heading)] text-5xl leading-none font-medium text-saffron-light md:text-6xl">
              {m.raw ?? (
                <Counter value={m.value!} suffix={m.suffix} decimals={m.decimals ?? 0} />
              )}
            </span>
            <span className="kicker mt-4 text-cream/55">{m.label}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-saffron/35 to-transparent" />
    </section>
  )
}
