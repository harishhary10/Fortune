import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroMistScene from './HeroMistScene.jsx';
import RoomsScene from './RoomsScene.jsx';
import AmenitiesScene from './AmenitiesScene.jsx';
import { useScrollStore } from '../store/scrollStore.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lives INSIDE <Canvas>, so `camera`/refs are guaranteed to exist by the
 * time this runs (useFrame only ever fires after the scene has mounted).
 * Reads journeyProgress from the store and smoothly dollies the camera —
 * this replaces a previous version that mutated a ref from an effect
 * outside the Canvas, which could run before the ref was attached and
 * crash the whole app with "Cannot read properties of null".
 */
function CameraRig() {
  const journeyProgress = useScrollStore((s) => s.journeyProgress);
  useFrame(({ camera }) => {
    const targetZ = 5 - journeyProgress * 11; // 5 -> -6
    const targetY = 0.6 - journeyProgress * 0.2; // 0.6 -> 0.4
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
  });
  return null;
}

/**
 * Fixed, full-viewport <Canvas> sitting behind the scrolling HTML content.
 * Four ScrollTrigger instances (one per section wrapper in UIOverlay.jsx,
 * plus one spanning the whole page) push 0→1 progress values into the
 * shared store; each 3D scene / the camera rig reads its own value inside
 * useFrame and animates independently — all safely inside the R3F tree.
 */
export default function Experience() {
  const setHeroProgress = useScrollStore((s) => s.setHeroProgress);
  const setRoomsProgress = useScrollStore((s) => s.setRoomsProgress);
  const setAmenitiesProgress = useScrollStore((s) => s.setAmenitiesProgress);
  const setJourneyProgress = useScrollStore((s) => s.setJourneyProgress);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#section-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => setHeroProgress(self.progress),
    });

    ScrollTrigger.create({
      trigger: '#section-rooms',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => setRoomsProgress(self.progress),
    });

    ScrollTrigger.create({
      trigger: '#section-amenities',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => setAmenitiesProgress(self.progress),
    });

    ScrollTrigger.create({
      trigger: '#scroll-root',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => setJourneyProgress(self.progress),
    });

    // Recalculate section heights once everything (fonts, images) has laid out
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="canvas-fixed">
      <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.6, 5]} fov={42} />
        <CameraRig />
        <HeroMistScene />
        <RoomsScene />
        <AmenitiesScene />
      </Canvas>
    </div>
  );
}
