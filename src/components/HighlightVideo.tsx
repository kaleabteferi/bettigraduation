"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { HIGHLIGHT_VIDEOS } from "@/lib/constants";

export default function HighlightVideo() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  function goTo(i: number) {
    const next = (i + HIGHLIGHT_VIDEOS.length) % HIGHLIGHT_VIDEOS.length;
    const track = trackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    if (track && slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  // Pause other clips when one starts, and keep the dots in sync with swipes.
  function onPlay(i: number) {
    videoRefs.current.forEach((v, j) => j !== i && v && !v.paused && v.pause());
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== active) setActive(Math.max(0, Math.min(i, HIGHLIGHT_VIDEOS.length - 1)));
  }

  return (
    <Reveal id="video">
      <div className="eyebrow">A Look Back</div>
      <h2 className="center display" style={{ marginTop: 0 }}>
        Highlight Films
      </h2>
      <div className="carousel-wrap">
        <button className="car-nav car-prev" onClick={() => goTo(active - 1)} aria-label="Previous video">
          ‹
        </button>
        <div className="carousel" ref={trackRef} onScroll={onScroll}>
          {HIGHLIGHT_VIDEOS.map((v, i) => (
            <figure className="car-slide" key={v.src}>
              <div className="video-slot">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  controls
                  playsInline
                  preload="metadata"
                  poster={v.poster}
                  onPlay={() => onPlay(i)}
                >
                  <source src={v.src} type="video/mp4" />
                </video>
              </div>
              <figcaption className="car-label">{v.label}</figcaption>
            </figure>
          ))}
        </div>
        <button className="car-nav car-next" onClick={() => goTo(active + 1)} aria-label="Next video">
          ›
        </button>
      </div>
      <div className="car-dots" role="tablist" aria-label="Choose video">
        {HIGHLIGHT_VIDEOS.map((v, i) => (
          <button
            key={v.src}
            className={`car-dot ${i === active ? "on" : ""}`}
            onClick={() => goTo(i)}
            aria-label={v.label}
            aria-selected={i === active}
            role="tab"
          />
        ))}
      </div>
    </Reveal>
  );
}
