import React from "react";

const trustItems = [
  "Next.js",
  "React",
  "Python",
  "MongoDB",
  "AWS/Azure",
  "Dubai, UAE",
];

const TrustStrip = () => {
  return (
    <section className="py-4">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
          <span className="text-slate-400">Working with:</span>
          {trustItems.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-full border border-white/15 text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
