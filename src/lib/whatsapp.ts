import { SITE } from './site'

const PHONE = SITE.phone

/**
 * Builds a wa.me deep link. Passing a pooja name pre-fills a structured
 * enquiry so the first message already tells the team what to quote.
 */
export function getWhatsAppURL(poojaName?: string, poojaNameHi?: string): string {
  const base = `https://wa.me/${PHONE}`

  if (!poojaName) {
    return `${base}?text=${encodeURIComponent(
      '🙏 नमस्ते! I would like to enquire about pooja booking in Ujjain.\nPlease guide me.'
    )}`
  }

  return `${base}?text=${encodeURIComponent(
    `🙏 नमस्ते!\n\nI am interested in *${poojaName}*${
      poojaNameHi ? ` (${poojaNameHi})` : ''
    } in Ujjain.\n\nPlease share:\n• Available dates\n• Complete cost\n• Samagri & vidhi details\n• Video call option\n\nThank you 🙏`
  )}`
}

/**
 * Used by the pooja-page booking panel's quick-enquiry fields. There is no
 * backend here by design — this only builds a richer wa.me deep link, it
 * never "submits" anywhere, so nothing is promised that isn't delivered.
 */
export function getBookingWhatsAppURL(
  poojaName: string,
  poojaNameHi: string | undefined,
  details: { name?: string; date?: string }
): string {
  const lines = [
    '🙏 नमस्ते!',
    '',
    `I would like to book *${poojaName}*${poojaNameHi ? ` (${poojaNameHi})` : ''} in Ujjain.`,
    '',
  ]
  if (details.name?.trim()) lines.push(`• Name: ${details.name.trim()}`)
  if (details.date) lines.push(`• Preferred date: ${details.date}`)
  lines.push('', 'Please confirm availability and share the complete cost.', '', 'Thank you 🙏')

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join('\n'))}`
}

/** Free-kundli-consultation variant used by the "How it works" step 2 CTA. */
export function getConsultationURL(): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(
    '🙏 नमस्ते!\n\nI would like a free kundli consultation.\n\nMy birth details:\n• Name:\n• Date of birth:\n• Time of birth:\n• Place of birth:\n\nPlease suggest which pooja I should perform.\n\nThank you 🙏'
  )}`
}

export const PHONE_TEL = `tel:+${PHONE}`
