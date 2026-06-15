'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

type Category = 'espresso' | 'filter' | 'cold' | 'pastry';

const menu: Record<Category, { name: string; desc: string; price: string; badge?: string }[]> = {
  espresso: [
    { name: 'Ristretto', desc: 'Short pull · Ethiopian Yirgacheffe', price: '₹210', badge: 'Signature' },
    { name: 'Doppio', desc: 'Double espresso · Colombian Huila', price: '₹240' },
    { name: 'Macchiato', desc: 'Espresso · foam dot', price: '₹250' },
    { name: 'Cortado', desc: 'Espresso · equal steamed milk', price: '₹280' },
    { name: 'Flat White', desc: '180ml · microfoam', price: '₹310' },
    { name: 'Long Black', desc: 'Hot water · espresso over', price: '₹260' },
  ],
  filter: [
    { name: 'V60 Pour Over', desc: 'Ethiopian Jimma · 300ml', price: '₹320', badge: 'Best Seller' },
    { name: 'Chemex', desc: 'Colombian Huila · 450ml', price: '₹350' },
    { name: 'Aeropress', desc: 'Rotating single origin', price: '₹290' },
    { name: 'Batch Brew', desc: 'Fresh every 45min · large cup', price: '₹220' },
    { name: 'Siphon', desc: 'Full immersion · theatrical', price: '₹420', badge: 'Special' },
  ],
  cold: [
    { name: 'Cold Brew', desc: '24h steep · 120ml', price: '₹300' },
    { name: 'Cold Brew Tonic', desc: 'Cold brew · fever tree', price: '₹340', badge: 'Popular' },
    { name: 'Shaken Espresso', desc: 'Double espresso · ice · oat milk', price: '₹330' },
    { name: 'Nitro Cold Brew', desc: 'Nitrogen-infused · cascading', price: '₹360' },
    { name: 'Iced Cortado', desc: 'Over large ice · oat milk', price: '₹310' },
  ],
  pastry: [
    { name: 'Kouign-Amann', desc: 'Laminated · caramelised · warm', price: '₹180', badge: 'House Made' },
    { name: 'Almond Croissant', desc: 'Double baked · frangipane', price: '₹190' },
    { name: 'Cardamom Bun', desc: 'Scandinavian-style · pearl sugar', price: '₹170' },
    { name: 'Financier', desc: 'Brown butter · pistachio', price: '₹160' },
    { name: 'Miso Chocolate Tart', desc: 'Dark chocolate · white miso ganache', price: '₹220', badge: 'Chef\'s Pick' },
  ],
};

const categories: { id: Category; label: string }[] = [
  { id: 'espresso', label: 'Espresso' },
  { id: 'filter', label: 'Filter' },
  { id: 'cold', label: 'Cold' },
  { id: 'pastry', label: 'Pastry' },
];

function MenuItem({ item, index }: { item: typeof menu.espresso[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-start justify-between py-5 border-b border-white/5 last:border-0 hover:border-ember/20 transition-colors duration-300"
    >
      <div className="flex-1 mr-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-body text-cream text-base group-hover:text-ember transition-colors duration-300">
            {item.name}
          </span>
          {item.badge && (
            <span className="px-2 py-0.5 bg-ember/10 border border-ember/20 text-ember text-2xs font-mono tracking-wider">
              {item.badge}
            </span>
          )}
        </div>
        <span className="font-body text-mist/60 text-sm">{item.desc}</span>
      </div>
      <span className="font-display text-cream text-xl font-light flex-shrink-0 mt-0.5">
        {item.price}
      </span>
    </motion.div>
  );
}

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Category>('espresso');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-header', start: 'top 80%' } }
      );
      gsap.fromTo('.menu-body',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-body', start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="menu" className="relative py-section px-gutter"
      style={{ background: 'linear-gradient(180deg, #0F0D0A 0%, #0A0805 100%)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="menu-header opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="rule-ember" />
              <span className="font-mono text-ember text-2xs tracking-[0.3em] uppercase">Full Menu</span>
            </div>
            <h2 className="font-display text-display text-cream font-light">
              Every Cup,<br /><em>Considered</em>
            </h2>
          </div>
          <p className="font-body text-mist text-sm max-w-xs leading-relaxed">
            Our menu changes with the harvest. Some items return season to season, others disappear. That is the nature of good coffee.
          </p>
        </div>

        {/* Menu body */}
        <div className="menu-body opacity-0">
          {/* Category tabs */}
          <div className="flex gap-0 border-b border-white/5 mb-0 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 border-b-2 whitespace-nowrap ${
                  active === cat.id
                    ? 'text-ember border-ember'
                    : 'text-mist/50 border-transparent hover:text-mist hover:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="border-r border-white/5 pr-0 lg:pr-12 pt-2">
              <AnimatePresence mode="wait">
                <motion.div key={active + '-left'}>
                  {menu[active].slice(0, Math.ceil(menu[active].length / 2)).map((item, i) => (
                    <MenuItem key={item.name} item={item} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="pl-0 lg:pl-12 pt-2">
              <AnimatePresence mode="wait">
                <motion.div key={active + '-right'}>
                  {menu[active].slice(Math.ceil(menu[active].length / 2)).map((item, i) => (
                    <MenuItem key={item.name} item={item} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-mono text-2xs text-mist/30 tracking-[0.2em] uppercase">
              Oat milk available · No syrups · No blends
            </p>
            <p className="font-mono text-2xs text-mist/30 tracking-[0.2em] uppercase">
              Seasonal menu · Subject to change
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
