'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll('.footer-animate'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' }
      }
    );
  }, []);

  return (
    <footer ref={ref} className="bg-obsidian border-t border-white/5 px-gutter py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 footer-animate">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-ember text-2xl">✦</span>
              <span className="font-display text-cream text-2xl tracking-[0.2em] uppercase font-light">
                Noir
              </span>
            </div>
            <p className="font-body text-mist text-sm leading-relaxed max-w-xs">
              A sanctuary for the discerning palate. We source, roast, and brew with the singular intent of perfection.
            </p>
            <p className="font-mono text-ember/70 text-xs mt-6 tracking-widest uppercase">
              Est. 2019 · New Delhi
            </p>
          </div>

          {/* Hours */}
          <div className="footer-animate">
            <h4 className="font-body text-cream/50 text-xs tracking-[0.2em] uppercase mb-5">Hours</h4>
            <div className="space-y-2 text-sm">
              {[
                ['Mon – Fri', '7:30 – 21:00'],
                ['Saturday', '8:00 – 22:00'],
                ['Sunday', '9:00 – 20:00'],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between gap-4 text-mist">
                  <span>{day}</span>
                  <span className="text-cream/60">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-animate">
            <h4 className="font-body text-cream/50 text-xs tracking-[0.2em] uppercase mb-5">Find Us</h4>
            <address className="not-italic text-mist text-sm leading-relaxed space-y-1">
              <p>14 Mehrauli Road</p>
              <p>Hauz Khas Village</p>
              <p>New Delhi, 110016</p>
            </address>
            <a href="tel:+911140000000" className="block mt-4 text-ember text-sm hover:text-ember-light transition-colors">
              +91 11 4000 0000
            </a>
            <a href="mailto:hello@noirc.cafe" className="block text-mist text-sm hover:text-cream transition-colors">
              hello@noirc.cafe
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-animate border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-fog text-xs tracking-widest">
            © 2025 Noir Coffee Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Twitter', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="font-body text-fog text-xs hover:text-cream transition-colors tracking-wider">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
