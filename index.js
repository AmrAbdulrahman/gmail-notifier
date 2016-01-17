'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const DevelopmentMode = true;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  var iconPath = 'img/calc-icon.png';

  if (DevelopmentMode) {
    mainWindow = new BrowserWindow({width: 1000, height: 340, icon: iconPath});
  } else {
    mainWindow = new BrowserWindow({width: 350, height: 340, resizable:false, icon: iconPath});
  }

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  if (DevelopmentMode) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
