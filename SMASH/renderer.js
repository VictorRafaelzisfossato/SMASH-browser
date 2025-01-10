let currentTab = 1;

// Função para criar uma nova aba
document.getElementById('goButton').addEventListener('click', function () {
  const url = document.getElementById('url').value;
  const newWebview = document.createElement('webview');
  newWebview.src = url;
  newWebview.style.width = '100%';
  newWebview.style.height = '80vh';
  const webviewContainer = document.getElementById('webview-container');
  const tabContainer = document.querySelector('.tabs-container');

  // Criar nova aba
  const newTab = document.createElement('div');
  newTab.className = 'tab';
  newTab.textContent = `Tab ${currentTab + 1}`;
  tabContainer.appendChild(newTab);

  // Criar um novo contêiner de webview
  const newTabContainer = document.createElement('div');
  newTabContainer.className = 'webview-tab';
  newTabContainer.appendChild(newWebview);
  webviewContainer.appendChild(newTabContainer);

  // Adicionar evento de clique para mudar para a nova aba
  newTab.addEventListener('click', () => switchTab(currentTab));

  currentTab++;

  // Enviar evento para o main process
  const { ipcRenderer } = require('electron');
  ipcRenderer.send('create-tab');

  // Alterar a aba ativa
  switchTab(currentTab - 1);
});

// Função para alternar abas
function switchTab(tabIndex) {
  const allTabs = document.querySelectorAll('.tab');
  const allWebviews = document.querySelectorAll('.webview-tab');

  // Desativar todas as abas e webviews
  allTabs.forEach(tab => tab.classList.remove('active'));
  allWebviews.forEach(webview => webview.classList.remove('active'));

  // Ativar a aba e o webview selecionado
  allTabs[tabIndex].classList.add('active');
  allWebviews[tabIndex].classList.add('active');
}
