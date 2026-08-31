import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
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

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 2.15, md: 2.25 } }}>
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
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.96rem', lineHeight: 1.3 }}>
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
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.35 }}>
                {getLocalizedString(exp.location, lang)} · {getLocalizedString(exp.type, lang)}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.1, lineHeight: 1.45, fontSize: '0.79rem' }}>
            {getLocalizedString(exp.description, lang)}
          </Typography>

          {/* Achievements */}
          <Box sx={{ mb: 1.2 }}>
            {getLocalizedStringArray(exp.achievements, lang).map((item) => (
              <Box key={item} sx={{ display: 'flex', gap: 0.65, alignItems: 'flex-start', mb: 0.45 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: '0.82rem', color: exp.color, mt: '2px', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.4, fontSize: '0.76rem' }}>
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
                  color: 'text.secondary',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.64rem',
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
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)' }}>
        <SectionTitle
          overline={t('experience.overline')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <Grid container spacing={{ xs: 2, md: 2.25 }}>
          {experiences.map((exp, index) => (
            <Grid item xs={12} sm={6} md={4} key={exp.id}>
              <ExperienceCard exp={exp} index={index} lang={lang} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
