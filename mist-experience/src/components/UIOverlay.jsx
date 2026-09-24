import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps a block of editorial copy and fades/rises it in as its section
 * enters the viewport, fading back out as it leaves — synced to the same
 * scroll timeline driving the 3D scenes (both use ScrollTrigger + Lenis).
 */
function FadeBlock({ children, className = '' }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      end: 'bottom 25%',
      onEnter: () => el.classList.add('in-view'),
      onLeave: () => el.classList.remove('in-view'),
      onEnterBack: () => el.classList.add('in-view'),
      onLeaveBack: () => el.classList.remove('in-view'),
    });
    return () => trigger.kill();
  }, []);

  return (
    <div ref={ref} className={`fade-line ${className}`}>
      {children}
    </div>
  );
}

export default function UIOverlay() {
  return (
    <div className="scroll-content">
      <section id="section-hero" className="min-h-screen flex flex-col justify-center px-8 md:px-20">
        <FadeBlock>
          <span className="eyebrow">A Journey Through the Mist</span>
          <h1 className="editorial-h1 mt-4">Experience<br />Nilgiris</h1>
          <p className="mt-6 max-w-md text-mist-cream/80 font-sans text-lg">
            High above Ooty, where cloud meets pine, a private world of quiet
            luxury awaits your arrival.
          </p>
          <button className="mt-10 inline-flex items-center gap-3 border border-mist-gold px-8 py-4 uppercase text-xs tracking-wideish hover:bg-mist-gold hover:text-mist-ink transition-colors">
            Book Your Stay
          </button>
        </FadeBlock>
      </section>

      <section id="section-rooms" className="min-h-[140vh] flex flex-col justify-center px-8 md:px-20">
        <FadeBlock>
          <span className="eyebrow">Explore the Luxury</span>
          <h2 className="editorial-h1 mt-4">Premium<br />Rooms</h2>
          <p className="mt-6 max-w-md text-mist-cream/80 font-sans text-lg">
            Wooden interiors, warm firelight and mountain views — every villa
            unfolds like a story as you step inside.
          </p>
        </FadeBlock>
      </section>

      <section id="section-amenities" className="min-h-[140vh] flex flex-col justify-center px-8 md:px-20">
        <FadeBlock>
          <span className="eyebrow">The Experience</span>
          <h2 className="editorial-h1 mt-4">Luxury<br />Amenities</h2>
          <p className="mt-6 max-w-md text-mist-cream/80 font-sans text-lg">
            A steaming jacuzzi beneath the stars, an evening campfire, and
            tea gardens that sway in the mountain breeze.
          </p>
          <button className="mt-10 inline-flex items-center gap-3 bg-mist-gold text-mist-ink px-8 py-4 uppercase text-xs tracking-wideish hover:bg-mist-cream transition-colors">
            Book Your Stay
          </button>
        </FadeBlock>
      </section>

      <footer className="py-16 text-center text-xs uppercase tracking-wideish text-mist-cream/50">
        Fortune Ooty &middot; Belmont Terrace, Tiger Hills, Ooty
      </footer>
    </div>
  );
}
