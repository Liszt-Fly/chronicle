//sum filesystem使用的api
import fsp from "fs-extra"
import path from "path"
import { basePath } from "./config"
//* 创建新的Note文件
export function createNote(currentPath: string, noteName?: string) {
	//创建默认文件
	if (noteName == undefined) {
		noteName = "chronicle"
	}
	let index = ifNoteNameExists(currentPath, noteName, 1)
	console.log(index)
	fsp.createFileSync(path.resolve(currentPath, `${noteName}${index}`))
}

//* 删除Note
export function deleteNote(currentPath: string, noteName: string) {
	fsp.unlinkSync(path.resolve(currentPath, noteName))
}

export function ifNoteNameExists(
	currentPath: string,
	noteName: string,
	index: number
): number {
	//如果名字存在，进行递归
	if (fsp.existsSync(path.resolve(currentPath, noteName + index))) {
		return ifNoteNameExists(currentPath, noteName, index + 1)
	} else {
		return index
	}
}
