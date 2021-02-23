const {
    app,
    BrowserWindow,
    ipcMain,
    Tray,
    nativeImage
} = require('electron');
const path = require('path');
let tray = null;
let window = null;

app.on('ready', () => {
    createWindow();
    createTray();
});

const createTray = () => {
    tray = new Tray(nativeImage.createFromPath(path.join(__dirname, '/icon@4x.png')));


    tray.on('click', function (event) {
        toggleWindow();
    })
}

const toggleWindow = () => {
    if (window.isVisible()) {
        window.hide();
    } else {
        showWindow();
    }
}

const showWindow = () => {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, true);
    window.show();
}

const getWindowPosition = () => {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)
    return {
        x: x,
        y: y
    }
}

const createWindow = () => {
    window = new BrowserWindow({
        width: 500,
        height: 450,
        show: true,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: false,
    });
    window.loadURL(`file://${path.join(__dirname, '/index.html')}`);

    // Hide the window when it loses focus
    window.on('blur', () => {
        if (!window.webContents.isDevToolsOpened()) {
            window.hide();
        }
    });

    window.hide()

    // Don't show the app in the doc
    app.dock.hide();
}