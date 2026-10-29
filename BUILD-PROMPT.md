# Build prompt

Site kurulu. Bu prompt, siteyi baştan kurdurmak veya büyük bir değişiklik
yaptırmak için bir AI'a verilir. `README.md` ve `CONTENT.md` yanında.

---

```
Bu repo kişisel bir site: bartugenccan.dev. Önce README.md (kısıtlar ve
yapı) ve CONTENT.md (bütün metin) dosyalarını oku. İçeriği başka yerden
arama, uydurma, genişletme: CONTENT.md ne diyorsa o. Metin kodda
src/content.ts'te; ikisi birebir aynı kalmalı.

Stack: Vite + React + TypeScript, Tailwind v4, three.js (hero), Remotion
(video/ klasöründe, sadece offline render). Her sayfa build'de prerender
edilir; içerik JS kapalıyken de okunur.

Kısıtlar README.md'de. Özellikle:
- Sadece koyu tema, tek vurgu rengi, kırmızı sadece "bozuldu" anlamında.
- Her animasyonun tek cümlelik bir amacı olsun; prefers-reduced-motion'a uy.
- Scroll listener yok, sadece transform/opacity animasyonu.
- Bütçe: ilk JS ≤ 90 KB gz, three.js lazy ≤ 150 KB gz.
- Em-dash yok, emoji yok.

Hedef kitle systems/infrastructure mühendisleri ve bu alanda işe alım
yapan kişiler. Görsel referans bir alet, film değil: htop, Wireshark,
osiloskop, devre şeması, man page. Tasarım kararlarını "bir SRE bunu
açtığında güzel tasarlanmış bir araç gibi mi duruyor" sorusuna göre ver.

PROJECTS'teki "What it taught me" maddeleri (ne oldu + ne öğretti) sitenin
en değerli içeriği. Onları gömme, okunaklı ve ferah bırak.

Bitirince: npm run build çalıştır, gzip boyutlarını ve Lighthouse
skorlarını söyle. Tarayıcıda kontrol etmemi istediğin bir şey varsa yaz.
```

---

## Sonra

1. Cloudflare Workers'a bağlı (GitHub repo → otomatik deploy). Deploy komutu `npx wrangler deploy`; build'i `wrangler.jsonc` çalıştırır
2. Custom domain: `bartugenccan.dev`
3. Hashnode için Porkbun DNS'ine CNAME: `blog` → Hashnode'un verdiği adres
4. İlk yazı yayınlanınca **Writing** bölümünü aç
