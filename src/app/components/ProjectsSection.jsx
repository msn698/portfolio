"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { projects } from "../data/projects";

const projectsData = projects.map((project) => ({
  id: project.id,
  slug: project.slug,
  title: project.title,
  description: project.shortDescription,
  image: project.image,
  tag: ["All", ...project.tags],
  gitUrl: project.repoUrl,
  previewUrl: project.liveUrl,
  sourcePrivate: project.sourcePrivate,
}));

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-10">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
        Projects
      </h2>
      <p className="text-center text-slate-400 max-w-2xl mx-auto mb-6">
        A mix of product builds and practical tools focused on performance and usability.
      </p>
      <div className="text-white flex flex-wrap justify-center items-center gap-2 py-4">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="JavaScript"
          isSelected={tag === "JavaScript"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Python"
          isSelected={tag === "Python"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
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
      </ul>
    </section>
  );
};

export default ProjectsSection;
