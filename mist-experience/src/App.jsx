import React from 'react';
import { useLenis } from './hooks/useLenis.js';
import Experience from './components/Experience.jsx';
import UIOverlay from './components/UIOverlay.jsx';

export default function App() {
  useLenis();

  return (
    <div id="scroll-root" className="relative">
      <Experience />
      <UIOverlay />
    </div>
  );
}
