"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Scroll choreography keyframes. `t` is global page-scroll progress (0..1).
 * x is in units of the responsive horizontal offset (so the object hugs the
 * right column on wide screens and stays near center on narrow ones).
 *   hero      -> object right, fully formed
 *   about     -> flies left, shrinks, calms down
 *   projects  -> core dissolves, sparkles explode into a starfield
 *   services  -> quiet starfield drift
 *   contact   -> re-forms center, brighter (CTA moment)
 */
const KEYFRAMES = [
  { t: 0.0,  x:  1.0, y: 0.0,  scale: 1.0,  core: 1, ring: 1.0,  stars: 1.0, glow: 0.22 },
  { t: 0.14, x: -1.1, y: 0.25, scale: 0.72, core: 1, ring: 0.55, stars: 1.3, glow: 0.16 },
  { t: 0.30, x:  0.0, y: 0.0,  scale: 0.95, core: 0.25, ring: 0.12, stars: 4.5, glow: 0.55 },
  { t: 0.46, x:  0.0, y: 0.1,  scale: 1.0,  core: 0, ring: 0.0,  stars: 8.0, glow: 0.0 },
  { t: 0.72, x:  0.0, y: -0.2, scale: 1.0,  core: 0, ring: 0.0,  stars: 6.5, glow: 0.0 },
  { t: 0.88, x:  0.0, y: 0.0,  scale: 1.05, core: 1, ring: 0.85, stars: 2.0, glow: 0.6 },
  { t: 1.0,  x:  0.0, y: 0.0,  scale: 1.05, core: 1, ring: 0.85, stars: 2.0, glow: 0.7 },
];

const smooth = (t) => t * t * (3 - 2 * t);

function sample(progress) {
  let a = KEYFRAMES[0];
  let b = KEYFRAMES[KEYFRAMES.length - 1];
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (progress >= KEYFRAMES[i].t && progress <= KEYFRAMES[i + 1].t) {
      a = KEYFRAMES[i];
      b = KEYFRAMES[i + 1];
      break;
    }
  }
  const span = b.t - a.t || 1;
  const k = smooth(Math.min(1, Math.max(0, (progress - a.t) / span)));
  const lerp = (p, q) => p + (q - p) * k;
  return {
    x: lerp(a.x, b.x),
    y: lerp(a.y, b.y),
    scale: lerp(a.scale, b.scale),
    core: lerp(a.core, b.core),
    ring: lerp(a.ring, b.ring),
    stars: lerp(a.stars, b.stars),
    glow: lerp(a.glow, b.glow),
  };
}

function Core({ stateRef }) {
  const meshRef = useRef();
  const matRef = useRef();
  const wireRef = useRef();

  useFrame((rootState) => {
    const t = rootState.clock.getElapsedTime();
    const s = stateRef.current;
    if (!meshRef.current) return;
    meshRef.current.rotation.y = t * 0.1 + s.progress * Math.PI * 2.2;
    meshRef.current.rotation.z = Math.sin(t * 0.25) * 0.06;
    const coreScale = Math.max(0.0001, s.core);
    meshRef.current.parent.scale.setScalar(coreScale);
    if (matRef.current) {
      matRef.current.opacity = s.core;
      matRef.current.emissiveIntensity = s.glow;
      matRef.current.distort = 0.18 + (1 - s.core) * 0.45;
    }
    if (wireRef.current) wireRef.current.opacity = 0.22 * s.core;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.45}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.0, 2]} />
          <MeshDistortMaterial
            ref={matRef}
            color="#2a0808"
            emissive="#7f1d1d"
            emissiveIntensity={0.2}
            roughness={0.25}
            metalness={0.8}
            distort={0.18}
            speed={1.6}
            transparent
          />
        </mesh>
        <mesh scale={1.08}>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshBasicMaterial ref={wireRef} wireframe color="#f97316" transparent opacity={0.22} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRing({ radius, thickness, tilt, speed, color, opacity, stateRef }) {
  const ref = useRef();
  const matRef = useRef();
  useFrame((rootState) => {
    if (!ref.current) return;
    const s = stateRef.current;
    ref.current.rotation.z = rootState.clock.getElapsedTime() * speed * (1 + s.progress);
    if (matRef.current) matRef.current.opacity = opacity * s.ring;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, thickness, 16, 120]} />
      <meshBasicMaterial ref={matRef} color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Starfield({ stateRef }) {
  const ref = useRef();
  useFrame((rootState) => {
    if (!ref.current) return;
    const s = stateRef.current;
    ref.current.scale.setScalar(s.stars);
    ref.current.rotation.y = rootState.clock.getElapsedTime() * 0.015;
  });
  return (
    <group ref={ref}>
      <Sparkles count={55} size={1.4} speed={0.22} opacity={0.45} color="#f97316" scale={[6.5, 6.5, 6.5]} />
      <Sparkles count={45} size={0.9} speed={0.12} opacity={0.3} color="#ef4444" scale={[5, 5, 5]} />
    </group>
  );
}

function Scene({ stateRef }) {
  const groupRef = useRef();

  useFrame((rootState) => {
    if (!groupRef.current) return;
    const s = stateRef.current;
    // Responsive horizontal travel: hug the side columns on wide screens,
    // stay near center on narrow ones.
    const xUnit = THREE.MathUtils.clamp(rootState.viewport.width * 0.2, 0.4, 1.9);
    const targetX = s.x * xUnit;
    const g = groupRef.current;
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.07);
    g.position.y = THREE.MathUtils.lerp(g.position.y, s.y, 0.07);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s.scale, 0.07));
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, rootState.mouse.x * 0.3 + s.progress * 1.2, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -rootState.mouse.y * 0.18, 0.04);
  });

  return (
    <>
      <ambientLight intensity={0.18} color="#ffffff" />
      <pointLight position={[3, 3, 3]} color="#ef4444" intensity={2.5} />
      <pointLight position={[-3, 1, 2]} color="#f97316" intensity={1.4} />
      <pointLight position={[0, 2, -5]} color="#ffffff" intensity={1.2} />
      <pointLight position={[0, -4, 1]} color="#450a0a" intensity={1.0} />

      <group ref={groupRef}>
        <Core stateRef={stateRef} />
        <Starfield stateRef={stateRef} />
        <OrbitRing radius={1.85} thickness={0.005} tilt={[Math.PI * 0.32, 0.18, 0]} speed={0.18} color="#ef4444" opacity={0.32} stateRef={stateRef} />
        <OrbitRing radius={2.5} thickness={0.003} tilt={[-Math.PI * 0.15, 0.6, 0]} speed={-0.11} color="#f97316" opacity={0.16} stateRef={stateRef} />
        <OrbitRing radius={3.1} thickness={0.002} tilt={[Math.PI * 0.5, 0.4, 0]} speed={0.07} color="#ffffff" opacity={0.06} stateRef={stateRef} />
      </group>
    </>
  );
}

export default function JourneyScene() {
  // Mutable per-frame state; written by ScrollTrigger, read in useFrame —
  // no React re-renders on scroll.
  const stateRef = useRef({ progress: 0, ...sample(0) });

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        stateRef.current = { progress: self.progress, ...sample(self.progress) };
      },
    });
    return () => st.kill();
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 36 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene stateRef={stateRef} />
    </Canvas>
  );
}
