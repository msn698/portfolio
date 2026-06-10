"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const JourneyScene = dynamic(() => import("./JourneyScene"), {
  ssr: false,
  loading: () => null,
});

/* Non-3D fallback: static ambient orb, zero JS/GPU animation cost. */
function StaticGlow() {
  return (
    <div className="absolute right-[8%] top-[18%] w-[420px] h-[420px] max-w-[60vw]" aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(249,115,22,0.28) 0%, rgba(239,68,68,0.18) 40%, transparent 75%)",
          boxShadow: "0 0 120px rgba(239,68,68,0.18)",
        }}
      />
      <div className="absolute inset-[-14%] rounded-full border border-orange-500/15 rotate-12" />
      <div className="absolute inset-[-28%] rounded-full border border-red-500/10 -rotate-6" />
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
    if (!(canvas.getContext("webgl2") || canvas.getContext("webgl"))) return false;
  } catch {
    return false;
  }
  return true;
}

/* Fixed full-viewport background layer the whole page scrolls over. */
export default function SceneBackground() {
  const [mode, setMode] = useState("pending");

  useEffect(() => {
    setMode(supports3D() ? "3d" : "static");
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {mode === "3d" ? <JourneyScene /> : mode === "static" ? <StaticGlow /> : null}
    </div>
  );
}
