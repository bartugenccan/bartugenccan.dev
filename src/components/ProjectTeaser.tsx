import { goCrawler } from '../content'
import { order } from '../lib'
import { LoopVideo } from './LoopVideo'

export function ProjectTeaser() {
  return (
    <section aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <h2 id="projects-heading" data-reveal className="text-sm font-medium text-muted">
        Projects
      </h2>

      <div className="mt-8 grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-12">
        <div data-reveal style={order(1)}>
          <LoopVideo label="Animation: two failed requests keep their semaphore slots and the crawler freezes." />
        </div>

        <div data-reveal style={order(2)}>
          <h3 className="font-mono text-2xl tracking-tight text-fg md:text-3xl">{goCrawler.name}</h3>
          <p className="mt-4 leading-relaxed text-muted">
            {goCrawler.description} {goCrawler.stats}
          </p>
          <p className="mt-6 font-mono text-sm text-fail">{goCrawler.broke.length} things broke</p>
          <a
            href="/projects/#what-broke"
            className="press mt-8 inline-flex items-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm text-fg hover:border-accent hover:text-accent"
          >
            Read what broke <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
