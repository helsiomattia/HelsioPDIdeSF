import { Box, Button, Tooltip, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { visualColors } from '../theme/tokens';

const LANGUAGES = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
];

function FlagIcon({ code }) {
  if (code === 'pt') {
    return (
      <Box component="svg" viewBox="0 0 28 20" aria-hidden="true" sx={{ width: 22, height: 16, display: 'block' }}>
        <rect width="28" height="20" rx="3" fill="#169B62" />
        <path d="M14 3 25 10 14 17 3 10Z" fill="#FFDF00" />
        <circle cx="14" cy="10" r="4.4" fill="#002776" />
        <path d="M9.9 8.8c2.8-.5 5.4-.1 8 1.4" stroke="#FFFFFF" strokeWidth="1" fill="none" />
      </Box>
    );
  }

  if (code === 'es') {
    return (
      <Box component="svg" viewBox="0 0 28 20" aria-hidden="true" sx={{ width: 22, height: 16, display: 'block' }}>
        <rect width="28" height="20" rx="3" fill="#AA151B" />
        <rect y="5" width="28" height="10" fill="#F1BF00" />
        <rect x="7" y="8" width="2.8" height="4" rx="0.5" fill="#AA151B" opacity="0.82" />
      </Box>
    );
  }

  return (
    <Box component="svg" viewBox="0 0 28 20" aria-hidden="true" sx={{ width: 22, height: 16, display: 'block' }}>
      <rect width="28" height="20" rx="3" fill="#FFFFFF" />
      {Array.from({ length: 7 }).map((_, index) => (
        <rect key={index} y={index * 3} width="28" height="1.55" fill="#B22234" />
      ))}
      <rect width="12.2" height="9.2" rx="1.2" fill="#3C3B6E" />
      <g fill="#FFFFFF" opacity="0.9">
        <circle cx="2.2" cy="2" r="0.45" />
        <circle cx="5" cy="2" r="0.45" />
        <circle cx="7.8" cy="2" r="0.45" />
        <circle cx="10.6" cy="2" r="0.45" />
        <circle cx="3.6" cy="4.3" r="0.45" />
        <circle cx="6.4" cy="4.3" r="0.45" />
        <circle cx="9.2" cy="4.3" r="0.45" />
        <circle cx="2.2" cy="6.6" r="0.45" />
        <circle cx="5" cy="6.6" r="0.45" />
        <circle cx="7.8" cy="6.6" r="0.45" />
        <circle cx="10.6" cy="6.6" r="0.45" />
      </g>
    </Box>
  );
}

export default function LanguageSwitcher({ sx, orientation = 'horizontal' }) {
  const { i18n, t } = useTranslation();
  const activeLanguage = (i18n.resolvedLanguage || i18n.language || 'pt').split('-')[0];

  return (
    <Box
      role="group"
      aria-label={t('language.label')}
      sx={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        alignItems: 'center',
        gap: 0.7,
        ...sx,
      }}
    >
      {LANGUAGES.map((language) => (
        <Tooltip key={language.code} title={language.label} placement={orientation === 'vertical' ? 'right' : 'bottom'} arrow>
          <Button
            type="button"
            aria-label={language.label}
            aria-pressed={activeLanguage === language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            sx={{
              minWidth: 0,
              width: 34,
              height: 34,
              p: 0,
              borderRadius: '999px',
              border: `1px solid ${alpha(activeLanguage === language.code ? visualColors.salesforceCore : visualColors.commandNavy, activeLanguage === language.code ? 0.42 : 0.12)}`,
              bgcolor: activeLanguage === language.code ? alpha(visualColors.salesforceCore, 0.12) : 'rgba(255,255,255,0.64)',
              boxShadow: activeLanguage === language.code ? `0 8px 18px ${alpha(visualColors.salesforceCore, 0.12)}` : 'none',
              fontSize: '1.05rem',
              lineHeight: 1,
              transition: 'transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
                bgcolor: alpha(visualColors.salesforceCore, 0.1),
                borderColor: alpha(visualColors.salesforceCore, 0.36),
              },
              '&:focus-visible': {
                outline: `3px solid ${alpha(visualColors.salesforceCore, 0.26)}`,
                outlineOffset: 3,
              },
            }}
          >
            <FlagIcon code={language.code} />
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
}
