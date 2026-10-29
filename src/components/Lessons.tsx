import { goCrawler } from '../content'
import { inline, order } from '../lib'

// Failure and the rule it left behind, as rows of a datasheet.
export function Lessons() {
  return (
    <ol className="mt-8 border-b border-line">
      {goCrawler.broke.map((item, i) => (
        <li
          key={i}
          data-reveal
          style={order(i)}
          className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-8 md:grid-cols-[4rem_1fr] md:py-10"
        >
          <span className="mono pt-1 text-[13px] text-fail">{String(i + 1).padStart(2, '0')}</span>
          <div className="max-w-[70ch]">
            <p className="text-lg leading-relaxed text-fg md:text-xl">{inline(item.what)}</p>
            <p className="mt-4 flex gap-3 pl-0 leading-relaxed text-muted md:pl-6 md:text-lg">
              <span className="mono shrink-0 text-accent/70" aria-hidden="true">
                //
              </span>
              <span>{inline(item.lesson)}</span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
