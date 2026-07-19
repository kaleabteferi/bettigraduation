"use client";

import { useCallback, useEffect, useState } from "react";
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

const photosOf = (ev: ChinaEvent) => ev.gallery.filter(Boolean) as string[];

export default function ChinaEvents() {
  const [open, setOpen] = useState<ChinaEvent | null>(null);
  const [lb, setLb] = useState<number | null>(null); // lightbox index into the open event's photos

  const photos = open ? photosOf(open) : [];

  const closeAll = useCallback(() => {
    setOpen(null);
    setLb(null);
  }, []);
  const prevLb = useCallback(
    () => setLb((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const nextLb = useCallback(() => setLb((i) => (i === null ? null : (i + 1) % photos.length)), [photos.length]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lb !== null) setLb(null);
        else closeAll();
      } else if (lb !== null && e.key === "ArrowLeft") prevLb();
      else if (lb !== null && e.key === "ArrowRight") nextLb();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lb, closeAll, prevLb, nextLb]);

  return (
    <section id="china-events">
      <div className="eyebrow">Gatherings in China</div>
      <h2 className="center display" style={{ marginTop: 0 }}>
        The Celebrations Before the Celebration
      </h2>
      <p className="center" style={{ color: "var(--muted)", maxWidth: 540, margin: "10px auto 0", fontStyle: "italic" }}>
        The friends, events and everyday moments Betty gathered during her years in China. Tap a card to open its story,
        photos and films.
      </p>
      <motion.div
        className="ce-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {CHINA_EVENTS.map((ev) => {
          const imgs = photosOf(ev);
          const nVid = ev.videos?.length ?? 0;
          return (
            <motion.button variants={cardVariants} className="ce-card" key={ev.title} onClick={() => setOpen(ev)}>
              <div className="ce-photo">
                {imgs.length >= 3 ? (
                  <div className="ce-glimpse g3">
                    <span className="gm gm-a">
                      <Image src={imgs[0]} alt="" fill sizes="(max-width:640px) 100vw, 25vw" />
                    </span>
                    <span className="gm gm-b">
                      <Image src={imgs[1]} alt="" fill sizes="12vw" />
                    </span>
                    <span className="gm gm-c">
                      <Image src={imgs[2]} alt="" fill sizes="12vw" />
                    </span>
                  </div>
                ) : imgs.length > 0 ? (
                  <div className="ce-glimpse g1">
                    <Image src={imgs[0]} alt="" fill sizes="(max-width:640px) 100vw, 25vw" />
                  </div>
                ) : (
                  <>
                    <span className="zh-mark zh">{ev.zh}</span>
                    <span className="ph-note">photos coming soon</span>
                  </>
                )}
                {(imgs.length > 0 || nVid > 0) && (
                  <span className="ce-count">
                    {imgs.length > 0 && `${imgs.length} photo${imgs.length > 1 ? "s" : ""}`}
                    {imgs.length > 0 && nVid > 0 && " · "}
                    {nVid > 0 && `${nVid} video${nVid > 1 ? "s" : ""}`}
                  </span>
                )}
              </div>
              <div className="ce-body">
                <div className="ce-when">
                  {ev.where.split(",")[0]} · {ev.when}
                </div>
                <div className="ce-title">{ev.title}</div>
                <div className="ce-desc">{ev.desc}</div>
                <div className="ce-more">Open →</div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="ce-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.target === e.currentTarget && closeAll()}
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
              <button className="ce-modal-close" onClick={closeAll} aria-label="Close">
                ×
              </button>

              {open.videos && open.videos.length > 0 && (
                <div className="ce-modal-videos">
                  {open.videos.map((src) => (
                    <div className="ce-video" key={src}>
                      <video controls playsInline preload="metadata">
                        <source src={src} type="video/mp4" />
                      </video>
                    </div>
                  ))}
                </div>
              )}

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

              {photos.length > 0 ? (
                <div className="ce-modal-gallery">
                  {photos.map((src, i) => (
                    <button
                      className="ce-modal-slot"
                      key={src}
                      onClick={() => setLb(i)}
                      aria-label={`Open photo ${i + 1} of ${photos.length}`}
                    >
                      <Image src={src} alt={`${open.title} — photo ${i + 1}`} fill sizes="30vw" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="ce-modal-gallery">
                  {[0, 1, 2].map((i) => (
                    <div className="ce-modal-slot empty" key={i}>
                      <span className="zh" aria-hidden="true">
                        {open.zh}
                      </span>
                      <small>photo soon</small>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <AnimatePresence>
              {lb !== null && photos[lb] && (
                <motion.div
                  className="ce-lightbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.target === e.currentTarget && setLb(null)}
                >
                  <button className="lb-close" onClick={() => setLb(null)} aria-label="Close photo">
                    ×
                  </button>
                  {photos.length > 1 && (
                    <button className="lb-nav lb-prev" onClick={prevLb} aria-label="Previous photo">
                      ‹
                    </button>
                  )}
                  <div className="lb-box">
                    <Image
                      src={photos[lb]}
                      alt={`${open.title} — photo ${lb + 1}`}
                      width={520}
                      height={680}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  {photos.length > 1 && (
                    <button className="lb-nav lb-next" onClick={nextLb} aria-label="Next photo">
                      ›
                    </button>
                  )}
                  <div className="lb-counter">
                    {lb + 1} / {photos.length}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
