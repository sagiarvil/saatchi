import { LEGAL_DOCUMENT_VERSIONS } from './legal-versions';

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalPageDefinition = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  version: string;
  references: string[];
  sections: LegalSection[];
};

export const sellerIdentity = {
  operator: 'SEMİH SONBAHAR - SAATCHI',
  brand: 'SAATCHI',
  channel: 'saatchi.watch',
  address: 'Menderes Caddesi No:231/B, Buca / İzmir',
  phone: '+90 541 930 53 72',
  supportPhone: '+90 539 823 41 41',
  email: 'info@saatchi.watch',
  taxOffice: 'Şirinyer V.D.',
  taxNumber: '7740298676',
  chamberRegistryNumber: '492956',
};

const commonReferences = [
  '6502 sayılı Tüketicinin Korunması Hakkında Kanun',
  'Mesafeli Sözleşmeler Yönetmeliği',
  '6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun',
];

export const legalPages: LegalPageDefinition[] = [
  {
    slug: 'biz-kimiz',
    title: 'Kurumsal Profil ve Ticari Kimlik',
    eyebrow: 'SAATCHI / Kurumsal Çerçeve',
    summary: 'Saatchi markasının ticari işletmecisini, fiziksel showroom yapısını, hizmet modelini ve müşteriyle kurduğu sözleşmesel ilişkiyi açıklar.',
    version: '17.09.2026 · v1.0',
    references: ['6102 sayılı Türk Ticaret Kanunu', '6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun', '6502 sayılı Tüketicinin Korunması Hakkında Kanun'],
    sections: [
      {
        title: '1. Marka ve İşletmeci',
        paragraphs: [
          'SAATCHI, saatchi.watch alan adı üzerinden seçili lüks saatlerin sunumunu, satışını ve satış sonrası müşteri süreçlerini yürüten ticari markadır. Site üzerindeki satış ve sözleşme süreçlerinin işletmecisi SEMİH SONBAHAR - SAATCHI’dır.',
          'SAATCHI ayrı bir tüzel kişilik iddiasında bulunmaz. Sipariş, tahsilat, faturalama, teslim, müşteri tanıma ve hukuki kayıt zinciri işletmeci nezdinde yürütülür.'
        ]
      },
      {
        title: '2. Fiziksel Varlık ve Showroom',
        paragraphs: [
          'Fiziksel showroom Menderes Caddesi No:231/B, Buca / İzmir adresindedir. Yüksek değerli saatlerde ürün inceleme, kimlik doğrulama, teslim-tesellüm ve gerekli görülürse ekspertiz süreçleri showroom üzerinden yürütülebilir.',
          'Web sitesi, fiziksel mağazanın yerine geçen anonim bir satış kanalı değil; fiziksel ticari yapı ile dijital sipariş sürecini aynı kayıt zincirinde birleştiren satış kanalıdır.'
        ]
      },
      {
        title: '3. Ürün Seçimi ve Doğrulama Yaklaşımı',
        bullets: [
          'Ürün sayfasında mevcut olduğu ölçüde marka, model, referans, kondisyon, kutu-belge durumu, fiyat ve teslim bilgisi gösterilir.',
          'İkinci el veya koleksiyon niteliğindeki ürünlerde ürünün fiilî durumu ve beraberindeki aksesuarlar siparişe özgü olarak değerlendirilir.',
          'Orijinallik, seri/referans ve fiziksel durum kontrolleri ürünün niteliğine göre uzman incelemesine tabi tutulabilir.',
          'Sitedeki genel marka anlatımları, ilgili markaların resmî distribütörlüğü veya yetkili satıcılığı bulunduğu anlamına gelmez; böyle bir statü ancak ayrıca ve açıkça belirtilmişse geçerlidir.'
        ]
      },
      {
        title: '4. Satış ve Belge Disiplini',
        paragraphs: [
          'Ödeme yükümlülüğü doğuran siparişten önce ürün, toplam bedel, teslim yöntemi ve ilgili hukuki belgeler müşteriye erişilebilir biçimde sunulur. Sipariş anındaki ürün/fiyat ve kabul edilen belge sürümleri işlem kaydıyla ilişkilendirilebilir.',
          'Fatura, ödeme sağlayıcısı sonucu, teslim kaydı ve gerekli müşteri tanıma kayıtları birbirinden bağımsız değil, aynı sipariş kimliği altında ilişkilendirilebilen unsurlardır.'
        ]
      },
      {
        title: '5. İletişim',
        bullets: [
          'VIP WhatsApp: +90 541 930 53 72',
          'Müşteri temsilcisi: +90 539 823 41 41',
          'E-posta: info@saatchi.watch',
          'Vergi Dairesi / VKN: Şirinyer V.D. / 7740298676',
          'Oda Sicil No: 492956',
          'Adres: Menderes Caddesi No:231/B, Buca / İzmir'
        ]
      },
      {
        title: '6. Resmî Kayıt Bilgileri',
        paragraphs: [
          'İşletmeci: SEMİH SONBAHAR - SAATCHI. Vergi Dairesi: Şirinyer V.D. VKN: 7740298676. Oda Sicil No: 492956. MERSİS/ETBİS gibi diğer kayıt numaraları yalnız doğrulanmış resmî kayıtlara dayanılarak ayrıca gösterilir; örnek veya doğrulanmamış numara kullanılmaz.'
        ]
      }
    ]
  },
  {
    slug: 'mesafeli-satis-sozlesmesi',
    title: 'Mesafeli Satış Sözleşmesi',
    eyebrow: 'T.C. Tüketici Hukuku / Sözleşme',
    summary: 'Saatchi üzerinden kurulan mesafeli satışlarda tarafların hak ve yükümlülüklerini, ödeme, teslim, cayma, ayıplı mal ve kayıt düzenini belirler.',
    version: LEGAL_DOCUMENT_VERSIONS.distanceSales,
    references: commonReferences,
    sections: [
      {
        title: '1. Taraflar ve Satıcı Bilgileri',
        paragraphs: [
          'İşbu sözleşme, satış kanalı SAATCHI / saatchi.watch olan SEMİH SONBAHAR - SAATCHI (“Satıcı”) ile elektronik ortamda sipariş veren tüketici (“Alıcı”) arasında kurulur.',
          'Satıcı adresi Menderes Caddesi No:231/B, Buca / İzmir; iletişim telefonu +90 541 930 53 72; elektronik posta adresi info@saatchi.watch’tır. Vergi Dairesi Şirinyer V.D., VKN 7740298676 ve Oda Sicil No 492956’dır.'
        ]
      },
      {
        title: '2. Sözleşmenin Konusu ve Kuruluşu',
        paragraphs: [
          'Sözleşmenin konusu, sipariş özetinde gösterilen saat veya ilgili ürünün satışı ve teslimidir. Alıcı, ödeme yükümlülüğü altına girmeden önce Ön Bilgilendirme Formuna, toplam bedele, teslim yöntemine ve işbu sözleşmeye erişebilir.',
          'Zorunlu hukuki kabul kutuları önceden işaretli olarak sunulmaz. Siparişin tamamlanması, ödeme yükümlülüğü doğurduğu açık şekilde belirtilen işlem adımıyla gerçekleşir.'
        ]
      },
      {
        title: '3. Ürün Kimliği, Kondisyon ve Sipariş Kaydı',
        bullets: [
          'Marka, model, referans, ürün ID, kondisyon, kutu-belge/aksesuar durumu ve varsa seri bilgisi ürünün mevcut verisi ölçüsünde sipariş kaydına bağlanır.',
          'İkinci el/koleksiyon ürünlerinde yaşa ve kullanıma bağlı olağan izler ürün açıklamasında gösterildiği ölçüde değerlendirilir; açıklanmayan ayıp bakımından tüketicinin kanuni hakları saklıdır.',
          'Sipariş anındaki ürün, fiyat, adet, teslim yöntemi ve belge sürümü daha sonra geçmiş işlemi değiştirecek şekilde geriye yürütülmez.'
        ]
      },
      {
        title: '4. Fiyat, Vergiler ve Ödeme',
        paragraphs: [
          'Sipariş öncesinde gösterilen toplam bedel, aksi açıkça belirtilmedikçe vergiler dâhil nihai satış bedelidir. Varsa teslim veya ek hizmet bedeli ödeme yükümlülüğünden önce ayrıca gösterilir.',
          'Kartlı ödemeler yetkili ödeme kuruluşu/banka altyapısı üzerinden işlenebilir. Satıcı ödeme sonucunu, işlem referansını ve gerekli güvenlik kayıtlarını siparişle ilişkilendirebilir; tam kart numarası ve güvenlik kodunu kendi sisteminde kalıcı olarak saklamamayı esas alır.'
        ]
      },
      {
        title: '5. Teslim ve İfa',
        paragraphs: [
          'Teslim yöntemi ürünün değeri, sigorta koşulları, işlem güvenliği ve sipariş öncesi bildirilen yöntem dikkate alınarak belirlenir. Yüksek değerli ürünlerde mağazadan teslim, kimlik doğrulama veya imza karşılığı teslim şartı uygulanabilir; bu şart ödeme öncesinde gösterilir.',
          'Mevzuatta öngörülen azami ifa süreleri saklıdır. Mücbir sebep veya objektif tedarik/ifa engelinde tüketicinin kanuni seçimlik hakları ortadan kaldırılmaz.'
        ]
      },
      {
        title: '6. Cayma Hakkı',
        paragraphs: [
          'Tüketici, kanuni istisnalar saklı kalmak üzere mesafeli mal satışlarında teslimden itibaren on dört gün içinde gerekçe göstermeksizin cayma hakkına sahiptir. Cayma bildirimi kalıcı veri saklayıcısı veya mevzuatın kabul ettiği diğer yöntemlerle Satıcıya yöneltilebilir.',
          'Bir ürünün yalnızca yüksek bedelli veya lüks nitelikte olması tek başına cayma hakkını ortadan kaldırmaz.'
        ]
      },
      {
        title: '7. Cayma Hakkı İstisnaları',
        paragraphs: [
          'Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda özel olarak hazırlanan, gravürlenen, kişiselleştirilen veya mevzuatta cayma hakkı dışında bırakılan diğer ürünlerde ilgili kanuni istisna uygulanabilir. İstisna varsa ürün/sipariş aşamasında açıkça belirtilir.',
          'İstisna yorumu, tüketicinin emredici haklarını geniş biçimde ortadan kaldıracak şekilde uygulanmaz.'
        ]
      },
      {
        title: '8. İade, Bedel İadesi ve Ürün Doğrulama',
        paragraphs: [
          'Cayma veya diğer iade taleplerinde ürünün satılan ürünle aynı olup olmadığı; seri/referans, kutu-belge, aksesuar ve fiziki durum üzerinden kontrol edilebilir. Bu kontrol, tüketicinin cayma hakkını fiilen kullanılamaz hâle getirecek şekilde uygulanmaz.',
          'Bedel iadeleri, yürürlükteki mevzuatta öngörülen süre ve yöntemlere uygun olarak, mümkün olduğu ölçüde ödeme aracına uygun kanaldan yapılır.'
        ]
      },
      {
        title: '9. Ayıplı Mal ve Garanti Hakları',
        paragraphs: [
          '6502 sayılı Kanun kapsamında ayıplı mala ilişkin tüketicinin emredici seçimlik hakları saklıdır. İşbu sözleşmedeki hiçbir hüküm, kanunen sınırlandırılamayan tüketici haklarını ortadan kaldırmaz.',
          'Üretici/marka garantisi, satıcı garantisi veya servis kapsamı varsa ürün bazında ayrıca belirtilir; yetkili servis/üretici garantisi bulunmayan üründe varmış gibi sunulmaz.'
        ]
      },
      {
        title: '10. Kimlik ve İşlem Güvenliği',
        paragraphs: [
          'İşlemin niteliğine göre kimlik doğrulama, başkası hesabına hareket/gerçek faydalanıcı değerlendirmesi ve işlem güvenliği kontrolleri yürürlükteki mali mevzuat ile Satıcının ölçülü iç kontrol kurallarına göre uygulanabilir.',
          'Şüpheli işlem değerlendirmesine ilişkin gizli kriterler ve bildirim süreçleri müşteriye açıklanması zorunlu olmayan iç uyum bilgileridir.'
        ]
      },
      {
        title: '11. Kişisel Veriler ve Kayıtlar',
        paragraphs: [
          'Kimlik, iletişim, sipariş, ödeme sonucu, teslim ve işlem güvenliği verileri KVKK Aydınlatma Metni çerçevesinde işlenir. Sözleşmenin ifası veya hukuki yükümlülük için gerekli veri işleme faaliyetleri, gereksiz açık rıza şartına bağlanmaz.',
          'Sipariş sırasında kabul edilen belge sürümü, sipariş ID, ürün/fiyat kaydı, işlem zamanı, ödeme sonucu ve teslim tutanağı uyuşmazlıklarda ilgili mevzuat çerçevesinde delil olarak değerlendirilebilir.'
        ]
      },
      {
        title: '12. Uyuşmazlıkların Çözümü',
        paragraphs: [
          'Tüketicinin yerleşim yeri ve yürürlükteki parasal sınırlar dikkate alınarak yetkili Tüketici Hakem Heyetlerine, tüketici mahkemelerine ve kanunen yetkili diğer mercilere başvuru hakları saklıdır. Tüketicinin kanundan doğan yetki seçimleri sözleşmeyle bertaraf edilmez.'
        ]
      }
    ]
  },
  {
    slug: 'on-bilgilendirme-formu',
    title: 'Mesafeli Sözleşme Ön Bilgilendirme Formu',
    eyebrow: 'Ödeme Öncesi Zorunlu Bilgilendirme',
    summary: 'Müşterinin ödeme yükümlülüğü altına girmeden önce ürün, satıcı, toplam fiyat, teslim, cayma ve uyuşmazlık yolları hakkında bilgilendirilmesine ilişkin çerçevedir.',
    version: LEGAL_DOCUMENT_VERSIONS.preInformation,
    references: commonReferences,
    sections: [
      {
        title: '1. Satıcı ve İletişim Bilgileri',
        bullets: [
          'Satıcı: SEMİH SONBAHAR - SAATCHI',
          'Satış kanalı: SAATCHI / saatchi.watch',
          'Adres: Menderes Caddesi No:231/B, Buca / İzmir',
          'Telefon: +90 541 930 53 72',
          'E-posta: info@saatchi.watch'
        ]
      },
      {
        title: '2. Ürünün Temel Nitelikleri',
        paragraphs: [
          'Sipariş konusu saatin marka, model, referans, kondisyon, materyal/mekanizma bilgisi, kutu-belge/aksesuar durumu ve mevcut diğer ayırt edici özellikleri ürün sayfası ve sipariş özetinde gösterilir. Ürün fotoğrafları ile açıklamalar birlikte değerlendirilir.',
          'İkinci el ürünlerde her ürün kendi kondisyonuna göre değerlendirilir; seri numarası gibi güvenlik açısından kısmen maskelenmesi gereken bilgiler teslim/işlem kayıtlarında tam olarak tutulabilir.'
        ]
      },
      {
        title: '3. Toplam Fiyat ve Ek Masraflar',
        paragraphs: [
          'Vergiler dâhil toplam satış bedeli ve varsa teslim, sigorta veya ayrıca ücretlendirilen hizmet bedelleri ödeme öncesinde gösterilir. Sonradan zorunlu ek ücret oluşturulmaz.'
        ]
      },
      {
        title: '4. Ödeme Yöntemi ve İşlem Güvenliği',
        paragraphs: [
          'Kullanılabilir ödeme yöntemleri checkout ekranında gösterilir. Kartlı işlemlerde banka/ödeme kuruluşu doğrulaması, 3D Secure veya risk kontrol adımları uygulanabilir. Ödeme sonucu kesinleşmeden ürün teslim edilmiş sayılmaz.'
        ]
      },
      {
        title: '5. Teslim Yöntemi',
        paragraphs: [
          'Teslim yöntemi sipariş öncesi açıkça gösterilir. Ürünün değer ve güvenlik niteliğine göre mağazadan kimlik karşılığı teslim, sigortalı özel teslim veya uygun başka bir yöntem uygulanabilir. Üçüncü kişiye teslim ancak hukuken yeterli ve Satıcı tarafından doğrulanabilir yetkilendirme bulunması hâlinde değerlendirilir.'
        ]
      },
      {
        title: '6. Cayma Hakkı ve İstisnalar',
        paragraphs: [
          'Kanuni istisnalar dışında tüketicinin teslimden itibaren on dört günlük cayma hakkı bulunmaktadır. Kişiye özel gravür, kişiselleştirme veya mevzuatta açıkça istisna sayılan ürünler bakımından cayma hakkı bulunmayabilir; ürün bazındaki istisna ödeme öncesinde açıklanır.'
        ]
      },
      {
        title: '7. Ayıplı Mal ve Başvuru Yolları',
        paragraphs: [
          'Cayma hakkından bağımsız olarak ayıplı mala ilişkin 6502 sayılı Kanundan doğan emredici seçimlik haklar saklıdır. Tüketici, yürürlükteki görev ve parasal sınırlar çerçevesinde Tüketici Hakem Heyeti, tüketici mahkemesi ve diğer yetkili mercilere başvurabilir.'
        ]
      },
      {
        title: '8. Kalıcı Veri ve Belge Sürümü',
        paragraphs: [
          'Ön bilgilendirme içeriği, sipariş anında geçerli sürümüyle saklanabilir ve sipariş kaydına bağlanabilir. Sonradan yapılan içerik güncellemeleri geçmiş siparişte gösterilen metni geriye dönük değiştirmez.'
        ]
      }
    ]
  },
  {
    slug: 'kvkk-aydinlatma-metni',
    title: 'KVKK Müşteri Aydınlatma Metni',
    eyebrow: '6698 sayılı Kanun / Aydınlatma',
    summary: 'Saatchi kanalı üzerinden elde edilen kişisel verilerin kim tarafından, hangi amaçlarla, hangi hukuki sebeplerle ve kimlere aktarılabileceğini açıklar.',
    version: '17.09.2026 · v1.0',
    references: ['6698 sayılı Kişisel Verilerin Korunması Kanunu', 'Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ'],
    sections: [
      {
        title: '1. Veri Sorumlusu',
        paragraphs: [
          '6698 sayılı Kanun kapsamında veri sorumlusu SEMİH SONBAHAR - SAATCHI’dır. SAATCHI / saatchi.watch veri sorumlusunun dijital satış kanalıdır. Bu metin açık rıza metni değildir; aydınlatma yükümlülüğünün yerine getirilmesi amacıyla hazırlanmıştır.'
        ]
      },
      {
        title: '2. İşlenebilecek Veri Kategorileri',
        bullets: [
          'Kimlik ve müşteri tanıma verileri',
          'Telefon, e-posta ve adres gibi iletişim verileri',
          'Sipariş, ürün, fiyat, fatura ve müşteri işlem verileri',
          'Ödeme sonucu, işlem referansı ve ödeme güvenliği verileri',
          'Teslim-tesellüm, garanti, servis ve talep/şikâyet kayıtları',
          'IP, log, cihaz/istemci, oturum ve dolandırıcılık önleme verileri',
          'Uygulanıyorsa mağaza güvenlik kamera kayıtları',
          'Pazarlama tercihi verileri; yalnız uygulanabilir hukuki şart oluştuğunda'
        ]
      },
      {
        title: '3. İşleme Amaçları',
        bullets: [
          'Siparişin kurulması, ödeme, faturalama ve teslim süreçlerinin yürütülmesi',
          'Ürün orijinallik/kondisyon, garanti ve satış sonrası süreçlerinin yönetilmesi',
          'Müşteri iletişimi, talep ve uyuşmazlıkların sonuçlandırılması',
          'Dolandırıcılık, yetkisiz işlem ve bilgi güvenliği risklerinin azaltılması',
          'Mali, vergisel, tüketici hukuku ve uygulanabilir müşteri tanıma yükümlülüklerinin yerine getirilmesi',
          'Hukuki hakların tesisi, kullanılması veya korunması'
        ]
      },
      {
        title: '4. Hukuki Sebepler',
        paragraphs: [
          'Kişisel veriler, somut işleme faaliyetine göre Kanunun 5 ve gerektiğinde 6’ncı maddelerinde yer alan sözleşmenin kurulması/ifası, hukuki yükümlülük, bir hakkın tesisi-kullanılması-korunması, meşru menfaat veya açık rıza gibi uygulanabilir hukuki sebeplere dayanılarak işlenir. Açık rıza gerekmeyen işlemler için açık rıza zorunlu hizmet koşulu hâline getirilmez.'
        ]
      },
      {
        title: '5. Veri Toplama Yöntemi',
        paragraphs: [
          'Veriler web formları, checkout, müşteri iletişimi, mağaza işlemleri, teslim belgeleri, ödeme sağlayıcı sonuçları, sistem logları ve hukuka uygun diğer kanallardan otomatik veya kısmen otomatik yöntemlerle; gerektiğinde fiziksel belge üzerinden otomatik olmayan yöntemlerle elde edilebilir.'
        ]
      },
      {
        title: '6. Aktarım ve Hizmet Sağlayıcılar',
        paragraphs: [
          'İşin gerektirdiği ölçüde ödeme/banka kuruluşları, kargo veya güvenli teslim sağlayıcıları, e-fatura/muhasebe hizmetleri, bilişim ve barındırma sağlayıcıları, yetkili servis/ekspertiz tarafları, hukuk-mali müşavirlik hizmetleri ve kanunen yetkili kamu kurumlarıyla veri paylaşımı yapılabilir.',
          'Yurt dışına veri aktarımı doğması hâlinde 6698 sayılı Kanunun 9’uncu maddesindeki güncel aktarım şartları ve uygun güvenceler dikkate alınır.'
        ]
      },
      {
        title: '7. Saklama ve İmha',
        paragraphs: [
          'Veriler, işleme amacının gerektirdiği ve ilgili mevzuatta öngörülen saklama süreleri boyunca tutulur. Süre sonunda veri kategorisine uygun silme, yok etme veya anonimleştirme süreçleri uygulanır. Her veri kategorisi aynı süreyle tutulmaz.'
        ]
      },
      {
        title: '8. İlgili Kişinin Hakları ve Başvuru',
        paragraphs: [
          'İlgili kişiler Kanunun 11’inci maddesindeki haklarına ilişkin taleplerini veri sorumlusuna iletebilir. Başvurular kimliğin doğrulanmasına elverişli bilgiyle info@saatchi.watch üzerinden veya Menderes Caddesi No:231/B, Buca / İzmir adresine yöneltilebilir. Başvurular yürürlükteki usul ve süreler içinde sonuçlandırılır.'
        ]
      },
      {
        title: '9. Veri Güvenliği',
        paragraphs: [
          'Erişim yetkilendirmesi, kayıt izleme, uygun şifreleme, görev ayrılığı, güvenli ödeme mimarisi ve hizmet sağlayıcı kontrolleri riskle orantılı olarak uygulanır. Tam kart verisinin Satıcının uygulama loglarında veya müşteri kayıtlarında gereksiz biçimde tutulmaması esastır.'
        ]
      }
    ]
  },
  {
    slug: 'musteri-tanima-ve-islem-guvenligi',
    title: 'Müşteri Tanıma, Uyum ve İşlem Güvenliği Politikası',
    eyebrow: 'KYC / İşlem Güvenliği',
    summary: 'Yüksek değerli saat işlemlerinde kimlik doğrulama, gerçek faydalanıcı, ödeme sahibi ve işlem güvenliği kontrollerinin müşteriye açıklanabilir çerçevesidir.',
    version: '17.09.2026 · v1.0',
    references: ['5549 sayılı Suç Gelirlerinin Aklanmasının Önlenmesi Hakkında Kanun', 'İlgili MASAK ikincil düzenlemeleri', '6698 sayılı Kişisel Verilerin Korunması Kanunu'],
    sections: [
      {
        title: '1. Amaç ve Risk Yaklaşımı',
        paragraphs: [
          'Politikanın amacı, yüksek değerli işlemlerde müşteri ve ödeme güvenliğini artırmak; uygulanabilir mali mevzuat yükümlülüklerini yerine getirmek ve üçüncü kişi hesabına işlem, yetkisiz kart kullanımı veya dolandırıcılık risklerini azaltmaktır.',
          'Her müşteriden aynı kapsamda belge istenmesi yerine, işlemin hukuki niteliği ve risk düzeyiyle ölçülü kontrol uygulanır.'
        ]
      },
      {
        title: '2. Kimlik Doğrulama',
        bullets: [
          'Kanuni şartların oluştuğu veya yüksek değerli işlem güvenliğinin gerekli kıldığı hâllerde geçerli resmî kimlik istenebilir.',
          'Kimlik bilgisi ile ödeme sahibi/teslim alacak kişi arasındaki makul uyum kontrol edilebilir.',
          'Kimlik verileri yalnız gerekli kapsamda işlenir ve KVKK Aydınlatma Metnine tabidir.'
        ]
      },
      {
        title: '3. Başkası Hesabına Hareket ve Gerçek Faydalanıcı',
        paragraphs: [
          'İşlemin başka bir kişi adına veya hesabına yapıldığına ilişkin emare bulunması hâlinde yetki ve gerçek faydalanıcı bilgileri talep edilebilir. Basit mesaj veya doğrulanmamış sözlü beyan, yüksek değerli ürünü üçüncü kişiye teslim etmek için tek başına yeterli kabul edilmeyebilir.'
        ]
      },
      {
        title: '4. Ödeme Güvenliği',
        bullets: [
          'Ödeme sağlayıcısının 3D Secure ve benzeri doğrulama araçları kullanılabilir.',
          'Kart sahibi, sipariş sahibi ve teslim alacak kişi farklıysa ek doğrulama uygulanabilir.',
          'Bölünmüş, tekrarlı veya olağandışı işlemler risk ve mevzuat çerçevesinde birlikte değerlendirilebilir.'
        ]
      },
      {
        title: '5. Şüpheli İşlem ve Gizlilik',
        paragraphs: [
          'Şüpheli işlem değerlendirmesi, uygulanabilir mevzuatın öngördüğü hâllerde belirli bir iç satış eşiği beklenmeksizin yapılabilir. Değerlendirme kriterleri, bildirim yapılıp yapılmadığı veya iç güvenlik algoritmaları müşteriye açıklanmayabilir.'
        ]
      },
      {
        title: '6. Kayıt ve Muhafaza',
        paragraphs: [
          'Kanunen tutulması gereken kimlik, işlem ve destekleyici belgeler ilgili mevzuatın öngördüğü süre ve güvenlik standardına göre saklanır. Gereksiz veri çoğaltımı ve erişimi sınırlandırılır.'
        ]
      }
    ]
  },
  {
    slug: 'magaza-teslim-tesellum-formu',
    title: 'Ürün Teslim, Kontrol ve Tesellüm Çerçevesi',
    eyebrow: 'Showroom Teslim Protokolü',
    summary: 'Mağazada veya yüksek güvenlikli teslimde ürünün doğru kişiye, doğru ürün kimliği ve kayıt zinciriyle teslim edilmesine ilişkin esasları açıklar.',
    version: '17.09.2026 · v1.0',
    references: ['6502 sayılı Tüketicinin Korunması Hakkında Kanun', 'Türk Borçlar Kanunu', '6698 sayılı Kişisel Verilerin Korunması Kanunu'],
    sections: [
      {
        title: '1. Teslim Öncesi Doğrulama',
        bullets: [
          'Sipariş numarası ve ödeme durumunun doğrulanması',
          'Teslim alacak kişinin kimliğinin ve gerektiğinde yetkisinin doğrulanması',
          'Ürünün marka/model/referans ve mevcut seri bilgisinin sipariş kaydıyla eşleştirilmesi',
          'Kutu, belge, aksesuar ve ürünle birlikte verilecek unsurların kontrolü'
        ]
      },
      {
        title: '2. Ürünü İnceleme İmkânı',
        paragraphs: [
          'Teslim sırasında Alıcıya ürünün türü ve güvenlik koşullarının elverdiği ölçüde dış görünüşünü, siparişle uyumunu ve beraberindeki unsurları inceleme imkânı sağlanır. Görünür çekince varsa teslim kaydına işlenebilir.'
        ]
      },
      {
        title: '3. Teslim Kaydı',
        paragraphs: [
          'Teslim tarihi, sipariş kimliği, teslim alan kişi, ürün tanımlayıcıları ve teslim edilen aksesuarlar fiziksel veya elektronik tutanakla kayda bağlanabilir. Elektronik teslim onayı, mevzuatın emredici şekil şartlarının yerine geçmesi gereken hâllerde tek başına yeterli kabul edilmez.'
        ]
      },
      {
        title: '4. Üçüncü Kişiye Teslim',
        paragraphs: [
          'Yüksek değerli ürünlerde üçüncü kişiye teslim kural olarak sıkı doğrulamaya tabidir. Hukuken yeterli ve işletme tarafından doğrulanabilir yetkilendirme bulunmadan ürün teslim edilmeyebilir.'
        ]
      },
      {
        title: '5. Tüketici Hakları',
        paragraphs: [
          'Teslim tutanağının imzalanması, tüketicinin teslim anında makul biçimde fark edemeyeceği ayıplar veya kanunen feragat edilemeyen haklar bakımından genel ve sınırsız bir ibra anlamına gelmez.'
        ]
      }
    ]
  },
  {
    slug: 'yuksek-degerli-urun-teslimi',
    title: 'Yüksek Değerli Saat Teslimat Politikası',
    eyebrow: 'Güvenlik / Teslim',
    summary: 'Yüksek değerli saatlerde mağazadan teslim, sigortalı lojistik, kimlik doğrulama ve üçüncü kişiye teslim kontrollerinin temel esaslarını açıklar.',
    version: LEGAL_DOCUMENT_VERSIONS.highValueDelivery,
    references: ['6502 sayılı Tüketicinin Korunması Hakkında Kanun', 'Mesafeli Sözleşmeler Yönetmeliği', '6698 sayılı Kişisel Verilerin Korunması Kanunu'],
    sections: [
      {
        title: '1. Yüksek Değer Statüsü',
        paragraphs: [
          'Bir ürünün yüksek değerli işlem olarak ele alınıp alınmayacağı; ürün bedeli, sigorta, ödeme ve teslim güvenliği koşulları dikkate alınarak belirlenebilir. Teslim yöntemi tüketici ödeme yükümlülüğü altına girmeden önce sipariş akışında gösterilir.'
        ]
      },
      {
        title: '2. Mağazadan Teslim',
        paragraphs: [
          'İşlem güvenliğinin gerekli kıldığı ürünlerde teslim yalnız showroom üzerinden, sipariş sahibi veya doğrulanmış yetkili kişiye kimlik karşılığı yapılabilir.'
        ]
      },
      {
        title: '3. Özel / Sigortalı Teslim',
        paragraphs: [
          'Ürün bazında mağaza dışı teslim sunuluyorsa, uygun sigorta ve izlenebilirlik sağlayan lojistik yöntemi tercih edilir. Teslim sağlayıcısı ve güvenlik seviyesi siparişin koşullarına göre değişebilir; her sipariş için zırhlı kurye garantisi verilmez.'
        ]
      },
      {
        title: '4. Teslim Başarısızlığı',
        paragraphs: [
          'Kimlik veya yetki doğrulanamazsa, güvenli teslim şartları oluşmazsa veya teslim kaydı tamamlanamazsa ürün teslim edilmeyebilir ve yeni teslim planı oluşturulabilir. Bu süreç tüketicinin kanuni haklarını ortadan kaldırmaz.'
        ]
      },
      {
        title: '5. Teslim Verileri',
        paragraphs: [
          'Teslimde işlenen kimlik, imza, adres ve işlem kayıtları yalnızca teslimin ispatı, güvenliği ve hukuki yükümlülükler için gerekli kapsamda tutulur.'
        ]
      }
    ]
  },
  {
    slug: 'iade-degisim-cayma',
    title: 'İade, Değişim ve Cayma Politikası',
    eyebrow: 'Tüketici Hakları',
    summary: 'Cayma hakkı, ürün doğrulama, kişiselleştirilmiş ürün istisnası, ayıplı mal ve bedel iadesi süreçlerinin açık uygulama çerçevesidir.',
    version: '17.09.2026 · v1.0',
    references: ['6502 sayılı Tüketicinin Korunması Hakkında Kanun', 'Mesafeli Sözleşmeler Yönetmeliği'],
    sections: [
      {
        title: '1. On Dört Günlük Cayma Hakkı',
        paragraphs: [
          'Kanuni istisnalar saklı kalmak üzere tüketici, malın tesliminden itibaren on dört gün içinde gerekçe göstermeksizin cayma hakkını kullanabilir. Cayma bildiriminin süre içinde Satıcıya yöneltilmesi yeterlidir; yöntem ve iade süreci yürürlükteki mevzuata göre yürütülür.'
        ]
      },
      {
        title: '2. İstisnalar',
        paragraphs: [
          'Tüketicinin özel isteğiyle kişiselleştirilen, gravürlenen veya mevzuatta açıkça cayma hakkı dışında bırakılan ürünlerde ilgili istisna uygulanabilir. İstisna, sipariş öncesinde ürün bazında açıkça bildirilir. Yalnız ürünün pahalı veya lüks olması istisna yaratmaz.'
        ]
      },
      {
        title: '3. İade Ürününün Doğrulanması',
        bullets: [
          'Ürünün satılan ürünle aynı olup olmadığı seri/referans ve diğer tanımlayıcılarla kontrol edilebilir.',
          'Kutu, sertifika, ekstra bakla, aksesuar ve teslim edilen diğer unsurların iadesi beklenir.',
          'Kontrol, kanuni cayma hakkını ortadan kaldırmak için değil ürün değişimi, parça eksiltme ve farklı ürün iadesi riskini önlemek için yapılır.'
        ]
      },
      {
        title: '4. Değer Azalması',
        paragraphs: [
          'Tüketicinin malı işleyişine, teknik özelliklerine ve kullanım talimatlarına uygun şekilde olağan inceleme sınırını aşan kullanımından doğan değer azalması, uygulanabilir mevzuat çerçevesinde ayrıca değerlendirilebilir. Otomatik ve peşin kesinti uygulanmaz.'
        ]
      },
      {
        title: '5. Bedel İadesi',
        paragraphs: [
          'Satıcı, cayma ve iade hâlinde mevzuatta öngörülen süreler içinde gerekli bedel iadesini yapar. İade mümkün olduğu ölçüde satın almada kullanılan ödeme aracına uygun ve tüketiciye ek masraf yüklemeyen yöntemle gerçekleştirilir.'
        ]
      },
      {
        title: '6. Ayıplı Mal',
        paragraphs: [
          'Cayma süresi geçmiş olsa dahi, ayıplı mala ilişkin kanuni seçimlik haklar şartları oluştuğunda ayrıca uygulanır. Cayma hakkı ile ayıplı mal hakları birbirinden bağımsız hukuki korumalardır.'
        ]
      }
    ]
  },
  {
    slug: 'gizlilik-politikasi',
    title: 'Gizlilik ve Kişisel Veri Güvenliği Politikası',
    eyebrow: 'Privacy by Design',
    summary: 'Saatchi web ve showroom süreçlerinde müşteri bilgilerinin erişim, saklama, ödeme ayrıştırması ve hizmet sağlayıcı güvenliği bakımından nasıl korunduğunu açıklar.',
    version: '17.09.2026 · v1.0',
    references: ['6698 sayılı Kişisel Verilerin Korunması Kanunu', 'KVKK Kurul kararları ve rehberleri'],
    sections: [
      {
        title: '1. Temel İlkeler',
        bullets: [
          'Amaçla bağlantılı, sınırlı ve ölçülü veri işleme',
          'Görev gereği erişim ve en az yetki yaklaşımı',
          'Gerekli olmayan kişisel verinin talep edilmemesi',
          'Veri işleme amacı sona erdiğinde uygun imha/anonimleştirme',
          'Güvenlik olaylarının kayıt altına alınması ve gerektiğinde müdahale edilmesi'
        ]
      },
      {
        title: '2. Ödeme Verilerinin Ayrıştırılması',
        paragraphs: [
          'Kartlı ödemede kart verisinin mümkün olduğu ölçüde banka veya ödeme kuruluşu altyapısında işlenmesi esastır. Tam PAN ve CVV bilgisinin Saatchi müşteri kayıtlarında, uygulama loglarında veya destek mesajlarında tutulmaması hedeflenir.'
        ]
      },
      {
        title: '3. Erişim Kontrolü ve Loglama',
        paragraphs: [
          'Sipariş, ödeme sonucu, kimlik ve teslim kayıtlarına erişim görev ve yetkiyle sınırlandırılır. Kritik işlemler, güvenlik ve hesap verebilirlik amacıyla loglanabilir. Log içeriği gereksiz kart/kimlik verisi içermeyecek şekilde tasarlanır.'
        ]
      },
      {
        title: '4. Hizmet Sağlayıcı Güvenliği',
        paragraphs: [
          'Barındırma, ödeme, iletişim, muhasebe ve lojistik hizmet sağlayıcılarına yalnız hizmetin gerektirdiği kapsamda veri aktarılır. Sözleşmesel, teknik ve organizasyonel tedbirler riskle orantılı olarak uygulanır.'
        ]
      },
      {
        title: '5. Müşteri İletişimi',
        paragraphs: [
          'Müşteriden şifre, tek kullanımlık banka doğrulama kodu veya kart güvenlik kodunun mesaj/e-posta üzerinden gönderilmesi istenmez. Şüpheli iletişimlerde müşteri yalnız sitede yayımlanan resmî kanalları kullanmalıdır.'
        ]
      }
    ]
  },
  {
    slug: 'cerez-politikasi',
    title: 'Çerez ve Benzeri Teknolojiler Politikası',
    eyebrow: 'KVKK / Dijital Tercihler',
    summary: 'Zorunlu, işlevsel, analitik ve pazarlama amaçlı çerezlerin kullanım ilkelerini ve kullanıcının tercih yönetimini açıklar.',
    version: '17.09.2026 · v1.0',
    references: ['6698 sayılı Kişisel Verilerin Korunması Kanunu', 'KVKK Çerez Uygulamaları Hakkında Rehber'],
    sections: [
      {
        title: '1. Çerez Nedir?',
        paragraphs: [
          'Çerezler ve benzeri teknolojiler, internet sitesinin çalışması, güvenli oturum yönetimi, tercihlerin hatırlanması ve kullanıcının izin verdiği hâllerde analitik/pazarlama amaçları için cihazda veya tarayıcıda bilgi tutulmasını sağlayabilir.'
        ]
      },
      {
        title: '2. Çerez Kategorileri',
        bullets: [
          'Kesinlikle gerekli çerezler: güvenlik, oturum, sepet ve temel site işlevleri.',
          'İşlevsel çerezler: kullanıcının tercih ettiği deneyim özelliklerini hatırlama.',
          'Analitik/performans çerezleri: ziyaret ve performans ölçümü; hukuki sebebe göre izin mekanizmasına tabi olabilir.',
          'Reklam/pazarlama çerezleri: kullanıcı profilleme veya hedefli iletişim; gerekli hukuki şart olmadan varsayılan olarak etkinleştirilmez.'
        ]
      },
      {
        title: '3. Tercih ve Açık Rıza',
        paragraphs: [
          'Kesinlikle gerekli olmayan çerezler için açık rıza gerekiyorsa rıza, kullanıcının aktif ve özgür iradeli tercihiyle alınır. Kabul, reddet ve tercihler seçeneklerinin kullanıcıyı yönlendirmeyecek biçimde sunulması esastır; önceden işaretli onay kullanılmaz.'
        ]
      },
      {
        title: '4. Üçüncü Taraf Çerezler ve Yurt Dışı Aktarım',
        paragraphs: [
          'Üçüncü taraf analitik, harita veya medya hizmetleri çerez veya benzeri tanımlayıcı kullanabilir. Bu hizmetler yoluyla yurt dışına veri aktarımı doğarsa 6698 sayılı Kanunun 9’uncu maddesindeki güncel şartlar ayrıca dikkate alınır.'
        ]
      },
      {
        title: '5. Tercih Değişikliği',
        paragraphs: [
          'Kullanıcı, tarayıcı ayarları veya sitede sunulan tercih yönetimi mekanizması üzerinden izinlerini sonradan değiştirebilir. Rızanın geri alınması, geri alma öncesindeki hukuka uygun işleme faaliyetini kendiliğinden hukuka aykırı hâle getirmez.'
        ]
      }
    ]
  },
  {
    slug: 'hukuki-delil-ve-kayit-politikasi',
    title: 'Hukuki Delil, Belge Sürümü ve İşlem Kayıt Politikası',
    eyebrow: 'Audit Trail / Belge Bütünlüğü',
    summary: 'Sipariş, hukuki belge sürümü, ödeme sonucu ve teslim kayıtlarının sonradan doğrulanabilir bir işlem zincirinde nasıl ilişkilendirileceğini açıklar.',
    version: '17.09.2026 · v1.0',
    references: ['6100 sayılı Hukuk Muhakemeleri Kanunu', '5070 sayılı Elektronik İmza Kanunu', '6698 sayılı Kişisel Verilerin Korunması Kanunu'],
    sections: [
      {
        title: '1. Belge Sürümü',
        paragraphs: [
          'Mesafeli Satış Sözleşmesi, Ön Bilgilendirme Formu ve ilgili politika metinleri sürümlenebilir. Sipariş anında müşteriye gösterilen sürüm, işlem kaydıyla ilişkilendirilir; yeni sürüm geçmiş sipariş kaydının yerine geçirilmez.'
        ]
      },
      {
        title: '2. Sipariş Snapshot’ı',
        bullets: [
          'Sipariş ID ve işlem zamanı',
          'Ürün/model/referans ve mevcut diğer ürün tanımlayıcıları',
          'Sipariş anındaki fiyat, adet ve teslim yöntemi',
          'Gösterilen/kabul edilen hukuk belgesi sürümleri',
          'Ödeme sağlayıcısı sonucu ve işlem referansı',
          'Teslim-tesellüm kaydı ve uygulanıyorsa kimlik doğrulama sonucu'
        ]
      },
      {
        title: '3. Bütünlük Özeti',
        paragraphs: [
          'Belge içerikleri için SHA-256 gibi kriptografik bütünlük özeti üretilebilir. Bu özet, içerikte sonradan değişiklik olup olmadığını kontrol etmeye yardımcı olur; tek başına nitelikli elektronik imza veya 5070 sayılı Kanun kapsamında yetkili hizmet sağlayıcı tarafından üretilmiş zaman damgası olduğu iddia edilmez.'
        ]
      },
      {
        title: '4. Log ve İstemci Kayıtları',
        paragraphs: [
          'Güvenlik ve uyuşmazlık çözümü amacıyla IP, istemci, oturum, sunucu kabul zamanı ve işlem olayları ölçülü biçimde loglanabilir. Loglar gereksiz tam kart verisi veya hassas kimlik kopyası içermeyecek şekilde tasarlanır.'
        ]
      },
      {
        title: '5. Delil Niteliği ve Sınırı',
        paragraphs: [
          'Elektronik kayıtlar, fiziksel belgeler, ödeme kuruluşu kayıtları ve teslim tutanakları uyuşmazlıklarda birlikte değerlendirilebilir. Bu politika tarafların veya tüketicinin kanundan doğan ispat ve başvuru haklarını tek taraflı olarak ortadan kaldırmaz.'
        ]
      }
    ]
  },
  {
    slug: 'kullanim-kosullari',
    title: 'Web Sitesi Kullanım Koşulları',
    eyebrow: 'SAATCHI Dijital Kullanım',
    summary: 'saatchi.watch kullanımına, ürün sunumlarına, fikri haklara, güvenli kullanıma ve site üzerinden kurulan işlemlere ilişkin genel koşullardır.',
    version: '17.09.2026 · v1.0',
    references: ['6102 sayılı Türk Ticaret Kanunu', '6502 sayılı Tüketicinin Korunması Hakkında Kanun', '5651 sayılı Kanun ve uygulanabilir ikincil düzenlemeler'],
    sections: [
      {
        title: '1. Site Kullanımı',
        paragraphs: [
          'Kullanıcı siteyi hukuka uygun amaçla kullanmayı; altyapıya zarar vermemeyi, yetkisiz erişim denememeyi, sahte sipariş veya ödeme dolandırıcılığı gerçekleştirmemeyi kabul eder. Güvenlik ve hizmet sürekliliği için makul teknik sınırlamalar uygulanabilir.'
        ]
      },
      {
        title: '2. Ürün Bilgileri ve Fiyatlar',
        paragraphs: [
          'Ürün bilgileri mümkün olan en doğru şekilde sunulur. Açık sistem/yazım hatası tespitinde sözleşmenin kurulup kurulmadığı ve tüketici mevzuatı dikkate alınarak işlem değerlendirilir; kurulmuş sözleşme üzerinde tek taraflı ve keyfî fiyat değişikliği yapılmaz.'
        ]
      },
      {
        title: '3. Marka ve Fikri Haklar',
        paragraphs: [
          'SAATCHI’ye ait site tasarımı, özgün metin, logo ve içerik üzerindeki haklar saklıdır. Sitede anılan üçüncü taraf saat markaları kendi hak sahiplerine aittir. Marka adlarının ürün tanımlama amacıyla kullanılması, aksi açıkça belirtilmedikçe yetkili distribütörlük ilişkisi kurmaz.'
        ]
      },
      {
        title: '4. Dış Bağlantılar ve Hizmetler',
        paragraphs: [
          'Harita, ödeme veya iletişim gibi üçüncü taraf hizmetlerine bağlantı verilebilir. Üçüncü tarafın kendi hizmet koşulları ve gizlilik uygulamaları ayrıca geçerlidir. Satıcının kanunen sorumlu olduğu satış süreci yükümlülükleri dış hizmet sağlayıcı kullanılmasıyla ortadan kalkmaz.'
        ]
      },
      {
        title: '5. Değişiklikler',
        paragraphs: [
          'Site kullanım koşulları ileriye etkili olarak güncellenebilir. Geçmiş siparişe bağlanmış sözleşme ve ön bilgilendirme sürümleri sonradan yayımlanan kullanım koşuluyla geriye dönük değiştirilmez.'
        ]
      }
    ]
  },
  {
    slug: 'guvenli-odeme-ve-3d-secure',
    title: 'Güvenli Ödeme ve 3D Secure Protokolü',
    eyebrow: 'Payment Security',
    summary: 'Kartlı ödeme, 3D Secure, ödeme sağlayıcısı ayrıştırması, dolandırıcılık kontrolleri ve ödeme verisi güvenliğine ilişkin müşteri-facing çerçevedir.',
    version: '17.09.2026 · v1.0',
    references: ['6493 sayılı Ödeme ve Menkul Kıymet Mutabakat Sistemleri Kanunu', '6698 sayılı Kişisel Verilerin Korunması Kanunu', '6502 sayılı Tüketicinin Korunması Hakkında Kanun'],
    sections: [
      {
        title: '1. Ödeme Sağlayıcısı',
        paragraphs: [
          'Kartlı tahsilatlar, sipariş sırasında gösterilen banka veya yetkili ödeme hizmeti sağlayıcısı altyapısı üzerinden yürütülür. SAATCHI, ödeme kuruluşunun yerine geçmez; sipariş ve satış ilişkisinin Satıcı tarafı olarak ödeme sonucunu kendi sipariş kaydıyla ilişkilendirir.'
        ]
      },
      {
        title: '2. 3D Secure',
        paragraphs: [
          'Uygun kart ve işlemlerde 3D Secure doğrulaması uygulanabilir. 3D Secure kullanılması tek başına tüm dolandırıcılık riskini ortadan kaldırmaz; riskli görülen işlemlerde ek doğrulama veya teslim kontrolü uygulanabilir.'
        ]
      },
      {
        title: '3. Kart Verisi Güvenliği',
        paragraphs: [
          'Tam kart numarası ve CVV bilgisinin Satıcının kalıcı müşteri kayıtlarında saklanmaması esastır. Kart verisinin girildiği teknik akış ödeme sağlayıcısının güvenli altyapısına yönlendirilebilir veya sağlayıcı tarafından tokenize edilebilir.'
        ]
      },
      {
        title: '4. Yetkisiz İşlem ve Ek Kontrol',
        bullets: [
          'Kart sahibi ile sipariş sahibi arasındaki tutarsızlıkta ek doğrulama istenebilir.',
          'Olağandışı işlem örüntüsü, başarısız denemeler veya risk sinyallerinde işlem bekletilebilir veya reddedilebilir.',
          'Ödeme kesinleşmesi ile ürün teslim onayı ayrı kontrol adımlarıdır.'
        ]
      },
      {
        title: '5. İptal, İade ve Ters İbraz',
        paragraphs: [
          'İade hakkının doğduğu hâllerde ödeme iadesi ilgili mevzuat ve ödeme kuruluşu kuralları çerçevesinde yürütülür. Chargeback/ters ibraz süreçleri kart şeması ve banka prosedürlerine tabi olabilir; bu süreç tüketicinin kanuni haklarını ortadan kaldırmaz.'
        ]
      },
      {
        title: '6. Güvenli İletişim',
        paragraphs: [
          'SAATCHI personeli müşteriden mesaj, telefon veya e-posta yoluyla tek kullanımlık banka doğrulama kodu ya da CVV paylaşmasını istemez. Ödeme konusunda şüphe hâlinde yalnız saatchi.watch üzerindeki resmî iletişim kanalları kullanılmalıdır.'
        ]
      }
    ]
  }
];

export default legalPages;
