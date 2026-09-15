import json
import os

pages = [
    {
        "slug": "biz-kimiz",
        "title": "Biz Kimiz (Kurumsal Profil)",
        "content": "<h2>1. Hakkımızda</h2><p>Saatchi Lüks Saatler, dünyanın en seçkin saat markalarını güvenilir ve profesyonel bir hizmet anlayışıyla sunan lider bir kuruluştur. Amacımız, müşterilerimize kusursuz bir alışveriş deneyimi ve %100 orijinal lüks saat koleksiyonları sağlamaktır.</p>"
    },
    {
        "slug": "mesafeli-satis-sozlesmesi",
        "title": "Mesafeli Satış Sözleşmesi",
        "content": "<h2>1. Taraflar</h2><p>Bu sözleşme, Saatchi Lüks Saatler ile platform üzerinden lüks saat satın alan Alıcı arasında elektronik ortamda akdedilmiştir.</p><h2>2. Sözleşme Konusu</h2><p>Bu sözleşme, 6502 Sayılı Tüketicinin Korunması Hakkında Kanun uyarınca tarafların hak ve yükümlülüklerini düzenler.</p>"
    },
    {
        "slug": "on-bilgilendirme-formu",
        "title": "Ön Bilgilendirme Formu",
        "content": "<h2>1. Temel Özellikler</h2><p>Alıcı, satın aldığı lüks saatin marka, model, referans numarası, mekanizma ve materyal özelliklerini sipariş öncesinde detaylıca incelediğini beyan eder.</p><h2>2. Geçerlilik</h2><p>İşbu form, Mesafeli Satış Sözleşmesinin ayrılmaz bir parçasıdır.</p>"
    },
    {
        "slug": "kvkk-aydinlatma-metni",
        "title": "KVKK Aydınlatma Metni",
        "content": "<h2>1. Veri Sorumlusu</h2><p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca kişisel verileriniz Saatchi Lüks Saatler tarafından işlenmektedir.</p><h2>2. İşleme Amacı</h2><p>Lüks saat satış süreçlerinin yürütülmesi, müşteri memnuniyeti ve sipariş güvenliğinin sağlanması amacıyla işlenir.</p>"
    },
    {
        "slug": "musteri-tanima-ve-islem-guvenligi",
        "title": "MASAK & Müşteri Tanıma",
        "content": "<h2>1. Kapsam</h2><p>Lüks saat satışlarında ulusal ve uluslararası mali mevzuat, MASAK düzenlemeleri ve kara paranın aklanmasının önlenmesi (AML) standartları uyarınca kimlik tespiti ve müşteri tanıma süreçleri işletilmektedir.</p><h2>2. İbraz</h2><p>Yüksek değerli saat alımlarında resmi kimlik ve ek bilgi ibrazı istenebilir.</p>"
    },
    {
        "slug": "magaza-teslim-tesellum-formu",
        "title": "Ürün Teslim & Tesellüm Beyanı",
        "content": "<h2>1. Teslimiyet</h2><p>Satın alınan lüks saat, fiziksel mağazamızda veya güvenlikli kurye ağımızla müşteriye teslim edilir. Teslimat sırasında ürün seri numarası, orijinallik sertifikası ve ürün bütünlüğü alıcı tarafından onaylanarak teslim-tesellüm formu imzalanır.</p>"
    },
    {
        "slug": "yuksek-degerli-urun-teslimi",
        "title": "Yüksek Değerli Teslimat Politikası",
        "content": "<h2>1. Kurye ve Sigorta</h2><p>Lüks saat kargoları, tam sigortalı olarak VIP zırhlı kurye veya özel güvenlikli lojistik firmalarıyla teslim edilir. Teslimat yalnızca kimlik ibrazı ve imza karşılığı asıl alıcıya yapılır.</p>"
    },
    {
        "slug": "iade-degisim-cayma",
        "title": "İade, Değişim ve Cayma Politikası",
        "content": "<h2>1. Genel Kural</h2><p>Lüks saat alımlarında tüketici mevzuatına uygun cayma hakkı geçerlidir. Ancak ürünün kordonunun kısaltılması, özel gravür işlenmesi gibi kişiselleştirilmiş saatlerde cayma hakkı istisnası uygulanır.</p><h2>2. İnceleme</h2><p>İade edilen saatlerin seri numarası, orijinallik sertifikası ve kondisyonu yetkili eksperlerimiz tarafından detaylı incelendikten sonra iade onaylanır.</p>"
    },
    {
        "slug": "gizlilik-politikasi",
        "title": "Gizlilik Politikası",
        "content": "<h2>1. Veri Güvenliği</h2><p>Saatchi Lüks Saatler, sipariş bilgileriniz ve kişisel verileriniz için en üst düzey şifreleme ve güvenlik önlemlerini kullanır.</p>"
    },
    {
        "slug": "cerez-politikasi",
        "title": "Çerez Politikası",
        "content": "<h2>1. Çerez Kullanımı</h2><p>Platformumuzda, size daha iyi ve kişiselleştirilmiş bir deneyim sunmak için zorunlu ve analitik çerezler kullanılmaktadır.</p>"
    },
    {
        "slug": "hukuki-delil-ve-kayit-politikasi",
        "title": "Hukuki Delil & Kayıt Politikası",
        "content": "<h2>1. Log ve Kayıtlar</h2><p>Lüks saat siparişlerine ait tüm dijital işlem kayıtları, IP adresleri, zaman damgalı sözleşme onayları ve e-arşiv fatura izleri hukuki delil niteliğinde sistemimizde güvenle saklanmaktadır.</p>"
    }
]

os.makedirs('src/data/legal', exist_ok=True)
with open('src/data/legal/legal-pages.json', 'w', encoding='utf-8') as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)

print("legal-pages.json created successfully.")
