'use client';

import {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  TouchEvent,
  WheelEvent
} from 'react';

type Point = {
  x: number;
  y: number;
};

type LoupeStyle = {
  left: string;
  top: string;
  backgroundPosition: string;
  backgroundSize: string;
};

const MIN_ZOOM = 2;
const MAX_ZOOM = 6;
const ZOOM_STEP = 0.5;
const LOUPE_RADIUS = 110;

export default function ZoomImage({
  src,
  alt
}: {
  src: string;
  alt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPointRef = useRef<Point | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [zoomFactor, setZoomFactor] = useState(3.5);
  const [loupeStyle, setLoupeStyle] = useState<LoupeStyle>({
    left: '50%',
    top: '50%',
    backgroundPosition: '50% 50%',
    backgroundSize: '350% 350%'
  });

  function updateLoupe(clientX: number, clientY: number, factor = zoomFactor) {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cursorX = clientX - rect.left;
    const cursorY = clientY - rect.top;

    if (
      cursorX < 0 ||
      cursorY < 0 ||
      cursorX > rect.width ||
      cursorY > rect.height
    ) {
      setIsActive(false);
      return;
    }

    lastPointRef.current = { x: clientX, y: clientY };

    setLoupeStyle({
      left: `${cursorX}px`,
      top: `${cursorY}px`,
      backgroundSize: `${rect.width * factor}px ${rect.height * factor}px`,
      backgroundPosition:
        `-${cursorX * factor - LOUPE_RADIUS}px ` +
        `-${cursorY * factor - LOUPE_RADIUS}px`
    });

    setIsActive(true);
  }

  useEffect(() => {
    if (isActive && lastPointRef.current) {
      updateLoupe(
        lastPointRef.current.x,
        lastPointRef.current.y,
        zoomFactor
      );
    }
  }, [zoomFactor]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    updateLoupe(e.clientX, e.clientY);
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    setZoomFactor(current => {
      const next =
        current + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP);

      return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
    });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    updateLoupe(e.touches[0].clientX, e.touches[0].clientY);
  };

  const deactivate = () => {
    setIsActive(false);
    lastPointRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] cursor-crosshair overflow-hidden rounded-[14px] bg-[radial-gradient(circle_at_50%_50%,#ffffff_30%,#f7f5f0_100%)] border border-[#E5E7EB]"
      onMouseMove={handleMouseMove}
      onMouseLeave={deactivate}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={deactivate}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        className={`absolute inset-0 w-full h-full object-contain p-4 md:p-8 select-none mix-blend-multiply drop-shadow-sm transition-opacity duration-200 ${
          isActive ? 'opacity-35' : 'opacity-100'
        }`}
      />

      <div
        className={`absolute rounded-full border-2 border-[#C5A059] pointer-events-none bg-white z-20 overflow-hidden transition-[opacity,transform] duration-150 ${
          isActive
            ? 'opacity-100 visible scale-100'
            : 'opacity-0 invisible scale-90'
        }`}
        style={{
          width: '220px',
          height: '220px',
          left: loupeStyle.left,
          top: loupeStyle.top,
          transform: 'translate(-50%, -50%)',
          backgroundImage: `url(${src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: loupeStyle.backgroundPosition,
          backgroundSize: loupeStyle.backgroundSize,
          boxShadow:
            '0 16px 48px rgba(0,24,48,.30), inset 0 0 24px rgba(0,0,0,.20), 0 0 0 3px rgba(255,255,255,.65)'
        }}
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg,rgba(255,255,255,.35),rgba(255,255,255,.03) 45%,rgba(56,140,240,.06) 70%,transparent)'
          }}
        />

        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'linear-gradient(to right,transparent calc(50% - .5px),rgba(194,167,104,.28) 50%,transparent calc(50% + .5px)),linear-gradient(to bottom,transparent calc(50% - .5px),rgba(194,167,104,.28) 50%,transparent calc(50% + .5px))',
            backgroundSize: '100% 22px,22px 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="absolute top-3 right-3 bg-[#02121E] text-[#C5A059] border border-[#C5A059] text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
          {zoomFactor.toFixed(1)}×
        </div>
      </div>
    </div>
  );
}
