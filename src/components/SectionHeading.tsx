'use client'

import Ornament from './Ornament'
import { Reveal } from './motion/primitives'

/**
 * One heading treatment for every section, so the rhythm is deliberate
 * instead of each section re-inventing a kicker/title/sub stack.
 */
export default function SectionHeading({
  kicker,
  title,
  hindi,
  tone = 'light',
  align = 'center',
  className = '',
}: {
  kicker: string
  title: React.ReactNode
  hindi?: string
  tone?: 'light' | 'dark'
  align?: 'center' | 'left'
  className?: string
}) {
  const dark = tone === 'dark'
  const centered = align === 'center'

  return (
    <header className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      <Reveal>
        <span className={`kicker ${dark ? 'text-saffron-light/70' : 'text-gold-deep/75'}`}>
          {kicker}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className={`display mt-6 text-[clamp(2.4rem,5.6vw,4.75rem)] ${
            centered ? 'mx-auto' : ''
          } max-w-[19ch] text-balance ${dark ? 'text-cream' : 'text-maroon-deep'}`}
        >
          {title}
        </h2>
      </Reveal>

      {hindi && (
        <Reveal delay={0.16}>
          <p
            lang="hi"
            className={`mt-5 text-lg md:text-xl ${dark ? 'text-cream/60' : 'text-brown-warm'}`}
          >
            {hindi}
          </p>
        </Reveal>
      )}

      <div className={`mt-8 flex ${centered ? 'justify-center' : 'justify-start'}`}>
        <Ornament tone={dark ? 'cream' : 'saffron'} width={centered ? 220 : 180} />
      </div>
    </header>
  )
}
