"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[200] origin-left"
      style={{
        height: "2px",
        background: "linear-gradient(90deg, #ef4444 0%, #f97316 60%, #ef4444 100%)",
        transform: "scaleX(0)",
        boxShadow: "0 0 8px rgba(239,68,68,0.6)",
      }}
    />
  );
}
