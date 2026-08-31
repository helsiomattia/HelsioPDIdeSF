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

function SkillCard({ category, cardIndex, lang }) {
  const IconComponent = ICON_MAP[category.icon] || BuildIcon;
  const skills = getLocalizedStringArray(category.skills, lang);

  return (
    <AnimatedBox
      delay={cardIndex * 0.08}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          background: category.gradient,
          borderTop: `2px solid ${alpha(category.color, 0.5)}`,
          '&:hover': {
            borderTop: `2px solid ${category.color}`,
            boxShadow: `0 10px 26px ${alpha(category.color, 0.13)}`,
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.15, md: 2.35 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.6 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
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
                fontSize: '1rem',
                color: 'text.primary',
              }}
            >
              {getLocalizedString(category.title, lang)}
            </Typography>
          </Box>

          {/* Skills */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.65 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  maxWidth: '100%',
                  bgcolor: alpha(category.color, 0.1),
                  border: `1px solid ${alpha(category.color, 0.22)}`,
                  color: alpha(category.color, 0.9),
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.68rem',
                  height: 25,
                  transition: 'all 0.2s ease',
                  cursor: 'default',
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
        </CardContent>
      </Card>
    </AnimatedBox>
  );
}

export default function Skills() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';

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

        <Grid container spacing={{ xs: 2, md: 2.25 }}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <SkillCard category={category} cardIndex={index} lang={lang} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
