const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;
let webviewCount = 1;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'renderer.js')
    }
  });

  win.loadFile('index.html');

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('create-tab', (event) => {
  webviewCount++;
  event.reply('new-tab-created', webviewCount);
});
