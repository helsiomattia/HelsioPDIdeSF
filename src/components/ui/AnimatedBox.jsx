import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wrapper que aplica fade-up ao entrar na viewport.
 * Aceita props nativas de div.
 * @param {number} delay - Atraso em segundos
 * @param {{ once?: boolean }} viewport
 */
export default function AnimatedBox({ children, delay = 0, viewport, style, ...rest }) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 18, clipPath: 'inset(10% 0 0 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.58,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: viewport?.once !== false,
            toggleActions: viewport?.once === false ? 'play none none reverse' : 'play none none none',
          },
          onComplete: () => {
            gsap.set(el, { clipPath: 'none', willChange: 'auto' });
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, viewport?.once]);

  return (
    <div
      ref={elRef}
      style={{ willChange: 'transform, opacity', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
