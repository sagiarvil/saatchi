import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Clock, Scale, HelpCircle, FileCheck, ArrowRight, ShieldAlert, Award, Gem, Search, Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Neden SAATCHI? | Karşılaştırmalı Satın Alma & Ekspertiz Güvencesi',
  description: 'Resmi bayi bekleme listeleri, yurt dışı gümrük riskleri ve Saatchi modeli. 12 adımlı horolojik ekspertiz, The Watch Register sorgusu ve GİB e-Arşiv faturalı teslimat.',
  alternates: {
    canonical: 'https://saatchi.com.tr/neden-saatchi',
  },
  openGraph: {
    title: 'Neden SAATCHI? | Lüks Saat Satın Alma Karar Matrisi',
    description: 'Bekleme sırası olmadan, doğrulanmış ekspertiz ve yasal fatura güvencesiyle lüks saat satın alma rehberi.',
    url: 'https://saatchi.com.tr/neden-saatchi',
    type: 'article',
  },
};

const comparisonData = [
  {
    criterion: 'Temin & Teslimat Süresi',
    dealer: '2 ila 4 Yıl Bekleme Sırası (Model tahsisine bağlı)',
    greyMarket: '3 ila 6 Hafta (Uluslararası kargo gecikmeleri)',
    saatchi: 'Aynı Gün / 24 Saat (Fiziki stoktan anında teslim)',
    winner: 'saatchi',
  },
  {
    criterion: 'Orijinallik & Kalibre Denetimi',
    dealer: 'Resmi Fabrika Çıkışı',
    greyMarket: 'Satıcı beyanına bağlı (Yüksek sahtecilik riski)',
    saatchi: '12 Noktalı Bağımsız Horolog Ekspertizi + Timegrapher Testi',
    winner: 'saatchi',
  },
  {
    criterion: 'Kayıp / Çalıntı Sicil Kontrolü',
    dealer: 'Yalnızca ilk satış tescili',
    greyMarket: 'Belirsiz (Çalıntı seri numarası riski)',
    saatchi: 'The Watch Register & Global Veritabanı Taraması',
    winner: 'saatchi',
  },
  {
    criterion: 'Gümrük Vergisi & Ek Masraf',
    dealer: 'Vergiler dahil liste fiyatı',
    greyMarket: '%30 - %60 Beklenmedik Gümrük & ÖTV Sürprizi',
    saatchi: 'Şeffaf Net Fiyat (Sıfır ek vergi veya gümrük sürprizi)',
    winner: 'saatchi',
  },
  {
    criterion: 'Yasal Zemin & Fatura',
    dealer: 'Yetkili Bayi Faturası',
    greyMarket: 'Yurt dışı proforma veya faturasız risk',
    saatchi: 'GİB e-Arşiv Fatura (ETTN tekil takip) + MASAK 5549 KYC',
    winner: 'saatchi',
  },
  {
    criterion: 'Fiziki İnceleme & Canlı Teslim',
    dealer: 'Vitrin modeli kısıtlı / Teşhir yok',
    greyMarket: 'Yalnızca fotoğraftan alım (Görmeden ödeme)',
    saatchi: 'İzmir Showroom’da Saat Ustası ile Birlikte İnceleme',
    winner: 'saatchi',
  },
  {
    criterion: 'Mekanizma Güvencesi',
    dealer: 'Resmi Üretici Garantisi',
    greyMarket: 'Garantisiz veya satıcı insiyatifinde',
    saatchi: '2 Yıl Mekanizma Güvencesi + Geri Alım Desteği',
    winner: 'saatchi',
  },
];

const expertSteps = [
  { no: '01', title: 'Optik ve Metalurjik Kasa İncelemesi', desc: 'Kasa kenarları, pah kırma açıları, orijinal cila çizgileri ve referans gravürleri mikroskop altında incelenir.' },
  { no: '02', title: 'Kadran & İbre Detay Analizi', desc: 'Font baskı derinliği, lüminesans (Chromalight/Luminova) yaşlanması ve ibre montaj toleransları doğrulanır.' },
  { no: '03', title: 'Kalibre ve Mekanizma Açımı', desc: 'Mekanizma arka kapağı açılarak çarklar, balans yayı, vidalar ve köprülerdeki üretim damgaları taranır.' },
  { no: '04', title: 'Timegrapher Salınım ve Sapma Testi', desc: 'Mekanik hassasiyet, genlik (amplitude) ve vuruş hatası (beat error) 5 farklı konumda dijital olarak ölçülür.' },
  { no: '05', title: 'The Watch Register Uluslararası Sorgusu', desc: 'Seri numarası Interpol ve sigorta şirketleri veritabanlarında kayıp/çalıntı şüphesine karşı taranır.' },
  { no: '06', title: 'Basınç ve Su Sızdırmazlık Testi', desc: 'Kasa contaları ve tepe kilitleri basınç odasında test edilerek fabrikasyon izolasyonu teyit edilir.' },
];

const faqs = [
  {
    q: 'Rolex bekleme listesine girmeden Türkiye’de orijinal saat nasıl satın alınır?',
    a: 'Resmi distribütörlerde Daytona, Submariner veya GMT-Master II gibi çelik spor modeller için 2 ila 4 yıla varan bekleme listeleri bulunmaktadır. SAATCHI, bağımsız saat evi statüsüyle fiziksel stokta hazır bulunan, kondisyonu doğrulanmış ve 12 noktalı horoloji ekspertizinden geçmiş modelleri anında teslim sunar.',
  },
  {
    q: 'SAATCHI resmi distribütör veya yetkili bayi midir?',
    a: 'Hayır. SAATCHI, dürüst ve şeffaf ticaret ilkesi gereği resmi bayi olmadığını açıkça beyan eder. Saatchi, 20 yılı aşkın fiziksel saat tecrübesiyle bağımsız horolojik ekspertiz yapan, orijinalliği %100 kanıtlanmış sıfır ve ikinci el saatleri GİB e-Arşiv faturasıyla sunan tescilli bir saat evidir.',
  },
  {
    q: 'İkinci el lüks saat alırken dolandırıcılık ve sahtecilikten nasıl korunulur?',
    a: 'Lüks saatte sahtecilik yalnız kasa kopyasından ibaret değildir; sahte mekanizma, toplanmış (Franken) parçalar veya çalıntı seri numaraları büyük risk taşır. SAATCHI, her saati mikroskobik optik analize, kalibre açımına, The Watch Register global çalıntı veri tabanı taramasına tabi tutar ve kurumsal ekspertiz raporu düzenler.',
  },
  {
    q: 'Chrono24 veya yurt dışı platformlardan almak yerine neden Saatchi tercih edilmeli?',
    a: 'Yurt dışından alınan saatlerde gümrükte %30 ila %60 arasında ek vergi ve ÖTV sürprizleri çıkmakta, kargo sürecinde kayıp/hasar durumunda muhatap bulmak güçleşmektedir. SAATCHI, Türkiye içi tescilli şirket yapısı, GİB e-Arşiv faturası ve İzmir Showroom’da elden teslim avantajıyla tüm riskleri ortadan kaldırır.',
  },
  {
    q: 'Showroom’da ürünü inceleyip elden teslim alabilir miyim?',
    a: 'Evet. Müşterilerimiz İzmir Buca showroomumuzda önceden randevu alarak ilgilendikleri saati fiziksel olarak inceleyebilir, saat ustamızın gözetiminde mekanizma ve kondisyon kontrolünü canlı gözlemleyerek güvenle teslim alabilir.',
  },
];

export default function NedenSaatchiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://saatchi.com.tr/neden-saatchi#article',
        isPartOf: { '@id': 'https://saatchi.com.tr/#website' },
        headline: 'Neden SAATCHI? Lüks Saat Satın Alma Karar Matrisi ve Ekspertiz Güvencesi',
        description: 'Resmi bayi bekleme sıraları, gri piyasa riskleri ve bağımsız saat evi avantajlarının objektif karşılaştırması.',
        url: 'https://saatchi.com.tr/neden-saatchi',
        inLanguage: 'tr-TR',
        publisher: {
          '@type': 'Organization',
          name: 'SAATCHI',
          url: 'https://saatchi.com.tr',
          logo: 'https://saatchi.com.tr/logo.png',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://saatchi.com.tr/neden-saatchi#faq',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': 'https://saatchi.com.tr/neden-saatchi#howto',
        name: 'Lüks Saat Ekspertiz ve Doğrulama Protokolü (12 Aşama)',
        description: 'SAATCHI bünyesinde satışa sunulan her lüks saatin geçtiği teknik kontrol adımları.',
        step: expertSteps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.title,
          itemListElement: {
            '@type': 'HowToDirection',
            text: step.desc,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f4f0e8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(132,107,50,0.18),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(127,38,43,0.15),transparent_35%),linear-gradient(180deg,#141210_0%,#0d0c0b_100%)] pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-12">
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#846b32]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C2A768]">
                  Karar Destek & Objektif Karşılaştırma
                </p>
              </div>
              <h1 className="text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-[#f7f2ea] sm:text-5xl md:text-6xl">
                Neden SAATCHI? <br />
                <span className="text-[#C2A768] font-normal">Gösteriş değil, doğrulanabilir güven.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-[#c2bab1] sm:text-lg">
                Resmi bayi bekleme listeleri, yurt dışı gümrük sürprizleri ve kontrolsüz platformların riskleri arasında; 
                bağımsız horoloji ekspertizi, GİB e-Arşiv faturası ve anında teslim disipliniyle nerede durduğumuzu şeffafça açıklıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* The Decision Matrix Section */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#846b32]/10 border border-[#846b32]/30 mb-4">
              <Scale className="w-3.5 h-3.5 text-[#C2A768]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C2A768]">Karşılaştırmalı Satın Alma Matrisi</span>
            </div>
            <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-4xl">Hangi Kanal Ne Sunuyor? Objektif Bakış.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9e968e]">
              Bir lüks saat alırken hangi kanalın sizin için en doğru seçenek olduğunu gösteren objektif kriter tablosu.
            </p>
          </div>

          <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#11100f] shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#161412] text-[#E8E2D5]">
                  <th className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-[11px] text-[#8e867f]">Kriter / Özellik</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-[11px] text-[#aaa29a]">Yetkili Bayi (Distribütör)</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-[11px] text-[#aaa29a]">Yurt Dışı / Pazar Yeri (Chrono24 vb.)</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-[11px] text-[#C2A768] bg-[#846b32]/10">SAATCHI Modeli</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#846b32]" />
                      {row.criterion}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#9e968e]">{row.dealer}</td>
                    <td className="py-4 px-4 sm:px-6 text-[#9e968e]">{row.greyMarket}</td>
                    <td className="py-4 px-4 sm:px-6 text-[#F7F2EA] font-medium bg-[#846b32]/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C2A768] flex-shrink-0" />
                        <span>{row.saatchi}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-[11px] text-[#736B5E] leading-relaxed">
            * Tablodaki veriler bağımsız piyasa gözlemleri ve müşteri deneyimleri üzerinden derlenmiştir. SAATCHI resmi distribütör değildir; tescilli bağımsız saat evidir.
          </p>
        </section>

        {/* 12-Step Horology Inspection Protocol */}
        <section className="border-y border-white/10 bg-[#11100f] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-14 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C2A768]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C2A768]">Kusursuzluk Standartı</span>
              </div>
              <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-4xl">12 Aşamalı Horolojik Doğrulama Protokolü</h2>
              <p className="mt-4 text-sm leading-7 text-[#9e968e]">
                Vitrindeki hiçbir saat yalnız beyana güvenilerek satışa sunulmaz. Her mekanizma ve referans, bağımsız saat ustalarımızın teknik denetim zincirinden geçer.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3 stagger-group">
              {expertSteps.map((step) => (
                <article key={step.no} className="fade-up-item bg-[#0d0c0b] p-8 flex flex-col justify-between hover:bg-[#141210] transition-colors">
                  <div>
                    <span className="text-xs font-mono tracking-widest text-[#846b32] font-semibold">{step.no}</span>
                    <h3 className="mt-4 text-lg font-medium text-white">{step.title}</h3>
                    <p className="mt-3 text-xs sm:text-sm leading-6 text-[#9e968e]">{step.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#736B5E]">Teknik Doğrulama</span>
                    <Check className="w-3.5 h-3.5 text-[#C2A768]" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Legal & Compliance Proofs */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#846b32]/10 border border-[#846b32]/30 mb-4">
                <FileCheck className="w-3.5 h-3.5 text-[#C2A768]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C2A768]">Yasal Güvence</span>
              </div>
              <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-4xl">GİB e-Arşiv Fatura ve MASAK Mevzuat Tam Uyumu</h2>
              <p className="mt-6 text-sm leading-7 text-[#aaa29a]">
                Yüksek montanlı lüks saat alımlarında kayıt dışılık veya sahte fatura mağduriyetleri en büyük sektörel risklerdendir. 
                SAATCHI bünyesinde yapılan her işlem:
              </p>
              <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-[#c2bab1]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C2A768] mt-0.5 flex-shrink-0" />
                  <span><strong>GİB e-Arşiv Fatura:</strong> Saat markası, referansı ve benzersiz ETTN kimlik numarasıyla faturaya tescil edilir.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C2A768] mt-0.5 flex-shrink-0" />
                  <span><strong>MASAK & TCK 5549 KYC:</strong> Kimlik doğrulama ve yasal zemin ile suç gelirlerinin aklanmasına karşı %100 korumalıdır.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C2A768] mt-0.5 flex-shrink-0" />
                  <span><strong>The Watch Register:</strong> Uluslararası çalıntı veri tabanı sorgu sertifikası müşteriyle paylaşılır.</span>
                </li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(132,107,50,0.1),transparent_70%),#121110] p-8 sm:p-10">
              <h3 className="text-xl font-medium text-white">VIP Showroom Randevusu</h3>
              <p className="mt-3 text-xs sm:text-sm text-[#9e968e] leading-relaxed">
                İzmir Buca’daki showroomumuzda saatleri canlı inceleyebilir, saat ustamızın timegrapher test cihazındaki vuruş ve sapma değerlerini bizzat izleyebilirsiniz.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 bg-[#F4F0E8] text-[#141210] px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                >
                  Showroom Randevusu Al <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/905419305372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:border-[#846b32] hover:bg-[#846b32]/10 transition-all"
                >
                  WhatsApp ile Sor
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* AI & Search Engine FAQ Section */}
        <section className="border-t border-white/10 bg-[#0d0c0b] py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
                <HelpCircle className="w-3.5 h-3.5 text-[#C2A768]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C2A768]">Sıkça Sorulan Sorular</span>
              </div>
              <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-4xl">Merak Edilenler ve Satın Alma Kararları</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-xl bg-[#121110] p-6 hover:border-white/20 transition-colors">
                  <h3 className="text-base font-medium text-white flex items-start gap-3">
                    <span className="text-[#846b32] font-mono text-sm">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#9e968e] pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
