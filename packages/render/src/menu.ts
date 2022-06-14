import { MenuItem } from "electron"
import path from "path"
import { currentFile } from "@/data/configdb";
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
                }
            },
            { label: '关于' }
        ]
    }
];