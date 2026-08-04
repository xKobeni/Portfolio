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
          <p>Ten years at the edge of brand and product — the long version lives on its own page.</p>
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
            <a href="#" data-cursor>
              → Instagram
            </a>
            <a href="#" data-cursor>
              → Are.na
            </a>
            <a href="#" data-cursor>
              → LinkedIn
            </a>
            <a href="#" data-cursor>
              → Reading List
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>© 2026 Alex Reyes</span>
          <span>Built with care, index-first</span>
        </div>
      </footer>
    </div>
  );
}
