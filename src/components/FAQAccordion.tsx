'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { EASE_SACRED } from './motion/primitives'

export interface FaqItem {
  q: string
  a: string
}

export default function FAQAccordion({
  items,
  tone = 'light',
}: {
  items: FaqItem[]
  tone?: 'light' | 'dark'
}) {
  const [open, setOpen] = useState<number | null>(0)

  const border = tone === 'light' ? 'border-maroon/12' : 'border-cream/12'
  const question = tone === 'light' ? 'text-maroon' : 'text-cream'
  const answer = tone === 'light' ? 'text-brown-dark' : 'text-cream/72'
  const mark = tone === 'light' ? 'text-saffron' : 'text-saffron-light'

  return (
    <div className={`border-t ${border}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`border-b ${border}`}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
              >
                <span
                  className={`font-[family-name:var(--font-label)] text-[0.9375rem] leading-relaxed tracking-[0.02em] ${question}`}
                >
                  {item.q}
                </span>

                {/* plus that rotates into a minus */}
                <span
                  aria-hidden
                  className={`relative mt-1 h-3.5 w-3.5 shrink-0 ${mark}`}
                >
                  <motion.span
                    className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_SACRED }}
                  />
                  <motion.span
                    className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current"
                    animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.4, ease: EASE_SACRED }}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_SACRED }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-3xl pb-7 pr-10 leading-relaxed ${answer}`}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
