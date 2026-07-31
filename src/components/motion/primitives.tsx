'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Reveal — the workhorse. Fade + rise + de-blur as the element enters view.
// ═══════════════════════════════════════════════════════════════════════════
export const EASE_SACRED = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  blur?: number
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'span' | 'p'
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 28,
  blur = 6,
  once = true,
  as = 'div',
}: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration, delay, ease: EASE_SACRED }}
    >
      {children}
    </Tag>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Stagger — parent/child pair for lists and grids
// ═══════════════════════════════════════════════════════════════════════════
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_SACRED },
  },
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// WordReveal — headline copy resolving word by word out of blur
// ═══════════════════════════════════════════════════════════════════════════
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  once = true,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px' }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          aria-hidden
          variants={{
            hidden: { opacity: 0, y: '0.4em', filter: 'blur(8px)' },
            show: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.75, ease: EASE_SACRED },
            },
          }}
        >
          {word}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Counter — count-up that fires once on view
// ═══════════════════════════════════════════════════════════════════════════
export function Counter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.8,
  className,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return

    // Reduced motion gets the final value with no tween.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value.toFixed(decimals))
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay((value * eased).toFixed(decimals))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, decimals, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SpotlightCard — a warm saffron glow tracks the cursor across the surface
// ═══════════════════════════════════════════════════════════════════════════
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(212, 146, 11, 0.13)',
}: {
  children: ReactNode
  className?: string
  spotlightColor?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const opacity = useMotionValue(0)

  const background = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(340px circle at ${x}px ${y}px, ${spotlightColor}, transparent 72%)`
  )

  return (
    <div
      ref={ref}
      className={`group relative ${className}`}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        mx.set(e.clientX - rect.left)
        my.set(e.clientY - rect.top)
      }}
      onPointerEnter={() => opacity.set(1)}
      onPointerLeave={() => opacity.set(0)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{ background, opacity }}
      />
      {children}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Magnetic — element drifts toward the cursor, springs back on leave
// ═══════════════════════════════════════════════════════════════════════════
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// HairlineDivider — a rule that draws itself out from the left
// ═══════════════════════════════════════════════════════════════════════════
export function HairlineDivider({
  className = '',
  color = 'currentColor',
  delay = 0,
}: {
  className?: string
  color?: string
  delay?: number
}) {
  return (
    <motion.div
      aria-hidden
      className={`h-px w-full origin-left ${className}`}
      style={{ background: color }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE_SACRED }}
    />
  )
}
