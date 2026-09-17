# Saatchi & Co. (Lüks Saatler) — Ajan Kuralları ve Mimarisi

## 1. Fiyatlama ve Kaynak Akışı (DEĞİŞMEZ KURAL)
Saatchi fiyatlama sistemi marka/kaynak bazında ayrıdır ve hiçbir ajan bu üç kuralı birbirine karıştıramaz:
1. **Rolex + Cartier:** Kaynak sitedeki yabancı para fiyatı esas alınır. Kaynak para birimi USD ise Döviz.com USD/TRY **satış** kuru, EUR ise Döviz.com EUR/TRY **satış** kuru kullanılır. TL karşılığı bulunduktan sonra **+%150 artış uygulanır**, yani formül `Yabancı Para Kaynak Fiyatı × Döviz.com Satış Kuru × 2.50` şeklindedir. Rolex ve Cartier için 1.799.000 TL katalog tavanı uygulanmaz; hesaplanan fiyat siteye aynen yansıtılır.
2. **Konyalı Saat + Saat&Saat kaynaklı ürünler:** Kaynak sitedeki doğrulanmış TL fiyatı × `1.50`. Bu akış TAG Heuer, Rado, Tissot, Calvin Klein, Michael Kors ve Versace için geçerlidir. Bu grupta 1.799.000 TL katalog tavanı korunur.
3. **Carren:** Kaynak fiyat kullanılmaz; tüm Carren ürünleri sabit **19.990 TL** olarak yayınlanır. Erkek/Kadın ayrımı ve stok bilgisi kaynak siteden alınır.

Fiyat üretiminde rastgele değer kullanılamaz. Her üründe uygulanan fiyat kuralı, kaynak fiyat/para birimi, kur kaynağı ve mümkünse kaynak URL kayıt altında tutulmalıdır. Rolex/Cartier kaydında doğrudan `sourceUrl` varsa fiyat bu URL'den canlı doğrulanır; URL yoksa mevcut `foreignPrice` yalnız geçici kaynak referansı olarak kullanılır ve `sourcePriceStatus` ile açıkça işaretlenir.

## 2. UI / Tasarım İşleri — Zorunlu (Luxury UX/UI)
Kullanıcıya görünen tüm HTML, CSS, Next.js bileşenleri (Navbar, Footer, Ürün Kartları) için:
1. **Renk Paleti:** Saatchi'nin marka kimliği olan Beyaz (`#ffffff`), Siyah (`#000000`), Koyu Gri (`#333333`) ve Lüks Altın (`#846b32`) tonları kesin olarak korunacaktır. Renk paleti dışına çıkılmaz.
2. **Tipografi:** Rolex ve Patek Philippe tarzı sinematik ve elit bir görünüm (`"Helvetica Neue", Helvetica, Arial, sans-serif` veya `Geist`). Büyük, okunabilir, minimalist ve nefes alan boşluklar (whitespace).
3. **Responsive:** 320px–1440px aralığında yatay kaydırma çubuğu oluşması kesinlikle yasaktır (`overflow-x: hidden` yama olarak kullanılamaz, DOM düzeltilir).
4. **Animasyonlar:** Ürün kartlarında yavaş (700ms) scale ve fade-in efektleri (group-hover) kullanılır. Hızlı ve ucuz hissettiren animasyonlar yasaktır.

## 3. GİB e-Arşiv Fatura & Müşteri İzolasyonu (DEĞİŞMEZ KURAL)
Saatchi'de kesilecek lüks saat faturaları için Belgin standartları birebir geçerlidir:
1. GİB e-Arşiv portalına gönderilen taslak ve imza kayıtlarında benzersiz `invoiceUuid` (ETTN) alanı zorunludur.
2. GİB listelerinden (`RG_TASLAKLAR` vb.) fatura bilgisi çekilirken ASLA son eleman fallback'i (`list[list.length - 1]`) KULLANILAMAZ. Hedef faturanın benzersiz `ettn` değeri ile eşleşme zorunludur.
3. Fatura kalemlerinde saat markası ve modeli (Örn: "Rolex Submariner Date 41mm") net olarak yazılır.

## 4. Canonical SEO / GEO / LLMS Mandate
- Arama motoru ve LLM (Perplexity, ChatGPT Search, Gemini) uyumluluğu için `llms.txt` ve Schema.org (`@graph`) zırhı zorunludur.
- Saatlerin referans numaraları, üretim yılları ve kutu/sertifika durumları yapısal veride (Structured Data) kesin olarak belirtilmelidir.

## 5. Sıfır Hata ve 4/4 Kalite Kapısı
Hiçbir kod bloğu şu 4 kapı doğrulanmadan onaylanamaz:
1. **Syntax:** `npm run build` ve proje için tanımlı hedefli doğrulamalar sıfır hata vermelidir. Repo genelindeki tarihsel lint borcu ayrı iş olarak ele alınır; otomatik `--fix` ile ödeme/legacy kodu topluca değiştirilemez.
2. **BOM & Encoding:** Saf UTF-8.
3. **Güvenlik:** XSS, SQLi ve fiyat manipülasyonlarına (Client-side fiyat değiştirme) karşı Backend'de (Next.js Server Actions/API) kesin fiyat doğrulaması.
4. **Kanıt:** Eklenen her özellik test edilmeli ve loglanmalıdır.

## 6. KAYNAK ADI / MARKA METNİ KURALI
- Harici piyasa sağlayıcılarının marka adları kullanıcıya açık UI, ürün metni veya JSON açıklama alanlarında gereksiz biçimde gösterilmeyecektir.
- Kullanıcıya açık metinlerde gerektiğinde "Global İsviçre Saat Borsası", "Uluslararası Lüks Saat Borsası" veya "Global Watch Index" gibi nötr ifadeler kullanılacaktır.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
