import { Box, Typography } from '@mui/material';
import { visualColors } from '../../theme/tokens';

/**
 * Título de seção padronizado com hierarquia visual consistente.
 * @param {string} overline - Texto pequeno acima do título (ex: "01. sobre")
 * @param {string} title - Título principal da seção
 * @param {string} [subtitle] - Subtítulo opcional
 * @param {'center'|'left'} [align='left']
 */
export default function SectionTitle({
  overline,
  title,
  subtitle,
  align = 'left',
  subtitleMaxWidth = '640px',
  dividerHeight = 4,
  dividerWidth = 56,
}) {
  const visualOverline = overline?.replace(/^\d+\.\s*/, '');

  return (
    <Box sx={{ mb: { xs: 3.2, md: 4.2 } }}>
      <Box sx={{ textAlign: align }}>
        {visualOverline && (
          <Typography
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              mb: 1.35,
              color: visualColors.salesforceCore,
              fontSize: { xs: '0.78rem', md: '0.84rem' },
              letterSpacing: '0.01em',
              fontWeight: 750,
              '&::before': {
                content: '""',
                width: 28,
                height: 2,
                borderRadius: 999,
                background: visualColors.flowCyan,
              },
            }}
          >
            {visualOverline}
          </Typography>
        )}

        {title && (
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: 'text.primary',
              maxWidth: align === 'center' ? 'none' : 780,
              fontSize: { xs: '2rem', sm: '2.35rem', md: '3rem' },
              lineHeight: 1.06,
              letterSpacing: '-0.045em',
              mb: subtitle ? 1.4 : 0,
            }}
          >
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              maxWidth: subtitleMaxWidth,
              mx: align === 'center' ? 'auto' : 0,
              color: 'text.secondary',
              mt: 0,
              lineHeight: 1.62,
              fontSize: { xs: '0.98rem', md: '1.02rem' },
              fontWeight: 520,
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Box
          sx={{
            mt: { xs: 2, md: 2.3 },
            mx: align === 'center' ? 'auto' : 0,
            width: dividerWidth,
            height: dividerHeight,
            borderRadius: 999,
            background: align === 'center'
              ? `linear-gradient(90deg, ${visualColors.commandNavy} 0 58%, ${visualColors.flowCyan} 58% 100%)`
              : visualColors.commandNavy,
            boxShadow: align === 'left' ? `calc(${dividerWidth}px + 10px) 0 0 ${visualColors.flowCyan}` : 'none',
          }}
        />
      </Box>
    </Box>
  );
}
