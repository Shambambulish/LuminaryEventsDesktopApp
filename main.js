const path = require('path');
const { app, BrowserWindow } = require('electron');


const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === "darwin";

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Luminary Events Desktop App',
        autoHideMenuBar: true,
        width: isDev ? 1200 : 500,
        height: 700,
        resizable: isDev,
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
      }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    })
});

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});