'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import ScrollVideo from '@/components/ScrollVideo'
import { VIDEOS, VIDEOS_WEBM, POSTERS, POSTER_ALT } from '@/lib/assets'

/* Heavy, wide scrim on the text side so the heading holds up even once the
   mist clears and the temple is lit gold behind it. */
const TEMPLE_SCRIM =
  'linear-gradient(to right, rgba(20,13,10,0.9) 0%, rgba(20,13,10,0.72) 38%, rgba(20,13,10,0.25) 72%, transparent 100%)'

const DETAILS = [
  'Every pooja includes samagri arranged by the pandit',
  'Sankalp taken in your name, gotra, and nakshatra',
  'Prasad delivered to your doorstep after the ceremony',
]

function Detail({
  text,
  progress,
  from,
}: {
  text: string
  progress: MotionValue<number>
  from: number
}) {
  const opacity = useTransform(progress, [from, from + 0.07, 0.78, 0.85], [0, 1, 1, 0])
  const y = useTransform(progress, [from, from + 0.07], [22, 0])
  const scaleX = useTransform(progress, [from, from + 0.12], [0, 1])

  return (
    <div>
      <motion.div
        aria-hidden
        style={{ scaleX, opacity }}
        className="h-px w-full origin-left bg-cream/22"
      />
      <motion.p
        style={{ opacity, y }}
        className="py-4 text-base leading-relaxed text-cream/88 md:py-5 md:text-lg"
      >
        {text}
      </motion.p>
    </div>
  )
}

/**
 * THE VIDHI — mist dissolves off the temple as you scroll. The first quarter
 * carries no text at all; the close returns to silence. The devotion is the
 * argument here, not the copy.
 */
function SamagriOverlay({ progress }: { progress: MotionValue<number> }) {
  const headingOpacity = useTransform(progress, [0.26, 0.36, 0.78, 0.85], [0, 1, 1, 0])
  const headingY = useTransform(progress, [0.26, 0.36], [42, 0])
  const kickerOpacity = useTransform(progress, [0.32, 0.42, 0.78, 0.85], [0, 1, 1, 0])

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-14">
        <div className="max-w-2xl">
          <motion.h2
            style={{ opacity: headingOpacity, y: headingY }}
            className="display text-cream"
          >
            <span style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}>Complete Vedic Vidhi</span>
          </motion.h2>

          <motion.p
            lang="hi"
            style={{ opacity: kickerOpacity }}
            className="mt-5 text-base text-saffron-light/90 md:text-xl"
          >
            सम्पूर्ण सामग्री और मंत्रोच्चार के साथ
          </motion.p>

          <div className="mt-10 md:mt-14">
            {DETAILS.map((text, i) => (
              <Detail key={text} text={text} progress={progress} from={0.5 + i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SacredPrep() {
  return (
    <section id="sacred-preparation" aria-label="The sacred preparation behind every pooja">
      <ScrollVideo
        src={VIDEOS.templeDawn}
        webm={VIDEOS_WEBM.templeDawn}
        poster={POSTERS.templeDawn}
        ariaLabel={POSTER_ALT.templeDawn}
        scrollHeight="300vh"
        mobileScrollHeight="200vh"
        scrim={TEMPLE_SCRIM}
      >
        {(progress) => <SamagriOverlay progress={progress} />}
      </ScrollVideo>
    </section>
  )
}
