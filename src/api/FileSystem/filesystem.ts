//sum filesystem使用的api
import fsp from "fs-extra"
import path from "path"
import fs from "fs"
import { basePath, files } from "@/api/configdb"
import { msfile } from "@/interfaces/type"

//* 创建新的Note文件
export function createNote(currentPath: string, noteName?: string) {
	//创建默认文件
	if (noteName == undefined) {
		noteName = "undefined"
	}

	let index = ifNoteNameExists(currentPath, removeExtName(noteName), 1)
	let fileName = ifFileHasExtname(
		path.resolve(currentPath, `${noteName}${index}`)
	)

	fsp.createFileSync(path.resolve(currentPath, `${fileName}`))
	fsp.writeFileSync(path.resolve(currentPath, `${fileName}`), "")
}

//* 删除Note
export function deleteNote(currentPath: string, noteName: string) {
	fsp.unlinkSync(path.resolve(currentPath, ifFileHasExtname(noteName)))
}

export function ifNoteNameExists(
	currentPath: string,
	noteName: string,
	index: number
): number {
	//如果名字存在，进行递归

	if (fsp.existsSync(path.resolve(currentPath, ifFileHasExtname(noteName + index)))) {
		return ifNoteNameExists(currentPath, removeExtName(noteName), index + 1)
	} else {
		return index
	}
}

export function ifSectionExists(PATH: string, section: string, index: number): number {
	if (fsp.existsSync(path.resolve(PATH, section + index))) {
		return ifSectionExists(PATH, section, index + 1)
	}
	else {
		return index;
	}
}

//* 判断文件是否有后缀,如果没有，添加后缀
function ifFileHasExtname(file: string): string {
	if (path.extname(file)) {
		return file
	} else {
		return file.concat(".md")
	}
}

function removeExtName(file: string): string {
	if (path.extname(file)) {
		let remainedLength = file.length - path.extname(file).length
		//截取字符串
		return file.substring(0, remainedLength - 1)
	} else {
		return file
	}
}

export let sortFileInDepth = function (
	dir: string,
	storage: msfile[]
) {
	let files: string[] = fs.readdirSync(dir)
	basePath.value = dir
	files.forEach((f) => {
		let item: msfile = {}
		item.name = f
		item.stat = fs.statSync(path.resolve(dir, f))

		item.path = path.resolve(dir, f)
		let stat = fs.lstatSync(path.resolve(dir, f)).isDirectory()
		if (fs.lstatSync(path.resolve(dir, f)).isDirectory()) {
			item.isDirectory = true
			if (item.children) {
			}
			else {
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

export let validateFilename = function validateFilename(
	filename: string
): string | undefined {
	//省略扩展名
	let length = filename.length - path.extname(filename).length
	if (filename == ".DS_Store") return undefined
	else if (path.extname(filename) == ".md" || path.extname(filename) == "")
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

export function refresh(PATH: string) {
	files.value = []
	sortFileInDepth(PATH, files.value)
}