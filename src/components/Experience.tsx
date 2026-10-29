import { experience } from '../content'
import { order } from '../lib'

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <h2 data-reveal className="text-2xl font-semibold tracking-tight md:text-3xl">
        Experience
      </h2>

      <ol className="mt-12 border-l border-line">
        {experience.map((job, i) => (
          <li
            key={job.company}
            data-reveal
            style={order(i % 3)}
            className={`relative pl-6 md:grid md:grid-cols-[9rem_1fr] md:gap-8 md:pl-8 ${
              job.description ? 'pb-12' : 'pb-6'
            } last:pb-0`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-[0.55rem] -left-[3.5px] size-[7px] ${job.dates.endsWith('now') ? 'bg-accent' : 'bg-line'}`}
            />
            <p className="font-mono text-[13px] whitespace-nowrap text-muted md:pt-0.5">{job.dates}</p>
            <div className="mt-1 md:mt-0">
              <h3 className="text-lg font-medium text-fg">
                {job.company}
                <span className="text-muted">
                  {' · '}
                  {job.role}
                  {job.freelance && <em className="not-italic text-muted/80"> (freelance)</em>}
                </span>
              </h3>
              {job.description && (
                <p className="mt-2 max-w-[62ch] leading-relaxed text-muted">{job.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
