'use client';
import { useState } from 'react';

export default function LuxuryImageZoom({ src, alt }: { src: string; alt: string }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div 
      className={`relative cursor-crosshair overflow-hidden rounded-2xl bg-white flex items-center justify-center p-8 transition-all duration-500 w-full ${isZoomed ? 'scale-110 shadow-2xl z-50' : ''}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto object-contain mix-blend-multiply drop-shadow-xl" 
        style={{ maxHeight: '500px' }}
      />
    </div>
  );
}
