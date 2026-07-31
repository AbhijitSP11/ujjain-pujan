'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { useMotionValue, type MotionValue } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollVideoProps {
  src: string
  webm?: string
  poster: string
  /** Total scroll distance the pinned frame occupies on desktop. */
  scrollHeight?: string
  /** Shorter on phones — 350vh of thumb-scrolling is punishing. */
  mobileScrollHeight?: string
  /** Hero only: preload eagerly instead of waiting for the viewport. */
  priority?: boolean
  /** Gradient/tint laid over the video, under the children. */
  scrim?: string
  className?: string
  ariaLabel: string
  /**
   * Receives scroll progress (0→1) as a MotionValue. Read it with
   * useTransform so overlays animate without re-rendering React on every tick.
   */
  children?: (progress: MotionValue<number>) => ReactNode
}

export default function ScrollVideo({
  src,
  webm,
  poster,
  scrollHeight = '300vh',
  mobileScrollHeight = '180vh',
  priority = false,
  scrim,
  className = '',
  ariaLabel,
  children,
}: ScrollVideoProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progress = useMotionValue(0)

  // Stable across server/client — React's useId format is ":r0:".
  const cssId = `sv-${useId().replace(/:/g, '')}`

  const [shouldLoad, setShouldLoad] = useState(priority)
  const [reduced, setReduced] = useState(false)

  // ── lazy mount ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (priority || shouldLoad) return
    const el = outerRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '200% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [priority, shouldLoad])

  // ── reduced motion ────────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // ── scrub ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const outer = outerRef.current
    if (!outer || reduced) return

    // Below md the decoder can't keep up with seeking, so the video plays as a
    // muted loop instead. Progress is still driven by scroll either way, which
    // means the overlay choreography is identical on both.
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    const video = videoRef.current

    let targetTime = 0
    let rafId = 0
    let seeking = false

    /** currentTime writes are throttled to one per frame — the decoder drops
     *  frames badly if you assign on every scroll event. */
    const pump = () => {
      rafId = 0
      if (!video || seeking) return
      const { duration } = video
      if (!Number.isFinite(duration) || duration <= 0) return
      if (Math.abs(video.currentTime - targetTime) < 0.01) return
      seeking = true
      video.currentTime = targetTime
    }

    const onSeeked = () => {
      seeking = false
    }
    video?.addEventListener('seeked', onSeeked)

    const st = ScrollTrigger.create({
      trigger: outer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progress.set(self.progress)

        if (!isDesktop || !video) return
        const { duration } = video
        if (!Number.isFinite(duration) || duration <= 0) return

        // Stop a hair short of the end — landing exactly on duration can flip
        // the element to its ended state and flash black.
        targetTime = Math.min(self.progress * duration, duration - 0.05)
        if (!rafId) rafId = requestAnimationFrame(pump)
      },
    })

    // Metadata may arrive after the trigger is built; re-measure when it does.
    const onMeta = () => ScrollTrigger.refresh()
    video?.addEventListener('loadedmetadata', onMeta, { once: true })

    return () => {
      st.kill()
      if (rafId) cancelAnimationFrame(rafId)
      video?.removeEventListener('seeked', onSeeked)
      video?.removeEventListener('loadedmetadata', onMeta)
    }
  }, [progress, reduced, shouldLoad])

  // ── mobile / reduced-motion playback ──────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad || reduced) return

    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    if (isDesktop) return // desktop scrubs; never call play()

    const start = () => {
      video.play().catch(() => {
        /* autoplay blocked — the poster stands in, which is fine */
      })
    }
    if (video.readyState >= 2) start()
    else video.addEventListener('loadeddata', start, { once: true })

    return () => video.removeEventListener('loadeddata', start)
  }, [shouldLoad, reduced])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `#${cssId}{height:${mobileScrollHeight}}@media(min-width:768px){#${cssId}{height:${scrollHeight}}}`,
        }}
      />
      <div id={cssId} ref={outerRef} className={`relative w-full ${className}`}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {shouldLoad ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={poster}
              preload={priority ? 'auto' : 'metadata'}
              playsInline
              muted
              loop
              disablePictureInPicture
              aria-label={ariaLabel}
              tabIndex={-1}
            >
              {webm && <source src={webm} type="video/webm" />}
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div
              className="poster-bg absolute inset-0"
              style={{ backgroundImage: `url(${poster})` }}
              role="img"
              aria-label={ariaLabel}
            />
          )}

          {scrim && (
            <div className="pointer-events-none absolute inset-0" style={{ background: scrim }} />
          )}

          {children?.(progress)}
        </div>
      </div>
    </>
  )
}
