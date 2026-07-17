"use client";

import Image from "next/image";
import { EVENT } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg">
        <Image
          src="/images/hero-blossom.png"
          alt="Betelhem Abera in her graduation cap among cherry blossoms, with Wuhan Textile University and the Great Wall behind her"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-veil" />

      <div className="hero-content">
        <div className="hero-script">You&apos;re Invited</div>
        <div className="hero-zh zh">{EVENT.inviteZh}</div>
        <div className="hero-py">{EVENT.invitePinyin}</div>

        <h1>Betelhem Abera</h1>
        <div className="role">
          {EVENT.degree} · {EVENT.role}
        </div>
        <div className="yr">
          {EVENT.university} · {EVENT.country} · {EVENT.classOf}
        </div>
        <p className="desc">
          From the lecture halls of Wuhan to a joyful lunch in Addis Ababa — join us as we honor this milestone
          together.
        </p>

        <div className="hero-cta">
          <a href="#details" className="btn-primary">
            Celebration Details
          </a>
          <a href={EVENT.mapsUrl} className="btn-outline" target="_blank" rel="noopener noreferrer">
            Get Directions
          </a>
        </div>
      </div>

      <div className="scroll-hint">
        <span>scroll</span>↓
      </div>
    </section>
  );
}
