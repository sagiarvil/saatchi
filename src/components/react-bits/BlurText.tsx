'use client';

import React, { useEffect, useState } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
}) => {
  const [mounted, setMounted] = useState(false);
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <p className={`inline-block ${className}`} aria-label={text}>
      {elements.map((element, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            filter: mounted ? 'blur(0px)' : 'blur(10px)',
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? 'translateY(0)'
              : direction === 'top'
              ? 'translateY(-12px)'
              : 'translateY(12px)',
            transitionDelay: `${index * delay}ms`,
            marginRight: animateBy === 'words' ? '0.3em' : '0',
          }}
        >
          {element === ' ' ? '\u00A0' : element}
        </span>
      ))}
    </p>
  );
};
