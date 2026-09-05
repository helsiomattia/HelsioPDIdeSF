import { useEffect, useRef, useState } from 'react';
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
const DEFAULT_IFRAME_HEIGHT = 640;
const PROJECT_EMBED_LOADERS = {
  'crm-customer-360': () => import('../../../projects/customer360_generico_interativo_v4.html?raw'),
  'service-cloud-console': () => import('../../../projects/Service360_Generic_Embed_V2.html?raw'),
  'customer-journey-360': () => import('../../../projects/Customer_Journey_360_Generic.html?raw'),
  'intelligence-360': () => import('../../../projects/Intelligence360_Generic.html?raw'),
  'revenue-churn-intelligence': () => import('../../../projects/Revenue_Churn_Intelligence_Generic.html?raw'),
  'salesforce-architecture-control-center': () => import('../../../projects/Salesforce_Architecture_Control_Center_Generic.html?raw'),
};

function getHomeProjectsPath() {
  return `${BASE_PATH || ''}/projects${window.location.search}`;
}

export default function ProjectDetailPage({ projectId }) {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const project = getPortfolioProjectById(projectId);
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(DEFAULT_IFRAME_HEIGHT);
  const [embedHtml, setEmbedHtml] = useState('');
  const [isLoadingEmbed, setIsLoadingEmbed] = useState(false);

  useEffect(() => {
    if (!project || project.kind !== 'embed') {
      setEmbedHtml('');
      return undefined;
    }

    const loadEmbed = PROJECT_EMBED_LOADERS[project.id];
    if (!loadEmbed) {
      setEmbedHtml('');
      return undefined;
    }

    let cancelled = false;
    setIsLoadingEmbed(true);
    setEmbedHtml('');

    loadEmbed()
      .then((module) => {
        if (!cancelled) setEmbedHtml(module.default || '');
      })
      .catch(() => {
        if (!cancelled) setEmbedHtml('');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingEmbed(false);
      });

    return () => {
      cancelled = true;
    };
  }, [project]);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe || !embedHtml) return undefined;

    let animationFrameId = 0;
    let resizeObserver;
    let observedFrameWindow;
    let observedFrameDocument;

    const getFrameDocument = () => {
      try {
        return iframe.contentDocument || iframe.contentWindow?.document || null;
      } catch {
        return null;
      }
    };

    const syncIframeHeight = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(() => {
        const frameDocument = getFrameDocument();
        const { body, documentElement } = frameDocument || {};

        if (!body || !documentElement) return;

        const nextHeight = Math.ceil(
          Math.max(
            body.scrollHeight,
            body.offsetHeight,
            body.getBoundingClientRect().height,
            documentElement.offsetHeight,
          ),
        );
        const safeHeight = Math.max(nextHeight, 1);

        setIframeHeight((currentHeight) => (
          Math.abs(currentHeight - safeHeight) > 1 ? safeHeight : currentHeight
        ));
      });
    };

    const handleFrameWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      window.scrollBy({ top: event.deltaY, behavior: 'auto' });
    };

    const setupHeightObserver = () => {
      const frameDocument = getFrameDocument();
      const { body, documentElement, defaultView } = frameDocument || {};

      if (!body || !documentElement) return;

      resizeObserver?.disconnect();
      observedFrameWindow?.removeEventListener('resize', syncIframeHeight);
      observedFrameDocument?.removeEventListener('wheel', handleFrameWheel);

      const ResizeObserverConstructor = defaultView?.ResizeObserver || window.ResizeObserver;
      if (!ResizeObserverConstructor) {
        syncIframeHeight();
      } else {
        resizeObserver = new ResizeObserverConstructor(syncIframeHeight);
        resizeObserver.observe(body);
      }

      observedFrameWindow = defaultView;
      observedFrameDocument = frameDocument;
      observedFrameWindow?.addEventListener('resize', syncIframeHeight);
      observedFrameDocument.addEventListener('wheel', handleFrameWheel, { passive: false });
      syncIframeHeight();
    };

    setIframeHeight(DEFAULT_IFRAME_HEIGHT);
    iframe.addEventListener('load', setupHeightObserver);
    window.addEventListener('resize', syncIframeHeight);
    setupHeightObserver();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      iframe.removeEventListener('load', setupHeightObserver);
      window.removeEventListener('resize', syncIframeHeight);
      observedFrameWindow?.removeEventListener('resize', syncIframeHeight);
      observedFrameDocument?.removeEventListener('wheel', handleFrameWheel);
      resizeObserver?.disconnect();
    };
  }, [embedHtml]);

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
        overflow: 'visible',
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
          className="embedded-html-view"
          elevation={0}
          sx={{
            borderRadius: { xs: '20px', md: '28px' },
            border: `1px solid ${alpha(project.accent, 0.24)}`,
            bgcolor: 'rgba(255,255,255,0.78)',
            boxShadow: `0 24px 80px ${alpha('#061827', 0.12)}`,
            height: 'auto',
            maxHeight: 'none',
            overflow: 'visible',
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
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
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

          {embedHtml ? (
            <Box
              component="iframe"
              ref={iframeRef}
              title={`${getLocalizedString(project.title, lang)} preview`}
              srcDoc={embedHtml}
              sandbox="allow-scripts allow-same-origin"
              scrolling="no"
              sx={{
                display: 'block',
                width: '100%',
                height: `${iframeHeight}px`,
                maxHeight: 'none',
                border: 0,
                borderBottomLeftRadius: 'inherit',
                borderBottomRightRadius: 'inherit',
                bgcolor: '#fff',
                overflow: 'hidden',
              }}
            />
          ) : (
            <Box sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', bgcolor: '#fff' }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>
                {isLoadingEmbed ? 'Carregando demo...' : 'Demo indisponivel.'}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
