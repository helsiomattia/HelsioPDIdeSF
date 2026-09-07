export const visualColors = {
  commandNavy: '#061827',
  commandNavySoft: '#17364F',
  textPrimary: '#141D2E',
  textSecondary: '#3F4E62',
  salesforceCore: '#0D4DA5',
  salesforceLegacy: '#0B5CAB',
  salesforceBright: '#0176D3',
  flowCyan: '#1EACB8',
  flowCyanLegacy: '#159DB3',
  appBackground: '#F5F7F9',
  consoleMist: '#E0ECF5',
  consoleMistDeep: '#D3E2EE',
  consoleMistSoft: '#E7EAEE',
  surfaceWhite: '#FFFFFF',
  signalAmber: '#B7791F',
  successGreen: '#0B8F61',
  serviceBlue: '#0B78B6',
  slateBlue: '#6A8FB1',
};

export const visualGradients = {
  crmFlow: `linear-gradient(135deg, ${visualColors.salesforceLegacy} 0%, ${visualColors.flowCyanLegacy} 100%)`,
  crmFlowCurrent: `linear-gradient(135deg, ${visualColors.salesforceCore} 0%, ${visualColors.flowCyan} 100%)`,
  commandText: `linear-gradient(90deg, ${visualColors.commandNavy} 35%, ${visualColors.commandNavySoft} 100%)`,
};

export const visualRadii = {
  control: 8,
  card: 18,
  panel: 28,
  pill: 999,
};

export const visualMotion = {
  fast: '180ms ease',
  normal: '240ms cubic-bezier(0.4, 0, 0.2, 1)',
  deliberate: '420ms cubic-bezier(0.22, 1, 0.36, 1)',
};

export const visualShadows = {
  focus: `0 0 0 3px color-mix(in srgb, ${visualColors.salesforceCore} 26%, transparent)`,
  card: '0 12px 34px rgba(6,24,39,0.07)',
  cardHover: '0 18px 44px rgba(6,24,39,0.1)',
  panel: '0 24px 80px rgba(6,24,39,0.12)',
};
