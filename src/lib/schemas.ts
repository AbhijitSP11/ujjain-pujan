import { SITE } from './site'
import type { Pooja } from '@/data/poojas'

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
}

const PROVIDER = {
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  address: ADDRESS,
  telephone: `+${SITE.phone}`,
  url: SITE.url,
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    alternateName: SITE.nameHi,
    description: SITE.description,
    url: SITE.url,
    telephone: `+${SITE.phone}`,
    email: SITE.email,
    image: `${SITE.url}${SITE.ogImage}`,
    priceRange: '₹₹',
    address: ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: { '@type': 'City', name: 'Ujjain' },
    foundingDate: SITE.founded,
    sameAs: [SITE.social.instagram, SITE.social.youtube],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.stats.rating,
      reviewCount: SITE.stats.reviewCount,
      bestRating: '5',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '06:00',
      closes: '21:00',
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.nameHi,
    description: SITE.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE.url}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/poojas/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function serviceSchema(pooja: Pooja) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${pooja.nameEn} Pooja in Ujjain`,
    alternateName: pooja.nameHi,
    description: pooja.description,
    serviceType: 'Vedic Pooja',
    provider: PROVIDER,
    areaServed: { '@type': 'City', name: 'Ujjain' },
    url: `${SITE.url}/pooja/${pooja.slug}/`,
    offers: {
      '@type': 'Offer',
      price: String(pooja.priceFrom),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/pooja/${pooja.slug}/`,
      ...(pooja.priceTo && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: pooja.priceFrom,
          maxPrice: pooja.priceTo,
          priceCurrency: 'INR',
        },
      }),
    },
  }
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  }
}
