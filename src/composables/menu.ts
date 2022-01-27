import { MenuItem } from "@electron/remote"

import { basePath, files } from "./config"
import { createNote } from "./filesystem"
import { flushFiles } from "./util"

//* Menu API 在文件系统单文件的右键菜单
export const fileListMenu = [
	new MenuItem({
		label: "delete note",
		click: () => flushFiles,
	}),
	new MenuItem({ label: "add tag" }),
	new MenuItem({ label: "move" }),
]

//* 在文件系统右侧的菜单
export const fileSystemMenu = [
	new MenuItem({
		label: "create note",
		click: function () {
			console.log("notes created!")
			createNote(basePath.value)
			files.value = []
			flushFiles()
		},
	}),

	new MenuItem({
		label: "sort",
		submenu: [
			{
				label: "sort by created time",
			},
			{
				label: "sort by last modified time",
			},
		],
	}),
]
