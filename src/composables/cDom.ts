//sum 虚拟Node节点操作

import { marked } from "marked"
import { v4 } from "uuid"
import fsp from "fs-extra"
import { paragraphs } from "./config"
import { cTreeNode } from "./type"
import { bKeyBoardTarget } from "./util"
//* sum 添加新的节点
export function addNewNode(
	event: KeyboardEvent | FocusEvent,
	bParsed: { value: boolean },
	currentNode: cTreeNode
) {
	//修改保存当前的node
	console.log(`if之前的bParsed为${bParsed}`)
	if (!bParsed.value) {
		let target = event.target as unknown as HTMLElement
		let originalText = target.innerText
		let parsedMarkdown = marked.parse(originalText)
		target.innerHTML = parsedMarkdown
		console.log(parsedMarkdown)
		bParsed.value = true
		currentNode.originalMarkdown = originalText

		console.dir(bParsed)
	}
	if (bKeyBoardTarget(event)) {
		//当前节点是最后一个节点
		let target = event.target as HTMLElement
		if (paragraphs.value.indexOf(currentNode) == paragraphs.value.length - 1) {
			let newNode: cTreeNode = { title: v4(), originalMarkdown: "" }
			paragraphs.value.push(newNode)
			target.blur()
		} else {
			let nextElement: HTMLElement = target.nextElementSibling as HTMLElement
			nextElement.focus()
		}
	}
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
	fsp.writeJSONSync(`./${fileName}.json`, nodeLists)
}

//* 加载NodeList,加载文件
export function loadNodeLists(fileName: string): cTreeNode[] {
	return fsp.readJsonSync(`./${fileName}.json`)
}
