"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export function AmbientScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight intensity={2} position={[3, 4, 5]} />
        <Float floatIntensity={1.5} rotationIntensity={0.7} speed={1.6}>
          <mesh position={[1.3, 0.1, 0]} rotation={[0.5, 0.8, 0.2]}>
            <icosahedronGeometry args={[1.9, 24]} />
            <MeshDistortMaterial
              color="#f5f5f5"
              distort={0.35}
              emissive="#525252"
              emissiveIntensity={0.25}
              metalness={0.15}
              roughness={0.35}
              speed={1.4}
              transparent
              opacity={0.18}
            />
          </mesh>
        </Float>
        <EffectComposer>
          <Bloom intensity={0.55} luminanceThreshold={0.2} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
