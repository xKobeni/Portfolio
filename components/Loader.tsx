'use client';

import React, { useEffect, useState } from 'react';

export const Loader: React.FC = () => {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 0;
  });
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setTimeout(() => setHidden(true), 1100);
      return;
    }

    document.body.style.overflow = 'hidden';
    let start: number | null = null;
    const duration = 1900;

    function tick(ts: number) {
      if (!start) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(eased * 100);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = '';
          setTimeout(() => setHidden(true), 1100);
        }, 250);
      }
    }

    requestAnimationFrame(tick);
  }, []);

  if (hidden) return null;

  return (
    <div id="loader" className={done ? 'done' : ''}>
      <div className="loader-count mono">
        <span>{count}</span>
        <span>%</span>
      </div>
      <div className="loader-bar">
        <i style={{ width: `${count}%` }}></i>
      </div>
      <div className="loader-label">Assembling index</div>
    </div>
  );
};
