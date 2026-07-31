'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ArrowRightIcon, ChevronDownIcon } from './Icons'
import { POOJA_GROUPS } from '@/data/poojas'
import { EASE_SACRED } from './motion/primitives'

/**
 * Desktop-only "Pooja Booking" dropdown in the primary nav. Unlike the old
 * "Poojas" link, which only scrolled to the homepage grid, every item here
 * is a direct <Link> to that pooja's own page — the page with the sticky
 * booking panel — so a devotee who already knows what they want never has
 * to land on the homepage and hunt for it.
 */
export default function PoojaNavMenu({ solid }: { solid: boolean }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }
  // A short grace period, not an instant close — otherwise moving the
  // cursor from the trigger down into the panel closes it before it's read.
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 200)
  }

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => () => cancelClose(), [])

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        data-cursor="link"
        className={`group/n relative flex items-center gap-1.5 rounded-full px-4 py-2.5 transition-colors duration-400 ${
          solid ? 'text-brown-dark hover:text-maroon-deep' : 'text-cream/85 hover:text-cream'
        }`}
      >
        <span
          aria-hidden
          className={`absolute inset-0 rounded-full opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/n:scale-100 group-hover/n:opacity-100 ${
            open ? 'scale-100 opacity-100' : 'scale-90'
          } ${solid ? 'bg-maroon-deep/8' : 'bg-cream/12'}`}
        />
        <span className="kicker relative">Pooja Booking</span>
        <ChevronDownIcon
          className={`relative h-3.5 w-3.5 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Choose a pooja to book"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE_SACRED }}
            className="absolute left-0 top-[calc(100%+0.75rem)] z-50 w-[640px] max-w-[88vw] origin-top overflow-hidden rounded-3xl border border-cream-deep bg-cream/98 shadow-[0_30px_70px_-24px_rgba(61,15,16,0.4)] backdrop-blur-xl"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 p-7 sm:grid-cols-3">
              {POOJA_GROUPS.map((group) => (
                <div key={group.id}>
                  <span className="kicker text-gold-deep">{group.label}</span>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {group.items.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/pooja/${p.slug}/`}
                          role="menuitem"
                          onClick={() => setOpen(false)}
                          className="block text-sm leading-snug text-brown-dark transition-colors duration-200 hover:text-maroon-deep"
                        >
                          {p.nameEn}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link
              href="/poojas/"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="group/all flex items-center justify-between border-t border-cream-deep bg-cream-dark/50 px-7 py-4 transition-colors duration-300 hover:bg-cream-dark"
            >
              <span className="kicker text-maroon-deep">View All 16 Poojas</span>
              <ArrowRightIcon className="h-3.5 w-3.5 text-saffron transition-transform duration-300 group-hover/all:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
