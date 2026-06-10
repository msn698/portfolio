"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Core() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.z = Math.sin(t * 0.25) * 0.06;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.45}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.0, 2]} />
          <MeshDistortMaterial
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

function OrbitRing({ radius, thickness, tilt, speed, color, opacity }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, thickness, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.mouse.x * 0.45,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.mouse.y * 0.22,
      0.04
    );
  });

  return (
    <>
      <ambientLight intensity={0.18} color="#ffffff" />
      <pointLight position={[3, 3, 3]} color="#ef4444" intensity={2.5} />
      <pointLight position={[-3, 1, 2]} color="#f97316" intensity={1.4} />
      <pointLight position={[0, 2, -5]} color="#ffffff" intensity={1.2} />
      <pointLight position={[0, -4, 1]} color="#450a0a" intensity={1.0} />

      <group ref={groupRef}>
        <Core />
        <Sparkles
          count={55}
          size={1.4}
          speed={0.22}
          opacity={0.45}
          color="#f97316"
          scale={[6.5, 6.5, 6.5]}
        />
        <OrbitRing radius={1.85} thickness={0.005} tilt={[Math.PI * 0.32, 0.18, 0]} speed={0.18} color="#ef4444" opacity={0.32} />
        <OrbitRing radius={2.5} thickness={0.003} tilt={[-Math.PI * 0.15, 0.6, 0]} speed={-0.11} color="#f97316" opacity={0.16} />
        <OrbitRing radius={3.1} thickness={0.002} tilt={[Math.PI * 0.5, 0.4, 0]} speed={0.07} color="#ffffff" opacity={0.06} />
      </group>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 36 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
