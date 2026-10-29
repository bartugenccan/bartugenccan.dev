# İçerik

Sitenin tek metin kaynağı. `<...>` olanlar doldurulacak.

---

## HERO

**Bartu Gençcan**

> Backend engineer moving toward systems and infrastructure.
> Five years shipping production web, mobile and backend. Now going one layer
> down: operating systems, networking, concurrency.

Linkler: `github.com/bartugenccan` · `linkedin.com/in/bartugenccan` · `<X handle>` · `bartu@bartugenccan.dev`

---

## NOW

> Sitenin ayırt edici bölümü. Haftada bir güncellenir.
> Kaynak: `systems-path/now.sh`

**Week 5 of 49 · Phase 1 — Operating Systems + Linux**

> Right now: process management, and a Go crawler that is teaching me what a
> deadlock actually feels like.
>
> Next: concurrency with a shared rate limit — and finding out it doesn't make
> anything faster.

---

## WRITING

İlk yazı yayınlanana kadar bu bölüm gizli kalsın. Boş bir "Writing" başlığı,
olmamasından kötü.

Format — tarih, başlık, tek satır özet:

```
<tarih>   <başlık>
          <ne ölçtün veya ne buldun — tek cümle>
```

Kural: her satırda **bir sayı ya da bir davranış** olacak. "Go öğreniyorum"
tipi başlık yok.

Sıradakiler (`systems-path/ARTIFACTS.md`):
1. Duplicate jobs in a scraping pipeline — at-least-once and idempotency
2. What my service actually does, according to `strace`
3. Why one slow provider slows down the whole queue

Yazılar `blog.bartugenccan.dev`'de (Hashnode). Site sadece listeler ve link verir.

---

## PROJECTS

> Teknoloji listesi yazma. **Ne bozuldu** yaz — ayırt eden şey o.

### go-crawler

> A web crawler in Go, written to learn systems — not to scrape anything.
> 50 pages, 1000 books, and a list of things that broke.

**What broke:**
- A retry loop with three attempts and only two delays — index out of range
- A nil check that could never fire: `strings.Fields` never returns nil, not even for an empty string
- A semaphore where failed requests kept their slot — two failures froze it forever

Design decisions and what each one cost: `docs/DECISIONS.md`
→ `github.com/bartugenccan/go-crawler`

### Sıradakiler — tamamlandıkça eklenecek

```
Process Monitor        fork/exec/waitpid, zombie prevention, fork-bomb limits
Go TCP + HTTP server   slow-loris hardening, graceful shutdown
Worker pool            goroutine leak detection, pprof profiling
Replicated KV store    replication, conflict resolution, failure injection
```

---

## EXPERIENCE

Her biri bir satır başlık + en fazla iki madde. Detay CV'de.

**Guester** · Backend Developer · 2026 – now
> Own the multi-provider data ingestion pipeline: six third-party sources through
> BullMQ job queues with Redis-backed scheduling, retry and failure handling.
> Around 30 NestJS domain modules with role-based access guards and audit logging.

**Nexproof** · Full-Stack Developer *(freelance)* · 2026 – now
> Python/FastAPI backend — role-based auth, cryptographic signing flows, cloud
> storage. Two Next.js frontends.

**Sharpcake** · Full-Stack Web & Mobile Developer · 2024 – 2026
> React Native across iOS and Android for Arçelik, Pegasus Airlines and Sabancı
> Holding. Production debugging on high-traffic properties.

**Akinon** · React Native Developer · 2023 – 2024
> Mobile apps for 25+ e-commerce brands from a shared multi-tenant codebase,
> balancing per-brand customization against a common core.

**Etrapay** · Full-Stack Blockchain Developer · 2022 – 2023
> Ethereum transaction flows: pending, failed and replayed transactions against
> an asynchronous, unreliable network.

**Maple Retail** · Frontend Developer · 2021 – 2022
**Heroes of NFT** · Unity Developer · 2021

---

## FOOTER

```
github.com/bartugenccan · linkedin.com/in/bartugenccan · <X handle>
bartu@bartugenccan.dev
```

Telif satırı, "built with ❤️" ve teknoloji rozetleri yok.
