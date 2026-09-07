import { createTheme, alpha } from '@mui/material/styles';
import { visualColors, visualGradients, visualMotion, visualRadii, visualShadows } from './tokens';

const PRIMARY = visualColors.salesforceCore;
const SECONDARY = visualColors.flowCyan;
const BG = visualColors.appBackground;
const SURFACE = visualColors.surfaceWhite;
const SURFACE_2 = visualColors.consoleMistSoft;
const TEXT = visualColors.textPrimary;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY,
      light: '#115FD4',
      dark: '#092A76',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: SECONDARY,
      light: '#2FCADA',
      dark: '#177E8C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: BG,
      paper: SURFACE,
    },
    text: {
      primary: TEXT,
      secondary: visualColors.textSecondary,
      disabled: '#59687C',
    },
    divider: '#DBE0E6',
    success: { main: '#29A366' },
    error: { main: '#DF3A3A' },
    warning: { main: '#F2A60D' },
      info: { main: PRIMARY },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 850, letterSpacing: '-0.035em', lineHeight: 1.08 },
    h2: { fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.18 },
    h3: { fontWeight: 780, letterSpacing: '-0.01em', lineHeight: 1.3 },
    h4: { fontWeight: 730, lineHeight: 1.4 },
    h5: { fontWeight: 720, lineHeight: 1.5 },
    h6: { fontWeight: 720, lineHeight: 1.55 },
    body1: { fontWeight: 450, lineHeight: 1.8 },
    body2: { fontWeight: 450, lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: '0.01em' },
    overline: { letterSpacing: '0.15em', fontWeight: 750, fontSize: '0.7rem' },
  },
  shape: { borderRadius: visualRadii.control },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(PRIMARY, 0.35)} ${SURFACE_2}`,
        },
        '*::-webkit-scrollbar': { width: '6px' },
        '*::-webkit-scrollbar-track': { background: BG },
        '*::-webkit-scrollbar-thumb': {
          background: alpha(PRIMARY, 0.35),
          borderRadius: '3px',
        },
        '*::-webkit-scrollbar-thumb:hover': { background: PRIMARY },
        'a': {
          color: 'inherit',
        },
        'button, a, [role="button"]': {
          WebkitTapHighlightColor: 'transparent',
        },
        '::selection': {
          backgroundColor: alpha(PRIMARY, 0.2),
          color: TEXT,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: visualRadii.control,
          padding: '10px 28px',
          fontSize: '0.95rem',
          transition: `background-color ${visualMotion.normal}, border-color ${visualMotion.normal}, box-shadow ${visualMotion.normal}, color ${visualMotion.normal}, transform ${visualMotion.normal}`,
          '&:focus-visible': {
            outline: `3px solid ${alpha(PRIMARY, 0.28)}`,
            outlineOffset: 3,
          },
        },
        containedPrimary: {
          background: visualGradients.crmFlowCurrent,
          boxShadow: `0 4px 18px ${alpha(PRIMARY, 0.22)}`,
          '&:hover': {
            boxShadow: visualShadows.panel,
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderColor: alpha(PRIMARY, 0.7),
          color: PRIMARY,
          '&:hover': {
            backgroundColor: alpha(PRIMARY, 0.1),
            borderColor: PRIMARY,
            boxShadow: `0 0 18px ${alpha(PRIMARY, 0.25)}`,
            transform: 'translateY(-2px)',
          },
        },
        outlinedSecondary: {
          borderColor: alpha(SECONDARY, 0.7),
          color: SECONDARY,
          '&:hover': {
            backgroundColor: alpha(SECONDARY, 0.08),
            borderColor: SECONDARY,
            boxShadow: `0 0 18px ${alpha(SECONDARY, 0.25)}`,
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: SURFACE,
          border: `1px solid ${alpha(TEXT, 0.12)}`,
          borderRadius: visualRadii.card,
          transition: `border-color ${visualMotion.normal}, box-shadow ${visualMotion.normal}, transform ${visualMotion.normal}`,
          '&:hover': {
            border: `1px solid ${alpha(PRIMARY, 0.28)}`,
            transform: 'translateY(-3px)',
            boxShadow: visualShadows.cardHover,
          },
          '&:focus-within': {
            borderColor: alpha(PRIMARY, 0.28),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.78rem',
          fontWeight: 650,
          borderRadius: 6,
          height: '26px',
          color: TEXT,
        },
        label: {
          lineHeight: 1.35,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: SURFACE_2,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: alpha(TEXT, 0.14) },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { borderRadius: 6, fontSize: '0.8rem', fontWeight: 600 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `background-color ${visualMotion.fast}, color ${visualMotion.fast}, transform ${visualMotion.fast}`,
          '&:hover': { transform: 'scale(1.04)' },
          '&:focus-visible': {
            outline: `3px solid ${alpha(PRIMARY, 0.28)}`,
            outlineOffset: 2,
          },
        },
      },
    },
  },
});

export default theme;
