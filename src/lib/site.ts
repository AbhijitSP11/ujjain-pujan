/** Single source of truth for business details used across metadata + JSON-LD. */
export const SITE = {
  name: 'Ujjain Pujan',
  nameHi: 'उज्जैन पूजन',
  url: 'https://ujjainpujan.com',
  tagline: 'Where tradition meets trust.',
  description:
    'Book authentic Vedic poojas in Ujjain with verified pandits. Kaal Sarp Dosh, Mangal Dosh, Pitra Dosh, Rudrabhishek, Pind Daan and more — complete samagri, live video call, prasad delivered.',
  // TODO: replace with the real number before launch (format: country code + number, digits only)
  phone: '91XXXXXXXXXX',
  phoneDisplay: '+91 XXXXX XXXXX',
  email: 'namaste@ujjainpujan.com',
  address: {
    street: 'Near Mahakaleshwar Temple',
    locality: 'Ujjain',
    region: 'Madhya Pradesh',
    postalCode: '456001',
    country: 'IN',
  },
  geo: { lat: 23.1828, lng: 75.7681 },
  founded: '2024',
  ogImage: '/og-image.webp',
  social: {
    instagram: 'https://instagram.com/ujjainpujan',
    youtube: 'https://youtube.com/@ujjainpujan',
  },
  stats: {
    poojas: '500+',
    pandits: '25+',
    rating: '4.9',
    reviewCount: 127,
  },
} as const
