'use client';

import React, { ReactNode, CSSProperties } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  style = {},
}: ScrollRevealProps) {
  return (
    <div
      data-reveal
      className={`fade-up-item ${className}`}
      style={{
        ...style,
        ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
      }}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 80,
}: StaggerContainerProps) {
  return (
    <div className={`stagger-container ${className}`} data-stagger={staggerDelay}>
      {React.Children.map(children, (child, index) => (
        <div
          className="stagger-child fade-up-item"
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
