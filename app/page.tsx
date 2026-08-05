'use client';

import React from 'react';
import { KineticHero } from '@/components/KineticHero';
import { Marquee } from '@/components/Marquee';
import { WorkList } from '@/components/WorkList';
import { MagneticEmail } from '@/components/MagneticEmail';
import { usePageTransition } from '@/components/PageTransitionContext';

export default function HomePage() {
  const { navigate } = usePageTransition();

  return (
    <div className="view active" id="view-home">
      <KineticHero />
      <Marquee />

      <div className="container">
        <div className="eyebrow reveal" style={{ marginTop: '100px' }}>
          Index 02 — Selected Work
        </div>

        <WorkList />

        <div className="teaser reveal">
          <p>Fullstack development from concept to deployment; the long version lives on its own page.</p>
          <button
            className="back-link"
            data-cursor
            onClick={() => navigate('/about', 'About')}
          >
            READ THE FULL STORY →
          </button>
        </div>
      </div>

      <section id="contact">
        <div className="container">
          <div className="eyebrow reveal">Index 04 — Contact</div>
          <MagneticEmail />
          <div className="contact-row reveal">
            <a href="https://github.com/xKobeni" target="_blank" rel="noopener noreferrer" data-cursor>
              → GitHub
            </a>
            <a href="https://www.linkedin.com/in/adrian-perce-a5069334a/" target="_blank" rel="noopener noreferrer" data-cursor>
              → LinkedIn
            </a>
            <a href="https://www.instagram.com/adriiyan_p/?hl=en" target="_blank" rel="noopener noreferrer" data-cursor>
              → Instagram
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <span>© 2026 Adrian Perce</span>
          <button
            className="back-top-link"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-cursor
          >
            ↑ Back to Top
          </button>
          <span>Built with care, index-first</span>
        </div>
      </footer>
    </div>
  );
}
