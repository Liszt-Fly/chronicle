import { MenuItem } from "electron"
import path from "path"
import { currentFile } from "./api/configdb";
const { app } = require('electron')

export const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
    {
        label: app.name,
        submenu: [
            { label: '打开' },
            { label: '保存' },
            { label: '退出' }
        ]
    },
    {
        label: 'File Operation',
        submenu: [
            {
                label: 'export to PDF', click: () => {
                    console.log(currentFile.value)
                }
            },
            { label: '关于' }
        ]
    }
];