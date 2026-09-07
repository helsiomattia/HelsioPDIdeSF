# Design System do Portfolio HM.crm

Este documento registra o sistema visual final do projeto `crm-specialist`. A identidade parte da metafora `CRM control room`: uma sala de controle profissional para ecossistemas Salesforce CRM, Service Operations, automacao, integracoes, dados e governanca.

## Stack

- Interface: `React 18` com `Vite 5`.
- Componentes e estilo: `Material UI 5` com `Emotion` e `sx`.
- Movimento: `GSAP` com `ScrollTrigger`.
- Idiomas: `i18next` e `react-i18next`.
- Conteudo profissional: `src/data` e `src/locales`.
- Tokens visuais: `src/theme/tokens.js`.
- Tema Material UI: `src/theme/theme.js`.

## Paleta

- `Command Navy` `#061827`: estrutura, cockpit, sombras e texto de autoridade.
- `Salesforce Core` `#0D4DA5`: acao principal, links e estados ativos.
- `Flow Cyan` `#1EACB8`: conexoes, integracao, sinais e fluxo operacional.
- `Console Mist` `#E0ECF5`: superficies frias e paineis de apoio.
- `Surface White` `#FFFFFF`: leitura, respiro e cards principais.
- `Signal Amber` `#B7791F`: certificacoes, marcos e automacao.

## Tipografia

- `Inter` e a voz principal: titulos, narrativa, navegacao, botoes e cards.
- `Fira Code` e reservado para telemetria: rotas, datas, snippets, estados tecnicos e indicadores de sistema.
- Titulos usam peso, escala e respiro como personalidade, nao destaque colorido de uma palavra isolada.
- Textos longos devem manter linhas confortaveis e alinhamento a esquerda.
- Caixa alta deve aparecer apenas onde houver comportamento de sistema ou codigo.

## Espacamento E Forma

- `--section-inline-padding`: `clamp(20px, 4.6vw, 76px)`.
- `--section-block-padding`: `clamp(40px, 6vh, 72px)`.
- `--card-gap`: `clamp(14px, 1.45vw, 24px)`.
- `visualRadii.control`: `8px` para botoes e controles compactos.
- `visualRadii.card`: `18px` para cards comuns.
- `visualRadii.panel`: `28px` para paineis principais e cockpit.
- `visualRadii.pill`: `999px` para controles circulares ou pills.

## Sombras E Estados

- `visualShadows.card`: sombra baixa para superficies de leitura.
- `visualShadows.cardHover`: elevacao discreta para cards interativos.
- `visualShadows.panel`: profundidade para cockpit, dialogs e paineis fortes.
- Foco visivel usa anel azul translucidado com `outline` e `outline-offset`.
- Hover deve confirmar interatividade, nao redesenhar o componente.
- Loading deve aparecer como sinal operacional curto, nao spinner generico sempre que possivel.
- Estado vazio deve explicar o que aconteceu e qual acao e possivel.

## Movimento

- `visualMotion.fast`: microinteracoes simples.
- `visualMotion.normal`: hover, foco e transicoes de componentes.
- `visualMotion.deliberate`: momentos mais visiveis, usados com parcimonia.
- Respeite `prefers-reduced-motion` em qualquer animacao nova.
- Evite entrada animada repetitiva em todas as secoes. A experiencia deve parecer uma ferramenta precisa, nao uma vitrine de efeitos.

## Estrutura Atual

```text
[hero cockpit]
proposta de valor + CTAs             painel CRM control room

[sobre]
retrato + narrativa                  contexto profissional

[experiencia]
timeline                             cards de detalhe por marco

[credenciais]
base principal                       aprendizados complementares

[expertise]
mapa de capacidades                  dialog de detalhe

[projetos]
central de demos                     projeto principal + demos secundarias

[contato]
CTA final                            canais priorizados
```

## Componentes-Chave

- `SectionTitle`: hierarquia visual de cada secao, alinhada a esquerda por padrao.
- `OperationalSignal`: sinal recorrente para Service Operations, automacao, integracao, dados e governanca.
- `HeroCockpit`: materializa a metafora de sala de controle na primeira dobra.
- `CapabilityMap`: transforma Expertise em mapa clicavel, nao em grade generica.
- `PortfolioProjectCard`: diferencia projeto principal e demos secundarias.

## SEO E Identidade

- Assinatura visual: `HM.crm`.
- Favicon: motivo de arquitetura CRM em SVG.
- Open Graph: `public/og-image.svg` com cockpit e proposta profissional.
- Canonical: `https://helsiomattia.github.io/crm-specialist/`.
- Theme color: `#061827` para combinar com `Command Navy`.

## Regras De Manutencao

- Ao adicionar nova cor recorrente, nomeie primeiro em `src/theme/tokens.js`.
- Ao adicionar novo texto fixo, use `src/locales`.
- Ao adicionar conteudo profissional, prefira `src/data`.
- Antes de criar componente novo, confirme que existe repeticao real ou papel semantico claro.
- Preserve acessibilidade: foco visivel, nomes acessiveis, contraste e navegacao por teclado.
- Execute `npm run build` antes de fechar qualquer versao visual.
