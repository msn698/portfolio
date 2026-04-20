"use client";
import React, { useRef } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";
import { getOrderedProjects } from "../data/projects";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const orderedProjects = getOrderedProjects().slice(0, 4);

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
          transition={{ duration: 0.3, delay: 0.9 }}
          className="md:col-span-1"
        >
          <Link
            href="/projects"
            className="block h-full rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] transition-all p-6 min-h-[360px] md:min-h-[420px]"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Portfolio</p>
                <h3 className="text-2xl font-semibold text-white mb-3">View All Projects</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Explore the full list, including all shipped demos, production builds, and detailed case studies.
                </p>
              </div>

              <div className="text-primary-400 text-sm font-medium mt-6">Open full projects page →</div>
            </div>
          </Link>
        </motion.li>
      </ul>
    </section>
  );
};

export default ProjectsSection;
