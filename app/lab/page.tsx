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
