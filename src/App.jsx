import { lazy, Suspense } from 'react';
import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/layout/Navbar';
import SectionNavigation from './components/layout/SectionNavigation';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';

const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Credentials = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const PortfolioProjects = lazy(() => import('./components/sections/PortfolioProjects'));
const Contact = lazy(() => import('./components/sections/Contact'));

const globalStyles = `
  :root {
    --header-height: 88px;
    --page-max-width: 1380px;
    --section-inline-padding: clamp(20px, 4.6vw, 76px);
    --section-block-padding: clamp(22px, 4vh, 48px);
    --card-radius: 18px;
    --card-gap: clamp(12px, 1.35vw, 22px);
    --transition-fast: 200ms;
    --transition-normal: 280ms;
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
      --header-height: 64px;
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

  @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
    html {
      scroll-snap-type: y proximity;
    }

    html.is-programmatic-scroll {
      scroll-snap-type: none;
    }

    main > section[data-section] {
      scroll-snap-align: start;
      scroll-snap-stop: normal;
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
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 hsl(var(--ring) / 0.3); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 10px hsl(var(--ring) / 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 hsl(var(--ring) / 0); }
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
        <SectionNavigation />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Experience />
            <Credentials />
            <Skills />
            <PortfolioProjects />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
