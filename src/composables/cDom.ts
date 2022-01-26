//sum 虚拟Node节点操作

import { marked } from "marked"
import { v4 } from "uuid"
import fsp from "fs-extra"
import { currentFile, paragraphs } from "./config"
import { cTreeNode } from "./type"
import { bKeyBoardTarget } from "./util"
import { initNode } from "./init"
import path from "path"
//* sum 添加新的节点
export function addNewNode(
	event: KeyboardEvent | FocusEvent,
	bParsed: { value: boolean },
	currentNode: cTreeNode
) {
	let target = event.target as unknown as HTMLElement
	if (
		target.innerText.startsWith("```") &&
		target.innerText.endsWith("```") != true
	) {
		console.log("target.innerText")
		return
	}
	//修改保存当前的node
	if (!bParsed.value) {
		let originalText = target.innerText
		let parsedMarkdown = marked.parse(originalText)
		target.innerHTML = parsedMarkdown

		bParsed.value = true
		currentNode.originalMarkdown = originalText
	}
	if (bKeyBoardTarget(event)) {
		let target = event.target as HTMLElement
		//如果内容是```，则不载入下一个节点

		event.preventDefault()
		if (paragraphs.value.indexOf(currentNode) == paragraphs.value.length - 1) {
			//当前节点是最后一个节点
			let newNode: cTreeNode = { title: v4(), originalMarkdown: "" }
			paragraphs.value.push(newNode)
			target.blur()
		} else {
			let nextElement: HTMLElement = target.nextElementSibling as HTMLElement
			nextElement.focus()
		}
	}
	//对于blur来说，如果内容为空，就要删除当前的节点
	if (!bKeyBoardTarget(event)) {
		if (currentNode.originalMarkdown == "") {
			let index = paragraphs.value.indexOf(currentNode)
			paragraphs.value.splice(index, 1)
		}
	}
	console.log("执行了")
}
//* sum focus状态恢复为sourceCodeMode
export function recoverSourceCode(
	event: FocusEvent,
	currentNode: cTreeNode,
	bParsed: { value: boolean }
) {
	if (bParsed) {
		let target = event.target as unknown as HTMLElement
		target.innerText = currentNode.originalMarkdown
		bParsed.value = false
	}
}

//* 存储NodeList，保存文件
export function saveNodeLists(nodeLists: cTreeNode[], fileName: string) {
	console.log(nodeLists)
	fsp.writeJSONSync(`${path.resolve(currentFile.value)}`, nodeLists)
}

//* 加载NodeList,加载文件
export function loadNodeLists(fileName: string): cTreeNode[] {
	let file: cTreeNode[] = fsp.readJSONSync(`${fileName}`)

	if (file.length == 0) {
		let newNodeList: cTreeNode[] = []
		newNodeList.push(initNode())
		console.log("新的初始化")
		return newNodeList
	} else {
		return file
	}
}
