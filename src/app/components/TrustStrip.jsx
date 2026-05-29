"use client";
import React from "react";
import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js",    icon: "▲" },
  { name: "React",      icon: "⚛" },
  { name: "Python",     icon: "🐍" },
  { name: "MongoDB",    icon: "🌿" },
  { name: "AWS / Azure",icon: "☁" },
  { name: "Tailwind CSS",icon: "🎨" },
  { name: "Framer Motion",icon: "✦" },
  { name: "TypeScript", icon: "TS" },
];

// Duplicate for seamless loop
const items = [...techStack, ...techStack];

const TrustStrip = () => {
  return (
    <section className="py-4 overflow-hidden" aria-label="Tech stack">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] py-3 relative overflow-hidden">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-1 mb-2 px-4">
          <span className="text-slate-500 text-xs">Built with</span>
        </div>

        <div className="marquee-track gap-6 px-4">
          {items.map((item, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.08, y: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-slate-200 text-xs font-medium whitespace-nowrap cursor-default select-none"
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
