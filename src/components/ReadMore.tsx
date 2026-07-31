'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { EASE_SACRED } from './motion/primitives'

/**
 * Shows the first paragraph, collapses the rest behind a toggle. The full
 * pooja descriptions run 300-500 words — good for SEO, bad for a devotee
 * trying to find the "book now" button. All paragraphs stay in the DOM
 * (just height-clipped) so search engines still index the complete text.
 */
export default function ReadMore({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false)
  const [lead, ...rest] = paragraphs

  if (rest.length === 0) {
    return <p className="text-pretty text-[1.0625rem] leading-[1.75] text-brown-dark">{lead}</p>
  }

  return (
    <div>
      <p className="text-pretty text-[1.0625rem] leading-[1.75] text-brown-dark">{lead}</p>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE_SACRED }}
        className="overflow-hidden"
      >
        <div className="pt-6">
          {rest.map((para, i) => (
            <p
              key={i}
              className="mb-6 text-pretty text-[1.0625rem] leading-[1.75] text-brown-dark last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>
      </motion.div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group mt-4 inline-flex items-center gap-1.5 font-[family-name:var(--font-label)] text-xs font-medium uppercase tracking-[0.14em] text-gold-deep transition-colors hover:text-maroon-deep"
      >
        {open ? 'Show less' : 'Read full details'}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE_SACRED }}
        >
          ↓
        </motion.span>
      </button>
    </div>
  )
}
