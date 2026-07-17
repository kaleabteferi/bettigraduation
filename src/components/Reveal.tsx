"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  as = "section",
  id,
  className = "",
}: {
  children: ReactNode;
  as?: "section" | "div";
  id?: string;
  className?: string;
}) {
  const Component: any = as === "section" ? motion.section : motion.div;
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
