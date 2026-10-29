# bartugenccan.dev

Kişisel site. Vite + React + TypeScript, build sırasında statik HTML'e prerender edilir.

```
bartugenccan.dev        → bu site          (Cloudflare Workers, static assets)
blog.bartugenccan.dev   → yazılar          (Hashnode)
```

## Dosyalar

| Dosya | Ne |
|---|---|
| `CONTENT.md` | Bütün metnin kaynağı. Site metni buradan gelir, başka yerden içerik arama |
| `src/content.ts` | `CONTENT.md`'nin koddaki birebir kopyası. İkisi birlikte güncellenir |
| `src/pages/` | `Home` (`/`) ve `Projects` (`/projects/`) |
| `src/components/` | Bölümler. `ProcessGraph` three.js hero, `LoopVideo` Remotion videosu |
| `scripts/prerender.mjs` | Build sonrası iki sayfanın HTML'ini sunucu tarafında üretir |
| `video/` | Remotion projesi. `SemaphoreLoop` videosunu `public/media/`'ya render eder |
| `BUILD-PROMPT.md` | Siteyi baştan kurduracak hazır prompt |

## Komutlar

```
npm install
npm run dev        # geliştirme sunucusu (prerender yok)
npm run build      # dist/: Cloudflare bunu yayınlar
npm run preview    # dist/'i yerelde sun

cd video && npm install
npm run studio     # Remotion Studio'da videoyu düzenle
npm run render     # public/media/semaphore-loop.{mp4,webm} + poster.jpg
```

Render edilmiş video dosyaları repoya commit'lenir; Cloudflare build'i Remotion çalıştırmaz.

---

## Hedef kitle: her karar bunun için

Systems / infrastructure mühendisleri ve bu alanda işe alım yapan kişiler.
Görsel dil koyu, teknolojik, systems temalı. Ama hareket her zaman bir şey
anlatır: hero'daki grafik süreçleri ve bozulan bir bağlantıyı, video
go-crawler'daki semaphore hatasını gösterir. "Havalı görünsün" diye animasyon yok.

---

## Teknik kısıtlar

- **İki sayfa:** `/` (Hero, Now, Projects özeti, Experience, Contact) ve `/projects/`.
- **İçerik JS'siz okunabilir.** Her sayfa build'de prerender edilir; JS sadece
  canvas'ı, video oynatmayı ve scroll reveal'ı ekler.
- **Bütçe (gzip):** ilk JS ≤ 90 KB, three.js chunk'ı lazy ve ≤ 150 KB, video ≤ 1.5 MB.
  Lighthouse Performance ≥ 90, Accessibility 100.
- **Sadece koyu tema.** Tek vurgu rengi `#b8f34a`; kırmızı `#ff5a4e` sadece hata/bozulma anlamında.
- **Font:** Geist + Geist Mono, self-host (`@fontsource-variable`).
- **`prefers-reduced-motion`:** canvas tek kare çizer, video poster gösterir, reveal sadece fade.
- **Mobilde** 16px yan boşluk, yatay kaydırma yok.
- Semantik HTML: sayfa başına tek `<h1>`, erişilebilir kontrast.

## Yapma listesi

- Amaçsız animasyon: parallax, scroll-hijack, yüklenme ekranı, skeleton
- `window.addEventListener('scroll')`: IntersectionObserver kullan
- "Hi 👋 I'm ..." başlığı, emoji
- Skill bar / yüzdeli yetenek göstergesi, "tech stack" logo ızgarası
- Gradient metin, neon glow, mor "AI" gradyanları
- Em-dash (`—`). Virgül, iki nokta veya nokta kullan

---

## Yayın

Cloudflare Workers (Workers Builds) → GitHub repo'ya bağlı → her push'ta otomatik deploy.
Deploy komutu `npx wrangler deploy`. `wrangler.jsonc` build'i (`npm run build`)
kendisi çalıştırır ve `dist/`'i statik asset olarak yayınlar; dashboard'da ayrı
build komutu gerekmez. Bu dosyayı silme: yoksa wrangler projeyi kendi kendine
yapılandırır, Vite'a Cloudflare plugin'i ekler ve prerender adımı kırılır.
Yerelde Cloudflare runtime'ı ile denemek için: `npx wrangler dev`.
Custom domain: `bartugenccan.dev`. SSL otomatik.

Hashnode ayrı: `blog.bartugenccan.dev` için CNAME kaydı Porkbun DNS'ine eklenecek.

## Bakım

**Now** bölümü haftada bir güncellenir: önce `CONTENT.md`, sonra `src/content.ts`
(`now.week` meter'ı da sürer). Eskimiş bir "Now", hiç olmamasından kötüdür.
`systems-path/now.sh` hafta ve fazı hesaplıyor.

İlk yazı yayınlanınca `src/pages/Home.tsx`'teki Writing yorumunu bölüme çevir ve nav'a ekle.
