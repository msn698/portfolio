"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const RocketIcon = () => (
  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.98 14.98 0 00-2.58 5.84m2.699 2.7a14.98 14.98 0 00-2.578 5.84" />
  </svg>
);
const UsersIcon = () => (
  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const TrophyIcon = () => (
  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const BoltIcon = () => (
  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const achievementsList = [
  { metric: "Projects",    value: "10",      postfix: "+",  icon: <RocketIcon /> },
  { metric: "Users",       value: "100,000", prefix: "~",   icon: <UsersIcon /> },
  { metric: "Awards",      value: "5",                      icon: <TrophyIcon /> },
  { metric: "Years Exp.",  value: "3",                      icon: <BoltIcon /> },
];

const cardVariants = {
  hidden:  { opacity: 0, rotateX: -30, y: 40 },
  visible: (i) => ({
    opacity: 1, rotateX: 0, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

function useCountUp(target, inView) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

function StatCard({ achievement, index, inView }) {
  const numericTarget = parseInt(achievement.value.replace(/,/g, ""));
  const count = useCountUp(numericTarget, inView);
  const display = achievement.value.includes(",")
    ? count.toLocaleString("en-US")
    : count;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ scale: 1.04, rotateY: 4, translateY: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5 relative overflow-hidden group"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 group-hover:from-primary-500/10 to-transparent transition-all duration-500 rounded-2xl" />
      <div className="mb-2 select-none">{achievement.icon}</div>
      <h2 className="text-white text-2xl sm:text-3xl font-bold flex flex-row items-end relative z-10" style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>
        {achievement.prefix}
        <span>{display}</span>
        {achievement.postfix}
      </h2>
      <p className="text-[#ADB7BE] text-sm sm:text-base mt-1 relative z-10">{achievement.metric}</p>
    </motion.div>
  );
}

const AchievementsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="py-10" ref={ref} style={{ perspective: "800px" }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {achievementsList.map((achievement, index) => (
          <StatCard key={index} achievement={achievement} index={index} inView={inView} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
