import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ForkRightOutlinedIcon from '@mui/icons-material/ForkRightOutlined';
import { useTranslation } from 'react-i18next';
import AnimatedBox from '../ui/AnimatedBox';
import SectionTitle from '../ui/SectionTitle';
import { projects } from '../../data/projects';
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

/* ── Project card ──────────────────────────────────────── */
function ProjectCard({ project, index, lang, t }) {
  const status = getLocalizedString(project.status, lang);
  const technologies = getLocalizedStringArray(project.technologies, lang);

  return (
    <AnimatedBox
      delay={index * 0.06}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          bgcolor: 'rgba(224,236,245,0.94)',
          borderColor: project.featured ? alpha('#0B5CAB', 0.26) : 'rgba(15,37,55,0.12)',
          boxShadow: project.featured ? '0 10px 26px rgba(11,92,171,0.09)' : undefined,
          '&:hover .project-overlay': { opacity: 1 },
          '&:hover .project-gradient': { opacity: 0.9 },
          '&:hover': {
            borderColor: alpha('#0B5CAB', 0.36),
            boxShadow: '0 12px 30px rgba(11,92,171,0.11)',
          },
        }}
      >
        {/* Gradient header */}
        <Box
          className="project-gradient"
          sx={{
            height: 8,
            background: project.gradient,
            transition: 'opacity 0.3s ease',
          }}
        />

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 2.05, md: 2 } }}>
          {/* Top row: status + links */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.35 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: 22,
                bgcolor: alpha(
                  status === 'In production'
                    ? '#0B8F61'
                    : status === 'Active'
                    ? '#0B78B6'
                    : '#6B8194',
                  0.15,
                ),
                color:
                  status === 'In production'
                    ? '#0B8F61'
                    : status === 'Active'
                    ? '#0B78B6'
                    : '#5C7183',
                border: `1px solid ${alpha(
                  status === 'In production'
                    ? '#0B8F61'
                    : status === 'Active'
                    ? '#0B78B6'
                    : '#6B8194',
                  0.3,
                )}`,
                fontFamily: '"Fira Code", monospace',
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
                    aria-label="GitHub"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', bgcolor: alpha('#0B5CAB', 0.1) },
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
                    aria-label="Demo"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'secondary.main', bgcolor: alpha('#159DB3', 0.1) },
                    }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          {/* Title */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.65, fontSize: '0.95rem', lineHeight: 1.3, color: 'text.primary' }}>
            {getLocalizedString(project.title, lang)}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{ color: 'text.primary', mb: 1.25, flex: 1, lineHeight: 1.48, fontSize: '0.81rem', fontWeight: 500 }}
          >
            {getLocalizedString(project.description, lang)}
          </Typography>

          {/* Tech chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.3 }}>
            {technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: 'rgba(11,92,171,0.08)',
                  border: '1px solid rgba(11,92,171,0.2)',
                  color: 'primary.dark',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  height: 22,
                  maxWidth: '100%',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            ))}
          </Box>

          {(project.stars !== null || project.forks !== null) && (
            <Stack direction="row" spacing={1.5} sx={{ pt: 1.1, borderTop: '1px solid rgba(15,37,55,0.12)' }}>
              {project.stars !== null && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarOutlineIcon sx={{ fontSize: '0.9rem', color: '#B7791F' }} />
                  <Typography variant="caption" sx={{ color: 'text.primary', fontFamily: '"Fira Code", monospace', fontWeight: 700 }}>
                    {project.stars}
                  </Typography>
                </Box>
              )}
              {project.forks !== null && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ForkRightOutlinedIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.primary', fontFamily: '"Fira Code", monospace', fontWeight: 700 }}>
                    {project.forks}
                  </Typography>
                </Box>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>
    </AnimatedBox>
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
        py: { xs: 6, md: 'var(--section-block-padding)' },
        background: 'linear-gradient(180deg, var(--site-bg-mid) 0%, var(--site-bg-start) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CredentialsAmbient />

      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline={t('projects.overline')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: 'var(--card-gap)',
            alignItems: 'stretch',
          }}
        >
          {projects.map((project, index) => (
            <Box key={project.id}>
              <ProjectCard project={project} index={index} lang={lang} t={t} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
