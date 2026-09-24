# A Journey Through the Mist — Ooty Luxury Resort (R3F Boilerplate)

A cinematic, scroll-driven 3D experience built with **React + Vite + React Three Fiber + GSAP ScrollTrigger + Lenis**, themed around a luxury Ooty resort.

This lives in its own `mist-experience/` subfolder, separate from the static site at the repo root (which is served via Node/Express — see the root README).

## Setup

```bash
cd mist-experience
npm install
npm run dev
```

Visit `http://localhost:5173`.

## How the scroll-driven 3D works

1. **Lenis** (`src/hooks/useLenis.js`) intercepts native scroll and feeds a smoothed value into GSAP's ticker for a continuous cinematic glide.
2. **`src/components/Experience.jsx`** renders a single fixed `<Canvas>` behind everything — it never re-mounts as you scroll, only its internal state changes.
3. Three `ScrollTrigger` instances (one per `<section>` in `UIOverlay.jsx`) report 0→1 progress into a shared Zustand store (`src/store/scrollStore.js`).
4. Each 3D scene (`HeroMistScene`, `RoomsScene`, `AmenitiesScene`) reads its own progress value inside `useFrame` and animates independently — mist clearing, villa exploding, amenities fading up.
5. `UIOverlay.jsx` fades editorial text in/out per section using its own `ScrollTrigger`, synced to the same timeline.

## Swapping in real 3D assets

Every mesh is a procedural placeholder (cones, boxes, cylinders) — no real cottage/pine-tree/jacuzzi models were available. To go production-ready: get `.glb` models, drop them in `public/models/`, and replace the procedural `<mesh>` blocks with `useGLTF('/models/your-model.glb')`, keeping the existing ref-based animation logic.

## Deploying this alongside the static site

This subfolder is a separate Vite app with its own `package.json` — it is **not** wired into the root `server.js`/Express setup. To go live with it you'd either:
- Run `npm run build` inside `mist-experience/` and serve the resulting `dist/` as a static bundle (e.g. at a `/mist` route from the root Express server), or
- Deploy it as its own separate site/subdomain.

It will not affect the existing Airo/Node deployment of the root site unless you explicitly wire it in.
