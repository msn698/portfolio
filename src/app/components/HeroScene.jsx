"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Core({ scrollRef }) {
  const meshRef = useRef();
  const matRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef.current;
    if (!meshRef.current) return;
    meshRef.current.rotation.y = t * 0.1 + scroll * Math.PI * 1.6;
    meshRef.current.rotation.z = Math.sin(t * 0.25) * 0.06 + scroll * 0.4;
    if (matRef.current) {
      matRef.current.distort = 0.18 + scroll * 0.22;
      matRef.current.emissiveIntensity = 0.2 + scroll * 0.5;
    }
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
          />
        </mesh>
        <mesh scale={1.08}>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshBasicMaterial wireframe color="#f97316" transparent opacity={0.22} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRing({ radius, thickness, tilt, speed, color, opacity, scrollRef }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const scroll = scrollRef.current;
    ref.current.rotation.z = state.clock.getElapsedTime() * speed * (1 + scroll * 2);
    const s = 1 + scroll * 0.35;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, thickness, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Scene({ scrollRef }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const scroll = scrollRef.current;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.mouse.x * 0.45 + scroll * 0.9,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.mouse.y * 0.22 + scroll * 0.35,
      0.04
    );
    // Scroll-driven camera dolly: pulls back and drifts up as the page scrolls.
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5.5 + scroll * 2.0, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, scroll * -0.7, 0.08);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.18} color="#ffffff" />
      <pointLight position={[3, 3, 3]} color="#ef4444" intensity={2.5} />
      <pointLight position={[-3, 1, 2]} color="#f97316" intensity={1.4} />
      <pointLight position={[0, 2, -5]} color="#ffffff" intensity={1.2} />
      <pointLight position={[0, -4, 1]} color="#450a0a" intensity={1.0} />

      <group ref={groupRef}>
        <Core scrollRef={scrollRef} />
        <Sparkles
          count={55}
          size={1.4}
          speed={0.22}
          opacity={0.45}
          color="#f97316"
          scale={[6.5, 6.5, 6.5]}
        />
        <OrbitRing radius={1.85} thickness={0.005} tilt={[Math.PI * 0.32, 0.18, 0]} speed={0.18} color="#ef4444" opacity={0.32} scrollRef={scrollRef} />
        <OrbitRing radius={2.5} thickness={0.003} tilt={[-Math.PI * 0.15, 0.6, 0]} speed={-0.11} color="#f97316" opacity={0.16} scrollRef={scrollRef} />
        <OrbitRing radius={3.1} thickness={0.002} tilt={[Math.PI * 0.5, 0.4, 0]} speed={0.07} color="#ffffff" opacity={0.06} scrollRef={scrollRef} />
      </group>
    </>
  );
}

export default function HeroScene() {
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    // Map the first 1.6 viewport-heights of page scroll to a 0..1 progress
    // value consumed inside the R3F frame loop (no React re-renders).
    const st = ScrollTrigger.create({
      start: 0,
      end: () => window.innerHeight * 1.6,
      scrub: 0.6,
      onUpdate: (self) => {
        scrollRef.current = self.progress;
      },
    });

    // Pause the WebGL frame loop entirely once the hero is off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      st.kill();
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 36 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
