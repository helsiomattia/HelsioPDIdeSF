# Guia para cadastrar novos projetos embedados

Use este arquivo quando houver novos HTMLs em `projects/` e for necessario criar paginas de projeto no mesmo padrao do `CRM Customer 360`.

## Objetivo

Cadastrar novos projetos HTML embedados na area de portfolio, usando a mesma pagina de detalhe ja existente em `src/components/sections/ProjectDetailPage.jsx`.

O resultado esperado para cada projeto e:

- Card na secao de projetos de portfolio.
- Rota propria em `/projects/<id-do-projeto>`.
- HTML renderizado dentro da moldura `embedded-html-view`.
- Iframe com altura automatica, sem scrollbar interna vertical.
- Scroll vertical controlado apenas pela pagina principal.
- Visual, bordas, espacos, responsividade e footer preservados.

## Arquivos envolvidos

- `projects/*.html`: arquivos HTML que serao embedados.
- `src/data/portfolioProjects.js`: cadastro dos projetos e imports dos HTMLs.
- `src/components/sections/ProjectDetailPage.jsx`: componente que renderiza a pagina de detalhe.
- `src/components/sections/PortfolioProjects.jsx`: lista/card dos projetos. Normalmente nao precisa alterar se o novo projeto entrar em `portfolioProjects`.

## Regra principal

Nao recriar a pagina de detalhe para cada projeto.

Cada novo HTML deve ser importado em `src/data/portfolioProjects.js` com `?raw` e cadastrado como `kind: 'embed'`.

Exemplo:

```js
import meuProjetoHtml from '../../projects/meu_projeto.html?raw';
```

Depois, adicionar um objeto dentro de `portfolioProjects`:

```js
{
  id: 'meu-projeto',
  kind: 'embed',
  title: {
    pt: 'Meu Projeto',
    en: 'My Project',
    es: 'Mi Proyecto',
  },
  description: {
    pt: 'Descricao curta do projeto em portugues.',
    en: 'Short project description in English.',
    es: 'Descripcion corta del proyecto en espanol.',
  },
  status: { pt: 'Demo interativa', en: 'Interactive demo', es: 'Demo interactiva' },
  action: { pt: 'Abrir projeto', en: 'Open project', es: 'Abrir proyecto' },
  tags: ['Tag 1', 'Tag 2', 'Tag 3'],
  accent: '#0176D3',
  gradient: 'linear-gradient(135deg, #032D60 0%, #0176D3 100%)',
  embedHtml: meuProjetoHtml,
}
```

## Dados necessarios para cada novo projeto

Antes de implementar, levantar ou solicitar:

- Nome do arquivo HTML em `projects/`.
- `id` da rota, em kebab-case, sem acentos. Exemplo: `service-cloud-console`.
- Titulo em `pt`, `en` e `es`.
- Descricao curta em `pt`, `en` e `es`.
- Status em `pt`, `en` e `es`.
- Texto do botao/action em `pt`, `en` e `es`.
- Tags do card.
- Cor `accent`.
- `gradient` do card.

## Template de preenchimento

Copie e preencha esta tabela quando for pedir a implementacao:

| HTML | id | titulo PT | titulo EN | titulo ES | descricao PT | descricao EN | descricao ES | status PT | status EN | status ES | action PT | action EN | action ES | tags | accent | gradient |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| arquivo.html | meu-projeto | Meu Projeto | My Project | Mi Proyecto | ... | ... | ... | Demo interativa | Interactive demo | Demo interactiva | Abrir projeto | Open project | Abrir proyecto | Tag 1, Tag 2 | #0176D3 | linear-gradient(135deg, #032D60 0%, #0176D3 100%) |

## Prompt para executar depois

Quando os novos HTMLs estiverem prontos, use este pedido:

```text
Leia `projects/GUIA_NOVOS_PROJETOS_EMBED.md` e cadastre os novos projetos HTML em `src/data/portfolioProjects.js`, mantendo o mesmo padrao do CRM Customer 360.

Arquivos HTML e dados:
[colar aqui a tabela preenchida ou listar os 6 projetos]

Nao redesenhe a pagina. Use o componente de detalhe existente com iframe auto-resize. Altere somente os arquivos necessarios e rode `npm run build` no final.
```

## Checklist de implementacao

- Confirmar que cada arquivo HTML existe em `projects/`.
- Adicionar um import `?raw` para cada HTML novo em `src/data/portfolioProjects.js`.
- Adicionar um objeto `kind: 'embed'` para cada projeto dentro de `portfolioProjects`.
- Usar IDs unicos e estaveis, pois viram URL.
- Nao alterar `ProjectDetailPage.jsx`, salvo se houver bug real no comportamento comum dos embeds.
- Nao colocar altura fixa no iframe.
- Nao usar `overflow-y: auto` ou `overflow-y: scroll` no wrapper externo do embed.
- Preservar a moldura `embedded-html-view`.
- Rodar `npm run build`.
- Conferir `git diff` antes de finalizar.

## Observacoes tecnicas

O auto-resize do iframe ja esta implementado em `ProjectDetailPage.jsx` para embeds same-origin via `srcDoc`.

Ele mede o conteudo interno do iframe e aplica a altura no elemento pai, usando `ResizeObserver` e eventos de resize. Tambem repassa o wheel vertical do iframe para a pagina principal, evitando scroll interno e mantendo a navegacao natural da pagina.

Portanto, para novos projetos HTML locais, normalmente basta cadastrar o HTML em `portfolioProjects.js`.

## Cuidados com os HTMLs embedados

- Evitar `height: 100vh` no `body` quando isso limitar conteudo.
- Preferir `min-height` apenas quando fizer sentido visualmente.
- Evitar containers principais com `max-height`.
- Evitar `overflow-y: auto` no container principal do app embedado.
- `overflow: auto` horizontal em tabelas internas e aceitavel quando necessario para responsividade.
- Se o HTML tiver abas, acordeoes ou areas expansivas, o auto-resize deve atualizar a altura automaticamente.
