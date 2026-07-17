"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CHINA_EVENTS, ChinaEvent } from "@/lib/constants";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ChinaEvents() {
  const [open, setOpen] = useState<ChinaEvent | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="china-events">
      <div className="eyebrow">Four Gatherings in China</div>
      <h2 className="center display" style={{ marginTop: 0 }}>
        The Celebrations Before the Celebration
      </h2>
      <p className="center" style={{ color: "var(--muted)", maxWidth: 520, margin: "10px auto 0", fontStyle: "italic" }}>
        Before coming home, Betty hosted four unforgettable gatherings during her years in Wuhan. Tap one to read its
        story.
      </p>
      <motion.div
        className="ce-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {CHINA_EVENTS.map((ev) => (
          <motion.button variants={cardVariants} className="ce-card" key={ev.title} onClick={() => setOpen(ev)}>
            <div className="ce-photo">
              {ev.img ? (
                <Image src={ev.img} alt={ev.title} fill sizes="(max-width: 640px) 100vw, 25vw" />
              ) : (
                <>
                  <span className="zh-mark zh">{ev.zh}</span>
                  <span className="ph-note">photo coming soon</span>
                </>
              )}
            </div>
            <div className="ce-body">
              <div className="ce-when">
                {ev.where.split(",")[0]} · {ev.when}
              </div>
              <div className="ce-title">{ev.title}</div>
              <div className="ce-desc">{ev.desc}</div>
              <div className="ce-more">Read the story →</div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="ce-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          >
            <motion.div
              className="ce-modal"
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button className="ce-modal-close" onClick={() => setOpen(null)} aria-label="Close">
                ×
              </button>
              <div className="ce-modal-head">
                <span className="ce-modal-zh zh">{open.zh}</span>
                <div>
                  <div className="ce-when">
                    {open.where} · {open.when}
                  </div>
                  <h3 className="ce-modal-title display">{open.title}</h3>
                </div>
              </div>
              <p className="ce-modal-story">{open.story}</p>
              <ul className="ce-modal-highlights">
                {open.highlights.map((h) => (
                  <li key={h}>
                    <span aria-hidden="true">✿</span> {h}
                  </li>
                ))}
              </ul>
              <div className="ce-modal-gallery">
                {open.gallery.map((src, i) =>
                  src ? (
                    <div className="ce-modal-slot" key={i}>
                      <Image src={src} alt={`${open.title} photo ${i + 1}`} fill sizes="30vw" />
                    </div>
                  ) : (
                    <div className="ce-modal-slot empty" key={i}>
                      <span className="zh" aria-hidden="true">
                        {open.zh}
                      </span>
                      <small>photo soon</small>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
