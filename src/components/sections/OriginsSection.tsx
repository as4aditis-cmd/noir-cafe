'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const origins = [
  {
    country: 'Ethiopia',
    region: 'Yirgacheffe',
    altitude: '1,800 – 2,200m',
    process: 'Washed',
    harvest: 'Nov – Jan',
    profile: 'Floral · Citrus · Stone Fruit',
    note:
      'The birthplace of coffee. Wild-grown heirloom varieties under forest canopy, wet-processed in raised beds by the Gedeo people.',
    color: '#3D1A08',
  },
  {
    country: 'Colombia',
    region: 'Huila',
    altitude: '1,600 – 1,900m',
    process: 'Honey',
    harvest: 'Apr – Jun',
    profile: 'Caramel · Brown Sugar · Red Berry',
    note:
      'A southern department where volcanic soil and cloud cover create perfect growing conditions. Honey-processed to amplify sweetness.',
    color: '#2A1208',
  },
  {
    country: 'Yemen',
    region: 'Haraaz',
    altitude: '1,500 – 2,500m',
    process: 'Natural',
    harvest: 'Oct – Dec',
    profile: 'Dried Fruit · Chocolate · Spice',
    note:
      'One of the world\'s most ancient coffee-growing regions. Dry-processed on rooftops the same way it has been for 500 years.',
    color: '#1A0D05',
  },
];

function ParallaxOriginCard({ origin, index }: { origin: typeof origins[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    // Parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Card entrance
    gsap.fromTo(
      cardRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%' },
        delay: index * 0.15,
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="opacity-0 group relative overflow-hidden border border-white/5 hover:border-ember/20 transition-colors duration-500">
      {/* Colour field acting as image */}
      <div
        ref={imageRef}
        className="relative h-64 overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${origin.color} 0%, #0F0D0A 100%)` }}
      >
        {/* Abstract terrain lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M0,${180 - i * 25} Q100,${140 - i * 20} 200,${160 - i * 30} T400,${150 - i * 25}`}
              fill="none"
              stroke="rgba(200,135,58,0.4)"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Altitude tag */}
        <div className="absolute top-4 right-4">
          <span className="font-mono text-2xs text-cream/40 tracking-[0.2em] uppercase">
            {origin.altitude}
          </span>
        </div>

        {/* Country */}
        <div className="absolute bottom-6 left-6">
          <span className="font-display text-cream/20 text-6xl font-light leading-none">
            {origin.country}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-8 bg-obsidian-50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-mono text-ember text-2xs tracking-[0.2em] uppercase block mb-1">
              {origin.region}, {origin.country}
            </span>
            <h3 className="font-display text-cream text-2xl font-light italic">
              {origin.process} Process
            </h3>
          </div>
          <span className="font-mono text-cream/30 text-2xs tracking-[0.15em] mt-1">
            {origin.harvest}
          </span>
        </div>

        <p className="font-body text-mist text-sm leading-relaxed mb-6">{origin.note}</p>

        <div className="border-t border-white/5 pt-5">
          <span className="font-mono text-2xs text-cream/30 tracking-[0.2em] uppercase block mb-2">
            Profile
          </span>
          <span className="font-body text-ember/80 text-sm">{origin.profile}</span>
        </div>
      </div>
    </div>
  );
}

export function OriginsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.origins-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.origins-title', start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="origins" className="relative py-section px-gutter bg-obsidian">
      {/* Large background text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-light text-white/[0.03] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
        aria-hidden
      >
        Origin
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <div className="origins-title opacity-0 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="rule-ember" />
            <span className="font-mono text-ember text-2xs tracking-[0.3em] uppercase">
              Where It Begins
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-display text-cream font-light">
              Three Farms.<br /><em>One Standard.</em>
            </h2>
            <p className="font-body text-mist text-sm max-w-xs leading-relaxed md:text-right">
              We visit each farm at least once a year. Relationships over contracts. Quality over volume.
            </p>
          </div>
        </div>

        {/* Origin cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {origins.map((o, i) => (
            <ParallaxOriginCard key={o.country} origin={o} index={i} />
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-px grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {[
            ['12', 'Farm Partners'],
            ['6', 'Years Sourcing'],
            ['3', 'Countries'],
            ['100%', 'Direct Trade'],
          ].map(([num, label]) => (
            <div key={label} className="bg-obsidian-50 px-8 py-6 text-center">
              <div className="font-display text-3xl text-ember font-light mb-1">{num}</div>
              <div className="font-mono text-2xs text-mist/50 tracking-[0.2em] uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
