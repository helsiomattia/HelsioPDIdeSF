// home.js

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os botões do <nav>
  const navButtons = document.querySelectorAll('nav button');
  // Seleciona a div onde o conteúdo será injetado
  const contentDiv = document.getElementById('content');

  // Para cada botão, adiciona um listener de click
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Obtém qual página precisamos carregar
      const page = button.getAttribute('data-page');

      // Faz o fetch do arquivo HTML indicado
      fetch(page)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro ao carregar ${page}`);
          }
          return response.text();
        })
        .then(html => {
          // Insere o HTML carregado dentro do contentDiv
          contentDiv.innerHTML = html;
        })
        .catch(error => {
          // Em caso de erro, exibe mensagem
          contentDiv.innerHTML = `<p>Não foi possível carregar o conteúdo.</p>`;
          console.error(error);
        });
    });
  });
});

