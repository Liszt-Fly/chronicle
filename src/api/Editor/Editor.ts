//sum 虚拟Node节点操作
import { marked } from "marked"
import fsp from "fs-extra"
import { currentFile, nodes } from "@/api/configdb"
import path from "path"
import { cAlertNode, cCodeBlockNode, cNode } from "@/api/interfaces/type"
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
export let initNode = function (): cNode {
	return { text: "", type: "paragraph" }
}

//* sum 添加新的节点
export let addNewNode = async function (
	event: KeyboardEvent | FocusEvent,
	bParsed: { value: boolean },
	currentNode: cNode
) {
	let target = event.target as unknown as HTMLElement

	//修改保存当前的node
	if (!bParsed.value) {
		let originalText = target.innerText
		let parsedMarkdown = marked.parse(originalText)
		target.innerHTML = parsedMarkdown

		bParsed.value = true
		currentNode.text = originalText
	}
	if (bKeyBoardTarget(event)) {
		let target = event.target as HTMLElement
		let newNode: cCodeBlockNode | cNode | cAlertNode

		// 代码块
		if (/^```[a-zA-z]+/.test(target.innerText)) {
			let language = /^```([a-z]+)/.exec(target.innerText)![1]

			newNode = {
				text: "",
				type: "codeBlock",
				language: language
			}
			nodes.value.splice(nodes.value.indexOf(currentNode), 1, newNode)
		}
		else if (/^:::[a-zA-z]+/.test(target.innerText)) {
			let color = /^:::([a-z]+)/.exec(target.innerText)![1]

			newNode = {
				text: "",
				type: "alert",
				color: color
			}
			nodes.value.splice(nodes.value.indexOf(currentNode), 1, newNode)
		}
		else {
			newNode = {
				text: "",
				type: "paragraph"
			}
			nodes.value.splice(nodes.value.indexOf(currentNode) + 1, 0, newNode)
		}

		// (target.nextElementSibling as HTMLElement).focus()
	}
}

//* sum focus状态恢复为sourceCodeMode
export let recoverSourceCodeMode = function (
	event: FocusEvent,
	bParsed: { value: boolean },
	currentNode: cNode,
) {
	let target = event.target as unknown as HTMLElement
	if (bParsed) {
		target.innerText = currentNode.text.trim()
		bParsed.value = false
	}
}

//* 存储NodeList，保存文件
export function saveArticle() {
	let markdown: string[] = []
	console.log(nodes);

	for (const node of nodes.value) {
		console.log(node);

		if (node.type === "codeBlock") {
			markdown.push("```" + (node as cCodeBlockNode).language + "\n" + node.text + "\n```\n")
		} else if (node.type === "alert") {
			markdown.push(":::" + (node as cAlertNode).color + "\n" + node.text + "\n:::\n")
		} else {
			markdown.push(node.text)
		}
	}

	fsp.writeFileSync(`${path.resolve(currentFile.value)}`, markdown.join("\n"))

	console.log("file saved");
}

//* 加载NodeList,加载文件
export function loadNodeLists(fileName: string): cNode[] {
	let markdown: string[] = fsp.readFileSync(`${fileName}`).toString().split("\n")
	let nodes: cNode[] = []
	let codeFlag = false
	let codeMarkdown: string[] = []
	let language = ""

	let alertFlag = false
	let alertMarkdown: string[] = []
	let color = ""

	markdown.forEach(line => {
		if (/^```[a-zA-z]+/.test(line)) {
			codeFlag = true
			language = /^`{3}([a-z]+)/.exec(line)![1]
		}
		else if (/^```\t?/.test(line)) {
			console.log(line);

			let newNode: cCodeBlockNode = {
				text: codeMarkdown.join("\n"),
				type: "codeBlock",
				language: language
			}
			nodes.push(newNode)

			codeFlag = false
			codeMarkdown = []
			language = ""
		}
		else if (codeFlag) {
			codeMarkdown.push(line)
		}
		else if (/^:::[a-zA-z]+/.test(line)) {
			alertFlag = true
			color = /^:{3}([a-z]+)/.exec(line)![1]
		}
		else if (/^:::\t?/.test(line)) {
			console.log(line);

			let newNode: cAlertNode = {
				text: alertMarkdown.join("\n"),
				type: "alert",
				color: color
			}
			nodes.push(newNode)

			alertFlag = false
			alertMarkdown = []
			color = ""
		}
		else if (alertFlag) {
			alertMarkdown.push(line)
		}
		else {
			nodes.push({ text: line, type: "paragraph" })
		}
		// console.log(line);
	});
	if (nodes.length == 0) {
		let newNodeList: cNode[] = []
		newNodeList.push(initNode())

		return newNodeList
	} else {
		return nodes
	}
}
