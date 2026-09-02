import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const SECTION_ALIASES = {
  skills: 'expertise',
};

export function getHeaderOffset() {
  const header = document.querySelector('header');
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
}

export function getScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function scrollToSection(id, attemptOrOptions = 0, maybeOptions = {}) {
  const attempt = typeof attemptOrOptions === 'number' ? attemptOrOptions : 0;
  const options = typeof attemptOrOptions === 'object' ? attemptOrOptions : maybeOptions;
  const targetId = SECTION_ALIASES[id] || id;
  const el = document.getElementById(targetId) || document.querySelector(`[data-section="${targetId}"]`);

  if (!el) {
    if (attempt < 20) window.setTimeout(() => scrollToSection(targetId, attempt + 1, options), 50);
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
    options.onComplete?.();
    return;
  }

  try {
    document.documentElement.classList.add('is-programmatic-scroll');
    gsap.killTweensOf(window);
    gsap.to(window, {
      duration: options.duration ?? 0.56,
      scrollTo: { y: el, offsetY, autoKill: false },
      ease: options.ease || 'power3.inOut',
      overwrite: 'auto',
      onComplete: () => {
        const distance = Math.abs(el.getBoundingClientRect().top - offsetY);
        if (distance > 4) window.scrollTo({ top: fallbackY, behavior: 'auto' });
        finishProgrammaticScroll();
        options.onComplete?.();
      },
      onInterrupt: () => {
        finishProgrammaticScroll();
        options.onInterrupt?.();
        options.onComplete?.();
      },
    });
  } catch {
    finishProgrammaticScroll();
    fallbackScroll();
    options.onComplete?.();
  }
}
