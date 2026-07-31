import PanditCard, { type Pandit } from '@/components/PanditCard'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/primitives'

const PANDITS: Pandit[] = [
  {
    initials: 'र.श.',
    name: 'Pt. Ramesh Shastri',
    title: 'Acharya · 20+ years at Mahakaleshwar',
    specialities: ['Kaal Sarp Dosh', 'Rudrabhishek', 'Navgrah Shanti'],
    reviews: 127,
  },
  {
    initials: 'द.त्रि.',
    name: 'Pt. Dinesh Trivedi',
    title: 'Shastri · 15+ years at Ram Ghat',
    specialities: ['Pind Daan', 'Tripindi Shradh', 'Narayan Nagbali'],
    reviews: 94,
  },
  {
    initials: 'स.जो.',
    name: 'Pt. Suresh Joshi',
    title: 'Acharya · 18+ years at Mangalnath',
    specialities: ['Mangal Dosh Bhat', 'Kumbh Vivah', 'Vivah Sanskar'],
    reviews: 111,
  },
  {
    initials: 'अ.व्या.',
    name: 'Pt. Anand Vyas',
    title: 'Shastri · 12+ years · Jyotish Ratna',
    specialities: ['Mahamrityunjay Jaap', 'Vastu Shanti', 'Griha Pravesh'],
    reviews: 78,
  },
]

const BADGES = [
  'Shastri / Acharya Qualified',
  'Temple-Affiliated',
  '500+ Poojas Performed',
]

export default function Pandits() {
  return (
    <section id="pandits" className="bg-night-soft px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          kicker="Our Pandits"
          title="The people who will perform your ritual."
          hindi="अनुभवी · प्रमाणित · श्रद्धालु"
          tone="dark"
        />

        {/* Horizontal rail on phones, four-up grid from lg. */}
        <StaggerGroup
          className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:mt-20 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4"
          stagger={0.09}
        >
          {PANDITS.map((p) => (
            <StaggerItem
              key={p.name}
              className="w-[78vw] shrink-0 snap-start sm:w-[60vw] md:w-auto"
            >
              <PanditCard pandit={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-cream/12 pt-10">
            {BADGES.map((badge, i) => (
              <span key={badge} className="flex items-center gap-3">
                <span className="kicker text-cream/50">{badge}</span>
                {i < BADGES.length - 1 && (
                  <span aria-hidden className="text-saffron/40">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
