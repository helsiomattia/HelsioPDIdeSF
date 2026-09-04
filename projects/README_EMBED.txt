VERSÕES HTML GENÉRICAS — 360 APPS

Arquivos:
- Intelligence360_Generic.html
- Customer_Journey_360_Generic.html
- Revenue_Churn_Intelligence_Generic.html
- Salesforce_Architecture_Control_Center_Generic.html

Características:
- HTML standalone: CSS e JavaScript embutidos no próprio arquivo.
- Sem dependências externas.
- Dados fictícios e nomes genéricos.
- Sem menções a LESTA, Efí ou Gerencianet.
- Mantém navegação, filtros, drawers, ações simuladas e demais interações disponíveis nas previews dos apps React.
- Responsivo e adequado para iframe/embed.

Exemplo de embed:
<iframe src="Intelligence360_Generic.html" style="width:100%;min-height:1000px;border:0" loading="lazy"></iframe>

Auto-height opcional:
Os arquivos emitem postMessage com:
{ type: "generic-360-app-height", app: "...", height: 1234 }
O site pai pode ouvir essa mensagem e ajustar a altura do iframe.
