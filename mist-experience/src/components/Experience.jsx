import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
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
 * Fixed, full-viewport <Canvas> sitting behind the scrolling HTML content.
 * Three ScrollTrigger instances (one per section wrapper in App.jsx) push
 * 0→1 progress values into the shared store; each 3D scene reads its own
 * value and animates independently, giving the "scenes shift as you scroll"
 * cinematic effect without re-mounting the Canvas.
 */
export default function Experience() {
  const camGroup = useRef();

  const setHeroProgress = useScrollStore((s) => s.setHeroProgress);
  const setRoomsProgress = useScrollStore((s) => s.setRoomsProgress);
  const setAmenitiesProgress = useScrollStore((s) => s.setAmenitiesProgress);

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

    // Subtle cinematic camera dolly through the whole journey
    gsap.to(camGroup.current.position, {
      z: -6,
      y: 0.4,
      scrollTrigger: {
        trigger: '#scroll-root',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="canvas-fixed">
      <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true }}>
        <group ref={camGroup}>
          <PerspectiveCamera makeDefault position={[0, 0.6, 5]} fov={42} />
        </group>
        <HeroMistScene />
        <RoomsScene />
        <AmenitiesScene />
      </Canvas>
    </div>
  );
}
