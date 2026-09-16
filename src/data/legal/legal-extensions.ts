import type { LegalSection } from './legal-pages';

export const legalExtensions: Record<string, LegalSection[]> = {
  'biz-kimiz': [
    { title: '7. Ticari Şeffaflık ve Yetkili Satıcılık Ayrımı', paragraphs: ['SAATCHI’nin üçüncü taraf saat markalarını anması, ürünleri tanımlama ve koleksiyon bilgisini sunma amacını taşır. İlgili marka bakımından yetkili satıcılık, distribütörlük veya resmî servis ilişkisi ancak ayrıca ve açıkça belirtilmişse kabul edilir.', 'İşletmeci kimliği, iletişim kanalları ve fiziksel adres müşteri tarafından sipariş öncesinde erişilebilir tutulur; geçmiş siparişe ilişkin işletmeci ve belge sürümü sonradan geriye yürütülerek değiştirilmez.'] },
    { title: '8. İkinci El ve Koleksiyon Ürünlerinde Bilgilendirme Standardı', bullets: ['Kondisyon, mevcut kutu-belge ve aksesuar durumu ürün bazında açıklanır.', 'Varsa üretici garantisi, satıcı garantisi ve servis geçmişi birbirinden ayrıştırılır.', 'Piyasa değeri veya gelecekteki değer artışı garanti edilmez; fiyat ve koleksiyon değerlendirmeleri dönemsel piyasa koşullarına bağlıdır.', 'Ürünün ayırt edici kimliği teslim ve uyuşmazlık kayıtlarında siparişle ilişkilendirilebilir.'] }
  ],
  'mesafeli-satis-sozlesmesi': [
    { title: '13. Teslime Kadar Kayıp ve Hasar Riski', paragraphs: ['Satıcı tarafından ön bilgilendirmede belirtilen taşıma yöntemiyle yapılan teslimlerde, mal tüketiciye veya tüketicinin belirlediği üçüncü kişiye teslim edilinceye kadar oluşan kayıp ve hasara ilişkin sorumluluk yürürlükteki tüketici mevzuatı çerçevesinde değerlendirilir. Malın yalnız taşıyıcıya verilmiş olması tüketiciye teslim anlamına gelmez.'] },
    { title: '14. Cayma Bildirimi, İade Süresi ve Geri Ödeme', paragraphs: ['Tüketicinin cayma bildirimi süresi içinde yazılı olarak veya kalıcı veri saklayıcısı ile yöneltmesi yeterlidir. Cayma bildirimi sonrasında ürünün geri gönderilmesi ve Satıcının bedel iadesi, Mesafeli Sözleşmeler Yönetmeliğinde öngörülen süre ve şartlara göre yürütülür.', 'Ön bilgilendirmede iade için belirli bir taşıyıcı belirtilmişse masraf sorumluluğu ve iade başlangıç tarihi yürürlükteki düzenlemeye göre uygulanır. Tüketicinin kanunen ücretsiz iade hakkının bulunduğu durumda ek ücret talep edilmez.'] },
    { title: '15. Eksik Ön Bilgilendirme ve İspat Yükü', paragraphs: ['Cayma hakkına ilişkin bilgilendirmenin gereği gibi yapıldığını ispat yükümlülüğü, uygulanabilir mevzuat kapsamında Satıcıya ve varsa ilgili aracı hizmet sağlayıcıya aittir. Eksik bilgilendirmenin cayma süresine etkisi emredici mevzuata göre belirlenir; sözleşme hükmüyle tüketici aleyhine daraltılmaz.'] },
    { title: '16. Sipariş İptali, İfa İmkânsızlığı ve Stok', paragraphs: ['İfanın objektif olarak imkânsızlaştığı hâllerde tüketiciye bilgi verilmesi ve tahsil edilmiş bedellerin yürürlükteki mevzuatta öngörülen şekilde iadesi esastır. Stokta bulunmama hâli tek başına her durumda hukuki imkânsızlık olarak kabul edilmez; somut siparişin koşulları ayrıca değerlendirilir.'] }
  ],
  'on-bilgilendirme-formu': [
    { title: '9. Siparişin Ödeme Yükümlülüğü Doğurduğuna İlişkin Uyarı', paragraphs: ['Tüketicinin siparişi kesinleştirdiği son işlem adımı, siparişin ödeme yükümlülüğü doğurduğunu açık ve anlaşılır biçimde gösterir. Bu bilgi, toplam bedel ve temel sipariş özeti ile birlikte ödeme öncesinde görünür tutulur.'] },
    { title: '10. İade Taşıyıcısı ve İade Masrafları', paragraphs: ['İade için kullanılacak taşıyıcı veya yöntem belirlenmişse bu bilgi ödeme öncesi bilgilendirmede gösterilir. Tüketicinin iade masrafından sorumlu tutulamayacağı hâllerde ücret yansıtılmaz; farklı taşıyıcı kullanımının süre ve masraf sonuçları mevzuata göre değerlendirilir.'] },
    { title: '11. Teslim Süresi ve Teslime Kadar Risk', paragraphs: ['Siparişe özgü tahmini teslim süresi ve yöntem ödeme öncesinde sunulur. Teslime kadar oluşabilecek kayıp ve hasar bakımından tüketicinin emredici hakları saklıdır; yalnız taşıyıcıya teslim edilmesi tüketiciye teslim olarak değerlendirilmez.'] }
  ],
  'kvkk-aydinlatma-metni': [
    { title: '10. Alıcı Grupları ve Aktarımın Sınırı', paragraphs: ['Kişisel veriler yalnız belirli ve meşru amaçların gerektirdiği ölçüde; banka/ödeme kuruluşları, muhasebe ve e-belge hizmetleri, güvenli teslim veya lojistik sağlayıcıları, bilişim hizmet sağlayıcıları, hukuk/mali müşavirlik tarafları ve kanunen yetkili kamu kurumlarıyla paylaşılabilir. Her aktarım, veri minimizasyonu ve amaçla sınırlılık ilkeleri dikkate alınarak yürütülür.'] },
    { title: '11. Yurt Dışı Aktarımlarında Güncel Güvence Rejimi', paragraphs: ['Bulut, güvenlik, analitik veya diğer teknoloji hizmetleri nedeniyle yurt dışına kişisel veri aktarımı doğması hâlinde, 6698 sayılı Kanunun 9 uncu maddesindeki güncel aktarım mekanizmaları ve uygun güvenceler dikkate alınır. Bir hizmetin teknik olarak yurt dışında çalışması, sınırsız veya amaç dışı aktarım yetkisi vermez.'] },
    { title: '12. Başvuru Kimlik Doğrulaması ve Yanıt Süreci', paragraphs: ['KVKK kapsamındaki başvurularda talebin ilgili kişiye ait olduğunun doğrulanması için ölçülü ek bilgi istenebilir. Başvurular yürürlükteki usul ve süreler içinde ücretsiz olarak veya mevzuatın izin verdiği hâllerde Kurul tarafından belirlenen tarifeye göre sonuçlandırılır.'] }
  ],
  'musteri-tanima-ve-islem-guvenligi': [
    { title: '7. Risk Bazlı Kontrol ve Orantılılık', paragraphs: ['Yüksek bedel tek başına müşteriye şüpheli muamelesi yapılması sonucunu doğurmaz. Kimlik, ödeme sahibi, teslim alacak kişi, işlem örüntüsü ve diğer somut risk göstergeleri birlikte değerlendirilir; talep edilen belge ve kontrol seviyesi işlem riskiyle orantılı tutulur.'] },
    { title: '8. Üçüncü Kişi Ödemeleri ve Teslim Yetkisi', paragraphs: ['Ödemeyi yapan kişi ile sipariş sahibi veya teslim alacak kişinin farklı olması hâlinde ek yetki ve ilişki doğrulaması talep edilebilir. Doğrulama tamamlanmadan yüksek değerli ürün teslimi ertelenebilir; bu durum tüketicinin kanuni iade ve başvuru haklarını ortadan kaldırmaz.'] }
  ],
  'magaza-teslim-tesellum-formu': [
    { title: '6. Teslim Anında Kayıt Altına Alınabilecek Unsurlar', bullets: ['Sipariş ve fatura numarası', 'Teslim tarihi ve saati', 'Ürün marka/model/referans bilgisi', 'Kutu, belge, sertifika ve aksesuar listesi', 'Teslim alanın doğrulanmış kimliği veya yetki bilgisi', 'Tarafların görünür çekince ve teslim notları'] },
    { title: '7. Tesellümün Hukuki Sınırı', paragraphs: ['Tesellüm kaydı, ürünün belirli tarihte belirli unsurlarla teslim edildiğini ispat etmeye yöneliktir. Tüketicinin sonradan ortaya çıkan ayıp, gizli ayıp veya kanunen feragat edilemeyen hakları bakımından peşin ve genel bir ibra oluşturmaz.'] }
  ],
  'yuksek-degerli-urun-teslimi': [
    { title: '6. Teslim Kanalının Sipariş Öncesinde Belirlenmesi', paragraphs: ['Showroom teslimi, sigortalı taşıma veya özel teslim seçeneklerinden hangisinin uygulanacağı mümkün olduğu ölçüde ödeme öncesinde gösterilir. Sonradan tüketici aleyhine ek ücret veya daha ağır teslim şartı getirilmez; güvenlik nedeniyle zorunlu değişiklikte tüketici bilgilendirilir.'] },
    { title: '7. Kayıp, Hasar ve Teslim İspatı', paragraphs: ['Mal tüketiciye veya yetkilendirdiği kişiye teslim edilinceye kadar taşıma sürecindeki kayıp ve hasar, uygulanabilir tüketici mevzuatı çerçevesinde değerlendirilir. Teslimin tamamlandığı; taşıyıcı kaydı, imza, showroom teslim tutanağı veya hukuken elverişli diğer delillerle ispatlanabilir.'] }
  ],
  'iade-degisim-cayma': [
    { title: '7. Cayma Bildiriminin Şekli', paragraphs: ['Cayma bildiriminin süre dolmadan yazılı olarak veya kalıcı veri saklayıcısı yoluyla Satıcıya iletilmesi yeterlidir. Kullanıcıya örnek form sağlanması, form kullanımını zorunlu hâle getirmez.'] },
    { title: '8. İade Süresi ve Kargo', paragraphs: ['Tüketici cayma bildiriminden sonra ürünü yürürlükteki mevzuatta öngörülen süre içinde iade eder. Ön bilgilendirmede belirtilen iade taşıyıcısının kullanılması veya taşıyıcı belirtilmemesi hâlinde iade masrafı sorumluluğu mevzuata göre belirlenir; tüketiciye kanuna aykırı masraf yüklenmez.'] },
    { title: '9. Bedel İadesinin Kapsamı', paragraphs: ['Cayma hakkının usulüne uygun kullanıldığı durumda iade kapsamı, teslim masrafları ve kullanılan ödeme yöntemi bakımından yürürlükteki düzenlemeler uygulanır. İade, tüketicinin satın alma sırasında kullandığı ödeme aracına uygun biçimde ve ek masraf doğurmayacak yöntemle gerçekleştirilir.'] }
  ],
  'gizlilik-politikasi': [
    { title: '6. Veri İhlali ve Olay Yönetimi', paragraphs: ['Kişisel veri güvenliğini etkileyen bir olay tespit edildiğinde erişimin sınırlandırılması, olayın kapsamının belirlenmesi, kayıt altına alınması ve uygulanabilir mevzuatın gerektirdiği bildirim süreçleri yürütülür. Olay kayıtlarında gereksiz kişisel veri çoğaltımından kaçınılır.'] },
    { title: '7. Veri Minimizasyonu ve Varsayılan Gizlilik', paragraphs: ['Dijital formlar, destek kanalları ve işlem logları yalnız işlev için gerekli veri alanlarını talep edecek şekilde tasarlanır. Tam kart numarası, CVV ve banka tek kullanımlık doğrulama kodlarının destek mesajlarına veya müşteri profiline aktarılması talep edilmez.'] }
  ],
  'cerez-politikasi': [
    { title: '6. Harita ve Üçüncü Taraf İçeriklerin Etkinleştirilmesi', paragraphs: ['Google Maps gibi üçüncü taraf içerikler teknik olarak ek tanımlayıcı veya bağlantı verisi işleyebilir. Bu nedenle mümkün olan sayfalarda harita etkileşimi kullanıcı tarafından etkinleştirilecek şekilde sunulur; üçüncü tarafın kendi gizlilik koşulları ayrıca geçerlidir.'] },
    { title: '7. Çerez Envanteri ve Güncelleme', paragraphs: ['Kullanılan teknoloji ve sağlayıcılar değiştikçe çerez kategorileri, amaçları ve gerekli saklama bilgileri gözden geçirilir. Politika, gerçekte kullanılmayan analitik veya pazarlama çerezlerini kullanılıyormuş gibi göstermez; fiilî uygulamayla uyumlu tutulur.'] }
  ],
  'hukuki-delil-ve-kayit-politikasi': [
    { title: '6. Kayıtların Birlikte Değerlendirilmesi', paragraphs: ['Sipariş snapshotı, ödeme sağlayıcısı sonucu, fatura, müşteri iletişimi ve teslim kaydı tek başına mutlak delil olarak değil, olayın niteliğine göre birbirini destekleyen kayıtlar olarak değerlendirilir. Kanunen özel şekle tabi işlemlerde gerekli şekil şartı ayrıca yerine getirilir.'] },
    { title: '7. Değişmezlik ve Erişim Yetkisi', paragraphs: ['Geçmiş siparişe bağlı belge sürümleri ve kritik işlem kayıtlarında sonradan sessiz değişiklik yapılmaması esastır. Düzeltme gerekiyorsa önceki kaydı ortadan kaldırmak yerine izlenebilir yeni kayıt veya düzeltme olayı oluşturulması tercih edilir.'] }
  ],
  'kullanim-kosullari': [
    { title: '6. Site Kullanılabilirliği ve Bakım', paragraphs: ['Planlı bakım, güvenlik olayı, üçüncü taraf servis kesintisi veya mücbir sebepler nedeniyle site geçici olarak erişilemeyebilir. Bu durum kurulmuş sözleşmelerden doğan emredici yükümlülükleri ortadan kaldırmaz; mevcut siparişler için resmî iletişim kanalları kullanılabilir.'] },
    { title: '7. Yanlış Kullanım ve Güvenlik', paragraphs: ['Otomatik kötüye kullanım, yetkisiz erişim denemesi, ödeme dolandırıcılığı veya hizmet sürekliliğini etkileyen davranışlarda teknik koruma uygulanabilir. Bu kontroller hukuka uygun kullanıcıların tüketici ve başvuru haklarını engelleyecek şekilde tasarlanmaz.'] }
  ],
  'guvenli-odeme-ve-3d-secure': [
    { title: '7. Ödeme Başarısı ile Sipariş Onayının Ayrımı', paragraphs: ['Banka veya ödeme kuruluşunda bir provizyon/3D doğrulama adımının tamamlanması, her durumda ürünün teslim edildiği veya siparişin tüm güvenlik kontrollerinden geçtiği anlamına gelmez. Ödeme sonucu, sipariş kaydı ve teslim onayı birbirinden ayrı olaylar olarak kayıt altına alınabilir.'] },
    { title: '8. Kart Verisi ve PCI Yaklaşımı', paragraphs: ['Kart verisinin mümkün olan en geniş ölçüde yetkili ödeme sağlayıcısının güvenli sayfasında işlenmesi; SAATCHI uygulamasının tam kart numarası ve CVV gibi yüksek riskli verileri kalıcı olarak tutmaması esastır. Sağlayıcının teknik güvenlik yükümlülükleri, Satıcının tüketiciye karşı kanuni sorumluluklarını ortadan kaldırmaz.'] }
  ]
};
