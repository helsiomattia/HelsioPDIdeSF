# Auditoria do Menu SectionNavigation

Data: 2026-09-04

Arquivo principal auditado: `src/components/layout/SectionNavigation.jsx`

Arquivos relacionados:

| Arquivo | Relacao com o menu |
|---|---|
| `src/utils/scrollToSection.js` | Executa scroll programatico com GSAP e controla a classe global `is-programmatic-scroll`. |
| `src/utils/routes.js` | Centraliza `pushState`, `popstate`, base path, deep links e rota `about-project`. |
| `src/App.jsx` | Monta/desmonta o menu dependendo da rota atual. |
| `src/components/layout/Navbar.jsx` | Tambem dispara navegacao para home e scroll. |

## Resumo Executivo

O menu ainda se comporta estranho porque ele acumula responsabilidades demais: indicador de secao ativa, dropdown, botoes anterior/proximo, roteamento, deep link, scroll programatico, interceptacao global de roda do mouse e interceptacao global de teclado. Essas responsabilidades competem entre si durante transicoes.

O problema mais provavel de nomes aparecendo de forma perdida vem da combinacao de `activeSection`, `stateRef.current.isAnimating`, `scrollToSection`, listener de `scroll` e atualizacoes por `popstate`. Mesmo com lock, ha janelas onde o scroll/rota pode atualizar estado fora da intencao do usuario. O problema visual no hover vem do proprio design atual do dropdown: fundo translúcido com `backdropFilter`, borda, hover background nos itens e transicoes ainda criam uma mancha visual mesmo sem `boxShadow`.

Minha recomendacao tecnica e simplificar o menu: transformar ele em um menu de links controlado por clique/foco, remover interceptacao global de wheel/teclado e separar o indicador de secao ativa da navegacao de pagina. Isso reduz drasticamente efeitos colaterais.

## Estado Atual do Componente

Responsabilidades atuais em `SectionNavigation.jsx`:

| Responsabilidade | Evidencia |
|---|---|
| Lista de secoes do portfolio | `NAVIGATION_SECTIONS`, linhas 13-21. |
| Estado visual ativo | `activeSection`, linha 58. |
| Estado do dropdown | `expanded`, linha 59. |
| Estado imperativo fora do React | `stateRef`, linha 61. |
| Escrita na URL | `setRouteState`, linhas 79-90. |
| Scroll programatico | `navigateTo`, linhas 92-102; `handlePopState`, linhas 127-137. |
| Escuta global de scroll/resize | linhas 150-151. |
| Escuta global de popstate | linha 152. |
| Interceptacao global de wheel | linhas 192-219 e 244. |
| Interceptacao global de teclado | linhas 221-242 e 245. |
| Controle de abertura por hover/foco | linhas 303-306. |
| Link para `about-project` misturado ao menu de secoes | linhas 482-521. |

## Achados Priorizados

| Gravidade | Problema | Evidencia | Impacto | Recomendacao |
|---|---|---|---|---|
| Alto | O menu intercepta `wheel` globalmente | `SectionNavigation.jsx:192-219`, `244`. | Scroll natural vira troca de secao. Isso pode parecer travado, tremido ou imprevisivel, especialmente com trackpad. | Remover interceptacao global de wheel. Deixar o usuario rolar naturalmente e usar apenas clique nos controles do menu. |
| Alto | O menu intercepta teclas globais | `SectionNavigation.jsx:221-242`, `245`. | `ArrowDown`, `ArrowUp`, `PageDown`, `PageUp`, `Home`, `End` deixam de ter comportamento nativo. Pode causar saltos e troca de label inesperada. | Remover handler global de teclado ou limitar ao foco dentro do menu. |
| Alto | Estado ativo e rota sao atualizados por varios caminhos | `setRouteState`, `navigateTo`, `handlePopState`, `updateActiveSection`. | A secao ativa pode mudar por clique, scroll, popstate ou resize. Isso explica nomes intermediarios durante transicoes. | Separar `activeSection` de `targetSection`. Durante scroll programatico, nao atualizar label por scroll. Melhor: remover atualizacao de URL no scroll. |
| Alto | Link de pagina (`about-project`) fica dentro de menu de secoes | `SectionNavigation.jsx:482-521`. | Mistura dois conceitos: secao do portfolio e rota/pagina separada. Na troca de pagina, o menu desmonta, mas ainda recebe eventos de hover/click/scroll. | Separar em grupo visual: secoes do portfolio e link de pagina. Ou mover `about-project` para navbar/header. |
| Medio/Alto | O menu abre por hover | `onMouseEnter`, `onMouseLeave`, linhas 303-304. | Em desktop, hover acidental abre o painel. Como o painel tem fundo e hover interno, parece uma sombra/mancha. | Abrir somente por clique/foco, ou adicionar delay/debounce. Para UX mais previsivel, remover abertura por hover. |
| Medio | O fundo do painel ainda cria efeito visual de sombra/mancha | `bgcolor: alpha('#E0ECF5', 0.94)`, `backdropFilter`, `border`, linhas 419-424. | Mesmo sem `boxShadow`, o backdrop blur e fundo translúcido parecem uma sombra atras do menu. | Remover `backdropFilter` do painel e reduzir/remover background do container aberto. Usar fundo solido simples. |
| Medio | Hover dos itens move cada linha horizontalmente | `transform: 'translateX(-2px)'`, linhas 458 e 500. | Pode parecer tremor quando o mouse cruza itens ou quando o painel abre perto do cursor. | Remover transform no hover; manter apenas cor/fundo. |
| Medio | Botoes anterior/proximo aplicam transform no hover | `controlButtonSx`, linha 294. | Pode causar micro deslocamento visual do menu quando o mouse passa nos controles. | Remover transform de hover dos controles. |
| Medio | `scrollToSection` chama `onComplete` tambem no interrupt | `scrollToSection.js:57-60`. | O lock de navegacao pode ser liberado cedo se uma nova animacao interromper a anterior. Isso abre janela para label intermediario. | Separar `onInterrupt` de `onComplete`; nao chamar ambos automaticamente. |
| Medio | Inicializacao sempre faz scroll para secao atual | `SectionNavigation.jsx:139-147`. | Ao montar a home, o menu pode forcar scroll mesmo quando o usuario ja esta posicionado corretamente. | No mount, apenas sincronizar estado com URL; fazer scroll inicial apenas para deep link real. |
| Medio | Atualizacao de URL durante scroll passivo | `updateActiveSection` chama `setRouteState`, linhas 115-120. | Rolar naturalmente altera a URL continuamente. Isso pode gerar historico/estado mental estranho e re-render de metadados. | Nao atualizar URL durante scroll passivo. Atualizar URL somente em clique/teclado controlado. |
| Baixo/Medio | `stateRef` e `activeSection` podem divergir | `stateRef.current.activeSection` e `activeSection` coexistem. | Estados duplicados aumentam chance de inconsistencia. | Usar um unico source of truth. Se precisar ref, sincronizar por `useEffect` dedicado. |
| Baixo | `aria-current="page"` no botao expansor nao representa pagina real | Linha 341. | Pode confundir leitor de tela: o botao abre menu, nao e a pagina atual. | Trocar para label claro, ex.: `aria-label={active.label}` e deixar `aria-current` nos itens. |

## Causas Provaveis dos Sintomas Reportados

### Sintoma 1: fundo/sombra ao passar o mouse

Mesmo apos remover `boxShadow`, ainda existem tres fontes visuais que parecem sombra:

| Fonte | Evidencia | Efeito |
|---|---|---|
| Fundo translúcido do painel | `bgcolor: alpha('#E0ECF5', 0.94)` | Mancha clara atras do menu. |
| Blur do painel | `backdropFilter: 'blur(8px)'` | Cria destaque fosco parecido com sombra. |
| Hover com transform e background | `&:hover` dos itens | Ao cruzar itens, a area se move e colore. |

Correcao recomendada:

```text
Remover abertura por hover.
Remover backdropFilter do painel.
Remover transform no hover dos itens e dos botoes.
Usar painel com background solido ou totalmente transparente.
```

### Sintoma 2: nomes de 2-3 paginas/secoes durante troca

Fluxo atual possivel:

```text
Clique em item do menu
setRouteState muda activeSection para destino
scrollToSection inicia scroll com GSAP
eventos scroll continuam disparando
updateActiveSection tenta calcular secao pelo scrollY
se lock for liberado/interruptado cedo, activeSection passa por secoes intermediarias
label do menu troca para cada secao intermediaria
```

Pontos de risco:

| Ponto | Evidencia |
|---|---|
| `scrollToSection` libera lock via `onInterrupt` e tambem chama `onComplete` | `scrollToSection.js:57-60`. |
| `updateActiveSection` depende de `window.scrollY` | `SectionNavigation.jsx:115-120`. |
| `getCurrentIndex` calcula secao por offset | `SectionNavigation.jsx:35-46`. |
| Estado do label e atualizado imediatamente | `setActiveSection(id)`, linhas 84, 132, 142, 182. |

Correcao recomendada:

```text
Durante qualquer scroll programatico, manter label fixo no destino.
Nao atualizar activeSection por scroll ate o scroll terminar de fato.
Remover chamada automatica de onComplete dentro de onInterrupt.
Preferir atualizar activeSection apenas por clique/popstate/deep link.
```

## Recomendacao de Refatoracao

### Opcao Recomendada: Menu Simples e Deterministico

Objetivo: manter visual semelhante, mas remover comportamento estranho.

Mudancas:

| Acao | Motivo |
|---|---|
| Remover `wheel` global | Evita scroll sequestrado e travadinhas. |
| Remover `keydown` global | Mantem navegacao nativa do navegador. |
| Remover abertura por hover | Evita painel aparecendo quando o mouse apenas passa. |
| Abrir painel apenas por clique | Comportamento previsivel. |
| Atualizar URL apenas em clique de menu | Evita troca de URL/label durante scroll normal. |
| Usar `IntersectionObserver` apenas para indicador, sem mexer em URL | Mais leve e sem side effects. |
| Separar link `Sobre o projeto` visualmente | Evita misturar pagina com secoes. |

Risco: baixo. O comportamento visivel muda para melhor: menos magica, menos tremor.

### Opcao Conservadora: Patch em cima do atual

Mudancas minimas:

| Acao | Risco |
|---|---|
| Remover `onMouseEnter`/`onMouseLeave` | Baixo. |
| Remover `backdropFilter` do painel e botao | Baixo. |
| Remover `transform` no hover | Baixo. |
| Fazer `scrollToSection` nao chamar `onComplete` no interrupt | Medio, pode afetar callbacks existentes. |
| Manter lock por tempo fixo maior que duracao do scroll | Medio, pode atrasar atualizacao real da secao. |
| Nao chamar `setRouteState` dentro de `updateActiveSection` | Medio, muda URL durante scroll natural. |

Risco: medio. Pode amenizar, mas ainda deixa o componente complexo.

## Plano de Correcao Sugerido

| Ordem | Acao | Arquivo | Resultado esperado |
|---:|---|---|---|
| 1 | Remover abertura por hover e manter somente clique/foco | `SectionNavigation.jsx` | Painel nao aparece acidentalmente ao passar o mouse. |
| 2 | Remover `backdropFilter`, fundo translúcido forte e transforms de hover | `SectionNavigation.jsx` | Some o efeito de sombra/mancha e tremor visual. |
| 3 | Remover interceptacao global de wheel | `SectionNavigation.jsx` | Scroll volta a ser natural e previsivel. |
| 4 | Remover interceptacao global de teclado ou limitar ao menu focado | `SectionNavigation.jsx` | Teclado deixa de causar saltos inesperados. |
| 5 | Trocar atualizacao por scroll para `IntersectionObserver` sem alterar URL | `SectionNavigation.jsx` | Label ativo fica estavel e acompanha secao real sem historico estranho. |
| 6 | Corrigir `scrollToSection` para nao chamar `onComplete` em interrupt | `scrollToSection.js` | Lock nao libera antes da hora. |
| 7 | Separar item `Sobre o projeto` dos itens de secao | `SectionNavigation.jsx` | Fica claro que e pagina, nao secao. |

## Desenho de Implementacao Recomendado

### Estado

```js
const [activeSection, setActiveSection] = useState('home');
const [expanded, setExpanded] = useState(false);
const isProgrammaticNavigationRef = useRef(false);
```

### Comportamento

```text
Clique em secao:
1. Fecha menu.
2. Marca activeSection como destino imediatamente.
3. Atualiza URL.
4. Rola ate a secao.
5. Libera lock quando scroll termina.

Scroll natural:
1. IntersectionObserver observa secoes.
2. Se nao estiver em scroll programatico, atualiza activeSection.
3. Nao altera URL.

Hover:
1. Nao abre menu.
2. Apenas altera cor do item sob cursor, sem transform.
```

## Checklist de Teste Manual

| Cenario | Resultado esperado |
|---|---|
| Passar mouse por cima do menu fechado | Nao deve abrir sozinho e nao deve aparecer sombra/fundo. |
| Clicar no menu | Painel abre sem deslocamento visual. |
| Passar mouse entre itens do painel | Itens nao devem deslocar horizontalmente. |
| Clicar em `Contato` a partir de `Inicio` | Label deve ir direto para `Contato`, sem passar por `Sobre`, `Experiencia`, etc. |
| Clicar em `Inicio` a partir de `Contato` | Label deve ir direto para `Inicio`. |
| Rolar com trackpad lentamente | Scroll deve ser natural; menu deve apenas indicar secao atual. |
| Usar `PageDown`/`PageUp` | Browser deve rolar naturalmente. |
| Clicar em `Sobre o projeto` | Menu fecha e pagina abre sem mostrar labels intermediarios. |
| Voltar do navegador | Deve voltar para a rota anterior sem loop de scroll. |
| Mobile | Menu nao deve cobrir conteudo nem abrir por hover. |

## Conclusao

O menu atual esta tecnicamente funcional, mas tem complexidade comportamental alta para um componente de navegacao lateral. A causa do comportamento estranho nao e um unico CSS: e a soma de hover automatico, transforms, blur/fundo translúcido, handlers globais de wheel/teclado e multiplas fontes atualizando `activeSection`.

Para resolver de forma definitiva, eu recomendo refatorar o menu para um modelo deterministico: clique abre, clique navega, scroll natural apenas atualiza indicador via `IntersectionObserver`, sem interceptar wheel/teclado e sem alterar URL durante scroll passivo.
