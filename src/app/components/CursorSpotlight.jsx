"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop || !finePointer || !ref.current) return;

    const node = ref.current;
    const onMove = (e) => {
      node.style.left = `${e.clientX}px`;
      node.style.top = `${e.clientY}px`;
      node.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
}
