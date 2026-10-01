'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Watch, Calculator, GitCompare, MessageCircle } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  // Admin sayfalarında mobil alt barı gösterme
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    {
      label: 'Ana Sayfa',
      href: '/',
      icon: Home,
      isActive: pathname === '/'
    },
    {
      label: 'Koleksiyon',
      href: '/markalar',
      icon: Watch,
      isActive: pathname.startsWith('/markalar') || pathname.startsWith('/elit-saat') || pathname.startsWith('/saatler')
    },
    {
      label: 'Değerleme',
      href: '/saat-degerleme',
      icon: Calculator,
      isActive: pathname === '/saat-degerleme'
    },
    {
      label: 'Karşılaştır',
      href: '/karsilastir',
      icon: GitCompare,
      isActive: pathname === '/karsilastir'
    },
    {
      label: 'VIP Destek',
      href: 'https://wa.me/905000000000?text=Merhaba%2C%20SAATCHI%20l%C3%BCks%20saat%20koleksiyonu%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
      icon: MessageCircle,
      isExternal: true
    }
  ];

  return (
    <nav 
      aria-label="Mobil Hızlı Gezinme"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-md border-t border-[#846b32]/30 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.8)]"
      style={{ paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const activeClass = item.isActive ? 'text-[#846b32]' : 'text-neutral-400 hover:text-neutral-200';
          
          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-1 py-1 transition-colors ${activeClass}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-1 py-1 transition-colors ${activeClass}`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
