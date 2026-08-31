import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const SECTION_ALIASES = {
  projects: 'credentials',
  skills: 'expertise',
};

export function getHeaderOffset() {
  const header = document.querySelector('header');
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
}

export function getScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function scrollToSection(id, attempt = 0) {
  const targetId = SECTION_ALIASES[id] || id;
  const el = document.getElementById(targetId) || document.querySelector(`[data-section="${targetId}"]`);

  if (!el) {
    if (attempt < 20) window.setTimeout(() => scrollToSection(targetId, attempt + 1), 50);
    return;
  }

  const offsetY = getHeaderOffset();
  const fallbackY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - offsetY));
  const fallbackScroll = () => window.scrollTo({ top: fallbackY, behavior: getScrollBehavior() });
  const finishProgrammaticScroll = () => {
    document.documentElement.classList.remove('is-programmatic-scroll');
  };

  if (getScrollBehavior() === 'auto') {
    window.scrollTo({ top: fallbackY, behavior: 'auto' });
    return;
  }

  try {
    document.documentElement.classList.add('is-programmatic-scroll');
    gsap.killTweensOf(window);
    gsap.to(window, {
      duration: 0.42,
      scrollTo: { y: el, offsetY, autoKill: false },
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: () => {
        const distance = Math.abs(el.getBoundingClientRect().top - offsetY);
        if (distance > 4) window.scrollTo({ top: fallbackY, behavior: 'auto' });
        finishProgrammaticScroll();
      },
      onInterrupt: () => {
        finishProgrammaticScroll();
      },
    });
  } catch {
    finishProgrammaticScroll();
    fallbackScroll();
  }
}
