"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop || !finePointer || !ringRef.current || !dotRef.current) return;

    const ring = ringRef.current;
    const dot = dotRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onDown = () => ring.classList.add("active");
    const onUp = () => ring.classList.remove("active");

    const onOver = (e) => {
      const interactive = e.target.closest("a, button, input, textarea, select, label");
      ring.classList.toggle("hover", Boolean(interactive));
    };

    let raf;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
