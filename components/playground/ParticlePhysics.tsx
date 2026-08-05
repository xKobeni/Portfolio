'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const MAX_PARTICLES = 500;
const GRAVITY = 0.15;
const FRICTION = 0.99;
const BOUNCE = 0.7;
const FADE_RATE = 0.003;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

export const ParticlePhysics: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; dragging: boolean; startX: number; startY: number }>({
    x: 0, y: 0, dragging: false, startX: 0, startY: 0,
  });
  const [count, setCount] = useState(0);

  const WIDTH = 560;
  const HEIGHT = 400;

  const spawnParticles = useCallback((x: number, y: number, vx: number, vy: number, burst = false) => {
    const count = burst ? 12 : 4;
    for (let i = 0; i < count; i++) {
      if (particlesRef.current.length >= MAX_PARTICLES) {
        particlesRef.current.shift();
      }
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 2 + Math.random() * 4 : 1 + Math.random() * 2;
      particlesRef.current.push({
        x,
        y,
        vx: vx * 0.3 + Math.cos(angle) * speed,
        vy: vy * 0.3 + Math.sin(angle) * speed,
        life: 1,
        size: 2 + Math.random() * 3,
        hue: (Date.now() / 10 + Math.random() * 60) % 360,
      });
    }
    setCount(particlesRef.current.length);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      ctx.fillStyle = 'var(--ink)';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += GRAVITY;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= FADE_RATE;

        if (p.x < 0) { p.x = 0; p.vx *= -BOUNCE; }
        if (p.x > WIDTH) { p.x = WIDTH; p.vx *= -BOUNCE; }
        if (p.y < 0) { p.y = 0; p.vy *= -BOUNCE; }
        if (p.y > HEIGHT) { p.y = HEIGHT; p.vy *= -BOUNCE; }

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const hue = (p.hue + speed * 5) % 360;
        const alpha = p.life * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
        ctx.fill();

        if (speed > 1.5) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
          ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.4})`;
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }
      }

      setCount(particles.length);

      // Draw drag line
      const mouse = mouseRef.current;
      if (mouse.dragging) {
        ctx.beginPath();
        ctx.moveTo(mouse.startX, mouse.startY);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleDown = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e);
    mouseRef.current = { ...pos, dragging: true, startX: pos.x, startY: pos.y };
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e);
    mouseRef.current.x = pos.x;
    mouseRef.current.y = pos.y;
  };

  const handleUp = () => {
    const mouse = mouseRef.current;
    if (!mouse.dragging) return;
    mouse.dragging = false;
    const vx = (mouse.startX - mouse.x) * 0.15;
    const vy = (mouse.startY - mouse.y) * 0.15;
    spawnParticles(mouse.startX, mouse.startY, vx, vy, true);
  };

  return (
    <div className="playground-demo">
      <div className="playground-demo-header">
        <span className="playground-demo-score mono">Particles: {count}/{MAX_PARTICLES}</span>
        <span className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>
          Click to spawn · Drag to throw
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={handleDown}
        onTouchMove={handleMove}
        onTouchEnd={handleUp}
        style={{ width: '100%', maxWidth: WIDTH, borderRadius: '4px', cursor: 'crosshair' }}
      />
      <div className="playground-demo-actions">
        <button
          className="playground-btn"
          onClick={() => { particlesRef.current = []; setCount(0); }}
          data-cursor
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};
