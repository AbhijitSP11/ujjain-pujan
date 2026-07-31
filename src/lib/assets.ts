export const VIDEOS = {
  templeDawn: '/videos/optimized/ujjain-temple-dawn.mp4',
  ghats: '/videos/optimized/ujjain-shipra-ghats.mp4',
  samagri: '/videos/optimized/ujjain-pooja-samagri.mp4',
} as const

export const VIDEOS_WEBM = {
  templeDawn: '/videos/optimized/ujjain-temple-dawn.webm',
  ghats: '/videos/optimized/ujjain-shipra-ghats.webm',
  samagri: '/videos/optimized/ujjain-pooja-samagri.webm',
} as const

export const POSTERS = {
  templeDawn: '/posters/ujjain-temple-dawn.webp', // temple in mist (frame 0)
  templeDawnFinal: '/posters/ujjain-temple-dawn-final.webp', // temple revealed in golden light (last frame)
  ghats: '/posters/ujjain-shipra-ghats.webp',
  ghatsFinal: '/posters/ujjain-shipra-ghats-final.webp', // water's edge
  samagri: '/posters/ujjain-pooja-samagri.webp', // kalash close-up
  samagriFinal: '/posters/ujjain-pooja-samagri-final.webp', // full spread revealed
} as const

export type PosterKey = keyof typeof POSTERS

/**
 * Per-pooja photography. Sourced from Pexels (Pexels License — free for
 * commercial use, no attribution required), downloaded and re-encoded to
 * WebP at 1000px so nothing is hotlinked at runtime.
 *
 * Source aspect ratios vary from 3:2 to 4:7, so every consumer must crop
 * with a fixed-ratio container + object-cover.
 */
export const POOJA_IMAGES: Record<string, { src: string; alt: string }> = {
  'kaal-sarp-dosh': {
    src: '/images/poojas/kaal-sarp-dosh.webp',
    alt: 'Ancient stone temples at sunset in Khajuraho, Madhya Pradesh',
  },
  'mangal-dosh': {
    src: '/images/poojas/mangal-dosh.webp',
    alt: 'Traditional Hindu wedding ceremony around the sacred fire',
  },
  'pitra-dosh': {
    src: '/images/poojas/pitra-dosh.webp',
    alt: 'Evening ritual ceremony on the river ghats with devotees gathered',
  },
  'navgrah-shanti': {
    src: '/images/poojas/navgrah-shanti.webp',
    alt: 'Pooja setup with marigold garlands, fruit and copper utensils',
  },
  rudrabhishek: {
    src: '/images/poojas/rudrabhishek.webp',
    alt: 'Shivling with ritual offerings arranged for abhishek',
  },
  'mahamrityunjay-jaap': {
    src: '/images/poojas/mahamrityunjay-jaap.webp',
    alt: 'Pandits performing a traditional Hindu ceremony in India',
  },
  'laghu-rudra': {
    src: '/images/poojas/laghu-rudra.webp',
    alt: 'Traditional havan ceremony with the sacred fire kindled',
  },
  'pind-daan': {
    src: '/images/poojas/pind-daan.webp',
    alt: 'Priests performing river rites on the ghats',
  },
  'tripindi-shradh': {
    src: '/images/poojas/tripindi-shradh.webp',
    alt: 'Ancestral rites being performed on the river ghats',
  },
  'narayan-nagbali': {
    src: '/images/poojas/narayan-nagbali.webp',
    alt: 'Pandit performing an evening river ritual with lamps',
  },
  'kumbh-vivah': {
    src: '/images/poojas/kumbh-vivah.webp',
    alt: 'Vivah rites performed around the sacred fire',
  },
  'satyanarayan-katha': {
    src: '/images/poojas/satyanarayan-katha.webp',
    alt: 'Pooja setup with fruit, flowers and traditional offerings',
  },
  'vastu-shanti': {
    src: '/images/poojas/vastu-shanti.webp',
    alt: 'Ritual offerings and sacred fire at sunset',
  },
  'sunderkand-path': {
    src: '/images/poojas/sunderkand-path.webp',
    alt: 'Devotees gathered for a Hindu religious recitation',
  },
  'griha-pravesh': {
    src: '/images/poojas/griha-pravesh.webp',
    alt: 'Marigold flowers and traditional sweets laid out for a ceremony',
  },
  'mangalnath-pooja': {
    src: '/images/poojas/mangalnath-pooja.webp',
    alt: 'Ornate temple gopuram rising against the sky',
  },
}

/** Alt text for every poster frame — these are the site's only static images. */
export const POSTER_ALT: Record<PosterKey, string> = {
  templeDawn: 'Mahakaleshwar temple spire wrapped in early morning mist in Ujjain',
  templeDawnFinal: 'Mahakaleshwar temple in Ujjain revealed in golden sunrise light',
  ghats: 'Stone steps of the Ram Ghat descending toward the Shipra river in Ujjain',
  ghatsFinal: "The water's edge of the sacred Shipra river at Ram Ghat, Ujjain",
  samagri: 'Copper kalash and pooja samagri arranged for a Vedic ritual',
  samagriFinal: 'Complete pooja samagri spread laid out for a Vedic ceremony in Ujjain',
}
