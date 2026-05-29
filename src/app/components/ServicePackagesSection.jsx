"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

const packages = [
  {
    name: "Starter",
    price: "AED 299",
    href: "/services/starter",
    badge: "Best to start",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accent: "#4f8ef7",
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
    badge: "Most popular",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)",
    accent: "#c084fc",
    points: [
      "Multi-section business website",
      "Conversion-focused UX + copy",
      "Speed optimization + analytics",
    ],
  },
  {
    name: "Custom",
    price: "Custom",
    href: "/services/custom",
    badge: "For scale",
    gradient: "linear-gradient(135deg, #0a1a0e 0%, #0f2d1b 50%, #1a3a10 100%)",
    accent: "#4ade80",
    points: [
      "Advanced integrations",
      "Custom feature implementation",
      "Ongoing iteration support",
    ],
  },
];

const PackageCard = ({ pkg, index }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "800px" }}
    >
      <motion.article
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", background: pkg.gradient }}
        whileHover={{ translateY: -8 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="relative h-[420px] w-full shrink-0 overflow-hidden rounded-2xl p-6 border border-white/10 group"
      >
        {/* animated blob */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: index }}
          className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-2xl opacity-30 pointer-events-none"
          style={{ background: pkg.accent }}
        />
        {/* glow line at top */}
        <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${pkg.accent}66, transparent)` }} />

        <div className="relative z-10 text-white h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              {pkg.name}
            </span>
            <span className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: `${pkg.accent}22`, color: pkg.accent, border: `1px solid ${pkg.accent}44` }}>
              {pkg.badge}
            </span>
          </div>

          <div className="mb-4">
            <span className="text-4xl font-black tracking-tight" style={{ color: pkg.accent }}>{pkg.price}</span>
          </div>

          <ul className="space-y-2.5 flex-1">
            {pkg.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-white/85">
                <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke={pkg.accent} strokeWidth="1.5" strokeOpacity="0.5" />
                  <path d="M5 8l2 2 4-4" stroke={pkg.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          <Link
            href={pkg.href}
            className="mt-6 block rounded-xl py-2.5 text-center text-sm font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: pkg.accent, color: "#0a0a0a" }}
          >
            Learn More →
          </Link>
        </div>
      </motion.article>
    </motion.div>
  );
};

const ServicePackagesSection = () => {
  return (
    <section id="services" className="py-10">
      <div className="section-accent" />
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
        Service Packages
      </h2>
      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-10">
        Straightforward packages built for real business goals — no guesswork, no bloated proposals.
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        {packages.map((pkg, i) => (
          <PackageCard key={pkg.name} pkg={pkg} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ServicePackagesSection;
