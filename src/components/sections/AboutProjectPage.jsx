import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
  alpha,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import { useTranslation } from 'react-i18next';
import { profile } from '../../data/profile';
import { visualColors, visualGradients, visualShadows } from '../../theme/tokens';

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
const siteUrl = 'https://helsiomattia.github.io/crm-specialist/';

function getHomePath() {
  return `${BASE_PATH || ''}/${window.location.search}`;
}

const metrics = [
  { value: 'HM.crm', labelKey: 'aboutProject.metrics.react', icon: CodeRoundedIcon },
  { value: 'React + Vite', labelKey: 'aboutProject.metrics.vite', icon: RocketLaunchRoundedIcon },
  { valueKey: 'aboutProject.metrics.languagesValue', labelKey: 'aboutProject.metrics.languages', icon: LanguageRoundedIcon },
  { value: 'SPA + SEO', labelKey: 'aboutProject.metrics.spa', icon: RouteRoundedIcon },
];

const featureCards = [
  {
    titleKey: 'aboutProject.features.showcase.title',
    descriptionKey: 'aboutProject.features.showcase.description',
    icon: WebRoundedIcon,
    color: visualColors.salesforceCore,
  },
  {
    titleKey: 'aboutProject.features.content.title',
    descriptionKey: 'aboutProject.features.content.description',
    icon: DataObjectRoundedIcon,
    color: visualColors.successGreen,
  },
  {
    titleKey: 'aboutProject.features.responsive.title',
    descriptionKey: 'aboutProject.features.responsive.description',
    icon: DevicesRoundedIcon,
    color: visualColors.flowCyan,
  },
  {
    titleKey: 'aboutProject.features.deploy.title',
    descriptionKey: 'aboutProject.features.deploy.description',
    icon: StorageRoundedIcon,
    color: visualColors.signalAmber,
  },
];

const stack = ['React 18', 'Vite 5', 'Material UI 5', 'Emotion', 'i18next', 'GSAP', 'Design tokens', 'SVG flags', 'Open Graph', 'GitHub Pages'];

const commands = ['npm install', 'npm run dev', 'npm run build', 'npm run preview'];

function AmbientBackground() {
  return (
    <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.34,
          backgroundImage: [
            'linear-gradient(rgba(13,77,165,0.12) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(13,77,165,0.12) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: { xs: '30px 30px', md: '44px 44px' },
          maskImage: 'linear-gradient(180deg, black 0%, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 72%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 80, md: 120 },
          right: { xs: -190, md: -80 },
          width: { xs: 340, md: 560 },
          height: { xs: 340, md: 560 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,172,184,0.24) 0%, transparent 68%)',
          filter: 'blur(34px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 520, md: 420 },
          left: { xs: -220, md: -100 },
          width: { xs: 360, md: 520 },
          height: { xs: 360, md: 520 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,77,165,0.2) 0%, transparent 70%)',
          filter: 'blur(42px)',
        }}
      />
    </Box>
  );
}

function TerminalCard({ terminalTitle }) {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: 'hidden',
        borderRadius: { xs: '22px', md: '30px' },
        border: '1px solid rgba(13,77,165,0.18)',
        bgcolor: 'rgba(6,24,39,0.94)',
        color: '#EAF3F9',
        boxShadow: visualShadows.panel,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, p: 1.5, borderBottom: '1px solid rgba(234,243,249,0.12)' }}>
        {['#D94A5F', '#F2A60D', '#29A366'].map((color) => (
          <Box key={color} sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: color }} />
        ))}
        <TerminalRoundedIcon sx={{ ml: 0.8, fontSize: '1rem', color: visualColors.flowCyan }} />
        <Typography sx={{ ml: 0.8, fontFamily: '"Fira Code", monospace', fontSize: '0.72rem', color: 'rgba(234,243,249,0.72)', fontWeight: 800 }}>
          {terminalTitle}
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2.2, md: 3 } }}>
        <Typography sx={{ fontFamily: '"Fira Code", monospace', fontSize: { xs: '0.82rem', md: '0.9rem' }, lineHeight: 1.9 }}>
          <Box component="span" sx={{ color: visualColors.flowCyan }}>const</Box> project = {'{'}
          <br />
          &nbsp;&nbsp;owner: <Box component="span" sx={{ color: '#F2A60D' }}>'Helsio Mattia'</Box>,
          <br />
          &nbsp;&nbsp;identity: <Box component="span" sx={{ color: '#F2A60D' }}>'HM.crm control room'</Box>,
          <br />
          &nbsp;&nbsp;sections: <Box component="span" sx={{ color: '#29A366' }}>7</Box>,
          <br />
          &nbsp;&nbsp;layout: <Box component="span" sx={{ color: '#F2A60D' }}>'compact visual boards'</Box>,
          <br />
          &nbsp;&nbsp;languages: [<Box component="span" sx={{ color: '#F2A60D' }}>'pt'</Box>, <Box component="span" sx={{ color: '#F2A60D' }}>'en'</Box>, <Box component="span" sx={{ color: '#F2A60D' }}>'es'</Box>],
          <br />
          &nbsp;&nbsp;navigation: <Box component="span" sx={{ color: '#F2A60D' }}>'left rail + SVG flags'</Box>
          <br />
          &nbsp;&nbsp;deploy: <Box component="span" sx={{ color: '#F2A60D' }}>'GitHub Pages'</Box>
          <br />
          {'}'};
        </Typography>

        <Divider sx={{ my: 2.5, borderColor: 'rgba(234,243,249,0.14)' }} />

        <Box sx={{ display: 'grid', gap: 1 }}>
          {commands.map((command) => (
            <Typography key={command} sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.8rem', color: 'rgba(234,243,249,0.82)' }}>
              <Box component="span" sx={{ color: visualColors.flowCyan }}>$</Box> {command}
            </Typography>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

function InfoCard({ title, description, icon: Icon, color }) {
  return (
    <Card
      sx={{
        height: '100%',
        p: { xs: 2.2, md: 2.6 },
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'rgba(255,255,255,0.78)',
        border: `1px solid ${alpha(color, 0.2)}`,
        boxShadow: `0 18px 50px ${alpha(color, 0.08)}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(145deg, ${alpha(color, 0.13)} 0%, transparent 54%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ width: 46, height: 46, borderRadius: '14px', display: 'grid', placeItems: 'center', bgcolor: alpha(color, 0.11), color, mb: 2 }}>
          <Icon />
        </Box>
        <Typography variant="h5" sx={{ fontSize: '1.08rem', fontWeight: 850, mb: 1, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontWeight: 550, lineHeight: 1.7, fontSize: '0.92rem' }}>
          {description}
        </Typography>
      </Box>
    </Card>
  );
}

export default function AboutProjectPage() {
  const { t } = useTranslation();
  const sections = t('aboutProject.sections.items', { returnObjects: true });
  const dataFiles = t('aboutProject.dataLayer.files', { returnObjects: true });

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100dvh',
        pt: 'calc(var(--header-height) + 28px)',
        pb: { xs: 6, md: 9 },
        background: 'linear-gradient(180deg, var(--site-bg-start) 0%, var(--site-bg-mid) 48%, var(--site-bg-end) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AmbientBackground />

      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: { xs: 3, md: 5 } }}>
          <Button component="a" href={getHomePath()} startIcon={<ArrowBackRoundedIcon />} variant="outlined">
            {t('aboutProject.actions.backToPortfolio')}
          </Button>
          <Button component="a" href={profile.github} target="_blank" rel="noopener noreferrer" endIcon={<GitHubIcon />}>
            {t('aboutProject.actions.viewGithub')}
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.15fr) minmax(360px, 0.85fr)' },
            gap: { xs: 3, md: 5 },
            alignItems: 'center',
            mb: { xs: 5, md: 8 },
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip icon={<AutoAwesomeRoundedIcon />} label={t('aboutProject.hero.badge')} color="primary" />
              <Chip label="React + Vite" variant="outlined" color="primary" />
              <Chip label="GitHub Pages" variant="outlined" color="secondary" />
            </Box>

            <Typography
              variant="h1"
              sx={{
                maxWidth: 920,
                fontSize: { xs: '2.55rem', sm: '3.6rem', md: '5rem' },
                lineHeight: 0.98,
                mb: 2,
                letterSpacing: '-0.06em',
              }}
            >
              {t('aboutProject.hero.title')}
            </Typography>

            <Typography sx={{ maxWidth: 780, color: 'text.primary', fontSize: { xs: '1rem', md: '1.18rem' }, lineHeight: 1.75, fontWeight: 560, mb: 3 }}>
              {t('aboutProject.hero.description')}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
              <Button component="a" href={siteUrl} target="_blank" rel="noopener noreferrer" variant="contained" endIcon={<OpenInNewRoundedIcon />}>
                {t('aboutProject.actions.openPublishedSite')}
              </Button>
              <Button component="a" href={`${profile.github}/crm-specialist`} target="_blank" rel="noopener noreferrer" variant="outlined" endIcon={<GitHubIcon />}>
                {t('aboutProject.actions.repository')}
              </Button>
            </Box>
          </Box>

          <TerminalCard terminalTitle={t('aboutProject.terminalTitle')} />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: 'var(--card-gap)', mb: { xs: 5, md: 8 } }}>
          {metrics.map(({ value, valueKey, labelKey, icon: Icon }) => (
            <Paper
              key={value || valueKey}
              elevation={0}
              sx={{
                p: 2.4,
                borderRadius: '22px',
                bgcolor: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(13,77,165,0.13)',
                boxShadow: '0 16px 42px rgba(15,37,55,0.07)',
              }}
            >
              <Icon sx={{ color: 'primary.main', mb: 1.4 }} />
              <Typography variant="h4" sx={{ fontSize: '1.35rem', fontWeight: 900, mb: 0.5 }}>
                {valueKey ? t(valueKey) : value}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.86rem', fontWeight: 650, lineHeight: 1.5 }}>
                {t(labelKey)}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box sx={{ mb: { xs: 5, md: 8 } }}>
          <Typography variant="overline" sx={{ color: 'primary.main' }}>
            {t('aboutProject.features.overline')}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, maxWidth: 760, mb: 3 }}>
            {t('aboutProject.features.title')}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' }, gap: 'var(--card-gap)' }}>
            {featureCards.map((card) => (
              <InfoCard
                key={card.titleKey}
                title={t(card.titleKey)}
                description={t(card.descriptionKey)}
                icon={card.icon}
                color={card.color}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '0.9fr 1.1fr' }, gap: { xs: 3, md: 4 }, mb: { xs: 5, md: 8 }, alignItems: 'stretch' }}>
          <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '28px', bgcolor: 'rgba(255,255,255,0.78)', border: '1px solid rgba(13,77,165,0.14)' }}>
            <Typography variant="overline" sx={{ color: 'primary.main' }}>
              {t('aboutProject.sections.overline')}
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.35rem' }, mb: 1 }}>
              {t('aboutProject.sections.title')}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontWeight: 560, lineHeight: 1.7, mb: 2.5 }}>
              {t('aboutProject.sections.description')}
            </Typography>

            <Box sx={{ display: 'grid', gap: 1.1 }}>
              {sections.map(({ title, description }, index) => (
                <Box key={title} sx={{ display: 'grid', gridTemplateColumns: '42px 1fr', gap: 1.4, alignItems: 'start' }}>
                  <Box sx={{ width: 34, height: 34, borderRadius: '11px', display: 'grid', placeItems: 'center', bgcolor: alpha(visualColors.salesforceCore, 0.09), color: 'primary.main', fontFamily: '"Fira Code", monospace', fontWeight: 900, fontSize: '0.72rem' }}>
                    {String(index + 1).padStart(2, '0')}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 850, color: 'text.primary' }}>{title}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem', lineHeight: 1.55 }}>{description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '28px', bgcolor: 'rgba(6,24,39,0.95)', color: '#EAF3F9', border: '1px solid rgba(234,243,249,0.1)', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(30,172,184,0.22), transparent 38%)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="overline" sx={{ color: visualColors.flowCyan }}>
                {t('aboutProject.dataLayer.overline')}
              </Typography>
              <Typography variant="h3" sx={{ color: '#fff', fontSize: { xs: '1.75rem', md: '2.35rem' }, mb: 1 }}>
                {t('aboutProject.dataLayer.title')}
              </Typography>
              <Typography sx={{ color: 'rgba(234,243,249,0.72)', fontWeight: 560, lineHeight: 1.7, mb: 3 }}>
                {t('aboutProject.dataLayer.description')}
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.2 }}>
                {dataFiles.map(({ file, path, description }) => (
                  <Box key={path || file} sx={{ p: 1.6, borderRadius: '16px', bgcolor: 'rgba(234,243,249,0.06)', border: '1px solid rgba(234,243,249,0.1)' }}>
                    <Typography sx={{ fontFamily: '"Fira Code", monospace', color: visualColors.flowCyan, fontWeight: 850, fontSize: '0.82rem', mb: 0.8 }}>
                      {path || `src/data/${file}`}
                    </Typography>
                    <Typography sx={{ color: 'rgba(234,243,249,0.74)', lineHeight: 1.55, fontSize: '0.84rem', fontWeight: 540 }}>
                      {description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.05fr 0.95fr' }, gap: { xs: 3, md: 4 }, mb: { xs: 5, md: 8 } }}>
          <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '28px', bgcolor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(13,77,165,0.14)' }}>
            <Typography variant="overline" sx={{ color: 'primary.main' }}>
              {t('aboutProject.stack.overline')}
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.35rem' }, mb: 2 }}>
              {t('aboutProject.stack.title')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {stack.map((item) => (
                <Chip key={item} label={item} color={item.includes('GitHub') ? 'secondary' : 'primary'} variant={item.includes('React') || item.includes('Vite') ? 'filled' : 'outlined'} />
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, fontWeight: 560 }}>
              {t('aboutProject.stack.description')}
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '28px', bgcolor: 'rgba(255,255,255,0.8)', border: `1px solid ${alpha(visualColors.signalAmber, 0.18)}`, boxShadow: `0 18px 48px ${alpha(visualColors.signalAmber, 0.08)}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: '14px', display: 'grid', placeItems: 'center', bgcolor: alpha(visualColors.signalAmber, 0.12), color: visualColors.signalAmber }}>
                <VerifiedRoundedIcon />
              </Box>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.55rem', md: '2rem' } }}>
                {t('aboutProject.deploy.title')}
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, fontWeight: 560, mb: 2.4 }}>
              {t('aboutProject.deploy.description')}
            </Typography>
            <Box sx={{ p: 1.8, borderRadius: '16px', bgcolor: alpha(visualColors.signalAmber, 0.08), border: `1px solid ${alpha(visualColors.signalAmber, 0.18)}` }}>
              <Typography sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 850, color: visualColors.signalAmber, mb: 0.6 }}>
                vite.config.js
              </Typography>
              <Typography sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.84rem', color: 'text.primary' }}>
                base: '/crm-specialist/'
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: { xs: '26px', md: '36px' },
            background: visualGradients.crmFlowCurrent,
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', right: -80, top: -110, width: 280, height: 280, borderRadius: '50%', border: '42px solid rgba(255,255,255,0.08)' }} />
          <Box sx={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 3, alignItems: 'center' }}>
            <Box>
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.78)' }}>
                {t('aboutProject.summary.overline')}
              </Typography>
              <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: '2rem', md: '3.05rem' }, mb: 1 }}>
                {t('aboutProject.summary.title')}
              </Typography>
              <Typography sx={{ maxWidth: 760, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, fontWeight: 560 }}>
                {t('aboutProject.summary.description')}
              </Typography>
            </Box>
            <Button component="a" href={getHomePath()} variant="contained" color="secondary" startIcon={<ArrowBackRoundedIcon />} sx={{ bgcolor: '#fff', color: visualColors.salesforceCore, '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' } }}>
              {t('aboutProject.actions.backToSite')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
