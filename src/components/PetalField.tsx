"use client";

import { useEffect, useState } from "react";

type Petal = {
  left: number;
  depth: number; // 0 = far (small, faint, blurred) → 1 = near (big, sharp)
  size: number;
  color: string;
  fallDuration: number;
  fallDelay: number;
  spinDuration: number;
  spinReverse: boolean;
  drift: number;
};

const TINTS = ["#f7cdd8", "#fbdce4", "#f2b6c6", "#ffe1ea", "#eaa7bb", "#f9c6d3"];

export default function PetalField() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const n = window.innerWidth < 600 ? 16 : 30;
    const list: Petal[] = Array.from({ length: n }, () => {
      const depth = Math.random();
      const fallDuration = 15 - depth * 6 + Math.random() * 3; // nearer = faster
      return {
        left: Math.random() * 100,
        depth,
        size: 10 + depth * 12,
        color: TINTS[Math.floor(Math.random() * TINTS.length)],
        fallDuration,
        fallDelay: -Math.random() * fallDuration, // negative → already mid-fall on load
        spinDuration: 2.5 + Math.random() * 3.5,
        spinReverse: Math.random() > 0.5,
        drift: 30 + Math.random() * 70,
      };
    });
    setPetals(list);
  }, []);

  return (
    <div id="petal-field" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}vw`,
            opacity: 0.45 + p.depth * 0.5,
            filter: p.depth < 0.4 ? "blur(1px)" : "none",
            animationDuration: `${p.fallDuration}s`,
            animationDelay: `${p.fallDelay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          <span
            className="petal-inner"
            style={{
              width: `${p.size}px`,
              height: `${p.size * 1.2}px`,
              ["--petal-color" as string]: p.color,
              animationDuration: `${p.spinDuration}s`,
              animationDirection: p.spinReverse ? "reverse" : "normal",
            }}
          />
        </span>
      ))}
    </div>
  );
}
