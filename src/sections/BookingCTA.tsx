'use client'

import WhatsAppButton from '@/components/WhatsAppButton'
import PosterBackdrop from '@/components/PosterBackdrop'
import { Magnetic, Reveal } from '@/components/motion/primitives'
import { POSTERS } from '@/lib/assets'
import { getWhatsAppURL, PHONE_TEL } from '@/lib/whatsapp'
import { SITE } from '@/lib/site'

const REASSURANCE = [
  'Free Consultation',
  'No Advance Payment',
  'Verified Pandits',
  'Complete Samagri',
]

export default function BookingCTA() {
  return (
    <section
      id="contact"
      className="relative bg-footer-dark px-6 py-28 md:px-10 md:py-44"
    >
      <PosterBackdrop src={POSTERS.samagriFinal} />
      {/* dark base, then a warm saffron wash over it */}
      <div aria-hidden className="absolute inset-0 bg-[rgba(26,18,16,0.75)]" />
      <div aria-hidden className="absolute inset-0 bg-[rgba(212,146,11,0.12)]" />

      <div className="relative mx-auto max-w-[900px] text-center">
        <Reveal>
          <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)] text-cream">
            Begin Your Spiritual Journey
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p lang="hi" className="mx-auto mt-7 max-w-xl text-lg text-saffron-light/90 md:text-2xl">
            अभी अपनी पूजा बुक करें — निःशुल्क परामर्श
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Magnetic strength={0.2}>
              <WhatsAppButton
                href={getWhatsAppURL()}
                label="Book Your Pooja on WhatsApp"
                size="lg"
              />
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <a
            href={PHONE_TEL}
            data-cursor="link"
            className="mt-9 inline-block text-lg text-cream/80 transition-colors hover:text-cream"
          >
            <span className="underline-draw">{SITE.phoneDisplay}</span>
          </a>
        </Reveal>

        <Reveal delay={0.36}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {REASSURANCE.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                <span className="kicker text-cream/50">{item}</span>
                {i < REASSURANCE.length - 1 && (
                  <span aria-hidden className="text-cream/20">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
