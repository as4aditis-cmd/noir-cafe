'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: 'I',
    title: 'The Source',
    body:
      'We partner with fewer than twelve farms across Ethiopia, Colombia, and Yemen. Relationships built over years, not spreadsheets.',
  },
  {
    number: 'II',
    title: 'The Roast',
    body:
      'Our roastery in South Delhi operates a single Probat drum. Each batch is listened to, not timed. We stop when it tells us.',
  },
  {
    number: 'III',
    title: 'The Cup',
    body:
      "Water temperature, grind distribution, extraction time. Three variables in endless conversation with each other. We\u2019ve been listening for six years.",
  },
];

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      // Large quote reveal — character by character
      if (quoteRef.current) {
        const text = quoteRef.current.textContent || '';
        quoteRef.current.innerHTML = text
          .split('')
          .map((c) => `<span class="char inline-block">${c === ' ' ? '&nbsp;' : c}</span>`)
          .join('');

        gsap.fromTo(
          quoteRef.current.querySelectorAll('.char'),
          { opacity: 0.08 },
          {
            opacity: 1,
            stagger: 0.02,
            duration: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }

      // Pillar cards
      gsap.fromTo(
        '.pillar-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillars-grid',
            start: 'top 70%',
          },
        }
      );

      // Section label
      gsap.fromTo(
        '.section-label',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-section px-gutter bg-obsidian overflow-hidden"
    >
      {/* Ember glow */}
      <div className="ambient-light w-[500px] h-[500px] bg-ember/5 top-1/4 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden />

      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <div className="section-label flex items-center gap-4 mb-16 opacity-0">
          <div className="rule-ember" />
          <span className="font-mono text-ember text-2xs tracking-[0.3em] uppercase">
            Our Philosophy
          </span>
        </div>

        {/* Large editorial quote */}
        <div className="mb-20 max-w-4xl">
          <p
            ref={quoteRef}
            className="font-display text-editorial text-cream/90 font-light leading-tight"
          >
            Good coffee is not complicated. It is merely uncompromising.
          </p>
        </div>

        {/* Three pillars */}
        <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p) => (
            <div
              key={p.number}
              className="pillar-card opacity-0 bg-obsidian p-10 md:p-12 group hover:bg-obsidian-100 transition-colors duration-500"
            >
              <span className="font-mono text-ember/40 text-xs tracking-[0.3em] block mb-8">
                {p.number}
              </span>
              <h3 className="font-display text-cream text-3xl font-light italic mb-5 group-hover:text-ember transition-colors duration-500">
                {p.title}
              </h3>
              <p className="font-body text-mist text-sm leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Signature divider */}
        <div className="mt-20 flex items-center justify-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-ember text-2xl">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </section>
  );
}
