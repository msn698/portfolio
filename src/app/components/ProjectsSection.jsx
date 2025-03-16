"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "VouchPro",
    description: "A Discord bot for vouching and scammer alerts",
    image: "/images/projects/vouchpro.png",
    tag: ["All", "Web", "Python"],
    gitUrl: "https://vouchpro.us",
    previewUrl: "https://vouchpro.us",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "The Website you are currently viewing",
    image: "/images/projects/1.png",
    tag: ["All", "Web", "JavaScript"],
    gitUrl: "https://github.com/msn698/portfolio",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Recipe Sharing Website",
    description: "Website for sharing recipes",
    image: "/images/projects/2.png",
    tag: ["All", "Web", "JavaScript"],
    gitUrl: "https://github.com/msn698/recipe-sharing-app",
    previewUrl: "http://157.230.25.150:8080",
  },
  {
    id: 4,
    title: "Internet Speed Test Application",
    description: "Internet Speed Test Application using Python",
    image: "/images/projects/3.png",
    tag: ["All", "Python"],
    gitUrl: "https://github.com/msn698/internet-speed-test/",
    previewUrl: "https://github.com/msn698/internet-speed-test/",
  },
  {
    id: 5,
    title: "Dinosaur Chrome Game",
    description: "Dinosaur Chrome Game using Python",
    image: "/images/projects/4.png",
    tag: ["All", "Python"],
    gitUrl: "https://github.com/msn698/Python-Chrome-Dinosaur-Game",
    previewUrl: "https://github.com/msn698/Python-Chrome-Dinosaur-Game",
  },
  {
    id: 6,
    title: "BMI Weight Calculator",
    description: "Calculate Your BMI and Weight Category using Python",
    image: "/images/projects/5.png",
    tag: ["All", "Python"],
    gitUrl: "https://github.com/msn698/MBI-Calculator",
    previewUrl: "https://github.com/msn698/MBI-Calculator",
  },
  /* 
  {
    id: 6,
    title: "Full-stack Roadmap",
    description: "Project 5 description",
    image: "/images/projects/6.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  */
];

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
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
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
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
