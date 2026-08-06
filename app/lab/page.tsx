'use client';

import React, { useRef, useEffect } from 'react';
import { usePageTransition } from '@/components/PageTransitionContext';
import { getAllExperiments, ExperimentItem } from '@/lib/experiments';

const ExperimentCard: React.FC<{ exp: ExperimentItem }> = ({ exp }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let frame: number;
    let t = 0;

    const draw = () => {
      t += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = 8;
      const rows = 6;
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;
          const dist = Math.sqrt((c - cols / 2) ** 2 + (r - rows / 2) ** 2);
          const size = 2 + Math.sin(t + dist * 0.5) * 2;
          const opacity = 0.15 + Math.sin(t * 0.7 + dist * 0.4) * 0.1;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(51,85,255,${opacity})`;
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="experiment-card reveal">
      <div className="experiment-canvas-wrap">
        <div className="experiment-gradient" style={{ background: exp.gradient }} />
        <canvas ref={canvasRef} className="experiment-canvas" />
        {(exp.github || exp.live) && (
          <div className="experiment-links">
            {exp.github && (
              <a
                href={exp.github}
                target="_blank"
                rel="noopener noreferrer"
                className="experiment-link"
                data-cursor
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {exp.live && (
              <a
                href={exp.live}
                target="_blank"
                rel="noopener noreferrer"
                className="experiment-link"
                data-cursor
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
      <div className="experiment-info">
        <span className="experiment-index mono">{exp.index}</span>
        <div>
          <h2 className="experiment-title">{exp.title}</h2>
          <p className="experiment-desc">{exp.desc}</p>
          <div className="experiment-meta">
            <span className="mono">{exp.tag}</span>
            <span className="mono" style={{ color: 'var(--muted)' }}>{exp.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LabPage() {
  const { navigate } = usePageTransition();
  const experiments = getAllExperiments();

  return (
    <div className="view active" id="view-lab">
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
          <div className="eyebrow">Index 05 — R&amp;D</div>
          <h1 className="project-title" style={{ marginTop: '0', fontSize: 'clamp(44px, 7vw, 90px)' }}>
            Research &<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Development</em>
          </h1>
          <p style={{ marginTop: '24px', maxWidth: '480px', color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7' }}>
            Where ideas become prototypes. A collection of AI experiments, productivity tools, games, machine learning projects, and developer utilities built to explore new technologies and refine engineering skills.
          </p>
        </div>

        <div className="experiment-grid">
          {experiments.map((exp) => (
            <ExperimentCard key={exp.id} exp={exp} />
          ))}
        </div>

        <div className="teaser reveal" style={{ marginTop: '80px' }}>
          <p>Want to play with some interactive demos?</p>
          <button className="back-link" data-cursor onClick={() => navigate('/playground', 'Playground')}>
            OPEN THE PLAYGROUND →
          </button>
        </div>

        <footer>
          <span>© 2026 Adrian Perce</span>
          <span>Index 05</span>
        </footer>
      </div>
    </div>
  );
}
