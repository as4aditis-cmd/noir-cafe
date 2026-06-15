'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const times = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
const partyOptions = ['1', '2', '3', '4', '5', '6+'];

type FormState = 'idle' | 'submitting' | 'success';

export function ReservationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '', party: '2', note: '' });
  const [formState, setFormState] = useState<FormState>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.res-col',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    await new Promise((r) => setTimeout(r, 1600));
    setFormState('success');
  };

  const inputClass =
    'w-full bg-transparent border border-white/10 px-4 py-3.5 text-cream text-sm font-body placeholder-mist/30 focus:outline-none focus:border-ember/50 transition-colors duration-300';

  return (
    <section ref={sectionRef} id="reservation" className="relative py-section px-gutter overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0805 0%, #0F0D0A 100%)' }}
    >
      {/* Background glow */}
      <div className="ambient-light w-[600px] h-[600px] bg-ember/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — copy */}
          <div className="res-col opacity-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="rule-ember" />
              <span className="font-mono text-ember text-2xs tracking-[0.3em] uppercase">Reservations</span>
            </div>

            <h2 className="font-display text-display text-cream font-light mb-8 leading-tight">
              Hold Your<br /><em>Corner Table</em>
            </h2>

            <p className="font-body text-mist text-sm leading-relaxed mb-10 max-w-xs">
              We keep eight tables for reservations. The rest remain open for those who walk in. Both are welcome. Neither is rushed.
            </p>

            {/* What to expect */}
            <div className="space-y-6 border-t border-white/5 pt-10">
              {[
                ['On Arrival', 'You will be greeted by your barista, not a host. They will walk you through the day\'s offerings.'],
                ['No Time Limit', 'We do not turn tables. Order once, stay as long as the cup and the conversation last.'],
                ['Cancellation', '24-hour notice is courteous. No charge, no fuss. We simply free the seat for someone else.'],
              ].map(([title, body]) => (
                <div key={title as string}>
                  <h4 className="font-mono text-cream/60 text-2xs tracking-[0.2em] uppercase mb-2">{title}</h4>
                  <p className="font-body text-mist/70 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="res-col opacity-0">
            <div className="border border-white/8 p-8 md:p-10 relative">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-ember/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-ember/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-ember/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-ember/40" />

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <div className="text-ember text-4xl mb-6">✦</div>
                    <h3 className="font-display text-cream text-3xl font-light italic mb-4">
                      Table Reserved
                    </h3>
                    <p className="font-body text-mist text-sm leading-relaxed max-w-xs mx-auto mb-6">
                      A confirmation has been sent to {form.email}. We look forward to seeing you.
                    </p>
                    <button
                      onClick={() => { setFormState('idle'); setForm({ name: '', email: '', date: '', time: '', party: '2', note: '' }); }}
                      className="font-mono text-2xs text-ember/60 tracking-[0.2em] uppercase hover:text-ember transition-colors"
                    >
                      Make another reservation →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display text-cream text-2xl font-light mb-6">
                      Reserve a Table
                    </h3>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {/* Date */}
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className={`${inputClass} text-mist/60`}
                    />

                    {/* Time */}
                    <div className="flex flex-wrap gap-2">
                      {times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, time: t })}
                          className={`px-3 py-2 text-xs font-mono transition-all duration-200 ${
                            form.time === t
                              ? 'bg-ember text-obsidian'
                              : 'border border-white/10 text-mist/60 hover:border-white/30 hover:text-mist'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Party size */}
                    <div>
                      <label className="font-mono text-2xs text-cream/30 tracking-[0.2em] uppercase block mb-2">
                        Party Size
                      </label>
                      <div className="flex gap-2">
                        {partyOptions.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setForm({ ...form, party: p })}
                            className={`w-10 h-10 text-xs font-mono transition-all duration-200 ${
                              form.party === p
                                ? 'bg-ember text-obsidian'
                                : 'border border-white/10 text-mist/60 hover:border-white/30 hover:text-mist'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Note */}
                    <textarea
                      placeholder="Any special requests? (optional)"
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === 'submitting' || !form.name || !form.email || !form.date || !form.time}
                      className="w-full py-4 bg-ember text-obsidian font-body text-xs tracking-[0.15em] uppercase hover:bg-ember-light disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <span className="w-4 h-4 border border-obsidian/40 border-t-obsidian rounded-full animate-spin" />
                          Securing your table…
                        </>
                      ) : (
                        'Confirm Reservation'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
