'use client';

import React from 'react';
import { usePageTransition } from './PageTransitionContext';

export const MenuOverlay: React.FC = () => {
  const { navigate, isMenuOpen, toggleMenu } = usePageTransition();

  const handleNav = (href: string, label: string, scrollTargetId?: string) => {
    toggleMenu(false);
    navigate(href, label, scrollTargetId);
  };

  return (
    <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} id="menuOverlay">
      <div className="container">
        <nav className="menu-list">
          <button onClick={() => handleNav('/', 'Index', 'work-list')} data-cursor>
            Work
          </button>
          <button onClick={() => handleNav('/about', 'About')} data-cursor>
            About
          </button>
          <button onClick={() => handleNav('/lab', 'Lab')} data-cursor>
            Lab
          </button>
          <button onClick={() => handleNav('/writing', 'Writing')} data-cursor>
            Writing
          </button>
          <button onClick={() => handleNav('/', 'Index', 'contact')} data-cursor>
            Contact
          </button>
        </nav>
        <div className="menu-meta">
          <span>Manila, PH — Remote</span>
          <span>Available Q1 2026</span>
        </div>
      </div>
    </div>
  );
};
