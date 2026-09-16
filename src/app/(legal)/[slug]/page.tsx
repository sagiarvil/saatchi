import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileCheck2, Scale, ShieldCheck } from 'lucide-react';
import legalPages, { sellerIdentity } from '@/data/legal/legal-pages';

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalPages.find((item) => item.slug === slug);

  if (!page) notFound();

  return (
    <div className="min-h-screen bg-[#f4f0e8] text-[#251f1d]">
      <section className="border-b border-black/10 bg-[#121110] text-[#f4f0e8]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#d7cec2]/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
            Ana Sayfa
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9b5d5d]">
                {page.eyebrow}
              </p>
              <h1 className="max-w-4xl text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-[#f7f2ea] sm:text-4xl md:text-5xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-3xl text-sm leading-7 text-[#c8c0b7] md:text-[15px]">
                {page.summary}
              </p>
            </div>

            <div className="border-l border-[#7f262b]/70 pl-5 text-xs leading-6 text-[#bdb4aa]">
              <p className="font-medium text-[#f4f0e8]">Belge sürümü</p>
              <p>{page.version}</p>
              <p className="mt-3">Yürürlükteki emredici mevzuat hükümleri saklıdır.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 md:py-14 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-12">
        <aside className="self-start lg:sticky lg:top-24">
          <div className="border border-black/10 bg-[#eee7dc] p-5">
            <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f2025]">
              <FileCheck2 className="h-4 w-4" strokeWidth={1.5} />
              Satıcı / İşletmeci
            </div>
            <dl className="space-y-4 text-[13px] leading-5 text-[#5d554f]">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-[#8a8179]">Ticari işletme</dt>
                <dd className="mt-1 font-medium text-[#2d2825]">{sellerIdentity.operator}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-[#8a8179]">Dijital kanal</dt>
                <dd className="mt-1">{sellerIdentity.brand} / {sellerIdentity.channel}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-[#8a8179]">Showroom</dt>
                <dd className="mt-1">{sellerIdentity.address}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-[#8a8179]">İletişim</dt>
                <dd className="mt-1">{sellerIdentity.phone}<br />{sellerIdentity.email}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 border-t border-black/10 pt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8a8179]">İlgili düzenlemeler</p>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {page.references.map((reference) => (
                <span key={reference} className="border border-black/10 bg-white/55 px-3 py-2 text-[11px] leading-4 text-[#5b524c]">
                  {reference}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <article className="border border-black/10 bg-[#fffdf9] shadow-[0_24px_70px_rgba(45,36,31,0.08)]">
          <div className="border-b border-black/10 px-6 py-5 sm:px-9">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#766d66]">
              <span className="inline-flex items-center gap-2"><Scale className="h-4 w-4 text-[#7f262b]" strokeWidth={1.4} /> T.C. hukuki uyum seti</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#7f262b]" strokeWidth={1.4} /> SAATCHI işlem kanalı</span>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-9 sm:py-10 md:px-12">
            {page.sections.map((section, index) => (
              <section key={section.title} className={`${index === 0 ? '' : 'mt-11 border-t border-black/8 pt-9'}`}>
                <h2 className="text-xl font-semibold leading-8 tracking-[-0.015em] text-[#2b2522] sm:text-[22px]">
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 max-w-3xl text-[15px] leading-7 text-[#5a514b]">
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-5 max-w-3xl space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[15px] leading-7 text-[#5a514b]">
                        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7f262b]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="border-t border-black/10 bg-[#f7f2ea] px-6 py-6 text-xs leading-6 text-[#6c625b] sm:px-9 md:px-12">
            <p>
              Bu metin, SAATCHI satış kanalının işlem ve bilgilendirme çerçevesini açıklar. Somut siparişte ürün, fiyat, ödeme, teslim ve müşteri bilgileri siparişe özgü kayıtlarla birlikte değerlendirilir.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
