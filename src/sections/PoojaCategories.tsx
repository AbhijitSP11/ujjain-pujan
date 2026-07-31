import PoojaGrid from '@/components/PoojaGrid'
import SectionHeading from '@/components/SectionHeading'

export default function PoojaCategories() {
  return (
    <section id="poojas" className="bg-cream px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          kicker="Our Poojas"
          title={
            <>
              Every ritual, performed the way the{' '}
              <em className="font-normal not-italic text-gold-deep">shastras</em> prescribe.
            </>
          }
          hindi="हर समस्या का समाधान, वैदिक विधि से"
        />
        <PoojaGrid />
      </div>
    </section>
  )
}
