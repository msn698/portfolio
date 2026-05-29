import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-t-[#33353F] text-white/90">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            © {year} Mohammed Saeed. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <Link
              href="https://github.com/msn698"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/mohammed-saeed-nassar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
