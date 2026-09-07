import {
  Box,
  Typography,
  alpha,
} from '@mui/material';
import LanguageSwitcher from '../LanguageSwitcher';
import { profile } from '../../data/profile';
import { visualColors, visualGradients } from '../../theme/tokens';
import { scrollToSection } from '../../utils/scrollToSection';

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function getHomePath() {
  return `${BASE_PATH || ''}/${window.location.search}`;
}

export default function Navbar() {
  return (
    <Box
      component="nav"
      aria-label="HM.crm"
      sx={{
        position: 'fixed',
        zIndex: 1200,
        left: { xs: 12, md: 16 },
        top: { xs: 12, md: '50%' },
        transform: { xs: 'none', md: 'translateY(-50%)' },
        width: { xs: 'auto', md: 58 },
        p: { xs: 0.7, md: 0.8 },
        borderRadius: { xs: '999px', md: '22px' },
        border: `1px solid ${alpha(visualColors.commandNavy, 0.14)}`,
        bgcolor: alpha(visualColors.consoleMist, 0.78),
        boxShadow: `0 18px 46px ${alpha(visualColors.commandNavy, 0.1)}`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        alignItems: 'center',
        gap: { xs: 0.85, md: 1 },
        '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
          bgcolor: alpha(visualColors.consoleMist, 0.96),
        },
      }}
    >
      <Box
        component="a"
        href={getHomePath()}
        onClick={(event) => {
          event.preventDefault();
          window.history.pushState(null, '', getHomePath());
          scrollToSection('home', { duration: 0.38 });
        }}
        aria-label="Ir para o início"
        sx={{
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'grid',
          placeItems: 'center',
          width: 40,
          height: 40,
          borderRadius: { xs: '999px', md: '15px' },
          background: visualGradients.crmFlow,
          color: visualColors.surfaceWhite,
          boxShadow: `0 10px 24px ${alpha(visualColors.salesforceCore, 0.2)}`,
          flexShrink: 0,
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: `0 14px 30px ${alpha(visualColors.salesforceCore, 0.24)}`,
          },
          '&:focus-visible': {
            outline: `3px solid ${alpha(visualColors.salesforceCore, 0.26)}`,
            outlineOffset: 3,
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.78rem',
            fontWeight: 850,
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {profile.initials}
        </Typography>
      </Box>

      <Box
        aria-hidden="true"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: 2,
          height: 28,
          borderRadius: 999,
          background: `linear-gradient(180deg, ${alpha(visualColors.commandNavy, 0.16)}, ${alpha(visualColors.flowCyan, 0.52)})`,
        }}
      />

      <LanguageSwitcher orientation="horizontal" sx={{ display: { xs: 'flex', md: 'none' } }} />
      <LanguageSwitcher orientation="vertical" sx={{ display: { xs: 'none', md: 'flex' } }} />
    </Box>
  );
}
