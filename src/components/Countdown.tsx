"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { EVENT } from "@/lib/constants";

function getRemaining() {
  const diff = new Date(EVENT.isoDate).getTime() - Date.now();
  return diff;
}

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="cd-unit">
      <div className="num-clip">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="num"
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export default function Countdown() {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    setDiff(getRemaining());
    const id = setInterval(() => setDiff(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const arrived = diff !== null && diff <= 0;
  const days = diff !== null ? pad(Math.floor(diff / 864e5)) : "00";
  const hours = diff !== null ? pad(Math.floor((diff / 36e5) % 24)) : "00";
  const mins = diff !== null ? pad(Math.floor((diff / 6e4) % 60)) : "00";
  const secs = diff !== null ? pad(Math.floor((diff / 1e3) % 60)) : "00";

  return (
    <Reveal id="countdown">
      <div className="eyebrow">The Celebration Begins In</div>
      <div className="cd-frame">
        {!arrived ? (
          <div className="cd-grid">
            <Unit value={days} label="Days" />
            <Unit value={hours} label="Hours" />
            <Unit value={mins} label="Minutes" />
            <Unit value={secs} label="Seconds" />
          </div>
        ) : (
          <div id="cd-today">🎓 Today is the Day! Welcome to the Celebration.</div>
        )}
      </div>
    </Reveal>
  );
}
