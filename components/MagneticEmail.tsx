'use client';

import React, { useRef, useEffect } from 'react';

export const MagneticEmail: React.FC = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hasFinePointer = window.matchMedia('(pointer:fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * 0.12}px, ${relY * 0.28}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0,0)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href="mailto:hello@alexreyes.design"
      className="contact-email reveal"
      id="magneticEmail"
      data-cursor
    >
      hello@alexreyes.design
    </a>
  );
};
