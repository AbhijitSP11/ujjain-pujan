'use client'

import Link from 'next/link'
import WhatsAppButton from './WhatsAppButton'
import { ArrowRightIcon, ClockIcon, PinIcon } from './Icons'
import { getWhatsAppURL } from '@/lib/whatsapp'
import { POOJA_IMAGES } from '@/lib/assets'
import { formatPrice, type Pooja } from '@/data/poojas'

const CATEGORY_LABEL: Record<Pooja['category'], string> = {
  'dosh-nivaran': 'Dosh Nivaran',
  'abhishek-jaap': 'Abhishek & Jaap',
  'pind-daan-shradh': 'Pind Daan & Shradh',
  vivah: 'Vivah',
  general: 'General',
}

export default function PoojaCard({ pooja }: { pooja: Pooja }) {
  const img = POOJA_IMAGES[pooja.slug]

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream-deep bg-cream shadow-[0_1px_2px_rgba(61,15,16,0.05)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-saffron/35 hover:shadow-[0_24px_50px_-20px_rgba(61,15,16,0.35)]">
      {/* ── image ── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            width={1000}
            height={625}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          />
        )}
        {/* warm wash keeps the varied stock photography feeling like one set */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-maroon-deep/75 via-maroon-deep/15 to-transparent mix-blend-multiply"
        />

        <span className="kicker absolute left-4 top-4 rounded-full bg-cream/92 px-3 py-1.5 text-maroon-deep backdrop-blur-sm">
          {CATEGORY_LABEL[pooja.category]}
        </span>

        {/* Name sits on the image — buys back the vertical space the photo costs. */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <h3>
            <Link href={`/pooja/${pooja.slug}/`} className="before:absolute before:inset-0">
              <span lang="hi" className="block text-[1.35rem] leading-tight text-cream">
                {pooja.nameHi}
              </span>
              <span className="kicker mt-1.5 block text-saffron-light">{pooja.nameEn}</span>
            </Link>
          </h3>
        </div>
      </div>

      {/* ── body ── */}
      <div className="flex grow flex-col p-5">
        <p className="line-clamp-2 text-sm leading-relaxed text-brown-warm">
          {pooja.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5 shrink-0 text-saffron" />
            <span className="kicker text-brown-warm">{pooja.duration}</span>
          </span>
          <span aria-hidden className="text-cream-deep">
            |
          </span>
          <span className="flex items-center gap-1.5">
            <PinIcon className="h-3.5 w-3.5 shrink-0 text-saffron" />
            <span className="kicker text-brown-warm">{pooja.temple}</span>
          </span>
        </div>

        <div className="grow" />

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-cream-deep pt-4">
          <div>
            <span className="kicker block text-brown-warm">From</span>
            <span className="nums mt-1 block whitespace-nowrap font-[family-name:var(--font-heading)] text-[1.6rem] font-semibold leading-none text-maroon-deep">
              ₹{pooja.priceFrom.toLocaleString('en-IN')}
            </span>
            <span className="sr-only">{formatPrice(pooja.priceFrom, pooja.priceTo)}</span>
          </div>

          {/* relative z-10 lifts these above the title's stretched ::before */}
          <div className="relative z-10 flex items-center gap-2">
            <WhatsAppButton
              href={getWhatsAppURL(pooja.nameEn, pooja.nameHi)}
              label="Book"
              size="sm"
            />
            <Link
              href={`/pooja/${pooja.slug}/`}
              aria-label={`View details for ${pooja.nameEn}`}
              className="group/d inline-flex h-9 w-9 items-center justify-center rounded-full border border-maroon/20 text-maroon transition-colors duration-400 hover:border-maroon-deep hover:bg-maroon-deep hover:text-cream"
            >
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/d:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
