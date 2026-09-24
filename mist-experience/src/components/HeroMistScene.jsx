import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '../store/scrollStore.js';

/**
 * Procedural stand-in for a "premium 3D pine tree / cottage" hero centerpiece.
 * Swap the <group ref={centerpieceRef}> children for a real GLTF via
 * useGLTF('/models/cottage.glb') once you have production assets.
 */
function Centerpiece() {
  const group = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;
    const targetY = pointer.x * 0.35;
    const targetX = pointer.y * 0.12;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
  });

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 0.8, 8]} />
        <meshStandardMaterial color="#4a3324" roughness={0.9} />
      </mesh>
      {[0, 0.55, 1.05, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <coneGeometry args={[1.1 - i * 0.22, 0.75, 10]} />
          <meshStandardMaterial color="#1f3d2e" roughness={0.75} />
        </mesh>
      ))}
      <pointLight position={[1.4, -0.2, 0.6]} intensity={1.4} color="#f0b878" distance={4} />
    </group>
  );
}

function VolumetricMist({ progress }) {
  const materialRef = useRef();
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.85 * (1 - progress);
      materialRef.current.map && (materialRef.current.map.offset.x = clock.elapsedTime * 0.015);
    }
  });

  return (
    <>
      {[-1.5, -0.5, 0.5, 1.5].map((z, i) => (
        <mesh key={i} position={[0, -0.5 + i * 0.15, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[14, 6, 1, 1]} />
          <meshBasicMaterial
            ref={i === 0 ? materialRef : undefined}
            color="#cfd8d3"
            transparent
            opacity={0.5 * (1 - progress)}
            depthWrite={false}
          />
        </mesh>
      ))}
      <Sparkles count={60} scale={[10, 4, 6]} size={3} speed={0.15} opacity={0.4 * (1 - progress)} color="#e8ecec" />
    </>
  );
}

function MountainRange() {
  const shape = useMemo(() => {
    const points = [];
    for (let x = -10; x <= 10; x += 0.5) {
      points.push(new THREE.Vector2(x, Math.sin(x * 0.4) * 0.6 + Math.random() * 0.3 + 1.2));
    }
    return points;
  }, []);

  return (
    <mesh position={[0, -1.2, -6]}>
      <extrudeGeometry
        args={[
          new THREE.Shape([new THREE.Vector2(-10, -2), ...shape, new THREE.Vector2(10, -2)]),
          { depth: 0.5, bevelEnabled: false },
        ]}
      />
      <meshStandardMaterial color="#0e2620" roughness={1} />
    </mesh>
  );
}

export default function HeroMistScene() {
  const heroProgress = useScrollStore((s) => s.heroProgress);

  return (
    <group>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 2]} intensity={0.8} color="#fbe7c6" />
      <fog attach="fog" args={['#101a16', 4, 16]} />
      <MountainRange />
      <VolumetricMist progress={heroProgress} />
      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.3}>
        <Centerpiece />
      </Float>
    </group>
  );
}
