'use client';

import { useEffect, useRef, DependencyList, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scoped GSAP context hook — automatically reverts on unmount.
 * Pass a scope ref to contain selector lookups.
 */
export function useGSAPContext(
  callback: (context: gsap.Context) => void,
  scopeRef: RefObject<Element | null>,
  deps: DependencyList = []
) {
  useEffect(() => {
    const ctx = gsap.context(callback, scopeRef.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Simple scroll-triggered fade + slide up for a single ref.
 */
export function useScrollReveal(
  ref: RefObject<Element | null>,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
    stagger?: number;
    selector?: string;
  } = {}
) {
  const { y = 40, duration = 0.8, delay = 0, start = 'top 80%', selector } = options;

  useEffect(() => {
    if (!ref.current) return;
    const target = selector ? ref.current.querySelectorAll(selector) : ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          stagger: options.stagger,
          scrollTrigger: { trigger: ref.current, start },
        }
      );
    });
    return () => ctx.revert();
  }, [ref, y, duration, delay, start, selector, options.stagger]);
}
