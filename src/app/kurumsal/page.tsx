import Link from 'next/link';
import { ShieldCheck, Target, Gem, History } from 'lucide-react';

export default function KurumsalPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <main className="flex-grow flex flex-col items-center w-full pb-32">
        
        {/* ULTRA PREMIUM HERO */}
        <section className="relative w-full h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-black border-b border-[#222]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-black to-black z-0"></div>
          
          <div className="relative z-20 text-center px-4 max-w-4xl mt-20">
            <h2 className="text-[#C2A768] tracking-[0.4em] uppercase text-xs md:text-sm font-extrabold mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-[#C2A768]/50"></span>
              Miras & Mükemmellik
              <span className="w-12 h-px bg-[#C2A768]/50"></span>
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight tracking-tight">
              Lüksün 20 Yıllık<br/><span className="text-white/70 italic">Serüveni</span>
            </h1>
          </div>
        </section>

        {/* HİKAYEMİZ - ELIT LAYOUT */}
        <section className="w-full max-w-6xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-[#C2A768] text-[10px] tracking-[0.3em] uppercase font-bold mb-4">Saatchi & Semih Sonbahar</h3>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-snug">
                Zamanı Değil,<br/>Prestiji Taşıyın.
              </h2>
              <div className="space-y-6 text-white/50 font-light leading-relaxed text-sm md:text-base text-justify" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                <p>
                  20 yılı aşkın süredir, İzmir'in kalbinde değişmeyen adresimizde, saat tutkunlarına sadece bir zaman ölçer değil, nesilden nesile aktarılacak bir miras sunuyoruz. Saatchi olarak lüksü bir gösteriş aracı değil, köklü bir zanaat ve mühendislik harikası olarak tanımlıyoruz.
                </p>
                <p>
                  Rolex'ten Patek Philippe'e, dünyanın en kusursuz ustalarının elinden çıkan saatleri, uluslararası ekspertiz güvencesiyle sizlere ulaştırıyoruz. İster sıfır, ister ikinci el kusursuz durumdaki koleksiyon parçaları olsun; her bir saatimiz, <strong>Maison</strong> standartlarında sertifikalandırılır.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[500px] w-full bg-[#111] rounded-2xl overflow-hidden border border-[#222]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C2A768]/10 to-transparent"></div>
              {/* Abstract premium visual placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <Gem className="w-32 h-32 text-[#C2A768]/20" strokeWidth={0.5} />
              </div>
            </div>
          </div>
        </section>

        {/* DEĞERLERİMİZ - GRID */}
        <section className="w-full bg-[#050505] border-y border-[#222] py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-10 border border-[#222] bg-[#0a0a0a] hover:border-[#C2A768]/50 transition-all duration-500 group">
              <ShieldCheck className="w-10 h-10 text-[#C2A768] mb-6 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <h4 className="text-lg font-serif text-white mb-4 uppercase tracking-wider">%100 Orijinallik</h4>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                Her saat, uluslararası standartlarda ekspertiz edilerek, global garanti belgesi ve orijinal sertifikası ile teslim edilir. Asla taviz vermediğimiz kırmızı çizgimizdir.
              </p>
            </div>

            <div className="p-10 border border-[#222] bg-[#0a0a0a] hover:border-[#C2A768]/50 transition-all duration-500 group">
              <Target className="w-10 h-10 text-[#C2A768] mb-6 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <h4 className="text-lg font-serif text-white mb-4 uppercase tracking-wider">VIP Zırhlı Teslimat</h4>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                Satın aldığınız her Masterpiece eser, yüksek güvenlikli özel zırhlı kurye ağı ile sigortalı olarak doğrudan adresinize ve şahsınıza teslim edilir.
              </p>
            </div>

            <div className="p-10 border border-[#222] bg-[#0a0a0a] hover:border-[#C2A768]/50 transition-all duration-500 group">
              <History className="w-10 h-10 text-[#C2A768] mb-6 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <h4 className="text-lg font-serif text-white mb-4 uppercase tracking-wider">20 Yıllık Kökler</h4>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                Fiziksel showroom'umuz tam 20 yıldır aynı lokasyonda hizmet veriyor. Güvenin zamanla inşa edildiğini biliyor ve bu köklerle gurur duyuyoruz.
              </p>
            </div>

          </div>
        </section>

        {/* CTA BÖLÜMÜ */}
        <section className="w-full pt-32 text-center flex flex-col items-center px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-10">Kusursuzluğu Deneyimleyin</h2>
          <Link href="/elit-saat/koleksiyon" className="relative overflow-hidden bg-gradient-to-br from-[#111] to-[#222] text-[#C2A768] font-extrabold tracking-[0.2em] uppercase text-xs px-12 py-5 rounded-full text-center hover:shadow-[0_0_30px_rgba(194,167,104,0.15)] transition-all duration-500 border border-[#C2A768]/30">
            Elit Koleksiyonu İncele
          </Link>
        </section>

      </main>
    </div>
  );
}
