//sum 虚拟Node节点操作

import { marked } from "marked"
import { v4 } from "uuid"
import fsp from "fs-extra"
import { currentFile, paragraphs } from "@/api/configdb"
import { initNode } from "@/api/init"
import path from "path"
import { cCodeBlockNode, cTreeNode } from "@/types/type"
import { bKeyBoardTarget } from "../ExtendedPanel/FileSystem/util"

//* sum 添加新的节点
export let addNewNode = async function (
	event: KeyboardEvent | FocusEvent,
	bParsed: { value: boolean },
	currentNode: cTreeNode
) {
	let target = event.target as unknown as HTMLElement

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

		// 代码块
		if (/^`{3}[a-zA-z]+/.test(target.innerText)) {
			let language = /^`{3}([a-z]+)/.exec(target.innerText)![1]

			let newNode: cCodeBlockNode = {
				title: v4(),
				originalMarkdown: "",
				type: "codeBlock",
				language: /^`{3}([a-z]+)/.exec(target.innerText)![1],
			}
			paragraphs.value.splice(paragraphs.value.indexOf(currentNode), 1, newNode)
			return
		}

		let newNode: cTreeNode = {
			title: v4(),
			originalMarkdown: "",
			type: "paragraph",
		}
		await paragraphs.value.splice(paragraphs.value.indexOf(currentNode) + 1, 0, newNode)
		target.blur()

		let nextElement: HTMLElement = target.nextElementSibling as HTMLElement
		nextElement.focus()
	}
	//对于blur来说，如果内容为空，就要删除当前的节点
	// if (!bKeyBoardTarget(event)) {
	// 	if (currentNode.originalMarkdown == "") {
	// 		let index = paragraphs.value.indexOf(currentNode)
	// 		paragraphs.value.splice(index, 1)
	// 	}
	// }
}

//* sum focus状态恢复为sourceCodeMode
export let recoverSourceCodeMode = function (
	event: FocusEvent,
	bParsed: { value: boolean },
	currentNode: cTreeNode,
) {
	let target = event.target as unknown as HTMLElement
	if (bParsed) {
		target.innerText = currentNode.originalMarkdown.trim()
		bParsed.value = false
	}
}

//* 存储NodeList，保存文件
export function saveArticle(nodeLists: cTreeNode[], fileName: string) {

	fsp.writeJSON(`${path.resolve(currentFile.value)}`, nodeLists).then(() => {
		console.log("保存成功")
	})
}

//* 加载NodeList,加载文件
export function loadNodeLists(fileName: string): cTreeNode[] {
	let file: cTreeNode[] = fsp.readJSONSync(`${fileName}`)

	if (file.length == 0) {
		let newNodeList: cTreeNode[] = []
		newNodeList.push(initNode())

		return newNodeList
	} else {
		return file
	}
}
