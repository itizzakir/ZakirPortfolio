import { useEffect, useRef } from "react";
import { pointerX, pointerY } from "../../hooks/usePointer";
import { usePerformanceMode } from "../../hooks/usePerformanceMode";

const PALETTE = ["#22d3ee", "#8b5cf6", "#f472b6", "#a7f3d0"];

/**
 * Lightweight constellation field on a single <canvas>. Replaces the deprecated
 * tsparticles engine (~46 KB gz) with a few KB of hand-rolled rAF drawing that
 * matches the original look. Pauses when off-screen or the tab is hidden, reads
 * the cursor from the no-render pointer MotionValues, and scales density to the
 * device tier. Honors reduced-motion via the parent's render gate.
 */
export function ParticleField() {
  const canvasRef = useRef(null);
  const perf = usePerformanceMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const lowPower = !perf.enableHeavyFx;
    const COUNT = lowPower ? 30 : 64;
    const LINK_DISTANCE = lowPower ? 0 : 132; // 0 => links disabled
    const CURSOR_RADIUS = 170;
    const dprCap = lowPower ? 1.25 : 1.6;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let rafId = 0;
    let running = false;

    const rand = (min, max) => min + Math.random() * (max - min);

    const seed = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.22, 0.22),
        vy: rand(-0.22, 0.22),
        r: rand(0.8, 2.6),
        alpha: rand(0.18, 0.58),
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length) seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = pointerX.get();
      const my = pointerY.get();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        // wrap softly around the edges
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (LINK_DISTANCE) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.hypot(dx, dy);
            if (dist < LINK_DISTANCE) {
              ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.16;
              ctx.strokeStyle = "#67e8f9";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }

          // brighten links that fall near the cursor
          const cdx = p.x - mx;
          const cdy = p.y - my;
          if (Math.hypot(cdx, cdy) < CURSOR_RADIUS) {
            ctx.globalAlpha = 0.32;
            ctx.strokeStyle = "#a78bfa";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!running) return;
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    };

    resize();

    // Only animate while the canvas is on-screen and the tab is visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [perf.enableHeavyFx]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      aria-hidden="true"
    />
  );
}
