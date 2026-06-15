'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Coffee Cup (stylised procedural) ── */
function CoffeeCup({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    groupRef.current.position.y =
      (position[1] as number) + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Cup body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.35, 0.65, 32]} />
        <meshStandardMaterial
          color="#1A0F07"
          roughness={0.2}
          metalness={0.1}
          envMapIntensity={0.8}
        />
      </mesh>
      {/* Coffee liquid */}
      <mesh position={[0, 0.27, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.06, 32]} />
        <meshStandardMaterial color="#3D1A08" roughness={0.05} metalness={0} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.38, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.7, 0.06, 32]} />
        <meshStandardMaterial color="#1A0F07" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.52, 0.05, 0]}>
        <torusGeometry args={[0.17, 0.04, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#1A0F07" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}

/* ── Floating Coffee Bean ── */
function CoffeeBean({ position, speed = 1, phase = 0 }: {
  position: [number, number, number];
  speed?: number;
  phase?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.3;
    meshRef.current.rotation.x += 0.008 * speed;
    meshRef.current.rotation.z += 0.005 * speed;
    meshRef.current.position.x = position[0] + Math.sin(t * 0.4) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[0.14, 12, 8]} />
      <MeshDistortMaterial
        color="#2A1205"
        roughness={0.4}
        metalness={0.1}
        distort={0.25}
        speed={2}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

/* ── Steam Particle ── */
function SteamParticle({ startY = 0, delay = 0, x = 0 }: { startY?: number; delay?: number; x?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = 0.3 + Math.random() * 0.2;
  const range = 3.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = ((state.clock.elapsedTime * speed + delay) % 1);
    meshRef.current.position.y = startY + t * range;
    meshRef.current.position.x = x + Math.sin(state.clock.elapsedTime * 1.5 + delay * 5) * 0.15;
    const opacity = t < 0.2 ? t / 0.2 : t > 0.7 ? (1 - t) / 0.3 : 1;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.35;
    const s = 0.03 + t * 0.25;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#B8A898" transparent opacity={0} />
    </mesh>
  );
}

/* ── Scene composition ── */
function Scene() {
  const { size } = useThree();
  const isMobile = size.width < 768;

  const beans = useMemo(() => [
    { pos: [-1.4, 0.4, -0.5] as [number,number,number], speed: 0.8, phase: 0 },
    { pos: [1.6, -0.2, -0.8] as [number,number,number], speed: 1.1, phase: 2 },
    { pos: [-0.8, -0.8, 0.5] as [number,number,number], speed: 0.9, phase: 4 },
    { pos: [1.1, 0.9, 0.3] as [number,number,number], speed: 0.7, phase: 1 },
    { pos: [-1.8, -0.5, 0.2] as [number,number,number], speed: 1.2, phase: 3 },
    { pos: [0.6, -1.2, -0.4] as [number,number,number], speed: 0.6, phase: 5 },
  ], []);

  const steamParticles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: (Math.random() - 0.5) * 0.4,
      delay: i / 12,
      startY: 0.35,
    })), []);

  return (
    <>
      <ambientLight intensity={0.3} color="#C8873A" />
      <pointLight position={[2, 3, 2]} intensity={4} color="#E09B4A" distance={8} decay={2} />
      <pointLight position={[-2, 1, -1]} intensity={2} color="#3C1810" distance={6} decay={2} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={3}
        color="#C8873A"
        castShadow
      />

      {/* <Environment preset="night" /> */}

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.3}>
        <CoffeeCup position={[0, -0.2, 0]} />
      </Float>

      {/* Steam above cup */}
      {steamParticles.map((p, i) => (
        <SteamParticle key={i} startY={p.startY} delay={p.delay} x={p.x} />
      ))}

      {/* Floating beans */}
      {!isMobile && beans.map((b, i) => (
        <CoffeeBean key={i} position={b.pos} speed={b.speed} phase={b.phase} />
      ))}

      {/* Ambient sparkles */}
      <Sparkles
        count={60}
        scale={5}
        size={1.5}
        speed={0.3}
        opacity={0.15}
        color="#C8873A"
      />
    </>
  );
}

interface CoffeeSceneProps {
  className?: string;
}

export function CoffeeScene({ className = '' }: CoffeeSceneProps) {
  return (
    <div className={`${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
