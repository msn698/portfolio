"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const packages = [
  {
    name: "Starter",
    price: "AED 299",
    href: "/services/starter",
    points: [
      "1-page modern website",
      "Mobile-first responsive design",
      "WhatsApp + contact form integration",
    ],
  },
  {
    name: "Growth",
    price: "AED 699",
    href: "/services/growth",
    points: [
      "Multi-section/business website",
      "Conversion-focused UX + copy",
      "Speed optimization + analytics",
    ],
  },
  {
    name: "Custom",
    price: "Custom",
    href: "/services/custom",
    points: [
      "Advanced integrations",
      "Custom feature implementation",
      "Ongoing iteration support",
    ],
  },
];

const themes = [
  {
    name: "Theme 1 — Indigo Pop (original)",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 45%, #0f172a 100%)",
    border: "rgba(255,255,255,0.16)",
    circle: "#111827",
    ellipse: "#0b1220",
  },
  {
    name: "Theme 2 — Purple Surge",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 42%, #4c1d95 75%, #1e1b4b 100%)",
    border: "rgba(233, 213, 255, 0.28)",
    circle: "#2b1a56",
    ellipse: "#20143f",
  },
  {
    name: "Theme 3 — Sunset Neon",
    gradient: "linear-gradient(135deg, #ff6a3d 0%, #f43f5e 45%, #1f1147 100%)",
    border: "rgba(255,184,163,0.36)",
    circle: "#2a1024",
    ellipse: "#1f0e1c",
  },
  {
    name: "Theme 4 — Electric Ocean",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 45%, #172554 100%)",
    border: "rgba(147,234,255,0.3)",
    circle: "#0f1f37",
    ellipse: "#0a1931",
  },
  {
    name: "Theme 5 — Aurora Emerald",
    gradient: "linear-gradient(135deg, #22c55e 0%, #14b8a6 45%, #11332b 100%)",
    border: "rgba(167,243,208,0.28)",
    circle: "#122f2b",
    ellipse: "#0c241f",
  },
  {
    name: "Theme 6 — Royal Violet + Magenta",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #9333ea 40%, #db2777 100%)",
    border: "rgba(244, 114, 182, 0.32)",
    circle: "#32104e",
    ellipse: "#240d3a",
  },
  {
    name: "Theme 7 — Cyber Blue + Purple",
    gradient: "linear-gradient(135deg, #2563eb 0%, #4f46e5 45%, #7c3aed 100%)",
    border: "rgba(147, 197, 253, 0.34)",
    circle: "#172554",
    ellipse: "#1e1b4b",
  },
  {
    name: "Theme 8 — Midnight Gold Accent",
    gradient: "linear-gradient(135deg, #1f2937 0%, #111827 55%, #f59e0b 100%)",
    border: "rgba(251, 191, 36, 0.3)",
    circle: "#1f2937",
    ellipse: "#111827",
  },
  {
    name: "Theme 9 — Deep Crimson Neon",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #be123c 45%, #fb7185 100%)",
    border: "rgba(251, 113, 133, 0.33)",
    circle: "#3f0f1a",
    ellipse: "#2e0c14",
  },
  {
    name: "Theme 10 — Teal + Indigo Luxe",
    gradient: "linear-gradient(135deg, #0f766e 0%, #0891b2 45%, #4338ca 100%)",
    border: "rgba(45, 212, 191, 0.3)",
    circle: "#134e4a",
    ellipse: "#1e3a8a",
  },
  {
    name: "Theme 11 — Graphite + Electric Lime",
    gradient: "linear-gradient(135deg, #111827 0%, #1f2937 55%, #84cc16 100%)",
    border: "rgba(163, 230, 53, 0.3)",
    circle: "#1f2937",
    ellipse: "#111827",
  },
  {
    name: "Theme 12 — Obsidian + Cyan Pulse",
    gradient: "linear-gradient(135deg, #0b1120 0%, #111827 50%, #22d3ee 100%)",
    border: "rgba(34, 211, 238, 0.3)",
    circle: "#0f172a",
    ellipse: "#1e293b",
  },
];

const cardVariants = { hover: { scale: 1.05 } };

const SquishyCard = ({ pkg, theme }) => (
  <motion.article
    whileHover="hover"
    transition={{ duration: 1, ease: "backInOut" }}
    variants={cardVariants}
    className="relative h-[420px] w-full shrink-0 overflow-hidden rounded-xl p-6"
    style={{
      background: theme.gradient,
      border: `1px solid ${theme.border}`,
    }}
  >
    <div className="relative z-10 text-white">
      <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white">
        {pkg.name}
      </span>
      <motion.span
        initial={{ scale: 0.85 }}
        variants={{ hover: { scale: 1 } }}
        transition={{ duration: 1, ease: "backInOut" }}
        className="my-2 block origin-top-left font-mono text-5xl font-black leading-[1.1]"
      >
        {pkg.price}
      </motion.span>
      <ul className="mt-3 space-y-2 text-sm text-white/90">
        {pkg.points.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
    </div>

    <Link
      href={pkg.href}
      className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white"
    >
      Learn More
    </Link>

    <Background theme={theme} />
  </motion.article>
);

const Background = ({ theme }) => (
  <motion.svg
    width="320"
    height="420"
    viewBox="0 0 320 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 z-0 h-full w-full"
    variants={{ hover: { scale: 1.5 } }}
    transition={{ duration: 1, ease: "backInOut" }}
  >
    <motion.circle
      variants={{ hover: { scaleY: 0.5, y: -25 } }}
      transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
      cx="160.5"
      cy="124.5"
      r="101.5"
      fill={theme.circle}
    />
    <motion.ellipse
      variants={{ hover: { scaleY: 2.25, y: -25 } }}
      transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
      cx="160.5"
      cy="300.5"
      rx="101.5"
      ry="43.5"
      fill={theme.ellipse}
    />
  </motion.svg>
);

const ServicePackagesSection = () => {
  return (
    <section id="services" className="py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
        Service Packages
      </h2>
      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8">
        Squishy card only — compare all color options.
      </p>

      {themes.map((theme) => (
        <div key={theme.name} className="mb-10">
          <h3 className="text-white text-lg font-semibold mb-1">{theme.name}</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {packages.map((pkg) => (
              <SquishyCard key={`${theme.name}-${pkg.name}`} pkg={pkg} theme={theme} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ServicePackagesSection;
