import { goCrawler } from '../content'
import { order } from '../lib'

export function BrokeCards() {
  return (
    <ul className="mt-8 grid gap-4">
      {goCrawler.broke.map((item, i) => (
        <li
          key={i}
          data-reveal
          style={order(i)}
          className="relative overflow-hidden rounded-md border border-line bg-surface px-6 py-7 md:px-10 md:py-9"
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-fail" />
          <p className="font-mono text-[13px] text-fail">failure {String(i + 1).padStart(2, '0')}</p>
          <p className="mt-3 text-lg leading-relaxed text-fg md:text-xl">
            {item.text}
            {item.code && <code>{item.code}</code>}
            {item.after}
          </p>
        </li>
      ))}
    </ul>
  )
}
