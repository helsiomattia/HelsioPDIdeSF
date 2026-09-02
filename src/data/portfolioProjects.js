import customer360Html from '../../projects/customer360_generico_interativo_v4.html?raw';

const embeddedProjectShell = ({ title, eyebrow, accent = '#0D4DA5' }) => `
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root { color-scheme: light; font-family: Inter, Arial, sans-serif; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        background: linear-gradient(135deg, #f7fbff 0%, #e4eef7 100%);
        color: #132238;
      }
      main { padding: clamp(24px, 5vw, 56px); }
      .shell {
        max-width: 980px;
        margin: 0 auto;
        border: 1px solid rgba(13, 77, 165, 0.18);
        border-radius: 28px;
        background: rgba(255,255,255,0.78);
        box-shadow: 0 26px 70px rgba(15,37,55,0.12);
        overflow: hidden;
      }
      header {
        padding: 28px;
        background: linear-gradient(135deg, ${accent} 0%, #1EACB8 100%);
        color: #fff;
      }
      .eyebrow {
        margin: 0 0 8px;
        font: 800 12px/1.4 "Fira Code", monospace;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        opacity: 0.84;
      }
      h1 { margin: 0; font-size: clamp(28px, 5vw, 52px); line-height: 1.04; }
      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        padding: 22px;
      }
      .card {
        min-height: 132px;
        padding: 18px;
        border-radius: 18px;
        border: 1px solid rgba(13, 77, 165, 0.14);
        background: #fff;
      }
      .wide { grid-column: span 2; }
      .metric { font-size: 34px; font-weight: 850; color: ${accent}; }
      .label { margin-top: 8px; font-size: 13px; line-height: 1.5; color: #4f5e73; }
      @media (max-width: 720px) {
        .grid { grid-template-columns: 1fr; padding: 16px; }
        .wide { grid-column: auto; }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="shell">
        <header>
          <p class="eyebrow">${eyebrow}</p>
          <h1>${title}</h1>
        </header>
        <div class="grid">
          <article class="card wide">
            <div class="metric">View</div>
            <div class="label">Substitua este HTML por uma tela real do projeto, protótipo exportado ou dashboard incorporado.</div>
          </article>
          <article class="card">
            <div class="metric">01</div>
            <div class="label">Objetivo principal do projeto.</div>
          </article>
          <article class="card">
            <div class="metric">02</div>
            <div class="label">Stack, integrações ou automações usadas.</div>
          </article>
          <article class="card wide">
            <div class="metric">03</div>
            <div class="label">Resultado, aprendizado ou próximo incremento planejado.</div>
          </article>
        </div>
      </section>
    </main>
  </body>
</html>`;

export const portfolioProjects = [
  {
    id: 'salesforce-skill-shine',
    kind: 'external',
    title: {
      pt: 'Salesforce Skill Shine',
      en: 'Salesforce Skill Shine',
      es: 'Salesforce Skill Shine',
    },
    description: {
      pt: 'Site dedicado a estudos, prática e evolução de habilidades no ecossistema Salesforce.',
      en: 'Website dedicated to study, practice and skill growth in the Salesforce ecosystem.',
      es: 'Sitio dedicado a estudios, práctica y evolución de habilidades en el ecosistema Salesforce.',
    },
    status: { pt: 'Site externo', en: 'External site', es: 'Sitio externo' },
    action: { pt: 'Acessar site', en: 'Open site', es: 'Abrir sitio' },
    externalUrl: 'https://salesforceskillshine.com/',
    tags: ['Salesforce', 'Learning', 'CRM'],
    accent: '#0D4DA5',
    gradient: 'linear-gradient(135deg, #0D4DA5 0%, #1EACB8 100%)',
  },
  {
    id: 'crm-customer-360',
    kind: 'embed',
    title: {
      pt: 'CRM Customer 360',
      en: 'CRM Customer 360',
      es: 'CRM Customer 360',
    },
    description: {
      pt: 'Demo interativa em HTML simulando uma visão Salesforce Customer 360 com dados, métricas e contexto do cliente.',
      en: 'Interactive HTML demo simulating a Salesforce Customer 360 view with data, metrics and customer context.',
      es: 'Demo interactiva en HTML que simula una vista Salesforce Customer 360 con datos, métricas y contexto del cliente.',
    },
    status: { pt: 'Demo Salesforce', en: 'Salesforce demo', es: 'Demo Salesforce' },
    action: { pt: 'Abrir Customer 360', en: 'Open Customer 360', es: 'Abrir Customer 360' },
    tags: ['Salesforce', 'Customer 360', 'CRM'],
    accent: '#0176D3',
    gradient: 'linear-gradient(135deg, #032D60 0%, #0176D3 100%)',
    embedHtml: customer360Html,
  },
  {
    id: 'service-cloud-console',
    kind: 'embed',
    title: {
      pt: 'Service Cloud Console',
      en: 'Service Cloud Console',
      es: 'Service Cloud Console',
    },
    description: {
      pt: 'Espaço para demonstrar uma tela básica de atendimento, casos, filas e priorização.',
      en: 'Space to demonstrate a basic service screen with cases, queues and prioritization.',
      es: 'Espacio para demostrar una pantalla básica de atención, casos, colas y priorización.',
    },
    status: { pt: 'Embed preparado', en: 'Embed ready', es: 'Embed listo' },
    action: { pt: 'Abrir view', en: 'Open view', es: 'Abrir vista' },
    tags: ['Service Cloud', 'Support', 'Cases'],
    accent: '#0B78B6',
    gradient: 'linear-gradient(135deg, #0B78B6 0%, #6A8FB1 100%)',
    embedHtml: embeddedProjectShell({ title: 'Service Cloud Console', eyebrow: 'project embed', accent: '#0B78B6' }),
  },
  {
    id: 'automation-flow-lab',
    kind: 'embed',
    title: {
      pt: 'Automation Flow Lab',
      en: 'Automation Flow Lab',
      es: 'Automation Flow Lab',
    },
    description: {
      pt: 'Página pronta para incorporar um fluxo, protótipo ou documentação visual de automação.',
      en: 'Page ready to embed a flow, prototype or visual automation documentation.',
      es: 'Página lista para incorporar un flujo, prototipo o documentación visual de automatización.',
    },
    status: { pt: 'Embed preparado', en: 'Embed ready', es: 'Embed listo' },
    action: { pt: 'Abrir view', en: 'Open view', es: 'Abrir vista' },
    tags: ['Flow', 'Automation', 'Process'],
    accent: '#B7791F',
    gradient: 'linear-gradient(135deg, #B7791F 0%, #0B8F61 100%)',
    embedHtml: embeddedProjectShell({ title: 'Automation Flow Lab', eyebrow: 'project embed', accent: '#B7791F' }),
  },
  {
    id: 'analytics-dashboard',
    kind: 'embed',
    title: {
      pt: 'Analytics Dashboard',
      en: 'Analytics Dashboard',
      es: 'Analytics Dashboard',
    },
    description: {
      pt: 'Área para embutir uma view HTML de indicadores, BI, qualidade ou performance operacional.',
      en: 'Area to embed an HTML view of metrics, BI, quality or operational performance.',
      es: 'Área para incorporar una vista HTML de indicadores, BI, calidad o performance operacional.',
    },
    status: { pt: 'Embed preparado', en: 'Embed ready', es: 'Embed listo' },
    action: { pt: 'Abrir view', en: 'Open view', es: 'Abrir vista' },
    tags: ['BI', 'Analytics', 'Quality'],
    accent: '#7C5CFF',
    gradient: 'linear-gradient(135deg, #7C5CFF 0%, #1EACB8 100%)',
    embedHtml: embeddedProjectShell({ title: 'Analytics Dashboard', eyebrow: 'project embed', accent: '#7C5CFF' }),
  },
];

export function getPortfolioProjectById(id) {
  return portfolioProjects.find((project) => project.id === id);
}
