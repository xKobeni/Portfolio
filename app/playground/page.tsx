'use client';

import React, { useState } from 'react';
import { usePageTransition } from '@/components/PageTransitionContext';
import { getAllPlaygroundItems } from '@/lib/playground';
import { ParticlePhysics } from '@/components/playground/ParticlePhysics';
import { MazeGenerator } from '@/components/playground/MazeGenerator';
import { ConwayGame } from '@/components/playground/ConwayGame';
import { TypingTest } from '@/components/playground/TypingTest';
import { PasswordGenerator } from '@/components/playground/PasswordGenerator';

const DEMO_COMPONENTS: Record<string, React.FC> = {
  'particle-physics': ParticlePhysics,
  'maze-generator': MazeGenerator,
  'conway-game': ConwayGame,
  'typing-test': TypingTest,
  'password-generator': PasswordGenerator,
};

export default function PlaygroundPage() {
  const { navigate } = usePageTransition();
  const items = getAllPlaygroundItems();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const DemoComponent = activeDemo ? DEMO_COMPONENTS[activeDemo] : null;

  return (
    <div className="view active" id="view-playground">
      <div className="container">
        <button
          className="back-link"
          data-cursor
          onClick={() => navigate('/', 'Index')}
          style={{ marginTop: '120px' }}
        >
          ← Index
        </button>

        <div style={{ paddingTop: '24px' }}>
          <div className="eyebrow">Index 07 — Playground</div>
          <h1 className="project-title" style={{ marginTop: '0', fontSize: 'clamp(44px, 7vw, 90px)' }}>
            Interactive<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Playground</em>
          </h1>
          <p style={{ marginTop: '24px', maxWidth: '480px', color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7' }}>
            Things you can play with right here — simulations, algorithms, and interactive tools built for fun and practice.
          </p>
        </div>

        <div className="experiment-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className="experiment-card reveal"
              style={{ cursor: 'pointer' }}
              data-cursor
              onClick={() => setActiveDemo(item.id)}
            >
              <div className="experiment-canvas-wrap">
                <div className="experiment-gradient" style={{ background: item.gradient }} />
              </div>
              <div className="experiment-info">
                <span className="experiment-index mono">{item.index}</span>
                <div>
                  <h2 className="experiment-title">{item.title}</h2>
                  <p className="experiment-desc">{item.desc}</p>
                  <div className="experiment-meta">
                    <span className="mono">{item.tag}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="teaser reveal" style={{ marginTop: '80px' }}>
          <p>Want to see the source code?</p>
          <button className="back-link" data-cursor onClick={() => navigate('/lab', 'R&D')}>
            CHECK THE R&D →
          </button>
        </div>

        <footer>
          <span>© 2026 Adrian Perce</span>
          <span>Index 07</span>
        </footer>
      </div>

      {activeDemo && DemoComponent && (
        <div className="playground-modal" onClick={() => setActiveDemo(null)}>
          <div className="playground-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="playground-modal-close" onClick={() => setActiveDemo(null)} data-cursor>
              ✕
            </button>
            <h2 className="playground-modal-title">
              {items.find((i) => i.id === activeDemo)?.title}
            </h2>
            <DemoComponent />
          </div>
        </div>
      )}
    </div>
  );
}
