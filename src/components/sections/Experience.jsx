import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  alpha,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../ui/SectionTitle';
import AnimatedBox from '../ui/AnimatedBox';
import { experiences } from '../../data/experience';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';

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
function ExperienceCard({ exp, index, lang }) {
  const currentLabel = getLocalizedString({ pt: 'Atual', en: 'Current', es: 'Actual' }, lang);

  return (
    <AnimatedBox delay={index * 0.06} style={{ height: '100%' }}>
        <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'rgba(224,236,245,0.94)',
          borderColor: exp.current ? alpha(exp.color, 0.3) : 'rgba(15,37,55,0.12)',
          boxShadow: exp.current ? `0 10px 26px ${alpha(exp.color, 0.1)}` : undefined,
          '&:hover .experience-gradient': { opacity: 0.9 },
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: alpha(exp.color, 0.4),
            boxShadow: `0 12px 30px ${alpha(exp.color, 0.11)}`,
          },
        }}
      >
        <Box
          className="experience-gradient"
          sx={{
            height: 8,
            background: `linear-gradient(135deg, ${exp.color} 0%, ${alpha('#159DB3', 0.85)} 100%)`,
            transition: 'opacity 0.3s ease',
          }}
        />

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 2.05, md: 2 } }}>
          {/* Top row */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 1,
              mb: 1.25,
            }}
          >
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
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.94rem', lineHeight: 1.28 }}>
                  {getLocalizedString(exp.role, lang)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: exp.color, fontFamily: '"Fira Code", monospace', fontSize: '0.76rem', lineHeight: 1.35 }}
                >
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
                  fontSize: '0.64rem',
                  height: 22,
                  flexShrink: 0,
                }}
              />
            )}
          </Box>

          {/* Period and location */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.75, mb: 1.2 }}>
            <Chip
              label={getLocalizedString(exp.period, lang)}
              size="small"
              icon={<WorkOutlineIcon style={{ fontSize: '0.72rem' }} />}
              sx={{
                bgcolor: alpha(exp.color, 0.08),
                border: `1px solid ${alpha(exp.color, 0.2)}`,
                color: exp.color,
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.66rem',
                height: 22,
                maxWidth: '100%',
                '& .MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.45, minWidth: 0 }}>
              <PlaceOutlinedIcon sx={{ fontSize: '0.78rem', color: 'text.secondary', flexShrink: 0 }} />
              <Typography variant="caption" color="text.primary" sx={{ lineHeight: 1.35, fontWeight: 650 }}>
                {getLocalizedString(exp.location, lang)} · {getLocalizedString(exp.type, lang)}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography variant="body2" sx={{ color: 'text.primary', mb: 1.05, lineHeight: 1.43, fontSize: '0.78rem', fontWeight: 500 }}>
            {getLocalizedString(exp.description, lang)}
          </Typography>

          {/* Achievements */}
          <Box sx={{ mb: 1.1 }}>
            {getLocalizedStringArray(exp.achievements, lang).map((item) => (
              <Box key={item} sx={{ display: 'flex', gap: 0.65, alignItems: 'flex-start', mb: 0.45 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: '0.82rem', color: exp.color, mt: '2px', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.38, fontSize: '0.75rem', fontWeight: 500 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Tech chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
            {exp.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: 'rgba(11,92,171,0.08)',
                  border: '1px solid rgba(11,92,171,0.18)',
                  color: 'text.primary',
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
        </CardContent>
      </Card>
    </AnimatedBox>
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
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: 'var(--card-gap)',
            alignItems: 'stretch',
          }}
        >
          {experiences.map((exp, index) => (
            <Box key={exp.id}>
              <ExperienceCard exp={exp} index={index} lang={lang} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
