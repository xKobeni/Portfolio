'use client';

import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer:fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    let animId: number;
    const ringLoop = () => {
      const { mx, my, rx, ry } = posRef.current;
      posRef.current.rx += (mx - rx) * 0.16;
      posRef.current.ry += (my - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${posRef.current.rx}px, ${posRef.current.ry}px) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(ringLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(ringLoop);

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor], a, button, .work-item');
      if (target) {
        setHover(true);
        if (target.classList.contains('work-item')) {
          setLabel('VIEW');
        } else if (target.hasAttribute('data-cursor-label')) {
          setLabel(target.getAttribute('data-cursor-label') || 'OPEN');
        } else {
          setLabel('OPEN');
        }
      } else {
        setHover(false);
        setLabel('');
      }
    };

    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" id="cursorDot" ref={dotRef} />
      <div
        className={`cursor-ring ${hover ? 'hover' : ''}`}
        id="cursorRing"
        ref={ringRef}
      >
        <span className="cursor-label" id="cursorLabel">
          {label}
        </span>
      </div>
    </>
  );
};
