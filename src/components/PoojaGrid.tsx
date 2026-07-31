'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import PoojaCard from './PoojaCard'
import { ArrowRightIcon } from './Icons'
import { EASE_SACRED } from './motion/primitives'
import { CATEGORIES, POOJAS, type PoojaCategory } from '@/data/poojas'

const INITIAL_COUNT = 9

export default function PoojaGrid() {
  const [active, setActive] = useState<PoojaCategory | 'all'>('all')
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(
    () => (active === 'all' ? POOJAS : POOJAS.filter((p) => p.category === active)),
    [active]
  )

  // The "show all" affordance only makes sense on the unfiltered list — a
  // filtered category rarely exceeds the initial count anyway.
  const visible = expanded || active !== 'all' ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hiddenCount = filtered.length - visible.length

  return (
    <>
      {/* ── filter tabs ── */}
      <div
        className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 md:mt-16"
        role="tablist"
        aria-label="Filter poojas by category"
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActive(cat.id)
                setExpanded(false)
              }}
              // `isolate` is load-bearing: it gives the button its own stacking
              // context so the -z-10 pill below stays behind the label instead
              // of dropping behind the section background.
              className={`relative isolate rounded-full px-5 py-3 font-[family-name:var(--font-label)] text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                isActive ? 'text-cream' : 'text-brown-warm hover:text-maroon-deep'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="pooja-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-maroon-deep"
                  transition={{ duration: 0.45, ease: EASE_SACRED }}
                />
              )}
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* ── grid ── */}
      <motion.div layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((pooja, i) => (
            <motion.div
              key={pooja.slug}
              layout
              initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.6, delay: Math.min(i, 7) * 0.06, ease: EASE_SACRED },
              }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)', transition: { duration: 0.3 } }}
            >
              <PoojaCard pooja={pooja} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── expand ── */}
      {hiddenCount > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            data-cursor="cta"
            className="group inline-flex items-center gap-2.5 border border-maroon/30 px-8 py-4.5 font-[family-name:var(--font-label)] text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-maroon-deep transition-colors duration-500 hover:border-maroon-deep hover:bg-maroon-deep hover:text-cream"
          >
            View All {POOJAS.length} Poojas
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </>
  )
}
