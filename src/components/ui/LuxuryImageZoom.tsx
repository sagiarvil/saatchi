"use client";

import React, { useState, useRef, useEffect } from "react";

export default function LuxuryImageZoom({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(6); // Default yüksek büyüteç
  const [imageLoaded, setImageLoaded] = useState(false);

  const LOUPE_SIZE = 360; // Biraz daha büyütüldü

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const px = (x / width) * 100;
    const py = (y / height) * 100;

    setPosition({ x, y, px, py });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Sadece hover durumunda zoom yap, sayfayı kaydırma
      e.preventDefault();
      
      // Tekerlek yönüne göre zoom seviyesini ayarla (yukarı kaydır = yakınlaş, aşağı = uzaklaş)
      const zoomStep = 0.5;
      setZoomLevel((prevZoom) => {
        let newZoom = e.deltaY < 0 ? prevZoom + zoomStep : prevZoom - zoomStep;
        // Sınırlar: 2x (minimum) - 15x (mikroskop seviyesi)
        if (newZoom > 15) newZoom = 15;
        if (newZoom < 2) newZoom = 2;
        return newZoom;
      });
    };

    const handleMouseEnter = () => {
      window.addEventListener('wheel', handleWheel, { passive: false });
    };

    const handleMouseLeave = () => {
      window.removeEventListener('wheel', handleWheel);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-lg cursor-none bg-[radial-gradient(circle_at_50%_50%,_#ffffff_30%,_#f8f6f0_100%)] rounded-2xl border border-black/5 flex items-center justify-center group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Base Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm"
      />

      {/* World-Class Jeweler's Loupe (Fiziksel Büyüteç Efekti) */}
      <div
        className="absolute pointer-events-none rounded-full z-50 flex items-center justify-center bg-white"
        style={{
          width: `${LOUPE_SIZE}px`,
          height: `${LOUPE_SIZE}px`,
          left: `${position.x - LOUPE_SIZE / 2}px`,
          top: `${position.y - LOUPE_SIZE / 2}px`,
          opacity: isHovered ? 1 : 0,
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,0,0,0.8)',
          border: '1px solid rgba(194,167,104,0.4)',
          transform: isHovered ? 'scale(1)' : 'scale(0.5)',
          transition: 'opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* İç Halka (Altın detay) */}
        <div className="absolute inset-1 rounded-full border-2 border-[#C2A768]/50 z-10 pointer-events-none"></div>
        
        {/* Mikroskobik Büyütülmüş Görüntü */}
        <div 
          className="w-full h-full rounded-full overflow-hidden"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.px}% ${position.py}%`,
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundRepeat: "no-repeat",
          }}
        />
        
        {/* Dışbükey Cam Yansıması (Convex Sapphire Glass Lens Flare) */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/60"></div>
        
        {/* Odaklama Artı İşareti (Subtle Crosshair) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-4 h-[1px] bg-[#C2A768]"></div>
          <div className="w-[1px] h-4 bg-[#C2A768] absolute"></div>
        </div>
        
        {/* Zoom Seviyesi Göstergesi */}
        <div className="absolute bottom-6 bg-black/60 text-[#C2A768] text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm pointer-events-none border border-[#C2A768]/30">
          {zoomLevel.toFixed(1)}x
        </div>
      </div>
      
      {/* Büyüteç aktifken arka planı hafif karartma */}
      <div className={`absolute inset-0 bg-black/10 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
}
