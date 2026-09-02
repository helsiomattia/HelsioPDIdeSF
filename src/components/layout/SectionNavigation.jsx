import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, alpha } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../../utils/scrollToSection';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_QUERY = '(min-width: 1024px)';
const REDUCE_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const HASH_ALIASES = { skills: 'expertise' };
const PATH_ALIASES = { skills: 'expertise', '': 'home' };
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function stripBasePath(pathname) {
  if (!BASE_PATH) return pathname;
  if (pathname === BASE_PATH) return '/';
  if (pathname.startsWith(`${BASE_PATH}/`)) return pathname.slice(BASE_PATH.length) || '/';
  return pathname;
}

function getSectionUrl(id) {
  const path = id === 'home' ? `${BASE_PATH || ''}/` : `${BASE_PATH || ''}/${id}`;
  return `${path}${window.location.search}`;
}

function getSectionFromLocation() {
  const redirectedPath = window.sessionStorage.getItem('personal-page-redirect');
  if (redirectedPath) {
    window.sessionStorage.removeItem('personal-page-redirect');
    const redirectedId = redirectedPath.split('/').filter(Boolean).pop() || 'home';
    return PATH_ALIASES[redirectedId] || redirectedId;
  }

  const hashId = window.location.hash.replace('#', '');
  if (hashId) return HASH_ALIASES[hashId] || hashId;

  const pathname = stripBasePath(window.location.pathname);
  const pathId = pathname.split('/').filter(Boolean).pop() || 'home';
  return PATH_ALIASES[pathId] || pathId;
}

function getHeaderHeight() {
  const header = document.querySelector('header');
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
}

function getSections(sectionIds) {
  return sectionIds
    .map((id) => document.getElementById(id) || document.querySelector(`[data-section="${id}"]`))
    .filter(Boolean);
}

function getCurrentIndex(sectionIds) {
  const sections = getSections(sectionIds);
  const headerHeight = getHeaderHeight();
  const referenceY = window.scrollY + headerHeight + window.innerHeight * 0.28;

  let currentIndex = 0;
  sections.forEach((section, index) => {
    if (section.offsetTop <= referenceY) currentIndex = index;
  });

  return currentIndex;
}

function isInteractiveTarget(target) {
  return Boolean(target?.closest?.('input, textarea, select, button, a, [role="button"], [role="dialog"]'));
}

export default function SectionNavigation() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [expanded, setExpanded] = useState(false);
  const railRef = useRef(null);
  const labelRef = useRef(null);
  const stateRef = useRef({ isAnimating: false, lastWheelAt: 0 });

  const sections = useMemo(() => [
    { id: 'home', label: t('nav.home'), number: '00' },
    { id: 'about', label: t('nav.about'), number: '01' },
    { id: 'experience', label: t('nav.experience'), number: '02' },
    { id: 'credentials', label: t('nav.projects'), number: '03' },
    { id: 'expertise', label: t('nav.skills'), number: '04' },
    { id: 'projects', label: t('nav.portfolioProjects'), number: '05' },
    { id: 'contact', label: t('nav.contact'), number: '06' },
  ], [t]);

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === activeSection));
  const active = sections[activeIndex] || sections[0];
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < sections.length - 1;

  const setRouteState = (id, mode = 'replaceState') => {
    if (!sectionIds.includes(id)) return;
    setActiveSection(id);

    const nextUrl = getSectionUrl(id);
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (currentUrl !== nextUrl) window.history[mode](null, '', nextUrl);
  };

  const navigateTo = (id, mode = 'pushState') => {
    if (!sectionIds.includes(id)) return;
    setExpanded(false);
    setRouteState(id, mode);
    scrollToSection(id, { duration: 0.62 });
  };

  useLayoutEffect(() => {
    const label = labelRef.current;
    if (!label || window.matchMedia(REDUCE_MOTION_QUERY).matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        label,
        { autoAlpha: 0, y: 8, clipPath: 'inset(0 0 35% 0)' },
        { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.34, ease: 'power3.out' },
      );
    }, label);

    return () => ctx.revert();
  }, [activeSection, active.label]);

  useEffect(() => {
    let triggers = [];
    let retryTimer;
    let attempts = 0;

    const cleanupTriggers = () => {
      triggers.forEach((trigger) => trigger.kill());
      triggers = [];
    };

    const setupTriggers = () => {
      cleanupTriggers();
      let hasMissingSection = false;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) {
          hasMissingSection = true;
          return;
        }

        triggers.push(ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setRouteState(id),
          onEnterBack: () => setRouteState(id),
        }));
      });

      if (hasMissingSection && attempts < 20) {
        attempts += 1;
        retryTimer = window.setTimeout(setupTriggers, 100);
        return;
      }

      const initialSectionId = getSectionFromLocation();
      if (sectionIds.includes(initialSectionId)) {
        setActiveSection(initialSectionId);
        window.setTimeout(() => scrollToSection(initialSectionId), 0);
      }
    };

    const handlePopState = () => {
      const id = getSectionFromLocation();
      if (!sectionIds.includes(id)) return;
      setActiveSection(id);
      scrollToSection(id);
    };

    setupTriggers();
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.clearTimeout(retryTimer);
      cleanupTriggers();
    };
  }, [sectionIds]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const reduceMotionQuery = window.matchMedia(REDUCE_MOTION_QUERY);
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (!desktopQuery.matches || reduceMotionQuery.matches) return;

      const navigateByDirection = (direction) => {
        const pageSections = getSections(sectionIds);
        if (pageSections.length < 2 || stateRef.current.isAnimating) return false;

        const currentIndex = getCurrentIndex(sectionIds);
        const nextIndex = Math.min(Math.max(currentIndex + direction, 0), pageSections.length - 1);
        const nextSection = pageSections[nextIndex];

        if (!nextSection || nextIndex === currentIndex) return false;

        stateRef.current.isAnimating = true;
        setRouteState(nextSection.id || nextSection.dataset.section, 'replaceState');
        scrollToSection(nextSection.id || nextSection.dataset.section, {
          duration: 0.68,
          onComplete: () => {
            window.setTimeout(() => {
              stateRef.current.isAnimating = false;
            }, 80);
          },
        });

        return true;
      };

      const handleWheel = (event) => {
        if (isInteractiveTarget(event.target)) return;

        event.preventDefault();

        const absDelta = Math.abs(event.deltaY);
        if (absDelta < 22) return;

        if (stateRef.current.isAnimating) return;

        const now = Date.now();
        if (now - stateRef.current.lastWheelAt < 360) return;

        const didNavigate = navigateByDirection(event.deltaY > 0 ? 1 : -1);
        if (didNavigate) stateRef.current.lastWheelAt = now;
      };

      const handleKeyDown = (event) => {
        if (isInteractiveTarget(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;

        const keyMap = { PageDown: 1, ArrowDown: 1, PageUp: -1, ArrowUp: -1 };
        if (event.key === 'Home') {
          event.preventDefault();
          navigateTo('home');
          return;
        }

        if (event.key === 'End') {
          event.preventDefault();
          navigateTo('contact');
          return;
        }

        const direction = keyMap[event.key];
        if (!direction) return;

        event.preventDefault();
        const didNavigate = navigateByDirection(direction);
        if (!didNavigate) stateRef.current.isAnimating = false;
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);

      cleanup = () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
        stateRef.current.isAnimating = false;
      };
    };

    setup();
    desktopQuery.addEventListener('change', setup);
    reduceMotionQuery.addEventListener('change', setup);

    return () => {
      desktopQuery.removeEventListener('change', setup);
      reduceMotionQuery.removeEventListener('change', setup);
      cleanup();
    };
  }, [sectionIds]);

  useEffect(() => {
    if (!expanded) return undefined;

    const handlePointerDown = (event) => {
      if (!railRef.current?.contains(event.target)) setExpanded(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [expanded]);

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
  };

  const controlButtonSx = {
    width: { xs: 32, lg: 34 },
    height: { xs: 32, lg: 34 },
    border: '1px solid rgba(11,92,171,0.2)',
    borderRadius: '999px',
    bgcolor: alpha('#E0ECF5', 0.74),
    color: 'primary.dark',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:disabled': { opacity: 0.28, cursor: 'not-allowed' },
    '&:not(:disabled):hover': { transform: 'translateY(-2px)', bgcolor: alpha('#0B5CAB', 0.1), color: 'primary.main' },
    '&:focus-visible': { outline: `3px solid ${alpha('#0B5CAB', 0.26)}`, outlineOffset: 3 },
  };

  return (
    <Box
      ref={railRef}
      component="nav"
      aria-label={t('nav.sectionNavigation')}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocusCapture={() => setExpanded(true)}
      onBlurCapture={handleBlur}
      sx={{
        position: 'fixed',
        zIndex: 1090,
        top: { xs: 'calc(var(--header-height) + 8px)', lg: '50%' },
        right: { xs: 'var(--section-inline-padding)', lg: 'clamp(18px, 2.3vw, 48px)' },
        left: { xs: 'var(--section-inline-padding)', sm: 'auto', lg: 'auto' },
        transform: { xs: 'none', lg: 'translateY(-50%)' },
        display: 'flex',
        flexDirection: { xs: 'row', lg: 'column' },
        alignItems: 'center',
        justifyContent: { xs: 'flex-end', lg: 'center' },
        gap: { xs: 0.8, lg: 1 },
        pointerEvents: 'none',
      }}
    >
      <Box
        component="button"
        type="button"
        disabled={!canGoPrevious}
        onClick={() => canGoPrevious && navigateTo(sections[activeIndex - 1].id)}
        aria-label={t('nav.previousSection')}
        sx={{ ...controlButtonSx, pointerEvents: 'auto', order: { xs: 1, lg: 0 } }}
      >
        <KeyboardArrowUpRoundedIcon sx={{ fontSize: '1.1rem', transform: { xs: 'rotate(-90deg)', lg: 'none' } }} />
      </Box>

      <Box sx={{ position: 'relative', pointerEvents: 'auto', order: { xs: 0, lg: 1 } }}>
        <Box
          component="button"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-current="page"
          sx={{
            minWidth: { xs: 156, sm: 188, lg: 118 },
            minHeight: { xs: 38, lg: 112 },
            px: { xs: 1.35, lg: 1.5 },
            py: { xs: 0.8, lg: 1.45 },
            border: '1px solid rgba(11,92,171,0.2)',
            borderRadius: { xs: '999px', lg: '16px' },
            bgcolor: alpha('#E0ECF5', active.id === 'home' ? 0.58 : 0.78),
            color: 'text.primary',
            boxShadow: '0 10px 28px rgba(15,37,55,0.075)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            cursor: 'pointer',
            display: 'grid',
            gridTemplateColumns: { xs: 'auto auto 1fr', lg: '1fr' },
            alignItems: 'center',
            justifyItems: { xs: 'start', lg: 'center' },
            gap: { xs: 0.75, lg: 0.55 },
            transition: 'all 0.22s ease',
            '&:hover': { borderColor: alpha('#0B5CAB', 0.34), transform: { xs: 'translateY(-1px)', lg: 'translateY(-2px)' } },
            '&:focus-visible': { outline: `3px solid ${alpha('#0B5CAB', 0.26)}`, outlineOffset: 3 },
          }}
        >
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              fontFamily: '"Fira Code", monospace',
              fontSize: { xs: '0.72rem', lg: '0.86rem' },
              fontWeight: 850,
              lineHeight: 1,
            }}
          >
            {active.number}
          </Typography>

          <Box
            aria-hidden="true"
            sx={{
              width: { xs: 18, lg: 32 },
              height: { xs: 2, lg: 3 },
              borderRadius: 2,
              bgcolor: 'primary.main',
              opacity: 0.84,
            }}
          />

          <Typography
            ref={labelRef}
            component="span"
            sx={{
              color: 'text.primary',
              fontFamily: '"Fira Code", monospace',
              fontSize: { xs: '0.66rem', sm: '0.7rem', lg: '0.72rem' },
              fontWeight: 850,
              letterSpacing: '0.08em',
              lineHeight: 1.2,
              maxWidth: { xs: 108, lg: 96 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              textAlign: { xs: 'left', lg: 'center' },
            }}
          >
            {active.label}
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: { xs: 'calc(100% + 8px)', lg: '50%' },
            right: { xs: 0, lg: 'calc(100% + 10px)' },
            left: { xs: 0, sm: 'auto', lg: 'auto' },
            width: { xs: '100%', sm: 230, lg: 224 },
            transform: { xs: 'none', lg: 'translateY(-50%)' },
            p: 0.75,
            borderRadius: '16px',
            border: '1px solid rgba(11,92,171,0.18)',
            bgcolor: alpha('#E0ECF5', 0.94),
            boxShadow: '0 16px 36px rgba(15,37,55,0.12)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            opacity: expanded ? 1 : 0,
            pointerEvents: expanded ? 'auto' : 'none',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {sections.map((section) => {
            const isCurrent = active.id === section.id;

            return (
              <Box
                key={section.id}
                component="button"
                type="button"
                onClick={() => navigateTo(section.id)}
                aria-current={isCurrent ? 'page' : undefined}
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr 14px',
                  alignItems: 'center',
                  gap: 0.9,
                  px: 1,
                  py: 0.8,
                  border: 0,
                  borderRadius: '11px',
                  bgcolor: isCurrent ? alpha('#0B5CAB', 0.11) : 'transparent',
                  color: isCurrent ? 'primary.dark' : 'text.primary',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.18s ease',
                  '&:hover': { bgcolor: alpha('#0B5CAB', 0.1), transform: 'translateX(-2px)' },
                  '&:focus-visible': { outline: `2px solid ${alpha('#0B5CAB', 0.28)}`, outlineOffset: 2 },
                }}
              >
                <Typography component="span" sx={{ color: 'primary.main', fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', fontWeight: 850 }}>
                  {section.number}
                </Typography>
                <Typography component="span" sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {section.label}
                </Typography>
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    justifySelf: 'center',
                    bgcolor: isCurrent ? 'primary.main' : alpha('#0B5CAB', 0.18),
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        component="button"
        type="button"
        disabled={!canGoNext}
        onClick={() => canGoNext && navigateTo(sections[activeIndex + 1].id)}
        aria-label={t('nav.nextSection')}
        sx={{ ...controlButtonSx, pointerEvents: 'auto', order: { xs: 2, lg: 2 } }}
      >
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.1rem', transform: { xs: 'rotate(-90deg)', lg: 'none' } }} />
      </Box>
    </Box>
  );
}
