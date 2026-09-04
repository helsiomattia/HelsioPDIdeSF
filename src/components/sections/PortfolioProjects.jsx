import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  alpha,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { useTranslation } from 'react-i18next';
import AnimatedBox from '../ui/AnimatedBox';
import SectionTitle from '../ui/SectionTitle';
import { portfolioProjects } from '../../data/portfolioProjects';
import { getLocalizedString } from '../../utils/i18nHelper';

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function getProjectPath(projectId) {
  return `${BASE_PATH || ''}/projects/${projectId}`;
}

function openInternalProject(event, projectId) {
  event.preventDefault();
  window.history.pushState(null, '', getProjectPath(projectId));
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function PortfolioAmbient() {
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
      {['left', 'right'].map((side) => (
        <Box
          key={side}
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: '12%',
            bottom: '10%',
            left: side === 'left' ? { md: '-220px', lg: '-160px', xl: '-70px' } : 'auto',
            right: side === 'right' ? { md: '-220px', lg: '-160px', xl: '-70px' } : 'auto',
            width: { md: 320, lg: 380 },
            opacity: { md: 0.32, xl: 0.42 },
            backgroundImage: [
              'linear-gradient(rgba(11,92,171,0.12) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(11,92,171,0.12) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '42px 42px',
            maskImage: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, black 0%, black 54%, transparent 100%)`,
            WebkitMaskImage: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, black 0%, black 54%, transparent 100%)`,
            animation: 'projectsBlueprintShift 24s ease-in-out infinite',
          }}
        />
      ))}

      <Box
        component="svg"
        viewBox="0 0 760 360"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: { md: '-190px', lg: '-130px', xl: '-42px' },
          top: '52%',
          width: { md: 420, lg: 500 },
          transform: 'translateY(-50%)',
          opacity: { md: 0.28, xl: 0.38 },
          '& rect, & path, & line': {
            fill: 'none',
            stroke: 'rgba(13,77,165,0.24)',
            strokeWidth: 1.4,
          },
          '& .blueprint-accent': {
            stroke: 'rgba(21,157,179,0.34)',
            strokeDasharray: '8 8',
          },
        }}
      >
        <rect x="38" y="48" width="220" height="132" rx="18" />
        <rect x="302" y="76" width="172" height="214" rx="18" />
        <rect x="516" y="44" width="196" height="142" rx="18" />
        <path className="blueprint-accent" d="M258 114 H302 M474 168 H516 M148 180 C206 260 292 230 344 290" />
        <line x1="70" y1="86" x2="226" y2="86" />
        <line x1="70" y1="116" x2="194" y2="116" />
        <line x1="336" y1="124" x2="442" y2="124" />
        <line x1="336" y1="154" x2="418" y2="154" />
        <line x1="552" y1="86" x2="676" y2="86" />
        <line x1="552" y1="116" x2="648" y2="116" />
      </Box>
    </Box>
  );
}

export default function PortfolioProjects() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';

  return (
    <Box
      id="projects"
      data-section="projects"
      component="section"
      sx={{
        minHeight: { md: 'calc(100dvh - var(--header-height))' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 'var(--section-block-padding)' },
        background: 'linear-gradient(180deg, var(--site-bg-start) 0%, var(--site-bg-mid) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PortfolioAmbient />

      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline={t('portfolioProjects.overline')}
          title={t('portfolioProjects.title')}
          subtitle={t('portfolioProjects.subtitle')}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' },
            gap: 'var(--card-gap)',
            alignItems: 'stretch',
          }}
        >
          {portfolioProjects.map((project, index) => {
            const isExternal = project.kind === 'external';
            const href = isExternal ? project.externalUrl : getProjectPath(project.id);

            return (
              <AnimatedBox key={project.id} delay={index * 0.06} style={{ height: '100%' }}>
                <Card
                  sx={{
                    height: '100%',
                    minHeight: { xs: 270, md: 310 },
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    bgcolor: 'rgba(255,255,255,0.86)',
                    border: `1px solid ${alpha(project.accent, isExternal ? 0.34 : 0.2)}`,
                    boxShadow: isExternal
                      ? `0 16px 42px ${alpha(project.accent, 0.13)}`
                      : '0 12px 34px rgba(15,37,55,0.06)',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(145deg, ${alpha(project.accent, 0.14)} 0%, transparent 44%)`,
                      opacity: isExternal ? 1 : 0.72,
                      pointerEvents: 'none',
                    },
                    '&:hover': {
                      borderColor: alpha(project.accent, 0.45),
                      boxShadow: `0 18px 44px ${alpha(project.accent, 0.14)}`,
                    },
                  }}
                >
                  <Box sx={{ height: 8, background: project.gradient }} />

                  <CardContent sx={{ p: { xs: 2.15, md: 2.25 }, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.6 }}>
                      <Chip
                        label={getLocalizedString(project.status, lang)}
                        size="small"
                        sx={{
                          bgcolor: alpha(project.accent, 0.1),
                          color: project.accent,
                          border: `1px solid ${alpha(project.accent, 0.24)}`,
                          fontSize: '0.62rem',
                          fontWeight: 850,
                        }}
                      />
                      {isExternal ? (
                        <OpenInNewRoundedIcon sx={{ color: project.accent, fontSize: '1.05rem' }} />
                      ) : (
                        <ArrowForwardRoundedIcon sx={{ color: project.accent, fontSize: '1.05rem' }} />
                      )}
                    </Box>

                    <Typography variant="h5" sx={{ fontSize: { xs: '1.18rem', md: '1.15rem' }, fontWeight: 850, lineHeight: 1.2, mb: 1.05, color: 'text.primary' }}>
                      {getLocalizedString(project.title, lang)}
                    </Typography>

                    <Typography sx={{ color: 'text.primary', fontSize: '0.86rem', lineHeight: 1.58, fontWeight: 500, mb: 1.5, flex: 1 }}>
                      {getLocalizedString(project.description, lang)}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.55, mb: 2 }}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: alpha(project.accent, 0.07),
                            border: `1px solid ${alpha(project.accent, 0.16)}`,
                            color: 'text.primary',
                            fontSize: '0.6rem',
                            fontWeight: 750,
                          }}
                        />
                      ))}
                    </Box>

                    <Button
                      component="a"
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      onClick={isExternal ? undefined : (event) => openInternalProject(event, project.id)}
                      endIcon={isExternal ? <OpenInNewRoundedIcon /> : <ArrowForwardRoundedIcon />}
                      variant={isExternal ? 'contained' : 'outlined'}
                      color="primary"
                      sx={{
                        width: '100%',
                        justifyContent: 'center',
                        borderColor: alpha(project.accent, 0.44),
                        color: isExternal ? undefined : project.accent,
                        background: isExternal ? project.gradient : undefined,
                        '&:hover': {
                          borderColor: project.accent,
                          bgcolor: isExternal ? undefined : alpha(project.accent, 0.08),
                        },
                      }}
                    >
                      {getLocalizedString(project.action, lang)}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedBox>
            );
          })}
        </Box>

        <AnimatedBox delay={0.4}>
          <Box
            sx={{
              maxWidth: 720,
              mx: 'auto',
              textAlign: 'center',
              mt: { xs: 2.5, md: 3 },
              color: 'text.secondary',
              fontSize: { xs: '0.86rem', md: '0.92rem' },
              fontWeight: 600,
            }}
          >
            {t('portfolioProjects.body')}
          </Box>
        </AnimatedBox>
      </Container>
    </Box>
  );
}
