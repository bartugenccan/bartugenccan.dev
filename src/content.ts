// Single source of copy for the site. Mirrors CONTENT.md word for word.
// Backticks mark inline code and render as <code> (see inline() in lib.tsx).

export const links = {
  github: { label: 'GitHub', href: 'https://github.com/bartugenccan', text: 'github.com/bartugenccan' },
  linkedin: { label: 'LinkedIn', href: 'https://linkedin.com/in/bartugenccan', text: 'linkedin.com/in/bartugenccan' },
  x: { label: 'X', href: 'https://x.com/bartugenccandev', text: 'x.com/bartugenccandev' },
  email: { label: 'Email', href: 'mailto:bartu@bartugenccan.dev', text: 'bartu@bartugenccan.dev' },
}

export const hero = {
  name: 'Bartu Gençcan',
  tagline: 'Backend engineer moving toward systems and infrastructure.',
  sub: 'Five years shipping production web, mobile and backend. Now going one layer down: operating systems, networking, concurrency.',
}

export type Broke = { what: string; lesson: string }

export const goCrawler = {
  name: 'go-crawler',
  repo: 'https://github.com/bartugenccan/go-crawler',
  repoText: 'github.com/bartugenccan/go-crawler',
  description: 'A web crawler in Go, written to learn systems, not to scrape anything.',
  stats: '50 pages, 1000 books, and the rules they left behind.',
  broke: [
    {
      what: 'A retry loop with three attempts but only two delays. Index out of range on the final attempt.',
      lesson: 'When two numbers have to stay in step, derive one from the other instead of writing both down.',
    },
    {
      what: 'A nil check that could never fire. `strings.Fields` never returns nil, not even for an empty string, so the guard was dead code and the next line would have panicked.',
      lesson: 'Check the property you need, not something you assume stands in for it. nil does not mean empty, it means never allocated.',
    },
    {
      what: 'A semaphore where failed requests kept their slot. Two failures froze the crawler forever. It did not crash, which made it harder to find.',
      lesson: 'A resource is returned on every exit path, errors included. Holding it on failure is not a penalty, it is a leak.',
    },
  ] as Broke[],
}

export type Job = { company: string; role: string; freelance?: boolean; dates: string; bullets: string[] }

export const experience: Job[] = [
  {
    company: 'Guester',
    role: 'Backend Developer',
    dates: '2026 - now',
    bullets: [
      'Own the multi-provider data ingestion pipeline: six third-party sources aggregated through BullMQ job queues with Redis-backed scheduling, retry policy and failure handling.',
      'Designed and maintain around 30 NestJS domain modules (scraper, CRM, auth, dashboard, audit, hotel operations, email automation, analytics) with role-based access guards and request-level audit logging.',
      'Built scheduled task orchestration for recurring data collection, notification dispatch and report generation.',
      'Operate the MySQL schema and query layer; Redis for both caching and queue state.',
    ],
  },
  {
    company: 'Nexproof',
    role: 'Full-Stack Developer',
    freelance: true,
    dates: '2026 - now',
    bullets: [
      'Built the Python/FastAPI backend: role-based authentication, cryptographic signing flows, activity logging, email templating and cloud storage.',
      'Developed two Next.js frontends, a client web application and a corporate real estate portal, covering contract creation, signature workflows, portfolio management and subscriptions.',
      'Containerized services with Docker and deployed the backend to production.',
    ],
  },
  {
    company: 'Sharpcake',
    role: 'Full-Stack Web & Mobile Developer',
    dates: '2024 - 2026',
    bullets: [
      'Built and debugged React Native applications across iOS and Android for Arçelik, Pegasus Airlines, Sabancı Holding and Galatasaray StarFan.',
      'Diagnosed and resolved production issues on high-traffic properties, working across native and JavaScript layers.',
      'Translated stakeholder requirements into scalable web applications.',
    ],
  },
  {
    company: 'Akinon',
    role: 'React Native Developer',
    dates: '2023 - 2024',
    bullets: [
      'Delivered mobile applications for 25+ e-commerce brands (DS Damat, Damat Tween, Superstep) from a shared multi-tenant codebase, balancing per-brand customization against a common core.',
      'Maintained release quality across a large client surface through testing and systematic debugging.',
    ],
  },
  {
    company: 'Etrapay',
    role: 'Full-Stack Blockchain Developer',
    dates: '2022 - 2023',
    bullets: [
      'Built full-stack Web3 transaction flows on Ethereum (ethers.js, wagmi): contract read/write, wallet connection, and handling of pending, failed and replayed transactions against an asynchronous, unreliable network.',
      'Contributed to an Avalanche token sale through Ethereum-based integrations.',
    ],
  },
  {
    company: 'Maple Retail',
    role: 'Frontend Developer',
    dates: '2021 - 2022',
    bullets: ['Led frontend development for a workplace-efficiency application; TypeScript/React with Jest unit testing.'],
  },
  {
    company: 'Heroes of NFT',
    role: 'Unity Developer',
    dates: '2021',
    bullets: ['Game development in Unity and C#.'],
  },
]

// Upcoming projects (CONTENT.md "Sıradakiler"): add to /projects/ as each one ships.
//   Process Monitor        fork/exec/waitpid, zombie prevention, fork-bomb limits
//   Go TCP + HTTP server   slow-loris hardening, graceful shutdown
//   Worker pool            goroutine leak detection, pprof profiling
//   Replicated KV store    replication, conflict resolution, failure injection
