"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-white/10 animate-pulse bg-white/[0.02]" />
    </div>
  ),
});

const Orb = ({ className, style }) => (
  <div className={`absolute rounded-full pointer-events-none orb-pulse ${className}`} style={style} />
);

const HeroSection = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Saeed, I saw your portfolio and want to discuss a project.")}`
    : null;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="pt-6 lg:pt-10 relative" aria-label="Introduction">
      {/* Background orbs */}
      <Orb
        className="orb-float-1 w-96 h-96 -left-32 -top-20 blur-[80px] opacity-30"
        style={{ background: "radial-gradient(circle, rgba(239,68,68,0.55) 0%, transparent 70%)" }}
      />
      <Orb
        className="orb-float-2 w-72 h-72 right-0 top-10 blur-[72px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.55) 0%, transparent 70%)" }}
      />
      <Orb
        className="orb-float-3 w-48 h-48 left-1/2 bottom-0 blur-[60px] opacity-15"
        style={{ background: "radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)" }}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
        {/* ── Left: text ─────────────────────────────── */}
        <motion.div
          className="lg:col-span-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Available for freelance work
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-white text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.06] tracking-tight mb-5"
          >
            Modern websites that<br />
            look{" "}
            <span className="gradient-text">premium</span>
            <br />
            and convert better.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-[#ADB7BE] text-base sm:text-lg mb-4 max-w-xl leading-relaxed">
            I&apos;m Saeed — a web developer focused on clean UI, performance, and
            practical business outcomes.
          </motion.p>

          <motion.div variants={itemVariants} className="text-slate-300 text-sm sm:text-base mb-6 flex items-center gap-2">
            <span className="text-slate-500">↳</span>
            <TypeAnimation
              sequence={[
                "Web Developer",
                1600,
                "Frontend Engineer",
                1600,
                "Project Manager",
                1600,
                "Video Editor",
                1600,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              aria-label="Animated text showing different roles"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2.5">
            <Link
              href="/#contact"
              className="hover-lift inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold shadow-lg shadow-primary-900/30 hover:opacity-95 transition-opacity"
              aria-label="Contact me"
            >
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#25D366]/60 bg-[#25D366]/10 text-[#C8FAD9] font-semibold hover:bg-[#25D366]/20 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.847L.057 23.882l6.197-1.484A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.013-1.374l-.36-.213-3.681.882.935-3.576-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
                WhatsApp Me
              </a>
            )}
            <a
              href="/Mohammed_Saeed_CV.pdf"
              download="Mohammed_Saeed_CV.pdf"
              className="hover-lift inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors"
              aria-label="Download CV"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: 3D scene ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 z-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-primary-900/40 pointer-events-none"
          >
            Open to work
          </motion.div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-6 left-4 z-20 bg-[#1a1a1a] border border-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg inline-flex items-center gap-1.5 pointer-events-none"
          >
            <svg className="w-3 h-3 text-red-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Dubai-based
          </motion.div>

          {/* 3D Canvas */}
          <div className="w-full h-[380px] sm:h-[460px] lg:h-[520px]">
            <HeroScene />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
