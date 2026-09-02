import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import TableChartIcon from '@mui/icons-material/TableChart';
import CloudIcon from '@mui/icons-material/Cloud';
import BugReportIcon from '@mui/icons-material/BugReport';
import BuildIcon from '@mui/icons-material/Build';
import { useTranslation } from 'react-i18next';
import AnimatedBox from '../ui/AnimatedBox';
import SectionTitle from '../ui/SectionTitle';
import { skillCategories } from '../../data/skills';
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

function SkillCard({ category, cardIndex, lang, onOpen }) {
  const IconComponent = ICON_MAP[category.icon] || BuildIcon;
  const skills = getLocalizedStringArray(category.skills, lang);
  const openLabel = getLocalizedString(UI_LABELS.open, lang);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(category);
    }
  };

  return (
    <AnimatedBox
      delay={cardIndex * 0.08}
      style={{ height: '100%' }}
    >
      <Card
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${openLabel}: ${getLocalizedString(category.title, lang)}`}
        onClick={() => onOpen(category)}
        onKeyDown={handleKeyDown}
        sx={{
          height: '100%',
          background: category.gradient,
          borderTop: `2px solid ${alpha(category.color, 0.5)}`,
          cursor: 'pointer',
          outline: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderTop: `2px solid ${category.color}`,
            boxShadow: `0 10px 26px ${alpha(category.color, 0.13)}`,
          },
          '&:focus-visible': {
            boxShadow: `0 0 0 3px ${alpha(category.color, 0.24)}`,
            borderColor: alpha(category.color, 0.48),
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.05, md: 2 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1, mb: 1.35 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: alpha(category.color, 0.15),
                border: `1px solid ${alpha(category.color, 0.3)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconComponent sx={{ color: category.color, fontSize: '1.2rem' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '0.98rem',
                color: 'text.primary',
                flex: 1,
              }}
            >
              {getLocalizedString(category.title, lang)}
            </Typography>
            <OpenInFullOutlinedIcon sx={{ color: category.color, fontSize: '1rem', opacity: 0.82 }} />
          </Box>

          {/* Skills */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.52 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  maxWidth: '100%',
                  bgcolor: alpha(category.color, 0.1),
                  border: `1px solid ${alpha(category.color, 0.22)}`,
                  color: alpha(category.color, 1),
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  height: 22,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                  '&:hover': {
                    bgcolor: alpha(category.color, 0.2),
                    borderColor: category.color,
                    color: '#EAF3F9',
                    transform: 'translateY(-2px)',
                  },
                }}
              />
            ))}
          </Box>

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1.15,
              color: category.color,
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.66rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {openLabel}
          </Typography>
        </CardContent>
      </Card>
    </AnimatedBox>
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
          boxShadow: `0 24px 80px ${alpha('#061827', 0.28)}`,
          overflow: 'hidden',
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: alpha('#061827', 0.42),
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
                bgcolor: alpha('#E0ECF5', 0.72),
                border: `1px solid ${alpha(category.color, 0.16)}`,
                boxShadow: `0 8px 22px ${alpha('#061827', 0.055)}`,
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
        py: { xs: 6, md: 'var(--section-block-padding)' },
        background: 'linear-gradient(180deg, var(--site-bg-start) 0%, var(--site-bg-mid) 100%)',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)' }}>
        <SectionTitle
          overline={t('skills.overline')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: 'var(--card-gap)',
            alignItems: 'stretch',
          }}
        >
          {skillCategories.map((category, index) => (
            <Box key={category.id}>
              <SkillCard
                category={category}
                cardIndex={index}
                lang={lang}
                onOpen={setActiveCategory}
              />
            </Box>
          ))}
        </Box>

        <ExpertiseDialog
          category={activeCategory}
          lang={lang}
          onClose={() => setActiveCategory(null)}
        />
      </Container>
    </Box>
  );
}
