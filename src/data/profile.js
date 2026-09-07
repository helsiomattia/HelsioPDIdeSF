import { visualColors } from '../theme/tokens';

export const profile = {
  name: 'Helsio Mattia',
  firstName: 'Helsio',
  initials: 'HM',

  title: {
    pt: 'Salesforce CRM & Solution Architecture',
    en: 'Salesforce CRM & Solution Architecture',
    es: 'CRM Salesforce y Arquitectura de Soluciones',
  },

  description: {
    pt: [
      'Projeto ecossistemas Salesforce que conectam negócio, dados, automação e experiência — com foco em operações de Service, integrações, governança e arquiteturas preparadas para IA.',
      'Da modelagem de processos à operação em produção, transformo necessidades complexas em soluções escaláveis, observáveis e sustentáveis.',
    ],
    en: [
      'I design Salesforce ecosystems that connect business, data, automation, and customer experience — with a focus on service operations, integrations, governance, and AI-ready architectures.',
      'From process design to production operations, I turn complex requirements into scalable, observable, and maintainable solutions.',
    ],
    es: [
      'Diseño ecosistemas Salesforce que conectan negocio, datos, automatización y experiencia del cliente, con foco en operaciones de Service, integraciones, gobierno y arquitecturas preparadas para IA.',
      'Desde el diseño de procesos hasta la operación en producción, transformo necesidades complejas en soluciones escalables, observables y sostenibles.',
    ],
  },

  valuePillars: {
    pt: [
      'Solution Architecture',
      'Service Operations',
      'Automation & Integration',
      'Data & AI Readiness',
    ],
    en: [
      'Solution Architecture',
      'Service Operations',
      'Automation & Integration',
      'Data & AI Readiness',
    ],
    es: [
      'Arquitectura de Soluciones',
      'Operaciones de Service',
      'Automatización e Integración',
      'Datos e IA',
    ],
  },

  operationalSignals: {
    pt: [
      { label: 'Service Operations', detail: 'Filas, SLA e adoção', color: visualColors.serviceBlue },
      { label: 'Automação', detail: 'Flows previsíveis', color: visualColors.signalAmber },
      { label: 'Integração', detail: 'Sistemas com fronteiras claras', color: visualColors.flowCyan },
      { label: 'Dados', detail: 'Modelo confiável para decisão', color: visualColors.successGreen },
      { label: 'Governança', detail: 'Segurança, documentação e escala', color: visualColors.salesforceCore },
    ],
    en: [
      { label: 'Service Operations', detail: 'Queues, SLA and adoption', color: visualColors.serviceBlue },
      { label: 'Automation', detail: 'Predictable flows', color: visualColors.signalAmber },
      { label: 'Integration', detail: 'Systems with clear boundaries', color: visualColors.flowCyan },
      { label: 'Data', detail: 'Trusted model for decisions', color: visualColors.successGreen },
      { label: 'Governance', detail: 'Security, documentation and scale', color: visualColors.salesforceCore },
    ],
    es: [
      { label: 'Operaciones de Service', detail: 'Colas, SLA y adopción', color: visualColors.serviceBlue },
      { label: 'Automatización', detail: 'Flows previsibles', color: visualColors.signalAmber },
      { label: 'Integración', detail: 'Sistemas con límites claros', color: visualColors.flowCyan },
      { label: 'Datos', detail: 'Modelo confiable para decisión', color: visualColors.successGreen },
      { label: 'Gobierno', detail: 'Seguridad, documentación y escala', color: visualColors.salesforceCore },
    ],
  },

  location: {
    pt: 'Brasil',
    en: 'Brazil',
    es: 'Brasil',
  },

  email: 'helsiomattia@gmail.com',
  phone: '+55 49 98814-5714',
  linkedin: 'https://linkedin.com/in/helsiomattia',
  linkedinDisplay: 'linkedin.com/in/helsiomattia',
  github: 'https://github.com/helsiomattia',
  githubDisplay: 'github.com/helsiomattia',
  trailblazer: 'https://trailblazer.me/id/helsiomattia',
  trailblazerDisplay: 'trailblazer.me/id/helsiomattia',

  /** Caminho relativo para o arquivo PDF do currículo em /public */
  resume: null,

  /** URL da sua foto de perfil (null = usa placeholder com iniciais) */
  avatar: null,

  stats: [
    { label: { pt: 'Anos de Experiência', en: 'Years of Experience', es: 'Años de Experiencia' }, value: '10+' },
    { label: { pt: 'Certificações Salesforce', en: 'Salesforce Certifications', es: 'Certificaciones Salesforce' }, value: '3' },
    { label: { pt: 'Empresas', en: 'Companies', es: 'Empresas' }, value: '5' },
    { label: { pt: 'Idiomas', en: 'Languages', es: 'Idiomas' }, value: '2' },
  ],

  about: {
    pt: [
      'Minha carreira como especialista em tecnologia foi construída na interseção entre tecnologia, processos e operação. São mais de 10 anos trabalhando com CRM, ERP, qualidade e melhoria de processos, experiência que me deu uma visão prática de como sistemas impactam atendimento, receita, experiência do cliente e produtividade.',
      'Atualmente atuo com Salesforce CRM em ambiente corporativo, especialmente na evolução de operações de Sales Cloud e Service Cloud. Meu trabalho conecta modelagem de dados, automação, omnichannel, integrações, segurança, governança e adoção da plataforma para transformar necessidades de negócio em soluções que funcionem de forma consistente no dia a dia.',
      'Minha abordagem vai além da configuração da ferramenta. Procuro entender o problema antes da solução, definir responsabilidades entre sistemas, reduzir acoplamento, estruturar dados com qualidade, documentar decisões e criar automações previsíveis, observáveis e fáceis de manter. É essa visão de sistema como um todo que direciona minha evolução para arquitetura de soluções.',
      'Em paralelo, aprofundo conhecimentos em engenharia de software, arquitetura de dados e IA aplicada ao CRM. A evolução do ecossistema Salesforce para Agentforce, Data 360, experiências headless e arquiteturas orientadas a agentes reforça uma direção essencial: combinar automação determinística, dados confiáveis, integração segura, governança e inteligência para construir plataformas capazes de evoluir com o negócio.',
    ],
    en: [
      'My career as a technology specialist has been built at the intersection of technology, process, and operations. I have more than 10 years of experience across CRM, ERP, quality, and process improvement, which has given me a practical view of how systems affect service, revenue, customer experience, and productivity.',
      'Today I work with Salesforce CRM in an enterprise environment, especially on the evolution of Sales Cloud and Service Cloud operations. My work connects data modeling, automation, omnichannel, integrations, security, governance, and user adoption to turn business needs into solutions that perform consistently in day-to-day operations.',
      'My approach goes beyond platform configuration. I focus on understanding the problem before choosing the solution, defining system responsibilities, reducing coupling, structuring trustworthy data, documenting decisions, and building predictable, observable, and maintainable automations. This system-level perspective is what guides my progression toward solution architecture.',
      'In parallel, I continue to deepen my knowledge of software engineering, data architecture, and AI applied to CRM. Salesforce\'s evolution toward Agentforce, Data 360, headless experiences, and agent-oriented architectures reinforces an essential direction: combining deterministic automation, trusted data, secure integration, governance, and intelligence to build platforms that can evolve with the business.',
    ],
    es: [
      'Mi carrera como especialista en tecnología se ha construido en la intersección entre tecnología, procesos y operación. Tengo más de 10 años de experiencia en CRM, ERP, calidad y mejora de procesos, lo que me dio una visión práctica de cómo los sistemas impactan la atención, los ingresos, la experiencia del cliente y la productividad.',
      'Actualmente trabajo con Salesforce CRM en un entorno corporativo, especialmente en la evolución de operaciones de Sales Cloud y Service Cloud. Mi trabajo conecta modelado de datos, automatización, omnicanalidad, integraciones, seguridad, gobierno y adopción de la plataforma para convertir necesidades de negocio en soluciones consistentes para la operación diaria.',
      'Mi enfoque va más allá de configurar la herramienta. Busco comprender el problema antes de elegir la solución, definir responsabilidades entre sistemas, reducir acoplamiento, estructurar datos confiables, documentar decisiones y construir automatizaciones predecibles, observables y fáciles de mantener. Esta visión integral del sistema es la que orienta mi evolución hacia la arquitectura de soluciones.',
      'En paralelo, continúo profundizando mis conocimientos en ingeniería de software, arquitectura de datos e IA aplicada al CRM. La evolución del ecosistema Salesforce hacia Agentforce, Data 360, experiencias headless y arquitecturas orientadas a agentes refuerza una dirección esencial: combinar automatización determinística, datos confiables, integración segura, gobierno e inteligencia para construir plataformas capaces de evolucionar con el negocio.',
    ],
  },
};
