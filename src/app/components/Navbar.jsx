"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30">
      <div className="mx-auto mt-3 w-[95%] max-w-6xl rounded-2xl border border-white/10 bg-[#121212]/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <div className="flex lg:py-3 flex-wrap items-center justify-between px-4 sm:px-6 py-2.5">
          <Link href="/" className="text-xl md:text-2xl text-white font-semibold tracking-tight">
            Mohammed Saeed
          </Link>
          <div className="mobile-menu block md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center p-2 rounded-lg border border-white/15 text-slate-200 hover:text-white hover:border-white/40"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center p-2 rounded-lg border border-white/15 text-slate-200 hover:text-white hover:border-white/40"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="menu hidden md:block md:w-auto" id="navbar">
            <ul className="flex items-center gap-6 mt-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink href={link.path} title={link.title} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
