import { MenuItem } from "@electron/remote"
import { basePath, files } from "../config"

import { createNote } from "./FileSystem/filesystem"
import { flushFiles } from "./FileSystem/util"

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
			{ label: "sort by created time", },
			{ label: "sort by last modified time", },
		],
	}),
]
