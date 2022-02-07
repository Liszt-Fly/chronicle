//sum 虚拟Node节点操作
import { marked } from "marked"
import fsp from "fs-extra"
import { currentFile, nodes } from "@/api/configdb"
import path from "path"
import { cTreeNode } from "@/api/interfaces/type"
import { bKeyBoardTarget } from "./FileSystem/util"

//sum markedjs初始化
export function initMarked() {
	marked.setOptions({
		renderer: new marked.Renderer(),
		pedantic: false,
		gfm: true,
		breaks: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		xhtml: false,
	})
}

//sum 如果是空白文件进行初始化最初节点
export let initNode = function (): cTreeNode {
	return { originalMarkdown: " " }
}

//* sum 添加新的节点
export let addNewNode = async function (
	event: KeyboardEvent | FocusEvent,
	bParsed: { value: boolean },
	currentNode: cTreeNode
) {
	console.log(currentNode);
	
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

			let newNode: cTreeNode = {
				originalMarkdown: "",
			}
			nodes.value.splice(nodes.value.indexOf(currentNode), 1, newNode)
			return
		}

		let newNode: cTreeNode = {
			originalMarkdown: "",
		}
		await nodes.value.splice(nodes.value.indexOf(currentNode) + 1, 0, newNode)
		target.blur()

		let nextElement: HTMLElement = target.nextElementSibling as HTMLElement
		nextElement.focus()
	}
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
	let markdown = ""
	nodeLists.forEach(node => {
		markdown += node.originalMarkdown + "\n"
	});
	fsp.writeFile(`${path.resolve(currentFile.value)}`, markdown).then(() => {
		console.log("保存成功")
	})
}

//* 加载NodeList,加载文件
export function loadNodeLists(fileName: string): cTreeNode[] {
	let markdown: string[] = fsp.readFileSync(`${fileName}`).toString().split("\n")
	let nodes: cTreeNode[] = []
	markdown.forEach(line => {
		nodes.push({ originalMarkdown: line })
	});

	if (nodes.length == 0) {
		let newNodeList: cTreeNode[] = []
		newNodeList.push(initNode())

		return newNodeList
	} else {
		return nodes
	}
}
