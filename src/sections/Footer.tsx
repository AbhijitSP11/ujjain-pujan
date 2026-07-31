import Link from 'next/link'
import { POOJAS } from '@/data/poojas'
import { SITE } from '@/lib/site'
import { getWhatsAppURL } from '@/lib/whatsapp'
import { HairlineDivider } from '@/components/motion/primitives'

const SOCIAL = [
  { label: 'WhatsApp', href: getWhatsAppURL() },
  { label: 'Instagram', href: SITE.social.instagram },
  { label: 'YouTube', href: SITE.social.youtube },
]

export default function Footer() {
  const half = Math.ceil(POOJAS.length / 2)
  const columns = [POOJAS.slice(0, half), POOJAS.slice(half)]

  return (
    <footer className="bg-footer-dark px-6 pb-28 pt-24 text-cream md:px-10 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr]">
          {/* ── brand ── */}
          <div>
            <p className="wordmark text-3xl text-cream md:text-4xl">
              Ujjain Pujan
            </p>
            <p lang="hi" className="mt-3 text-xl text-saffron">
              उज्जैन पूजन
            </p>

            <address className="mt-8 not-italic leading-relaxed text-cream/60">
              {SITE.address.street}
              <br />
              {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
            </address>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="kicker underline-draw text-cream/70 transition-colors hover:text-saffron"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── every pooja page, linked ── */}
          <nav aria-label="All poojas">
            <h2 className="kicker text-cream/40">All Poojas</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2">
              {columns.map((col, i) => (
                <ul key={i} className="flex flex-col">
                  {col.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/pooja/${p.slug}/`}
                        data-cursor="link"
                        className="block py-2 text-sm text-cream/62 transition-colors hover:text-saffron"
                      >
                        {p.nameEn}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>
        </div>

        <HairlineDivider className="mt-16" color="rgba(250,245,235,0.14)" />

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="kicker text-cream/45">
            © {SITE.founded} {SITE.name} · All rights reserved.
          </p>

          <p className="kicker-lg text-cream">
            <span className="text-saffron">BR</span>
            <span className="mx-2.5 text-cream/25">|</span>
            Built By Ruturaj
          </p>
        </div>
      </div>
    </footer>
  )
}
