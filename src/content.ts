// Single source of copy for the site. Mirrors CONTENT.md word for word,
// except em-dashes, which are replaced with a colon, comma or period.

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

export const now = {
  week: 5,
  totalWeeks: 49,
  phase: 'Phase 1: Operating Systems + Linux',
  rightNow: 'process management, and a Go crawler that is teaching me what a deadlock actually feels like.',
  next: "concurrency with a shared rate limit, and finding out it doesn't make anything faster.",
}

export type Broke = { text: string; code?: string; after?: string }

export const goCrawler = {
  name: 'go-crawler',
  repo: 'https://github.com/bartugenccan/go-crawler',
  repoText: 'github.com/bartugenccan/go-crawler',
  decisions: 'https://github.com/bartugenccan/go-crawler/blob/HEAD/docs/DECISIONS.md',
  description: 'A web crawler in Go, written to learn systems, not to scrape anything.',
  stats: '50 pages, 1000 books, and a list of things that broke.',
  broke: [
    { text: 'A retry loop with three attempts and only two delays: index out of range' },
    { text: 'A nil check that could never fire: ', code: 'strings.Fields', after: ' never returns nil, not even for an empty string' },
    { text: 'A semaphore where failed requests kept their slot. Two failures froze it forever.' },
  ] as Broke[],
}

export type Job = { company: string; role: string; freelance?: boolean; dates: string; description?: string }

export const experience: Job[] = [
  {
    company: 'Guester',
    role: 'Backend Developer',
    dates: '2026 - now',
    description:
      'Own the multi-provider data ingestion pipeline: six third-party sources through BullMQ job queues with Redis-backed scheduling, retry and failure handling. Around 30 NestJS domain modules with role-based access guards and audit logging.',
  },
  {
    company: 'Nexproof',
    role: 'Full-Stack Developer',
    freelance: true,
    dates: '2026 - now',
    description: 'Python/FastAPI backend: role-based auth, cryptographic signing flows, cloud storage. Two Next.js frontends.',
  },
  {
    company: 'Sharpcake',
    role: 'Full-Stack Web & Mobile Developer',
    dates: '2024 - 2026',
    description:
      'React Native across iOS and Android for Arçelik, Pegasus Airlines and Sabancı Holding. Production debugging on high-traffic properties.',
  },
  {
    company: 'Akinon',
    role: 'React Native Developer',
    dates: '2023 - 2024',
    description:
      'Mobile apps for 25+ e-commerce brands from a shared multi-tenant codebase, balancing per-brand customization against a common core.',
  },
  {
    company: 'Etrapay',
    role: 'Full-Stack Blockchain Developer',
    dates: '2022 - 2023',
    description: 'Ethereum transaction flows: pending, failed and replayed transactions against an asynchronous, unreliable network.',
  },
  { company: 'Maple Retail', role: 'Frontend Developer', dates: '2021 - 2022' },
  { company: 'Heroes of NFT', role: 'Unity Developer', dates: '2021' },
]

// Upcoming projects (CONTENT.md "Sıradakiler"): add to /projects/ as each one ships.
//   Process Monitor        fork/exec/waitpid, zombie prevention, fork-bomb limits
//   Go TCP + HTTP server   slow-loris hardening, graceful shutdown
//   Worker pool            goroutine leak detection, pprof profiling
//   Replicated KV store    replication, conflict resolution, failure injection
