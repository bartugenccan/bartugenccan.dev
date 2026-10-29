import { now } from '../content'
import { order } from '../lib'

export function NowPanel() {
  const ticks = Array.from({ length: now.totalWeeks }, (_, i) => i < now.week)

  return (
    <section id="now" className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <div
        data-reveal
        className="rounded-md border border-line bg-surface p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] md:p-10"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="pulse relative inline-block size-2 rounded-full bg-accent" aria-hidden="true" />
            Now
          </h2>
          <p className="font-mono text-[13px] text-muted">
            <span className="text-fg">
              Week {now.week} of {now.totalWeeks}
            </span>
            <span className="mx-2 text-line">/</span>
            {now.phase}
          </p>
        </div>

        <div
          className="mt-8 flex h-8 items-end gap-[2px] sm:gap-[3px]"
          role="img"
          aria-label={`Week ${now.week} of ${now.totalWeeks}`}
        >
          {ticks.map((lit, i) => (
            <span key={i} className="relative h-full flex-1 rounded-[1px] bg-line">
              {lit && <span style={order(i)} className="tick-lit absolute inset-0 rounded-[1px] bg-accent" />}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="font-mono text-[13px] text-accent">Right now</h3>
            <p className="mt-3 text-lg leading-relaxed text-fg">{capitalize(now.rightNow)}</p>
          </div>
          <div>
            <h3 className="font-mono text-[13px] text-muted">Next</h3>
            <p className="mt-3 text-lg leading-relaxed text-fg/85">{capitalize(now.next)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
