
// adm.js

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os <select> desta página
  const allSelects = document.querySelectorAll('select[id]');

  // Função para salvar valor no localStorage
  function saveSelection(selectId, value) {
    localStorage.setItem(selectId, value);
  }

  // Função para carregar valor do localStorage
  function loadSelection(selectId) {
    const storedValue = localStorage.getItem(selectId);
    if (storedValue) {
      document.getElementById(selectId).value = storedValue;
    }
  }

  // Para cada SELECT, carregamos o valor armazenado e adicionamos listener de change
  allSelects.forEach((selectElement) => {
    const selectId = selectElement.id;
    // Carrega valor salvo, se existir
    loadSelection(selectId);

    // Quando o usuário muda o valor, salvamos
    selectElement.addEventListener('change', (event) => {
      saveSelection(selectId, event.target.value);
    });
  });
});
