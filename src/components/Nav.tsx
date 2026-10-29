import type { Page } from '../pages'

export function Nav({ page }: { page: Page }) {
  // On /projects/ the section anchors live on the home page.
  const base = page === 'home' ? '' : '/'
  const items = [
    { label: 'Now', href: `${base}#now` },
    { label: 'Projects', href: '/projects/', current: page === 'projects' },
    { label: 'Experience', href: `${base}#experience` },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/75 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8"
      >
        <a
          href="/"
          className="hidden font-mono text-[13px] tracking-tight text-fg min-[440px]:inline"
        >
          bartugenccan<span className="text-accent">.dev</span>
        </a>
        <ul className="flex items-center gap-4 text-[13px] sm:gap-6 sm:text-sm">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={`hover-line py-1 transition-colors ${
                  item.current ? 'text-accent' : 'text-muted hover:text-fg'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
