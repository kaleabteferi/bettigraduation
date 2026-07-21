"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { EVENT } from "@/lib/constants";

const icons = {
  cap: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4 2 9l10 5 10-5-10-5Z" strokeLinejoin="round" />
      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" strokeLinecap="round" />
      <path d="M22 9v5" strokeLinecap="round" />
    </svg>
  ),
  scroll: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6" strokeLinecap="round" />
      <path d="M7 4a2 2 0 0 0-2 2v2h4V6a2 2 0 0 0-2-2Z" strokeLinejoin="round" />
      <path d="M10 10h6M10 14h6" strokeLinecap="round" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V4" strokeLinecap="round" />
      <path d="M4 20h16" strokeLinecap="round" />
      <path d="m7 14 4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20h16M6 20V7l6-3 6 3v13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20v-4h4v4M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01" strokeLinecap="round" />
    </svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="10" r="2.4" />
      <path d="M3.5 19c.5-3 2.6-5 5.5-5s5 2 5.5 5" strokeLinecap="round" />
      <path d="M15.5 19c.3-2 1.5-3.6 3.6-3.6 1.4 0 2.5.8 3 2" strokeLinecap="round" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-6.5-5.5-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.5 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  ),
};

const CARDS: { icon: keyof typeof icons; lbl: string; val: React.ReactNode; sub?: string; wide?: boolean }[] = [
  { icon: "cap", lbl: "Graduate", val: EVENT.graduateName },
  { icon: "scroll", lbl: "Degree", val: EVENT.degree },
  { icon: "chart", lbl: "Field", val: <>Finance &amp; International Trade</> },
  { icon: "building", lbl: "University", val: EVENT.university, sub: "China 🇨🇳" },
  { icon: "family", lbl: "Hosted By", val: EVENT.hosts },
  { icon: "calendar", lbl: "Date", val: EVENT.dateLabel },
  { icon: "clock", lbl: "Time", val: EVENT.timeLabel, sub: EVENT.timeSub },
  { icon: "pin", lbl: "Venue", val: EVENT.venueLabel, sub: EVENT.venueSub, wide: true },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function EventDetails() {
  return (
    <Reveal id="details">
      <div className="eyebrow">Graduation Celebration</div>
      <h2 className="center display" style={{ marginTop: 0 }}>
        The Details
      </h2>
      <motion.div
        className="card-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {CARDS.map((c) => (
          <motion.div
            variants={cardVariants}
            className="info-card"
            key={c.lbl}
            style={c.wide ? { gridColumn: "1/-1" } : undefined}
          >
            <div className="ic">{icons[c.icon]}</div>
            <div className="lbl">{c.lbl}</div>
            <div className="val">{c.val}</div>
            {c.sub && <div className="sub">{c.sub}</div>}
          </motion.div>
        ))}
      </motion.div>
      <div className="map-wrap">
        <iframe
          src={`https://www.google.com/maps?q=${EVENT.mapLat},${EVENT.mapLng}&z=16&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Venue map — Urael, Bole, Addis Ababa"
        />
      </div>
      <div className="event-actions">
        <button className="btn-primary" onClick={addToCalendar}>
          Add to Calendar
        </button>
        <a className="btn-outline" href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer">
          Get Directions
        </a>
      </div>
    </Reveal>
  );
}

function addToCalendar() {
  // 12:00 PM EAT (UTC+3) → 09:00 UTC. Google Calendar requires an end time; we use late evening.
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Betty's Graduation Celebration 🎓",
    dates: "20260718T090000Z/20260718T190000Z",
    details:
      "Graduation lunch for Bethlehem Abera — Master's in Finance & International Trade, Wuhan Textile University. 邀请您参加 Betty 的毕业典礼! No end time — celebrate freely. Directions: " +
      EVENT.mapsUrl,
    location: `${EVENT.mapLat},${EVENT.mapLng}`,
  });
  window.open(`https://www.google.com/calendar/render?${params.toString()}`, "_blank");
}
