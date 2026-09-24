import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '../store/scrollStore.js';

function Jacuzzi({ visible }) {
  const steamRef = useRef();
  useFrame(({ clock }) => {
    if (steamRef.current) {
      steamRef.current.position.y = 0.4 + Math.sin(clock.elapsedTime * 0.8) * 0.05;
    }
  });
  if (!visible) return null;
  return (
    <group position={[-1.6, -0.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.25, 24]} />
        <meshStandardMaterial color="#7fb8c9" roughness={0.15} metalness={0.1} />
      </mesh>
      <Sparkles ref={steamRef} count={30} scale={[1, 1.2, 1]} size={2.5} speed={0.4} color="#ffffff" opacity={0.6} />
    </group>
  );
}

function Campfire({ visible }) {
  const flame = useRef();
  useFrame(({ clock }) => {
    if (flame.current) {
      flame.current.intensity = 2.2 + Math.sin(clock.elapsedTime * 6) * 0.4;
    }
  });
  if (!visible) return null;
  return (
    <group position={[0, -0.55, 0.3]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, (i * Math.PI) / 2, Math.PI / 2.4]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 6]} />
          <meshStandardMaterial color="#3a2418" roughness={0.9} />
        </mesh>
      ))}
      <pointLight ref={flame} color="#ff7a29" distance={3} position={[0, 0.3, 0]} />
    </group>
  );
}

function TeaGardenWind({ visible }) {
  const rows = useRef();
  useFrame(({ clock }) => {
    if (rows.current) {
      rows.current.children.forEach((row, i) => {
        row.rotation.z = Math.sin(clock.elapsedTime * 1.2 + i) * 0.04;
      });
    }
  });
  if (!visible) return null;
  return (
    <group ref={rows} position={[1.6, -0.6, -0.5]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[i * 0.28 - 0.5, 0, 0]}>
          <boxGeometry args={[0.22, 0.4, 1.6]} />
          <meshStandardMaterial color="#2f5d3a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * amenitiesProgress drives a cross-fade between the rooms scene and the
 * amenities showcase (jacuzzi / campfire / tea gardens). Each element fades
 * and rises into place independently for a layered reveal.
 */
export default function AmenitiesScene() {
  const amenitiesProgress = useScrollStore((s) => s.amenitiesProgress);
  const group = useRef();

  useFrame(() => {
    if (group.current) {
      const p = amenitiesProgress;
      group.current.position.y = -1 + p * 1;
      group.current.visible = p > 0.02;
      group.current.traverse((child) => {
        if (child.material && 'opacity' in child.material) {
          child.material.transparent = true;
          child.material.opacity = THREE.MathUtils.clamp(p * 1.4, 0, 1);
        }
      });
    }
  });

  const visible = amenitiesProgress > 0.05;

  return (
    <group ref={group} position={[0, -1, 4]}>
      <Jacuzzi visible={visible} />
      <Campfire visible={visible} />
      <TeaGardenWind visible={visible} />
      <ambientLight intensity={0.4} />
    </group>
  );
}
