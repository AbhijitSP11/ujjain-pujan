import Link from 'next/link'
import { ArrowRightIcon } from '@/components/Icons'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <span lang="hi" aria-hidden className="text-8xl text-maroon opacity-[0.08]">
        ॐ
      </span>
      <h1 className="display mt-8 text-6xl text-maroon-deep md:text-7xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-brown-warm">
        This path does not lead anywhere. Return to the homepage, or browse all sixteen poojas
        we perform in Ujjain.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="kicker border border-maroon/25 px-6 py-3.5 text-maroon transition-colors hover:bg-maroon hover:text-cream"
        >
          Homepage
        </Link>
        <Link
          href="/poojas/"
          className="group kicker inline-flex items-center gap-2 text-maroon transition-colors hover:text-saffron-deep"
        >
          <span className="underline-draw">All Poojas</span>
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
