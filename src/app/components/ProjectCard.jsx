"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const isExternalUrl = (url) => /^https?:\/\//i.test(url);

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, sourcePrivate }) => {
  const hasPreview = typeof previewUrl === "string" && previewUrl.trim().length > 0;
  const gitExternal  = gitUrl      ? isExternalUrl(gitUrl)      : false;
  const previewExternal = hasPreview ? isExternalUrl(previewUrl) : false;

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]),  { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]),  { stiffness: 200, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ translateY: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="rounded-xl group"
    >
      <div className="h-52 md:h-72 rounded-t-xl relative overflow-hidden border border-white/10 bg-[#151515]">
        <Image
          src={imgUrl}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="hover-zoom object-cover object-top"
        />
        <div className="overlay items-center justify-center gap-2.5 absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 hidden group-hover:flex group-hover:opacity-100 transition-all duration-300">
          {gitUrl ? (
            <Link
              href={gitUrl}
              target={gitExternal ? "_blank" : undefined}
              rel={gitExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-sm font-medium hover:bg-white/20 hover:border-white/50 transition-all duration-200 cursor-pointer"
            >
              <CodeBracketIcon className="h-4 w-4" />
              Code
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-500 text-sm font-medium cursor-not-allowed select-none">
              <CodeBracketIcon className="h-4 w-4" />
              Private
            </span>
          )}
          {hasPreview ? (
            <Link
              href={previewUrl}
              target={previewExternal ? "_blank" : undefined}
              rel={previewExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-slate-100 transition-all duration-200 cursor-pointer"
            >
              <EyeIcon className="h-4 w-4" />
              Preview
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-500 text-sm font-medium cursor-not-allowed select-none">
              <EyeIcon className="h-4 w-4" />
              No preview
            </span>
          )}
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-0 bg-white/[0.03] border border-t-0 border-white/10 py-5 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 group-hover:from-primary-500/8 to-transparent transition-all duration-400" />
        <h5 className="text-lg font-semibold mb-1.5 relative z-10">{title}</h5>
        <p className="text-[#ADB7BE] text-sm relative z-10">{description}</p>
        {sourcePrivate && (
          <p className="text-xs text-amber-300 mt-2 relative z-10">Source code is private</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
