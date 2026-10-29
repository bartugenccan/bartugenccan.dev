import { Nav } from '../components/Nav'
import { LoopVideo } from '../components/LoopVideo'
import { Lessons } from '../components/Lessons'
import { Contact } from '../components/Contact'
import { SECTION, SectionHeading } from '../components/SectionHeading'
import { goCrawler } from '../content'
import { order } from '../lib'

export function Projects() {
  return (
    <>
      <div className="paper" aria-hidden="true" />
      <Nav page="projects" />
      <main>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div style={order(0)} className="rise pt-16 md:pt-24">
            <SectionHeading n={SECTION.projects} as="h1" className="text-5xl tracking-tighter md:text-7xl">
              Projects
            </SectionHeading>
          </div>

          <article id="go-crawler" className="pt-12 pb-20 md:pt-16 md:pb-28">
            <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-12">
              <div style={order(1)} className="rise">
                <h2 className="mono text-3xl tracking-tight md:text-4xl">
                  <a href={goCrawler.repo} className="sel">
                    {goCrawler.name}
                  </a>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-fg">{goCrawler.description}</p>
                <p className="mt-2 leading-relaxed text-muted">{goCrawler.stats}</p>
              </div>
              <div style={order(2)} className="rise">
                <LoopVideo label="Animation: two failed requests keep their semaphore slots and the crawler freezes." />
              </div>
            </div>

            <section id="what-it-taught-me" aria-labelledby="lessons-heading" className="mt-20 md:mt-28">
              <h3 id="lessons-heading" data-reveal className="text-2xl font-semibold tracking-tight md:text-3xl">
                What it taught me
              </h3>
              <Lessons />
            </section>

            <p data-reveal className="mt-10">
              <a href={goCrawler.repo} className="sel mono text-sm text-accent">
                → {goCrawler.repoText}
              </a>
            </p>
          </article>
        </div>
        <Contact />
      </main>
    </>
  )
}
