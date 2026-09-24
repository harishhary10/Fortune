import { create } from 'zustand';

/**
 * Lightweight global store so both the R3F <Canvas> (outside the DOM flow)
 * and the HTML overlay sections can read the same scroll-driven progress
 * values without prop-drilling. Each value is 0→1 within its own section.
 */
export const useScrollStore = create((set) => ({
  heroProgress: 0,       // 0 = full mist, 1 = mist cleared / villa revealed
  roomsProgress: 0,      // 0 = closed villa, 1 = fully exploded/interior
  amenitiesProgress: 0,  // 0 = rooms scene, 1 = amenities scene fully in
  journeyProgress: 0,    // 0 = top of page, 1 = bottom of page (drives camera dolly)
  setHeroProgress: (v) => set({ heroProgress: v }),
  setRoomsProgress: (v) => set({ roomsProgress: v }),
  setAmenitiesProgress: (v) => set({ amenitiesProgress: v }),
  setJourneyProgress: (v) => set({ journeyProgress: v }),
}));
