"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "About",    path: "#about"    },
  { title: "Projects", path: "#projects" },
  { title: "Services", path: "#services" },
  { title: "Contact",  path: "#contact"  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-3 w-[95%] max-w-6xl rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300"
        style={{
          background: scrolled ? "rgba(12,12,13,0.92)" : "rgba(18,18,18,0.75)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.45)" : "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div className="flex lg:py-3 flex-wrap items-center justify-between px-4 sm:px-6 py-2.5">
          <Link
            href="/"
            className="logo-font hover-lift inline-flex items-center justify-center h-10 w-10 rounded-xl border border-white/20 bg-gradient-to-br from-primary-500/20 to-secondary-500/10 text-white font-bold tracking-tight transition-all hover:border-primary-400/50"
          >
            MS
          </Link>

          <div className="mobile-menu block md:hidden">
            <button
              onClick={() => setNavbarOpen((v) => !v)}
              className="flex items-center p-2 rounded-lg border border-white/15 text-slate-200 hover:text-white hover:border-white/40 transition-all"
              aria-label={navbarOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={navbarOpen ? "x" : "bars"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {navbarOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
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
        <AnimatePresence>
          {navbarOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <MenuOverlay links={navLinks} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
