"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal({ y = 48, duration = 0.75, delay = 0, start = "top 88%" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0, willChange: "transform, opacity" },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          clearProps: "willChange",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, start]);

  return ref;
}

/* Scrub-tied stagger: elements reveal in lockstep with the scrollbar
   (reversible), for the scrollytelling sections. No-op under reduced motion. */
export function useScrubStagger({ selector = "[data-scrub]", y = 36, stagger = 0.14, start = "top 82%", end = "top 30%" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(selector),
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger,
          ease: "none",
          scrollTrigger: { trigger: el, start, end, scrub: 0.4 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector, y, stagger, start, end]);

  return ref;
}

export function useScrollRevealStagger({ y = 40, duration = 0.65, stagger = 0.1, selector = ":scope > *", start = "top 88%" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(selector),
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, stagger, selector, start]);

  return ref;
}
