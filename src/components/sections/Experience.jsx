import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  alpha,
} from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../ui/SectionTitle';
import AnimatedBox from '../ui/AnimatedBox';
import { experiences } from '../../data/experience';
import { visualColors } from '../../theme/tokens';
import { getLocalizedString } from '../../utils/i18nHelper';
import { renderHighlightedText } from '../../utils/renderHighlightedText';

const ATS_TERMS = {
  pt: [
    'Salesforce CRM',
    'Sales Cloud',
    'Service Cloud',
    'Flow Builder',
    'automação',
    'performance',
    'documentação técnica',
    'suporte a usuários',
    'adoção da plataforma',
    'requisitos de negócio',
    'objetos',
    'campos',
    'layouts',
    'automações',
    'governança da solução',
    'times distribuídos',
    'processos locais',
    'QA',
    'ERP',
    'cenários de teste',
    'dados críticos',
    'mapeamento de processos',
    'treinamento de equipes',
    'eficiência operacional',
  ],
  en: [
    'Salesforce CRM',
    'Sales Cloud',
    'Service Cloud',
    'Flow Builder',
    'automation',
    'performance',
    'technical documentation',
    'user support',
    'platform adoption',
    'business requirements',
    'objects',
    'fields',
    'layouts',
    'automations',
    'solution governance',
    'distributed teams',
    'local processes',
    'QA',
    'ERP',
    'test scenarios',
    'critical data',
    'process mapping',
    'team training',
    'operational efficiency',
  ],
  es: [
    'Salesforce CRM',
    'Sales Cloud',
    'Service Cloud',
    'Flow Builder',
    'automatización',
    'rendimiento',
    'documentación técnica',
    'soporte a usuarios',
    'adopción de la plataforma',
    'requisitos de negocio',
    'objetos',
    'campos',
    'layouts',
    'automatizaciones',
    'gobierno de solución',
    'equipos distribuidos',
    'procesos locales',
    'QA',
    'ERP',
    'escenarios de prueba',
    'datos críticos',
    'mapeo de procesos',
    'capacitación de equipos',
    'eficiencia operacional',
  ],
};

const EXPERIENCE_PLACEMENTS = [
  { gridColumn: '1 / span 2', gridRow: '1' },
  { gridColumn: '3 / span 2', gridRow: '1' },
  { gridColumn: '5 / span 2', gridRow: '1' },
  { gridColumn: '2 / span 2', gridRow: '2' },
  { gridColumn: '4 / span 2', gridRow: '2' },
];

function ExperienceAmbient() {
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
          left: { md: '-12px', lg: '18px', xl: '4%' },
          top: '13%',
          bottom: '9%',
          width: 2,
          borderRadius: '999px',
          background: 'linear-gradient(180deg, transparent, rgba(11,92,171,0.22), rgba(21,157,179,0.24), transparent)',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: -2,
            top: 0,
            width: 6,
            height: '28%',
            borderRadius: '999px',
            background: 'linear-gradient(180deg, transparent, rgba(21,157,179,0.8), transparent)',
            boxShadow: '0 0 24px rgba(21,157,179,0.28)',
            animation: 'experienceTimelineScan 8.5s ease-in-out infinite',
          },
        }}
      />

      {experiences.slice(0, 5).map((exp, index) => (
        <Box
          key={exp.id}
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'absolute',
            left: {
              md: `${index % 2 === 0 ? 10 : 28}px`,
              lg: `${index % 2 === 0 ? 42 : 62}px`,
              xl: `calc(4% + ${index % 2 === 0 ? 18 : 44}px)`,
            },
            top: `${18 + index * 15}%`,
            alignItems: 'center',
            gap: 1,
            color: alpha(exp.color, 0.46),
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.62rem',
            fontWeight: 850,
            letterSpacing: '0.08em',
            opacity: { md: 0.42, xl: 0.62 },
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: alpha(exp.color, 0.18),
              border: `1px solid ${alpha(exp.color, 0.42)}`,
              boxShadow: `0 0 18px ${alpha(exp.color, 0.16)}`,
            }}
          />
          {exp.company.slice(0, 12).toUpperCase()}
        </Box>
      ))}
    </Box>
  );
}

/* ── Experience card ───────────────────────────────────── */
function ExperienceCard({ exp, lang }) {
  const currentLabel = getLocalizedString({ pt: 'Atual', en: 'Current', es: 'Actual' }, lang);
  const summary = getLocalizedString(exp.summary || exp.description, lang);
  const atsTerms = ATS_TERMS[lang] || ATS_TERMS.pt;

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: { xs: 260, lg: 286 },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'rgba(255,255,255,0.86)',
        border: `1px solid ${exp.current ? alpha(exp.color, 0.32) : 'rgba(15,37,55,0.12)'}`,
        boxShadow: exp.current ? `0 14px 34px ${alpha(exp.color, 0.1)}` : '0 12px 30px rgba(15,37,55,0.06)',
        '&:hover .experience-gradient': { opacity: 0.9 },
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: alpha(exp.color, 0.4),
          boxShadow: `0 14px 34px ${alpha(exp.color, 0.11)}`,
        },
      }}
    >
      <Box
        className="experience-gradient"
        sx={{
          height: 7,
          background: `linear-gradient(135deg, ${exp.color} 0%, ${alpha(visualColors.flowCyanLegacy, 0.85)} 100%)`,
          transition: 'opacity 0.3s ease',
        }}
      />

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 1.85, md: 1.95 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1.15 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <Box
              aria-hidden="true"
              sx={{
                width: 34,
                height: 34,
                borderRadius: '9px',
                background: `linear-gradient(135deg, ${alpha(exp.color, 0.22)} 0%, ${alpha(exp.color, 0.08)} 100%)`,
                border: `1px solid ${alpha(exp.color, 0.28)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: exp.color,
                fontSize: '0.88rem',
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {exp.company.charAt(0)}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ color: exp.color, fontFamily: '"Fira Code", monospace', fontSize: '0.68rem', fontWeight: 850, lineHeight: 1.25, mb: 0.25 }}>
                {getLocalizedString(exp.period, lang)}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 760, color: 'text.primary', fontSize: '0.92rem', lineHeight: 1.24 }}>
                {getLocalizedString(exp.role, lang)}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 650, color: exp.color, fontSize: '0.74rem', lineHeight: 1.35 }}>
                {exp.company}
              </Typography>
            </Box>
          </Box>

          {exp.current && (
            <Chip
              label={currentLabel}
              size="small"
              sx={{
                bgcolor: alpha(exp.color, 0.1),
                border: `1px solid ${alpha(exp.color, 0.24)}`,
                color: exp.color,
                fontSize: '0.6rem',
                height: 22,
                flexShrink: 0,
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.45, minWidth: 0, mb: 1 }}>
          <PlaceOutlinedIcon sx={{ fontSize: '0.76rem', color: 'text.secondary', flexShrink: 0 }} />
          <Typography variant="caption" color="text.primary" sx={{ lineHeight: 1.35, fontWeight: 650 }}>
            {getLocalizedString(exp.location, lang)} · {getLocalizedString(exp.type, lang)}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            mb: 1.15,
            lineHeight: 1.48,
            fontSize: { xs: '0.8rem', md: '0.78rem' },
            fontWeight: 520,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 5,
            overflow: 'hidden',
          }}
        >
          {renderHighlightedText(summary, atsTerms, exp.color)}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.45, mt: 'auto' }}>
          {exp.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'rgba(11,92,171,0.08)',
                border: '1px solid rgba(11,92,171,0.18)',
                color: 'text.primary',
                fontSize: '0.58rem',
                fontWeight: 650,
                height: 21,
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
  );
}

function ExperienceBoard({ items, lang }) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', lg: 650 },
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
          inset: '12% 8% 14%',
          borderRadius: '34px',
          border: `1px dashed ${alpha(visualColors.salesforceLegacy, 0.2)}`,
        },
        '&::after': {
          content: '""',
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          left: '9%',
          right: '9%',
          top: '50%',
          height: 2,
          bgcolor: alpha(visualColors.flowCyan, 0.16),
          transform: 'rotate(-5deg)',
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
          width: 116,
          height: 116,
          borderRadius: '28px',
          transform: 'translate(-50%, -50%) rotate(10deg)',
          border: `1px solid ${alpha(visualColors.signalAmber, 0.24)}`,
          boxShadow: `0 0 0 34px ${alpha(visualColors.signalAmber, 0.04)}`,
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(6, minmax(0, 1fr))' },
          gridTemplateRows: { lg: 'repeat(2, minmax(286px, 1fr))' },
          gap: { xs: 1.1, sm: 1.3, lg: 1.8 },
          position: 'relative',
          zIndex: 1,
          height: '100%',
        }}
      >
        {items.map((exp, index) => {
          const placement = EXPERIENCE_PLACEMENTS[index] || EXPERIENCE_PLACEMENTS[EXPERIENCE_PLACEMENTS.length - 1];

          return (
            <Box
              key={exp.id}
              sx={{
                gridColumn: { lg: placement.gridColumn },
                gridRow: { lg: placement.gridRow },
                height: '100%',
              }}
            >
              <AnimatedBox delay={index * 0.06} style={{ height: '100%', width: '100%' }}>
                <ExperienceCard exp={exp} lang={lang} />
              </AnimatedBox>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/* ── Experience section ─────────────────────────────────── */
export default function Experience() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';

  return (
    <Box
      id="experience"
      data-section="experience"
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
      <ExperienceAmbient />

      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline={t('experience.overline')}
          subtitle={t('experience.subtitle')}
        />

        <ExperienceBoard items={experiences} lang={lang} />
      </Container>
    </Box>
  );
}
