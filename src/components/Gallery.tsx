"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/constants";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)),
    []
  );
  const next = useCallback(() => setOpenIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length)), []);

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, prev, next]);

  return (
    <>
      <section id="gallery">
        <div className="eyebrow">Memories</div>
        <h2 className="center display" style={{ marginTop: 0 }}>
          Photo Gallery
        </h2>
        <motion.div
          className="gallery"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              variants={itemVariants}
              className={`g-item ${img.size}`}
              key={img.src}
              onClick={() => setOpenIndex(i)}
              aria-label={`View photo: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 50vw, 25vw" />
              <span className="g-cap" aria-hidden="true">
                {img.alt}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <div className={`lightbox ${openIndex !== null ? "open" : ""}`} onClick={(e) => e.target === e.currentTarget && close()}>
        <button className="lb-close" onClick={close} aria-label="Close">
          ×
        </button>
        {openIndex !== null && (
          <>
            <button className="lb-nav lb-prev" onClick={prev} aria-label="Previous">
              ‹
            </button>
            <div className="lb-box">
              <Image
                src={GALLERY_IMAGES[openIndex].src}
                alt={GALLERY_IMAGES[openIndex].alt}
                width={480}
                height={600}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="lb-cap">{GALLERY_IMAGES[openIndex].alt}</div>
            <button className="lb-nav lb-next" onClick={next} aria-label="Next">
              ›
            </button>
          </>
        )}
      </div>
    </>
  );
}
