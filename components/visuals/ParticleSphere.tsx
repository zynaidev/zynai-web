"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const mouse = { x: 0, y: 0 };
const targetRotation = { x: 0, y: 0 };

const PARTICLE_COUNT = 1800;
const SPHERE_RADIUS = 3.2;

// Deterministic PRNG (mulberry32) so particle placement/colors stay stable
// across re-renders and satisfy React's render-purity rules.
function makeRng(seed: number) {
  let state = seed >>> 0;
  return function rng() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function SphereParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    const white = new THREE.Color("#FFFFFF");
    const lime = new THREE.Color("#BDFF00");
    const dimWhite = new THREE.Color("#888888");

    const rng = makeRng(0x5eed_5eed);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      const phi = (2 * Math.PI * i) / goldenRatio;

      const x = SPHERE_RADIUS * Math.sin(theta) * Math.cos(phi);
      const y = SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi);
      const z = SPHERE_RADIUS * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const rand = rng();
      let color: THREE.Color;
      if (rand < 0.03) {
        color = lime;
      } else if (rand < 0.7) {
        color = white;
      } else {
        color = dimWhite;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.008;

    targetRotation.x = mouse.y * 0.15;
    targetRotation.y += (mouse.x * 0.15 - targetRotation.y) * 0.03;

    pointsRef.current.rotation.x +=
      (targetRotation.x - pointsRef.current.rotation.x) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function ParticleSphere() {
  const isMobile = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("resize", onStoreChange);
      return () => window.removeEventListener("resize", onStoreChange);
    },
    () => {
      if (typeof window === "undefined") return true;
      return (
        window.innerWidth < 1024 ||
        window.matchMedia("(pointer: coarse)").matches ||
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
      );
    },
    () => true,
  );

  useEffect(() => {
    if (isMobile) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0, 7], fov: 50 }}
      events={undefined}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        pointerEvents: "none",
        touchAction: "none",
        userSelect: "none",
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      dpr={[1, 1.5]}
    >
      <SphereParticles />
    </Canvas>
  );
}
