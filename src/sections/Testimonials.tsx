import TestimonialCarousel, { type Testimonial } from '@/components/TestimonialCarousel'
import PosterBackdrop from '@/components/PosterBackdrop'
import SectionHeading from '@/components/SectionHeading'
import { Reveal } from '@/components/motion/primitives'
import { POSTERS } from '@/lib/assets'

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Pandit ji performed the pooja with such devotion. I felt an immense sense of peace and positive energy. The entire process was smooth and well-organized.',
    name: 'Rajesh K.',
    city: 'Delhi',
    pooja: 'Rudrabhishek',
  },
  {
    quote:
      'पंडित जी ने पूरी विधि से कालसर्प दोष पूजा कराई। बहुत अच्छा अनुभव रहा, सब कुछ व्यवस्थित था।',
    lang: 'hi',
    name: 'Sunita D.',
    city: 'Pune',
    pooja: 'Kaal Sarp Dosh Nivaran',
  },
  {
    quote:
      'We joined via video call from the US. The pandit explained every step, recited our names in the sankalp, and even sent prasad to our US address. Incredible service.',
    name: 'Amit P.',
    city: 'California',
    pooja: 'Navgrah Shanti',
  },
]

export default function Testimonials() {
  return (
    <section
      aria-label="Devotee experiences"
      className="relative bg-footer-dark px-6 py-24 md:px-10 md:py-36"
    >
      <PosterBackdrop src={POSTERS.ghatsFinal} />
      <div aria-hidden className="absolute inset-0 bg-[rgba(26,18,16,0.8)]" />

      <div className="relative mx-auto max-w-[1000px]">
        <SectionHeading
          kicker="Devotee Experiences"
          title="What devotees say after the ritual."
          tone="dark"
        />

        <Reveal delay={0.14} className="mt-14 md:mt-20">
          <TestimonialCarousel items={TESTIMONIALS} />
        </Reveal>
      </div>
    </section>
  )
}
