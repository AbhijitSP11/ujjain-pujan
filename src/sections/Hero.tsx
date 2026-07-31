'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import ScrollVideo from '@/components/ScrollVideo'
import WhatsAppButton from '@/components/WhatsAppButton'
import PillLink from '@/components/PillLink'
import TilakMark from '@/components/TilakMark'
import { ChevronDownIcon } from '@/components/Icons'
import { VIDEOS, VIDEOS_WEBM, POSTERS, POSTER_ALT } from '@/lib/assets'
import { getWhatsAppURL } from '@/lib/whatsapp'
import { EASE_SACRED } from '@/components/motion/primitives'

/**
 * THE AWAKENING — mist dissolves off the temple as you scroll. Scroll back up
 * and it closes again. The whole overlay is choreographed against video
 * progress rather than viewport position, so the copy and the image move as
 * one piece.
 */
function HeroOverlay({ progress }: { progress: MotionValue<number> }) {
  // Title clears out as the mist does.
  const titleOpacity = useTransform(progress, [0, 0.2, 0.5], [1, 1, 0])
  const titleY = useTransform(progress, [0.2, 0.5], [0, -60])
  const titleBlur = useTransform(progress, [0.2, 0.5], ['blur(0px)', 'blur(8px)'])

  // The line the whole section is building toward.
  const lineOpacity = useTransform(progress, [0.55, 0.68, 0.88, 1], [0, 1, 1, 0])
  const lineY = useTransform(progress, [0.55, 0.68], [30, 0])

  const chevronOpacity = useTransform(progress, [0, 0.05], [1, 0])

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      {/* ── title block ── */}
      <motion.div
        style={{ opacity: titleOpacity, y: titleY, filter: titleBlur }}
        className="flex flex-col items-center"
      >
        {/* Drawn first, as if just applied — the wordmark reveals beneath
            its own blessing rather than the two arriving as one beat. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="mb-4 md:mb-5"
        >
          <TilakMark delay={0.35} className="h-10 w-12 md:h-12 md:w-14" />
        </motion.div>

        {/* Hindi leads. This is a Ujjain business speaking to devotees —
            the Devanagari is the brand, the roman is the translation. */}
        <motion.p
          lang="hi"
          className="mb-5 text-2xl text-saffron-light md:mb-7 md:text-4xl"
          initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.85, ease: EASE_SACRED }}
        >
          उज्जैन पूजन
        </motion.p>

        <motion.h1
          className="wordmark text-cream"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)' }}
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 1.05, ease: EASE_SACRED }}
        >
          Ujjain Pujan
        </motion.h1>

        {/* The attention-grabbing line — a heavy grotesque, deliberately a
            different voice from the carved-stone wordmark above it, so the
            two don't blur into one texture. */}
        <motion.p
          className="mt-6 max-w-2xl text-balance px-4 font-[family-name:var(--font-accent)] font-semibold leading-[1.25] text-cream md:mt-7"
          style={{ fontSize: 'clamp(1.15rem, 3.4vw, 2rem)' }}
          initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 1.35, ease: EASE_SACRED }}
        >
          Vedic Poojas from Ujjain,{' '}
          <span className="text-sindoor-light">booked in seconds.</span>
        </motion.p>

        {/* gold rule + kicker */}
        <motion.div
          className="mt-7 flex w-full max-w-lg flex-col items-center gap-5 md:mt-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <motion.span
            aria-hidden
            className="h-px w-full origin-center bg-gradient-to-r from-transparent via-saffron/70 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 1.7, ease: EASE_SACRED }}
          />
          {/* Tighter tracking below sm — at 0.22em this string broke
              "DIVINE / UJJAIN" across lines on a 390px screen. */}
          <span className="kicker text-balance px-4 tracking-[0.13em] text-cream/75 sm:tracking-[0.22em]">
            Sacred Rituals · Verified Pandits · Divine Ujjain
          </span>
        </motion.div>

        <motion.div
          className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.95, ease: EASE_SACRED }}
        >
          <WhatsAppButton href={getWhatsAppURL()} label="Book Now" size="md" />
          <PillLink href="#poojas" label="View All Poojas" size="md" surface="onDark" />
        </motion.div>
      </motion.div>

      {/* ── the promise, revealed once the temple is clear ── */}
      <motion.p
        style={{ opacity: lineOpacity, y: lineY }}
        className="display absolute text-cream italic"
        aria-hidden
      >
        <span style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>
          Where tradition meets trust.
        </span>
      </motion.p>

      {/* ── scroll cue ── */}
      <motion.div
        style={{ opacity: chevronOpacity }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-cream/70"
        aria-hidden
      >
        <span className="kicker text-[0.625rem]">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDownIcon />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" aria-label="Ujjain Pujan — sacred pooja booking in Ujjain">
      <ScrollVideo
        src={VIDEOS.templeDawn}
        webm={VIDEOS_WEBM.templeDawn}
        poster={POSTERS.templeDawn}
        ariaLabel={POSTER_ALT.templeDawn}
        scrollHeight="350vh"
        mobileScrollHeight="200vh"
        priority
        scrim="linear-gradient(to bottom, rgba(20,13,10,0.5) 0%, rgba(20,13,10,0.34) 45%, rgba(20,13,10,0.62) 100%)"
      >
        {(progress) => <HeroOverlay progress={progress} />}
      </ScrollVideo>
    </section>
  )
}
