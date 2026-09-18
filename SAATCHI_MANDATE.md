# SAATCHI PREMIUM COMMERCE EXPERIENCE MANDATE
Version: 1.0
Status: MANDATORY / NON-NEGOTIABLE
Scope: saatchi.watch
Reference UX Architecture: Belgin Kuyumculuk
Visual Identity: SAATCHI

---

# 0. ANA KURAL

SAATCHI, Belgin Kuyumculuk'ta çalışan ve doğrulanmış yüksek güvenli lüks ticaret mimarisinin
SAAT sektörüne uyarlanmış premium versiyonudur.

Belgin'den alınacak olan:

- bilgi mimarisi,
- ürün keşif mantığı,
- ürün detay bilgi yoğunluğu,
- filtreleme davranışı,
- gallery ve product-proof yaklaşımı,
- fiyat / stok / güven yerleşimi,
- CTA hiyerarşisi,
- ödeme ve teslim güven blokları,
- related products mantığı,
- responsive davranış,
- erişilebilirlik,
- hukuki/ödeme güvenliği,
- gerçek veri disiplini.

Belgin'in renk paleti, logosu veya görsel kimliği KOPYALANMAZ.

SAATCHI kimliği korunur:

- Siyah
- Beyaz
- Koyu Gri
- Luxury Gold #846b32
- sinematik saat görselleri
- minimalist İsviçre saat evi hissi
- premium editorial tipografi

ANA PRENSİP:

BELGIN COMMERCE INTELLIGENCE
+
SAATCHI LUXURY WATCH IDENTITY

---

# 1. PREMIUM MENU — KORUNACAK MEVCUT YAPI

Mevcut SAATCHI premium menü geri alınamaz bir tasarım kontratıdır.

Menü:

- şeffaflaşamaz,
- klasik hamburger listesine indirgenemez,
- yalnız birkaç markayı gösteremez,
- ürünleri ilk-N ile kesemez,
- mobilde içerik kaybedemez.

## 1.1 Ana kategori yapısı

### ELİT SAATLER

- Rolex
- Cartier
- TAG Heuer
- Rado

### DİĞER SAAT KATEGORİSİ

#### Konyalı
- Tissot

#### Carren
- Erkek
- Kadın

#### Saat&Saat
- Calvin Klein
- Michael Kors
- Versace

---

# 2. PREMIUM MENU DAVRANIŞI

Desktop:

- geniş premium mega/drawer menu,
- opak koyu premium surface,
- kategori kolonu,
- marka kolonu,
- seçilen markanın ürün listesi,
- gerektiğinde Concierge / showroom alanı,
- tüm ürünlere scroll ile erişim.

Mobile:

- full-screen premium drawer,
- accordion kategori yapısı,
- scrollable ürün alanı,
- sabit close kontrolü,
- Escape / route-change close,
- body scroll lock.

Ürün satırları kompakt tutulur.

Zorunlu:

productName
reference
price

Satır aralıkları katalog büyüklüğünü kaldıracak kadar sıkı olmalıdır.

Tüm ürünler erişilebilir olmalıdır.

"İlk 5 ürün", "ilk 10 ürün" benzeri gizli kesme uygulanamaz.

---

# 3. PRODUCT DISCOVERY MİMARİSİ

Belgin prensibi uygulanır:

DISCOVERY
→ PRODUCT
→ EVIDENCE
→ PRICE
→ AVAILABILITY
→ TRUST
→ ACTION

Ana sayfa bütün kataloğun dump edildiği alan değildir.

Ana sayfa:

1. Hero
2. seçilmiş koleksiyon
3. marka keşfi
4. premium ürün proof
5. güven / hizmet
6. showroom / iletişim

Kategori sayfası:

1. kısa kategori başlığı
2. filtre / sıralama
3. ürün grid
4. ürün sayısı
5. güven içeriği
6. ilgili kategori yolu

Ürün grid her zaman ana içeriktir.

---

# 4. PRODUCT CARD STANDARDI

Belgin ürün-card prensibi SAATCHI'ye aynen taşınır:

Kart yalnız karar için gerekli bilgiyi gösterir.

Zorunlu:

- tam saat görseli,
- marka,
- model,
- referans,
- fiyat,
- gerekiyorsa durum/availability,
- tek baskın ürün detay aksiyonu.

YASAK:

- saati kesen object-cover,
- dial/case/clasp kırpılması,
- küçük dekoratif çerçeve içine sıkıştırma,
- sahte indirim,
- sahte stok uyarısı,
- sahte sertifika,
- sahte "son ürün",
- doğrulanmamış teknik özellik.

## Görsel standardı

- aspect ratio: 4:5 tercih edilir
- object-fit: contain
- ürünün tamamı görünür
- nötr / açık pedestal zemin
- zoom sırasında çözünürlük korunur
- ürün gerçek rengini değiştiren filtre kullanılmaz

---

# 5. ÜRÜN DETAY SAYFASI — BELGIN PARITY CONTRACT

SAATCHI ürün detay sayfası Belgin'in doğrulanmış product-detail bilgi mimarisini
saat sektörüne taşımalıdır.

Zorunlu sıra:

BREADCRUMB
→ GALLERY
→ PRODUCT IDENTITY
→ PRICE
→ ESSENTIAL SPECS
→ AVAILABILITY
→ PRIMARY CTA
→ DELIVERY / WARRANTY / PAYMENT TRUST
→ DEEP SPECS
→ DESCRIPTION
→ RELATED PRODUCTS
→ SHOWROOM / SERVICE

Kullanıcı fiyatı görmek için marka hikâyesini geçmek zorunda bırakılamaz.

Belgin'in doğrulanmış sözleşmesinde de PDP sırası gallery + buying panel → specs →
delivery/payment/warranty → story → related products şeklindedir. Bu yapı korunacaktır.

---

# 6. PRODUCT GALLERY

Her ürün detayında:

- ana büyük görsel,
- thumbnail gallery,
- click/tap zoom,
- desktop hover/controlled zoom,
- mobile pinch/tap uyumlu davranış,
- keyboard erişimi,
- birden çok görsel varsa ileri/geri,
- görsel yüklenmezse kontrollü fallback.

Ürün görseli sayfadaki dekorasyondan daha değerlidir.

Saatin:

- dial,
- bezel,
- case,
- crown,
- bracelet/strap,
- clasp,
- caseback

gibi mevcut gerçek detayları varsa gallery'de kullanılabilir.

Olmayan görsel üretilmiş gibi gösterilemez.

---

# 7. ÜRÜN KİMLİĞİ

Buying panel içinde minimum:

MARKA

MODEL

REFERANS

FİYAT

stok / availability

ürün durumu

birincil CTA

yer almalıdır.

Örnek bilgi sırası:

ROLEX

Submariner Date

Ref. 126610LN

₺X.XXX.XXX

Stok / Temin Durumu

[Satın Alma / VIP İletişim]

---

# 8. SAAT TEKNİK ÖZELLİK MOTORU

Belgin'deki material/specification block'un saat karşılığıdır.

Veri mevcutsa göster:

## Kimlik
- Marka
- Model
- Referans
- Koleksiyon
- Üretim yılı

## Mekanizma
- Otomatik
- Manuel
- Quartz
- Kalibre
- Power reserve
- complication

## Kasa
- Kasa materyali
- Kasa çapı
- Kalınlık
- Bezel
- Caseback

## Cam
- Safir
- Mineral
- diğer doğrulanmış cam türü

## Kadran
- Kadran rengi
- indeks
- complication bilgileri

## Bilezik / Kayış
- materyal
- renk
- clasp tipi

## Dayanıklılık
- su geçirmezlik

## Ticari Durum
- Yeni / İkinci El
- kondisyon
- kutu
- sertifika
- garanti
- stok

KRİTİK KURAL:

Veri yoksa alan gösterilmez.

Model isminden teknik özellik tahmin EDİLEMEZ.

AI veya başka ürünün verisi kullanılarak boşluk doldurulamaz.

Belgin'in commerce claim kuralı SAATCHI için de geçerlidir:
doğrulanmamış movement/material/glass/certificate bilgisi üretilemez.

---

# 9. PRICE PANEL

Fiyat, trust-sensitive data kabul edilir.

Gösterim:

- TRY açık biçimde,
- tabular/numeric okunabilirlik,
- dominant fakat bağırmayan görünüm,
- CTA'ya yakın.

Müşteriye:

kaynak scraper bilgisi,
iç marj hesabı,
tedarikçinin internal URL'si

gösterilmez.

Bunlar internal provenance verisidir.

---

# 10. SAATCHI FİYAT MOTORU — DEĞİŞMEZ

## Rolex + Cartier

Gerçek kaynak yabancı para fiyatı
×
Döviz.com ilgili döviz/TL SATIŞ kuru
×
2.50

Yani:

SOURCE FOREIGN PRICE
× FX SELL RATE
× 2.50

Rolex/Cartier için 1.799.000 TL tavan UYGULANMAZ.

Kaynak fiyat okunamıyorsa:

- eski uydurma fiyat kullanılmaz,
- random fiyat oluşturulmaz,
- sessiz fallback yapılmaz.

Doğrulanmış ve freshness sınırı içindeki kaynak snapshot politikası ayrıca kanıtlı olmalıdır.

## Konyalı / Saat&Saat

Kaynak TL fiyatı × 1.50

Uygulanan markalar:

- TAG Heuer
- Rado
- Tissot
- Calvin Klein
- Michael Kors
- Versace

Bu grupta mevcut 1.799.000 TL katalog tavanı korunur.

## Carren

Tüm ürünlerde:

19.990 TL

Kaynak fiyat kullanılmaz.

---

# 11. FILTER ENGINE — BELGIN DAVRANIŞ PARİTESİ

Belgin prensibi:

"Filtre gerçek envanteri daraltmalıdır; dekoratif UI değildir."

SAATCHI filtresi statik süs olmayacak.

Filtre sonucu gerçek katalog üzerinde hesaplanacak.

## 11.1 Zorunlu filtre grupları

Veri bulunduğu ölçüde:

### Marka
- Rolex
- Cartier
- TAG Heuer
- Rado
- Tissot
- Carren
- Calvin Klein
- Michael Kors
- Versace

### Kategori
- Elit Saatler
- Diğer Saatler

### Cinsiyet
- Erkek
- Kadın
- Unisex

### Fiyat
- fiyat aralığı / slider veya kontrollü bantlar

### Durum
- Yeni
- İkinci El

### Mekanizma
- Automatic
- Manual
- Quartz

### Kasa Materyali
yalnız katalogda gerçek veri varsa.

### Kasa Çapı
yalnız gerçek veri varsa.

### Kadran Rengi
yalnız gerçek veri varsa.

### Kayış / Bilezik
yalnız gerçek veri varsa.

### Kutu / Sertifika
yalnız gerçek veri varsa.

### Stok
- Stokta
- Temin Edilebilir

Doğrulanmayan filtre oluşturulmaz.

---

# 12. FILTER UX

Desktop:

sol sidebar veya premium filter rail.

Mobile:

filter drawer / bottom sheet.

Zorunlu davranış:

- aktif filtre sayısı,
- filtre sonucu ürün sayısı,
- "Tümünü Temizle",
- tek filtre kaldırma,
- çoklu filtre kombinasyonu,
- URL/query state mümkün olduğunda korunmalı,
- back/forward davranışı ürün keşfini bozmamalı,
- kategori değişince anlamsız filtreler resetlenmeli,
- sonuç 0 ise kontrollü empty state.

Filtre uygulanırken ürün grid zıplamamalı.

Page-level horizontal overflow yasaktır.

---

# 13. SORT ENGINE

Minimum:

- Önerilen
- Fiyat Artan
- Fiyat Azalan
- Yeni Eklenen
- Marka A–Z

Sıralama client-side görüntü oyunu olmamalı.

Aynı veri seti üzerinde deterministik çalışmalıdır.

---

# 14. SEARCH

Global search aşağıdaki alanlarda arama yapmalıdır:

- marka
- model
- referans
- koleksiyon

Arama sonucu:

- görsel
- marka
- model
- referans
- fiyat

gösterebilir.

Arama sonucu canonical PDP'ye gider.

Aynı ürün search/category/menu üzerinden farklı URL'lere bölünemez.

---

# 15. TRUST DENSITY

Belgin'deki "trust near decision" prensibi aynen uygulanır.

Fiyatın yanında:

- güvenli ödeme,
- teslim,
- garanti/service

gibi gerçek bilgiler bulunabilir.

Satın alma CTA'sının yakınında:

- güvenli ödeme
- teslimat
- showroom
- iletişim

güveni yer almalıdır.

Trust öğeleri sadece footer'a atılamaz.

---

# 16. PRIMARY CTA HİYERARŞİSİ

Bir karar alanında TEK baskın CTA.

Örnek:

Discovery:
Koleksiyonu İncele

Product Card:
Ürünü İncele

Product Detail:
Satın Al
veya
Güvenli Ödeme

High-value destek:
VIP WhatsApp / Showroom

Checkout:
Güvenli Ödemeye Geç

Wishlist veya iletişim ikinci önceliktedir.

Beş eşit CTA aynı blokta kullanılamaz.

---

# 17. DELIVERY / WARRANTY / SERVICE BLOCK

PDP üzerinde satın alma kararına yakın yerleştirilir.

Gerçek politika bulunduğu ölçüde:

- teslimat şekli,
- showroom teslim,
- kargo,
- garanti,
- servis,
- iade,
- doğrulama,
- ödeme güvenliği.

Sahte güven iddiası üretilemez.

---

# 18. RELATED PRODUCTS

Belgin mantığı kullanılır.

İlişki gerçek olmalıdır:

1. aynı marka,
2. aynı koleksiyon,
3. yakın fiyat bandı,
4. benzer kasa/style,
5. aynı kullanım segmenti.

Boş carousel doldurmak için rastgele ürün gösterilemez.

---

# 19. VIP LINK

SAATCHI VIP Link sistemi commerce sisteminin parçasıdır.

Zorunlu:

- güvenli admin session,
- HttpOnly session,
- server-side authorization,
- durable link state,
- revoke,
- revoked token reddi,
- expiry,
- server-side amount validation,
- ödeme öncesi yeniden doğrulama,
- WhatsApp ile Linki İlet.

Sahte "Link İptal" butonu oluşturulamaz.

UI'da iptal edilen link gerçekten server tarafında geçersiz hale gelmelidir.

---

# 20. CART / CHECKOUT

Belgin checkout ilkesi aynen uygulanır:

Checkout pazarlama ekranı değildir.

Öncelik:

1. ürün
2. fiyat
3. toplam
4. müşteri bilgileri
5. teslim
6. hukuki onaylar
7. payment/security
8. final CTA

Toplam fiyat her zaman açık olmalıdır.

Payment provider davranışı UI tasarımı uğruna değiştirilemez.

Client fiyatı authoritative kabul edilemez.

---

# 21. LEGAL CONSENT

Gerekli satış akışında:

- Ön Bilgilendirme Formu
- Mesafeli Satış Sözleşmesi
- yüksek değerli ürün teslim koşulları
- gerekli gizlilik/KVKK metinleri

kullanılabilir ve erişilebilir olmalıdır.

Checkbox'lar gizlenemez veya önceden işaretlenemez.

---

# 22. SHOWROOM / CONCIERGE

Premium menü ve yüksek değerli PDP'lerde SAATCHI Concierge korunur.

Amaç:

satış kararını bölen ikinci mağaza oluşturmak değil,
yüksek değerli alışverişte güven sağlamaktır.

Kullanılabilecek aksiyonlar:

- showroom
- WhatsApp
- danışmanlık
- ikinci el değerlendirme
- takas

Gerçekte sunulmayan hizmet yazılamaz.

---

# 23. RESPONSIVE CONTRACT

Minimum doğrulama viewportları:

320
360
375
390
430
768
1024
1280
1440

Zorunlu:

- yatay page overflow yok,
- menu clipping yok,
- gallery viewport dışına çıkmaz,
- filter mobilde kullanılabilir,
- product specifications taşmaz,
- fiyat kırılmaz,
- CTA güvenli alana taşmaz,
- touch target yaklaşık 44px veya üstü,
- sticky CTA içerik kapatmaz.

`overflow-x:hidden` kullanarak problemi gizlemek yasaktır.

DOM/layout kök nedeni düzeltilir.

Belgin de aynı şekilde 320–1440 aralığında gerçek layout güvenliği ister. 

---

# 24. ACCESSIBILITY

Target:

WCAG 2.2 AA veya daha iyi.

Zorunlu:

- semantic heading
- keyboard menu
- keyboard gallery
- visible focus
- yeterli contrast
- input labels
- field error association
- image alt text
- reduced-motion
- hover-only kritik bilgi olmaması

Luxury görünüm erişilebilirlikten taviz veremez.

---

# 25. MOTION

SAATCHI motion:

slow
quiet
premium
material-aware

Allowed:

- opacity
- subtle transform
- 700ms product hover
- controlled gallery transition
- premium drawer transition

Yasak:

- agresif parallax
- sürekli glow
- fiyatın okunmasını zorlaştıran animasyon
- scroll-jacking
- dikkat dağıtan sonsuz logo hareketleri

---

# 26. SEO / GEO / LLMO

Her ürün:

- canonical
- Product schema
- Offer
- brand
- model
- SKU/reference
- priceCurrency
- price
- availability

yalnız gerçek veriden oluşturulmalıdır.

Tek ürünün birden fazla canonical URL'si olmamalı.

Search / category / brand / menu aynı canonical PDP'ye gider.

Sitemap dinamik katalogla uyumlu kalmalıdır.

robots,
llms.txt,
llms-full.txt,
structured data

ürün kataloğundan kopamaz.

---

# 27. PRODUCT PROOF

Bir yüksek değerli ürün sayfası şu sorulara ilk ekranda veya hemen devamında cevap vermelidir:

1. Bu hangi saat?
2. Referansı nedir?
3. Fiyatı nedir?
4. Neden bu ürün değerlidir?
5. Teknik özellikleri nelerdir?
6. Durumu nedir?
7. Kutusu/sertifikası var mı?
8. Garanti nedir?
9. Nasıl teslim edilir?
10. Nasıl satın alınır?

Bunlardan bilinmeyen varsa UYDURULMAZ.

Belgin'in product-detail felsefesi de product → real imagery → material/spec →
price → availability/delivery → trust/service → purchase zincirini zorunlu tutar. 

---

# 28. DATA PROVENANCE

Her ürünün internal kaydında mümkün olduğunda:

sourceUrl
sourceProvider
sourcePrice
sourceCurrency
sourceVerifiedAt
pricingRule
pricingUpdatedAt
stockSource
imageSource

tutulur.

Müşteriye internal tedarik mimarisi gösterilmez.

Ama sistem kendi fiyatının nereden geldiğini ispatlayabilmelidir.

---

# 29. FAILURE MODE

Kaynak bozulursa:

DO NOT GUESS.

Kaynak fiyat okunmuyorsa:

- random fiyat yok,
- eski bilinmeyen değer yok,
- başka markanın fiyatı yok,
- sessiz success yok.

Ürün için güvenilir son doğrulanmış observation politikası varsa freshness sınırı uygulanır.

Freshness aşılmışsa:

FAIL CLOSED.

---

# 30. ANTI-REGRESSION — YASAKLAR

Aşağıdakiler regression kabul edilir:

- premium menünün kaldırılması,
- menünün transparan hale gelmesi,
- ürün listesinin kesilmesi,
- Diğer Saat Kategorisinin kaybolması,
- Carren/Konyalı/Saat&Saat markalarının kaybolması,
- hero başlıklarının küçülmesi,
- saat görsellerinin object-cover ile kırpılması,
- gallery zoom'un bozulması,
- product specs'in kaldırılması,
- filtrelerin dekoratif olması,
- filtre sonrası yanlış ürün gösterilmesi,
- Rolex/Cartier fiyat tavanının geri gelmesi,
- Rolex/Cartier'in eski foreignPrice fallback'ine dönmesi,
- Carren 19.990 kuralının bozulması,
- Konyalı/Saat&Saat ×1.50 kuralının bozulması,
- VIP revoke'un UI-only olması,
- payment amount'un client'tan güvenilmesi,
- sahte stok/sertifika/yorum,
- mobile overflow,
- checkout hukuki onaylarının kaybolması.

---

# 31. REGRESSION TEST SET

Build öncesi minimum:

check:hero
check:premium-ui
check:product-detail
check:catalog-filter
check:pricing
check:vip-security
check:canonical-products

zorunlu hale getirilmelidir.

## Product detail guard

Kontrol:

- gallery var var mı
- zoom var mı
- price var mı
- reference var mı
- specs var mı
- trust block var mı
- related products var mı
- canonical/schema var mı

## Filter guard

Kontrol:

- brand filter
- category filter
- price filter
- reset
- multi-filter
- zero result
- sort
- mobile drawer
- URL/state behavior

---

# 32. GERÇEK BROWSER TESTİ

Test sadece DOM string kontrolü değildir.

Minimum:

HOME
MENU
CATEGORY
FILTER
BRAND
SEARCH
PDP
ZOOM
VIP LINK
CHECKOUT

gerçek browser akışında test edilir.

Mobile ve desktop ayrı doğrulanır.

---

# 33. RELEASE GATE

Aşağıdakiler geçmeden canlıya çıkılmaz:

1. source integrity
2. pricing integrity
3. catalog integrity
4. build
5. regression
6. UI responsive
7. security
8. payment
9. Firebase deploy
10. production runtime readback

COMMIT ≠ DEPLOY.

BUILD ≠ PRODUCTION.

TEST ≠ REAL USER FLOW.

---

# 34. PRODUCTION READBACK

Deploy sonrası:

- deployed SHA
- GitHub main SHA

eşleşmelidir.

Canlı ortamdan doğrulanacak:

- menü
- hero
- category
- filter
- search
- product detail
- gallery
- price
- specs
- VIP link
- checkout boundary
- responsive

Cache/stale deployment kontrol edilmelidir.

---

# 35. ROLLBACK

Her production değişikliği için:

- previous known-good commit
- deploy target
- rollback command
- rollback doğrulama endpointi

bilinir olmalıdır.

Force push yasaktır.

Hard reset ile doğrulanmamış kullanıcı işi silinemez.

---

# 36. DONE DEFINITION

Bir iş ancak aşağıdakilerin TÜMÜ sağlanırsa DONE'dır:

- kod yazıldı,
- doğru veri kullanıldı,
- test geçti,
- doğru şeyi test ettiği doğrulandı,
- CI geçti,
- build geçti,
- deploy geçti,
- runtime readback alındı,
- gerçek kullanıcı akışı çalıştı,
- önceki fonksiyonlar bozulmadı,
- rollback mevcut,
- source freshness geçerli,
- kritik unsupported claim yok.

CLAIM ≠ PROOF
CODE ≠ RUNTIME
COMMIT ≠ DEPLOY
TEST ≠ PRODUCTION
CONFIDENCE ≠ EVIDENCE
NO EVIDENCE = NO SUCCESS

---

# 37. SON TASARIM KARARI

SAATCHI:

marketplace olmayacak.

Saat kataloğu gibi de görünmeyecek.

Yüksek değerli saat satın alma kararını kolaylaştıran
dijital bir premium saat evi olacaktır.

Belgin'deki kanıtlanmış ticaret aklı korunacak.

SAATCHI'nin mevcut premium menüsü,
sinematik hero'su,
siyah / beyaz / #846b32 kimliği
ve saat odaklı bilgi yoğunluğu korunacaktır.

NİHAİ FORMÜL:

BELGIN TRUST + COMMERCE ARCHITECTURE
×
SAATCHI WATCH PRODUCT INTELLIGENCE
×
SAATCHI PREMIUM VISUAL IDENTITY
=
SAATCHI.WATCH
