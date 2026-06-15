'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const drinks = [
  {
    id: 'obsidian',
    name: 'The Obsidian',
    type: 'Double Ristretto',
    origin: 'Yirgacheffe, Ethiopia',
    tasting: ['Dark Chocolate', 'Blood Orange', 'Cedar'],
    temp: '94°C',
    dose: '18g',
    yield: '22ml',
    description:
      'A concentrated extraction that preserves the terroir of our Ethiopian Yirgacheffe. Short, dark, and irreducible.',
    color: '#1A0F07',
    accent: '#C8873A',
  },
  {
    id: 'velvet',
    name: 'Velvet Hour',
    type: 'Cortado',
    origin: 'Huila, Colombia',
    tasting: ['Brown Sugar', 'Plum', 'Hazelnut'],
    temp: '92°C',
    dose: '16g',
    yield: '30ml + 30ml milk',
    description:
      'Our Colombian harvest cut with the same volume of lightly textured milk. Equal, balanced, and quietly beautiful.',
    color: '#2A1208',
    accent: '#E09B4A',
  },
  {
    id: 'cold',
    name: 'Cold Resolve',
    type: '24h Cold Brew',
    origin: 'Sidama, Ethiopia',
    tasting: ['Dark Cherry', 'Tobacco', 'Molasses'],
    temp: '4°C',
    dose: '80g / litre',
    yield: '120ml',
    description:
      'Ground coarsely and steeped for a full day. The result is something that should not be hurried, because it wasn\'t.',
    color: '#0D0A06',
    accent: '#9E6528',
  },
  {
    id: 'ceremony',
    name: 'The Ceremony',
    type: 'V60 Pour Over',
    origin: 'Jimma, Ethiopia',
    tasting: ['Jasmine', 'Green Apple', 'Bergamot'],
    temp: '96°C',
    dose: '20g',
    yield: '300ml',
    description:
      'Four-minute extraction over hand-folded filter paper. A meditation that produces something floral and light.',
    color: '#1C1008',
    accent: '#C8873A',
  },
];

/* Animated drink visual (CSS art stand-in for 3D asset) */
function DrinkVisual({ drink, isActive }: { drink: typeof drinks[0]; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* Abstract cup representation */}
      <div className="relative w-48 h-48">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${drink.accent}30 0%, transparent 70%)` }}
        />
        {/* Cup silhouette */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-28 rounded-b-3xl border border-white/10"
          style={{ background: `linear-gradient(180deg, ${drink.color} 0%, ${drink.color}CC 100%)` }}
        />
        {/* Cup top */}
        <div
          className="absolute"
          style={{
            bottom: '130px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '88px',
            height: '8px',
            background: drink.accent,
            borderRadius: '4px',
            opacity: 0.7,
          }}
        />
        {/* Steam */}
        {drink.id !== 'cold' && [0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute animate-steam-rise"
            style={{
              bottom: '160px',
              left: `${40 + i * 15}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: '2.5s',
            }}
          >
            <div className="w-0.5 h-10 bg-gradient-to-t from-white/20 to-transparent rounded-full" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SignatureDrinksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.drinks-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.drinks-header', start: 'top 80%' } }
      );
      gsap.fromTo('.drink-tab',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.drinks-tabs', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const current = drinks[active];

  return (
    <section ref={sectionRef} id="signature" className="relative py-section px-gutter overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F0D0A 0%, #160E07 50%, #0F0D0A 100%)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="drinks-header flex items-end justify-between mb-16 gap-8 flex-wrap opacity-0">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="rule-ember" />
              <span className="font-mono text-ember text-2xs tracking-[0.3em] uppercase">Signature Drinks</span>
            </div>
            <h2 className="font-display text-display text-cream font-light">
              The Four<br /><em>Expressions</em>
            </h2>
          </div>
          <p className="font-body text-mist text-sm max-w-xs leading-relaxed">
            Each drink is a considered interpretation of a single origin. Nothing added that doesn't belong.
          </p>
        </div>

        {/* Main showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left — visual */}
          <div className="relative h-80 lg:h-auto lg:min-h-[500px] bg-obsidian-100 border border-white/5 overflow-hidden">
            {/* Background color */}
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundColor: current.color }}
              transition={{ duration: 0.8 }}
            />
            {/* Visuals */}
            {drinks.map((d, i) => (
              <DrinkVisual key={d.id} drink={d} isActive={i === active} />
            ))}
            {/* Origin tag */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono text-2xs text-white/30 tracking-[0.3em] uppercase">
                {current.origin}
              </span>
            </div>
          </div>

          {/* Right — details */}
          <div className="bg-obsidian-50 border border-white/5 border-l-0 p-8 lg:p-12 flex flex-col">
            {/* Tab navigation */}
            <div className="drinks-tabs flex gap-1 mb-10 overflow-x-auto pb-2">
              {drinks.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setActive(i)}
                  className={`drink-tab opacity-0 whitespace-nowrap px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                    i === active
                      ? 'bg-ember text-obsidian'
                      : 'text-mist hover:text-cream border border-white/10 hover:border-white/30'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>

            {/* Drink info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <span className="font-mono text-ember/60 text-2xs tracking-[0.2em] uppercase">
                  {current.type}
                </span>
                <h3 className="font-display text-cream text-4xl font-light italic mt-2 mb-6">
                  {current.name}
                </h3>
                <p className="font-body text-mist text-sm leading-relaxed mb-8">
                  {current.description}
                </p>

                {/* Tasting notes */}
                <div className="mb-8">
                  <span className="font-mono text-2xs text-cream/30 tracking-[0.2em] uppercase block mb-3">
                    Tasting Notes
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {current.tasting.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 border border-ember/20 text-cream/70 text-xs font-body"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                  {[
                    ['Temp', current.temp],
                    ['Dose', current.dose],
                    ['Yield', current.yield],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <span className="font-mono text-2xs text-cream/30 tracking-[0.2em] uppercase block mb-1">
                        {label}
                      </span>
                      <span className="font-body text-cream text-sm">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Price */}
            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
              <span className="font-display text-cream text-3xl font-light">₹280</span>
              <button className="px-6 py-3 bg-transparent border border-ember/40 text-cream text-xs font-mono tracking-widest uppercase hover:bg-ember/10 hover:border-ember transition-all duration-300">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
