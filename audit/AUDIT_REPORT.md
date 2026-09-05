# Auditoria Tecnica Completa - crm-specialist

Data da auditoria: 2026-09-04

Projeto auditado: SPA React + Vite publicada no GitHub Pages em `https://helsiomattia.github.io/crm-specialist/`.

Comandos executados:

```bash
npm run build
npm audit --omit=dev
npm audit
```

Resultado dos comandos:

| Comando | Resultado |
|---|---|
| `npm run build` | Passou com sucesso. Vite emitiu aviso de chunk maior que 500 kB. |
| `npm audit --omit=dev` | 0 vulnerabilidades em dependencias de producao. |
| `npm audit` | 6 vulnerabilidades em tooling/dev: 1 baixa, 1 moderada e 4 altas. |

## Resumo Executivo

O projeto esta funcional, organizado em componentes por secao, com dados centralizados em `src/data`, deploy automatizado por GitHub Actions e `base: '/crm-specialist/'` correto para GitHub Pages. O build de producao passa.

Os principais riscos estao em quatro frentes: roteamento manual fragil, acessibilidade prejudicada por titulos visualmente ocultos, performance impactada por imagens e embeds HTML importados cedo, e seguranca dos iframes/embeds com sandbox permissivo. Tambem faltam guardrails basicos de engenharia, como lint, testes e checagens no CI antes do deploy.

## Top 10 Prioridades

| Prioridade | Gravidade | Item | Impacto | Recomendacao curta |
|---:|---|---|---|---|
| 1 | Alto | `SectionTitle` esta ocultando todos os titulos de secao | Afeta UX, SEO visual, leitura e acessibilidade | Remover `className="sr-only"` do wrapper visual |
| 2 | Alto | Roteamento manual consome `sessionStorage` em dois lugares | Deep links de secoes podem cair na home sem scroll correto | Centralizar parsing de rotas/redirecionamento |
| 3 | Alto | `ProjectDetailPage` e HTMLs `?raw` entram cedo no bundle | Aumenta JS inicial e reduz performance | Lazy-load da pagina de projeto e HTML sob demanda |
| 4 | Alto | Vulnerabilidades em dependencias de desenvolvimento/tooling | Risco em dev server e cadeia de build | Atualizar Vite/toolchain e reexecutar `npm audit` |
| 5 | Medio/Alto | `iframe srcDoc` com `allow-scripts allow-same-origin` | Isolamento fraco para HTML embutido | Remover `allow-same-origin` ou isolar origem |
| 6 | Medio | 11 JPEGs importadas/renderizadas no About | Peso de assets alto para avatar pequeno | Gerar WebP/AVIF e carregar apenas imagem ativa/proxima |
| 7 | Medio | Navegacao intercepta wheel/teclas globalmente | Pode prejudicar teclado, leitores de tela e UX nativa | Reduzir interceptacao global e preservar scroll nativo |
| 8 | Medio | SEO incompleto para SPA e rotas internas | Menor qualidade de compartilhamento/indexacao | Adicionar canonical, sitemap, robots e head por rota |
| 9 | Medio | Falta lint/test/type-check | Regressao dificil de detectar | Adicionar ESLint, Prettier, Vitest/Testing Library |
| 10 | Baixo/Medio | CI/CD so instala e faz build | Deploy pode publicar codigo sem qualidade minima | Incluir audit, lint e testes no workflow |

## 1. Arquitetura e Estrutura

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Alto | Roteamento manual duplicado e fragil | `src/App.jsx:20-54` e `src/components/layout/SectionNavigation.jsx:20-46` repetem `stripBasePath`, parsing de URL e consumo de `sessionStorage`. | Criar um modulo unico de roteamento ou adotar React Router com `basename={import.meta.env.BASE_URL}`. |
| Alto | Deep links de secoes podem perder redirecionamento do GitHub Pages | `src/App.jsx:28-31` remove `crm-specialist-redirect`; `SectionNavigation.jsx:33-35` tambem tenta ler/remover a mesma chave. Se o redirect for `/about`, o `App` remove antes da navegacao de secao tratar. | Separar chave de rota de projeto e chave de secao, ou deixar uma unica camada consumir e propagar a rota resolvida. |
| Medio | Navegacao interna usa `window.history` diretamente | `Navbar.jsx:54`, `PortfolioProjects.jsx:27-28`, `SectionNavigation.jsx:110-117`. `pushState` nao dispara `popstate` automaticamente; o projeto contorna em um local, mas nao em todos. | Centralizar `navigate()` e disparar evento customizado consistente, ou migrar para React Router. |
| Medio | `ProjectDetailPage` e dados de projetos estao acoplados a HTML bruto | `ProjectDetailPage.jsx:15` importa `getPortfolioProjectById`; `portfolioProjects.js:1-6` importa seis HTMLs com `?raw`. | Separar metadados dos projetos do conteudo HTML embutido e carregar HTML apenas ao abrir a demo. |
| Baixo | Nome do pacote ainda e generico/antigo | `package.json:2` usa `"name": "personal-site"`. | Renomear para `crm-specialist` para alinhar metadados do projeto. |
| Baixo | Arquivos de prompt/historico na raiz aumentam ruido | Arquivos como `ajustesite.txt`, `performance.txt`, `perf.txt`, `Audit.txt`, `NewInicio.txt` ficam misturados com codigo fonte. | Mover para `docs/prompts/`, `docs/archive/` ou remover o que nao fizer parte do produto. |

Pontos positivos:

| Item | Evidencia |
|---|---|
| Estrutura principal clara | `src/components`, `src/data`, `src/locales`, `src/theme`, `src/utils`. |
| Conteudo profissional centralizado | Dados de perfil, experiencia, skills e projetos ficam em `src/data`. |
| Lazy loading parcial | `App.jsx:10-16` usa `lazy()` para varias secoes. |

## 2. Engenharia e Qualidade de Codigo

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Alto | Titulos de secao invisiveis por erro estrutural | `src/components/ui/SectionTitle.jsx:20` aplica `className="sr-only"` ao wrapper inteiro que contem overline, `h2`, subtitulo e divisor. | Remover `sr-only` do wrapper. Se precisar de texto exclusivo para leitor de tela, criar elemento separado oculto. |
| Medio | `SectionNavigation` concentra muita responsabilidade | `SectionNavigation.jsx` tem 532 linhas, controla URL, scroll, teclado, wheel, menu expansivel, GSAP e estado ativo. | Dividir em utilitarios de rota/scroll e componentes menores, ou simplificar com roteador. |
| Medio | Estado/efeitos dependem fortemente de APIs globais | Uso direto de `window`, `document`, `sessionStorage`, `history`, `matchMedia` em varios componentes. | Encapsular em helpers testaveis e proteger chamadas caso evolua para SSR/SSG. |
| Medio | Logica visual depende de strings traduzidas | `src/components/sections/Projects.jsx:151-169` compara status com `In production` e `Active`. Os dados atuais sao traduzidos e podem nao bater. | Usar campo estavel como `statusType: 'production' | 'active' | 'neutral'`. |
| Medio | Tratamento de clipboard nao cobre falha | `Contact.jsx:145-148` usa `navigator.clipboard.writeText(...).then(...)` sem `.catch`. | Tratar falha com fallback ou feedback de erro. |
| Baixo | Sem scripts de qualidade | `package.json:6-9` so tem `dev`, `build`, `preview`. | Adicionar `lint`, `format`, `test` e, se possivel, `test:a11y`. |
| Baixo | Sem tipagem | Projeto usa JS/JSX puro, sem TypeScript ou PropTypes. | Para evolucao segura, considerar TypeScript gradualmente ou PropTypes nos componentes publicos. |
| Baixo | Comentarios mistos e alguns desatualizados | Exemplo: `src/data/profile.js:85` comenta avatar, mas componente usa imagens locais diretamente. | Atualizar comentarios ou remover comentarios que nao refletem o codigo atual. |

Cobertura de testes:

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Medio | Nao ha testes unitarios, integracao ou e2e | Nenhum arquivo de teste encontrado e nenhum script de teste em `package.json`. | Comecar por testes de smoke para renderizacao, navegacao, idioma, cards de contato e rotas de projeto. |
| Medio | Sem teste de acessibilidade automatizado | Nao ha `axe`, Testing Library ou Playwright. | Adicionar `@testing-library/react`, `vitest` e `jest-axe`, ou Playwright com checagem basica de a11y. |

## 3. Performance

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Alto | Bundle inicial inclui caminho para demos HTML cedo demais | `App.jsx:8` importa `ProjectDetailPage` de forma eager; `ProjectDetailPage.jsx:15` importa dados; `portfolioProjects.js:1-6` importa seis HTMLs com `?raw`. | Trocar para `const ProjectDetailPage = lazy(() => import(...))` e carregar `embedHtml` por `import()` apenas na rota do projeto. |
| Medio | `vendor` esta acima do limite recomendado pelo Vite | Build gerou `assets/vendor-C1QPy8it.js` com 530.00 kB, gzip 179.42 kB, e aviso de chunk maior que 500 kB. | Medir com bundle visualizer. Separar `react`, `mui`, `animation` e `i18n`, ou remover `manualChunks` e comparar. |
| Medio | Muitas imagens JPEG carregadas no About | `About.jsx:18-28` importa 11 imagens; `About.jsx:219-238` renderiza todas dentro do avatar, alternando por opacidade. Build mostrou imagens entre 102 kB e 222 kB cada. | Gerar variantes WebP/AVIF em dimensoes adequadas, usar `srcset/sizes` e renderizar apenas foto ativa/proxima. |
| Medio | Imagens decorativas sem lazy loading | `About.jsx:64-89` renderiza imagens decorativas de fundo sem `loading="lazy"` ou `decoding="async"`. | Adicionar lazy/async em imagens fora da primeira dobra e revisar se precisam existir no DOM. |
| Medio | Muitas animacoes, blur e sombras podem custar em mobile | `App.jsx:151-190` define varias animacoes globais; componentes usam `backdropFilter`, `filter: blur`, sombras e animacoes recorrentes. | Reduzir efeitos em mobile e respeitar `prefers-reduced-motion` tambem na quantidade de elementos animados. |
| Baixo | Fontes externas carregam 8 pesos no total | `index.html:20-22` carrega Inter 400-800 e Fira Code 400-600. | Reduzir pesos se possivel e considerar self-host das fontes para cache/controle. |

Arquivos principais gerados no build:

| Arquivo | Tamanho | Gzip |
|---|---:|---:|
| `dist/assets/vendor-C1QPy8it.js` | 530.00 kB | 179.42 kB |
| `dist/assets/index-dgCZVAqm.js` | 253.64 kB | 63.18 kB |
| `dist/assets/Skills-C2V-cazM.js` | 22.46 kB | 8.11 kB |
| `dist/assets/AboutProjectPage-CDB24Yss.js` | 15.58 kB | 4.88 kB |
| `dist/assets/Experience-CTn98Mpx.js` | 13.59 kB | 4.84 kB |

Maiores imagens geradas:

| Arquivo | Tamanho |
|---|---:|
| `mepic (11)-B1YsVg6O.jpeg` | 222.32 kB |
| `mepic (8)-BMMcEa8T.jpeg` | 217.66 kB |
| `mepic (9)-B6uryh9-.jpeg` | 208.04 kB |
| `mepic (5)-B_NoLnHx.jpeg` | 175.89 kB |
| `mepic (10)-KPfRRTDx.jpeg` | 161.44 kB |

Core Web Vitals esperados:

| Metrica | Risco | Motivo | Recomendacao |
|---|---|---|---|
| LCP | Medio | JS inicial e fontes externas podem atrasar renderizacao. | Reduzir JS inicial, otimizar fontes e evitar carregar assets nao usados na primeira dobra. |
| CLS | Baixo/Medio | Layout usa dimensoes definidas em muitos elementos, mas iframes ajustam altura dinamicamente. | Reservar alturas previsiveis para iframes e imagens. |
| INP | Medio | Interceptacao global de wheel/keydown e animacoes podem aumentar trabalho em interacoes. | Simplificar handlers globais e limitar animacoes em dispositivos modestos. |

## 4. Seguranca

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Alto | Vulnerabilidades em tooling/dev | `npm audit` reportou vulnerabilidades em `@babel/core`, `browserslist`, `esbuild`, `nanoid`, `postcss` e `vite`. | Rodar `npm audit fix`, avaliar upgrades de Vite/toolchain e testar build. Se necessario, planejar upgrade major. |
| Medio/Alto | `iframe srcDoc` com sandbox permissivo | `ProjectDetailPage.jsx:237-238` usa `srcDoc={project.embedHtml}` e `sandbox="allow-scripts allow-same-origin"`. | Remover `allow-same-origin` se possivel. Se precisar de scripts, manter sandbox minimo e validar mensagens. |
| Medio | Embeds usam `postMessage('*')` | `projects/Customer_Journey_360_Generic.html:14`, `Intelligence360_Generic.html:49`, `Revenue_Churn_Intelligence_Generic.html:15`, `Salesforce_Architecture_Control_Center_Generic.html:61`, `Service360_Generic_Embed_V2.html:201`. | Enviar para origem especifica quando possivel e validar `event.origin`, `event.source` e payload no receptor. |
| Baixo/Medio | Dados pessoais ficam no codigo | `src/data/profile.js:73-74` contem e-mail e telefone. | Se for intencional para portfolio, aceitar. Se privacidade importar, ocultar telefone ou usar formulario/servico externo. |
| Baixo | Actions nao estao pinadas por SHA | `.github/workflows/deploy.yml:24`, `27`, `39`, `54` usam tags de actions. | Para supply chain mais rigida, pin por SHA ou habilitar Dependabot para GitHub Actions. |
| Baixo | Sem headers de seguranca configuraveis no GitHub Pages | Hospedagem estatica no GitHub Pages limita CSP/HSTS customizados. | Se precisar de CSP forte, avaliar Cloudflare Pages/Netlify/Vercel ou proxy com headers. |

Pontos positivos de seguranca:

| Item | Evidencia |
|---|---|
| Dependencias de producao sem vulnerabilidades conhecidas no audit | `npm audit --omit=dev` retornou 0 vulnerabilidades. |
| Links externos React usam protecao basica | Links com `target="_blank"` inspecionados usam `rel="noopener noreferrer"`. |
| Sem segredos evidentes | Nao foram encontrados tokens, chaves API ou credenciais sensiveis no codigo fonte inspecionado. |

## 5. SEO

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Medio | Falta canonical | `index.html` tem metatags basicas, mas nao ha `<link rel="canonical">`. | Adicionar canonical para `https://helsiomattia.github.io/crm-specialist/`. |
| Medio | Falta imagem social | `index.html:11-17` tem OG/Twitter, mas nao tem `og:image` nem `twitter:image`. | Criar imagem 1200x630 otimizada e apontar URLs absolutas. |
| Medio | Sem `robots.txt` e `sitemap.xml` | `public` contem apenas `favicon.svg` e `404.html`. | Adicionar `public/robots.txt` e `public/sitemap.xml` com URLs principais. |
| Medio | Head nao muda por rota SPA | Rotas de projeto renderizam conteudo em `ProjectDetailPage.jsx:191-195`, mas o `<head>` continua generico. | Atualizar `document.title`/metas por rota ou usar prerender/SSG. |
| Baixo/Medio | `html lang` fixo apesar de i18n | `index.html:2` fixa `pt-BR`; `i18n.js:18-27` suporta `pt`, `en`, `es`. | Atualizar `document.documentElement.lang` ao trocar idioma. Para SEO multilíngue, usar URLs por idioma e `hreflang`. |
| Baixo | Keywords existem, mas tem peso limitado | `index.html:8` define keywords. | Priorizar titulo, descricao, conteudo semantico, schema e links; keywords podem ficar, mas nao sao fator principal. |

## 6. Acessibilidade

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Alto | Titulos principais de secao estao escondidos visualmente | `SectionTitle.jsx:20` usa `.sr-only` no container inteiro. | Corrigir imediatamente para restaurar titulos visuais e hierarquia de conteudo. |
| Medio | Cards de contato simulam links | `Contact.jsx:227-232` usa `component="div"`, `role="link"`, `tabIndex` e handlers manuais. | Preferir `component="a"` com `href`; manter botao de copia como controle separado. |
| Medio | Cards de skill simulam botoes | `Skills.jsx:176-179` usa `role="button"`, `tabIndex` e teclado manual. | Usar `ButtonBase`, `CardActionArea` ou `<button>` estilizado. |
| Medio | Interceptacao global de teclado pode atrapalhar navegacao assistiva | `SectionNavigation.jsx:261-285` captura `PageDown`, `ArrowDown`, `PageUp`, `ArrowUp`, `Home`, `End` no `window`. | Evitar capturar globalmente ou tornar opcional. Preservar comportamento nativo quando foco estiver no documento. |
| Baixo | Language switcher nao expõe estado ativo semanticamente | `LanguageSwitcher.jsx:17-20` so altera `variant` visual. | Adicionar `aria-pressed` e `aria-label` completo por idioma. |
| Baixo | Imagens do avatar usam `alt=""` mesmo quando uma esta visivel | `About.jsx:219-238` renderiza imagens com `alt=""`; o `Avatar` tem `aria-label`. | Aceitavel se a imagem for decorativa. Se a foto identificar a pessoa, usar texto alternativo na imagem ativa. |

## 7. Responsividade e UX

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Medio | Scroll por secoes pode parecer travado em desktop | `SectionNavigation.jsx:232-285` intercepta wheel e teclado para navegar por blocos. | Testar com mouse, trackpad e teclado. Reduzir agressividade ou permitir scroll natural. |
| Medio | Titulos de secao ausentes prejudicam compreensao visual | Mesmo achado de `SectionTitle.jsx:20`. | Corrigir antes de ajustes visuais finos. |
| Medio | Estados de loading usam fallback nulo | `App.jsx:228` e `App.jsx:236` usam `<Suspense fallback={null}>`. | Adicionar fallback leve/skeleton para conexoes lentas. |
| Baixo/Medio | Navegacao mobile fixa pode sobrepor conteudo | `SectionNavigation.jsx:347-359` posiciona nav no topo em mobile com `position: fixed`. | Validar em telas pequenas e com zoom; garantir que nao cubra conteudo/foco. |
| Baixo | UX de erro existe apenas para projeto inexistente | `ProjectDetailPage.jsx:120-137` cobre projeto nao encontrado. | Manter e expandir feedback para falhas de clipboard ou embeds. |

Pontos positivos de UX:

| Item | Evidencia |
|---|---|
| Layout responsivo usa breakpoints MUI | Varios componentes usam `xs`, `sm`, `md`, `lg`, `xl`. |
| Reducao de movimento foi considerada | `App.jsx:197-206`, `About.jsx:99-108`, `SectionNavigation.jsx:199-207`. |
| Rotas internas de projeto tem pagina de erro | `ProjectDetailPage.jsx:120-137`. |

## 8. Infra e Deploy

| Gravidade | Problema | Evidencia | Recomendacao |
|---|---|---|---|
| Medio | Pipeline nao executa lint/test/audit | `.github/workflows/deploy.yml:32-40` roda `npm ci`, `npm run build` e publica. | Inserir etapas de `npm audit --omit=dev`, `npm run lint` e `npm test` quando existirem. |
| Medio | Fallback 404 nao preserva hash | `public/404.html:11-18` guarda apenas path e search no redirect final. | Preservar `window.location.hash` e testar deep links com hash/secoes. |
| Baixo | Workflow nao usa `actions/configure-pages` | `.github/workflows/deploy.yml` faz upload e deploy direto. | Considerar `actions/configure-pages@v5` para alinhamento com exemplos oficiais do GitHub Pages. |
| Baixo | Integridade de embeds incompleta | `projects/SHA256SUMS.txt` lista 4 HTMLs, mas `portfolioProjects.js:1-6` importa 6 HTMLs. | Atualizar hashes para todos os embeds ou remover o arquivo se nao for usado. |
| Baixo | Node esta fixo em 20, o que e bom, mas sem matriz | `.github/workflows/deploy.yml:29` usa Node 20. | Manter Node 20. Se o projeto crescer, validar tambem no Node LTS seguinte. |

Pontos positivos de infra:

| Item | Evidencia |
|---|---|
| `base` correto para GitHub Pages | `vite.config.js:6` usa `base: '/crm-specialist/'`. |
| Deploy automatizado por push na main | `.github/workflows/deploy.yml:3-7`. |
| Permissoes do workflow sao enxutas | `.github/workflows/deploy.yml:9-12` usa `contents: read`, `pages: write`, `id-token: write`. |
| Usa `npm ci` no CI | `.github/workflows/deploy.yml:32-33`. |

## Plano de Acao Priorizado

| Ordem | Acao | Esforco | Resultado esperado |
|---:|---|---|---|
| 1 | Corrigir `SectionTitle` para exibir titulos | Baixo | Recupera UX, hierarquia visual e semantica imediatamente. |
| 2 | Centralizar roteamento/redirecionamento | Medio | Elimina bugs de deep link e inconsistencias entre home/projetos/secoes. |
| 3 | Lazy-load de `ProjectDetailPage` e HTMLs embed | Medio | Reduz JS inicial e melhora tempo de carregamento. |
| 4 | Otimizar imagens do About | Medio | Reduz trafego de assets e melhora LCP/INP em dispositivos modestos. |
| 5 | Endurecer sandbox dos iframes e `postMessage` | Medio | Reduz risco de XSS/escape em demos embutidas. |
| 6 | Atualizar Vite/tooling e resolver `npm audit` | Medio | Remove vulnerabilidades conhecidas de dev/build. |
| 7 | Adicionar scripts de lint/format/test | Medio | Melhora qualidade e previne regressao. |
| 8 | Incluir checagens no GitHub Actions | Baixo/Medio | Evita deploy automatico de codigo com falhas basicas. |
| 9 | Completar SEO tecnico | Baixo | Melhora compartilhamento, indexacao e clareza por rota. |
| 10 | Refinar acessibilidade de contatos, skills e idioma | Baixo/Medio | Melhora navegacao por teclado/leitores de tela. |

## Validacao Final

O build atual esta saudavel do ponto de vista funcional, mas com aviso de bundle:

```text
vite v5.4.21 building for production...
1064 modules transformed.
Some chunks are larger than 500 kB after minification.
vendor-C1QPy8it.js: 530.00 kB, gzip 179.42 kB
Build completed successfully.
```

Conclusao: o projeto pode ser publicado, mas eu corrigiria primeiro `SectionTitle`, roteamento do fallback 404 e lazy loading dos embeds, porque esses tres itens combinam maior impacto visual, funcional e de performance com esforco relativamente controlado.
