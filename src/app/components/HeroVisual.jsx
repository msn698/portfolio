"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <StaticOrb />,
});

/* Non-3D fallback: pure CSS layered orb, no GPU/JS animation cost. */
function StaticOrb() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <div className="relative w-56 h-56 sm:w-72 sm:h-72">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(249,115,22,0.35) 0%, rgba(239,68,68,0.25) 40%, rgba(42,8,8,0.9) 75%)",
            boxShadow:
              "0 0 80px rgba(239,68,68,0.25), inset 0 0 60px rgba(127,29,29,0.6)",
          }}
        />
        <div className="absolute inset-[-18%] rounded-full border border-orange-500/20 rotate-12" />
        <div className="absolute inset-[-34%] rounded-full border border-red-500/10 -rotate-6" />
      </div>
    </div>
  );
}

function supports3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.connection?.saveData) return false;
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return false;
  } catch {
    return false;
  }
  return true;
}

export default function HeroVisual() {
  const [mode, setMode] = useState("pending");

  useEffect(() => {
    setMode(supports3D() ? "3d" : "static");
  }, []);

  if (mode !== "3d") return <StaticOrb />;
  return <HeroScene />;
}
