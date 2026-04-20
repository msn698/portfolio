"use client";
import React, { useRef } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";
import { getOrderedProjects } from "../data/projects";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const orderedProjects = getOrderedProjects().slice(0, 5);

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-10">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
        Projects
      </h2>
      <p className="text-center text-slate-400 max-w-2xl mx-auto mb-10">
        Featured work selected to keep this section clean. View all projects for the complete portfolio.
      </p>

      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {orderedProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.2 }}
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
              className="inline-block mt-3 text-sm text-primary-400 hover:text-primary-300"
            >
              View case study →
            </Link>
          </motion.li>
        ))}

        <motion.li
          variants={cardVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ duration: 0.3, delay: 1.1 }}
        >
          <Link href="/projects" className="block group">
            <div className="hover-lift h-52 md:h-72 rounded-t-xl relative overflow-hidden border border-white/10 bg-[#151515]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-white/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Portfolio</p>
                  <h3 className="text-2xl font-semibold text-white">View All Projects</h3>
                  <p className="text-slate-300 text-sm mt-2">See full case studies and shipped work</p>
                </div>
              </div>
            </div>
            <div className="hover-lift text-white rounded-b-xl mt-3 bg-white/[0.03] border border-white/10 py-6 px-4">
              <h5 className="text-xl font-semibold mb-2">All Projects</h5>
              <p className="text-[#ADB7BE]">Browse the complete portfolio in one place.</p>
            </div>
          </Link>
        </motion.li>
      </ul>
    </section>
  );
};

export default ProjectsSection;
