const {app, BrowserWindow} = require("electron")
const windowStateKeeper = require("electron-window-state")

let mainWindow

function createWindow() {
	let state = windowStateKeeper({
        defaultWidth: 500, defaultHeight: 650
    })

    mainWindow = new BrowserWindow({
        x: state.x, y: state.y,
        width: state.width, height: state.height,
        minWidth: 350, maxWidth: 650, minHeight: 300,
        webPreferences: { nodeIntegration: true }
    })

    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('renderer/app.html')

    // Open DevTools - Remove for PRODUCTION!
    // mainWindow.webContents.openDevTools()

    // Tell the state manager which window to manage
    state.manage(mainWindow)

    // Listen for window being closed
    mainWindow.on('closed',  () => {
        mainWindow = null
    })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow()
})
