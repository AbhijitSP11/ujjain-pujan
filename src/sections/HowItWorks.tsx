'use client'

import { motion } from 'motion/react'
import WhatsAppButton from '@/components/WhatsAppButton'
import PosterBackdrop from '@/components/PosterBackdrop'
import SectionHeading from '@/components/SectionHeading'
import { POSTERS } from '@/lib/assets'
import { getConsultationURL } from '@/lib/whatsapp'
import { EASE_SACRED, StaggerGroup, StaggerItem } from '@/components/motion/primitives'

const STEPS = [
  {
    n: '01',
    title: 'Choose Your Pooja',
    body: 'Select from our 16+ authentic Vedic poojas. Need guidance? Our pandit will consult your kundli — free of cost.',
  },
  {
    n: '02',
    title: 'Connect on WhatsApp',
    body: 'Chat directly with our team. We confirm your date, explain the vidhi, assign a verified pandit, and arrange complete samagri.',
    cta: true,
  },
  {
    n: '03',
    title: 'Attend or Join Live',
    body: 'Visit Ujjain for the full experience, or join via live video call from anywhere in the world. Prasad delivered to your address.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-footer-dark px-6 py-24 md:px-10 md:py-36">
      <PosterBackdrop src={POSTERS.templeDawnFinal} />
      {/* The temple stays legible underneath, but only just. */}
      <div aria-hidden className="absolute inset-0 bg-[rgba(26,18,16,0.85)]" />

      <div className="relative mx-auto max-w-[1200px]">
        <SectionHeading
          kicker="How It Works"
          title="Three steps from your question to the sacred fire."
          hindi="तीन आसान चरणों में अपनी पूजा बुक करें"
          tone="dark"
        />

        <div className="relative mt-16 md:mt-24">
          {/* dotted rail linking the three cards — desktop only */}
          <motion.div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-[5.5rem] hidden h-px origin-left md:block"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, rgba(250,245,235,0.28) 0 5px, transparent 5px 12px)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.4, ease: EASE_SACRED }}
          />

          <StaggerGroup className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-7" stagger={0.14}>
            {STEPS.map((step) => (
              <StaggerItem key={step.n} className="relative">
                <div className="relative flex h-full flex-col rounded-2xl border border-cream/14 bg-cream/[0.06] p-7 pt-8 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.6)] backdrop-blur-sm md:p-9 md:pt-10">
                  {/* Numeral sits inside the card on its own line. As an
                      overhanging watermark it collided with the title. */}
                  <span
                    aria-hidden
                    className="block select-none font-[family-name:var(--font-hero)] text-[3.25rem] leading-none text-saffron/35 md:text-[4rem]"
                  >
                    {step.n}
                  </span>

                  <h3 className="kicker-lg mt-6 text-cream">{step.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-cream/72">
                    {step.body}
                  </p>

                  {step.cta && (
                    <div className="mt-6">
                      <WhatsAppButton
                        href={getConsultationURL()}
                        label="Free Kundli Consultation"
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
