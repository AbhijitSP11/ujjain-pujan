'use client'

import { ArrowRightIcon } from './Icons'

type Size = 'sm' | 'md' | 'lg'
/** Named for the surface it sits on, not the text colour it produces —
 *  "tone='light'" reading as "light text" (rather than "light background")
 *  is exactly the mix-up that put invisible maroon-on-navy text in the
 *  hero the first time this shipped. */
type Surface = 'onDark' | 'onLight'

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.625rem] tracking-[0.14em] gap-2',
  md: 'h-12 px-6 text-[0.6875rem] tracking-[0.16em] gap-2.5',
  lg: 'h-16 px-10 text-[0.8125rem] tracking-[0.18em] gap-3.5',
}

const DUR = 380

/**
 * A quieter sibling to WhatsAppButton for secondary, in-page actions (e.g.
 * "View All Poojas" next to the primary WhatsApp CTA). No magnetic pull, no
 * icon swap — a secondary action shouldn't compete for attention with the
 * primary one, and a plain hairline pill reads that way at a glance.
 */
export default function PillLink({
  href,
  label,
  size = 'md',
  surface = 'onDark',
  className = '',
}: {
  href: string
  label: string
  size?: Size
  surface?: Surface
  className?: string
}) {
  const light = surface === 'onLight'

  return (
    <a
      href={href}
      data-cursor="link"
      className={[
        'group relative isolate inline-flex select-none items-center justify-center overflow-hidden rounded-full border',
        'font-[family-name:var(--font-label)] font-medium uppercase transition-colors',
        light
          ? 'border-maroon/25 text-maroon-deep hover:text-cream'
          : 'border-cream/35 text-cream hover:text-maroon-deep',
        SIZES[size],
        className,
      ].join(' ')}
      style={{ transitionDuration: `${DUR}ms` }}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-full transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${
          light ? 'bg-maroon-deep' : 'bg-cream'
        }`}
        style={{ transitionDuration: `${DUR}ms` }}
      />
      <span className="whitespace-nowrap">{label}</span>
      <ArrowRightIcon
        className="h-3.5 w-3.5 shrink-0 transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        style={{ transitionDuration: `${DUR}ms` }}
      />
    </a>
  )
}
