'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Apple Motion Architecture — Scroll-Driven Reveal with Staggered Fade-Up
 * 
 * 1. Fade-Up: opacity: 0 -> 1, translateY: 24px -> 0
 * 2. Stagger Effect: Kardeş öğeler arasında 80ms aralıklı akıcı domino etkisi
 * 3. Scroll-Triggered: Ekran görünüm alanına girildiğinde tetikleme (IntersectionObserver)
 * 4. Performans & SEO: Botlar için anında görünür, tarayıcıda GPU donanım hızlandırmalı
 */
export function ScrollRevealProvider() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Tarayıcı sınıfını aktifleştir
    document.documentElement.classList.add('apple-motion-active');

    // Temizlik ve observer başlatma
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-revealed');

            // Eğer ebeveyn bir stagger-container ise alt çocukları kademeli tetikle
            const children = target.querySelectorAll<HTMLElement>('.stagger-child');
            if (children.length > 0) {
              children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 80}ms`;
                child.classList.add('is-revealed');
              });
            }

            // Bir kez tetiklendikten sonra gözlemden çıkar (Apple mantığı: tek yönlü pürüzsüz kalış)
            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px', // Ekranın %80-85'ine ulaşıldığında erken tetikleme
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    // Sayfadaki uygun hedefleri tara ve bağla
    const scanAndObserve = () => {
      // 1. Doğrudan işaretlenmiş öğeler
      const explicitTargets = document.querySelectorAll<HTMLElement>(
        '[data-reveal], .reveal-on-scroll, .fade-up'
      );
      explicitTargets.forEach((el) => observer.observe(el));

      // 2. Ana sayfa ve alt sayfa grid vitrinlerindeki kartlar (Kademeli Stagger Otomasyonu)
      const gridContainers = document.querySelectorAll<HTMLElement>(
        'main section .grid, .stagger-group, main .stagger-container'
      );

      gridContainers.forEach((container) => {
        const children = Array.from(container.children) as HTMLElement[];
        if (children.length > 1) {
          children.forEach((child, idx) => {
            child.classList.add('fade-up-item');
            // 80ms domino stagger etkisi
            child.style.transitionDelay = `${(idx % 12) * 80}ms`;
            observer.observe(child);
          });
        }
      });

      // 3. Bölüm başlıkları ve hero alt blokları
      const sectionHeaders = document.querySelectorAll<HTMLElement>(
        'main section h2, main section h1, main section .section-header'
      );
      sectionHeaders.forEach((header) => {
        if (!header.classList.contains('fade-up-item')) {
          header.classList.add('fade-up-item');
          observer.observe(header);
        }
      });
    };

    // İlk tarama
    const timer = setTimeout(scanAndObserve, 50);

    // DOM dinamik güncellemeleri için hafif MutationObserver
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mutationObserver.observe(mainElement, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
