'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef } from 'react'
import { ArrowRightIcon, WhatsAppIcon } from './Icons'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'whatsapp' | 'gold' | 'outline' | 'ink'

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.625rem] tracking-[0.14em] gap-2',
  md: 'h-12 px-6 text-[0.6875rem] tracking-[0.16em] gap-2.5',
  lg: 'h-16 px-10 text-[0.8125rem] tracking-[0.18em] gap-3.5',
}
const ICON: Record<Size, string> = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' }

const VARIANTS: Record<Variant, { base: string; sweep: string; glow: string }> = {
  whatsapp: {
    base: 'bg-whatsapp text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,0.7)]',
    sweep: 'bg-whatsapp-dark',
    glow: 'rgba(37,211,102,0.45)',
  },
  gold: {
    base: 'bg-saffron text-maroon-deep shadow-[0_8px_20px_-8px_rgba(212,146,11,0.7)]',
    sweep: 'bg-saffron-light',
    glow: 'rgba(212,146,11,0.5)',
  },
  outline: {
    base: 'border border-cream/35 text-cream',
    sweep: 'bg-cream',
    glow: 'rgba(250,246,236,0.3)',
  },
  ink: {
    base: 'border border-maroon/25 text-maroon-deep',
    sweep: 'bg-maroon-deep',
    glow: 'rgba(61,15,16,0.3)',
  },
}

/** One duration/easing pair shared by every layer so they settle in lockstep
 *  instead of drifting out of sync with each other. */
const DUR = 380
const EASE = 'cubic-bezier(0.22,1,0.36,1)'

/**
 * Micro-interactions — deliberately fewer and calmer than the previous pass,
 * which stacked six competing animations (spring-driven magnetic pull +
 * five separately-timed CSS transitions) and read as jittery rather than
 * smooth, especially on small buttons packed into a nav bar or a card row
 * where the magnetic drift could shove the button into its neighbours.
 *
 * What's left, and why it stays "stable":
 *  1. magnetic pull — md/lg only, heavily damped, and clamped so it can
 *     never drift more than a few px. Off entirely on `sm`, where buttons
 *     sit shoulder-to-shoulder with other controls.
 *  2. label ladder — text rises out, a clone rises in behind it
 *  3. the fill sweeps up from the bottom edge
 *  4. press dips the whole control
 * All four share DUR/EASE, so nothing finishes out of step with the rest.
 */
export default function WhatsAppButton({
  href,
  label = 'Book via WhatsApp',
  size = 'md',
  variant = 'whatsapp',
  className = '',
  fullWidth = false,
  icon = true,
  magnetic = true,
}: {
  href: string
  label?: string
  size?: Size
  variant?: Variant
  className?: string
  fullWidth?: boolean
  icon?: boolean
  magnetic?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const v = VARIANTS[variant]

  // Magnetic pull is a "large, uncluttered space" affordance — the hero and
  // final-CTA buttons get it, inline/small buttons don't.
  const magneticEnabled = magnetic && size !== 'sm'
  const MAX_OFFSET = size === 'lg' ? 10 : 7

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  // Heavier mass + higher damping = a slow, syrupy follow rather than a
  // twitchy one. The previous tuning (stiffness 260/damping 18/mass 0.4)
  // was underdamped enough to overshoot and wobble on fast mouse moves.
  const x = useSpring(mx, { stiffness: 200, damping: 26, mass: 0.7 })
  const y = useSpring(my, { stiffness: 200, damping: 26, mass: 0.7 })

  const inverted = variant === 'outline' ? 'group-hover:text-maroon-deep' : ''
  const invertedInk = variant === 'ink' ? 'group-hover:text-cream' : ''

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="cta"
      style={magneticEnabled ? { x, y } : undefined}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        if (!magneticEnabled || e.pointerType !== 'mouse') return
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * MAX_OFFSET
        const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * MAX_OFFSET
        mx.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dx)))
        my.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dy)))
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className={[
        'group relative isolate inline-flex select-none items-center justify-center overflow-hidden rounded-full',
        'font-[family-name:var(--font-label)] font-medium uppercase',
        SIZES[size],
        v.base,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {/* fill sweeps up from the bottom */}
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-full transition-transform group-hover:scale-y-100 ${v.sweep}`}
        style={{ transitionDuration: `${DUR}ms`, transitionTimingFunction: EASE }}
      />

      {icon && (
        <WhatsAppIcon
          className={`${ICON[size]} shrink-0 transition-transform group-hover:-translate-y-px ${inverted} ${invertedInk}`}
          style={{ transitionDuration: `${DUR}ms`, transitionTimingFunction: EASE }}
        />
      )}

      {/* label ladder. The clone is aria-hidden so screen readers read the label once. */}
      <span className={`relative block overflow-hidden ${inverted} ${invertedInk}`}>
        <span
          className="block whitespace-nowrap transition-transform group-hover:-translate-y-full"
          style={{ transitionDuration: `${DUR}ms`, transitionTimingFunction: EASE }}
        >
          {label}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full whitespace-nowrap transition-transform group-hover:translate-y-0"
          style={{ transitionDuration: `${DUR}ms`, transitionTimingFunction: EASE }}
        >
          {label}
        </span>
      </span>

      {/* md/lg only: a quiet arrow nudge gives the same "action" cue the old
          icon-swap + sheen + ring stack gave, at a fraction of the motion. */}
      {size !== 'sm' && (
        <ArrowRightIcon
          className={`h-3.5 w-3.5 shrink-0 opacity-0 transition-[opacity,transform] -translate-x-1.5 group-hover:translate-x-0 group-hover:opacity-100 ${inverted} ${invertedInk}`}
          style={{ transitionDuration: `${DUR}ms`, transitionTimingFunction: EASE }}
        />
      )}
    </motion.a>
  )
}
