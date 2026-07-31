'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { WhatsAppIcon, ArrowRightIcon } from './Icons'
import { getWhatsAppURL } from '@/lib/whatsapp'
import { EASE_SACRED } from './motion/primitives'

/**
 * Mobile-only conversion floor. Appears once the hero is behind you so it
 * never competes with the opening shot, then never leaves.
 */
export default function WhatsAppBottomBar({ poojaName }: { poojaName?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 md:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5, ease: EASE_SACRED }}
        >
          <a
            href={getWhatsAppURL(poojaName)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 bg-whatsapp px-4 py-4 font-[family-name:var(--font-label)] text-[0.6875rem] uppercase tracking-[0.16em] text-white"
            style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book Your Pooja on WhatsApp
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
