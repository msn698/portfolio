"use client";
import React, { useRef } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";
import { getOrderedProjects } from "../data/projects";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const orderedProjects = getOrderedProjects().slice(0, 5);

  return (
    <section id="projects" className="py-10">
      <div className="section-accent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Selected Projects
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A curated selection of shipped work. Each project is built with performance
          and conversion in mind.
        </p>
      </motion.div>

      <ul ref={ref} className="grid md:grid-cols-3 gap-6 md:gap-8" style={{ perspective: "1000px" }}>
        {orderedProjects.map((project, index) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCard
              title={project.title}
              description={project.shortDescription}
              imgUrl={project.image}
              gitUrl={project.repoUrl}
              previewUrl={project.liveUrl}
              sourcePrivate={project.sourcePrivate}
            />
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 mt-3 text-sm text-primary-400 hover:text-primary-300 transition-colors group"
            >
              View case study
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.li>
        ))}

        <motion.li
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/projects" className="block group h-full">
            <motion.div
              whileHover={{ scale: 1.02, translateY: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="h-52 md:h-72 rounded-t-xl relative overflow-hidden border border-white/10 bg-[#151515]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-white/5 group-hover:from-primary-500/30 transition-all duration-400" />
              {/* animated dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full border border-white/5 animate-ping" style={{ animationDuration: "3s" }} />
                <div className="absolute w-20 h-20 rounded-full border border-white/8 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                <div className="text-center px-6 relative z-10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-medium">Portfolio</p>
                  <h3 className="text-2xl font-bold text-white">View All Projects</h3>
                  <p className="text-slate-300 text-sm mt-2">Full case studies & shipped work</p>
                </div>
              </div>
            </motion.div>
            <div className="text-white rounded-b-xl mt-0 bg-white/[0.03] border border-t-0 border-white/10 py-5 px-4 group-hover:bg-white/[0.05] transition-colors">
              <h5 className="text-lg font-semibold mb-1.5">All Projects</h5>
              <p className="text-[#ADB7BE] text-sm">Browse the complete portfolio in one place.</p>
            </div>
          </Link>
        </motion.li>
      </ul>
    </section>
  );
};

export default ProjectsSection;
