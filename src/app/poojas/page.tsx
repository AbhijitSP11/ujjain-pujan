import type { Metadata } from 'next'
import Footer from '@/sections/Footer'
import PoojaGrid from '@/components/PoojaGrid'
import WhatsAppBottomBar from '@/components/WhatsAppBottomBar'
import JsonLd from '@/components/JsonLd'
import { Reveal } from '@/components/motion/primitives'
import { POOJAS } from '@/data/poojas'
import { breadcrumbSchema } from '@/lib/schemas'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'All Poojas in Ujjain — 16 Vedic Rituals | Ujjain Pujan',
  description:
    'Browse all 16 Vedic poojas we perform in Ujjain — Kaal Sarp Dosh, Mangal Dosh, Pitra Dosh, Rudrabhishek, Mahamrityunjay Jaap, Pind Daan and more. Verified pandits, complete samagri, live video call.',
  alternates: { canonical: '/poojas/' },
  openGraph: {
    type: 'website',
    url: '/poojas/',
    title: 'All Poojas in Ujjain — 16 Vedic Rituals | Ujjain Pujan',
    description:
      'Browse all 16 Vedic poojas we perform in Ujjain with verified pandits. Complete samagri, transparent pricing, live video call for NRI devotees.',
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: 'Ujjain Pujan' }],
  },
}

export default function PoojasPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Poojas', url: '/poojas/' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Vedic Poojas in Ujjain',
            numberOfItems: POOJAS.length,
            itemListElement: POOJAS.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `${p.nameEn} Pooja in Ujjain`,
              url: `${SITE.url}/pooja/${p.slug}/`,
            })),
          },
        ]}
      />

      <section className="bg-cream px-6 pb-24 pt-36 md:px-10 md:pb-36 md:pt-44">
        <div className="mx-auto max-w-[1200px]">
          <header className="text-center">
            <Reveal>
              <span className="kicker text-brown-warm">All Poojas</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mx-auto mt-5 max-w-3xl display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1] text-maroon">
                Sixteen Vedic rituals, performed in Ujjain.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p lang="hi" className="mx-auto mt-6 max-w-xl text-lg text-gold-deep">
                हर समस्या का समाधान, वैदिक विधि से
              </p>
            </Reveal>
          </header>

          <PoojaGrid />
        </div>
      </section>

      <Footer />
      <WhatsAppBottomBar />
    </>
  )
}
