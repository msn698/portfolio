"use client";
import React, { useRef, useTransition, useState } from "react";
import { motion, useInView } from "framer-motion";
import TabButton from "./TabButton";
import { useScrubStagger } from "../../hooks/useScrollReveal";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="space-y-2">
        {[
          { label: "Next.js / React / JavaScript", pct: 92 },
          { label: "UI/UX-focused frontend dev",   pct: 88 },
          { label: "Performance & SEO",             pct: 82 },
          { label: "Automation & API integrations", pct: 75 },
          { label: "Python",                        pct: 70 },
        ].map(({ label, pct }) => (
          <li key={label} className="text-sm text-slate-300">
            <div className="flex justify-between mb-1">
              <span>{label}</span>
              <span className="text-slate-500">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: true }}
              />
            </div>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="space-y-3">
        {[
          { school: "BSc Computer Science", sub: "University of Wollongong, Dubai" },
          { school: "GEMS United Indian School", sub: "Secondary Education" },
        ].map(({ school, sub }) => (
          <li key={school} className="flex gap-3 items-start">
            <div className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">{school}</p>
              <p className="text-slate-400 text-xs">{sub}</p>
            </div>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="space-y-3">
        {[
          { name: "Foundations of Cybersecurity",        issuer: "Google" },
          { name: "Foundations of Project Management",   issuer: "Google" },
          { name: "Python Basics",                       issuer: "University of Michigan" },
        ].map(({ name, issuer }) => (
          <li key={name} className="flex gap-3 items-start">
            <div className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">{name}</p>
              <p className="text-slate-400 text-xs">{issuer}</p>
            </div>
          </li>
        ))}
      </ul>
    ),
  },
];

const InfoCard = ({ label, value, delay }) => (
  <motion.div
    whileHover={{ scale: 1.04, rotateY: 6, translateY: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="rounded-xl border border-white/10 bg-black/20 p-4 group relative overflow-hidden"
    style={{ transformStyle: "preserve-3d" }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 group-hover:from-primary-500/8 to-transparent transition-all duration-400 rounded-xl" />
    <p className="text-xs text-slate-400 mb-1">{label}</p>
    <p className="text-white font-medium text-sm">{value}</p>
  </motion.div>
);

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scrubRef = useScrubStagger();

  const handleTabChange = (id) => {
    startTransition(() => setTab(id));
  };

  return (
    <section className="text-white py-10" id="about" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 relative overflow-hidden"
      >
        {/* subtle bg orb */}
        <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.6) 0%, transparent 70%)" }} />

        <div className="section-accent" />
        <div ref={scrubRef}>
        <h2 data-scrub className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
        <p data-scrub className="text-base lg:text-lg text-slate-300 leading-relaxed">
          I build modern, conversion-focused websites for startups and businesses.
          My focus is clean UI, fast performance, and practical outcomes — so your
          website does more than just look good.
        </p>
        <p data-scrub className="text-base lg:text-lg text-slate-300 leading-relaxed mt-3">
          I care about shipping work that is reliable, measurable, and aligned with
          business goals, from first impression to lead capture.
        </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-6" style={{ perspective: "600px" }}>
          <InfoCard label="Focus"    value="High-converting business websites" delay={0} />
          <InfoCard label="Approach" value="Speed, clarity, and measurable UX"  delay={0.1} />
          <InfoCard label="Best fit" value="Startups and local businesses"       delay={0.2} />
        </div>

        <div className="flex flex-row justify-start mt-8">
          <TabButton selectTab={() => handleTabChange("skills")}           active={tab === "skills"}>Skills</TabButton>
          <TabButton selectTab={() => handleTabChange("education")}        active={tab === "education"}>Education</TabButton>
          <TabButton selectTab={() => handleTabChange("certifications")}   active={tab === "certifications"}>Certifications</TabButton>
        </div>
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-slate-300"
        >
          {TAB_DATA.find((t) => t.id === tab).content}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
