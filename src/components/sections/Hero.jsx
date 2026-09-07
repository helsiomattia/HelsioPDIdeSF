import { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  alpha,
} from '@mui/material';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { profile } from '../../data/profile';
import { visualColors, visualGradients } from '../../theme/tokens';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';
import { scrollToSection } from '../../utils/scrollToSection';
import OperationalSignal from '../ui/OperationalSignal';

const ambientSnippets = [
  '{ platform: "Salesforce" }',
  'automation.run()',
  'integration.sync = true',
  'data.readyForAI()',
];

const ambientTags = ['Salesforce Platform', 'Service Cloud', 'Automation', 'Integration', 'Data', 'AI Ready'];

const COCKPIT_LABELS = {
  title: {
    pt: 'CRM control room',
    en: 'CRM control room',
    es: 'CRM control room',
  },
  subtitle: {
    pt: 'Sinais que conectam operação, arquitetura e evolução da plataforma.',
    en: 'Signals connecting operations, architecture and platform evolution.',
    es: 'Señales que conectan operación, arquitectura y evolución de plataforma.',
  },
  route: {
    pt: 'plataforma Salesforce em operação',
    en: 'Salesforce platform in operation',
    es: 'plataforma Salesforce en operación',
  },
};

/* ── Technical ambient layer ─────────────────────────────── */
function HeroTechAmbient() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: { xs: '11% -20% 6% -16%', md: '8% 5% 5% 38%' },
          opacity: { xs: 0.28, md: 0.5 },
          backgroundImage: [
            'linear-gradient(rgba(11,92,171,0.11) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(11,92,171,0.11) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: { xs: '46px 46px', md: '56px 56px' },
          maskImage: 'radial-gradient(circle at 64% 44%, black 0%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle at 64% 44%, black 0%, transparent 72%)',
        }}
      />

      <Box
        className="hero-ambient-item hero-ambient-float"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          top: '18%',
          right: { md: '7%', lg: '10%' },
          width: { md: 330, lg: 390 },
          p: 2,
          borderRadius: '22px',
          border: '1px solid rgba(11,92,171,0.15)',
          bgcolor: 'rgba(255,255,255,0.45)',
          boxShadow: '0 24px 80px rgba(15,37,55,0.08)',
          backdropFilter: 'blur(10px)',
          opacity: 'var(--hero-ambient-opacity)',
          '--hero-ambient-opacity': 0.72,
          color: 'rgba(20,29,46,0.62)',
          fontFamily: '"Fira Code", monospace',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.4 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'rgba(41,163,102,0.72)' }} />
          <Typography component="span" sx={{ fontFamily: 'inherit', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.12em' }}>
            CRM_PIPELINE
          </Typography>
          <Box sx={{ ml: 'auto', fontSize: '0.64rem', color: 'rgba(13,77,165,0.68)' }}>LIVE</Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          {ambientTags.map((tag) => (
            <Box
              key={tag}
              sx={{
                borderRadius: '999px',
                border: '1px solid rgba(30,172,184,0.2)',
                bgcolor: 'rgba(231,244,248,0.48)',
                px: 1,
                py: 0.7,
                fontSize: '0.62rem',
                fontWeight: 800,
                textAlign: 'center',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.7, height: 46, mt: 2 }}>
          {[42, 68, 54, 82, 60, 74, 50, 88, 66].map((height, index) => (
            <Box
              key={`${height}-${index}`}
              className="hero-data-bar"
              sx={{
                flex: 1,
                height: `${height}%`,
                borderRadius: '6px 6px 2px 2px',
                background: index % 3 === 0
                  ? 'linear-gradient(180deg, rgba(30,172,184,0.58), rgba(30,172,184,0.16))'
                  : 'linear-gradient(180deg, rgba(13,77,165,0.5), rgba(13,77,165,0.12))',
              }}
            />
          ))}
        </Box>
      </Box>

      <Box
        className="hero-ambient-item hero-ambient-float"
        component="svg"
        viewBox="0 0 420 260"
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          right: { sm: '-84px', md: '5%' },
          bottom: { sm: '12%', md: '13%' },
          width: { sm: 320, md: 420 },
          height: 'auto',
          opacity: 'var(--hero-ambient-opacity)',
          '--hero-ambient-opacity': { sm: 0.34, md: 0.62 },
          '& line, & path': {
            stroke: 'rgba(13,77,165,0.28)',
            strokeWidth: 1.3,
            fill: 'none',
          },
          '& circle': {
            fill: 'rgba(255,255,255,0.76)',
            stroke: 'rgba(30,172,184,0.45)',
            strokeWidth: 1.4,
          },
        }}
      >
        <path d="M58 180 C120 92 196 226 270 102 S354 92 392 38" />
        <line x1="86" y1="72" x2="174" y2="138" />
        <line x1="174" y1="138" x2="264" y2="82" />
        <line x1="174" y1="138" x2="304" y2="184" />
        <line x1="264" y1="82" x2="354" y2="126" />
        <circle className="hero-node" cx="58" cy="180" r="5" />
        <circle className="hero-node" cx="86" cy="72" r="6" />
        <circle className="hero-node" cx="174" cy="138" r="8" />
        <circle className="hero-node" cx="264" cy="82" r="6" />
        <circle className="hero-node" cx="304" cy="184" r="7" />
        <circle className="hero-node" cx="354" cy="126" r="5" />
        <circle className="hero-node" cx="392" cy="38" r="6" />
      </Box>

      {ambientSnippets.map((snippet, index) => (
        <Box
          key={snippet}
          className="hero-ambient-item hero-ambient-float"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            right: [null, '7%', '15%', '5%'][index],
            bottom: [null, '9%', '38%', '57%'][index],
            top: ['18%', null, null, null][index],
            left: ['6%', null, null, null][index],
            maxWidth: { xs: 190, md: 230 },
            px: 1.2,
            py: 0.85,
            borderRadius: '12px',
            border: '1px solid rgba(11,92,171,0.13)',
            bgcolor: 'rgba(255,255,255,0.38)',
            boxShadow: '0 12px 42px rgba(15,37,55,0.055)',
            backdropFilter: 'blur(8px)',
            opacity: 'var(--hero-ambient-opacity)',
            '--hero-ambient-opacity': { xs: 0.42, md: 0.64 },
            color: 'rgba(20,29,46,0.44)',
            fontFamily: '"Fira Code", monospace',
            fontSize: { xs: '0.58rem', md: '0.64rem' },
            fontWeight: 750,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          {snippet}
        </Box>
      ))}

      <Box
        className="hero-ambient-item hero-data-stream"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          right: '17%',
          top: '44%',
          width: 210,
          height: 1,
          opacity: 'var(--hero-ambient-opacity)',
          '--hero-ambient-opacity': 0.68,
          background: 'linear-gradient(90deg, transparent, rgba(30,172,184,0.42), transparent)',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: -3,
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: 'rgba(30,172,184,0.5)',
            boxShadow: '0 0 16px rgba(30,172,184,0.25)',
          },
          '&::before': { left: '22%' },
          '&::after': { right: '18%' },
        }}
      />

      <Box
        className="hero-ambient-item hero-ambient-float"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: { md: '-120px', lg: '-72px', xl: '1%' },
          top: { md: '38%', lg: '42%' },
          width: { md: 144, lg: 168 },
          px: 1.15,
          py: 1,
          borderRadius: '16px',
          border: '1px solid rgba(11,92,171,0.12)',
          bgcolor: 'rgba(255,255,255,0.32)',
          boxShadow: '0 18px 58px rgba(15,37,55,0.06)',
          backdropFilter: 'blur(8px)',
          opacity: 'var(--hero-ambient-opacity)',
          '--hero-ambient-opacity': 0.42,
          color: 'rgba(20,29,46,0.38)',
          fontFamily: '"Fira Code", monospace',
          fontSize: { md: '0.56rem', lg: '0.6rem' },
          fontWeight: 800,
          letterSpacing: '0.03em',
        }}
      >
        {['lead.score +18', 'sla.watch()', 'qa.pass = 99%'].map((line) => (
          <Box
            key={line}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              py: 0.55,
              borderBottom: '1px solid rgba(11,92,171,0.08)',
              '&:last-of-type': { borderBottom: 0 },
              '&::before': {
                content: '""',
                width: 6,
                height: 6,
                borderRadius: '50%',
                flex: '0 0 auto',
                bgcolor: 'rgba(30,172,184,0.48)',
                boxShadow: '0 0 12px rgba(30,172,184,0.2)',
              },
            }}
          >
            {line}
          </Box>
        ))}
      </Box>

      <Box
        className="hero-ambient-item hero-ambient-float"
        component="svg"
        viewBox="0 0 280 150"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: { md: '72%', lg: '76%' },
          bottom: { md: '7%', lg: '9%' },
          width: { md: 230, lg: 280 },
          height: 'auto',
          opacity: 'var(--hero-ambient-opacity)',
          '--hero-ambient-opacity': 0.42,
          '& path': {
            fill: 'none',
            stroke: 'rgba(30,172,184,0.28)',
            strokeWidth: 1.5,
          },
          '& circle': {
            fill: 'rgba(255,255,255,0.7)',
            stroke: 'rgba(11,92,171,0.36)',
            strokeWidth: 1.3,
          },
        }}
      >
        <path d="M24 104 C74 34 118 124 166 72 S236 48 256 18" />
        <path d="M52 126 C98 92 136 144 190 104 S238 88 264 120" />
        <circle className="hero-node" cx="24" cy="104" r="5" />
        <circle className="hero-node" cx="86" cy="62" r="6" />
        <circle className="hero-node" cx="166" cy="72" r="7" />
        <circle className="hero-node" cx="256" cy="18" r="5" />
        <circle className="hero-node" cx="52" cy="126" r="4" />
        <circle className="hero-node" cx="190" cy="104" r="6" />
        <circle className="hero-node" cx="264" cy="120" r="4" />
      </Box>
    </Box>
  );
}

/* ── Gradient orb helper ─────────────────────────────────── */
function Orb({ sx }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        filter: { xs: 'blur(32px)', md: 'blur(40px)' },
        pointerEvents: 'none',
        ...sx,
      }}
    />
  );
}

function HeroCockpit({ lang }) {
  const signals = getLocalizedStringArray(profile.operationalSignals, lang);

  return (
    <Box
      className="hero-gsap-item"
      sx={{
        display: { xs: 'none', md: 'block' },
        justifySelf: 'end',
        width: '100%',
        maxWidth: 390,
        borderRadius: '28px',
        border: '1px solid rgba(6,24,39,0.14)',
        bgcolor: 'rgba(255,255,255,0.68)',
        boxShadow: '0 28px 90px rgba(6,24,39,0.12)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          px: 2.2,
          py: 1.6,
          background: `linear-gradient(135deg, ${visualColors.commandNavy} 0%, ${visualColors.salesforceCore} 100%)`,
          color: '#EAF3F9',
        }}
      >
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 850, lineHeight: 1.2 }}>
          {getLocalizedString(COCKPIT_LABELS.title, lang)}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', color: 'rgba(234,243,249,0.76)', lineHeight: 1.45, mt: 0.45 }}>
          {getLocalizedString(COCKPIT_LABELS.subtitle, lang)}
        </Typography>
      </Box>

      <Box sx={{ p: 1.35 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 0.85,
          }}
        >
          {signals.map((signal) => (
            <OperationalSignal key={signal.label} signal={signal} dense />
          ))}
        </Box>

        <Box
          sx={{
            mt: 1.2,
            px: 1,
            py: 0.85,
            borderRadius: '12px',
            bgcolor: alpha(visualColors.consoleMist, 0.72),
            color: 'text.secondary',
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.68rem',
            fontWeight: 800,
          }}
        >
          {getLocalizedString(COCKPIT_LABELS.route, lang)}
        </Box>
      </Box>
    </Box>
  );
}

/* ── Hero component ──────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const valuePillars = getLocalizedStringArray(profile.valuePillars, lang);
  const roleText = getLocalizedString(profile.title, lang);
  const description = getLocalizedStringArray(profile.description, lang);

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-gsap-item',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.12,
          delay: 0.18,
          ease: 'power3.out',
        },
      );

      gsap.fromTo(
        '.hero-ambient-item',
        { opacity: 0, y: 14 },
        {
          opacity: (_, target) => Number.parseFloat(
            getComputedStyle(target).getPropertyValue('--hero-ambient-opacity'),
          ) || 1,
          y: 0,
          duration: 1.1,
          stagger: 0.08,
          delay: 0.45,
          ease: 'power2.out',
        },
      );

      if (isFirefox) return;

      gsap.to('.hero-ambient-float', {
        y: -10,
        x: 5,
        duration: 5.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.45, from: 'random' },
      });

      gsap.to('.hero-node', {
        scale: 1.32,
        opacity: 0.82,
        transformOrigin: 'center',
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.24,
      });

      gsap.to('.hero-data-bar', {
        scaleY: 0.72,
        transformOrigin: 'bottom',
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.16,
      });

      gsap.to('.hero-data-stream', {
        x: 18,
        opacity: 0.48,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="home"
      data-section="home"
      component="section"
      sx={{
        minHeight: '100vh',
        '@supports (height: 100svh)': { minHeight: '100svh' },
        '@supports (height: 100dvh)': { minHeight: '100dvh' },
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--site-bg-start) 0%, var(--site-bg-end) 100%)',
        pt: { xs: 'calc(var(--header-height) + 24px)', md: 'calc(var(--header-height) + 16px)' },
        pb: { xs: 5, md: 5.5 },
      }}
    >
      {/* ── Background orbs ── */}
      <Orb
        sx={{
          width: { xs: 300, md: 520 },
          height: { xs: 300, md: 520 },
          background: 'radial-gradient(circle, rgba(11,92,171,0.24) 0%, transparent 70%)',
          top: '-80px',
          left: { xs: '-100px', md: '-150px' },
          animation: 'float1 22s ease-in-out infinite',
        }}
      />
      <Orb
        sx={{
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          background: 'radial-gradient(circle, rgba(21,157,179,0.18) 0%, transparent 70%)',
          bottom: { xs: '-50px', md: '0px' },
          right: { xs: '-80px', md: '-100px' },
          animation: 'float2 18s ease-in-out infinite',
        }}
      />
      <Orb
        sx={{
          width: { xs: 180, md: 300 },
          height: { xs: 180, md: 300 },
          background: 'radial-gradient(circle, rgba(11,92,171,0.13) 0%, transparent 70%)',
          top: '58%',
          right: { xs: '-120px', md: '8%' },
          animation: 'float3 25s ease-in-out infinite',
        }}
      />

      {/* ── Dot grid overlay ── */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(8,76,143,0.11) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.82), rgba(0,0,0,0.22))',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.82), rgba(0,0,0,0.22))',
          pointerEvents: 'none',
        }}
      />

      <HeroTechAmbient />

      {/* ── Main content ── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component="div"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)' },
            alignItems: 'center',
            gap: { md: 4 },
          }}
        >
          <Box component="div" sx={{ minWidth: 0 }}>
          {/* Name */}
          <Box component="div" className="hero-gsap-item">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
                mb: 1,
                lineHeight: 1.05,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: 'text.primary',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  fontWeight: 650,
                  mb: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                {t('hero.greeting')}
              </Box>
              <Box
                component="span"
                sx={{
                  background: visualGradients.commandText,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {profile.name}
              </Box>
            </Typography>
          </Box>

          {/* Role */}
          <Box component="div" className="hero-gsap-item">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.5rem' },
                mb: 2,
                fontWeight: 600,
                minHeight: { xs: '2.2rem', md: '3rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  background: visualGradients.crmFlow,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {roleText}
              </Box>
            </Typography>
          </Box>

          {/* Description */}
          <Box component="div" className="hero-gsap-item">
            <Typography
              variant="body1"
              sx={{
                maxWidth: { xs: '100%', md: '580px' },
                color: 'text.primary',
                fontWeight: 500,
                mb: 2.25,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.75,
              }}
            >
              {description.map((paragraph) => (
                <Box
                  key={paragraph}
                  component="span"
                  sx={{ display: 'block', mb: 1.1, '&:last-of-type': { mb: 0 } }}
                >
                  {paragraph}
                </Box>
              ))}
            </Typography>
          </Box>

          <Box component="div" className="hero-gsap-item">
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.25,
                alignItems: 'center',
                maxWidth: { xs: '100%', md: 680 },
                mb: 2.8,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => scrollToSection('projects')}
                sx={{ minWidth: { xs: '100%', sm: 156 } }}
              >
                {t('hero.viewProjects')}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => scrollToSection('contact')}
                sx={{ minWidth: { xs: '100%', sm: 172 } }}
              >
                {t('hero.contact')}
              </Button>
            </Box>
          </Box>

          <Box component="div" className="hero-gsap-item">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: { xs: 0.7, sm: 0 },
                maxWidth: { xs: '100%', md: 620 },
                mb: 3,
                borderLeft: `3px solid ${visualColors.flowCyan}`,
                pl: { xs: 1.4, md: 1.7 },
              }}
            >
              {valuePillars.map((pillar) => (
                <Typography
                  key={pillar}
                  component="span"
                  sx={{
                    color: 'text.primary',
                    fontSize: { xs: '0.78rem', md: '0.82rem' },
                    fontWeight: 680,
                    lineHeight: 1.35,
                    pr: { sm: 2 },
                    py: { sm: 0.35 },
                  }}
                >
                  {pillar}
                </Typography>
              ))}
            </Box>
          </Box>

          {profile.resume && (
            <Box component="div" className="hero-gsap-item">
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  alignItems: 'center',
                  mb: 2.5,
                }}
              >
                <Button
                  component="a"
                  href={profile.resume}
                  download
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  {t('hero.downloadResume')}
                </Button>
              </Box>
            </Box>
          )}

          <Box component="div" className="hero-gsap-item">
            <Box
              component="button"
              type="button"
              onClick={() => scrollToSection('about')}
              aria-label={t('hero.scroll')}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mt: { xs: 0.5, md: 1 },
                p: 0,
                border: 0,
                bgcolor: 'transparent',
                color: 'primary.dark',
                cursor: 'pointer',
                fontSize: { xs: '0.78rem', md: '0.84rem' },
                fontWeight: 750,
                letterSpacing: '0.01em',
                transition: 'color 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                },
                '&:focus-visible': {
                  outline: `3px solid ${alpha(visualColors.salesforceLegacy, 0.26)}`,
                  outlineOffset: 5,
                  borderRadius: '999px',
                },
              }}
            >
              {t('hero.scroll')}
              <Box component="span" aria-hidden="true" sx={{ fontSize: '1rem', lineHeight: 1 }}>
                ↓
              </Box>
            </Box>
          </Box>

          </Box>

          <HeroCockpit lang={lang} />
        </Box>
      </Container>
    </Box>
  );
}
