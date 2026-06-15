'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(inner, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' });
    };

    const tick = () => {
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;
      gsap.set(outer, { x: outerX, y: outerY });
      requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    tick();

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer hidden lg:block" />
      <div ref={innerRef} className="cursor-inner hidden lg:block" />
    </>
  );
}
