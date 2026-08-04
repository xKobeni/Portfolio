'use client';

import React, { useRef, useEffect, useState } from 'react';
import { usePageTransition } from '@/components/PageTransitionContext';

interface Experiment {
  id: string;
  index: string;
  title: string;
  desc: string;
  tag: string;
  year: string;
  gradient: string;
  link?: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'gravity-type',
    index: '01',
    title: 'Gravity Type',
    desc: 'Letterforms responding to scroll velocity and gravity via a spring physics simulation.',
    tag: 'WebGL — Motion',
    year: '2023',
    gradient: 'linear-gradient(135deg, #3355FF, #12141A)',
  },
  {
    id: 'cursor-trail',
    index: '02',
    title: 'Cursor Trail',
    desc: 'A trail of shrinking circles following the mouse, each with independent decay and opacity.',
    tag: 'Canvas — Interaction',
    year: '2024',
    gradient: 'linear-gradient(135deg, #12141A, #8FA0FF)',
  },
  {
    id: 'generative-grid',
    index: '03',
    title: 'Generative Grid',
    desc: 'A noise-driven grid that shifts cell colors and sizes in real time using simplex noise.',
    tag: 'Generative — Canvas',
    year: '2024',
    gradient: 'linear-gradient(135deg, #D8DEFF, #3355FF)',
  },
  {
    id: 'scroll-morph',
    index: '04',
    title: 'Scroll Morph',
    desc: 'SVG path morphing driven by scroll position — two shapes blending into each other.',
    tag: 'SVG — Scroll',
    year: '2023',
    gradient: 'linear-gradient(135deg, #6B6F68, #12141A)',
  },
  {
    id: 'variable-poster',
    index: '05',
    title: 'Variable Font Poster',
    desc: 'An interactive poster where font weight, width, and slant are controlled by mouse position.',
    tag: 'Variable Fonts — Interaction',
    year: '2024',
    gradient: 'linear-gradient(135deg, #3355FF, #D8DEFF)',
  },
  {
    id: 'audio-visualizer',
    index: '06',
    title: 'Audio Visualizer',
    desc: 'Concentric rings that expand and contract to the amplitude of live microphone input.',
    tag: 'Web Audio — Canvas',
    year: '2023',
    gradient: 'linear-gradient(135deg, #12141A, #3355FF)',
  },
];

const ExperimentCard: React.FC<{ exp: Experiment }> = ({ exp }) => {
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

      // Animated dots pattern
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
          <div className="eyebrow">Index 05 — Lab</div>
          <h1 className="project-title" style={{ marginTop: '0', fontSize: 'clamp(44px, 7vw, 90px)' }}>
            Experiments &<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Explorations</em>
          </h1>
          <p style={{ marginTop: '24px', maxWidth: '480px', color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7' }}>
            Smaller work that didn&apos;t need a brief — experiments in motion, generative systems, and interaction that exist mostly to answer the question &quot;what if?&quot;
          </p>
        </div>

        <div className="experiment-grid">
          {EXPERIMENTS.map((exp) => (
            <ExperimentCard key={exp.id} exp={exp} />
          ))}
        </div>

        <div className="teaser reveal" style={{ marginTop: '80px' }}>
          <p>Want to see the process behind the finished work?</p>
          <button className="back-link" data-cursor onClick={() => navigate('/writing', 'Writing')}>
            READ THE WRITING →
          </button>
        </div>

        <footer>
          <span>© 2026 Alex Reyes</span>
          <span>Index 05</span>
        </footer>
      </div>
    </div>
  );
}
