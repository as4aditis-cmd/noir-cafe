'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const CoffeeScene = dynamic(
  () => import('@/components/3d/CoffeeScene').then((m) => m.CoffeeScene),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

/* Steam line SVG animation */
function SteamLines() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute bottom-8 animate-steam-rise"
          style={{
            left: `${30 + i * 20}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${2.5 + i * 0.4}s`,
          }}
        >
          <div className="w-0.5 h-8 bg-gradient-to-t from-cream/20 to-transparent rounded-full" />
        </div>
      ))}
    </div>
  );
}

/* Scrolling marquee */
function Marquee() {
  const items = ['Single Origin', '·', 'Hand Poured', '·', 'Roasted Weekly', '·', 'New Delhi', '·'];
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 py-3 bg-obsidian/30 backdrop-blur-sm">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className={`font-mono text-2xs tracking-[0.25em] uppercase mx-4 ${item === '·' ? 'text-ember' : 'text-mist/50'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        '.hero-line',
        { y: 120, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.12, duration: 1.2, ease: 'power4.out' }
      )
        .fromTo(
          '.hero-sub',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-scroll-hint',
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-radial-warm"
    >
      {/* Ambient glow */}
      <div className="ambient-light w-[600px] h-[600px] bg-ember/8 -top-32 -right-32 opacity-60" aria-hidden />
      <div className="ambient-light w-[400px] h-[400px] bg-espresso/40 bottom-0 -left-20 opacity-80" aria-hidden />

      {/* 3D Canvas — right half */}
      <CoffeeScene className="absolute right-0 top-0 w-full md:w-3/5 h-full opacity-90" />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/20 pointer-events-none" />

      {/* Hero content */}
      <div ref={headlineRef} className="relative z-10 px-gutter max-w-[1400px] mx-auto w-full pt-24 pb-32">
        {/* Eyebrow */}
        <div className="hero-sub flex items-center gap-3 mb-8 opacity-0">
          <div className="rule-ember" />
          <span className="font-mono text-ember text-2xs tracking-[0.3em] uppercase">
            New Delhi · Est. 2019
          </span>
        </div>

        {/* Headline */}
        <div className="overflow-hidden mb-2">
          <h1 className="hero-line font-display text-hero text-cream font-light italic opacity-0 leading-[0.9]">
            Where
          </h1>
        </div>
        <div className="overflow-hidden mb-2">
          <h1 className="hero-line font-display text-hero text-cream font-light opacity-0 leading-[0.9]">
            Darkness
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1 className="hero-line font-display text-hero italic opacity-0 leading-[0.9]"
            style={{ WebkitTextStroke: '1px rgba(200,135,58,0.6)', color: 'transparent' }}>
            Meets Warmth
          </h1>
        </div>

        {/* Sub copy */}
        <p className="hero-sub font-body text-mist text-base md:text-lg max-w-sm leading-relaxed opacity-0 mb-10">
          Specialty coffee roasted in small batches. Every cup a quiet ritual,
          every sip a considered moment.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#menu"
            onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-cta opacity-0 inline-flex items-center gap-3 px-7 py-4 bg-ember text-obsidian font-body text-xs tracking-[0.15em] uppercase hover:bg-ember-light transition-colors duration-300 group"
          >
            <span>Explore the Menu</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#reservation"
            onClick={(e) => { e.preventDefault(); document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-cta opacity-0 inline-flex items-center gap-3 px-7 py-4 border border-cream/20 text-cream font-body text-xs tracking-[0.15em] uppercase hover:border-cream/50 hover:bg-cream/5 transition-all duration-300"
          >
            Reserve a Table
          </a>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint opacity-0 absolute bottom-20 left-gutter flex items-center gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-ember/60 animate-pulse" />
          <span className="font-mono text-2xs text-mist/40 tracking-[0.3em] uppercase rotate-90 origin-left translate-x-6">
            Scroll
          </span>
        </div>
      </div>

      {/* Marquee ticker */}
      <Marquee />

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
