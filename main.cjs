const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({
    show: false,
    title: "SWU Collection Manager",
    icon: path.join(__dirname, 'build', 'favicon.ico'), // Ensure this path is correct
  });

  win.maximize();
  win.show();

  if (app.isPackaged) {
    // Load the production build
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    // Load the development build
    win.loadURL('http://localhost:3000');
  }

  // Add the did-fail-load event listener here
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    win.webContents.openDevTools(); // Open developer tools
    console.error('Failed to load:', errorDescription); // Log the error
  });
}

app.on('ready', createWindow);