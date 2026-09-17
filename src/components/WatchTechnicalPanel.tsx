import { Box, CircleGauge, Gem, PackageCheck, Ruler, ShieldCheck, Waves } from 'lucide-react';

type WatchLike = {
  brand?: string;
  modelName?: string;
  condition?: string;
  mekanizma?: string;
  movement?: string;
  kasaCapi?: string;
  caseSize?: string;
  cam?: string;
  glass?: string;
  suGecirmezlik?: string;
  waterResistance?: string;
};

function firstValue(...values: unknown[]) {
  return values.find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
}

function caseSizeFromName(modelName = '') {
  const match = modelName.match(/\b(\d{2}(?:[.,]\d)?)\s*mm\b/i);
  return match ? `${match[1].replace(',', '.')} mm` : undefined;
}

export default function WatchTechnicalPanel({ watch }: { watch: WatchLike }) {
  const movement = firstValue(watch.mekanizma, watch.movement) || 'Ürün bazında teyit edilir';
  const caseSize = firstValue(watch.kasaCapi, watch.caseSize) || caseSizeFromName(watch.modelName) || 'Ürün bazında teyit edilir';
  const glass = firstValue(watch.cam, watch.glass) || 'Ürün bazında teyit edilir';
  const water = firstValue(watch.suGecirmezlik, watch.waterResistance) || 'Ürün bazında teyit edilir';

  const specs = [
    { label: 'MEKANİZMA', value: movement, Icon: CircleGauge },
    { label: 'KASA ÇAPI', value: caseSize, Icon: Ruler },
    { label: 'CAM TİPİ', value: glass, Icon: Gem },
    { label: 'SU GEÇİRMEZLİK', value: water, Icon: Waves },
  ];

  return (
    <section className="mt-10 border-t border-[#e8e1d7] pt-8" aria-labelledby="technical-specs-title">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7f262b]">Ürün kimliği</p>
          <h2 id="technical-specs-title" className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#171514]">Teknik Özellikler</h2>
        </div>
        <p className="max-w-lg text-right text-xs leading-5 text-[#7b746e]">Katalogda bulunmayan teknik değerler tahmin edilmez; ürün/referans bazında satış öncesinde teyit edilir.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {specs.map(({ label, value, Icon }) => (
          <div key={label} className="group flex min-h-[118px] items-center gap-5 rounded-2xl border border-[#e5ddd2] bg-[#fffdfa] px-6 py-5 shadow-[0_8px_30px_rgba(31,23,18,.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cdbbb0] hover:shadow-[0_14px_36px_rgba(31,23,18,.07)]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4efea] text-[#7f262b]"><Icon className="h-5 w-5" strokeWidth={1.4} /></div>
            <div className="min-w-0"><p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#77716d]">{label}</p><p className="mt-1.5 text-base font-semibold leading-snug text-[#171514] sm:text-lg">{value}</p></div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[#e5ddd2] bg-[#e5ddd2] md:grid-cols-2">
        <div className="flex gap-4 bg-[#fffdfa] p-6"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#7f262b]" strokeWidth={1.4} /><div><h3 className="font-semibold text-[#171514]">Orijinallik ve Ürün Kontrolü</h3><p className="mt-1.5 text-sm leading-6 text-[#716a65]">Saatin referansı, kondisyonu, kutu/belge durumu ve satışa esas özellikleri ürün bazında kontrol edilir.</p></div></div>
        <div className="flex gap-4 bg-[#fffdfa] p-6"><PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#7f262b]" strokeWidth={1.4} /><div><h3 className="font-semibold text-[#171514]">Sigortalı ve Kontrollü Teslimat</h3><p className="mt-1.5 text-sm leading-6 text-[#716a65]">Teslim yöntemi ürün ve işlem tutarına göre belirlenir; yüksek değerli işlemlerde showroom teslimi uygulanabilir.</p></div></div>
        <div className="flex gap-4 bg-[#fffdfa] p-6"><Box className="mt-0.5 h-5 w-5 shrink-0 text-[#7f262b]" strokeWidth={1.4} /><div><h3 className="font-semibold text-[#171514]">Kutu / Belge Durumu</h3><p className="mt-1.5 text-sm leading-6 text-[#716a65]">Kutu, sertifika ve aksesuar kapsamı her ürünün kendi kondisyon kaydı üzerinden satış öncesi netleştirilir.</p></div></div>
        <div className="flex gap-4 bg-[#fffdfa] p-6"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#7f262b]" strokeWidth={1.4} /><div><h3 className="font-semibold text-[#171514]">Güvenli Ödeme Zinciri</h3><p className="mt-1.5 text-sm leading-6 text-[#716a65]">Ödeme, aktif banka veya yetkili ödeme kuruluşunun güvenli altyapısında tamamlanır ve işlem kaydı merkez sisteme aktarılır.</p></div></div>
      </div>
    </section>
  );
}
