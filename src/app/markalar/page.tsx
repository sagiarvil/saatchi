import Link from 'next/link';
import { ArrowUpRight, Crown, Gem, Gauge, Layers3, Watch, Sparkles, CircleDot, Clock3, ChevronRight, Compass } from 'lucide-react';
import { GiantWatermark } from '@/components/ui/GiantWatermark';

const ALL_BRANDS = [
  { no: '01', name: 'Tissot', slug: 'tissot', eyebrow: 'Swiss Watchmaking', note: 'PRX, Seastar, Gentleman ve Le Locle serileriyle asırlık İsviçre mükemmelliği.', Icon: Watch },
  { no: '02', name: 'Seiko', slug: 'seiko', eyebrow: 'Japanese Precision', note: 'Prospex, Presage, King Seiko ve Seiko 5 serileriyle Japon mekanik ustalığı.', Icon: Compass },
  { no: '03', name: 'Versace', slug: 'versace', eyebrow: 'Italian Haute Couture', note: 'Medusa arması, Greca motifi ve İtalyan lüksünün görkemli çizgisi.', Icon: Gem },
  { no: '04', name: 'Casio', slug: 'casio', eyebrow: 'High-Tech & Endurance', note: 'G-Shock, Edifice, Pro Trek ve efsanevi Casio dayanıklılık teknolojisi.', Icon: Gauge },
  { no: '05', name: 'Swatch', slug: 'swatch', eyebrow: 'Swiss Pop & Culture', note: 'Yenilikçi İsviçre renkleri, hafif biyo-seramik kasalar ve ikonik tasarım.', Icon: Layers3 },
  { no: '06', name: 'Carren', slug: 'carren', eyebrow: 'Contemporary Elegance', note: 'Erkek ve Kadın koleksiyonlarıyla modern ve çağdaş saatçilik estetiği.', Icon: Clock3 },
  { no: '07', name: 'Calvin Klein', slug: 'calvin-klein', eyebrow: 'New York Minimalism', note: 'Yalın hatlar, çağdaş çizgiler ve günlük kullanıma uygun modern zarafet.', Icon: CircleDot },
  { no: '08', name: 'Michael Kors', slug: 'michael-kors', eyebrow: 'American Jet-Set', note: 'Işıltılı podyum stili, lüks metalik tonlar ve zarif kronograflar.', Icon: Sparkles },
  { no: '09', name: 'Guess', slug: 'guess', eyebrow: 'Trendsetter Design', note: 'Cesur, enerjik ve sokak modasına yön veren dinamik saat modelleri.', Icon: Crown },
  { no: '10', name: 'Welder', slug: 'welder', eyebrow: 'Moody Time Concept', note: 'Işığa göre renk değiştiren fotokromik cam ve sol kurma kollu özgün tasarım.', Icon: Compass },
  { no: '11', name: 'Diesel', slug: 'diesel', eyebrow: 'Brave & Industrial', note: 'Endüstriyel cesaret, iri kadranlar ve tavizsiz maskülen duruş.', Icon: Gauge },
  { no: '12', name: 'Fossil', slug: 'fossil', eyebrow: 'Authentic Vintage', note: 'Amerikan vintage ruhu, zamansız deri kayışlar ve klasik saat sanatı.', Icon: Watch },
];

function BrandCard({ brand }: { brand: (typeof ALL_BRANDS)[number] }) {
  const { no, name, slug, eyebrow, note, Icon } = brand;
  return (
    <Link
      href={`/markalar/${slug}`}
      className="group block relative rounded-2xl border border-white/10 bg-[#121110] p-6 sm:p-7 md:p-8 hover:border-[#846b32]/50 hover:bg-[#181716] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-widest text-[#846b32] font-semibold">{no}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A29E] font-medium">{eyebrow}</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#A8A29E] group-hover:text-white group-hover:border-[#846b32] transition-colors">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C2A768] group-hover:bg-[#846b32]/20 group-hover:border-[#846b32]/40 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl sm:text-2xl font-serif text-[#F5F2EB] group-hover:text-[#C2A768] transition-colors tracking-wide">
          {name}
        </h3>
      </div>

      <p className="mt-4 text-xs sm:text-sm text-[#A8A29E] leading-relaxed font-light">
        {note}
      </p>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#846b32] font-medium tracking-wide">
        <span>Koleksiyonu İncele</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export default function MarkalarPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <GiantWatermark text="MARKALAR" theme="dark" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#846b32]/10 border border-[#846b32]/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2A768] animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C2A768]">
              Resmi Koleksiyonlar & Portföy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F2EB] tracking-tight uppercase">
            Dünyaca Ünlü Saat Markaları
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#A8A29E] font-light leading-relaxed">
            İsviçre geleneğinden Japon hassasiyetine, İtalyan yüksek modasından çağdaş Amerikan çizgilerine uzanan 12 seçkin saat evi Saatchi & Co. güvencesiyle sunuluyor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ALL_BRANDS.map(b => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
