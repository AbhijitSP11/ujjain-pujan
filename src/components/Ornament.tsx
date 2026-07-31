'use client'

import { motion } from 'motion/react'

/**
 * A drawn lotus-and-rule motif. Everything decorative on this site has to be
 * SVG — there are no illustration assets — so this carries the Indian
 * character that plain hairlines can't.
 *
 * The rules draw outward and the petals fade up behind them.
 */
export default function Ornament({
  className = '',
  tone = 'saffron',
  width = 220,
}: {
  className?: string
  tone?: 'saffron' | 'cream'
  width?: number
}) {
  const stroke = tone === 'saffron' ? 'var(--color-saffron)' : 'var(--color-cream)'
  const faint = tone === 'saffron' ? 0.42 : 0.36

  return (
    <motion.svg
      aria-hidden
      className={className}
      width={width}
      height={(width / 220) * 26}
      viewBox="0 0 220 26"
      fill="none"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {/* side rules */}
      {[
        { d: 'M0 13 H86', origin: 'right' },
        { d: 'M134 13 H220', origin: 'left' },
      ].map((line, i) => (
        <motion.path
          key={i}
          d={line.d}
          stroke={stroke}
          strokeOpacity={faint}
          strokeWidth="1"
          style={{ transformOrigin: line.origin === 'right' ? '86px 13px' : '134px 13px' }}
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
      ))}

      {/* lotus — three petals and a seed */}
      <motion.g
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        variants={{
          hidden: { opacity: 0, y: 4 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35 } },
        }}
      >
        <path d="M110 4 C104 10 104 16 110 21 C116 16 116 10 110 4Z" strokeOpacity="0.85" />
        <path d="M110 21 C102 19 97 15 95 9 C101 9 107 14 110 21Z" strokeOpacity={faint + 0.2} />
        <path d="M110 21 C118 19 123 15 125 9 C119 9 113 14 110 21Z" strokeOpacity={faint + 0.2} />
        <circle cx="110" cy="13" r="1.4" fill={stroke} stroke="none" />
      </motion.g>
    </motion.svg>
  )
}
