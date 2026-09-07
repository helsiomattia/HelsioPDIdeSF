# Estado Atual e Roadmap Visual do Portfolio

Este documento registra o estado atual do projeto `crm-specialist` e propoe uma evolucao visual incremental para as versoes v2, v3, v4 e v5.

A direcao principal e preservar a ideia atual do site: um portfolio profissional para Helsio Mattia, com foco em Salesforce CRM, Service Operations, automacao, integracoes, dados, governanca e arquitetura de solucoes. A evolucao deve deixar o site mais bonito, polido e autoral sem mudar tudo de uma vez.

## 1. Leitura do Projeto Atual

### Objetivo do site

O site funciona como uma vitrine profissional para apresentar:

- Posicionamento em Salesforce CRM e arquitetura de solucoes.
- Experiencia profissional em CRM, ERP, QA e operacoes.
- Credenciais, formacao e aprendizados.
- Especialidades tecnicas e de negocio.
- Projetos, demos HTML e links externos.
- Canais de contato profissional.

### Stack atual

- `React 18` como base da interface.
- `Vite 5` para desenvolvimento e build.
- `Material UI 5` e `Emotion` para componentes e estilos.
- `GSAP` e `ScrollTrigger` para animacoes e navegacao por secoes.
- `i18next` e `react-i18next` para portugues, ingles e espanhol.
- Deploy preparado para GitHub Pages com `base: /crm-specialist/`.

### Estrutura principal

- `src/App.jsx`: composicao geral da SPA, lazy loading das secoes e rotas internas.
- `src/theme/theme.js`: tema Material UI, paleta, tipografia e overrides globais.
- `src/components/sections`: secoes do site, incluindo Hero, Sobre, Experiencia, Credenciais, Expertise, Projetos e Contato.
- `src/components/layout`: Navbar, Footer e navegacao lateral entre secoes.
- `src/data`: conteudo profissional centralizado.
- `src/locales`: textos fixos da interface em tres idiomas.
- `projects`: arquivos HTML usados como demos incorporadas.

## 2. Identidade Visual Atual

### O que ja funciona

- O site tem uma direcao clara: CRM, Salesforce, dados, automacao e arquitetura.
- A paleta azul/ciano combina com o universo Salesforce e tecnologia corporativa.
- O hero ja transmite uma camada tecnica com grid, snippets, conexoes e mini-paineis.
- Os dados profissionais estao bem estruturados, facilitando evolucoes visuais sem reescrever conteudo.
- O suporte a idiomas aumenta a percepcao de maturidade do portfolio.
- Ha cuidado com responsividade, lazy loading e preferencia por movimento reduzido.

### O que enfraquece a percepcao de polimento

- `SectionTitle.jsx` aplica `className="sr-only"` no bloco inteiro do titulo, escondendo visualmente titulos, subtitulos e divisores das secoes. Isso reduz hierarquia e faz algumas areas parecerem apenas grids soltos.
- Muitos elementos usam a mesma logica visual: card arredondado, fundo translucidado, borda clara, chip pequeno e gradiente superior.
- A linguagem de chips e labels tecnicos aparece em quase todas as secoes. Ela combina com o tema, mas pode perder impacto por repeticao.
- O hero e mais autoral que o restante do site. As secoes seguintes parecem menos memoraveis.
- A documentacao `docs/VISUAL_STYLE_GUIDE.md` descreve Tailwind/shadcn, mas a implementacao atual usa Material UI/Emotion. Isso pode confundir manutencao futura.
- Existe uma tendencia a usar gradiente como solucao padrao para destaque, em vez de reservar gradiente para momentos de maior importancia.
- A tipografia usa `Inter` e `Fira Code`, mas a funcao de cada uma pode ficar mais disciplinada. `Fira Code` deve sinalizar sistema, dado, comando ou status, nao decorar todo texto pequeno.

## 3. Diagnostico de Produto e Design

### Sujeito do design

O sujeito nao e apenas "portfolio pessoal". O sujeito correto e:

Portfolio de um profissional que projeta, organiza e sustenta ecossistemas Salesforce CRM para operacoes reais.

### Publico principal

- Recrutadores tecnicos.
- Gestores de CRM, atendimento, operacoes e tecnologia.
- Times que precisam avaliar maturidade em Salesforce, automacao, integracoes e governanca.
- Pessoas que acessam o site por LinkedIn, GitHub, Trailblazer ou indicacao profissional.

### Trabalho principal da pagina

Fazer o visitante entender rapidamente que Helsio combina operacao, negocio e arquitetura Salesforce, com experiencia pratica suficiente para transformar necessidades complexas em solucoes sustentaveis.

## 4. Sistema Visual Proposto Para Evolucao

Este sistema nao exige uma troca imediata. Ele serve como trilho para as proximas versoes.

### Paleta base

- `Command Navy` - `#061827`: texto forte, fundos escuros pontuais e linguagem de console.
- `Salesforce Core` - `#0D4DA5`: acao principal, links e identidade CRM.
- `Flow Cyan` - `#1EACB8`: integracoes, movimento, fluxo e detalhes tecnicos.
- `Console Mist` - `#E0ECF5`: superficies frias, fundos de cards e paineis.
- `Surface White` - `#FFFFFF`: areas de leitura e respiro.
- `Signal Amber` - `#B7791F`: certificacoes, avisos positivos, marcos e conquistas.

### Tipografia

- `Inter`: texto principal, titulos, paragrafos e navegacao.
- `Fira Code`: apenas para dados, rotas, comandos, status tecnicos, snippets e pequenas marcacoes de sistema.
- Titulos devem ganhar presenca pelo tamanho, peso, respiro e composicao, nao por colorir apenas uma palavra.
- Corpo de texto deve manter linhas confortaveis, idealmente abaixo de 80 caracteres.
- Evitar excesso de caixa alta fora de navegacao, codigos ou estados de sistema.

### Layout

Conceito geral: `CRM control room`. O site deve parecer uma sala de controle profissional para plataformas Salesforce: mapas, trilhas, paineis, sinais e decisoes, mas com disciplina visual.

Wireframe atual simplificado:

```text
[navbar fixa]

[hero tecnico amplo]
nome + cargo + descricao + chips              ambient CRM/data layer

[sobre]
foto/card                                      texto longo em painel

[experiencia]
card card card
card card

[credenciais]
card card card
card card card

[expertise]
card card card
card card card

[projetos]
card card card card
card card card

[contato]
cta central
card card
card card
card card
```

Wireframe alvo incremental:

```text
[navbar fixa mais clara]

[hero como cockpit]
proposta de valor forte                       mapa CRM / fluxo / sinais
descricao curta                               acao principal discreta

[sobre]
retrato + resumo profissional                 narrativa com blocos de decisao

[experiencia]
linha temporal real                           cards apenas como detalhe

[credenciais]
certificacoes em destaque                     formacao e conquistas agrupadas

[expertise]
mapa de capacidades                           dialog para detalhe

[projetos]
1 projeto principal maior                     demos em grade secundaria

[contato]
mensagem direta                               canais com prioridades claras
```

### Alinhamento

- Priorizar alinhamento a esquerda para conteudo profissional e leitura rapida.
- Usar centralizacao apenas em momentos curtos: hero, CTA final ou elementos de navegacao.
- Evitar justificar texto.
- Dar mais largura para narrativa e menos peso visual para chips repetitivos.

### Principios

- Preservar a identidade atual antes de ampliar a ousadia.
- Gastar o impacto visual em poucos lugares, principalmente hero e projetos.
- Usar estrutura como informacao: timeline para experiencia, mapa para expertise, cockpit para hero.
- Reduzir decoracao tecnica quando ela nao explica nada.
- Transformar cards iguais em hierarquias: destaque, apoio, detalhe.
- Manter acessibilidade, foco visivel, responsividade e movimento reduzido.

## 5. Revisao Contra o Brief

O risco principal seria cair em um redesign generico de portfolio SaaS: muitos cards iguais, gradientes azuis, blobs e labels em caixa alta. O projeto atual ja tem parte disso, mas tambem tem uma base especifica muito boa: Salesforce, CRM, dados, arquitetura, Service Operations e demos reais.

Revisao feita antes de propor as versoes:

- Manter azul/ciano porque faz sentido para Salesforce e tecnologia corporativa, nao por ser uma escolha padrao.
- Evitar trocar para uma estetica escura total, porque seria uma mudanca brusca e poderia perder a clareza profissional atual.
- Nao propor uma nova biblioteca visual agora. O projeto ja usa Material UI e deve evoluir a partir dela.
- Nao propor uma nova fonte de display neste momento. A melhoria tipografica mais importante e disciplina de uso, escala e hierarquia.
- Reduzir, aos poucos, a dependencia de cards identicos.
- Fazer cada versao melhorar uma camada especifica: correcao, hierarquia, autoralidade, acabamento.

## 6. Roadmap Incremental

## v2 - Correcao, clareza e consistencia

Objetivo: corrigir problemas visuais evidentes e deixar o site atual mais claro sem mudar a identidade.

### Mudancas recomendadas

- Tornar `SectionTitle` visivel novamente, removendo o uso de `sr-only` no container visual.
- Revisar espacamento vertical das secoes apos os titulos ficarem visiveis.
- Atualizar ou substituir `docs/VISUAL_STYLE_GUIDE.md` para refletir Material UI/Emotion em vez de Tailwind/shadcn.
- Centralizar tokens reais de cor usados no projeto para reduzir valores duplicados como `#0B5CAB`, `#159DB3`, `#E0ECF5` e `#061827` espalhados pelos componentes.
- Reduzir labels tecnicos puramente decorativos onde o conteudo ja e claro.
- Ajustar contraste de textos secundarios e chips para leitura mais consistente.
- Manter a estrutura atual de secoes e cards.

### Resultado esperado

O site continua sendo o mesmo, mas parece mais organizado, legivel e intencional.

### Criterios de aceite

- Titulos e subtitulos aparecem visualmente em todas as secoes.
- Nenhuma secao perde responsividade no mobile.
- O visual continua reconhecivel como a versao atual.
- Build de producao passa com `npm run build`.

## v3 - Hierarquia e narrativa profissional

Objetivo: melhorar a leitura da historia profissional e dar pesos diferentes para conteudos diferentes.

### Mudancas recomendadas

- Refinar o hero para deixar a proposta de valor mais direta e menos dependente de varios chips.
- Transformar `Experiencia` em uma timeline mais clara, usando cards como blocos de detalhe, nao como grade generica.
- Separar melhor `Credenciais` entre certificacoes Salesforce, formacao academica e aprendizados complementares.
- Melhorar a secao `Projetos` com destaque para um projeto principal e os demais como demos secundarias.
- Ajustar copy de CTAs para verbos diretos: `Ver projetos`, `Abrir demo`, `Entrar em contato`, `Baixar curriculo` quando houver arquivo.
- Reduzir o uso de `Fira Code` em labels comuns.

### Resultado esperado

O visitante entende mais rapidamente quem e Helsio, o que ele resolve e quais provas sustentam esse posicionamento.

### Criterios de aceite

- A primeira dobra comunica cargo, especialidade e valor em poucos segundos.
- Experiencia e credenciais tem hierarquia visual diferente.
- Projetos nao parecem todos ter a mesma importancia.
- O conteudo continua vindo majoritariamente de `src/data`.

## v4 - Linguagem autoral de CRM Control Room

Objetivo: ampliar a personalidade visual sem abandonar a base atual.

### Mudancas recomendadas

- Consolidar a metafora `CRM control room`: hero como cockpit, expertise como mapa de capacidades e projetos como central de demos.
- Trocar parte dos grids de cards por composicoes mais especificas: mapa, linha, painel, agrupamento por dominio.
- Criar um componente visual recorrente para "sinais operacionais" com uso claro: automacao, integracao, dados, governanca, Service Operations.
- Refinar motion para menos entradas repetidas e mais uma ou duas interacoes memoraveis.
- Revisar a navegacao lateral para parecer ferramenta de orientacao da pagina, com menos peso visual no mobile.
- Melhorar paginas de projeto incorporadas com moldura mais limpa, estado de carregamento melhor e textos localizados.

### Resultado esperado

O site passa a ter uma linguagem propria, conectada ao universo de arquitetura CRM, sem parecer template de portfolio.

### Criterios de aceite

- Pelo menos duas secoes deixam de ser apenas grids de cards.
- Motion e usado com intencao, nao como efeito repetido em toda area.
- A identidade ainda usa a paleta atual, mas com contraste e hierarquia mais maduros.

## v5 - Acabamento premium e sistema final

Objetivo: transformar a evolucao visual em um sistema consistente e pronto para manutencao de longo prazo.

### Mudancas recomendadas

- Criar uma documentacao final de design system do portfolio com tokens reais de cor, tipografia, espacamento, radius, sombras e motion.
- Revisar todos os componentes para reduzir valores hardcoded duplicados.
- Padronizar estados de foco, hover, active, loading e vazio.
- Revisar SEO, Open Graph, favicon e imagem social para combinar com a identidade final.
- Melhorar performance percebida: carregamento do hero, imagens do sobre, lazy loading das demos e fallback visual.
- Fazer uma rodada de acessibilidade visual: contraste, ordem de foco, nomes acessiveis, labels e navegacao por teclado.
- Considerar uma assinatura visual proprietaria: por exemplo, uma pequena marca `HM.crm` mais refinada e um motivo grafico de arquitetura CRM.

### Resultado esperado

O site fica mais polido, consistente e memoravel, mantendo a mesma base conceitual que existe hoje.

### Criterios de aceite

- O portfolio parece uma evolucao natural da versao atual, nao outro site.
- Componentes principais seguem tokens documentados.
- Experiencia mobile e desktop estao revisadas.
- Build passa e a documentacao explica como manter o padrao.

## 7. Prioridades Praticas

### Fazer primeiro

- Corrigir `SectionTitle` escondido.
- Atualizar documentacao visual para refletir a stack real.
- Revisar repeticao de chips, gradients e labels tecnicos.
- Ajustar hierarquia do hero e das secoes principais.

### Evitar agora

- Trocar toda a paleta.
- Trocar Material UI por outra stack.
- Redesenhar todas as secoes na mesma versao.
- Adicionar animacoes em excesso.
- Criar mais decoracao sem funcao informacional.

### Decisoes que podem esperar

- Nova fonte de display.
- Modo escuro completo.
- Reestruturacao profunda das rotas.
- Redesign das demos HTML internas.
- Criacao de uma marca visual mais formal.

## 8. Observacoes Tecnicas Para Futuras Implementacoes

- Cuidado com especificidade de seletores e estilos `sx` muito espalhados. A medida que o design amadurecer, mover tokens para `theme.js` ou constantes compartilhadas reduz divergencia.
- Evitar transformar cada ajuste visual em novo componente. Primeiro estabilizar padroes; depois extrair componentes quando houver repeticao real.
- Preservar o conteudo em `src/data` e `src/locales`, evitando textos profissionais hardcoded nos componentes.
- Manter `prefers-reduced-motion` respeitado em qualquer nova animacao.
- Testar mobile a cada versao, especialmente por causa da navegacao lateral e secoes de altura proxima a `100dvh`.

## 9. Resumo Executivo

O site atual tem uma boa ideia e uma identidade coerente com Salesforce CRM. Ele nao precisa de uma ruptura visual. Precisa de uma evolucao controlada: primeiro corrigir hierarquia e documentacao, depois melhorar narrativa, depois tornar a linguagem visual mais autoral, e por fim consolidar um sistema premium.

A melhor direcao e transformar o portfolio em uma experiencia de `CRM control room`: clara, tecnica, confiavel e distinta, com o visual trabalhando a favor da historia profissional.
