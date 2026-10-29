import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib'

// Remotion-rendered loop (see video/). Server HTML ships with native controls
// so it works without JS; once hydrated it autoplays while on screen, unless
// the visitor prefers reduced motion.
export function LoopVideo({ label, className = '' }: { label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [enhanced, setEnhanced] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || prefersReducedMotion()) return
    setEnhanced(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      aria-label={label}
      className={`aspect-video w-full rounded-md border border-line bg-surface object-cover ${className}`}
      poster="/media/semaphore-poster.jpg"
      controls={!enhanced}
      muted
      loop
      playsInline
      preload="metadata"
      width={1280}
      height={720}
    >
      <source src="/media/semaphore-loop.mp4" type="video/mp4" />
      <source src="/media/semaphore-loop.webm" type="video/webm" />
    </video>
  )
}
