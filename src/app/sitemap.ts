import type { MetadataRoute } from 'next'
import { POOJAS } from '@/data/poojas'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: `${SITE.url}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/poojas/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...POOJAS.map((p) => ({
      url: `${SITE.url}/pooja/${p.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
