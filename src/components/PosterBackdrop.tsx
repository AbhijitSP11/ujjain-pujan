'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Poster frame as a section background, fetched only once the section is
 * within about a viewport and a half. A plain CSS background-image on a
 * below-fold element still competes with the hero video for bandwidth, which
 * is exactly what we don't want during LCP.
 */
export default function PosterBackdrop({
  src,
  parallax = true,
  eager = false,
  className = '',
}: {
  src: string
  parallax?: boolean
  eager?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(eager)

  useEffect(() => {
    if (load) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '150% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [load])

  return (
    <div
      ref={ref}
      aria-hidden
      className={`poster-bg absolute inset-0 transition-opacity duration-700 ${
        parallax ? 'bg-parallax' : ''
      } ${load ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={load ? { backgroundImage: `url(${src})` } : undefined}
    />
  )
}
