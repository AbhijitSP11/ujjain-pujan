'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ChevronDownIcon, MenuIcon, CloseIcon } from './Icons'
import WhatsAppButton from './WhatsAppButton'
import PoojaNavMenu from './PoojaNavMenu'
import { getWhatsAppURL } from '@/lib/whatsapp'
import { SITE } from '@/lib/site'
import { POOJA_GROUPS } from '@/data/poojas'
import { EASE_SACRED, staggerParent } from './motion/primitives'

const LINKS = [
  { label: 'How It Works', hash: '#how-it-works' },
  { label: 'Pandits', hash: '#pandits' },
  { label: 'Contact', hash: '#contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [solid, setSolid] = useState(!isHome)
  const [open, setOpen] = useState(false)
  const [poojaOpen, setPoojaOpen] = useState(false)

  // Transparent over the hero, cream once past it. Pages without a hero start solid.
  useEffect(() => {
    if (!isHome) {
      setSolid(true)
      return
    }
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) setPoojaOpen(false)
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const href = (hash: string) => (isHome ? hash : `/${hash}`)

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE_SACRED }}
      >
        {/* A floating pill rather than a full-width bar — it reads lighter
            over the hero and gives the nav an edge to cast a shadow from. */}
        <div className="mx-auto max-w-[1400px] px-3 pt-3 md:px-6 md:pt-5">
          <nav
            aria-label="Primary"
            className={[
              'flex items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:pl-7 md:pr-2.5',
              solid
                ? 'border border-cream-deep bg-cream/85 shadow-[0_10px_34px_-14px_rgba(61,15,16,0.35)] backdrop-blur-xl'
                : 'border border-cream/18 bg-night/25 backdrop-blur-md',
            ].join(' ')}
          >
            {/* ── brand ── */}
            <Link href="/" className="group flex items-baseline gap-2.5" data-cursor="link">
              <span
                lang="hi"
                className={`text-lg leading-none transition-colors duration-500 md:text-xl ${
                  solid ? 'text-saffron-deep' : 'text-saffron-light'
                }`}
              >
                उज्जैन पूजन
              </span>
              <span
                className={`kicker hidden transition-colors duration-500 sm:inline ${
                  solid ? 'text-brown-warm' : 'text-cream/65'
                }`}
              >
                Ujjain Pujan
              </span>
            </Link>

            {/* ── desktop links: pill highlight scales in on hover ── */}
            <div className="hidden items-center gap-1 lg:flex">
              <PoojaNavMenu solid={solid} />
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={href(l.hash)}
                  data-cursor="link"
                  className={`group/n relative rounded-full px-4 py-2.5 transition-colors duration-400 ${
                    solid
                      ? 'text-brown-dark hover:text-maroon-deep'
                      : 'text-cream/85 hover:text-cream'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 scale-90 rounded-full opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/n:scale-100 group-hover/n:opacity-100 ${
                      solid ? 'bg-maroon-deep/8' : 'bg-cream/12'
                    }`}
                  />
                  <span className="kicker relative">{l.label}</span>
                </a>
              ))}
            </div>

            {/* ── cta + burger ── */}
            <div className="flex items-center gap-2">
              <WhatsAppButton
                href={getWhatsAppURL()}
                label="Book Now"
                size="sm"
                className="hidden sm:inline-flex"
              />
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 lg:hidden ${
                  solid
                    ? 'border border-maroon/15 text-brown-dark hover:bg-maroon-deep hover:text-cream'
                    : 'border border-cream/25 text-cream hover:bg-cream/15'
                }`}
              >
                <MenuIcon />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── mobile sheet ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-cream lg:hidden"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE_SACRED }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span lang="hi" className="text-lg text-saffron">
                उज्जैन पूजन
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-1.5 text-brown-dark"
              >
                <CloseIcon />
              </button>
            </div>

            <motion.ul
              className="mt-10 flex max-h-[calc(100dvh-15rem)] flex-col gap-1 overflow-y-auto px-5"
              variants={staggerParent(0.07, 0.15)}
              initial="hidden"
              animate="show"
            >
              {/* Pooja Booking — expands into the same grouped list the
                  desktop dropdown shows, since the mobile sheet has no room
                  for a hover menu. */}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.6, ease: EASE_SACRED },
                  },
                }}
              >
                <button
                  type="button"
                  onClick={() => setPoojaOpen((v) => !v)}
                  aria-expanded={poojaOpen}
                  className="flex w-full items-center justify-between border-b border-maroon/10 py-5 font-[family-name:var(--font-heading)] text-3xl text-maroon"
                >
                  Pooja Booking
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-saffron transition-transform duration-400 ${
                      poojaOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {poojaOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_SACRED }}
                      className="overflow-hidden border-b border-maroon/10"
                    >
                      <div className="flex flex-col gap-6 py-5">
                        {POOJA_GROUPS.map((group) => (
                          <div key={group.id}>
                            <span className="kicker text-gold-deep">{group.label}</span>
                            <ul className="mt-2.5 flex flex-col gap-1">
                              {group.items.map((p) => (
                                <li key={p.slug}>
                                  <Link
                                    href={`/pooja/${p.slug}/`}
                                    onClick={() => setOpen(false)}
                                    className="block py-1.5 text-base text-brown-dark"
                                  >
                                    {p.nameEn}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link
                          href="/poojas/"
                          onClick={() => setOpen(false)}
                          className="kicker text-maroon-deep underline-draw self-start"
                        >
                          View All 16 Poojas →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>

              {LINKS.map((l) => (
                <motion.li
                  key={l.label}
                  variants={{
                    hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.6, ease: EASE_SACRED },
                    },
                  }}
                >
                  <a
                    href={href(l.hash)}
                    onClick={() => setOpen(false)}
                    className="block border-b border-maroon/10 py-5 font-[family-name:var(--font-heading)] text-3xl text-maroon"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <div className="px-5 pt-10">
              <WhatsAppButton
                href={getWhatsAppURL()}
                label="Book Your Pooja"
                size="md"
                fullWidth
              />
              <p className="kicker mt-6 text-brown-warm">
                {SITE.address.street} · {SITE.address.locality}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
