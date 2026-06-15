'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const atmospherePoints = [
  {
    label: 'The Space',
    text: 'Forty-two seats. Reclaimed teak, stone, and blackened steel. A library wall of coffee literature. The sound of grinders and soft conversation.',
  },
  {
    label: 'The Light',
    text: 'We chose south-facing windows deliberately. Morning light falls long across the bar. By afternoon it turns amber. We do not compensate — we design for it.',
  },
  {
    label: 'The Sound',
    text: 'A curated rotation of Japanese jazz, minimal ambient, and silence. Never algorithmic. Often vinyl. Volume set so you can still hear your thoughts.',
  },
];

export function AtmosphereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !panelRef.current) return;
    const ctx = gsap.context(() => {

      // Horizontal parallax on the visual panel
      gsap.fromTo(panelRef.current,
        { xPercent: -5 },
        {
          xPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Text reveals
      gsap.fromTo('.atm-point',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.atm-points', start: 'top 75%' },
        }
      );

      gsap.fromTo('.atm-big-text',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.atm-big-text', start: 'top 80%' },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="atmosphere" className="relative overflow-hidden bg-obsidian">
      {/* Top editorial block */}
      <div className="relative py-20 px-gutter max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="rule-ember" />
          <span className="font-mono text-ember text-2xs tracking-[0.3em] uppercase">The Space</span>
        </div>

        <h2 className="atm-big-text font-display text-display text-cream font-light opacity-0 mb-16">
          A Room Designed<br />for <em>Stillness</em>
        </h2>

        <div className="atm-points grid grid-cols-1 md:grid-cols-3 gap-10">
          {atmospherePoints.map((pt) => (
            <div key={pt.label} className="atm-point opacity-0">
              <h3 className="font-mono text-xs text-ember tracking-[0.2em] uppercase mb-4">
                {pt.label}
              </h3>
              <p className="font-body text-mist text-sm leading-relaxed">{pt.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full-bleed visual panel */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        {/* The parallax background — a rich gradient "photograph" */}
        <div
          ref={panelRef}
          className="absolute inset-0 w-[120%] -left-[10%]"
          style={{
            background: `
              radial-gradient(ellipse at 30% 60%, #3D1A08 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, #2A1205 0%, transparent 40%),
              radial-gradient(ellipse at 50% 90%, #1A0D05 0%, transparent 60%),
              linear-gradient(180deg, #160E07 0%, #0A0603 100%)
            `,
          }}
        >
          {/* Abstract interior elements */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Window light shafts */}
            <defs>
              <linearGradient id="lightShaft" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8873A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C8873A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="200,0 280,0 320,700 160,700" fill="url(#lightShaft)" />
            <polygon points="500,0 540,0 560,700 480,700" fill="url(#lightShaft)" opacity="0.5" />
            {/* Table surface lines */}
            <line x1="0" y1="520" x2="1200" y2="480" stroke="rgba(200,135,58,0.15)" strokeWidth="1" />
            <line x1="0" y1="540" x2="1200" y2="510" stroke="rgba(200,135,58,0.08)" strokeWidth="0.5" />
            {/* Shelving suggestions */}
            <rect x="900" y="100" width="200" height="2" fill="rgba(200,135,58,0.2)" />
            <rect x="900" y="180" width="200" height="2" fill="rgba(200,135,58,0.15)" />
            <rect x="900" y="260" width="200" height="2" fill="rgba(200,135,58,0.1)" />
          </svg>

          {/* Warm ambient glow center */}
          <div className="ambient-light w-[700px] h-[400px] bg-ember/10 top-1/2 left-1/3 -translate-y-1/2" />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40 pointer-events-none" />

        {/* Central quote overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-gutter text-center">
          <blockquote className="max-w-xl">
            <p className="font-display text-editorial text-cream/80 font-light italic leading-tight">
              "The best cafes are not found — they are returned to."
            </p>
            <cite className="font-mono text-2xs text-ember/60 tracking-[0.3em] uppercase not-italic mt-4 block">
              — Our Founding Principle
            </cite>
          </blockquote>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {[
          ['42', 'Seats'],
          ['1', 'Roastery'],
          ['6', 'Baristas'],
          ['2019', 'Founded'],
        ].map(([num, label]) => (
          <div key={label} className="bg-obsidian px-8 py-10 text-center">
            <div className="font-display text-4xl text-ember font-light mb-2">{num}</div>
            <div className="font-mono text-2xs text-mist/40 tracking-[0.25em] uppercase">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
