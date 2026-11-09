import { building } from '../content'
import { order } from '../lib'

// Roadmap as a process table: one hairline row per project, status in mono.
export function Building() {
  return (
    <div data-reveal style={order(3)} className="mt-16 md:mt-20">
      <h3 className="mono text-[13px] tracking-normal text-muted">Now building</h3>
      <ol className="mono mt-4 border-t border-line text-[13px] tabular-nums">
        {building.map((b) => {
          const active = b.status === 'in progress'
          return (
            <li
              key={b.id}
              className="grid grid-cols-[2.5rem_1fr_auto] gap-x-4 gap-y-1 border-b border-line py-3 md:grid-cols-[3rem_10rem_1fr_auto]"
            >
              <span className="text-muted">{b.id}</span>
              <span className={active ? 'text-fg' : 'text-muted'}>{b.name}</span>
              <span className="col-start-2 font-sans text-sm text-muted md:col-start-auto">{b.what}</span>
              <span
                className={`row-start-1 col-start-3 text-right md:row-start-auto md:col-start-auto ${active ? 'text-accent' : 'text-muted'}`}
              >
                {b.status}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
