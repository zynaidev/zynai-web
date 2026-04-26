"use client";

import { useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;
const SPHERE_RADIUS = 4;
const ACCENT_RATIO = 0.05;

function generateParticleBuffers() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  // Three.js works in linear color space; constructing via THREE.Color
  // ensures the sRGB hex (#BDFF00) is converted correctly per channel.
  const accentColor = new THREE.Color("#BDFF00");
  const whiteColor = new THREE.Color("#FFFFFF");

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const radius = Math.random() * SPHERE_RADIUS;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const color = Math.random() < ACCENT_RATIO ? accentColor : whiteColor;
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  return { colors, positions };
}

// Generated once at module evaluation. Because this module is loaded via
// `next/dynamic` with `ssr: false`, this only runs in the browser.
const { colors, positions } = generateParticleBuffers();

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          array={positions}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          args={[colors, 3]}
          attach="attributes-color"
          array={colors}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        depthWrite={false}
        opacity={0.8}
        size={0.04}
        sizeAttenuation
        transparent
        vertexColors
      />
    </points>
  );
}

export function ParticleField() {
  return (
    <Canvas
      camera={{ fov: 50, position: [0, 0, 8] }}
      dpr={[1, 2]}
      style={{ background: "transparent", height: "100%", width: "100%" }}
    >
      <Particles />
    </Canvas>
  );
}
