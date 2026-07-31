import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Footer from '@/sections/Footer'
import JsonLd from '@/components/JsonLd'
import FAQAccordion from '@/components/FAQAccordion'
import WhatsAppButton from '@/components/WhatsAppButton'
import WhatsAppBottomBar from '@/components/WhatsAppBottomBar'
import PosterBackdrop from '@/components/PosterBackdrop'
import BookingPanel from '@/components/BookingPanel'
import ReadMore from '@/components/ReadMore'
import TestimonialCarousel, { type Testimonial } from '@/components/TestimonialCarousel'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/primitives'
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  PinIcon,
} from '@/components/Icons'

import { POOJAS, formatPrice, getPooja, getRelated } from '@/data/poojas'
import { POSTERS, POSTER_ALT } from '@/lib/assets'
import { getWhatsAppURL } from '@/lib/whatsapp'
import { SITE } from '@/lib/site'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schemas'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return POOJAS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pooja = getPooja(slug)
  if (!pooja) return {}

  const url = `/pooja/${pooja.slug}/`
  return {
    title: pooja.seoTitle,
    description: pooja.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: pooja.seoTitle,
      description: pooja.seoDescription,
      images: [
        { url: SITE.ogImage, width: 1200, height: 630, alt: POSTER_ALT[pooja.posterKey] },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pooja.seoTitle,
      description: pooja.seoDescription,
      images: [SITE.ogImage],
    },
  }
}

/** One relevant voice per page — rotated by category so pages don't read alike. */
const TESTIMONIAL_BY_CATEGORY: Record<string, Testimonial> = {
  'dosh-nivaran': {
    quote:
      'पंडित जी ने पूरी विधि से पूजा कराई। संकल्प में हमारा नाम और गोत्र लिया गया। बहुत अच्छा अनुभव रहा, सब कुछ व्यवस्थित था।',
    lang: 'hi',
    name: 'Sunita D.',
    city: 'Pune',
    pooja: 'Dosh Nivaran',
  },
  'abhishek-jaap': {
    quote:
      'Pandit ji performed the abhishek with such devotion. I felt an immense sense of peace and positive energy. The entire process was smooth and well-organized.',
    name: 'Rajesh K.',
    city: 'Delhi',
    pooja: 'Rudrabhishek',
  },
  'pind-daan-shradh': {
    quote:
      'Our family had not performed these rites for two generations. The pandit explained every step, took the sankalp in our gotra, and made a difficult day feel complete.',
    name: 'Vikram S.',
    city: 'Toronto',
    pooja: 'Pind Daan',
  },
  vivah: {
    quote:
      'We were struggling with kundli matching for over a year. The pandit read the chart honestly and told us exactly what was needed. The vidhi was performed beautifully.',
    name: 'Meera J.',
    city: 'Ahmedabad',
    pooja: 'Kumbh Vivah',
  },
  general: {
    quote:
      'We joined via video call from the US. The pandit explained every step, recited our names in the sankalp, and even sent prasad to our US address. Incredible service.',
    name: 'Amit P.',
    city: 'California',
    pooja: 'Satyanarayan Katha',
  },
}

export default async function PoojaPage({ params }: PageProps) {
  const { slug } = await params
  const pooja = getPooja(slug)
  if (!pooja) notFound()

  const related = getRelated(pooja)
  const waHref = getWhatsAppURL(pooja.nameEn, pooja.nameHi)
  const poster = POSTERS[pooja.posterKey]
  const testimonial = TESTIMONIAL_BY_CATEGORY[pooja.category]
  const descriptionParagraphs = pooja.fullDescription.split('\n\n')

  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Poojas', url: '/poojas/' },
    { name: pooja.nameEn, url: `/pooja/${pooja.slug}/` },
  ]

  return (
    <>
      <JsonLd
        schema={[serviceSchema(pooja), faqSchema(pooja.faq), breadcrumbSchema(trail)]}
      />

      {/* ══ hero banner ══════════════════════════════════════════════════ */}
      <header className="relative flex min-h-[62vh] items-end bg-footer-dark px-6 pb-14 pt-32 md:min-h-[68vh] md:px-10 md:pb-16">
        {/* Above the fold on this template — load it immediately. */}
        <PosterBackdrop src={poster} parallax={false} eager />
        <div aria-hidden className="absolute inset-0 bg-[rgba(26,18,16,0.72)]" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(26,18,16,0.85)] to-transparent"
        />

        <div className="relative mx-auto w-full max-w-[1240px]">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              {trail.map((crumb, i) => (
                <li key={crumb.url} className="flex items-center gap-2">
                  {i < trail.length - 1 ? (
                    <>
                      <Link
                        href={crumb.url}
                        className="kicker text-cream/55 transition-colors hover:text-saffron-light"
                      >
                        {crumb.name}
                      </Link>
                      <span aria-hidden className="text-cream/25">
                        /
                      </span>
                    </>
                  ) : (
                    <span aria-current="page" className="kicker text-cream/80">
                      {crumb.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <Reveal className="mt-8">
            <h1 className="max-w-4xl display text-[clamp(2.1rem,5.5vw,4.25rem)] leading-[1.02] text-cream">
              {pooja.nameEn} Pooja in Ujjain
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p lang="hi" className="mt-4 text-xl text-saffron-light/90 md:text-2xl">
              {pooja.nameHi} उज्जैन
            </p>
          </Reveal>

          {/* quick facts, folded into the hero so nothing repeats below */}
          <Reveal delay={0.18}>
            <dl className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-saffron-light" />
                <dt className="sr-only">Duration</dt>
                <dd className="kicker text-cream/80">{pooja.duration}</dd>
              </div>
              <div className="flex items-center gap-2">
                <PinIcon className="h-4 w-4 text-saffron-light" />
                <dt className="sr-only">Temple</dt>
                <dd className="kicker text-cream/80">{pooja.temple}</dd>
              </div>
              {pooja.bestDay && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-saffron-light" />
                  <dt className="sr-only">Auspicious days</dt>
                  <dd className="kicker text-cream/80">{pooja.bestDay}</dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>
      </header>

      {/* ══ content + sticky booking panel ══════════════════════════════ */}
      <div className="bg-cream px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-14">
          {/* ── booking panel: first on mobile, sticky rail on desktop ── */}
          <div className="order-first lg:order-last lg:sticky lg:top-28">
            <BookingPanel pooja={pooja} />
          </div>

          {/* ── main content ── */}
          <div className="min-w-0">
            {/* intro — first paragraph up front, rest behind a toggle */}
            <Reveal>
              <ReadMore paragraphs={descriptionParagraphs} />
            </Reveal>

            {/* benefits — the answer to "why should I book this" */}
            <section className="mt-14">
              <Reveal>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-maroon-deep md:text-3xl">
                  Benefits of {pooja.nameEn}
                </h2>
              </Reveal>
              <StaggerGroup
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
                stagger={0.06}
              >
                {pooja.benefits.map((b) => (
                  <StaggerItem
                    key={b}
                    className="flex items-start gap-3 rounded-2xl border border-cream-deep bg-cream-dark/40 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron/15">
                      <CheckIcon className="h-3.5 w-3.5 text-gold-deep" />
                    </span>
                    <span className="text-[0.9rem] leading-relaxed text-brown-dark">{b}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>

            {/* what's included */}
            <section className="mt-14">
              <Reveal>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-maroon-deep md:text-3xl">
                  What&apos;s Included
                </h2>
              </Reveal>
              <StaggerGroup className="mt-6 flex flex-col gap-3" stagger={0.05}>
                {pooja.includes.map((item) => (
                  <StaggerItem key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                    <span className="text-[0.9375rem] leading-relaxed text-brown-dark">
                      {item}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>

            {/* process */}
            <section className="mt-14">
              <Reveal>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-maroon-deep md:text-3xl">
                  The Ritual Process
                </h2>
              </Reveal>
              <StaggerGroup className="mt-6 flex flex-col" stagger={0.05}>
                {pooja.process.map((step, i) => (
                  <StaggerItem
                    key={step}
                    className="flex items-baseline gap-5 border-b border-cream-deep py-4"
                  >
                    <span className="kicker w-7 shrink-0 text-saffron">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-brown-dark">
                      {step}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>

            {/* who should do this */}
            <section className="mt-14">
              <Reveal>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-maroon-deep md:text-3xl">
                  Who Should Perform This Pooja?
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.75] text-brown-dark">
                  {pooja.whoShouldDo}
                </p>
              </Reveal>
            </section>

            {/* best time */}
            {pooja.bestDay && (
              <section className="mt-14">
                <Reveal>
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl text-maroon-deep md:text-3xl">
                    Best Time &amp; Auspicious Dates
                  </h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.75] text-brown-dark">
                    {pooja.nameEn} is most auspiciously performed on {pooja.bestDay}. Beyond
                    these, the pandit will match the date to your kundli and to the panchang
                    for the month you have in mind. For ordinary days two to three days&apos;
                    notice is enough; for Sawan, Shivratri, Navratri, Amavasya and Pitru Paksha
                    please allow one to two weeks, since pandit availability at {pooja.temple}{' '}
                    is limited during those periods.
                  </p>
                </Reveal>
              </section>
            )}

            {/* related */}
            {related.length > 0 && (
              <section className="mt-14">
                <Reveal>
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl text-maroon-deep md:text-3xl">
                    Related Poojas
                  </h2>
                </Reveal>
                <StaggerGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.07}>
                  {related.map((r) => (
                    <StaggerItem key={r.slug}>
                      <Link
                        href={`/pooja/${r.slug}/`}
                        data-cursor="link"
                        className="group flex h-full items-start justify-between gap-5 rounded-2xl border border-cream-deep p-6 shadow-[0_1px_2px_rgba(61,15,16,0.05)] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-saffron/50 hover:shadow-[0_18px_40px_-24px_rgba(61,15,16,0.35)]"
                      >
                        <span>
                          <span className="kicker block text-maroon-deep">{r.nameEn}</span>
                          <span lang="hi" className="mt-2 block text-gold-deep">
                            {r.nameHi}
                          </span>
                          <span className="kicker mt-3 block text-brown-warm">
                            {formatPrice(r.priceFrom, r.priceTo)}
                          </span>
                        </span>
                        <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-saffron transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </section>
            )}

            {/* pooja-specific FAQ */}
            <section className="mt-14">
              <Reveal>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-maroon-deep md:text-3xl">
                  {pooja.nameEn} — Questions
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-6">
                <FAQAccordion items={pooja.faq} />
              </Reveal>
            </section>
          </div>
        </div>
      </div>

      {/* ══ testimonial ══════════════════════════════════════════════════ */}
      {testimonial && (
        <section className="relative bg-footer-dark px-6 py-20 md:px-10 md:py-28">
          <PosterBackdrop src={POSTERS.ghatsFinal} />
          <div aria-hidden className="absolute inset-0 bg-[rgba(26,18,16,0.82)]" />
          <div className="relative mx-auto max-w-[900px]">
            <TestimonialCarousel items={[testimonial]} />
          </div>
        </section>
      )}

      {/* ══ final CTA ════════════════════════════════════════════════════ */}
      <section className="bg-cream px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <h2 className="display text-[clamp(2rem,5.5vw,4rem)] text-maroon-deep">
              Book {pooja.nameEn} in Ujjain
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p lang="hi" className="mt-5 text-lg text-gold-deep">
              निःशुल्क परामर्श · सम्पूर्ण सामग्री · प्रमाणित पंडित
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <WhatsAppButton href={waHref} label="Book Now on WhatsApp" size="lg" />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <WhatsAppBottomBar poojaName={pooja.nameEn} />
    </>
  )
}
