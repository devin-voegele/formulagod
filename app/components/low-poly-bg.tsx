"use client";
import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function delaunay(points: { x: number; y: number }[]) {
  // Simple Bowyer-Watson Delaunay triangulation
  const triangles: [number, number, number][] = [];
  const n = points.length;

  // Super triangle
  const minX = Math.min(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxX = Math.max(...points.map((p) => p.x));
  const maxY = Math.max(...points.map((p) => p.y));
  const dx = maxX - minX;
  const dy = maxY - minY;
  const delta = Math.max(dx, dy) * 10;

  const superPts = [
    { x: minX - delta, y: minY - delta },
    { x: minX + dx / 2, y: maxY + delta },
    { x: maxX + delta, y: minY - delta },
  ];
  const allPts = [...points, ...superPts];
  const sn = allPts.length;
  triangles.push([n, n + 1, n + 2]);

  for (let i = 0; i < n; i++) {
    const p = allPts[i];
    const badTriangles: [number, number, number][] = [];
    const polygon: [number, number][] = [];

    for (const tri of triangles) {
      const [a, b, c] = tri.map((idx) => allPts[idx]);
      const ax = a.x - p.x, ay = a.y - p.y;
      const bx = b.x - p.x, by = b.y - p.y;
      const cx = c.x - p.x, cy = c.y - p.y;
      const D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
      if (D === 0) continue;
      const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / D;
      const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / D;
      const dist = Math.sqrt((p.x - (a.x - ax + ux)) ** 2 + (p.y - (a.y - ay + uy)) ** 2);
      const r = Math.sqrt(ux * ux + uy * uy);
      if (dist < r + 1e-10) badTriangles.push(tri);
    }

    const edgeCount = new Map<string, number>();
    for (const tri of badTriangles) {
      const edges: [number, number][] = [[tri[0], tri[1]], [tri[1], tri[2]], [tri[2], tri[0]]];
      for (const [e1, e2] of edges) {
        const key = [Math.min(e1, e2), Math.max(e1, e2)].join(",");
        edgeCount.set(key, (edgeCount.get(key) || 0) + 1);
      }
    }
    for (const [key, count] of Array.from(edgeCount)) {
      if (count === 1) {
        const [e1, e2] = key.split(",").map(Number);
        polygon.push([e1, e2]);
      }
    }

    for (const tri of badTriangles) {
      const idx = triangles.indexOf(tri);
      if (idx !== -1) triangles.splice(idx, 1);
    }
    for (const [e1, e2] of polygon) {
      triangles.push([e1, e2, i]);
    }
  }

  return triangles.filter((tri) => !tri.some((idx) => idx >= n));
}

export default function LowPolyBg({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 10;
    const ROWS = 7;
    const SPEED = 0.18;

    function init() {
      const W = canvas!.width = canvas!.offsetWidth;
      const H = canvas!.height = canvas!.offsetHeight;
      const pts: Point[] = [];
      const cellW = W / (COLS - 1);
      const cellH = H / (ROWS - 1);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const ox = c * cellW;
          const oy = r * cellH;
          const jx = (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) ? 0 : randomBetween(-cellW * 0.4, cellW * 0.4);
          const jy = (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) ? 0 : randomBetween(-cellH * 0.4, cellH * 0.4);
          pts.push({
            x: ox + jx, y: oy + jy,
            ox: ox + jx, oy: oy + jy,
            vx: randomBetween(-SPEED, SPEED),
            vy: randomBetween(-SPEED, SPEED),
          });
        }
      }
      pointsRef.current = pts;
    }

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      const pts = pointsRef.current;

      // Drift points gently
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.x - p.ox) > 18) p.vx *= -1;
        if (Math.abs(p.y - p.oy) > 18) p.vy *= -1;
      }

      const tris = delaunay(pts.map((p) => ({ x: p.x, y: p.y })));

      ctx!.clearRect(0, 0, W, H);

      for (const [a, b, c] of tris) {
        const pa = pts[a], pb = pts[b], pc = pts[c];
        const cx = (pa.x + pb.x + pc.x) / 3;
        const cy = (pa.y + pb.y + pc.y) / 3;

        // Keep triangles very dark — subtle variation only
        const t = (cx / W) * 0.3 + (1 - cy / H) * 0.2;
        const base = Math.round(8 + t * 14); // 8–22
        const shade = Math.round(base + randomBetween(0, 6));
        const clamped = Math.max(6, Math.min(28, shade));

        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
        ctx!.lineTo(pc.x, pc.y);
        ctx!.closePath();
        ctx!.fillStyle = `rgb(${clamped},${clamped},${clamped})`;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(255,255,255,0.06)`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(() => { init(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
