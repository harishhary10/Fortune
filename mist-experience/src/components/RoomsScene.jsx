import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScrollStore } from '../store/scrollStore.js';

/**
 * Procedural "villa" made of simple boxes standing in for a real GLTF model.
 * roomsProgress (0→1) drives an exploded-view tear-down: walls/roof/floor
 * separate outward and a warm interior (fireplace glow + wooden floor) is
 * revealed. Replace each <mesh> with real furnished room meshes later.
 */
export default function RoomsScene() {
  const roomsProgress = useScrollStore((s) => s.roomsProgress);
  const group = useRef();
  const roof = useRef();
  const wallLeft = useRef();
  const wallRight = useRef();
  const floor = useRef();
  const fireGlow = useRef();

  useFrame(() => {
    const p = roomsProgress;
    if (group.current) {
      const scale = 1 + p * 0.15;
      group.current.scale.set(scale, scale, scale);
      group.current.visible = p > 0.02;
    }
    if (roof.current) roof.current.position.y = 1.3 + p * 1.1;
    if (wallLeft.current) wallLeft.current.position.x = -0.9 - p * 1.0;
    if (wallRight.current) wallRight.current.position.x = 0.9 + p * 1.0;
    if (floor.current) floor.current.position.z = -0.3 - p * 0.6;
    if (fireGlow.current) fireGlow.current.intensity = p * 3.2;
  });

  return (
    <group ref={group} position={[0, -0.4, 2]}>
      <mesh ref={floor} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <planeGeometry args={[3.4, 2.6]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.6} />
      </mesh>

      <mesh ref={roof} position={[0, 1.3, 0]}>
        <coneGeometry args={[2.1, 0.9, 4]} />
        <meshStandardMaterial color="#3a2418" roughness={0.85} />
      </mesh>

      <mesh ref={wallLeft} position={[-0.9, 0.2, 0]}>
        <boxGeometry args={[0.15, 1.4, 2.6]} />
        <meshStandardMaterial color="#caa06b" roughness={0.7} />
      </mesh>
      <mesh ref={wallRight} position={[0.9, 0.2, 0]}>
        <boxGeometry args={[0.15, 1.4, 2.6]} />
        <meshStandardMaterial color="#caa06b" roughness={0.7} />
      </mesh>

      <mesh position={[0, -0.25, -0.9]}>
        <boxGeometry args={[0.6, 0.5, 0.3]} />
        <meshStandardMaterial color="#2b2019" roughness={0.9} />
      </mesh>
      <pointLight ref={fireGlow} position={[0, -0.1, -0.75]} color="#ff8c42" distance={2.5} />
    </group>
  );
}
