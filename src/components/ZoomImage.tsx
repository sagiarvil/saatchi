'use client';
import { useState, useRef, MouseEvent, TouchEvent } from 'react';

export default function ZoomImage({ src, alt }: { src: string, alt: string }) {
  const [isActive, setIsActive] = useState(false);
  const [loupeStyle, setLoupeStyle] = useState({ left: '0px', top: '0px', backgroundPosition: '0px 0px', backgroundSize: '100% 100%' });
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomFactor = 3.5;
  const loupeRadius = 110; // 220px / 2

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cursorX = clientX - rect.left;
    const cursorY = clientY - rect.top;

    if (cursorX < 0 || cursorY < 0 || cursorX > rect.width || cursorY > rect.height) {
      setIsActive(false);
      return;
    }

    setLoupeStyle({
      left: `${cursorX}px`,
      top: `${cursorY}px`,
      backgroundSize: `${rect.width * zoomFactor}px ${rect.height * zoomFactor}px`,
      backgroundPosition: `-${cursorX * zoomFactor - loupeRadius}px -${cursorY * zoomFactor - loupeRadius}px`
    });
    setIsActive(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => handlePointerMove(e.clientX, e.clientY);
  
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-visible rounded-[14px] cursor-crosshair w-full h-[400px] flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#ffffff_30%,#f7f5f0_100%)] border border-[#E5E7EB]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsActive(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={() => setIsActive(false)}
    >
      <img src={src} alt={alt} className={`max-w-full max-h-full object-contain p-6 transition-opacity duration-300 ${isActive ? 'opacity-40' : 'opacity-100'}`} />
      
      {/* HAUTE HORLOGERIE PRECISION LOUPE */}
      <div 
        className={`absolute rounded-full border-2 border-[#C5A059] pointer-events-none bg-white z-10 overflow-visible
          transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isActive ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-[0.88]'}
        `}
        style={{
          width: '220px',
          height: '220px',
          boxShadow: '0 16px 48px rgba(0, 24, 48, 0.35), inset 0 0 24px rgba(0, 0, 0, 0.28), 0 0 0 3px rgba(255, 255, 255, 0.5), 0 0 0 4.5px rgba(194, 167, 104, 0.6)',
          transform: 'translate(-50%, -50%)',
          backgroundImage: `url(${src})`,
          backgroundRepeat: 'no-repeat',
          left: loupeStyle.left,
          top: loupeStyle.top,
          backgroundPosition: loupeStyle.backgroundPosition,
          backgroundSize: loupeStyle.backgroundSize
        }}
      >
        {/* Sapphire Crystal Anti-Reflective Glare */}
        <div className="absolute inset-0 rounded-full pointer-events-none z-10" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.06) 42%, rgba(56, 140, 240, 0.08) 65%, transparent 100%)' }} />
        
        {/* Watchmaker Optical Reticle Crosshair */}
        <div className="absolute inset-0 rounded-full pointer-events-none z-20" style={{ 
          background: `
            radial-gradient(circle at center, transparent 32px, rgba(194, 167, 104, 0.12) 33px, transparent 34px),
            linear-gradient(to right, transparent calc(50% - 0.5px), rgba(194, 167, 104, 0.35) 50%, transparent calc(50% + 0.5px)),
            linear-gradient(to bottom, transparent calc(50% - 0.5px), rgba(194, 167, 104, 0.35) 50%, transparent calc(50% + 0.5px))
          `,
          backgroundSize: '100% 100%, 100% 24px, 24px 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />

        {/* Floating Power Badge */}
        <div className="absolute -top-3 -right-3 bg-[#02121E] text-[#C5A059] border border-[#C5A059] text-[10px] font-extrabold tracking-[0.8px] px-2 py-1 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.4)] pointer-events-none z-30 whitespace-nowrap">
          {zoomFactor.toFixed(1)}× MAKRO
        </div>
      </div>
    </div>
  );
}
