"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type ConfettiHandle = { burst: () => void };

const COLORS = ["#f5ccd6", "#fbeaee", "#e8a7ba", "#c96f88", "#d8b567"];

/** Draws a five-petal blossom so the confetti reads as falling flowers, not paper. */
function drawBlossom(ctx: CanvasRenderingContext2D, r: number, color: string) {
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.6, r * 0.38, r * 0.62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.rotate((Math.PI * 2) / 5);
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = "#e9c46a";
  ctx.fill();
}

const ConfettiCanvas = forwardRef<ConfettiHandle>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useImperativeHandle(ref, () => ({
    burst() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const pieces = Array.from({ length: 44 }, () => ({
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.28,
        r: Math.random() * 5 + 4,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * -4.5 - 2,
        g: 0.11,
        a: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.12,
      }));
      let frame = 0;
      const maxFrames = 130;
      function draw() {
        if (!ctx || !canvas) return;
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach((p) => {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.a);
          ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
          drawBlossom(ctx, p.r, p.c);
          ctx.restore();
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.g;
          p.vx *= 0.99;
          p.a += p.va;
        });
        if (frame < maxFrames) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      draw();
    },
  }));

  return <canvas id="confetti-canvas" ref={canvasRef} />;
});

ConfettiCanvas.displayName = "ConfettiCanvas";
export default ConfettiCanvas;
