'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface TransitionContextType {
  navigate: (href: string, label?: string, scrollTargetId?: string) => void;
  isMenuOpen: boolean;
  toggleMenu: (open?: boolean) => void;
}

const PageTransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
  isMenuOpen: false,
  toggleMenu: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

export const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [veilActive, setVeilActive] = useState(false);
  const [label, setLabel] = useState('Loading');
  const [origin, setOrigin] = useState<'bottom' | 'top'>('bottom');
  const pendingScrollIdRef = useRef<string | null>(null);
  const isNavigatingRef = useRef(false);

  const toggleMenu = (open?: boolean) => {
    setIsMenuOpen((prev) => {
      const next = open !== undefined ? open : !prev;
      // Lock/unlock body scroll and add body class for CSS hooks
      if (next) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
      } else {
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      }
      return next;
    });
  };

  const navigate = (href: string, transitionLabel?: string, scrollTargetId?: string) => {
    const menuWasOpen = isMenuOpen;
    setIsMenuOpen(false);
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');

    // If navigating to exact same path, check scroll target
    if (href === pathname || (href === '/' && pathname === '/')) {
      if (scrollTargetId) {
        const el = document.getElementById(scrollTargetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const reduceMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      router.push(href);
      if (scrollTargetId) {
        setTimeout(() => {
          const el = document.getElementById(scrollTargetId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
      return;
    }

    setLabel(transitionLabel || 'Loading');
    pendingScrollIdRef.current = scrollTargetId || null;
    isNavigatingRef.current = true;

    // Wait for menu close animation before starting veil
    const menuCloseDelay = menuWasOpen ? 700 : 0;

    // Step 1: Cover screen with veil from bottom
    setOrigin('bottom');
    setTimeout(() => {
      setVeilActive(true);
    }, menuCloseDelay);

    // Step 2: Once veil is fully covering the screen, push route
    setTimeout(() => {
      router.push(href);
    }, menuCloseDelay + 550);
  };

  // Step 3: When pathname updates (Next.js has mounted new page), handle scroll and retract veil upward
  useEffect(() => {
    if (!isNavigatingRef.current) return;

    const timer = setTimeout(() => {
      const scrollId = pendingScrollIdRef.current;
      pendingScrollIdRef.current = null;

      if (scrollId) {
        const el = document.getElementById(scrollId);
        if (el) {
          el.scrollIntoView({ block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }

      // Set origin to top so veil slides out UPWARDS
      setOrigin('top');
      requestAnimationFrame(() => {
        setVeilActive(false);
        isNavigatingRef.current = false;
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={{ navigate, isMenuOpen, toggleMenu }}>
      {children}
      <div
        className={`page-transition ${veilActive ? 'active' : ''}`}
        id="pageTransition"
        style={{ transformOrigin: origin }}
      >
        <span className="pt-label mono" id="pageTransitionLabel">
          {label}
        </span>
      </div>
    </PageTransitionContext.Provider>
  );
};
