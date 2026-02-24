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

const cardVariants = {
  hover: { scale: 1.05 },
};

const SquishyCard = ({ pkg }) => {
  return (
    <motion.article
      whileHover="hover"
      transition={{ duration: 1, ease: "backInOut" }}
      variants={cardVariants}
      className="relative h-[420px] w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#7c3aed] via-[#4f46e5] to-[#0f172a] p-6 border border-white/15"
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

      <Background />
    </motion.article>
  );
};

const Background = () => {
  return (
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
        fill="#111827"
      />
      <motion.ellipse
        variants={{ hover: { scaleY: 2.25, y: -25 } }}
        transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
        cx="160.5"
        cy="300.5"
        rx="101.5"
        ry="43.5"
        fill="#0b1220"
      />
    </motion.svg>
  );
};

const GlowCard = ({ pkg }) => {
  return (
    <article className="glow-glass-card rounded-2xl border border-white/15 p-5">
      <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
      <p className="text-violet-200 mt-1 mb-4">{pkg.price}</p>
      <ul className="space-y-2 text-slate-200/90 text-sm mb-5">
        {pkg.points.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
      <Link
        href={pkg.href}
        className="inline-flex text-sm text-violet-200 hover:text-white hover:translate-x-1 transition-transform duration-200"
      >
        Learn more →
      </Link>
    </article>
  );
};

const ServicePackagesSection = () => {
  return (
    <section id="services" className="py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
        Service Packages
      </h2>
      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8">
        Option B (Squishy) + Option C (Glowing Glass) using the same data.
      </p>

      <div className="mb-10">
        <h3 className="text-white text-lg font-semibold mb-1">Option B — Squishy Card</h3>
        <p className="text-slate-500 text-sm mb-4">Closer to the hover.dev squishy interaction style.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <SquishyCard key={`sq-${pkg.name}`} pkg={pkg} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white text-lg font-semibold mb-1">Option C — Glowing Gradient Glassmorphism</h3>
        <p className="text-slate-500 text-sm mb-4">Prismic-style glowing glass card variation.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <GlowCard key={`gl-${pkg.name}`} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePackagesSection;
