"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BEAM_COLOR = "#34d399";
const BEAM_COUNT = 10;

function LaserBeam({ index, total }: { index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  const baseX = useMemo(() => ((index / (total - 1)) - 0.5) * 7, [index, total]);
  const speed = useMemo(() => 0.25 + (index % 3) * 0.1, [index]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.x = baseX + Math.sin(t * speed + phase) * 0.5;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.12 + 0.1 * Math.sin(t * 0.7 + phase);
  });

  return (
    <mesh ref={meshRef} position={[baseX, 0, 0]}>
      <planeGeometry args={[0.015, 18]} />
      <meshBasicMaterial
        color={BEAM_COLOR}
        transparent
        opacity={0.15}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GlowCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.035 + 0.015 * Math.sin(clock.getElapsedTime() * 0.4);
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -0.5]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial
        color={BEAM_COLOR}
        transparent
        opacity={0.04}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <GlowCore />
      {Array.from({ length: BEAM_COUNT }, (_, i) => (
        <LaserBeam key={i} index={i} total={BEAM_COUNT} />
      ))}
    </>
  );
}

export function LaserFlow({ className }: { className?: string }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: false }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}

export function LaserFlowFallback({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        background:
          "radial-gradient(ellipse 70% 90% at 50% 40%, rgba(52,211,153,0.10) 0%, transparent 65%)",
      }}
    />
  );
}
