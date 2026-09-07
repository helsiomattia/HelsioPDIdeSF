import { useState } from 'react';
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import TableChartIcon from '@mui/icons-material/TableChart';
import CloudIcon from '@mui/icons-material/Cloud';
import BugReportIcon from '@mui/icons-material/BugReport';
import BuildIcon from '@mui/icons-material/Build';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../ui/SectionTitle';
import { skillCategories } from '../../data/skills';
import { visualColors } from '../../theme/tokens';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';

const ICON_MAP = {
  Web: WebIcon,
  Storage: StorageIcon,
  TableChart: TableChartIcon,
  Cloud: CloudIcon,
  BugReport: BugReportIcon,
  Build: BuildIcon,
};

const UI_LABELS = {
  open: {
    pt: 'Ver detalhes',
    en: 'View details',
    es: 'Ver detalles',
  },
  close: {
    pt: 'Fechar detalhes',
    en: 'Close details',
    es: 'Cerrar detalles',
  },
  dialogIntro: {
    pt: 'Como aplico esses conhecimentos em CRM, Salesforce e operações.',
    en: 'How I apply these capabilities across CRM, Salesforce and operations.',
    es: 'Cómo aplico estos conocimientos en CRM, Salesforce y operaciones.',
  },
};

function SkillsAmbient({ lang }) {
  const codeColumns = ['CRM', 'SQL', 'QA', 'API', 'FLOW'];

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
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          right: { md: '-150px', lg: '-96px', xl: '0%' },
          top: { md: '10%', lg: '14%' },
          width: { md: 250, lg: 300 },
          height: { md: 250, lg: 300 },
          opacity: { md: 0.58, xl: 0.78 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(11,92,171,0.14)',
            animation: 'skillsRadarSpin 38s linear infinite',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              borderRadius: '50%',
              border: '1px dashed rgba(21,157,179,0.18)',
            },
            '&::before': { inset: 42 },
            '&::after': { inset: 92 },
          }}
        />

        {skillCategories.slice(0, 6).map((category, index) => {
          const angle = index * 60 - 20;

          return (
            <Box
              key={category.id}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 88,
                height: 26,
                ml: '-44px',
                mt: '-13px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(category.color, 0.08),
                border: `1px solid ${alpha(category.color, 0.2)}`,
                color: alpha(category.color, 0.58),
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.56rem',
                fontWeight: 900,
                letterSpacing: '0.05em',
                transform: `rotate(${angle}deg) translateX(124px) rotate(${-angle}deg)`,
              }}
            >
              {getLocalizedString(category.title, lang).slice(0, 11)}
            </Box>
          );
        })}
      </Box>

      {codeColumns.map((token, index) => (
        <Box
          key={token}
          sx={{
            display: { xs: 'none', lg: 'block' },
            position: 'absolute',
            left: `${-1 + index * 2.2}%`,
            top: `${16 + (index % 2) * 18}%`,
            color: 'rgba(11,92,171,0.18)',
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.64rem',
            fontWeight: 850,
            lineHeight: 1.9,
            letterSpacing: '0.12em',
            animation: `skillsCodeRain ${9 + index}s linear ${index * -1.6}s infinite`,
          }}
        >
          {Array.from({ length: 5 }).map((_, row) => (
            <Box key={`${token}-${row}`}>{`${token}_${row + 1}`}</Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

function CapabilityMap({ lang, onOpen }) {
  const openLabel = getLocalizedString(UI_LABELS.open, lang);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', lg: 500 },
        borderRadius: '30px',
        border: `1px solid ${alpha(visualColors.salesforceLegacy, 0.18)}`,
        bgcolor: 'rgba(224,236,245,0.62)',
        overflow: 'hidden',
        p: { xs: 1.1, sm: 1.35, lg: 2.4 },
        boxShadow: `inset 0 0 0 1px ${alpha(visualColors.surfaceWhite, 0.48)}`,
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
          left: '12%',
          right: '12%',
          top: '50%',
          height: 2,
          bgcolor: alpha(visualColors.flowCyan, 0.16),
          transform: 'rotate(-9deg)',
        },
      }}
    >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gridTemplateRows: { lg: 'repeat(2, minmax(150px, 1fr))' },
            gap: { xs: 1, sm: 1.15, lg: 1.45 },
            position: 'relative',
            zIndex: 1,
            height: '100%',
            minHeight: { lg: 306 },
          }}
        >
          {skillCategories.map((category, index) => {
            const IconComponent = ICON_MAP[category.icon] || BuildIcon;
            const title = getLocalizedString(category.title, lang);
            const skills = getLocalizedStringArray(category.skills, lang).slice(0, 3);

            return (
              <Box
                key={category.id}
                component="button"
                type="button"
                aria-haspopup="dialog"
                aria-label={`${openLabel}: ${title}`}
                onClick={() => onOpen(category)}
                sx={{
                  width: '100%',
                  minHeight: { xs: 124, lg: 150 },
                  textAlign: 'left',
                  border: `1px solid ${alpha(category.color, 0.24)}`,
                  borderTop: `3px solid ${category.color}`,
                  borderRadius: '18px',
                  bgcolor: 'rgba(255,255,255,0.84)',
                  boxShadow: '0 10px 24px rgba(15,37,55,0.055)',
                  p: { xs: 1.35, md: 1.45 },
                  cursor: 'pointer',
                  color: 'text.primary',
                  fontFamily: 'inherit',
                  transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: alpha(category.color, 0.46),
                    boxShadow: `0 12px 28px ${alpha(category.color, 0.1)}`,
                  },
                  '&:focus-visible': {
                    outline: `3px solid ${alpha(category.color, 0.28)}`,
                    outlineOffset: 3,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.85 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '11px', display: 'grid', placeItems: 'center', bgcolor: alpha(category.color, 0.11), color: category.color, flexShrink: 0 }}>
                    <IconComponent sx={{ fontSize: '1rem' }} />
                  </Box>
                  <Typography component="span" sx={{ fontSize: { xs: '0.9rem', md: '0.92rem' }, fontWeight: 820, lineHeight: 1.18 }}>
                    {title}
                  </Typography>
                </Box>
                <Typography component="span" sx={{ display: '-webkit-box', color: 'text.secondary', fontSize: '0.68rem', lineHeight: 1.35, fontWeight: 650, WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>
                  {skills.join(' · ')}
                </Typography>
              </Box>
            );
          })}
        </Box>
    </Box>
  );
}

function ExpertiseDialog({ category, lang, onClose }) {
  if (!category) return null;

  const IconComponent = ICON_MAP[category.icon] || BuildIcon;
  const skills = getLocalizedStringArray(category.skills, lang);
  const details = getLocalizedStringArray(category.details, lang);
  const title = getLocalizedString(category.title, lang);
  const closeLabel = getLocalizedString(UI_LABELS.close, lang);

  return (
    <Dialog
      open={Boolean(category)}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="expertise-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: '24px',
          bgcolor: 'var(--site-surface)',
          border: `1px solid ${alpha(category.color, 0.28)}`,
          backgroundImage: `linear-gradient(135deg, ${alpha(category.color, 0.1)} 0%, rgba(224,236,245,0.98) 42%, rgba(193,212,227,0.96) 100%)`,
          boxShadow: `0 24px 80px ${alpha(visualColors.commandNavy, 0.28)}`,
          overflow: 'hidden',
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: alpha(visualColors.commandNavy, 0.42),
          backdropFilter: 'blur(3px)',
        },
      }}
    >
      <Box
        sx={{
          height: 8,
          background: `linear-gradient(90deg, ${category.color} 0%, #0E8198 100%)`,
        }}
      />

      <DialogContent sx={{ p: { xs: 2.4, sm: 3, md: 3.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2.5 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: '14px',
              bgcolor: alpha(category.color, 0.13),
              border: `1px solid ${alpha(category.color, 0.28)}`,
              color: category.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <IconComponent sx={{ fontSize: '1.35rem' }} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              id="expertise-dialog-title"
              variant="h4"
              component="h3"
              sx={{ color: 'text.primary', fontSize: { xs: '1.35rem', md: '1.7rem' }, fontWeight: 850, lineHeight: 1.2 }}
            >
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary', mt: 0.65, lineHeight: 1.55, fontWeight: 500 }}>
              {getLocalizedString(UI_LABELS.dialogIntro, lang)}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            aria-label={closeLabel}
            sx={{
              color: 'text.primary',
              bgcolor: alpha(category.color, 0.08),
              border: `1px solid ${alpha(category.color, 0.16)}`,
              '&:hover': { bgcolor: alpha(category.color, 0.14) },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 1.25, md: 1.5 },
          }}
        >
          {skills.map((skill, index) => (
            <Box
              key={skill}
              sx={{
                p: { xs: 1.55, md: 1.75 },
                borderRadius: '16px',
                bgcolor: alpha(visualColors.consoleMist, 0.72),
                border: `1px solid ${alpha(category.color, 0.16)}`,
                boxShadow: `0 8px 22px ${alpha(visualColors.commandNavy, 0.055)}`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: category.color,
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.78rem',
                  fontWeight: 850,
                  lineHeight: 1.35,
                  mb: 0.6,
                }}
              >
                {skill}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.86rem', lineHeight: 1.58, fontWeight: 500 }}>
                {details[index] || ''}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function Skills() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <Box
      id="expertise"
      data-section="expertise"
      component="section"
      sx={{
        minHeight: { md: 'calc(100dvh - var(--header-height))' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 5, md: 'clamp(28px, 4vh, 52px)' },
        background: 'linear-gradient(180deg, var(--site-bg-start) 0%, var(--site-bg-mid) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SkillsAmbient lang={lang} />

      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline={t('skills.overline')}
          subtitle={t('skills.subtitle')}
        />

        <CapabilityMap lang={lang} onOpen={setActiveCategory} />

        <ExpertiseDialog
          category={activeCategory}
          lang={lang}
          onClose={() => setActiveCategory(null)}
        />
      </Container>
    </Box>
  );
}
