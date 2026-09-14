import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PlexusBackgroundProps {
  className?: string;
  /** Max distance (px) at which two nodes get a connecting line */
  linkDistance?: number;
  /** Number of nodes scales with area; this caps it */
  maxNodes?: number;
  /** Opacity of the whole canvas */
  opacity?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

/**
 * Interactive plexus / particle-network background.
 * Nodes race around, connect when close, scatter away from the
 * cursor, light up + link to the cursor when near, and explode
 * outward on click. High frame-rate, direct canvas writes only.
 */
export const PlexusBackground = ({
  className,
  linkDistance = 140,
  maxNodes = 100,
  opacity = 0.5,
}: PlexusBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999, active: false, vx: 0, vy: 0, px: -9999, py: -9999 };
    let ripples: Ripple[] = [];
    let running = true;

    const isDark = () => document.documentElement.classList.contains("dark");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density: 1 node per ~14000px², capped
      const count = Math.min(maxNodes, Math.max(28, Math.floor((width * height) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      // Track cursor velocity so fast flicks inject energy into the field
      if (mouse.active) {
        mouse.vx = nx - mouse.px;
        mouse.vy = ny - mouse.py;
      }
      mouse.px = nx;
      mouse.py = ny;
      mouse.x = nx;
      mouse.y = ny;
      mouse.active = true;
    };

    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, alpha: 0.9 });
      // Shockwave: blast nearby nodes outward
      for (const n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 220 && d > 0.001) {
          const force = (1 - d / 220) * 7;
          n.vx += (dx / d) * force;
          n.vy += (dy / d) * force;
        }
      }
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };

    const step = () => {
      if (!running) return;

      const dark = isDark();
      const nodeColor = dark ? "210, 210, 230" : "24, 24, 27";
      const linkColor = dark ? "160, 160, 190" : "39, 39, 42";
      const accent = dark ? "167, 139, 250" : "139, 92, 246";

      // Decay cursor velocity (used for flick energy transfer)
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      ctx.clearRect(0, 0, width, height);

      const ATTRACT_R = 200;   // nodes this close get pulled toward the cursor
      const ORBIT_R = 55;      // they settle into a small orbit around it
      const CONNECT_R = 170;

      // Update nodes
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);

        if (mouse.active && dist < ATTRACT_R && dist > 0.001) {
          // Pull nodes toward the cursor, but hold them in a small orbit ring
          // around it instead of letting them collapse into a single clump.
          const pull = dist > ORBIT_R
            ? (1 - dist / ATTRACT_R) * 0.22          // gentle attraction
            : -(1 - dist / ORBIT_R) * 0.35;          // soft push-back inside the ring
          n.vx += (dx / dist) * pull;
          n.vy += (dy / dist) * pull;
          // Fast cursor flicks drag neighbours along for extra energy
          n.vx += mouse.vx * 0.04 * (1 - dist / ATTRACT_R);
          n.vy += mouse.vy * 0.04 * (1 - dist / ATTRACT_R);
        }

        n.x += n.vx;
        n.y += n.vy;

        // Friction keeps it lively but bounded
        n.vx *= 0.985;
        n.vy *= 0.985;
        // Ensure a lively baseline drift
        const sp = Math.hypot(n.vx, n.vy);
        if (sp < 0.25 && sp > 0.0001) {
          n.vx = (n.vx / sp) * 0.25;
          n.vy = (n.vy / sp) * 0.25;
        } else if (sp < 0.25) {
          n.vx = (Math.random() - 0.5) * 0.5;
          n.vy = (Math.random() - 0.5) * 0.5;
        }
        // Speed cap for smoothness
        else if (sp > 3.2) {
          n.vx = (n.vx / sp) * 3.2;
          n.vy = (n.vy / sp) * 3.2;
        }

        // Wrap edges
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Links (node↔node) — brighter and slightly thicker near the cursor
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const d = Math.sqrt(d2);
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const nearCursor =
              mouse.active && Math.hypot(midX - mouse.x, midY - mouse.y) < CONNECT_R;
            const base = (1 - d / linkDistance) * (dark ? 0.4 : 0.35);
            const alpha = nearCursor ? Math.min(0.95, base + 0.45) : base;
            ctx.strokeStyle = nearCursor
              ? `rgba(${accent}, ${alpha})`
              : `rgba(${linkColor}, ${alpha})`;
            ctx.lineWidth = nearCursor ? 1.4 : 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Cursor connection lines — web reaches to the pointer
      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_R) {
            const alpha = (1 - d / CONNECT_R) * 0.6;
            ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // Nodes — bigger and glowing near the cursor
      for (const n of nodes) {
        const dist = mouse.active ? Math.hypot(mouse.x - n.x, mouse.y - n.y) : 9999;
        const near = dist < ATTRACT_R;
        const r = near ? 3 : 1.8;
        if (near) {
          ctx.fillStyle = `rgba(${accent}, 0.95)`;
          ctx.shadowColor = `rgba(${accent}, 0.8)`;
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(${nodeColor}, ${dark ? 0.75 : 0.6})`;
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Click ripples
      ripples = ripples.filter((rp) => rp.alpha > 0.02);
      for (const rp of ripples) {
        rp.r += 7;
        rp.alpha *= 0.92;
        ctx.strokeStyle = `rgba(${accent}, ${rp.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      } else {
        running = true;
        rafRef.current = requestAnimationFrame(step);
      }
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [linkDistance, maxNodes]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ opacity }}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
};

export default PlexusBackground;
