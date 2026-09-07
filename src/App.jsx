import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import theme from './theme/theme';
import { visualColors, visualMotion, visualRadii, visualShadows } from './theme/tokens';
import Navbar from './components/layout/Navbar';
import SectionNavigation from './components/layout/SectionNavigation';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';

const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Credentials = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const PortfolioProjects = lazy(() => import('./components/sections/PortfolioProjects'));
const AboutProjectPage = lazy(() => import('./components/sections/AboutProjectPage'));
const Contact = lazy(() => import('./components/sections/Contact'));
const ProjectDetailPage = lazy(() => import('./components/sections/ProjectDetailPage'));
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
const ABOUT_PROJECT_ROUTE = 'about-project';

function stripBasePath(pathname) {
  if (!BASE_PATH) return pathname;
  if (pathname === BASE_PATH) return '/';
  if (pathname.startsWith(`${BASE_PATH}/`)) return pathname.slice(BASE_PATH.length) || '/';
  return pathname;
}

function getAppRoute() {
  const redirectedPath = window.sessionStorage.getItem('crm-specialist-redirect');

  if (redirectedPath) {
    window.sessionStorage.removeItem('crm-specialist-redirect');

    if (redirectedPath.startsWith('projects/')) {
      return { type: 'project', projectId: redirectedPath.split('/')[1] || null };
    }

    if (redirectedPath === ABOUT_PROJECT_ROUTE) {
      return { type: 'aboutProject' };
    }
  }

  const pathname = stripBasePath(window.location.pathname);
  const [, route, projectId] = pathname.split('/');

  if (route === 'projects' && projectId) {
    return { type: 'project', projectId };
  }

  if (route === ABOUT_PROJECT_ROUTE) {
    return { type: 'aboutProject' };
  }

  return { type: 'home' };
}

const globalStyles = `
  :root {
    --header-height: 0px;
    --page-max-width: 1380px;
    --section-inline-padding: clamp(20px, 4.6vw, 76px);
    --section-block-padding: clamp(40px, 6vh, 72px);
    --card-radius: 18px;
    --card-gap: clamp(14px, 1.45vw, 24px);
    --transition-fast: 200ms;
    --transition-normal: 280ms;
    --radius-control: ${visualRadii.control}px;
    --radius-card: ${visualRadii.card}px;
    --radius-panel: ${visualRadii.panel}px;
    --motion-fast: ${visualMotion.fast};
    --motion-normal: ${visualMotion.normal};
    --motion-deliberate: ${visualMotion.deliberate};
    --shadow-card: ${visualShadows.card};
    --shadow-card-hover: ${visualShadows.cardHover};
    --shadow-panel: ${visualShadows.panel};
    --color-command-navy: ${visualColors.commandNavy};
    --color-command-navy-soft: ${visualColors.commandNavySoft};
    --color-salesforce-core: ${visualColors.salesforceCore};
    --color-salesforce-legacy: ${visualColors.salesforceLegacy};
    --color-salesforce-bright: ${visualColors.salesforceBright};
    --color-flow-cyan: ${visualColors.flowCyan};
    --color-flow-cyan-legacy: ${visualColors.flowCyanLegacy};
    --color-console-mist: ${visualColors.consoleMist};
    --color-console-mist-deep: ${visualColors.consoleMistDeep};
    --color-surface-white: ${visualColors.surfaceWhite};
    --color-signal-amber: ${visualColors.signalAmber};
    --color-success-green: ${visualColors.successGreen};
    --color-service-blue: ${visualColors.serviceBlue};
    --background: 220 25% 97%;
    --foreground: 220 40% 13%;
    --card: 0 0% 100%;
    --card-foreground: 220 40% 13%;
    --primary: 215 85% 35%;
    --primary-foreground: 0 0% 100%;
    --secondary: 185 72% 42%;
    --secondary-foreground: 0 0% 100%;
    --muted: 220 20% 92%;
    --muted-foreground: 220 15% 50%;
    --accent: 30 90% 55%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 72% 55%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 20% 88%;
    --ring: 215 85% 35%;
    --success: 150 60% 40%;
    --warning: 40 90% 50%;
    --site-bg-start: hsl(var(--background));
    --site-bg-mid: hsl(220 20% 92%);
    --site-bg-end: hsl(220 20% 88%);
    --site-surface: hsl(var(--card));
    --site-surface-strong: hsl(220 25% 97%);
    --site-surface-muted: hsl(var(--muted));
    --site-border: hsl(var(--border) / 0.72);
  }

  @media (min-width: 900px) {
    :root {
      --header-height: 0px;
    }
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-height);
  }

  body {
    overflow-x: hidden;
    background: var(--site-bg-mid);
  }

  :focus-visible {
    outline: 3px solid hsl(var(--ring) / 0.3);
    outline-offset: 3px;
  }

  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  main > section[data-section] {
    scroll-margin-top: var(--header-height);
    position: relative;
  }

  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(35px, -55px) scale(1.06); }
    66%       { transform: translate(-25px, 20px) scale(0.94); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-45px, 35px) scale(0.94); }
    66%       { transform: translate(30px, -30px) scale(1.06); }
  }
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(20px, 40px) scale(1.08); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 hsl(var(--ring) / 0.3); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 10px hsl(var(--ring) / 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 hsl(var(--ring) / 0); }
  }

  @keyframes aboutPhotoTrail {
    0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--about-photo-rotate)); }
    50%      { transform: translate3d(18px, -14px, 0) rotate(calc(var(--about-photo-rotate) + 4deg)); }
  }

  @keyframes experienceTimelineScan {
    0%   { transform: translateY(-16%); opacity: 0; }
    18%  { opacity: 0.72; }
    72%  { opacity: 0.72; }
    100% { transform: translateY(116%); opacity: 0; }
  }

  @keyframes credentialStampFloat {
    0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--credential-rotate)); }
    50%      { transform: translate3d(-14px, 16px, 0) rotate(calc(var(--credential-rotate) - 3deg)); }
  }

  @keyframes skillsRadarSpin {
    to { transform: rotate(360deg); }
  }

  @keyframes skillsCodeRain {
    0%   { transform: translateY(-28px); opacity: 0.12; }
    45%  { opacity: 0.42; }
    100% { transform: translateY(82px); opacity: 0.12; }
  }

  @keyframes projectsBlueprintShift {
    0%, 100% { background-position: 0 0, 0 0; }
    50%      { background-position: 30px 18px, -18px 30px; }
  }

  @keyframes contactSignalPulse {
    0%   { transform: scale(0.78); opacity: 0.46; }
    70%  { transform: scale(1.18); opacity: 0; }
    100% { transform: scale(1.18); opacity: 0; }
  }

  @keyframes contactRouteDash {
    to { stroke-dashoffset: -64; }
  }

  @keyframes loadingSignal {
    0%, 100% { transform: translateX(-42%); opacity: 0.28; }
    50% { transform: translateX(42%); opacity: 0.88; }
  }

  @supports (overflow-x: clip) {
    body { overflow-x: clip; }
  }

  @-moz-document url-prefix() {
    * {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    html { scroll-snap-type: none; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

function LoadingFallback() {
  return (
    <Box
      role="status"
      aria-label="Carregando conteúdo"
      sx={{
        minHeight: 180,
        display: 'grid',
        placeItems: 'center',
        px: 'var(--section-inline-padding)',
      }}
    >
      <Box component="span" className="sr-only">
        Carregando conteúdo
      </Box>
      <Box
        sx={{
          width: { xs: 156, md: 220 },
          height: 8,
          borderRadius: '999px',
          bgcolor: 'rgba(224,236,245,0.78)',
          overflow: 'hidden',
          border: '1px solid rgba(13,77,165,0.16)',
          '&::before': {
            content: '""',
            display: 'block',
            width: '48%',
            height: '100%',
            borderRadius: 'inherit',
            background: 'linear-gradient(90deg, var(--color-salesforce-core), var(--color-flow-cyan))',
            animation: 'loadingSignal 1.2s ease-in-out infinite',
          },
        }}
      />
    </Box>
  );
}

export default function App() {
  const [appRoute, setAppRoute] = useState(() => getAppRoute());
  const [loadHomeSections, setLoadHomeSections] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => setAppRoute(getAppRoute());

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    if (appRoute.type !== 'home') return undefined;

    const loadSections = () => setLoadHomeSections(true);
    const idleCallback = window.requestIdleCallback;

    if (idleCallback) {
      const id = idleCallback(loadSections, { timeout: 900 });
      return () => window.cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(loadSections, 350);
    return () => window.clearTimeout(id);
  }, [appRoute.type]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Box sx={{ overflowX: 'hidden', '@supports (overflow-x: clip)': { overflowX: 'clip' } }}>
        <Navbar />
        {appRoute.type === 'project' ? (
          <Suspense fallback={<LoadingFallback />}>
            <ProjectDetailPage projectId={appRoute.projectId} />
          </Suspense>
        ) : appRoute.type === 'aboutProject' ? (
          <Suspense fallback={<LoadingFallback />}>
            <AboutProjectPage />
          </Suspense>
        ) : (
          <>
            <SectionNavigation />
            <main>
              <Hero />
              {loadHomeSections ? (
                <Suspense fallback={<LoadingFallback />}>
                  <About />
                  <Experience />
                  <Credentials />
                  <Skills />
                  <PortfolioProjects />
                  <Contact />
                </Suspense>
              ) : null}
            </main>
          </>
        )}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
