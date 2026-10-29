import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { pages, type Page } from './pages'
import './styles.css'

const root = document.getElementById('root')!
const Component = pages[root.dataset.page as Page]
const app = (
  <StrictMode>
    <Component />
  </StrictMode>
)

// Production HTML is prerendered; the dev server serves an empty root.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

// Scroll reveal: mark each [data-reveal] element once it enters the viewport.
const reveal = () => {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.setAttribute('data-in', ''))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-in', '')
        io.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  els.forEach((el) => io.observe(el))
}
requestAnimationFrame(reveal)
