'use client';
import { useState } from 'react';
import Image from 'next/image';
import { getProxiedImageUrl } from '@/utils/imageProxy';

export default function LuxuryImageZoom({ src, alt }: { src: string; alt: string }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div 
      className="relative cursor-crosshair overflow-hidden rounded-2xl bg-white flex items-center justify-center w-full aspect-square transition-all duration-500 group shadow-lg"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <Image unoptimized 
        src={getProxiedImageUrl(src)} 
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-contain p-8 transition-transform duration-[1500ms] ease-out ${isZoomed ? 'scale-125' : 'scale-100'}`}
      />
    </div>
  );
}
