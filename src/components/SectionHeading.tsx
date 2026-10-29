import type { ReactNode } from 'react'

// Man-page style section label: "01 / Projects". Numbers are fixed site-wide.
export const SECTION = { projects: '01', experience: '02', contact: '03' } as const

export function SectionHeading({
  n,
  id,
  as: Tag = 'h2',
  className = '',
  children,
}: {
  n: string
  id?: string
  as?: 'h1' | 'h2'
  className?: string
  children: ReactNode
}) {
  return (
    <Tag id={id} className={`flex items-baseline gap-3 font-semibold tracking-tight text-fg ${className}`}>
      <span className="mono text-[0.5em] font-normal tracking-normal text-muted">{n} /</span>
      {children}
    </Tag>
  )
}
