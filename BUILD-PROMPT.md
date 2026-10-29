# Build prompt

Bu klasörde çalışan bir AI'a ver. `README.md` ve `CONTENT.md` zaten yanında.

---

```
Bu repo kişisel bir site: bartugenccan.dev. İki dosyayı oku ve siteyi kur:
README.md (kısıtlar) ve CONTENT.md (bütün metin). İçeriği başka yerden arama,
uydurma, genişletme — CONTENT.md ne diyorsa o.

Üreteceğin dosyalar: index.html ve style.css. Başka dosya yok.

Kısıtlar (README.md'de de var, ihlal etme):
- Tek sayfa, bölümler arası anchor. Framework yok, build step yok.
- JavaScript kapalıyken tam okunabilir. JS sadece tema toggle için, o da opsiyonel.
- Toplam ağırlık 100 KB altı, webfont en fazla 1 (tercihen 0, sistem font yığını).
- Dark/light prefers-color-scheme ile. Her ikisinde de kontrast erişilebilir olsun.
- Mobilde 16px yan boşluk, yatay kaydırma yok.
- Semantik HTML: tek h1, bölümler h2, gerçek <section> ve <nav>.

Yapma: hero animasyonu, parallax, gradient arka plan, "Hi I'm", skill bar,
tech-stack logo ızgarası, scroll animasyonu, yüklenme ekranı, emoji,
terminal taklidi efekt.

Hedef kitle systems/infrastructure mühendisleri ve bu alanda işe alım yapan
kişiler. Referans estetik: ahmet.dev — düz, hızlı, metin. Tasarım kararlarını
"bir SRE bunu açtığında ciddiye alır mı" sorusuna göre ver.

Bölüm sırası: Hero → Now → Projects → Experience → Contact.
WRITING bölümünü ŞİMDİLİK EKLEME — henüz yayınlanmış yazı yok, boş bir bölüm
zarar verir. Yorum satırı olarak yerini bırak.

NOW bölümü görsel olarak öne çıksın — sitenin ayırt edici parçası o. Ama
abartma: hafif bir arka plan farkı veya ince bir kenarlık yeter.

PROJECTS'te "what broke" maddeleri sitenin en değerli içeriği. Onları
gömme, okunaklı ve ferah bırak.

Bitirince: dosya yollarını ve sayfanın toplam ağırlığını söyle. Tarayıcıda
açıp kontrol etmemi istediğin bir şey varsa onu da yaz.
```

---

## Sonra

1. Cloudflare Pages'e bağla (GitHub repo → otomatik deploy)
2. Custom domain: `bartugenccan.dev`
3. Hashnode için Porkbun DNS'ine CNAME: `blog` → Hashnode'un verdiği adres
4. `CONTENT.md` → **Now** bölümünü haftada bir güncelle
5. İlk yazı yayınlanınca **Writing** bölümünü aç
