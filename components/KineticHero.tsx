'use client';

import React, { useEffect, useRef } from 'react';

export const KineticHero: React.FC = () => {
  const heroHeadRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !heroHeadRef.current) return;

    const el = heroHeadRef.current;
    let lastY = window.scrollY;
    let skew = 0;
    let decaying = false;
    let animFrame: number;

    function stepDecay() {
      skew *= 0.9;
      if (el) {
        el.style.transform = `skewY(${skew.toFixed(2)}deg)`;
      }
      if (Math.abs(skew) > 0.05) {
        animFrame = requestAnimationFrame(stepDecay);
      } else {
        decaying = false;
      }
    }

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      skew += (delta * 0.4 - skew) * 0.3;
      skew = Math.max(-14, Math.min(14, skew));
      if (el) {
        el.style.transform = `skewY(${skew.toFixed(2)}deg)`;
      }
      if (!decaying) {
        decaying = true;
        animFrame = requestAnimationFrame(stepDecay);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div id="hero">
      <div className="container">
        <div className="eyebrow">Index 01 — Introduction</div>
        <h1 className="hero-head" ref={heroHeadRef} id="heroHead">
          Design that <em>behaves</em>
          <br />
          like the idea it&apos;s showing.
        </h1>
        <p className="hero-sub">
          I&apos;m Alex Reyes — a visual and interaction designer who spends more time deciding how something should move than how it should look. Selected work below.
        </p>
        <div className="hero-scroll">
          <div className="line"></div>
          <span>SCROLL</span>
        </div>
      </div>
    </div>
  );
};
