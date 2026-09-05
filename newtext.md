# Tarefa — Remodelagem de conteúdo, posicionamento profissional, credenciais e transições visuais

## Contexto

Este projeto é o meu portfólio profissional publicado em:

`https://helsiomattia.github.io/crm-specialist/`

Quero fazer uma revisão de **conteúdo + UX**, sem descaracterizar o visual atual do site.

O objetivo principal é reduzir textos repetitivos e reposicionar a comunicação para transmitir um perfil mais **sênior, arquitetural e orientado a soluções enterprise**, coerente com o mercado Salesforce atual: arquitetura de CRM, automação, dados, integrações, governança, observabilidade e preparação para IA/agentes.

A linguagem deve continuar profissional, direta e elegante. Evite exageros de marketing, buzzwords vazias ou afirmar experiências que não estejam sustentadas pelo conteúdo do projeto.

---

# 1. Regras gerais

1. **Não refazer o site inteiro.**
   - Preserve identidade visual, grid, navegação lateral, animações de fundo, tipografia, paleta e linguagem visual já existentes.
   - Faça somente os ajustes necessários para conteúdo, hierarquia visual, credenciais e transição das fotos.

2. **Manter o site responsivo.**
   - Desktop grande.
   - Notebook.
   - Tablet.
   - Mobile.

3. **Manter PT / EN / ES funcionando.**
   - Todo texto alterado deve ser atualizado nas três traduções.
   - Não deixar chaves antigas, textos duplicados ou traduções inconsistentes.

4. **Não quebrar o deploy do GitHub Pages.**
   - Preservar o funcionamento no subpath:
     `/crm-specialist/`
   - Não alterar `base`, rotas, caminhos de assets ou configuração de build sem necessidade.

5. **Não inventar credenciais, cargos ou experiência.**
   - Usar somente os dados descritos neste documento ou dados já existentes no projeto.
   - Não me apresentar como “Salesforce Certified Architect” ou equivalente.
   - O posicionamento deve mostrar **maturidade arquitetural e evolução para arquitetura**, sem criar certificações inexistentes.

6. Após as mudanças:
   - executar lint, se existir;
   - executar testes, se existirem;
   - executar `npm run build`;
   - corrigir qualquer warning/erro introduzido pela alteração.

---

# 2. Página INÍCIO — reposicionamento completo do Hero

## 2.1 Remover

Remover completamente o elemento verde atual:

> Salesforce CRM no Efí Bank

Não substituir por outro botão verde.

Também quero reduzir a repetição de termos como:

- Salesforce CRM Specialist
- Sales & Service Cloud
- Automação

Esses termos aparecem demais entre Hero, Sobre e chips.

---

## 2.2 Nova hierarquia de conteúdo

Manter:

> Olá, eu sou

e o nome:

# Helsio Mattia

Logo abaixo do nome, substituir a descrição atual por uma mensagem mais madura e arquitetural.

### PT-BR

**Headline principal**

> Salesforce CRM & Solution Architecture

**Texto de apoio**

> Projeto ecossistemas Salesforce que conectam negócio, dados, automação e experiência — com foco em operações de Service, integrações, governança e arquiteturas preparadas para IA.

> Da modelagem de processos à operação em produção, transformo necessidades complexas em soluções escaláveis, observáveis e sustentáveis.

### EN

**Headline**

> Salesforce CRM & Solution Architecture

**Supporting copy**

> I design Salesforce ecosystems that connect business, data, automation, and customer experience — with a focus on service operations, integrations, governance, and AI-ready architectures.

> From process design to production operations, I turn complex requirements into scalable, observable, and maintainable solutions.

### ES

**Headline**

> CRM Salesforce y Arquitectura de Soluciones

**Supporting copy**

> Diseño ecosistemas Salesforce que conectan negocio, datos, automatización y experiencia del cliente, con foco en operaciones de Service, integraciones, gobierno y arquitecturas preparadas para IA.

> Desde el diseño de procesos hasta la operación en producción, transformo necesidades complejas en soluciones escalables, observables y sostenibles.

---

## 2.3 Chips do Hero

Substituir os chips atuais por conceitos menos redundantes e mais estratégicos.

### PT-BR

- Solution Architecture
- Service Operations
- Automation & Integration
- Data & AI Readiness

### EN

- Solution Architecture
- Service Operations
- Automation & Integration
- Data & AI Readiness

### ES

- Arquitectura de Soluciones
- Operaciones de Service
- Automatización e Integración
- Datos e IA

Não usar mais de 4 chips.

Manter o CTA atual de trajetória, ajustando somente a tradução se necessário.

---

## 2.4 Painel técnico decorativo do Hero

O painel visual da direita pode continuar existindo.

Porém, revise os pequenos termos exibidos nele para que combinem com o novo posicionamento.

Sugestão de vocabulário:

- Salesforce Platform
- Service Cloud
- Automation
- Integration
- Data
- AI Ready

Não transformar essa área em uma lista de produtos.

Ela deve continuar sendo essencialmente **visual/decorativa**.

---

# 3. Página SOBRE

## 3.1 Remover

Remover do card de perfil:

> Salesforce CRM Specialist | Sales & Service Cloud | Automação

O card deve ficar mais limpo, contendo principalmente:

- foto;
- Helsio Mattia;
- Brasil;
- demais elementos visuais que já façam sentido.

Também remover completamente o componente:

> EXPERTISE

Não substituir por outro bloco de chips equivalente.

A ideia é reduzir redundância e deixar o texto principal fazer o trabalho de posicionamento.

---

## 3.2 Novo conteúdo da seção Sobre

Aumentar um pouco o conteúdo, mas manter boa leitura e bastante respiro visual.

Não fazer uma “parede de texto”.

Preferir 4 parágrafos bem distribuídos.

### PT-BR

> Minha carreira foi construída na interseção entre tecnologia, processos e operação. São mais de 10 anos trabalhando com CRM, ERP, qualidade e melhoria de processos, experiência que me deu uma visão prática de como sistemas impactam atendimento, receita, experiência do cliente e produtividade.

> Atualmente atuo com Salesforce em ambiente corporativo, especialmente na evolução de operações de Sales e Service. Meu trabalho conecta modelagem de dados, automação, omnichannel, integrações, segurança, governança e adoção da plataforma para transformar necessidades de negócio em soluções que funcionem de forma consistente no dia a dia.

> Minha abordagem vai além da configuração da ferramenta. Procuro entender o problema antes da solução, definir responsabilidades entre sistemas, reduzir acoplamento, estruturar dados com qualidade, documentar decisões e criar automações que sejam previsíveis, observáveis e fáceis de manter. É essa visão de sistema como um todo que direciona minha evolução para arquitetura de soluções.

> Em paralelo, aprofundo conhecimentos em engenharia de software, arquitetura de dados e IA aplicada ao CRM. A evolução do ecossistema Salesforce para Agentforce, Data 360, experiências headless e arquiteturas orientadas a agentes reforça uma direção que considero essencial: combinar automação determinística, dados confiáveis, integração segura, governança e inteligência para construir plataformas capazes de evoluir com o negócio.

### EN

> My career has been built at the intersection of technology, process, and operations. I have more than 10 years of experience across CRM, ERP, quality, and process improvement, which has given me a practical view of how systems affect service, revenue, customer experience, and productivity.

> Today I work with Salesforce in an enterprise environment, especially on the evolution of Sales and Service operations. My work connects data modeling, automation, omnichannel, integrations, security, governance, and user adoption to turn business needs into solutions that perform consistently in day-to-day operations.

> My approach goes beyond platform configuration. I focus on understanding the problem before choosing the solution, defining system responsibilities, reducing coupling, structuring trustworthy data, documenting decisions, and building automations that are predictable, observable, and maintainable. This system-level perspective is what guides my progression toward solution architecture.

> In parallel, I continue to deepen my knowledge of software engineering, data architecture, and AI applied to CRM. Salesforce's evolution toward Agentforce, Data 360, headless experiences, and agent-oriented architectures reinforces a direction I consider essential: combining deterministic automation, trusted data, secure integration, governance, and intelligence to build platforms that can evolve with the business.

### ES

> Mi carrera se ha construido en la intersección entre tecnología, procesos y operación. Tengo más de 10 años de experiencia en CRM, ERP, calidad y mejora de procesos, lo que me dio una visión práctica de cómo los sistemas impactan la atención, los ingresos, la experiencia del cliente y la productividad.

> Actualmente trabajo con Salesforce en un entorno corporativo, especialmente en la evolución de operaciones de Sales y Service. Mi trabajo conecta modelado de datos, automatización, omnicanalidad, integraciones, seguridad, gobierno y adopción de la plataforma para convertir necesidades de negocio en soluciones consistentes para la operación diaria.

> Mi enfoque va más allá de configurar la herramienta. Busco comprender el problema antes de elegir la solución, definir responsabilidades entre sistemas, reducir acoplamiento, estructurar datos confiables, documentar decisiones y construir automatizaciones predecibles, observables y fáciles de mantener. Esta visión integral del sistema es la que orienta mi evolución hacia la arquitectura de soluciones.

> En paralelo, continúo profundizando mis conocimientos en ingeniería de software, arquitectura de datos e IA aplicada al CRM. La evolución del ecosistema Salesforce hacia Agentforce, Data 360, experiencias headless y arquitecturas orientadas a agentes refuerza una dirección que considero esencial: combinar automatización determinística, datos confiables, integración segura, gobierno e inteligencia para construir plataformas capaces de evolucionar con el negocio.

---

# 4. Bug das fotos — eliminar a piscada branca

Existe um bug visual quando as fotos decorativas são trocadas.

Em algumas transições aparece por um instante um **flash/piscada branca**.

Quero corrigir a causa, não apenas esconder o problema com um timeout maior.

## Implementação desejada

Inspecione primeiro como o slideshow/rotação está implementado atualmente.

A nova imagem **não pode substituir a atual antes de estar carregada e decodificada**.

### Preferência de implementação

Usar um sistema de **crossfade com duas camadas de imagem**:

1. manter a imagem atual visível;
2. iniciar preload da próxima imagem;
3. aguardar `onload`;
4. se disponível, aguardar também `image.decode()`;
5. colocar a próxima imagem na camada secundária;
6. fazer crossfade suave entre as duas;
7. somente depois promover a nova imagem para a camada principal.

Como o projeto já utiliza GSAP, preferir GSAP em vez de adicionar outra dependência.

Transição sugerida:

- duração entre `0.5s` e `0.8s`;
- `ease: power2.inOut` ou equivalente;
- opacity `0 -> 1`;
- opcionalmente scale muito leve, por exemplo `1.02 -> 1`;
- **não usar branco como background intermediário**;
- preservar o background da seção durante todo o ciclo.

## Cuidados técnicos

- não alterar `src` de um único `<img>` e imediatamente iniciar fade;
- nunca usar uma imagem vazia como estado intermediário;
- fazer preload da próxima imagem;
- evitar layout shift;
- garantir `object-fit` e dimensões fixas do container;
- adicionar `will-change: opacity, transform` apenas onde realmente necessário;
- considerar `backface-visibility: hidden`;
- limpar timers/tweens no unmount;
- respeitar `prefers-reduced-motion`.

### Critério de aceite

Deixar a rotação funcionando por pelo menos 2 minutos em desktop e mobile.

Não deve existir:

- frame branco;
- imagem vazia;
- salto de layout;
- flicker;
- troca brusca de `src`.

---

# 5. Página CREDENCIAIS

Quero melhorar bastante essa seção.

O objetivo é mostrar claramente duas dimensões diferentes:

1. evolução contínua no Trailhead;
2. certificações profissionais Salesforce.

---

# 5.1 Layout

Criar dois cards principais lado a lado em desktop:

```text
┌────────────────────────────┐  ┌────────────────────────────┐
│     PERFIL TRAILBLAZER     │  │      CERTIFICAÇÕES        │
│                            │  │                            │
│ rank + progresso + status  │  │ certificações oficiais    │
└────────────────────────────┘  └────────────────────────────┘
```

Requisitos:

- mesma altura visual sempre que possível;
- proporções equilibradas;
- grid `1fr 1fr`;
- gap coerente com o restante do site;
- no mobile, empilhar os cards;
- manter a identidade atual de bordas, sombras, cantos e cores;
- não transformar a seção em um dashboard excessivamente carregado.

---

# 5.2 Card PERFIL TRAILBLAZER

O card atual está simples demais.

Quero que passe a destacar meu **rank oficial do Trailhead**.

## Dados atuais fornecidos

- **Rank:** Five Star Ranger
- **Emblemas:** 552
- **Pontos:** 302.100
- **Trilhas:** 97
- **Status Agentblazer:** Innovator '25
- Próximo marco mostrado atualmente: **All Star Ranger**
- Progresso atual exibido: faltam **48 emblemas** para o próximo rank

Centralizar esses dados em um objeto/configuração para que possam ser atualizados facilmente no futuro.

Exemplo conceitual:

```ts
const trailblazerProfile = {
  rank: 'Five Star Ranger',
  badges: 552,
  points: 302100,
  trails: 97,
  agentblazer: "Innovator '25",
  nextRank: 'All Star Ranger',
  badgesToNextRank: 48,
}
```

Não é obrigatório usar exatamente esse nome/estrutura; adapte à arquitetura existente.

## Hierarquia visual sugerida

No topo:

> Perfil Trailblazer

Em destaque:

> FIVE STAR RANGER

Logo abaixo, mostrar três métricas:

- 552 Emblemas
- 302.100 Pontos
- 97 Trilhas

Depois:

> Próximo marco: All Star Ranger

e uma barra/progresso visual discreto, se fizer sentido.

Também mostrar de forma elegante:

> Agentblazer Innovator '25

O Agentblazer não deve competir visualmente com o rank principal.

Manter CTA:

> Ir para Trailhead

ou equivalente em cada idioma.

Se já existir URL de perfil configurada no projeto, reutilizar a mesma.

---

# 5.3 Card CERTIFICAÇÕES

No card ao lado, listar minhas certificações Salesforce atuais.

## Certificações ativas a exibir

1. **Salesforce Certified Platform Administrator**
2. **Salesforce Certified Platform App Builder**
3. **Salesforce Certified Platform Foundations**

Cada item pode ter:

- badge/logo, caso o projeto já tenha asset apropriado;
- nome;
- status discreto: `Ativa`.

Não inventar datas de emissão ou IDs de credencial.

## AI Associate

Eu também obtive anteriormente a certificação **Salesforce Certified AI Associate**.

Como essa certificação foi aposentada pelo próprio programa Salesforce em 2026, não apresentá-la como certificação ativa.

Se ela já fizer parte dos dados do projeto ou se houver uma área adequada no card, pode ser exibida de forma secundária como:

> Salesforce Certified AI Associate  
> Credencial obtida anteriormente · programa aposentado

Não dar o mesmo destaque visual das certificações ativas.

O foco de IA atual deve ficar principalmente no meu:

> Agentblazer Innovator '25

dentro do card Trailblazer.

---

# 5.4 Visual das certificações

Quero algo mais premium que a lista atual.

Sugestão:

- três linhas/cards internos compactos;
- badge à esquerda;
- nome no centro;
- status à direita;
- hover muito sutil;
- sem excesso de sombra;
- boa leitura em telas menores.

Não usar logos ou selos genéricos inventados.

Se não houver assets confiáveis no repositório, é preferível criar uma composição tipográfica elegante do que usar imagens incorretas.

---

# 6. Ajuste de títulos e redundâncias no restante do site

Depois das alterações principais, faça uma busca global pelo conteúdo do projeto e revise repetições excessivas de:

- Salesforce CRM Specialist
- Sales & Service Cloud
- Automação
- CRM
- expertise

Não quero simplesmente remover todas as ocorrências.

Quero **distribuir melhor a mensagem**.

Regra:

- Hero = posicionamento profissional / arquitetura;
- Sobre = trajetória + forma de pensar;
- Credenciais = validação de conhecimento;
- Projetos = evidência prática;
- Trajetória = histórico;
- Contato = CTA.

Cada seção precisa ter uma função distinta.

---

# 7. Linguagem e posicionamento

A percepção desejada ao ler o site deve ser:

> profissional Salesforce experiente, com forte conhecimento operacional e técnico, capaz de entender negócio, modelar processos e dados, governar automações e evoluir soluções na direção de arquitetura.

A comunicação também deve mostrar familiaridade com a evolução atual da plataforma, incluindo temas como:

- arquitetura de soluções;
- automação determinística;
- Agentforce / arquitetura agentic;
- Data 360;
- integração e APIs;
- experiências headless;
- governança;
- observabilidade;
- segurança;
- qualidade de dados;
- omnichannel e operações de Service;
- adoção e sustentabilidade operacional.

**Importante:** isso é direção de posicionamento e vocabulário.

Não transformar o site em uma coleção de buzzwords e não afirmar que implementei em produção tecnologias que o conteúdo existente não comprova.

---

# 8. SEO e metadados

Revisar os metadados para acompanhar o novo posicionamento.

## Title sugerido

### PT

`Helsio Mattia | Salesforce CRM & Solution Architecture`

### EN

`Helsio Mattia | Salesforce CRM & Solution Architecture`

### ES

`Helsio Mattia | CRM Salesforce y Arquitectura de Soluciones`

## Meta description PT sugerida

> Portfólio de Helsio Mattia: Salesforce CRM, arquitetura de soluções, Service Operations, automação, integrações, dados, governança e evolução para IA.

Evitar keyword stuffing.

Também revisar:

- Open Graph title;
- Open Graph description;
- Twitter/X card, se existir;
- `aria-labels` afetados;
- heading hierarchy (`h1`, `h2`, `h3`).

Deve existir somente um `h1` principal por página/view quando aplicável.

---

# 9. Acessibilidade

Garantir:

- contraste adequado;
- foco visível;
- imagens relevantes com `alt`;
- imagens puramente decorativas com tratamento apropriado;
- navegação por teclado preservada;
- `prefers-reduced-motion`;
- nenhum texto importante disponível somente por animação;
- cards de credenciais com leitura correta por screen reader.

---

# 10. Critérios de aceite

A tarefa somente está concluída se todos os itens abaixo forem atendidos:

- [ ] Badge verde “Salesforce CRM no Efí Bank” removido da Home.
- [ ] Hero reposicionado para `Salesforce CRM & Solution Architecture`.
- [ ] Textos do Hero menos redundantes.
- [ ] PT, EN e ES atualizados.
- [ ] Subtítulo antigo removido do card da página Sobre.
- [ ] Componente `EXPERTISE` removido.
- [ ] Sobre possui novo conteúdo mais completo.
- [ ] Nenhum texto importante ficou duplicado entre Home e Sobre.
- [ ] Flicker/piscada branca das fotos eliminado.
- [ ] Crossfade só acontece depois da próxima imagem carregar.
- [ ] Card Trailblazer redesenhado.
- [ ] Rank `Five Star Ranger` exibido em destaque.
- [ ] 552 emblemas exibidos.
- [ ] 302.100 pontos exibidos.
- [ ] 97 trilhas exibidas.
- [ ] `Agentblazer Innovator '25` exibido.
- [ ] Próximo marco `All Star Ranger` representado de forma discreta.
- [ ] Card de Certificações posicionado ao lado do Trailblazer em desktop.
- [ ] Platform Administrator exibida como ativa.
- [ ] Platform App Builder exibida como ativa.
- [ ] Platform Foundations exibida como ativa.
- [ ] AI Associate não é apresentada como certificação ativa.
- [ ] Cards empilham corretamente no mobile.
- [ ] GitHub Pages continua funcionando em `/crm-specialist/`.
- [ ] Nenhuma rota ou asset quebrado.
- [ ] Não há overflow horizontal.
- [ ] `npm run build` termina sem erro.

---

# 11. Validação visual

Validar pelo menos nestes tamanhos:

- 1920 × 1080
- 1366 × 768
- 1024 × 768
- 390 × 844

Em cada viewport, validar:

1. Home;
2. Sobre;
3. Credenciais;
4. navegação lateral;
5. troca PT / EN / ES;
6. slideshow de fotos;
7. quebra dos títulos;
8. cards de credenciais;
9. ausência de scrollbar horizontal;
10. ausência de flash branco nas imagens.

---

# 12. Entrega esperada

Implemente as alterações diretamente no projeto.

Ao terminar, me entregue um resumo objetivo contendo:

1. arquivos alterados;
2. componentes removidos;
3. componentes criados ou refatorados;
4. como o crossfade das imagens foi corrigido;
5. onde ficaram centralizados os dados do Trailblazer e certificações;
6. resultado do `npm run build`;
7. qualquer decisão técnica relevante tomada durante a implementação.

Não quero somente sugestões ou mockups.

Quero a alteração **implementada e validada no código existente**.
