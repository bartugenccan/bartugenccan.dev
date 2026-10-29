import { experience } from '../content'
import { order } from '../lib'
import { SECTION, SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="border-t border-line pt-10 pb-20 md:pt-12 md:pb-28">
        <SectionHeading n={SECTION.experience} className="text-2xl md:text-3xl">
          Experience
        </SectionHeading>

        <ol className="mt-10 border-b border-line">
          {experience.map((job, i) => (
            <li key={job.company} data-reveal style={order(i % 3)} className="border-t border-line py-7 md:py-8">
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <h3 className="text-lg font-medium text-fg">
                  {job.company}
                  <span className="mono ml-3 text-[13px] font-normal text-muted">
                    {job.role}
                    {job.freelance && ' (freelance)'}
                  </span>
                </h3>
                <p className="mono shrink-0 text-[13px] text-muted md:min-w-[11ch] md:text-right">
                  <span className={job.dates.endsWith('now') ? 'text-accent' : undefined}>{job.dates}</span>
                </p>
              </div>
              <ul className="mt-4 max-w-[78ch] space-y-2">
                {job.bullets.map((b) => (
                  <li key={b} className="grid grid-cols-[1.25rem_1fr] leading-relaxed text-muted">
                    <span className="mono text-line" aria-hidden="true">
                      -
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
