import type { Page } from '../pages'
import { SECTION } from './SectionHeading'

export function Nav({ page }: { page: Page }) {
  // On /projects/ the Experience anchor lives on the home page.
  const base = page === 'home' ? '' : '/'
  const items = [
    { n: SECTION.projects, label: 'Projects', href: '/projects/', current: page === 'projects' },
    { n: SECTION.experience, label: 'Experience', href: `${base}#experience` },
    { n: SECTION.contact, label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mono mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 text-[13px] md:px-8"
      >
        <a href="/" className="sel hidden text-fg min-[440px]:inline">
          bartugenccan<span className="text-muted">.dev</span>
        </a>
        <ul className="flex items-center gap-5 sm:gap-7">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={`sel group py-0.5 ${item.current ? 'text-accent' : 'text-fg'}`}
              >
                <span className="hidden text-muted group-hover:text-bg sm:inline" aria-hidden="true">
                  {item.n}{' '}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
