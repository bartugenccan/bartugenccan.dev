import { goCrawler } from '../content'
import { order } from '../lib'
import { LoopVideo } from './LoopVideo'
import { SECTION, SectionHeading } from './SectionHeading'

export function ProjectTeaser() {
  const count = goCrawler.broke.length

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="border-t border-line pt-10 pb-20 md:pt-12 md:pb-28">
        <SectionHeading n={SECTION.projects} className="text-2xl md:text-3xl">
          Projects
        </SectionHeading>

        <div className="mt-10 grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-12">
          <div data-reveal style={order(1)}>
            <LoopVideo label="Animation: two failed requests keep their semaphore slots and the crawler freezes." />
          </div>

          <div data-reveal style={order(2)}>
            <h3 className="mono text-2xl tracking-tight text-fg md:text-3xl">{goCrawler.name}</h3>
            <p className="mt-4 leading-relaxed text-muted">
              {goCrawler.description} {goCrawler.stats}
            </p>
            <p className="mono mt-6 text-[13px]">
              <span className="text-fail">{count} failures</span>
              <span className="text-muted"> / {count} rules</span>
            </p>
            <a href="/projects/#what-it-taught-me" className="btn mt-8 text-sm">
              What it taught me <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
