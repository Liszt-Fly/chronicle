import { app, BrowserWindow, shell, ipcMain, protocol } from 'electron'
import { release } from 'os'
import { chronicleUserPath } from 'packages/render/src/api/init'
import path from "path"
import { join } from 'path'
import fsp from "fs-extra"

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
])
require("@electron/remote/main").initialize()
// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
//@ts-ignore
global.parms = {
  fileTree: []
}
async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    height: 600,
    width: 1200,
    resizable: true,
    frame: true,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  require("@electron/remote/main").enable(win.webContents)
  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../render/index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

    win.loadURL(url)
    // win.webContents.openDevTools()
  }

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })



  win!.on('maximize', function () {
    win!.webContents.send('main-window-max');
  })

  win!.on('unmaximize', function () {
    win!.webContents.send('main-window-unmax');
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  //@ts-ignore
  console.log(global.parms)

  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, "../preload/index.cjs"),
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(join(__dirname, `../render/index.html`), {
      hash: `${arg}`,
    })
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}/#${arg}`
    childWindow.loadURL(url);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});

ipcMain.on('close-app', () => {
  if (win) {
    win.close()
  }
})

ipcMain.on('window-max', function () {
  if (win!.isMaximized()) {
    win!.restore();
  } else {
    win!.maximize();
  }
})

ipcMain.on('min-app', () => {
  win!.minimize()
})

ipcMain.on('devTools', () => {
  win!.webContents.toggleDevTools()
})