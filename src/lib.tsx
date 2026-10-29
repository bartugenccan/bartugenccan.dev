import type { CSSProperties, ReactNode } from 'react'

/** Stagger index consumed by the CSS animations (`--i`). */
export const order = (i: number) => ({ '--i': i }) as CSSProperties

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Renders `backtick` spans in copy as <code>. */
export function inline(text: string): ReactNode[] {
  return text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))
}
