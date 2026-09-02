# Guia Visual do Projeto

Este documento descreve a identidade visual do Skill Shine para servir como base em outros projetos e manter o mesmo padrao visual.

## Essencia Visual

- Visual limpo, moderno, educacional e profissional, com foco em carreira, habilidades e progresso.
- Interface clara, com bastante espaco em branco, cards arredondados, bordas suaves e sombras leves.
- Linguagem visual inspirada em produtos SaaS, dashboards de aprendizado e ecossistema Salesforce.
- Sensacao geral: confiavel, organizada, amigavel, tecnica sem parecer pesada.
- Priorize contraste entre superficies brancas, fundo `slate-50` e destaques em azul/ciano.

## Stack Visual

- Tailwind CSS como principal sistema de estilos.
- Tokens globais em CSS usando variaveis HSL.
- Componentes base no padrao shadcn/ui, com Radix UI por baixo em varios controles.
- Iconografia com `lucide-react`.
- Animacoes com `framer-motion` e `tailwindcss-animate`.
- Fonte principal: `Inter` aplicada globalmente.
- O CSS de app fica vazio; estilos globais ficam em `src/index.css`.

## Paleta De Cores

Use os tokens abaixo como fonte principal. Eles podem ser copiados para `:root` em novos projetos.

```css
:root {
  --background: 220 25% 97%;
  --foreground: 220 40% 13%;
  --card: 0 0% 100%;
  --card-foreground: 220 40% 13%;
  --popover: 0 0% 100%;
  --popover-foreground: 220 40% 13%;
  --primary: 215 85% 35%;
  --primary-foreground: 0 0% 100%;
  --secondary: 185 72% 42%;
  --secondary-foreground: 0 0% 100%;
  --muted: 220 20% 92%;
  --muted-foreground: 220 15% 50%;
  --accent: 30 90% 55%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 72% 55%;
  --destructive-foreground: 0 0% 100%;
  --border: 220 20% 88%;
  --input: 220 20% 88%;
  --ring: 215 85% 35%;
  --radius: 0.75rem;
  --success: 150 60% 40%;
  --success-foreground: 0 0% 100%;
  --warning: 40 90% 50%;
  --warning-foreground: 0 0% 100%;
}
```

## Cores Por Uso

- Fundo da aplicacao: `bg-slate-50` ou `bg-background`.
- Superficies principais: `bg-white`, `bg-card`, `border-slate-200`, `border-border/50`.
- Texto principal: `text-slate-900`, `text-slate-950`, `text-foreground`.
- Texto secundario: `text-slate-600`, `text-muted-foreground`.
- Texto auxiliar: `text-slate-400`, `text-slate-500`.
- Acoes principais: `bg-blue-600 text-white`, hover `bg-blue-700` ou `bg-blue-500` em secoes escuras.
- Destaques frios: `blue`, `cyan`, `teal`.
- Destaques quentes: `amber`, `orange`, `purple`, `pink` para categorias e badges especificos.
- Secoes escuras: `bg-slate-900` ou `bg-slate-950`, texto `text-white`, conteudo secundario `text-slate-300`.

## Gradientes

Use gradientes com moderacao, principalmente em titulos, heros e ilustracoes.

```css
--gradient-primary: linear-gradient(135deg, hsl(215 85% 35%), hsl(185 72% 42%));
--gradient-hero: linear-gradient(160deg, hsl(220 40% 13%) 0%, hsl(215 85% 25%) 50%, hsl(185 72% 35%) 100%);
--gradient-card: linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(220 25% 97%) 100%);
```

- Texto em destaque: `text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500`.
- Cards ilustrativos: `bg-gradient-to-br from-white via-sky-50 to-blue-100`.
- Piramide e blocos de progresso: gradientes verticais suaves como `from-blue-100 to-blue-50`, `from-teal-100 to-teal-50`, `from-amber-100 to-amber-50`.

## Tipografia

- Fonte primaria: `Inter`, fallback `sans-serif`.
- Use `font-display` e `font-body` apontando para `Inter`.
- Titulo hero: `font-extrabold`, `tracking-tight`, `leading-[1.04]`, tamanho fluido ou responsivo.
- Titulo de pagina: `text-4xl md:text-5xl` ou `text-4xl md:text-6xl` em paginas de maior impacto.
- Titulos de secao: `text-3xl md:text-4xl`, `font-bold`, `text-slate-900`.
- Titulos de card: `text-xl` ou `text-2xl`, `font-bold`.
- Texto de apoio: `text-lg leading-8 text-slate-600`.
- Texto de card: `text-sm leading-relaxed text-slate-600`.
- Labels pequenos: `text-xs font-bold uppercase tracking-[0.18em]`.

## Escala De Layout

- Container padrao: `max-w-7xl mx-auto px-4 lg:px-6`.
- Container de hero especifico: `max-w-[1200px]`.
- Container de paginas textuais: `max-w-5xl`.
- Espacamento vertical de pagina: `py-6`, `space-y-8` ou `space-y-10`.
- Espacamento de hero: `px-6 py-10 md:px-12 md:py-12` ou `md:py-16`.
- Home hero: `px-[clamp(24px,5vw,72px)] py-[clamp(3.5rem,5vw,4.5rem)]`.
- Grids principais: `grid gap-6`, com `md:grid-cols-2`, `lg:grid-cols-3` ou `lg:grid-cols-4`.
- Layout de avaliacao: `lg:grid-cols-12`, conteudo `xl:col-span-8`, painel lateral `xl:col-span-4`.

## Bordas E Raios

O visual depende bastante de cantos grandes e amigaveis.

- Radius base: `--radius: 0.75rem`.
- Radius Tailwind customizados:
- `rounded-card`: `1.75rem`.
- `rounded-section`: `2rem`.
- `rounded-feature`: `2.25rem`.
- `rounded-panel`: `2.5rem`.
- Pills e CTAs: `rounded-2xl`.
- Cards internos e badges: `rounded-xl`, `rounded-2xl`, `rounded-3xl`.
- Icon containers: `rounded-xl`, `rounded-2xl`, `rounded-[20px]`, `rounded-section`.

## Sombras

As sombras devem ser suaves, azuladas ou slate, sem parecer pesadas.

```css
--shadow-card: 0 4px 24px -4px hsl(215 85% 35% / 0.08);
--shadow-card-hover: 0 12px 40px -8px hsl(215 85% 35% / 0.15);
--shadow-hero: 0 20px 60px -15px hsl(215 85% 35% / 0.3);
```

- Cards simples: `shadow-sm` ou `shadow-card`.
- Paineis destacados: `shadow-panel`.
- Hover de card: `hover:shadow-md`, `hover:shadow-panel`, `hover:shadow-xl hover:shadow-slate-200/60`.
- CTA azul: `shadow-blue-glow-sm` ou `shadow-blue-glow`.
- Hero ilustrativo: `shadow-2xl shadow-blue-200/50`.

## Blobs E Decoracao

Use elementos absolutos borrados no fundo para dar profundidade.

- Padrao: `absolute rounded-full bg-blue-400/10 blur-blob`.
- Segundo blob: `bg-cyan-500/10 blur-blob`.
- Tamanhos recorrentes: `h-[400px] w-[400px]`, `h-[500px] w-[500px]`, `h-[600px] w-[600px]`.
- Em heros: posicione fora da area visivel com `-left-32 -top-32` e `-bottom-32 -right-32`.
- Em secoes escuras: use `bg-cyan-500/10` e `bg-blue-500/10` com `blur-blob-lg`.
- Sempre use `pointer-events-none` quando o blob nao for interativo.

## Navegacao

- Header sticky: `sticky top-0 z-50`.
- Altura: `h-14`.
- Fundo: `bg-white/60 backdrop-blur-xl`, borda `border-white/40`, sombra `shadow-sm`.
- Desktop: menu centralizado, `gap-8`, texto `text-sm text-slate-600`.
- Link ativo: `text-blue-600 font-semibold`.
- Hover: `hover:text-blue-600`.
- Mobile: botao simples de menu, painel absoluto abaixo do header com `bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md`.
- Seletor de idioma: icone `Globe`, bandeiras em botoes circulares `h-7 w-7 rounded-full`.

## Footer

- Fundo: `bg-white/90`.
- Borda superior: `border-t border-slate-200`.
- Container: `max-w-[1200px] px-4 py-10 lg:px-6`.
- Grid desktop: `md:grid-cols-[1.35fr_0.85fr_0.9fr]`.
- Textos discretos: `text-sm text-slate-600`, metadados `text-xs text-slate-500`.
- Links com hover azul: `transition hover:text-blue-600`.

## Hero Sections

Heros sao grandes paineis arredondados, com fundo branco, borda clara, sombra e blobs.

Padrao recomendado:

```tsx
<section className="relative overflow-hidden rounded-panel border border-slate-200 bg-white px-6 py-10 shadow-panel md:px-12 md:py-16">
  <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-blob" />
  <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-blob" />
  <div className="relative z-10 space-y-6">...</div>
</section>
```

- Badge no topo: pill com icone, `border-blue-200 bg-blue-50 text-blue-700`.
- Titulo: grande, escuro, forte, `font-extrabold tracking-tight`.
- Subtitulo: max-width limitado, `text-lg leading-relaxed text-slate-600`.
- CTAs abaixo do texto, em coluna no mobile e linha no desktop.

## Cards

Cards sao o principal bloco visual do projeto.

- Base: `rounded-card border border-slate-200 bg-white p-6 shadow-sm`.
- Hover: `transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md`.
- Cards mais importantes: `border-2 border-slate-100`.
- Cards internos de conteudo: `rounded-3xl border border-slate-200 bg-slate-50/70 p-5`.
- Cards escuros: `border border-white/10 bg-white/[0.04] text-slate-300`.
- Sempre agrupe conteudo com `space-y-3`, `space-y-4` ou `space-y-6`.

## Badges E Pills

- Badge principal: `inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700`.
- Badge de contexto: `text-xs font-bold uppercase tracking-[0.18em] text-blue-600`.
- Tag simples: `inline-flex items-center rounded-lg bg-slate-50 border border-slate-100 px-2 py-0.5 text-xs text-slate-600`.
- Badge quente: `bg-amber-50 text-amber-700 border-amber-200`.
- Badge positivo: `bg-green-50 text-green-700 border-green-200`.

## Botoes E CTAs

- CTA primario claro: `inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-blue-glow-sm transition-all hover:bg-blue-700`.
- CTA secundario claro: `rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700 hover:shadow-md`.
- CTA em secao escura: `rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-blue-glow transition hover:bg-blue-500`.
- Botao escuro: `bg-slate-900 text-white hover:bg-slate-800` ou hover para `bg-blue-600` quando for acao externa importante.
- Sempre incluir `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2` em links/botoes customizados.

## Iconografia

- Biblioteca: `lucide-react`.
- Estilo: icones lineares, limpos, tamanho comum `h-4 w-4`, `h-5 w-5`, `h-6 w-6`, `h-7 w-7`.
- Icone em badge: `h-4 w-4`.
- Icone em CTA: `h-5 w-5`.
- Icone em card: container `h-12 w-12` ou `h-14 w-14`, com `rounded-xl` ou `rounded-2xl`.
- Icone hero/categoria: container `h-16 w-16` ou `h-24 w-24`.
- Use cores por categoria para diferenciar trilhas:
- Admin: `purple`.
- Developer: `blue`.
- Architect: `teal`.
- Consultant: `orange`.
- Data: `pink`.

## Abas E Navegacao Interna

- Wrapper centralizado: `flex justify-center border-b border-slate-200/80 pb-2`.
- Lista: `flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100/80 p-1`.
- Item ativo: `bg-white text-blue-600 shadow-sm border border-slate-200/50`.
- Item inativo: `text-slate-600 hover:text-slate-900 hover:bg-white/60`.
- Tamanho: `rounded-xl px-4 py-2.5 text-xs font-semibold md:py-3 lg:text-sm`.
- Mobile deve permitir scroll horizontal e esconder scrollbar com `.scrollbar-hide`.

## Formularios E Inputs

- Inputs com `rounded-xl` ou `rounded-2xl`.
- Borda: `border-slate-200`.
- Fundo: `bg-slate-50` quando dentro de hero ou filtros, `bg-white` em dialogs.
- Foco: `focus-visible:ring-blue-500`.
- Labels: `text-sm font-bold text-slate-700`.
- Dialog: `max-w-md rounded-2xl border-slate-200 bg-white p-6 shadow-xl`.

## Avaliacao E Estados

Escala visual da avaliacao de habilidades:

- Nivel 0: `bg-muted text-muted-foreground`.
- Nivel 1: `bg-destructive text-destructive-foreground`.
- Nivel 2: `bg-warning text-warning-foreground`.
- Nivel 3: `bg-accent text-accent-foreground`.
- Nivel 4: `bg-secondary text-secondary-foreground`.
- Nivel 5: `bg-success text-success-foreground`.

Padrao dos botoes numericos:

- Base: `w-8 h-8 rounded-md text-xs font-bold border-2 flex items-center justify-center transition-all duration-200`.
- Selecionado: cor do nivel, `border-foreground/20 scale-110 shadow-sm`.
- Nao selecionado: `bg-muted/50 text-muted-foreground border-transparent hover:bg-muted`.

## Paineis De Resultado

- Painel: `rounded-2xl bg-card shadow-card border border-border/50 p-4 md:p-5`.
- Titulo: `text-xl sm:text-2xl font-bold font-display text-card-foreground`.
- Metricas: grid de 3 colunas, blocos `text-center p-3 rounded-xl bg-muted/50`.
- Numeros grandes: `text-3xl font-bold font-display`.
- Listas de recomendacao: blocos `p-3 rounded-lg border border-border/30` com fundo de status.
- Use icones de status: `CheckCircle`, `AlertTriangle`, `XCircle`, `Star`, `TrendingUp`.

## Ilustracoes E Imagens

- Imagem principal atual: `public/astro.png`.
- Trate imagens como elementos de produto, dentro de moldura arredondada.
- Moldura externa: `rounded-feature border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-5 shadow-2xl shadow-blue-200/50`.
- Moldura interna: `rounded-card border border-white/80 bg-white/65 p-5 shadow-inner shadow-blue-100/60 backdrop-blur`.
- Imagem: `mx-auto h-auto w-full max-w-[360px] object-contain drop-shadow-xl`.

## Movimento E Transicoes

- Animacao padrao de entrada: opacity de 0 para 1 e `y` de 20 a 28 para 0.
- Duracao comum: `0.5s`.
- Hero pode usar `0.6s` ou `0.8s` para imagem/ilustracao.
- Use `viewport: { once: true }` em animacoes ao rolar.
- Hover de cards: `duration-300`, `hover:-translate-y-1`, troca de borda e sombra.
- View Transitions: duracao `0.2s`, easing `cubic-bezier(0.4, 0, 0.2, 1)`.
- Respeite `prefers-reduced-motion: reduce` desativando animacoes longas.

## Responsividade

- Mobile-first sempre.
- Container lateral: `px-4` no mobile, `lg:px-6` no desktop.
- CTAs: `flex-col` no mobile, `sm:flex-row` no desktop.
- Hero com duas colunas apenas em `lg`.
- Cards: 1 coluna no mobile, 2 em `md`, 3 ou 4 em `lg`.
- Navegacao desktop aparece a partir de `md`; mobile usa menu colapsavel.
- Abas internas devem permitir scroll horizontal no mobile.
- Evite larguras fixas; use `max-w-*`, `minmax` e `clamp`.

## Dark Mode

Existe suporte por classe `.dark`, mas o projeto atual nao expoe um alternador visual de tema.

```css
.dark {
  --background: 220 30% 8%;
  --foreground: 220 15% 90%;
  --card: 220 30% 12%;
  --card-foreground: 220 15% 90%;
  --primary: 215 80% 55%;
  --secondary: 185 65% 50%;
  --muted: 220 25% 18%;
  --muted-foreground: 220 15% 60%;
  --accent: 30 85% 55%;
  --border: 220 25% 20%;
  --input: 220 25% 20%;
  --ring: 215 80% 55%;
}
```

Se outro projeto usar tema escuro, mantenha a mesma hierarquia: fundo escuro slate, cards um pouco mais claros, acentos azul/ciano e texto principal quase branco.

## Acessibilidade Visual

- Preserve estados de foco visiveis em elementos interativos.
- Use contraste forte em CTAs: azul sobre branco ou branco sobre azul.
- Evite textos longos muito claros; para conteudo use `text-slate-600` no claro e `text-slate-300` no escuro.
- Sempre usar `alt` em imagens informativas e bandeiras.
- Menus mobile devem ter `aria-expanded`, `aria-controls` e `aria-label`.
- Respeitar preferencia de movimento reduzido.

## Template De Secao Clara

```tsx
<section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
  <div className="rounded-section border border-slate-200 bg-white p-6 shadow-sm md:p-8">
    <div className="mb-6 max-w-2xl space-y-3">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Titulo</h2>
      <p className="text-base leading-7 text-slate-600 md:text-lg">Descricao da secao.</p>
    </div>
    <div className="grid gap-4 lg:grid-cols-3">...</div>
  </div>
</section>
```

## Template De Secao Escura

```tsx
<section className="relative mx-4 max-w-7xl overflow-hidden rounded-panel bg-slate-900 px-6 py-10 text-white md:px-12 md:py-12 lg:mx-auto">
  <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-blob-lg" />
  <div className="relative z-10 space-y-6">
    <h2 className="text-3xl font-bold md:text-4xl">Titulo</h2>
    <p className="text-lg leading-8 text-slate-300">Descricao.</p>
  </div>
</section>
```

## Checklist Para Novos Projetos

- Usar `Inter` como fonte global.
- Configurar Tailwind com tokens HSL e `darkMode: ["class"]`.
- Usar fundo global `bg-slate-50` ou `bg-background`.
- Criar paginas com `max-w-7xl mx-auto px-4 py-6 lg:px-6`.
- Usar heros `rounded-panel`, fundo branco, borda slate, sombra e blobs azul/ciano.
- Usar cards brancos, muito arredondados, bordas claras e hover com leve elevacao.
- Usar azul/ciano como acento principal, amber/orange/purple/teal/pink apenas para categorias.
- Manter CTAs grandes, arredondados, com icone e foco visivel.
- Manter tabs em pill com fundo `bg-slate-100/80` e ativo branco/azul.
- Aplicar animacoes suaves de entrada com `framer-motion` e respeitar reduced motion.
- Evitar efeitos visuais pesados; a estetica deve parecer leve, confiavel e polida.

## Arquivos De Referencia Neste Projeto

- `src/index.css`: tokens, fonte, utilidades, view transitions e reduced motion.
- `tailwind.config.ts`: extensoes de fonte, cores, radius, blur e sombras.
- `src/components/layout/TopNav.tsx`: navegacao principal desktop/mobile.
- `src/components/layout/Footer.tsx`: rodape e links.
- `src/pages/HomePage.tsx`: hero principal, cards, secoes claras/escuras e ilustracao.
- `src/pages/AssessmentPage.tsx`: hero de pagina, grid de trilhas e cards de selecao.
- `src/pages/CareerPage.tsx`: estrutura de avaliacao, hero e layout com painel lateral.
- `src/pages/GuidePage.tsx`: busca, tabs, cards de guia e dialog.
- `src/components/CategoryCard.tsx`: card de categoria e estrutura de avaliacao.
- `src/components/SkillRating.tsx`: escala visual de habilidade.
- `src/components/ResultsPanel.tsx`: painel de resultados, metricas e estados.
- `src/components/CareerPath.tsx`: navegacao interna em tabs/pills.
