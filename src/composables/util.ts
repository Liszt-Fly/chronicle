import fs from "fs"
import path from "path"
import { basePath, files } from "./config"
import { msfile } from "./type"
export let sortFileInDepth = function sortFileInDepth(
	dir: string,
	storage: msfile[]
) {
	let files: string[] = fs.readdirSync(dir)
	basePath.value = dir
	files.forEach((f) => {
		let item: msfile = {}
		item.name = f

		let stat = fs.lstatSync(path.resolve(dir, f)).isDirectory()
		if (fs.lstatSync(path.resolve(dir, f)).isDirectory()) {
			item.isDirectory = true
			if (item.children) {
			} else {
				item.children = []
			}
			storage.push(item)
			sortFileInDepth(path.resolve(dir, f), item["children"])
		} else {
			item.name = f
			if (item["children"]) {
				item["children"].push(item)
			} else {
				item.isDirectory = false
				storage.push(item)
			}
		}
	})
}

export let validateFilename = function validateFilename(filename: string): string | undefined {
	//省略扩展名
	let length = filename.length - path.extname(filename).length

	// 只保留 json 文件

	if (path.extname(filename) == ".json" || path.extname(filename) == "")
		return filename.substring(0, length)
	else return undefined
}

export function bKeyBoardTarget(object: any): object is KeyboardEvent {
	return "altKey" in object
}
//* 刷新files.value，UI界面刷新
export function flushFiles() {
	files.value = []
	sortFileInDepth(basePath.value, files.value)
}
