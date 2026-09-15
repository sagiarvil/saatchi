import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Clock, ChevronRight } from 'lucide-react';

export default function IletisimPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <main className="flex-grow flex flex-col items-center w-full pb-32">
        
        {/* PREMIUM HERO SECTION */}
        <section className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-black border-b border-[#222]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-black to-black z-0"></div>
          
          <div className="relative z-20 text-center px-4 max-w-4xl mt-20">
            <h2 className="text-[#C2A768] tracking-[0.4em] uppercase text-xs md:text-sm font-extrabold mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-[#C2A768]/50"></span>
              VIP Müşteri Hizmetleri
              <span className="w-8 h-px bg-[#C2A768]/50"></span>
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight tracking-tight">
              Ayrıcalıklı <span className="text-white/70 italic">İletişim</span>
            </h1>
          </div>
        </section>

        {/* İLETİŞİM BİLGİLERİ */}
        <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-30 -mt-20">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Showroom Card */}
            <div className="flex flex-col items-center text-center p-12 bg-[#0d0d0d] border border-[#222] hover:border-[#C2A768]/40 transition-colors duration-500 shadow-2xl">
              <MapPin className="w-10 h-10 text-[#C2A768] mb-8" strokeWidth={1} />
              <h4 className="text-lg font-serif text-white mb-4 uppercase tracking-[0.2em]">Fiziksel Showroom</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-8 font-light" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                Merkez Mağazamız<br/>
                Menderes Caddesi No:231/B<br/>
                Buca / İzmir<br/>
                Şirinyer / Çarşı Meydanı Mevkii
              </p>
              <a href="https://share.google/mhx0N9skVc5ZibBPM" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-2 text-[#C2A768] hover:text-white uppercase tracking-widest text-[10px] font-bold transition-colors">
                Haritada Aç <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* WhatsApp Card - Highlighted */}
            <div className="flex flex-col items-center text-center p-12 bg-gradient-to-b from-[#151515] to-[#0a0a0a] border border-[#C2A768]/30 transform md:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <MessageCircle className="w-12 h-12 text-[#C2A768] mb-8" strokeWidth={1} />
              <h4 className="text-lg font-serif text-white mb-4 uppercase tracking-[0.2em]">VIP WhatsApp</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-6 font-light" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                Anlık Ekspertiz, Takas & Fiyat Bilgisi İçin Doğrudan Temsilciye Bağlanın.
              </p>
              <a href="https://wa.me/905419305372" className="text-2xl font-light text-white mb-8 hover:text-[#C2A768] transition-colors tracking-wider">
                +90 541 930 53 72
              </a>
              <a href="https://wa.me/905419305372?text=Merhaba,%20Showroom%20randevusu%20ve%20urunler%20hakkinda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="mt-auto bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full uppercase tracking-widest text-[10px] font-bold transition-all w-full text-center">
                Mesaj Gönder
              </a>
            </div>

            {/* Phone Card */}
            <div className="flex flex-col items-center text-center p-12 bg-[#0d0d0d] border border-[#222] hover:border-[#C2A768]/40 transition-colors duration-500 shadow-2xl">
              <Phone className="w-10 h-10 text-[#C2A768] mb-8" strokeWidth={1} />
              <h4 className="text-lg font-serif text-white mb-4 uppercase tracking-[0.2em]">Müşteri Temsilcisi</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-6 font-light" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                Özel Danışmanlık ve Santral Hattımız
              </p>
              <a href="tel:+905398234141" className="text-2xl font-light text-white mb-8 hover:text-[#C2A768] transition-colors tracking-wider">
                +90 539 823 41 41
              </a>
              <div className="mt-auto w-full border-t border-[#222] pt-6 flex flex-col items-center">
                <Clock className="w-4 h-4 text-[#C2A768]/50 mb-2" />
                <p className="text-white/30 text-[10px] tracking-widest uppercase">Pazartesi – Cumartesi</p>
                <p className="text-white/50 text-sm mt-1">09:00 – 19:00</p>
              </div>
            </div>

          </div>

          {/* ACTIVE GOOGLE MAP EMBED - CINEMATIC */}
          <div className="mt-24 w-full h-[500px] border border-[#222] relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12509.734898144078!2d27.1353118!3d38.3846665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbdfa0026e6495%3A0xc3458c55dc4b321a!2zxZ5pcmlueWVyLCBCdWNhL8Swem1pcg!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

      </main>
    </div>
  );
}
