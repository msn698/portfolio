"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="pt-6 lg:pt-10" aria-label="Introduction">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300 mb-5">
            Available for freelance work
          </div>

          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Modern websites that look
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500">
              {" "}
              premium
            </span>
            <br />
            and convert better.
          </h1>

          <p className="text-[#ADB7BE] text-base sm:text-lg mb-5 max-w-2xl">
            I’m Saeed — a web developer focused on clean UI, performance, and
            practical business outcomes.
          </p>

          <div className="text-slate-300 text-sm sm:text-base mb-8">
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
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium shadow-lg shadow-primary-900/25 hover:opacity-95 transition-opacity"
              aria-label="Contact me"
            >
              Start a Project
            </Link>
            <a
              href="/Mohammed_Saeed_CV.pdf"
              download="Mohammed_Saeed_CV.pdf"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/15 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
              aria-label="Download CV"
            >
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="section-glow relative rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 pointer-events-none" />
            <div className="relative rounded-2xl bg-[#171717] border border-white/10 p-4">
              <Image
                src="/images/hero-image.png"
                alt="Mohammed Saeed - Web Developer and Project Manager"
                width={420}
                height={420}
                className="w-full h-auto object-contain"
                priority
                loading="eager"
                quality={90}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
