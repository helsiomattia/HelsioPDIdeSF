import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useScrollTrigger,
  alpha,
} from '@mui/material';
import LanguageSwitcher from '../LanguageSwitcher';
import { profile } from '../../data/profile';
import { scrollToSection } from '../../utils/scrollToSection';

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function getHomePath() {
  return `${BASE_PATH || ''}/${window.location.search}`;
}

export default function Navbar() {
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 18 });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        transition: 'all 0.35s ease',
        backgroundColor: scrolled ? alpha('#E0ECF5', 0.92) : alpha('#D3E2EE', 0.74),
        backdropFilter: scrolled ? 'blur(8px)' : 'blur(5px)',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'blur(5px)',
        borderBottom: scrolled ? '1px solid rgba(15,37,55,0.12)' : '1px solid rgba(15,37,55,0.06)',
        '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
          backgroundColor: scrolled ? alpha('#E0ECF5', 0.98) : alpha('#D3E2EE', 0.94),
        },
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)' }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 'var(--header-height)',
            py: 0,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box
            component="a"
            href={getHomePath()}
            onClick={(event) => {
              event.preventDefault();
              window.history.pushState(null, '', getHomePath());
              scrollToSection('home');
            }}
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0B5CAB 0%, #159DB3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Fira Code", monospace',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: '#EAF3F9',
                flexShrink: 0,
              }}
            >
              {profile.initials}
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1rem',
                background: 'linear-gradient(90deg, #061827 35%, #17364F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {profile.firstName}
              <Typography component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>
                .crm
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.75, sm: 1 } }}>
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
