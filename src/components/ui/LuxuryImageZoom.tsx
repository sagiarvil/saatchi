'use client';
import { useState } from 'react';

export default function LuxuryImageZoom({ src, alt }: { src: string; alt: string }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div 
      className={`relative cursor-crosshair overflow-hidden rounded-2xl bg-surface flex items-center justify-center w-full aspect-square transition-all duration-500 ${isZoomed ? 'scale-105 shadow-2xl z-50' : ''}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover object-center" 
      />
    </div>
  );
}
