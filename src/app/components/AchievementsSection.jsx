"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), { ssr: false });

const achievementsList = [
  { metric: "Projects",    value: "10",      postfix: "+",  icon: "🚀" },
  { metric: "Users",       value: "100,000", prefix: "~",   icon: "👥" },
  { metric: "Awards",      value: "5",                      icon: "🏆" },
  { metric: "Years Exp.",  value: "3",                      icon: "⚡" },
];

const cardVariants = {
  hidden:  { opacity: 0, rotateX: -30, y: 40 },
  visible: (i) => ({
    opacity: 1, rotateX: 0, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const AchievementsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="py-10" ref={ref} style={{ perspective: "800px" }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {achievementsList.map((achievement, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ scale: 1.04, rotateY: 4, translateY: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5 relative overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 group-hover:from-primary-500/10 to-transparent transition-all duration-500 rounded-2xl" />

            <div className="text-2xl mb-2 select-none">{achievement.icon}</div>
            <h2 className="text-white text-2xl sm:text-3xl font-bold flex flex-row items-end relative z-10">
              {achievement.prefix}
              {inView && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value.replace(/,/g, ""))}
                  locale="en-US"
                  className="text-white text-2xl sm:text-3xl font-bold"
                  configs={(_, i) => ({ mass: 1, friction: 100, tension: 140 * (i + 1) })}
                />
              )}
              {achievement.postfix}
            </h2>
            <p className="text-[#ADB7BE] text-sm sm:text-base mt-1 relative z-10">{achievement.metric}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
