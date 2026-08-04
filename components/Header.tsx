'use client';

import React from 'react';
import { usePageTransition } from './PageTransitionContext';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const { navigate, isMenuOpen, toggleMenu } = usePageTransition();

  return (
    <header>
      <button
        onClick={() => navigate('/', 'Index')}
        className="logo"
        style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}
        data-cursor
      >
        AR—
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ThemeToggle />
        <button
          className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
          id="menuBtn"
          aria-expanded={isMenuOpen}
          aria-controls="menuOverlay"
          onClick={() => toggleMenu()}
          data-cursor
        >
          <span className="bars">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span id="menuBtnText">{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
        </button>
      </div>
    </header>
  );
};
