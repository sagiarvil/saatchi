import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileCheck2, Scale, ShieldCheck } from 'lucide-react';
import legalPages, { sellerIdentity } from '@/data/legal/legal-pages';
import { legalExtensions } from '@/data/legal/legal-extensions';

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalPages.find((item) => item.slug === slug);

  if (!page) notFound();

  const sections = [...page.sections, ...(legalExtensions[slug] || [])];

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#201b18]">
      <section className="border-b border-black/10 bg-[#11100f] text-[#f4f0e8]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16 lg:px-12">
          <Link href="/" className="mb-9 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d7cec2]/65 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.4} /> Ana Sayfa
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.29em] text-[#c18e91]">{page.eyebrow}</p>
              <h1 className="max-w-4xl text-3xl font-medium leading-[1.07] tracking-[-0.038em] text-[#fbf7f0] sm:text-4xl md:text-5xl">{page.title}</h1>
              <p className="mt-6 max-w-3xl text-[15px] leading-8 text-[#cdc5bc]">{page.summary}</p>
            </div>

            <div className="border-l border-[#7f262b] pl-5 text-xs leading-6 text-[#bdb4aa]">
              <p className="font-medium text-[#f4f0e8]">Belge sürümü</p>
              <p>{page.version}</p>
              <p className="mt-3">Yürürlükteki emredici mevzuat hükümleri saklıdır. Somut siparişe özgü ürün, fiyat, ödeme ve teslim kayıtları bu metinlerle birlikte değerlendirilir.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 md:py-14 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-12">
        <aside className="self-start lg:sticky lg:top-24">
          <div className="border border-black/10 bg-[#ebe3d8] p-5 shadow-[0_14px_45px_rgba(49,39,31,.06)]">
            <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#6f2025]">
              <FileCheck2 className="h-4 w-4" strokeWidth={1.5} /> Satıcı / İşletmeci
            </div>
            <dl className="space-y-4 text-[13px] leading-6 text-[#514943]">
              <div><dt className="text-[10px] uppercase tracking-[0.15em] text-[#80776f]">Ticari işletme</dt><dd className="mt-1 font-medium text-[#241f1c]">{sellerIdentity.operator}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.15em] text-[#80776f]">Dijital kanal</dt><dd className="mt-1">{sellerIdentity.brand} / {sellerIdentity.channel}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.15em] text-[#80776f]">Showroom</dt><dd className="mt-1">{sellerIdentity.address}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.15em] text-[#80776f]">İletişim</dt><dd className="mt-1">{sellerIdentity.phone}<br />{sellerIdentity.email}</dd></div>
            </dl>
          </div>

          <div className="mt-5 border-t border-black/10 pt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#80776f]">Belge içeriği</p>
            <ol className="space-y-2 border-l border-black/10 pl-4">
              {sections.map((section, index) => (
                <li key={`${section.title}-${index}`} className="text-[11px] leading-5 text-[#675f59]">{section.title}</li>
              ))}
            </ol>
          </div>

          <div className="mt-6 border-t border-black/10 pt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#80776f]">İlgili düzenlemeler</p>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {page.references.map((reference) => <span key={reference} className="border border-black/10 bg-white/60 px-3 py-2 text-[11px] leading-5 text-[#514943]">{reference}</span>)}
            </div>
          </div>
        </aside>

        <article className="border border-black/10 bg-[#fffdfa] shadow-[0_28px_85px_rgba(45,36,31,.10)]">
          <div className="border-b border-black/10 bg-[#fbf7f0] px-6 py-5 sm:px-9 md:px-12">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-[#6f665f]">
              <span className="inline-flex items-center gap-2"><Scale className="h-4 w-4 text-[#7f262b]" strokeWidth={1.4} /> T.C. hukuki uyum seti</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#7f262b]" strokeWidth={1.4} /> SAATCHI işlem kanalı</span>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-9 sm:py-10 md:px-12 md:py-12">
            {sections.map((section, index) => (
              <section key={`${section.title}-${index}`} className={`${index === 0 ? '' : 'mt-12 border-t border-black/10 pt-10'}`}>
                <h2 className="max-w-3xl text-xl font-semibold leading-8 tracking-[-0.015em] text-[#241f1c] sm:text-[23px]">{section.title}</h2>

                {section.paragraphs?.map((paragraph, pIndex) => (
                  <p key={`${pIndex}-${paragraph.slice(0, 24)}`} className="mt-4 max-w-[76ch] text-[16px] leading-[1.85] text-[#4a423d]">{paragraph}</p>
                ))}

                {section.bullets && (
                  <ul className="mt-5 max-w-[76ch] space-y-3.5">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={`${bIndex}-${bullet.slice(0, 24)}`} className="flex gap-3 text-[16px] leading-[1.8] text-[#4a423d]">
                        <span className="mt-[12px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7f262b]" /><span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="border-t border-black/10 bg-[#f2ebe2] px-6 py-7 text-[13px] leading-7 text-[#5d554f] sm:px-9 md:px-12">
            <p>Bu metin genel hukuki ve operasyonel çerçeveyi açıklar; somut siparişte ürün, fiyat, ödeme, teslim, müşteri bilgileri ve sipariş anında kabul edilen belge sürümleri birlikte değerlendirilir. Emredici tüketici ve kişisel veri mevzuatı hükümleri bu metinle daraltılamaz.</p>
          </div>
        </article>
      </main>
    </div>
  );
}
