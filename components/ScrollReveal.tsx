'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const observeReveals = () => {
      const els = document.querySelectorAll('.reveal:not(.in-view)');
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (observer) observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        els.forEach((el) => observer?.observe(el));
      } else {
        els.forEach((el) => el.classList.add('in-view'));
      }
    };

    // Run observation on mount and route change
    const timer = setTimeout(observeReveals, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
};
