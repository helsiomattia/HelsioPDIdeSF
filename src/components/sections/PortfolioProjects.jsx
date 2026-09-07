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
import { visualColors } from '../../theme/tokens';

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

function PortfolioProjectCard({ project, index, lang }) {
  const isExternal = project.kind === 'external';
  const href = isExternal ? project.externalUrl : getProjectPath(project.id);

  return (
    <AnimatedBox delay={index * 0.06} style={{ height: '100%', width: '100%' }}>
      <Card
        sx={{
          height: '100%',
          minHeight: { xs: 224, lg: 238 },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: 'rgba(255,255,255,0.86)',
          border: `1px solid ${alpha(project.accent, isExternal ? 0.34 : 0.22)}`,
          boxShadow: '0 12px 30px rgba(15,37,55,0.06)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(145deg, ${alpha(project.accent, 0.11)} 0%, transparent 42%)`,
            opacity: isExternal ? 0.92 : 0.68,
            pointerEvents: 'none',
          },
          '&:hover': {
            borderColor: alpha(project.accent, 0.45),
            boxShadow: `0 18px 44px ${alpha(project.accent, 0.14)}`,
          },
        }}
      >
        <Box sx={{ height: 7, background: project.gradient }} />

        <CardContent
          sx={{
            p: { xs: 1.75, md: 1.85 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.25 }}>
            <Chip
              label={getLocalizedString(project.status, lang)}
              size="small"
              sx={{
                bgcolor: alpha(project.accent, 0.1),
                color: project.accent,
                border: `1px solid ${alpha(project.accent, 0.24)}`,
                fontSize: '0.58rem',
                fontWeight: 850,
                height: 22,
              }}
            />
            {isExternal ? (
              <OpenInNewRoundedIcon sx={{ color: project.accent, fontSize: '1rem' }} />
            ) : (
              <ArrowForwardRoundedIcon sx={{ color: project.accent, fontSize: '1rem' }} />
            )}
          </Box>

          <Typography variant="h5" sx={{ fontSize: { xs: '1.03rem', md: '0.98rem' }, fontWeight: 850, lineHeight: 1.16, mb: 0.85, color: 'text.primary' }}>
            {getLocalizedString(project.title, lang)}
          </Typography>

          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '0.76rem',
              lineHeight: 1.45,
              fontWeight: 500,
              mb: 1.15,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
            }}
          >
            {getLocalizedString(project.description, lang)}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.45, mt: 'auto', mb: 1.35 }}>
            {project.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: alpha(project.accent, 0.07),
                  border: `1px solid ${alpha(project.accent, 0.16)}`,
                  color: 'text.primary',
                  fontSize: '0.56rem',
                  fontWeight: 750,
                  height: 21,
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
            variant="outlined"
            color="primary"
            size="small"
            sx={{
              width: '100%',
              minHeight: 34,
              justifyContent: 'center',
              borderColor: alpha(project.accent, 0.34),
              color: project.accent,
              fontSize: '0.72rem',
              '&:hover': {
                borderColor: project.accent,
                bgcolor: alpha(project.accent, 0.08),
              },
            }}
          >
            {getLocalizedString(project.action, lang)}
          </Button>
        </CardContent>
      </Card>
    </AnimatedBox>
  );
}

function PortfolioProjectsBoard({ projects, lang }) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', lg: 560 },
        borderRadius: '30px',
        border: `1px solid ${alpha(visualColors.salesforceLegacy, 0.18)}`,
        bgcolor: 'rgba(224,236,245,0.62)',
        overflow: 'hidden',
        p: { xs: 1.2, sm: 1.5, lg: 3.2 },
        boxShadow: `inset 0 0 0 1px ${alpha(visualColors.surfaceWhite, 0.48)}`,
        '&::before': {
          content: '""',
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          inset: '13% 8% 14%',
          borderRadius: '34px',
          border: `1px dashed ${alpha(visualColors.salesforceLegacy, 0.2)}`,
        },
        '&::after': {
          content: '""',
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          left: '8%',
          right: '8%',
          top: '51%',
          height: 2,
          bgcolor: alpha(visualColors.flowCyan, 0.16),
          transform: 'rotate(-7deg)',
        },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          right: '8%',
          top: '12%',
          width: 96,
          height: 96,
          borderRadius: '24px',
          border: `1px solid ${alpha(visualColors.signalAmber, 0.24)}`,
          boxShadow: `0 0 0 30px ${alpha(visualColors.signalAmber, 0.04)}`,
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
          gap: { xs: 1.1, sm: 1.3, lg: 1.8 },
          position: 'relative',
          zIndex: 1,
          height: '100%',
          alignItems: 'stretch',
        }}
      >
        {projects.map((project, index) => (
          <PortfolioProjectCard key={project.id} project={project} index={index} lang={lang} />
        ))}
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
          subtitle={t('portfolioProjects.subtitle')}
        />

        <PortfolioProjectsBoard projects={portfolioProjects} lang={lang} />

      </Container>
    </Box>
  );
}
