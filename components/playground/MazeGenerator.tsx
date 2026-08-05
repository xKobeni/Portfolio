'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const CELL = 24;
const WALL = 2;

interface Cell {
  visited: boolean;
  walls: [boolean, boolean, boolean, boolean]; // top, right, bottom, left
}

const DIRS = [
  { dx: 0, dy: -1, wall: 0 as const, opposite: 2 as const },  // up
  { dx: 1, dy: 0, wall: 1 as const, opposite: 3 as const },   // right
  { dx: 0, dy: 1, wall: 2 as const, opposite: 0 as const },   // down
  { dx: -1, dy: 0, wall: 3 as const, opposite: 1 as const },  // left
];

export const MazeGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridSize, setGridSize] = useState(15);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [speed, setSpeed] = useState(30);
  const gridRef = useRef<Cell[][]>([]);
  const stackRef = useRef<{ x: number; y: number }[]>([]);
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  const WIDTH = gridSize * CELL;
  const HEIGHT = gridSize * CELL;

  const initGrid = useCallback(() => {
    const grid: Cell[][] = [];
    for (let y = 0; y < gridSize; y++) {
      grid[y] = [];
      for (let x = 0; x < gridSize; x++) {
        grid[y][x] = { visited: false, walls: [true, true, true, true] };
      }
    }
    gridRef.current = grid;
    stackRef.current = [{ x: 0, y: 0 }];
    grid[0][0].visited = true;
    currentRef.current = { x: 0, y: 0 };
  }, [gridSize]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const grid = gridRef.current;
    const width = gridSize * CELL;
    const height = gridSize * CELL;

    ctx.fillStyle = 'var(--ink)';
    ctx.fillRect(0, 0, width, height);

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = grid[y][x];
        const px = x * CELL;
        const py = y * CELL;

        if (cell.visited) {
          ctx.fillStyle = 'var(--surface)';
          ctx.fillRect(px + WALL, py + WALL, CELL - WALL * 2, CELL - WALL * 2);
        }

        ctx.strokeStyle = 'var(--accent)';
        ctx.lineWidth = WALL;

        if (cell.walls[0]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + CELL, py); ctx.stroke(); }
        if (cell.walls[1]) { ctx.beginPath(); ctx.moveTo(px + CELL, py); ctx.lineTo(px + CELL, py + CELL); ctx.stroke(); }
        if (cell.walls[2]) { ctx.beginPath(); ctx.moveTo(px, py + CELL); ctx.lineTo(px + CELL, py + CELL); ctx.stroke(); }
        if (cell.walls[3]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + CELL); ctx.stroke(); }
      }
    }

    // Highlight current cell
    const cur = currentRef.current;
    ctx.fillStyle = 'rgba(51, 85, 255, 0.4)';
    ctx.fillRect(cur.x * CELL + WALL, cur.y * CELL + WALL, CELL - WALL * 2, CELL - WALL * 2);
  }, [gridSize]);

  const step = useCallback(() => {
    const grid = gridRef.current;
    const stack = stackRef.current;
    const cur = currentRef.current;

    if (stack.length === 0) return false;

    const neighbors: { x: number; y: number; dir: typeof DIRS[number] }[] = [];
    for (const dir of DIRS) {
      const nx = cur.x + dir.dx;
      const ny = cur.y + dir.dy;
      if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && !grid[ny][nx].visited) {
        neighbors.push({ x: nx, y: ny, dir });
      }
    }

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      grid[cur.y][cur.x].walls[next.dir.wall] = false;
      grid[next.y][next.x].walls[next.dir.opposite] = false;
      grid[next.y][next.x].visited = true;
      stack.push({ x: next.x, y: next.y });
      currentRef.current = { x: next.x, y: next.y };
    } else {
      const prev = stack.pop()!;
      currentRef.current = prev;
    }

    return stack.length > 0;
  }, [gridSize]);

  const generate = useCallback(() => {
    if (generating) return;
    initGrid();
    setGenerated(false);
    setGenerating(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;
    const tick = () => {
      if (!running) return;
      const hasMore = step();
      draw(ctx);
      if (hasMore) {
        frameRef.current = setTimeout(tick, speed) as unknown as number;
      } else {
        setGenerating(false);
        setGenerated(true);
      }
    };
    tick();

    return () => { running = false; clearTimeout(frameRef.current); };
  }, [generating, initGrid, step, draw, speed]);

  useEffect(() => {
    initGrid();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    draw(ctx);
  }, [gridSize, initGrid, draw]);

  const handleSizeChange = (val: number) => {
    if (generating) return;
    setGridSize(val);
  };

  return (
    <div className="playground-demo">
      <div className="playground-demo-header">
        <span className="playground-demo-score mono">
          {gridSize}×{gridSize} · {generating ? 'Generating...' : generated ? 'Done' : 'Ready'}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ width: '100%', maxWidth: Math.min(WIDTH, 560), borderRadius: '4px' }}
      />
      <div className="maze-controls">
        <div className="maze-control">
          <label className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Size</label>
          <input
            type="range"
            min={5}
            max={30}
            value={gridSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            disabled={generating}
          />
        </div>
        <div className="maze-control">
          <label className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Speed</label>
          <input
            type="range"
            min={5}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={generating}
          />
        </div>
      </div>
      <div className="playground-demo-actions">
        <button className="playground-btn" onClick={generate} data-cursor disabled={generating}>
          {generating ? 'GENERATING...' : 'GENERATE'}
        </button>
      </div>
    </div>
  );
};
