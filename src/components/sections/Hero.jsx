import { useLayoutEffect, useRef } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
  alpha,
} from '@mui/material';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { profile } from '../../data/profile';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';
import { scrollToSection } from '../../utils/scrollToSection';

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

/* ── Hero component ──────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const valuePillars = getLocalizedStringArray(profile.valuePillars, lang);
  const roleText = getLocalizedString(profile.title, lang);

  useLayoutEffect(() => {
    if (!sectionRef.current) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-gsap-item',
        { autoAlpha: 0, y: 24, clipPath: 'inset(12% 0 0 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.78,
          stagger: 0.12,
          delay: 0.18,
          ease: 'power3.out',
        },
      );

      gsap.to('.hero-scroll-arrow', {
        y: 6,
        duration: 0.75,
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
        '@supports (height: 100svh)': {
          minHeight: '100svh',
        },
        '@supports (height: 100dvh)': {
          minHeight: '100dvh',
        },
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--site-bg-start) 0%, var(--site-bg-end) 100%)',
        pt: { xs: 9, md: 8 },
        pb: { xs: 6, md: 7 },
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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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
          pointerEvents: 'none',
        }}
      />

      {/* ── Main content ── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box component="div">
          {/* Available badge */}
          {profile.available && (
            <Box component="div" className="hero-gsap-item">
              <Chip
                icon={
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#0B8F61',
                      animation: 'pulse-ring 2s infinite',
                    }}
                  />
                }
                label={getLocalizedString(profile.availableLabel, lang)}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: alpha('#0B8F61', 0.13),
                  border: `1px solid ${alpha('#0B8F61', 0.36)}`,
                  color: '#0B8F61',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.03em',
                  cursor: 'default',
                }}
              />
            </Box>
          )}

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
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  fontWeight: 400,
                  fontFamily: '"Fira Code", monospace',
                  mb: 1,
                  letterSpacing: '0.05em',
                }}
              >
                {t('hero.greeting')}
              </Box>
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #0F2537 30%, #284B68 100%)',
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
                  background: 'linear-gradient(90deg, #0B5CAB 0%, #159DB3 100%)',
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
                color: 'text.secondary',
                mb: 2.25,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.75,
              }}
            >
              {getLocalizedString(profile.description, lang)}
            </Typography>
          </Box>

          <Box component="div" className="hero-gsap-item">
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                maxWidth: { xs: '100%', md: 680 },
                mb: 3,
              }}
            >
              {valuePillars.map((pillar) => (
                <Box
                  key={pillar}
                  component="span"
                  sx={{
                    px: { xs: 1.15, sm: 1.4 },
                    py: 0.75,
                    maxWidth: '100%',
                    borderRadius: '999px',
                    border: '1px solid rgba(11,92,171,0.24)',
                    bgcolor: 'rgba(224,236,245,0.72)',
                    color: 'text.secondary',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: { xs: '0.68rem', sm: '0.72rem' },
                    fontWeight: 600,
                    lineHeight: 1.4,
                    boxShadow: '0 8px 24px rgba(15,37,55,0.06)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: { xs: 'normal', sm: 'nowrap' },
                  }}
                >
                  {pillar}
                </Box>
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
                  mb: 3.5,
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

          {/* Location & code flavor */}
          <Box component="div" className="hero-gsap-item">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontFamily: '"Fira Code", monospace' }}
              >
                {'{'} {t('hero.locationKey')}: "{getLocalizedString(profile.location, lang)}" {'}'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Scroll down indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 16, md: 24 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            opacity: 0.5,
            cursor: 'pointer',
            '&:hover': { opacity: 1 },
            transition: 'opacity 0.3s',
          }}
          onClick={() => scrollToSection('about')}
        >
          <Typography variant="caption" sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            {t('hero.scroll')}
          </Typography>
          <Box component="div" className="hero-scroll-arrow">
            <Box
              aria-hidden="true"
              sx={{
                width: 12,
                height: 12,
                borderRight: '2px solid currentColor',
                borderBottom: '2px solid currentColor',
                transform: 'rotate(45deg)',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
