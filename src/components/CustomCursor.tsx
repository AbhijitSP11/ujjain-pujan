'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * Saffron dot with a copper ring trailing behind it. Pointer devices only —
 * touch and reduced-motion users get the native cursor.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 170, damping: 20, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 170, damping: 20, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const el = e.target as HTMLElement | null
      setHot(Boolean(el?.closest('a, button, [data-cursor]')))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border border-copper"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hot ? 46 : 26,
          height: hot ? 46 : 26,
          opacity: hot ? 0.9 : 0.45,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <style>{`
        @media (pointer: fine) {
          a, button, [data-cursor] { cursor: none; }
          body { cursor: none; }
        }
      `}</style>
    </>
  )
}
