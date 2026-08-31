import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { profile } from '../../data/profile';
import { scrollToSection } from '../../utils/scrollToSection';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { labelKey: 'nav.about', id: 'about' },
  { labelKey: 'nav.experience', id: 'experience' },
  { labelKey: 'nav.projects', id: 'credentials' },
  { labelKey: 'nav.skills', id: 'expertise' },
  { labelKey: 'nav.contact', id: 'contact' },
];

const SECTION_IDS = ['home', ...NAV_LINKS.map((link) => link.id)];
const HASH_ALIASES = { projects: 'credentials', skills: 'expertise' };
const PATH_ALIASES = { projects: 'credentials', skills: 'expertise', '': 'home' };

function getSectionPath(id) {
  return id === 'home' ? '/' : `/${id}`;
}

function getSectionFromLocation() {
  const hashId = window.location.hash.replace('#', '');
  if (hashId) return HASH_ALIASES[hashId] || hashId;

  const pathId = window.location.pathname.split('/').filter(Boolean).pop() || 'home';
  return PATH_ALIASES[pathId] || pathId;
}

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  /* Active section tracker via GSAP ScrollTrigger */
  useEffect(() => {
    let triggers = [];
    let retryTimer;
    let attempts = 0;

    const setRouteState = (id) => {
      setActiveSection(id === 'home' ? '' : id);

      const nextUrl = `${getSectionPath(id)}${window.location.search}`;
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (currentUrl !== nextUrl) {
        window.history.replaceState(null, '', nextUrl);
      }
    };

    const cleanupTriggers = () => {
      triggers.forEach((trigger) => trigger.kill());
      triggers = [];
    };

    const setupTriggers = () => {
      cleanupTriggers();
      let hasMissingSection = false;

      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) {
          hasMissingSection = true;
          return;
        }

        triggers.push(ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setRouteState(id),
          onEnterBack: () => setRouteState(id),
        }));
      });

      if (hasMissingSection && attempts < 20) {
        attempts += 1;
        retryTimer = window.setTimeout(setupTriggers, 100);
        return;
      }

      const initialSectionId = getSectionFromLocation();
      if (SECTION_IDS.includes(initialSectionId)) {
        window.setTimeout(() => scrollToSection(initialSectionId), 0);
      }
    };

    const handlePopState = () => {
      const id = getSectionFromLocation();
      if (!SECTION_IDS.includes(id)) return;
      setActiveSection(id === 'home' ? '' : id);
      scrollToSection(id);
    };

    setupTriggers();
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.clearTimeout(retryTimer);
      cleanupTriggers();
    };
  }, []);

  const handleNavClick = (event, id) => {
    event?.preventDefault();
    setMobileOpen(false);
    setActiveSection(id);
    window.history.pushState(null, '', getSectionPath(id));
    scrollToSection(id);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          transition: 'all 0.35s ease',
          backgroundColor: scrolled
            ? alpha('#E0ECF5', 0.92)
            : alpha('#D3E2EE', 0.74),
          backdropFilter: scrolled ? 'blur(8px)' : 'blur(5px)',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'blur(5px)',
          borderBottom: scrolled
            ? '1px solid rgba(15,37,55,0.12)'
            : '1px solid rgba(15,37,55,0.06)',
          '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
            backgroundColor: scrolled ? alpha('#E0ECF5', 0.98) : alpha('#D3E2EE', 0.94),
          },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 92, md: 64 },
              py: { xs: 0.6, md: 0.25 },
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              rowGap: { xs: 0.45, md: 0 },
            }}
          >
            {/* Logo / name */}
            <Box
              component="a"
              href="/"
              onClick={(event) => {
                event.preventDefault();
                setActiveSection('');
                window.history.pushState(null, '', getSectionPath('home'));
                scrollToSection('home');
              }}
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 4 },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
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

            {/* Desktop nav links */}
            <Box
              sx={{
                order: { xs: 3, md: 0 },
                width: { xs: '100%', md: 'auto' },
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.35, md: 0.5 },
                flexGrow: 1,
                overflowX: { xs: 'auto', md: 'visible' },
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {NAV_LINKS.map((link, index) => (
                <Box
                  component="a"
                  href={getSectionPath(link.id)}
                  key={link.id}
                  onClick={(event) => handleNavClick(event, link.id)}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  sx={{
                    border: 0,
                    background: 'transparent',
                    color: activeSection === link.id ? 'primary.dark' : 'text.primary',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: { xs: '0.72rem', sm: '0.76rem', md: '0.8rem' },
                    fontWeight: activeSection === link.id ? 800 : 700,
                    py: { xs: 0.75, md: 1 },
                    px: { xs: 1, sm: 1.2, md: 1.5 },
                    flexShrink: 0,
                    borderRadius: '8px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    appearance: 'none',
                    textDecoration: 'none',
                    '&::before': {
                      content: `"0${index + 1}."`,
                      color: 'primary.dark',
                      fontSize: '0.7rem',
                      mr: 0.5,
                      fontWeight: 600,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: { xs: 8, md: 12 },
                      right: { xs: 8, md: 12 },
                      bottom: 5,
                      height: 2,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      opacity: activeSection === link.id ? 1 : 0,
                      transform: activeSection === link.id ? 'scaleX(1)' : 'scaleX(0.45)',
                      transition: 'opacity 0.22s ease, transform 0.22s ease',
                    },
                    '&:hover': { color: 'primary.main', bgcolor: alpha('#0B5CAB', 0.08) },
                    '&:focus-visible': {
                      outline: `3px solid ${alpha('#0B5CAB', 0.26)}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  {t(link.labelKey)}
                </Box>
              ))}
            </Box>

            <LanguageSwitcher sx={{ display: { xs: 'none', md: 'inline-flex' }, ml: 1 }} />

            {/* Curriculum button */}
            {profile.resume && (
              <Box
                component="a"
                href={profile.resume}
                download
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  ml: 2,
                  px: 2,
                  py: 0.75,
                  borderRadius: '8px',
                  border: `1px solid ${alpha('#0B5CAB', 0.72)}`,
                  color: 'primary.main',
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: alpha('#0B5CAB', 0.12),
                    borderColor: 'primary.main',
                    boxShadow: `0 0 18px ${alpha('#0B5CAB', 0.24)}`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('nav.resume')}
              </Box>
            )}

            {/* Mobile hamburger */}
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: 'none' } }}
              aria-label={t('nav.openMenu')}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'var(--site-surface)',
            borderLeft: '1px solid rgba(15,37,55,0.12)',
            px: 2,
            py: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <IconButton onClick={() => setMobileOpen(false)} aria-label={t('nav.closeMenu')}>
            <CloseIcon />
          </IconButton>
        </Box>

        <LanguageSwitcher sx={{ mb: 3 }} />

        <List disablePadding>
          {NAV_LINKS.map((link, index) => (
            <ListItem key={link.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component="a"
                href={getSectionPath(link.id)}
                onClick={(event) => handleNavClick(event, link.id)}
                sx={{
                  borderRadius: '8px',
                  color: activeSection === link.id ? 'primary.main' : 'text.secondary',
                  bgcolor: activeSection === link.id ? alpha('#0B5CAB', 0.12) : 'transparent',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.75rem',
                    color: 'primary.main',
                    mr: 1.5,
                    minWidth: 24,
                  }}
                >
                  0{index + 1}.
                </Typography>
                <ListItemText primary={t(link.labelKey)} primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {profile.resume && (
          <Box sx={{ mt: 4, px: 1 }}>
            <Box
              component="a"
              href={profile.resume}
              download
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                px: 2,
                py: 1.1,
                borderRadius: '8px',
                border: `1px solid ${alpha('#0B5CAB', 0.72)}`,
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {t('nav.downloadResume')}
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
}
