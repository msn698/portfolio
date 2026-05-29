import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-primary-500 bg-primary-500/10"
    : "text-[#ADB7BE] border-white/15 hover:border-white/40 hover:text-white";
  return (
    <button
      className={`${buttonStyles} rounded-full border px-4 py-2 text-sm sm:text-base cursor-pointer transition-colors`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
