'use client'

import { useId, useState } from 'react'
import { motion } from 'motion/react'
import WhatsAppButton from './WhatsAppButton'
import { CalendarIcon, CheckIcon, ClockIcon, PinIcon } from './Icons'
import { getBookingWhatsAppURL, getWhatsAppURL } from '@/lib/whatsapp'
import { formatPrice, type Pooja } from '@/data/poojas'
import { EASE_SACRED } from './motion/primitives'

const STEPS = [
  { title: 'Share your date', body: 'Tell us your preferred date, or ask the pandit to suggest one.' },
  { title: 'Confirm on WhatsApp', body: 'We confirm availability, the pandit and the full cost in minutes.' },
  { title: 'Pandit performs your pooja', body: 'In person in Ujjain, or live on video call — your choice.' },
]

const REASSURANCE = ['Free consultation', 'No advance payment', 'Verified pandits']

/**
 * Sticky right-rail booking widget for the pooja detail page. The "form"
 * never posts anywhere — there is no backend in this build — it only
 * enriches the wa.me deep link with whatever the devotee typed, so the
 * pandit's team sees the name and date on the very first message.
 */
export default function BookingPanel({ pooja }: { pooja: Pooja }) {
  const nameId = useId()
  const dateId = useId()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const href = getBookingWhatsAppURL(pooja.nameEn, pooja.nameHi, { name, date })
  const inputBase =
    'w-full rounded-xl border border-cream-deep bg-cream px-4 py-3 text-sm text-brown-dark placeholder:text-brown-warm/50 transition-colors duration-300 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/25'

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: EASE_SACRED }}
      className="overflow-hidden rounded-3xl border border-cream-deep bg-cream shadow-[0_24px_60px_-30px_rgba(61,15,16,0.35)]"
    >
      {/* ── price header ── */}
      <div className="bg-maroon-deep px-6 py-6 text-cream md:px-7">
        <span className="kicker text-cream/55">Starting from</span>
        <div className="nums mt-1 font-[family-name:var(--font-heading)] text-4xl font-semibold leading-none">
          {formatPrice(pooja.priceFrom, pooja.priceTo)}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5 text-saffron-light" />
            <span className="kicker text-cream/70">{pooja.duration}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <PinIcon className="h-3.5 w-3.5 text-saffron-light" />
            <span className="kicker text-cream/70">{pooja.temple}</span>
          </span>
        </div>
      </div>

      <div className="p-6 md:p-7">
        {/* ── quick enquiry ── */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            window.open(href, '_blank', 'noopener,noreferrer')
          }}
          className="flex flex-col gap-3"
        >
          <div>
            <label htmlFor={nameId} className="kicker mb-1.5 block text-brown-warm">
              Your name
            </label>
            <input
              id={nameId}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className={inputBase}
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor={dateId} className="kicker mb-1.5 block text-brown-warm">
              Preferred date
              <span className="ml-1 normal-case tracking-normal text-brown-warm/50">
                (optional)
              </span>
            </label>
            <div className="relative">
              <input
                id={dateId}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${inputBase} pr-10`}
              />
              <CalendarIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brown-warm/50" />
            </div>
          </div>

          <WhatsAppButton
            href={href}
            label="Book This Pooja"
            size="md"
            fullWidth
            className="mt-2"
          />
        </form>

        <p className="mt-3 text-center text-xs text-brown-warm/60">
          Opens WhatsApp with your details filled in — nothing is charged.
        </p>

        {/* ── steps ── */}
        <div className="mt-7 border-t border-cream-deep pt-6">
          <span className="kicker text-brown-warm">How booking works</span>
          <ol className="mt-4 flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-3.5">
                <span className="nums flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron/15 text-xs font-semibold text-gold-deep">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium leading-tight text-brown-dark">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-brown-warm">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── reassurance ── */}
        <ul className="mt-6 flex flex-col gap-2 border-t border-cream-deep pt-5">
          {REASSURANCE.map((r) => (
            <li key={r} className="flex items-center gap-2 text-[0.8125rem] text-brown-warm">
              <CheckIcon className="h-3.5 w-3.5 shrink-0 text-saffron" />
              {r}
            </li>
          ))}
        </ul>

        <a
          href={getWhatsAppURL()}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-draw mt-5 block text-center text-xs text-brown-warm/70 hover:text-maroon-deep"
        >
          Have a question first? Chat with us
        </a>
      </div>
    </motion.aside>
  )
}
