import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Typography,
  alpha,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { useTranslation } from 'react-i18next';
import { getLocalizedString } from '../../utils/i18nHelper';
import { getPortfolioProjectById } from '../../data/portfolioProjects';

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function getHomeProjectsPath() {
  return `${BASE_PATH || ''}/projects${window.location.search}`;
}

export default function ProjectDetailPage({ projectId }) {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const project = getPortfolioProjectById(projectId);

  if (!project) {
    return (
      <Box component="main" sx={{ minHeight: '100dvh', pt: 'calc(var(--header-height) + 48px)', pb: 8 }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', bgcolor: 'rgba(224,236,245,0.9)' }}>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 850 }}>
              Projeto não encontrado
            </Typography>
            <Typography sx={{ mb: 3, color: 'text.secondary' }}>
              Verifique o endereço ou volte para a seção de projetos.
            </Typography>
            <Button component="a" href={getHomeProjectsPath()} startIcon={<ArrowBackRoundedIcon />}>
              Voltar para projetos
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100dvh',
        pt: 'calc(var(--header-height) + 34px)',
        pb: { xs: 5, md: 7 },
        background: 'linear-gradient(180deg, var(--site-bg-start) 0%, var(--site-bg-mid) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          right: { xs: '-160px', md: '-80px' },
          top: { xs: 80, md: 120 },
          width: { xs: 280, md: 460 },
          height: { xs: 280, md: 460 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(project.accent, 0.2)} 0%, transparent 70%)`,
          filter: 'blur(36px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth={false} sx={{ maxWidth: 1220, px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <Button component="a" href={getHomeProjectsPath()} startIcon={<ArrowBackRoundedIcon />} variant="outlined" color="primary">
            Voltar para projetos
          </Button>

          {project.externalUrl && (
            <Button component="a" href={project.externalUrl} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNewRoundedIcon />}>
              {getLocalizedString(project.action, lang)}
            </Button>
          )}
        </Box>

        <Box sx={{ mb: { xs: 2.5, md: 3.5 } }}>
          <Chip
            label={getLocalizedString(project.status, lang)}
            sx={{
              mb: 1.4,
              bgcolor: alpha(project.accent, 0.1),
              color: project.accent,
              border: `1px solid ${alpha(project.accent, 0.22)}`,
              fontWeight: 850,
            }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '4.3rem' }, mb: 1, maxWidth: 900 }}>
            {getLocalizedString(project.title, lang)}
          </Typography>
          <Typography sx={{ color: 'text.primary', maxWidth: 760, fontWeight: 500, lineHeight: 1.7 }}>
            {getLocalizedString(project.description, lang)}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: '20px', md: '28px' },
            border: `1px solid ${alpha(project.accent, 0.24)}`,
            bgcolor: 'rgba(255,255,255,0.78)',
            boxShadow: `0 24px 80px ${alpha('#061827', 0.12)}`,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.9,
              px: { xs: 1.5, md: 2 },
              py: 1.2,
              borderBottom: '1px solid rgba(15,37,55,0.12)',
              background: 'rgba(224,236,245,0.68)',
            }}
          >
            {['#D94A5F', '#B7791F', '#0B8F61'].map((color) => (
              <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
            ))}
            <Typography sx={{ ml: 0.6, fontFamily: '"Fira Code", monospace', fontSize: '0.72rem', fontWeight: 850, color: 'text.secondary' }}>
              embedded-html-view
            </Typography>
          </Box>

          <Box
            component="iframe"
            title={`${getLocalizedString(project.title, lang)} preview`}
            srcDoc={project.embedHtml}
            sandbox="allow-scripts allow-same-origin"
            sx={{
              display: 'block',
              width: '100%',
              height: { xs: 520, md: 640 },
              border: 0,
              bgcolor: '#fff',
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}
