import type { CSSProperties } from 'react'

/** Stagger index consumed by the CSS animations (`--i`). */
export const order = (i: number) => ({ '--i': i }) as CSSProperties

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
