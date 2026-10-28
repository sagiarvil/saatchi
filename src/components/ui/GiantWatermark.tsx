import React from 'react';

interface GiantWatermarkProps {
  text: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark' | 'gold';
  ariaLabel?: string;
}

export function GiantWatermark({
  text,
  className = '',
  align = 'center',
  theme = 'light',
  ariaLabel,
}: GiantWatermarkProps) {
  // SVG Text anchor ve X koordinatı
  const textAnchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';
  const textX = align === 'left' ? '0%' : align === 'right' ? '100%' : '50%';

  // Benzersiz id için metin sadeleştirmesi
  const safeId = text.toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <div
      className={`giant-watermark-wrap wm-${align} ${className}`}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role="presentation"
    >
      <svg
        className="giant-watermark-svg"
        viewBox="0 0 1000 125"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {theme === 'gold' && (
            <linearGradient id={`wm-gold-${safeId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#846b32" stopOpacity="0.03" />
              <stop offset="25%" stopColor="#C2A768" stopOpacity="0.10" />
              <stop offset="50%" stopColor="#846b32" stopOpacity="0.14" />
              <stop offset="75%" stopColor="#C2A768" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#846b32" stopOpacity="0.03" />
            </linearGradient>
          )}
          {theme === 'dark' && (
            <linearGradient id={`wm-dark-${safeId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.02" />
              <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.09" />
              <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
            </linearGradient>
          )}
          {theme === 'light' && (
            <linearGradient id={`wm-light-${safeId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A1814" stopOpacity="0.02" />
              <stop offset="25%" stopColor="#1A1814" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#1A1814" stopOpacity="0.07" />
              <stop offset="75%" stopColor="#1A1814" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#1A1814" stopOpacity="0.02" />
            </linearGradient>
          )}
        </defs>
        <text
          x={textX}
          y="102"
          textAnchor={textAnchor}
          fontFamily='"Cinzel", "Bodoni MT", "Didot", "Playfair Display", "Times New Roman", serif'
          fontSize="120"
          fontWeight="700"
          letterSpacing="0.06em"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          fill={
            theme === 'gold'
              ? `url(#wm-gold-${safeId})`
              : theme === 'dark'
              ? `url(#wm-dark-${safeId})`
              : `url(#wm-light-${safeId})`
          }
          className="giant-watermark-text"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
