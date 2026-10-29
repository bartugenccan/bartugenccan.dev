import { Nav } from '../components/Nav'
import { LoopVideo } from '../components/LoopVideo'
import { BrokeCards } from '../components/BrokeCards'
import { Contact } from '../components/Contact'
import { goCrawler } from '../content'
import { order } from '../lib'

export function Projects() {
  return (
    <>
      <Nav page="projects" />
      <main>
        <div className="mx-auto max-w-6xl px-4 pt-16 md:px-8 md:pt-24">
          <h1 style={order(0)} className="rise text-5xl font-semibold tracking-tighter md:text-7xl">
            Projects
          </h1>
        </div>

        <article id="go-crawler" className="mx-auto max-w-6xl px-4 pt-12 pb-24 md:px-8 md:pt-16 md:pb-32">
          <div className="grid gap-6 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-12">
            <div style={order(1)} className="rise">
              <h2 className="font-mono text-3xl tracking-tight md:text-4xl">
                <a href={goCrawler.repo} className="hover-line">
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

          <section id="what-broke" aria-labelledby="what-broke-heading" className="mt-20 md:mt-28">
            <h3 id="what-broke-heading" data-reveal className="text-2xl font-semibold tracking-tight md:text-3xl">
              What broke
            </h3>
            <BrokeCards />
          </section>

          <div data-reveal className="mt-12 flex flex-col gap-4 font-mono text-sm md:flex-row md:items-center md:justify-between">
            <p className="text-muted">
              <span className="font-sans text-base">Design decisions and what each one cost: </span>
              <a href={goCrawler.decisions} className="hover-line text-fg hover:text-accent">
                docs/DECISIONS.md
              </a>
            </p>
            <a href={goCrawler.repo} className="hover-line text-accent">
              → {goCrawler.repoText}
            </a>
          </div>
        </article>

        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
