'use client';

import React, { useEffect, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 40,
}) => {
  const [mounted, setMounted] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-1.5">
          {word.split('').map((char, charIndex) => {
            const index = wordIndex * 5 + charIndex;
            return (
              <span
                key={charIndex}
                className="inline-block transition-transform duration-500 ease-out"
                style={{
                  transform: mounted ? 'translateY(0)' : 'translateY(100%)',
                  opacity: mounted ? 1 : 0,
                  transitionDelay: `${index * delay}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};
