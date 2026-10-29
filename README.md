# bartugenccan.dev

Kişisel site. Statik HTML + CSS, build step yok.

```
bartugenccan.dev        → bu site          (Cloudflare Pages)
blog.bartugenccan.dev   → yazılar          (Hashnode)
```

## Dosyalar

| Dosya | Ne |
|---|---|
| `CONTENT.md` | Bütün metin. Site bundan beslenir, başka yerden içerik arama |
| `BUILD-PROMPT.md` | Siteyi kurduracak hazır prompt |
| `index.html` | Üretilecek |
| `style.css` | Üretilecek |

---

## Hedef kitle — her karar bunun için

Systems / infrastructure mühendisleri ve bu alanda işe alım yapan kişiler.
Site bir **ilk izlenim**, portfolyo gösterisi değil.

Referans: **ahmet.dev**. İsim, iş geçmişi, yazı listesi, projeler. Düz, hızlı, metin.
Sektörün tanıdığı bir isim ve sitesi 100 satır. Model bu.

---

## Teknik kısıtlar — pazarlık yok

- **Tek sayfa.** Bölümler arası anchor. Çok sayfaya bölme.
- **Framework yok.** React, Next, Tailwind, Astro — hiçbiri. Düz HTML + CSS.
- **Build step yok.** `index.html`'i aç, çalışsın.
- **JavaScript kapalıyken tam okunabilir olmalı.** JS varsa bile sadece
  tema geçişi için, başka hiçbir şey için değil.
- **1 saniyenin altında açılmalı.** Toplam sayfa ağırlığı < 100 KB.
- **Webfont en fazla 1 tane**, tercihen sıfır — sistem font yığını yeter.
- **Dark/light** `prefers-color-scheme` ile otomatik. Toggle isteğe bağlı.
- **Mobilde okunabilir.** 16px yan boşluk, yatay kaydırma yok.
- Semantik HTML, gerçek `<h1>`/`<h2>`, erişilebilir kontrast.

## Yapma listesi

Bunların hepsi hedef kitleye "bu adam frontend'den geliyor" dedirtir —
yani tam olarak aşılmaya çalışılan algıyı pekiştirir.

- Hero animasyonu, parallax, gradient arka plan
- "Hi 👋 I'm ..." başlığı
- Skill bar / yüzdeli yetenek göstergesi (hiçbir bilgi taşımıyor)
- "Tech stack" logo ızgarası
- Scroll-triggered animasyon, fade-in
- Yüklenme animasyonu / skeleton
- Emoji (bölüm başlıklarında bile)
- Terminal taklidi yazı efekti

---

## Yayın

Cloudflare Pages → GitHub repo'ya bağla → her push'ta otomatik deploy.
Custom domain: `bartugenccan.dev`. SSL otomatik.

Hashnode ayrı: `blog.bartugenccan.dev` için CNAME kaydı Porkbun DNS'ine eklenecek.

## Bakım

`CONTENT.md` → **Now** bölümü haftada bir güncellenir. Eskimiş bir "Now",
hiç olmamasından kötüdür. `systems-path/now.sh` hafta ve fazı hesaplıyor.
