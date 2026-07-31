'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { StarRow } from './Icons'
import { EASE_SACRED } from './motion/primitives'

export interface Testimonial {
  quote: string
  lang?: 'hi'
  name: string
  city: string
  pooja: string
}

const ROTATE_MS = 7000

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (next: number) => setIndex(((next % items.length) + items.length) % items.length),
    [items.length]
  )

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => go(index + 1), ROTATE_MS)
    return () => clearInterval(id)
  }, [index, paused, go])

  const active = items[index]

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Reserve the tallest card's height so rotation never jumps the layout. */}
      <div className="relative min-h-[22rem] sm:min-h-[19rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            className="absolute inset-0 flex flex-col rounded-3xl border border-cream/14 bg-cream/[0.08] p-8 shadow-[0_20px_50px_-26px_rgba(0,0,0,0.65)] backdrop-blur-md md:p-12"
            initial={{ opacity: 0, y: 22, filter: 'blur(7px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, filter: 'blur(5px)' }}
            transition={{ duration: 0.6, ease: EASE_SACRED }}
          >
            <StarRow className="text-base text-saffron-light" />

            <blockquote
              {...(active.lang ? { lang: active.lang } : {})}
              className={`mt-6 grow text-pretty text-lg leading-relaxed text-cream/90 md:text-2xl ${
                active.lang ? '' : 'font-[family-name:var(--font-body)]'
              }`}
            >
              “{active.quote}”
            </blockquote>

            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-cream/12 pt-6">
              <span className="kicker text-cream/85">
                — {active.name}, {active.city}
              </span>
              <span aria-hidden className="text-cream/25">
                ·
              </span>
              <span className="kicker text-saffron-light/80">{active.pooja}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* ── dots ── */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show testimonial from ${item.name}`}
            aria-current={i === index}
            className="group p-2"
          >
            <span
              className={`block h-[3px] transition-all duration-500 ${
                i === index ? 'w-9 bg-saffron' : 'w-4 bg-cream/28 group-hover:bg-cream/50'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
