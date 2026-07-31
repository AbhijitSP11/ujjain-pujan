'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE_SACRED } from './motion/primitives'

/**
 * Counts to 100 against real readiness signals (fonts + hero video metadata),
 * with a hard 1.5s ceiling so a slow network never holds the page hostage.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }

    let raf = 0
    let ready = false
    const start = performance.now()
    const CEILING = 1500

    const signals: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((resolve) => {
        const v = document.querySelector<HTMLVideoElement>('video')
        if (!v) return resolve()
        if (v.readyState >= 1) return resolve()
        v.addEventListener('loadedmetadata', () => resolve(), { once: true })
      }),
    ]
    Promise.all(signals).then(() => {
      ready = true
    })

    const tick = (now: number) => {
      const elapsed = now - start
      // Creep toward 90 while waiting; only real readiness releases the last 10.
      const ceiling = ready ? 100 : 90
      const t = Math.min(elapsed / CEILING, 1)
      const eased = 1 - Math.pow(1 - t, 2)
      const value = Math.min(eased * 100, ceiling)

      setProgress(value)

      if (value >= 100 || elapsed >= CEILING) {
        setProgress(100)
        setTimeout(() => setDone(true), 180)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [])

  // Hold the scroll position at the top while the veil is up.
  useEffect(() => {
    document.documentElement.style.overflow = done ? '' : 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(14px)' }}
          transition={{ duration: 0.85, ease: EASE_SACRED }}
        >
          <span
            lang="hi"
            aria-hidden
            className="absolute select-none text-[38vw] leading-none text-maroon opacity-[0.05] md:text-[22vw]"
            style={{ animation: 'om-pulse 3.2s ease-in-out infinite' }}
          >
            ॐ
          </span>

          <div className="relative flex flex-col items-center gap-4">
            <span className="font-[family-name:var(--font-hero)] text-6xl tabular-nums text-saffron md:text-8xl">
              {Math.round(progress)}
            </span>
            <span className="kicker text-brown-warm">Ujjain Pujan</span>
          </div>

          <style>{`
            @keyframes om-pulse {
              0%, 100% { opacity: 0.05; transform: scale(1); }
              50%      { opacity: 0.09; transform: scale(1.04); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
