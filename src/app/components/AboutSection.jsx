"use client";
import React, { useTransition, useState } from "react";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Next.js, React, JavaScript, Python</li>
        <li>UI/UX-focused frontend development</li>
        <li>Performance optimization and SEO fundamentals</li>
        <li>Automation workflows and API integrations</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>BSc Computer Science — University of Wollongong, Dubai</li>
        <li>GEMS United Indian School</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Foundations of Cybersecurity (Google)</li>
        <li>Foundations of Project Management (Google)</li>
        <li>Python Basics (University of Michigan)</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white py-10" id="about">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
        <p className="text-base lg:text-lg text-slate-300 leading-relaxed">
          I build modern, conversion-focused websites for startups and businesses.
          My focus is clean UI, fast performance, and practical outcomes — so your
          website does more than just look good.
        </p>
        <p className="text-base lg:text-lg text-slate-300 leading-relaxed mt-3">
          I care about shipping work that is reliable, measurable, and aligned with
          business goals, from first impression to lead capture.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-slate-400">Focus</p>
            <p className="text-white font-medium">High-converting business websites</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-slate-400">Approach</p>
            <p className="text-white font-medium">Speed, clarity, and measurable UX</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-slate-400">Best fit</p>
            <p className="text-white font-medium">Startups and local businesses</p>
          </div>
        </div>

        <div className="flex flex-row justify-start mt-8">
          <TabButton
            selectTab={() => handleTabChange("skills")}
            active={tab === "skills"}
          >
            Skills
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("education")}
            active={tab === "education"}
          >
            Education
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("certifications")}
            active={tab === "certifications"}
          >
            Certifications
          </TabButton>
        </div>
        <div className="mt-6 text-slate-300">
          {TAB_DATA.find((t) => t.id === tab).content}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
