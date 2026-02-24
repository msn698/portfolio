import React from "react";
import Image from "next/image";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const isExternalUrl = (url) => /^https?:\/\//i.test(url);

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, sourcePrivate }) => {
  const gitExternal = gitUrl ? isExternalUrl(gitUrl) : false;
  const previewExternal = isExternalUrl(previewUrl);

  return (
    <div>
      <div className="h-52 md:h-72 rounded-t-xl relative group overflow-hidden border border-white/10 bg-[#151515]">
        <Image
          src={imgUrl}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-2"
        />
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
          {gitUrl ? (
            <Link
              href={gitUrl}
              target={gitExternal ? "_blank" : undefined}
              rel={gitExternal ? "noopener noreferrer" : undefined}
              className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
            >
              <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            </Link>
          ) : (
            <div className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#555] opacity-70" title="Source code is private" />
          )}
          <Link
            href={previewUrl}
            target={previewExternal ? "_blank" : undefined}
            rel={previewExternal ? "noopener noreferrer" : undefined}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-white/[0.03] border border-white/10 py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
        {sourcePrivate && (
          <p className="text-xs text-amber-300 mt-2">Source code is private</p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
