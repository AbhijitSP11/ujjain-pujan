import type { Metadata, Viewport } from 'next'
import {
  Bricolage_Grotesque,
  Cinzel,
  Cormorant_Garamond,
  Jost,
  Karla,
  Tiro_Devanagari_Hindi,
} from 'next/font/google'
import './globals.css'

import SmoothScroll from '@/components/SmoothScroll'
import Navigation from '@/components/Navigation'
import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import GrainOverlay from '@/components/GrainOverlay'
import JsonLd from '@/components/JsonLd'
import { localBusinessSchema, websiteSchema } from '@/lib/schemas'
import { SITE } from '@/lib/site'

/* Stand-ins for the four custom faces. The moment the real .woff2 files land
   in public/fonts/, the @font-face rules in globals.css take precedence and
   these drop to second in each stack.

   Chosen to be worth shipping on their own rather than as placeholders:
   Cinzel is inscriptional Roman capital — the closest thing on Google Fonts
   to lettering carved into temple stone. Cormorant Garamond carries the
   editorial headings without the ubiquity of Playfair. */
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})
const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-karla',
  display: 'swap',
})
const tiro = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  variable: '--font-tiro',
  display: 'swap',
})
/* The hero's attention-grabbing line needs a voice distinct from both the
   inscriptional wordmark and the editorial body serif — a heavy, modern
   grotesque reads as punchy/contemporary next to Cinzel's carved-stone caps,
   which is the contrast that makes a hero tagline pop rather than blend in. */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Ujjain Pujan — Book Vedic Poojas in Ujjain with Verified Pandits',
    template: '%s | Ujjain Pujan',
  },
  description: SITE.description,
  keywords: [
    'pooja booking Ujjain',
    'Kaal Sarp Dosh Pooja Ujjain',
    'Mangal Dosh Bhat Pooja',
    'Pitra Dosh Nivaran Ujjain',
    'Rudrabhishek Mahakaleshwar',
    'Pind Daan Ujjain',
    'pandit in Ujjain',
    'Mahakaleshwar pooja booking',
  ],
  authors: [{ name: SITE.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Ujjain Pujan — Book Vedic Poojas in Ujjain with Verified Pandits',
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: 'Mahakaleshwar temple in Ujjain revealed in golden sunrise light',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ujjain Pujan — Book Vedic Poojas in Ujjain',
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF5EB',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable} ${karla.variable} ${tiro.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <JsonLd schema={[localBusinessSchema(), websiteSchema()]} />
      </head>
      <body>
        <Preloader />
        <ScrollProgress />
        <GrainOverlay />
        <CustomCursor />
        <Navigation />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  )
}
