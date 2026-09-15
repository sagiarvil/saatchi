# Saatchi & Co. (Lüks Saatler) — Ajan Kuralları ve Mimarisi

## 1. Fiyatlama ve Borsa Akışı (DEĞİŞMEZ KURAL — YENİ GÜMRÜK YASASI & CHRONO24 MANDATE)
Saatchi projesindeki tüm saatler "Elit Kategori" lüks saatlerdir.
- **Fiyatlama Formülü:** Bütün saatler için Chrono24 küresel piyasa referans fiyatı ve +%150 gümrük/kâr marjı zorunludur.
- **Hesaplama:** `Chrono24 USD Referans Fiyatı × Güncel USD/TRY Kuru × 2.50` (Yani %150 marj).
- Asla rastgele fiyat üretilmez veya altın piyasası (İZKO/Harem) kuralları bu projede KULLANILMAZ. Saatlerin yegane kaynağı Chrono24'tür.

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
1. **Syntax:** `npm run build` ve `eslint` sıfır hata vermelidir.
2. **BOM & Encoding:** Saf UTF-8.
3. **Güvenlik:** XSS, SQLi ve fiyat manipülasyonlarına (Client-side fiyat değiştirme) karşı Backend'de (Next.js Server Actions/API) kesin fiyat doğrulaması.
4. **Kanıt:** Eklenen her özellik test edilmeli ve loglanmalıdır.

## 6. KESİN YASAK (CHRONO24 KELİMESİ)
- Fiyatlama Chrono24 mantığıyla yapılsa bile, **"Chrono24" kelimesi projenin HİÇBİR YERİNDE (UI, metinler, JSON) geçmeyecektir.**
- Bunun yerine "Global İsviçre Saat Borsası", "Uluslararası Lüks Saat Borsası", "Global Watch Index" gibi terimler kullanılacaktır. Bu kalıcı ve evrensel bir kuraldır.
