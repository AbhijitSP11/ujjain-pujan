'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import ScrollVideo from '@/components/ScrollVideo'
import { VIDEOS, VIDEOS_WEBM, POSTERS, POSTER_ALT } from '@/lib/assets'

const REASONS = [
  'Home to the Mahakaleshwar Jyotirlinga — one of only 12 in the world',
  'The Vedic-prescribed city for Kaal Sarp, Mangal, and Pitra Dosh Nivaran',
  'Where the Shipra river sanctifies every ritual performed on its banks',
]

/** Each row arrives on its own slice of the descent. */
function Reason({
  text,
  progress,
  from,
}: {
  text: string
  progress: MotionValue<number>
  from: number
}) {
  const opacity = useTransform(progress, [from, from + 0.1, 0.74, 0.82], [0, 1, 1, 0])
  const y = useTransform(progress, [from, from + 0.1], [26, 0])
  const scaleX = useTransform(progress, [from, from + 0.16], [0, 1])

  return (
    <div>
      <motion.div
        aria-hidden
        style={{ scaleX, opacity }}
        className="h-px w-full origin-left bg-cream/25"
      />
      <motion.p
        style={{ opacity, y }}
        className="max-w-xl py-5 text-base leading-relaxed text-cream/90 md:py-6 md:text-lg"
      >
        {text}
      </motion.p>
    </div>
  )
}

function GhatsOverlay({ progress }: { progress: MotionValue<number> }) {
  const headingOpacity = useTransform(progress, [0.18, 0.3, 0.74, 0.82], [0, 1, 1, 0])
  const headingY = useTransform(progress, [0.18, 0.3], [40, 0])

  // A slow drift downward as you descend the steps.
  const drift = useTransform(progress, [0, 1], [0, -50])

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center">
      <motion.div style={{ y: drift }} className="mx-auto w-full max-w-[1400px] px-6 md:px-14">
        <motion.h2
          style={{ opacity: headingOpacity, y: headingY }}
          className="mb-8 display text-cream md:mb-12"
        >
          <span style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>Why Ujjain?</span>
        </motion.h2>

        <div className="max-w-2xl">
          {REASONS.map((text, i) => (
            <Reason key={text} text={text} progress={progress} from={0.34 + i * 0.1} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function WhyUjjain() {
  return (
    <section id="why-ujjain" aria-label="Why perform your pooja in Ujjain">
      <ScrollVideo
        src={VIDEOS.ghats}
        webm={VIDEOS_WEBM.ghats}
        poster={POSTERS.ghats}
        ariaLabel={POSTER_ALT.ghats}
        scrollHeight="300vh"
        mobileScrollHeight="200vh"
        scrim="linear-gradient(to top, rgba(20,13,10,0.62) 0%, transparent 55%), linear-gradient(to right, rgba(20,13,10,0.82) 0%, rgba(20,13,10,0.45) 45%, transparent 78%)"
      >
        {(progress) => <GhatsOverlay progress={progress} />}
      </ScrollVideo>
    </section>
  )
}
