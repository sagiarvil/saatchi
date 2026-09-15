'use client';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PremiumBackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ana sayfada veya özel admin sayfalarında göstermiyoruz
    if (pathname === '/' || pathname.startsWith('/admin') || pathname.startsWith('/vip-checkout')) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[40] group flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-[#C2A768] text-white/50 hover:text-[#C2A768] transition-all duration-500 rounded-full pl-4 pr-5 py-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(194,167,104,0.2)]"
    >
      <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Geri</span>
    </button>
  );
}
