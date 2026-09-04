<div align="center">

# Helsio Mattia | Portfólio Profissional

Portfólio pessoal de **Helsio Mattia**, Salesforce CRM Specialist com foco em **Sales Cloud**, **Service Cloud**, **automação de processos**, **CRM**, **adoção de usuários** e **eficiência operacional**.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Material UI](https://img.shields.io/badge/Material_UI-5-007FFF?style=flat-square&logo=mui)](https://mui.com)
[![i18next](https://img.shields.io/badge/i18next-26-26A69A?style=flat-square)](https://www.i18next.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock)](https://gsap.com/)

**Acesse:** [helsiomattia.github.io/crm-specialist](https://helsiomattia.github.io/crm-specialist/)

</div>

---

## Sobre o projeto

Este repositório contém a página de portfólio profissional de Helsio Mattia. O objetivo do projeto é apresentar de forma clara, responsiva e bem estruturada a trajetória profissional, as competências, as credenciais e os projetos relacionados ao ecossistema Salesforce e CRM.

A página foi desenvolvida como uma Single Page Application com React e Vite, usando uma camada de dados centralizada em `src/data` para facilitar manutenção do conteúdo sem misturar informações profissionais com a lógica visual da aplicação.

O site também possui suporte a três idiomas:

| Idioma | Arquivo |
|---|---|
| Português | `src/locales/pt/common.json` |
| Inglês | `src/locales/en/common.json` |
| Espanhol | `src/locales/es/common.json` |

---

## Objetivo

O portfólio foi criado para funcionar como uma vitrine profissional online, reunindo em um único lugar:

- Perfil profissional de Helsio Mattia
- Experiência com Salesforce CRM, Sales Cloud, Service Cloud e automação
- Histórico profissional em CRM, ERP, QA e operações
- Certificações, formação acadêmica e conquistas
- Áreas de expertise organizadas por domínio
- Projetos, demos e links externos relevantes
- Canais de contato profissionais

---

## Principais recursos

- **Interface responsiva:** layout adaptado para desktop, tablet e mobile.
- **Conteúdo multilíngue:** português, inglês e espanhol com detecção automática de idioma pelo navegador e persistência em `localStorage`.
- **Dados profissionais centralizados:** perfil, experiência, competências, credenciais e projetos ficam em arquivos dedicados dentro de `src/data`.
- **Seções profissionais:** Hero, Sobre, Experiência, Credenciais, Expertise, Projetos e Contato.
- **Projetos internos e externos:** suporte a cards que abrem sites externos ou páginas internas com HTML incorporado.
- **Rotas internas para demos:** páginas como `/projects/crm-customer-360` são tratadas dentro da SPA.
- **Fallback para GitHub Pages:** `public/404.html` redireciona rotas internas para a aplicação principal.
- **SEO básico:** metatags de descrição, autor, Open Graph e Twitter Card configuradas em `index.html`.
- **Tema visual personalizado:** paleta clara com tons azuis, ciano e acentos profissionais para reforçar o posicionamento em CRM/Salesforce.

---

## Seções do site

| Seção | Descrição |
|---|---|
| Início | Apresentação principal, cargo, papéis profissionais e chamadas para ação. |
| Sobre | Bio profissional, pilares de valor, estatísticas e stack de atuação. |
| Experiência | Linha do tempo com empresas, funções, períodos, descrições e principais entregas. |
| Credenciais | Certificações Salesforce, formação acadêmica, bootcamps e conquistas. |
| Expertise | Competências agrupadas por áreas como Salesforce, CRM Strategy, Automação, Dados, Qualidade e Métodos. |
| Projetos | Cards para site externo, demos Salesforce e views HTML incorporadas. |
| Contato | E-mail, telefone, localização, LinkedIn, GitHub e Trailblazer. |

---

## Stack utilizada

| Tecnologia | Uso no projeto |
|---|---|
| React 18 | Construção da interface e componentes. |
| Vite 5 | Servidor de desenvolvimento e build de produção. |
| Material UI 5 | Componentes visuais, tema, grid, cards, botões e responsividade. |
| Emotion | Estilização usada pelo Material UI. |
| i18next | Internacionalização da aplicação. |
| react-i18next | Integração do i18next com React. |
| i18next-browser-languagedetector | Detecção automática do idioma do usuário. |
| GSAP | Animações e interações visuais. |

---

## Estrutura do projeto

```text
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── 404.html
│   └── favicon.svg
├── projects/
│   └── customer360_generico_interativo_v4.html
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── i18n.js
    ├── components/
    │   ├── LanguageSwitcher.jsx
    │   ├── layout/
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   └── SectionNavigation.jsx
    │   ├── sections/
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Experience.jsx
    │   │   ├── Hero.jsx
    │   │   ├── PortfolioProjects.jsx
    │   │   ├── ProjectDetailPage.jsx
    │   │   ├── Projects.jsx
    │   │   └── Skills.jsx
    │   └── ui/
    │       ├── AnimatedBox.jsx
    │       └── SectionTitle.jsx
    ├── data/
    │   ├── experience.js
    │   ├── portfolioProjects.js
    │   ├── profile.js
    │   ├── projects.js
    │   └── skills.js
    ├── locales/
    │   ├── en/common.json
    │   ├── es/common.json
    │   └── pt/common.json
    ├── theme/
    │   └── theme.js
    └── utils/
        ├── i18nHelper.js
        └── scrollToSection.js
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:5173
```

### Build de produção

```bash
npm run build
```

O build final será gerado na pasta `dist`.

### Preview do build

```bash
npm run preview
```

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor local do Vite. |
| `npm run build` | Gera a versão de produção. |
| `npm run preview` | Executa um preview local do build gerado. |

---

## Manutenção do conteúdo

O projeto foi organizado para que as principais informações do portfólio sejam atualizadas sem necessidade de alterar muitos componentes.

| Arquivo | Responsabilidade |
|---|---|
| `src/data/profile.js` | Nome, título, descrição, contatos, redes, estatísticas, bio e stack principal. |
| `src/data/experience.js` | Experiências profissionais, empresas, cargos, períodos, descrições e tecnologias. |
| `src/data/projects.js` | Credenciais, certificações, formação, bootcamps e conquistas. |
| `src/data/skills.js` | Áreas de expertise, habilidades e detalhes de cada competência. |
| `src/data/portfolioProjects.js` | Projetos exibidos na seção Projetos, incluindo links externos e demos internas. |
| `src/locales/*/common.json` | Textos fixos da interface em português, inglês e espanhol. |
| `src/theme/theme.js` | Tema visual, tipografia, cores e ajustes globais do Material UI. |

---

## Como adicionar um novo projeto

Os projetos exibidos na seção `Projetos` ficam em `src/data/portfolioProjects.js`.

Para adicionar um link externo, crie um item com `kind: 'external'`:

```js
{
  id: 'meu-projeto',
  kind: 'external',
  title: {
    pt: 'Meu Projeto',
    en: 'My Project',
    es: 'Mi Proyecto',
  },
  description: {
    pt: 'Descrição do projeto.',
    en: 'Project description.',
    es: 'Descripción del proyecto.',
  },
  status: { pt: 'Site externo', en: 'External site', es: 'Sitio externo' },
  action: { pt: 'Acessar site', en: 'Open site', es: 'Abrir sitio' },
  externalUrl: 'https://exemplo.com',
  tags: ['Salesforce', 'CRM'],
  accent: '#0D4DA5',
  gradient: 'linear-gradient(135deg, #0D4DA5 0%, #1EACB8 100%)',
}
```

Para adicionar uma demo interna em HTML, use `kind: 'embed'` e informe o conteúdo em `embedHtml`. O projeto ficará acessível em uma rota como:

```text
/projects/meu-projeto
```

---

## Internacionalização

A aplicação usa `i18next` com os idiomas `pt`, `en` e `es`. O idioma inicial é detectado automaticamente nesta ordem:

1. Idioma salvo em `localStorage`
2. Idioma do navegador
3. Tag HTML

Caso nenhum idioma suportado seja encontrado, o fallback padrão é `pt`.

Textos de interface ficam nos arquivos `common.json`, enquanto dados profissionais maiores ficam em `src/data` usando objetos por idioma, por exemplo:

```js
title: {
  pt: 'Salesforce CRM Specialist',
  en: 'Salesforce CRM Specialist',
  es: 'Salesforce CRM Specialist',
}
```

---

## Deploy no GitHub Pages

O projeto está configurado para ser publicado no GitHub Pages no caminho:

```text
/crm-specialist/
```

Essa configuração está em `vite.config.js`:

```js
export default defineConfig({
  base: '/crm-specialist/',
});
```

Se o nome do repositório mudar, o valor de `base` também deve ser atualizado. O mesmo caminho aparece em `public/404.html`, que trata o redirecionamento de rotas internas quando a página é aberta diretamente pelo GitHub Pages.

Fluxo comum de publicação:

```bash
npm install
npm run build
```

Depois, publique o conteúdo da pasta `dist` conforme a estratégia escolhida para o GitHub Pages, como GitHub Actions ou branch dedicada de deploy.

---

## SEO e metadados

As informações básicas para mecanismos de busca e compartilhamento social ficam em `index.html`:

- `title`
- `meta description`
- `keywords`
- `author`
- Open Graph
- Twitter Card
- `theme-color`

Esses metadados já estão alinhados ao posicionamento profissional de Helsio Mattia como Salesforce CRM Specialist.

---

## Contato

| Canal | Link |
|---|---|
| E-mail | [helsiomattia@gmail.com](mailto:helsiomattia@gmail.com) |
| LinkedIn | [linkedin.com/in/helsiomattia](https://linkedin.com/in/helsiomattia) |
| GitHub | [github.com/helsiomattia](https://github.com/helsiomattia) |
| Trailblazer | [trailblazer.me/id/helsiomattia](https://trailblazer.me/id/helsiomattia) |

---

## Licença

Este projeto está licenciado sob os termos da licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
