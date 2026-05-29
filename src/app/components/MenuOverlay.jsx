import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links }) => {
  return (
    <ul className="flex flex-col py-3 px-4 border-t border-white/10 bg-black/20 rounded-b-2xl">
      {links.map((link, index) => (
        <li key={index} className="py-1">
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
