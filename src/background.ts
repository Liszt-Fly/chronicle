"use strict"
import { app, protocol, BrowserWindow } from "electron"
import { createProtocol } from
	"vue-cli-plugin-electron-builder/lib"
import path from "path"
import { template } from "./menu"
import { Menu } from "electron"
// import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer"
const isDevelopment = process.env.NODE_ENV !== "production"
require("@electron/remote/main").initialize()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: "app", privileges: { secure: true, standard: true } },
])
let win: BrowserWindow;
async function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 1200,
		height: 600,

		resizable: true,
		frame: true,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env
				.ELECTRON_NODE_INTEGRATION as unknown as boolean,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			preload: path.join(__dirname, "preload.js"),
		},
	})

	require("@electron/remote/main").enable(win.webContents)
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
		if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol("app")
		// Load the index.html when not in development
		win.loadURL("app://./index.html")
		const fs = require('fs');
	}
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
	console.log("123")
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools

		// await installExtension(VUEJS_DEVTOOLS)
	}
	createWindow()
	console.log(process.cwd())
	const fs = require('fs');
	const { mdToPdf } = require('md-to-pdf');

	(async () => {
		const pdf = await mdToPdf({ path: path.resolve(process.cwd(), "sb.md") }).catch(console.error);

		if (pdf) {
			fs.writeFileSync(path.resolve(process.cwd(), "sb.pdf"), pdf.content)
		}
		else {
			console.log("err")
		}
	})();

})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === "win32") {
		process.on("message", (data) => {
			if (data === "graceful-exit") {
				app.quit()
			}
		})
	} else {
		process.on("SIGTERM", () => {
			app.quit()
		})
	}
}
