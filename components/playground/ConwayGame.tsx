'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const COLS = 30;
const ROWS = 30;
const CELL_SIZE = 16;
const WIDTH = COLS * CELL_SIZE;
const HEIGHT = ROWS * CELL_SIZE;

function getThemeColors() {
  if (typeof window === 'undefined') return { bg: '#12141A', accent: '#3355FF', surface: '#1a1d26', grid: '#22252e' };
  const s = getComputedStyle(document.documentElement);
  const ink = s.getPropertyValue('--ink').trim() || '#12141A';
  const accent = s.getPropertyValue('--accent').trim() || '#3355FF';
  const surface = s.getPropertyValue('--surface').trim() || '#e8e8e8';
  return {
    bg: ink,
    accent,
    surface,
    grid: `color-mix(in srgb, ${ink} 75%, white)`,
  };
}

function createEmptyGrid(): boolean[][] {
  const grid: boolean[][] = [];
  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];
    for (let x = 0; x < COLS; x++) {
      grid[y][x] = false;
    }
  }
  return grid;
}

function createGliderGrid(): boolean[][] {
  const grid = createEmptyGrid();
  const cx = Math.floor(COLS / 2) - 1;
  const cy = Math.floor(ROWS / 2) - 1;
  grid[cy][cx + 1] = true;
  grid[cy + 1][cx + 2] = true;
  grid[cy + 2][cx] = true;
  grid[cy + 2][cx + 1] = true;
  grid[cy + 2][cx + 2] = true;
  return grid;
}

function drawGrid(ctx: CanvasRenderingContext2D, grid: boolean[][]) {
  const colors = getThemeColors();

  // Background
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Dead cells
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!grid[y][x]) {
        ctx.fillStyle = colors.surface;
        ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      }
    }
  }

  // Grid lines
  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL_SIZE, 0);
    ctx.lineTo(x * CELL_SIZE, HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL_SIZE);
    ctx.lineTo(WIDTH, y * CELL_SIZE);
    ctx.stroke();
  }

  // Alive cells
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x]) {
        ctx.fillStyle = colors.accent;
        ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      }
    }
  }
}

export const ConwayGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<boolean[][]>(createEmptyGrid());
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(80);
  const frameRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGrid(ctx, gridRef.current);
  }, []);

  const initGrid = useCallback(() => {
    gridRef.current = createEmptyGrid();
    setGeneration(0);
  }, []);

  const loadGlider = useCallback(() => {
    gridRef.current = createGliderGrid();
    setGeneration(0);
    setRunning(false);
    draw();
  }, [draw]);

  const randomize = useCallback(() => {
    const grid = gridRef.current;
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        grid[y][x] = Math.random() > 0.7;
      }
    }
    setGeneration(0);
    draw();
  }, [draw]);

  const tick = useCallback(() => {
    const grid = gridRef.current;
    const next: boolean[][] = [];
    let alive = 0;

    for (let y = 0; y < ROWS; y++) {
      next[y] = [];
      for (let x = 0; x < COLS; x++) {
        let neighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ny = (y + dy + ROWS) % ROWS;
            const nx = (x + dx + COLS) % COLS;
            if (grid[ny][nx]) neighbors++;
          }
        }

        if (grid[y][x]) {
          next[y][x] = neighbors === 2 || neighbors === 3;
        } else {
          next[y][x] = neighbors === 3;
        }
        if (next[y][x]) alive++;
      }
    }

    gridRef.current = next;
    setGeneration((g) => g + 1);
    draw();

    return alive > 0;
  }, [draw]);

  useEffect(() => {
    if (!running) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    let lastTime = 0;
    const loop = (time: number) => {
      if (time - lastTime >= speed) {
        const hasMore = tick();
        lastTime = time;
        if (!hasMore) {
          setRunning(false);
          return;
        }
      }
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, speed, tick]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL_SIZE);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL_SIZE);
    if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
      gridRef.current[y][x] = !gridRef.current[y][x];
      draw();
    }
  };

  return (
    <div className="playground-demo">
      <div className="playground-demo-header">
        <span className="playground-demo-score mono">
          Gen: {generation} · {running ? 'Running' : 'Paused'}
        </span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
        Cells live, die, and reproduce based on neighbor count. Click to toggle cells, then hit Play.
      </p>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        onClick={handleClick}
        style={{ width: '100%', maxWidth: WIDTH, borderRadius: '4px', cursor: running ? 'default' : 'pointer' }}
      />
      <div className="conway-controls">
        <div className="maze-control">
          <label className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Speed</label>
          <input
            type="range"
            min={20}
            max={200}
            value={220 - speed}
            onChange={(e) => setSpeed(220 - Number(e.target.value))}
          />
        </div>
      </div>
      <div className="playground-demo-actions">
        <button className="playground-btn" onClick={() => setRunning(!running)} data-cursor>
          {running ? 'PAUSE' : 'PLAY'}
        </button>
        <button className="playground-btn" onClick={() => { tick(); }} data-cursor disabled={running}>
          STEP
        </button>
        <button className="playground-btn" onClick={randomize} data-cursor disabled={running}>
          RANDOM
        </button>
        <button className="playground-btn" onClick={loadGlider} data-cursor disabled={running}>
          GLIDER
        </button>
        <button className="playground-btn" onClick={() => { initGrid(); draw(); setRunning(false); }} data-cursor>
          CLEAR
        </button>
      </div>
    </div>
  );
};
