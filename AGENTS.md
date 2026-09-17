# Saatchi & Co. (Lüks Saatler) — Ajan Kuralları ve Mimarisi

## 1. Fiyatlama ve Kaynak Akışı (DEĞİŞMEZ KURAL)
Saatchi fiyatlama sistemi marka/kaynak bazında ayrıdır ve hiçbir ajan bu üç kuralı birbirine karıştıramaz:
1. **Rolex + Cartier:** Her ürünün doğrulanmış gerçek `sourceUrl` alanı zorunludur. Kaynak URL'den yabancı para fiyatı canlı okunmadan fiyat güncellenemez veya katalog publish edilemez. Kaynak para birimi USD ise Döviz.com USD/TRY **satış** kuru, EUR ise Döviz.com EUR/TRY **satış** kuru kullanılır. TL karşılığı bulunduktan sonra **+%150 artış uygulanır**, yani formül `Yabancı Para Kaynak Fiyatı × Döviz.com Satış Kuru × 2.50` şeklindedir. 1.700.000 TL katalog tavanı TÜM markalar için kesindir (Rolex ve Cartier DAHİL); hesaplanan fiyat siteye aynen yansıtılır. `foreignPrice` veya eski kayıt fiyatı canlı kaynak URL'nin yerine fallback olarak kullanılamaz.
2. **Konyalı Saat + Saat&Saat kaynaklı ürünler:** Kaynak sitedeki doğrulanmış TL fiyatı × `1.50`. Bu akış TAG Heuer, Rado, Tissot, Calvin Klein, Michael Kors ve Versace için geçerlidir. Tüm sitede 1.700.000 TL tavan kuralı korunur. Konyalı ürünlerinde ürünün gerçek marka kimliği `modelName/sourceUrl` üzerinden doğrulanmadan marka etiketi atanamaz; Tissot ürünü TAG Heuer/Rado olarak yazılamaz.
3. **Carren:** Kaynak fiyat kullanılmaz; tüm Carren ürünleri sabit **19.990 TL** olarak yayınlanır. Erkek/Kadın ayrımı ve stok bilgisi kaynak siteden alınır.

Fiyat üretiminde rastgele, mock veya türetilmiş uydurma değer kullanılamaz. Her üründe uygulanan fiyat kuralı, kaynak fiyat/para birimi, kur kaynağı ve kaynak URL kayıt altında tutulmalıdır. Canlı kaynak doğrulanamıyorsa işlem fail-closed durmalıdır; sessiz fallback yasaktır.

## 2. Premium Menü ve Hero İnvariantları (DEĞİŞMEZ KURAL)
1. Menü opak premium drawer/mega-menu yüzeyi olarak çalışır; ana menü paneli arka plan videosunu okunamaz hale getirecek şeffaflıkta olamaz.
2. Menü veri modeli iki ana gruptur:
   - **Elit Saatler:** Rolex, Cartier, TAG Heuer, Rado.
   - **Diğer Saat Kategorisi:** Tissot (Konyalı), Carren (Erkek/Kadın), Calvin Klein, Michael Kors, Versace (Saat&Saat).
3. Seçilen markanın katalogdaki tüm ürünleri erişilebilir olmalıdır. Ürün satırları kompakt olmalı; uzun katalog `overflow-y-auto/overscroll` ile kaybolmadan gezilebilmelidir. Sabit ilk-N listeleme ana menü için yeterli değildir.
4. Mobil ve desktop menüde body scroll lock, Escape kapatma, görünür close kontrolü ve route değişiminde kapanma korunmalıdır.
5. Hero autoplay mimarisi tek aktif video + mobil kaynak + fallback + autoplay retry yapısını korur. Hero başlıkları premium ölçekten küçültülemez; build öncesi `check:hero` ve `check:premium-ui` kapıları zorunludur.

## 3. VIP Link Akışı — Güvenlik ve UX
1. Kullanıcıya açık admin ekranında kalıcı yönetim sırrı/anahtarının yazılması hedef mimari değildir. Ancak bu alan yalnız güvenli, sunucu tarafından doğrulanan admin oturumu devreye alındıktan sonra kaldırılabilir; güvenlik doğrulamasını kaldırarak veya secret'ı client bundle'a gömerek çözüm üretmek yasaktır.
2. VIP link oluşturma akışında ana CTA **“WhatsApp ile Linki İlet”** olarak sunulmalıdır.
3. VIP Link yönetim ekranı açık renk, Saatchi kimliğine uygun premium yönetim arayüzü olmalı; Belgin akışındaki bilgi hiyerarşisi referans alınabilir ancak kör kopya yapılamaz.
4. **Link İptal** gerçek, durable ve sunucu tarafında doğrulanan revocation mekanizması olmadan UI'da çalışıyor gibi gösterilemez. Stateless HMAC token yalnız imza doğrular; revocation için kalıcı durum/denylist gerekir.
5. Legacy `/odeme-linki.html` kısayolu güncel `/admin/viplink` akışına yönlendirilmelidir.

## 4. UI / Tasarım İşleri — Zorunlu (Luxury UX/UI)
Kullanıcıya görünen tüm HTML, CSS, Next.js bileşenleri (Navbar, Footer, Ürün Kartları) için:
1. **Renk Paleti:** Saatchi'nin marka kimliği olan Beyaz (`#ffffff`), Siyah (`#000000`), Koyu Gri (`#333333`) ve Lüks Altın (`#846b32`) tonları korunacaktır.
2. **Tipografi:** Sinematik ve elit görünüm (`"Helvetica Neue", Helvetica, Arial, sans-serif` veya `Geist`). Büyük, okunabilir, minimalist ve nefes alan boşluklar.
3. **Responsive:** 320px–1440px aralığında yatay kaydırma çubuğu oluşması yasaktır (`overflow-x: hidden` yama olarak kullanılamaz, DOM düzeltilir).
4. **Animasyonlar:** Ürün kartlarında yavaş (700ms) scale ve fade-in efektleri kullanılabilir; hızlı ve ucuz hissettiren animasyonlar kullanılmaz.

## 5. GİB e-Arşiv Fatura & Müşteri İzolasyonu (DEĞİŞMEZ KURAL)
Saatchi'de kesilecek lüks saat faturaları için Belgin standartları birebir geçerlidir:
1. GİB e-Arşiv portalına gönderilen taslak ve imza kayıtlarında benzersiz `invoiceUuid` (ETTN) alanı zorunludur.
2. GİB listelerinden (`RG_TASLAKLAR` vb.) fatura bilgisi çekilirken ASLA son eleman fallback'i (`list[list.length - 1]`) kullanılamaz. Hedef faturanın benzersiz `ettn` değeri ile eşleşme zorunludur.
3. Fatura kalemlerinde saat markası ve modeli net yazılır.

## 6. Canonical SEO / GEO / LLMS Mandate
- Arama motoru ve LLM uyumluluğu için `llms.txt` ve Schema.org (`@graph`) kuralları korunur.
- Saatlerin referans numaraları, üretim yılları ve kutu/sertifika durumları yapısal veride doğru olduğu ölçüde belirtilmelidir; eksik veri uydurulamaz.

## 7. Kalite ve Release Kapısı
1. `npm run build`, `check:hero`, `check:premium-ui` ve göreve özel doğrulamalar sıfır hata vermelidir. Repo genelindeki tarihsel lint borcu ayrı iş olarak ele alınır; otomatik `--fix` ile ödeme/legacy kodu topluca değiştirilemez.
2. Saf UTF-8 kullanılır.
3. Fiyat, ödeme, VIP link ve admin değişikliklerinde client-side değer güvenilir kaynak sayılmaz; sunucu tarafı doğrulama zorunludur.
4. Commit, build veya tool success tek başına “canlı/tamamlandı” kanıtı değildir. Deploy sonrası runtime readback ve gerekiyorsa gerçek kullanıcı akışı doğrulanmadan başarı iddiası yapılamaz.
5. Firebase deploy hedefi `studio-7658156126-ffb8e` / hosting `saatchi` doğrulanmadan deploy edilmez.
6. Force push, hard reset veya doğrulanmamış local değişiklikleri silen işlemler kullanılmaz.

## 8. Kaynak Adı / Marka Metni Kuralı
- Harici piyasa sağlayıcılarının marka adları kullanıcıya açık UI, ürün metni veya JSON açıklama alanlarında gereksiz biçimde gösterilmez.
- Kullanıcıya açık metinlerde gerektiğinde nötr ifadeler kullanılabilir; iç denetim alanlarında gerçek kaynak ve URL saklanır.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 9. Rolex ve Cartier Görsel Senkronizasyon Kuralı (Ersan Diamonds)
Rolex ve Cartier ürün görselleri (image) yalnızca `https://ersandiamonds.com/koleksiyon?brand=rolex` ve `?brand=cartier` adreslerinden, **SADECE TAM EŞLEŞMELİ** (exact match) ürün adları bulunarak alınacaktır. Uydurma, tahmini veya bulanık (fuzzy) eşleştirme ile görsel atanması kesinlikle yasaktır. Bu işlem `scripts/sync-ersan-images.py` betiği ile otomatize edilmiştir.
