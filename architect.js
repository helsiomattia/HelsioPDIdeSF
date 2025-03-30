
// architect.js

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os <select> desta página que tenham ID
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

  // Para cada SELECT, carregar o valor armazenado e adicionar listener
  allSelects.forEach((selectElement) => {
    const selectId = selectElement.id;
    // Carrega valor salvo (se existir)
    loadSelection(selectId);

    // Quando o usuário muda o valor, salvamos no localStorage
    selectElement.addEventListener('change', (event) => {
      saveSelection(selectId, event.target.value);
    });
  });
});
