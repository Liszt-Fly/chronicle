//sum filesystem使用的api
import fsp from "fs-extra"
import path from "path"
import fs from "fs"
import { fileNode } from "@/api/FileTree/fileNode"
import { NodeType } from "@/api/FileTree/type"


export function removeExtName(file: string): string {
	if (path.extname(file)) {
		let remainedLength = file.length - path.extname(file).length + 1
		//截取字符串
		return file.substring(0, remainedLength - 1)
	} else {
		return file
	}
}


export let validateFilename = function validateFilename(
	filename: string
): string | undefined {
	//省略扩展名
	let length = filename.length - path.extname(filename).length
	if (filename == ".DS_Store" || filename == ".trash")
		return undefined
	else if (path.extname(filename) == ".md" || path.extname(filename) == "")
		return filename.substring(0, length)
	else return undefined
}

export function bKeyBoardTarget(object: any): object is KeyboardEvent {
	return "altKey" in object
}


export function constructFileTree(pathName: string, currentNode: fileNode) {
	let list = fs.readdirSync(pathName)
	if (list.length == 0) return
	list.forEach(item => {
		//* 对应的文件/文件夹路径
		let currentPath = path.resolve(pathName, item)
		//* 构建对应的node
		let node = new fileNode(currentPath, item)
		currentNode.children!.push(node)
		//* parent链接
		node.parent = currentNode
		if (node.type == NodeType.FOLDER) {
			constructFileTree(node.path, node)
		}
	})
}


