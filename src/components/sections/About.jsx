import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Chip,
  Container,
  Paper,
  Typography,
  alpha,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { useTranslation } from 'react-i18next';
import AnimatedBox from '../ui/AnimatedBox';
import SectionTitle from '../ui/SectionTitle';
import { profile } from '../../data/profile';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';
import mepic1 from '../../../images/optimized/mepic-1.webp';
import mepic2 from '../../../images/optimized/mepic-2.webp';
import mepic3 from '../../../images/optimized/mepic-3.webp';
import mepic4 from '../../../images/optimized/mepic-4.webp';
import mepic5 from '../../../images/optimized/mepic-5.webp';
import mepic6 from '../../../images/optimized/mepic-6.webp';
import mepic7 from '../../../images/optimized/mepic-7.webp';
import mepic8 from '../../../images/optimized/mepic-8.webp';
import mepic9 from '../../../images/optimized/mepic-9.webp';
import mepic10 from '../../../images/optimized/mepic-10.webp';
import mepic11 from '../../../images/optimized/mepic-11.webp';

const badgeColors = ['#0B5CAB', '#159DB3', '#0B8F61', '#4A6478'];

const profilePhotos = [
  { src: mepic1, position: '52% 42%', scale: 1.38 },
  { src: mepic2, position: '48% 34%', scale: 1.22 },
  { src: mepic3, position: '50% 38%', scale: 1.24 },
  { src: mepic4, position: '52% 35%', scale: 1.18 },
  { src: mepic5, position: '66% 28%', scale: 1.48 },
  { src: mepic6, position: '48% 35%', scale: 1.28 },
  { src: mepic7, position: '50% 34%', scale: 1.22 },
  { src: mepic8, position: '54% 36%', scale: 1.25 },
  { src: mepic9, position: '50% 36%', scale: 1.24 },
  { src: mepic10, position: '62% 38%', scale: 1.42 },
  { src: mepic11, position: '50% 34%', scale: 1.26 },
];

function AboutAmbient() {
  const backgroundPhotos = [
    { src: mepic4, top: '11%', right: { md: '-74px', lg: '-34px', xl: '2%' }, rotate: '-10deg', delay: '0s' },
    { src: mepic8, bottom: '8%', left: { md: '-82px', lg: '-44px', xl: '2%' }, rotate: '8deg', delay: '-4s' },
    { src: mepic10, bottom: '18%', right: { md: '-118px', lg: '-84px', xl: '-18px' }, rotate: '13deg', delay: '-8s' },
  ];

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
      {backgroundPhotos.map((photo) => (
        <Box
          key={photo.src}
          component="img"
          src={photo.src}
          alt=""
          loading="lazy"
          decoding="async"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: photo.top,
            right: photo.right,
            bottom: photo.bottom,
            left: photo.left,
            width: { md: 132, lg: 168 },
            height: { md: 176, lg: 218 },
            objectFit: 'cover',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.42)',
            boxShadow: '0 26px 80px rgba(15,37,55,0.08)',
            opacity: 0.16,
            filter: 'saturate(0.9) contrast(1.05)',
            '--about-photo-rotate': photo.rotate,
            animation: `aboutPhotoTrail 18s ease-in-out ${photo.delay} infinite`,
          }}
        />
      ))}
    </Box>
  );
}

export default function About() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const [activePhoto, setActivePhoto] = useState(0);
  const activeProfilePhoto = profilePhotos[activePhoto];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || profilePhotos.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % profilePhotos.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Box
      id="about"
      data-section="about"
      component="section"
      sx={{
        minHeight: { md: 'calc(100dvh - var(--header-height))' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 'var(--section-block-padding)' },
        background:
          'linear-gradient(180deg, var(--site-bg-end) 0%, var(--site-bg-mid) 48%, var(--site-bg-start) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AboutAmbient />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: 'var(--page-max-width)',
          px: 'var(--section-inline-padding)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionTitle
          overline={t('about.overline')}
          title={t('about.title')}
          subtitle={t('about.subtitle')}
          subtitleMaxWidth="560px"
          dividerHeight={3}
          dividerWidth={48}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(300px, 360px) minmax(0, 1fr)' },
            gap: 'var(--card-gap)',
            alignItems: 'stretch',
            mx: 'auto',
          }}
        >
          {/* ── Left column: avatar + stats ── */}
          <AnimatedBox delay={0.1} style={{ height: '100%' }}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                p: { xs: 2.25, sm: 2.75, md: 3 },
                borderRadius: 'var(--card-radius)',
                bgcolor: 'rgba(224,236,245,0.9)',
                border: '1px solid rgba(8,76,143,0.2)',
                boxShadow: '0 16px 44px rgba(15,37,55,0.08)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
                  bgcolor: 'rgba(224,236,245,0.98)',
                },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(11,92,171,0.16), transparent 42%)',
                  pointerEvents: 'none',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: { xs: 2.25, md: 2.75 },
                }}
              >
                {/* Avatar */}
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -3,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0B5CAB 0%, #159DB3 100%)',
                      zIndex: 0,
                    }}
                  />
                  <Avatar
                    aria-label={profile.name}
                    sx={{
                      width: { xs: 176, md: 216 },
                      height: { xs: 176, md: 216 },
                      position: 'relative',
                      zIndex: 1,
                      border: '4px solid var(--site-surface)',
                      fontSize: { xs: '3.2rem', md: '3.7rem' },
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, var(--site-surface) 0%, var(--site-surface-muted) 100%)',
                      color: 'primary.main',
                      boxShadow: '0 12px 32px rgba(11,92,171,0.16)',
                      overflow: 'hidden',
                    }}
                  >
                    {activeProfilePhoto ? (
                      <Box
                        key={activeProfilePhoto.src}
                        component="img"
                        src={activeProfilePhoto.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: activeProfilePhoto.position,
                          transform: `scale(${activeProfilePhoto.scale})`,
                          filter: 'saturate(1.02) contrast(1.02)',
                        }}
                      />
                    ) : null}
                    <Box
                      component="span"
                      sx={{
                        opacity: profilePhotos.length ? 0 : 1,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {profile.initials}
                    </Box>
                  </Avatar>
                </Box>

                {/* Name + location */}
                <Box sx={{ textAlign: 'center', maxWidth: 300, mt: { xs: 1, md: 1.4 } }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '-0.02em' }}>
                    {profile.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      fontFamily: '"Fira Code", monospace',
                      fontSize: { xs: '0.76rem', sm: '0.8rem' },
                      lineHeight: 1.55,
                      mb: 1.2,
                    }}
                  >
                    {getLocalizedString(profile.title, lang)}
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.65,
                      px: 1.25,
                      py: 0.55,
                      borderRadius: '999px',
                      bgcolor: alpha('#0B5CAB', 0.1),
                      border: '1px solid rgba(11,92,171,0.18)',
                    }}
                  >
                    <LocationOnOutlinedIcon sx={{ fontSize: '0.9rem', color: 'primary.main' }} />
                    <Typography variant="caption" color="text.primary" sx={{ fontWeight: 700 }}>
                      {getLocalizedString(profile.location, lang)}
                    </Typography>
                  </Box>
                </Box>

              </Box>
            </Paper>
          </AnimatedBox>

          {/* ── Right column: text + tech stack ── */}
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Box sx={{ width: '100%' }}>
              <AnimatedBox delay={0.2}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  px: { xs: 2.5, sm: 3, md: 'clamp(24px, 3vw, 40px)' },
                  py: { xs: 2.35, sm: 3, md: 3.25 },
                  mb: 'var(--card-gap)',
                  borderRadius: 'var(--card-radius)',
                  bgcolor: 'rgba(224,236,245,0.78)',
                  border: '1px solid rgba(11,33,51,0.14)',
                  boxShadow: '0 14px 38px rgba(15,37,55,0.06)',
                }}
              >
                {getLocalizedStringArray(profile.about, lang).map((paragraph, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 500,
                        width: '100%',
                        maxWidth: 'none',
                        mb: 1.6,
                        '&:last-of-type': { mb: 0 },
                        lineHeight: 1.72,
                        fontSize: { xs: '0.96rem', md: '1rem' },
                        textAlign: 'left',
                        hyphens: 'none',
                        wordBreak: 'normal',
                        overflowWrap: { xs: 'break-word', sm: 'normal' },
                      }}
                    >
                    {paragraph}
                  </Typography>
                ))}
              </Paper>
              </AnimatedBox>

              {/* Tech stack */}
              <AnimatedBox delay={0.3}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.25, sm: 2.75, md: 3 },
                  borderRadius: 'var(--card-radius)',
                  bgcolor: 'rgba(224,236,245,0.78)',
                  border: '1px solid rgba(11,92,171,0.16)',
                  boxShadow: '0 12px 34px rgba(15,37,55,0.055)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <CodeOutlinedIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'primary.main',
                      fontFamily: '"Fira Code", monospace',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {t('about.expertise')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.techStack.map((tech, i) => (
                    <Chip
                      key={tech.name}
                      label={tech.name}
                      sx={{
                        maxWidth: '100%',
                        bgcolor: alpha(badgeColors[i % badgeColors.length], 0.08),
                        border: `1px solid ${alpha(badgeColors[i % badgeColors.length], 0.18)}`,
                        color: alpha(badgeColors[i % badgeColors.length], 1),
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        height: 32,
                        px: 0.75,
                        borderRadius: '999px',
                        transition: 'all 0.2s ease',
                        '& .MuiChip-label': {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        },
                        '&:hover': {
                          bgcolor: alpha(badgeColors[i % badgeColors.length], 0.14),
                          borderColor: alpha(badgeColors[i % badgeColors.length], 0.3),
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 16px ${alpha(badgeColors[i % badgeColors.length], 0.1)}`,
                        },
                        cursor: 'default',
                      }}
                    />
                  ))}
                </Box>
              </Paper>
              </AnimatedBox>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
