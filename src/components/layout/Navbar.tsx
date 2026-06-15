'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Story', href: '#philosophy' },
  { label: 'Menu', href: '#menu' },
  { label: 'Origins', href: '#origins' },
  { label: 'Reserve', href: '#reservation' },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-obsidian/90 backdrop-blur-xl border-b border-ember/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-gutter py-5 max-w-[1600px] mx-auto">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <span className="text-ember text-2xl leading-none">✦</span>
            <span
              className="font-display text-cream text-xl tracking-[0.15em] uppercase font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Noir
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-mist text-sm tracking-[0.1em] uppercase hover:text-cream transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember group-hover:w-full transition-all duration-400 ease-expo-out" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#reservation"
              onClick={(e) => handleNavClick(e, '#reservation')}
              className="px-5 py-2.5 border border-ember/40 text-cream font-body text-xs tracking-[0.12em] uppercase hover:bg-ember/10 hover:border-ember transition-all duration-300"
            >
              Book a Table
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-obsidian flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-cream text-5xl font-light italic hover:text-ember transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#reservation"
              onClick={(e) => handleNavClick(e, '#reservation')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 px-8 py-3 border border-ember/60 text-ember text-sm tracking-widest uppercase"
            >
              Book a Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
