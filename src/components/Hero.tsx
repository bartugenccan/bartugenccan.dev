import { lazy, Suspense, useEffect, useState } from 'react'
import { hero, links } from '../content'
import { order } from '../lib'

const ProcessGraph = lazy(() => import('./ProcessGraph'))

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-14 pb-16 md:min-h-[min(calc(100dvh-4rem),56rem)] md:grid-cols-[1.05fr_1fr] md:gap-4 md:px-8 md:py-0">
      <div className="relative z-10">
        <h1
          style={order(0)}
          className="rise text-5xl leading-[1.02] font-semibold tracking-tighter text-fg md:text-7xl"
        >
          {hero.name}
        </h1>
        <p style={order(1)} className="rise mt-6 max-w-[24ch] text-xl leading-snug tracking-tight text-fg md:text-2xl">
          {hero.tagline}
        </p>
        <p style={order(2)} className="rise mt-4 max-w-[48ch] leading-relaxed text-muted">
          {hero.sub}
        </p>
        <div style={order(3)} className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="/projects/"
            className="press rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:bg-[#c9ff63]"
          >
            Projects
          </a>
          <a
            href={links.email.href}
            className="press rounded-md border border-line px-5 py-2.5 font-mono text-[13px] text-fg hover:border-muted"
          >
            {links.email.text}
          </a>
          <ul className="flex gap-5 font-mono text-[13px]">
            {[links.github, links.linkedin, links.x].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover-line text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <GraphSlot />
    </section>
  )
}

function GraphSlot() {
  const [mounted, setMounted] = useState(false)

  // Load three.js only after the hero text has painted.
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setMounted(true), { timeout: 1500 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(() => setMounted(true), 300)
    return () => clearTimeout(id)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="relative -mx-4 aspect-square md:mx-0 md:aspect-auto md:h-[min(680px,82dvh)]"
    >
      <div className="absolute inset-0 [background-image:radial-gradient(circle,var(--color-line)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(closest-side,black,transparent)]" />
      {mounted && (
        <Suspense fallback={null}>
          <ProcessGraph />
        </Suspense>
      )}
    </div>
  )
}
