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
        <div className="overlay items-center justify-center absolute inset-0 bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          {gitUrl ? (
            <Link
              href={gitUrl}
              target={gitExternal ? "_blank" : undefined}
              rel={gitExternal ? "noopener noreferrer" : undefined}
              className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link transition-all duration-200 hover:scale-110"
            >
              <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            </Link>
          ) : (
            <div className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#555] opacity-70" title="Source code is private" />
          )}
          {hasPreview ? (
            <Link
              href={previewUrl}
              target={previewExternal ? "_blank" : undefined}
              rel={previewExternal ? "noopener noreferrer" : undefined}
              className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link transition-all duration-200 hover:scale-110"
            >
              <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            </Link>
          ) : (
            <div className="h-14 w-14 border-2 relative rounded-full border-[#555] opacity-70" title="Live preview unavailable" />
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
