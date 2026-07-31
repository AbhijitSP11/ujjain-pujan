'use client'

import { SpotlightCard } from './motion/primitives'
import { StarRow } from './Icons'

export interface Pandit {
  initials: string
  name: string
  title: string
  specialities: string[]
  reviews: number
}

export default function PanditCard({ pandit }: { pandit: Pandit }) {
  return (
    <SpotlightCard className="h-full" spotlightColor="rgba(240, 192, 64, 0.1)">
      <article className="flex h-full flex-col rounded-2xl border border-cream/14 bg-cream/[0.04] p-7 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-saffron/40 hover:bg-cream/[0.07] md:p-8">
        {/* Initials stand in until real photographs are supplied. */}
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full border border-saffron/50 bg-saffron/15"
        >
          <span lang="hi" className="text-lg leading-none text-saffron-light">
            {pandit.initials}
          </span>
        </div>

        <h3 className="mt-6 font-[family-name:var(--font-heading)] text-[1.65rem] leading-tight text-cream">
          {pandit.name}
        </h3>
        <p className="mt-2 text-sm text-cream/55">{pandit.title}</p>

        <ul className="mt-6 flex flex-col gap-2">
          {pandit.specialities.map((s) => (
            <li key={s} className="kicker text-saffron-light/80">
              {s}
            </li>
          ))}
        </ul>

        <div className="grow" />

        <div className="mt-7 flex items-center gap-2.5 border-t border-cream/12 pt-5">
          <StarRow className="text-sm text-saffron-light" />
          <span className="kicker text-cream/50">{pandit.reviews} reviews</span>
        </div>
      </article>
    </SpotlightCard>
  )
}
