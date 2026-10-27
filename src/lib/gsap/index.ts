'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Client-side plugin registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

/**
 * Elementi görünüm alanına (viewport) girdiğinde yumuşakça canlandıran ScrollTrigger hook'u
 */
export function useGsapScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  start?: string;
  y?: number;
  duration?: number;
  delay?: number;
}) {
  const elementRef = useRef<T>(null);

  useGSAP(
    () => {
      if (!elementRef.current || typeof window === 'undefined') return;

      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          y: options?.y ?? 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.8,
          delay: options?.delay ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: options?.start ?? 'top 85%',
            once: true,
          },
        }
      );
    },
    { scope: elementRef }
  );

  return elementRef;
}

/**
 * Liste veya çocuk elementlerini sırayla (stagger) canlandıran hook
 */
export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(options?: {
  childSelector?: string;
  stagger?: number;
  duration?: number;
  y?: number;
}) {
  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      if (!containerRef.current || typeof window === 'undefined') return;

      const selector = options?.childSelector ?? '> *';
      const elements = containerRef.current.querySelectorAll(selector);

      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options?.y ?? 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.6,
          stagger: options?.stagger ?? 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return containerRef;
}
