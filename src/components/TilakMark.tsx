'use client'

import { motion } from 'motion/react'

/**
 * A tripundra — the three-stroke mark and sindoor bindu worn by devotees of
 * Shiva — drawn on mount stroke by stroke, as if a pandit's hand were
 * applying it, then left with the bindu holding a slow living pulse. This
 * is the site's one explicitly Shaivite emblem, which fits: Mahakaleshwar
 * is a Jyotirlinga of Shiva, and Mahakal himself is depicted wearing it.
 *
 * Every stroke animates via `pathLength` rather than width/height, so it
 * stays cheap even layered under the hero's other motion.
 */
export default function TilakMark({
  className = '',
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  const strokes = ['M6 40 Q40 22 74 40', 'M4 50 Q40 30 76 50', 'M2 60 Q40 38 78 60']

  return (
    <svg aria-hidden viewBox="0 0 80 68" className={className} fill="none">
      {strokes.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          className="text-cream/80"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.65, delay: delay + i * 0.16, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}

      {/* the bindu — solid, then a soft ring breathing outward from it */}
      <motion.circle
        cx="40"
        cy="10"
        r="5.5"
        fill="var(--color-sindoor)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.62, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: '40px 10px' }}
      />
      <motion.circle
        cx="40"
        cy="10"
        r="5.5"
        fill="var(--color-sindoor)"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: [1, 2, 1], opacity: [0.45, 0, 0.45] }}
        transition={{
          duration: 2.8,
          delay: delay + 1.1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '40px 10px' }}
      />
    </svg>
  )
}
