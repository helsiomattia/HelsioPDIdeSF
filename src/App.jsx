import { lazy, Suspense } from 'react';
import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';

const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));

const globalStyles = `
  :root {
    --header-height: 96px;
    --page-max-width: 1320px;
    --section-inline-padding: clamp(20px, 4vw, 64px);
    --section-block-padding: clamp(24px, 4vh, 52px);
    --card-radius: 18px;
    --card-gap: clamp(14px, 1.5vw, 24px);
    --transition-fast: 200ms;
    --transition-normal: 280ms;
    --site-bg-start: #D3E2EE;
    --site-bg-mid: #C7D9E8;
    --site-bg-end: #B8CDDD;
    --site-surface: #E0ECF5;
    --site-surface-strong: #D4E3EE;
    --site-surface-muted: #C1D4E3;
    --site-border: rgba(11, 33, 51, 0.16);
  }

  @media (min-width: 900px) {
    :root {
      --header-height: 68px;
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
    outline: 3px solid rgba(11, 92, 171, 0.3);
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
  }

  @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
    html {
      scroll-snap-type: y proximity;
    }

    html.is-programmatic-scroll {
      scroll-snap-type: none;
    }

    main > section[data-section] {
      scroll-snap-align: start;
    }
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
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(8, 76, 143, 0.3); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(8, 76, 143, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(8, 76, 143, 0); }
  }

  @supports (overflow-x: clip) {
    body { overflow-x: clip; }
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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Box sx={{ overflowX: 'hidden', '@supports (overflow-x: clip)': { overflowX: 'clip' } }}>
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
