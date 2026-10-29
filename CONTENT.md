# İçerik

Sitenin tek metin kaynağı. Koddaki kopyası `src/content.ts`; ikisi birebir
aynı kalır. Ters tırnak (`` ` ``) içindeki ifadeler sitede kod olarak görünür.

---

## HERO

**Bartu Gençcan**

> Backend engineer moving toward systems and infrastructure.
> Five years shipping production web, mobile and backend. Now going one layer
> down: operating systems, networking, concurrency.

Linkler: `github.com/bartugenccan` · `linkedin.com/in/bartugenccan` · `x.com/bartugenccandev` · `bartu@bartugenccan.dev`

---

## WRITING

İlk yazı yayınlanana kadar bu bölüm gizli kalsın. Boş bir "Writing" başlığı,
olmamasından kötü.

Format: tarih, başlık, tek satır özet.

```
<tarih>   <başlık>
          <ne ölçtün veya ne buldun, tek cümle>
```

Kural: her satırda **bir sayı ya da bir davranış** olacak. "Go öğreniyorum"
tipi başlık yok.

Sıradakiler (`systems-path/ARTIFACTS.md`):
1. Duplicate jobs in a scraping pipeline: at-least-once and idempotency
2. What my service actually does, according to `strace`
3. Why one slow provider slows down the whole queue

Yazılar `blog.bartugenccan.dev`'de (Hashnode). Site sadece listeler ve link verir.

---

## PROJECTS

> Teknoloji listesi yazma. Her madde iki parça: **ne oldu** (somut, bir satır)
> ve **ne öğretti** (ilke, bir satır).

### go-crawler

> A web crawler in Go, written to learn systems, not to scrape anything.
> 50 pages, 1000 books, and the rules they left behind.

**What it taught me:**

1. what: A retry loop with three attempts but only two delays. Index out of range on the final attempt.
   lesson: When two numbers have to stay in step, derive one from the other instead of writing both down.

2. what: A nil check that could never fire. `strings.Fields` never returns nil, not even for an empty string, so the guard was dead code and the next line would have panicked.
   lesson: Check the property you need, not something you assume stands in for it. nil does not mean empty, it means never allocated.

3. what: A semaphore where failed requests kept their slot. Two failures froze the crawler forever. It did not crash, which made it harder to find.
   lesson: A resource is returned on every exit path, errors included. Holding it on failure is not a penalty, it is a leak.

→ `github.com/bartugenccan/go-crawler`

### Sıradakiler: tamamlandıkça eklenecek

```
Process Monitor        fork/exec/waitpid, zombie prevention, fork-bomb limits
Go TCP + HTTP server   slow-loris hardening, graceful shutdown
Worker pool            goroutine leak detection, pprof profiling
Replicated KV store    replication, conflict resolution, failure injection
```

---

## EXPERIENCE

Her rol: bir satır başlık + madde listesi. Eski roller tek madde.

**Guester** · Backend Developer · 2026 - now
- Own the multi-provider data ingestion pipeline: six third-party sources aggregated through BullMQ job queues with Redis-backed scheduling, retry policy and failure handling.
- Designed and maintain around 30 NestJS domain modules (scraper, CRM, auth, dashboard, audit, hotel operations, email automation, analytics) with role-based access guards and request-level audit logging.
- Built scheduled task orchestration for recurring data collection, notification dispatch and report generation.
- Operate the MySQL schema and query layer; Redis for both caching and queue state.

**Nexproof** · Full-Stack Developer *(freelance)* · 2026 - now
- Built the Python/FastAPI backend: role-based authentication, cryptographic signing flows, activity logging, email templating and cloud storage.
- Developed two Next.js frontends, a client web application and a corporate real estate portal, covering contract creation, signature workflows, portfolio management and subscriptions.
- Containerized services with Docker and deployed the backend to production.

**Sharpcake** · Full-Stack Web & Mobile Developer · 2024 - 2026
- Built and debugged React Native applications across iOS and Android for Arçelik, Pegasus Airlines, Sabancı Holding and Galatasaray StarFan.
- Diagnosed and resolved production issues on high-traffic properties, working across native and JavaScript layers.
- Translated stakeholder requirements into scalable web applications.

**Akinon** · React Native Developer · 2023 - 2024
- Delivered mobile applications for 25+ e-commerce brands (DS Damat, Damat Tween, Superstep) from a shared multi-tenant codebase, balancing per-brand customization against a common core.
- Maintained release quality across a large client surface through testing and systematic debugging.

**Etrapay** · Full-Stack Blockchain Developer · 2022 - 2023
- Built full-stack Web3 transaction flows on Ethereum (ethers.js, wagmi): contract read/write, wallet connection, and handling of pending, failed and replayed transactions against an asynchronous, unreliable network.
- Contributed to an Avalanche token sale through Ethereum-based integrations.

**Maple Retail** · Frontend Developer · 2021 - 2022
- Led frontend development for a workplace-efficiency application; TypeScript/React with Jest unit testing.

**Heroes of NFT** · Unity Developer · 2021
- Game development in Unity and C#.

---

## FOOTER

```
github.com/bartugenccan · linkedin.com/in/bartugenccan · x.com/bartugenccandev
bartu@bartugenccan.dev
```

Telif satırı, "built with ❤️" ve teknoloji rozetleri yok.
