import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  IconButton,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import AnimatedBox from '../ui/AnimatedBox';
import SectionTitle from '../ui/SectionTitle';
import { projects } from '../../data/projects';
import { visualColors } from '../../theme/tokens';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';

function CredentialsAmbient() {
  const certificates = [
    { label: 'MBA', right: { md: '-88px', lg: '-48px', xl: '2%' }, top: '13%', rotate: '7deg', delay: '0s' },
    { label: 'BI', left: { md: '-96px', lg: '-54px', xl: '2%' }, bottom: '12%', rotate: '-9deg', delay: '-5s' },
    { label: 'QA', right: { md: '-118px', lg: '-82px', xl: '-12px' }, bottom: '8%', rotate: '-4deg', delay: '-9s' },
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
      {certificates.map((certificate) => (
        <Box
          key={certificate.label}
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: certificate.top,
            right: certificate.right,
            bottom: certificate.bottom,
            left: certificate.left,
            width: { md: 154, lg: 190 },
            height: { md: 104, lg: 124 },
            p: 1.4,
            borderRadius: '18px',
            border: '1px solid rgba(11,92,171,0.14)',
            bgcolor: 'rgba(255,255,255,0.22)',
            boxShadow: '0 22px 70px rgba(15,37,55,0.055)',
            opacity: { md: 0.44, xl: 0.6 },
            '--credential-rotate': certificate.rotate,
            animation: `credentialStampFloat 20s ease-in-out ${certificate.delay} infinite`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 10,
              borderRadius: '12px',
              border: '1px dashed rgba(21,157,179,0.18)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 18,
              bottom: 14,
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '2px solid rgba(183,121,31,0.2)',
              boxShadow: 'inset 0 0 0 6px rgba(183,121,31,0.055)',
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              fontFamily: '"Fira Code", monospace',
              fontSize: { md: '0.76rem', lg: '0.84rem' },
              fontWeight: 900,
              color: 'rgba(11,92,171,0.34)',
              letterSpacing: '0.16em',
            }}
          >
            CERT.{certificate.label}
          </Box>
          <Box sx={{ position: 'absolute', left: 24, right: 74, top: 58, height: 1, bgcolor: 'rgba(11,92,171,0.13)' }} />
          <Box sx={{ position: 'absolute', left: 24, right: 96, top: 78, height: 1, bgcolor: 'rgba(21,157,179,0.15)' }} />
        </Box>
      ))}
    </Box>
  );
}

function ProjectCard({ project, index, lang, t }) {
  const status = getLocalizedString(project.status, lang);
  const technologies = getLocalizedStringArray(project.technologies, lang);

  return (
    <AnimatedBox
      delay={index * 0.06}
      style={{ height: '100%', width: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          minHeight: { xs: 218, lg: 224 },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          bgcolor: 'rgba(255,255,255,0.84)',
          borderColor: project.featured ? alpha(visualColors.salesforceLegacy, 0.22) : 'rgba(15,37,55,0.11)',
          boxShadow: '0 10px 24px rgba(15,37,55,0.055)',
          '&:hover .project-gradient': { opacity: 0.9 },
          '&:hover': {
            borderColor: alpha(visualColors.salesforceLegacy, 0.3),
            boxShadow: '0 12px 28px rgba(11,92,171,0.08)',
          },
        }}
      >
        <Box
          className="project-gradient"
          sx={{
            height: 6,
            background: project.gradient,
            transition: 'opacity 0.3s ease',
          }}
        />

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 1.65, md: 1.75 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 1 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                fontSize: '0.58rem',
                height: 21,
                bgcolor: alpha(
                  status === 'In production'
                    ? visualColors.successGreen
                    : status === 'Active'
                    ? visualColors.serviceBlue
                    : '#6B8194',
                  0.15,
                ),
                color:
                  status === 'In production'
                    ? visualColors.successGreen
                    : status === 'Active'
                    ? visualColors.serviceBlue
                    : '#5C7183',
                border: `1px solid ${alpha(
                  status === 'In production'
                    ? visualColors.successGreen
                    : status === 'Active'
                    ? visualColors.serviceBlue
                    : '#6B8194',
                  0.3,
                )}`,
                fontWeight: 750,
              }}
            />

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {project.github && (
                <Tooltip title={t('projects.repository')} arrow>
                  <IconButton
                    component="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    aria-label={t('projects.repository')}
                    sx={{
                      width: 28,
                      height: 28,
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', bgcolor: alpha(visualColors.salesforceLegacy, 0.1) },
                    }}
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {project.demo && (
                <Tooltip title={t('projects.viewDemo')} arrow>
                  <IconButton
                    component="a"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    aria-label={t('projects.viewDemo')}
                    sx={{
                      width: 28,
                      height: 28,
                      color: 'text.secondary',
                      '&:hover': { color: 'secondary.main', bgcolor: alpha(visualColors.flowCyanLegacy, 0.1) },
                    }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 790, mb: 0.6, fontSize: { xs: '0.98rem', md: '0.94rem' }, lineHeight: 1.18, color: 'text.primary' }}>
            {getLocalizedString(project.title, lang)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              mb: 1,
              lineHeight: 1.42,
              fontSize: '0.74rem',
              fontWeight: 500,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
            }}
          >
            {getLocalizedString(project.description, lang)}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.42, mt: 'auto' }}>
            {technologies.slice(0, 4).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: alpha(visualColors.salesforceLegacy, 0.08),
                  border: `1px solid ${alpha(visualColors.salesforceLegacy, 0.18)}`,
                  color: 'text.primary',
                  fontSize: '0.56rem',
                  fontWeight: 650,
                  height: 20,
                  maxWidth: '100%',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </AnimatedBox>
  );
}

function CredentialsBoard({ credentials, lang, t }) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', lg: 500 },
        borderRadius: '30px',
        border: `1px solid ${alpha(visualColors.salesforceLegacy, 0.18)}`,
        bgcolor: 'rgba(224,236,245,0.6)',
        overflow: 'hidden',
        p: { xs: 1.1, sm: 1.35, lg: 2.4 },
        boxShadow: `inset 0 0 0 1px ${alpha(visualColors.surfaceWhite, 0.5)}`,
        '&::before': {
          content: '""',
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          inset: '12% 8% 14%',
          borderRadius: '34px',
          border: `1px dashed ${alpha(visualColors.salesforceLegacy, 0.2)}`,
        },
        '&::after': {
          content: '""',
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '51%',
          height: 2,
          bgcolor: alpha(visualColors.signalAmber, 0.15),
          transform: 'rotate(7deg)',
        },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 90,
          height: 90,
          borderRadius: '22px',
          transform: 'translate(-50%, -50%) rotate(-8deg)',
          border: `1px solid ${alpha(visualColors.flowCyan, 0.22)}`,
          boxShadow: `0 0 0 28px ${alpha(visualColors.flowCyan, 0.04)}`,
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
          gridTemplateRows: { lg: 'repeat(2, minmax(224px, 1fr))' },
          gap: { xs: 1, sm: 1.15, lg: 1.45 },
          position: 'relative',
          zIndex: 1,
          height: '100%',
          minHeight: { lg: 452 },
        }}
      >
        {credentials.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            lang={lang}
            t={t}
          />
        ))}
      </Box>
    </Box>
  );
}

/* ── Projects section ──────────────────────────────────── */
export default function Projects() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';

  return (
    <Box
      id="credentials"
      data-section="credentials"
      component="section"
      sx={{
        minHeight: { md: 'calc(100dvh - var(--header-height))' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 5, md: 'clamp(28px, 4vh, 52px)' },
        background: 'linear-gradient(180deg, var(--site-bg-mid) 0%, var(--site-bg-start) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CredentialsAmbient />

      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline={t('projects.overline')}
          subtitle={t('projects.subtitle')}
        />

        <CredentialsBoard credentials={projects} lang={lang} t={t} />
      </Container>
    </Box>
  );
}
