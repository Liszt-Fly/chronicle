//sum filesystem使用的api
import fsp from "fs-extra"
import path from "path"

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

	if (
		fsp.existsSync(
			path.resolve(currentPath, ifFileHasExtname(noteName + index))
		)
	) {
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