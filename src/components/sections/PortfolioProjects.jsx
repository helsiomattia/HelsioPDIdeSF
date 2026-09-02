import {
  Box,
  Container,
  Paper,
  Typography,
  alpha,
} from '@mui/material';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import { useTranslation } from 'react-i18next';
import AnimatedBox from '../ui/AnimatedBox';
import SectionTitle from '../ui/SectionTitle';

export default function PortfolioProjects() {
  const { t } = useTranslation();

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
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: { xs: 260, md: 440 },
          height: { xs: 260, md: 440 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,77,165,0.12) 0%, transparent 70%)',
          right: { xs: '-100px', md: '8%' },
          top: { xs: '10%', md: '18%' },
          filter: { xs: 'blur(28px)', md: 'blur(38px)' },
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline={t('portfolioProjects.overline')}
          title={t('portfolioProjects.title')}
          subtitle={t('portfolioProjects.subtitle')}
        />

        <AnimatedBox delay={0.1}>
          <Paper
            elevation={0}
            sx={{
              maxWidth: 760,
              mx: 'auto',
              p: { xs: 3, sm: 4, md: 5 },
              textAlign: 'center',
              borderRadius: 'var(--card-radius)',
              bgcolor: 'rgba(255,255,255,0.88)',
              border: '1px solid var(--site-border)',
              boxShadow: '0 18px 52px rgba(15,37,55,0.08)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                mx: 'auto',
                mb: 2,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                bgcolor: alpha('#0D4DA5', 0.08),
                border: `1px solid ${alpha('#0D4DA5', 0.18)}`,
              }}
            >
              <ConstructionRoundedIcon />
            </Box>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.35rem' },
                fontWeight: 850,
                lineHeight: 1.15,
                mb: 1.4,
                color: 'text.primary',
              }}
            >
              {t('portfolioProjects.title')}
            </Typography>

            <Typography
              variant="overline"
              sx={{
                display: 'inline-flex',
                mb: 2,
                px: 1.4,
                py: 0.65,
                borderRadius: '999px',
                color: 'primary.main',
                bgcolor: alpha('#0D4DA5', 0.07),
                border: `1px solid ${alpha('#0D4DA5', 0.16)}`,
                fontFamily: '"Fira Code", monospace',
              }}
            >
              {t('portfolioProjects.status')}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 560,
                mx: 'auto',
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.08rem' },
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              {t('portfolioProjects.body')}
            </Typography>
          </Paper>
        </AnimatedBox>
      </Container>
    </Box>
  );
}
