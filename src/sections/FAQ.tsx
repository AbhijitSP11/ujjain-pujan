import FAQAccordion from '@/components/FAQAccordion'
import JsonLd from '@/components/JsonLd'
import SectionHeading from '@/components/SectionHeading'
import { Reveal } from '@/components/motion/primitives'
import { HOME_FAQ } from '@/data/faq'
import { faqSchema } from '@/lib/schemas'

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream px-6 py-24 md:px-10 md:py-36">
      <JsonLd schema={faqSchema(HOME_FAQ)} />

      <div className="mx-auto max-w-[900px]">
        <SectionHeading
          kicker="Frequently Asked"
          title="Questions devotees ask us most."
          hindi="अक्सर पूछे जाने वाले प्रश्न"
        />

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <FAQAccordion items={HOME_FAQ} />
        </Reveal>
      </div>
    </section>
  )
}
