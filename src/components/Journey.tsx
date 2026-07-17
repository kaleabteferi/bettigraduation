"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { JOURNEY } from "@/lib/constants";

export default function Journey() {
  return (
    <section id="journey">
      <div className="eyebrow">A Journey of Excellence</div>
      <h2 className="center display" style={{ marginTop: 0 }}>
        From Wuhan to Addis Ababa
      </h2>
      <div className="timeline">
        {JOURNEY.map((item, i) => (
          <motion.div
            className="t-item"
            key={item.title}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
          >
            <div className="thumb">
              {item.img ? (
                <Image src={item.img} alt={item.title} width={56} height={56} />
              ) : (
                <span>{item.icon}</span>
              )}
            </div>
            <div className="txt">
              <div className="h">{item.title}</div>
              <div className="d">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
