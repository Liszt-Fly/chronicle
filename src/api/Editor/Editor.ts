//sum 虚拟Node节点操作
import { marked } from "marked"
import fsp from "fs-extra"
import { currentFile } from "@/api/configdb"
import path from "path"
import { cCodeBlockNode, cTreeNode } from "@/interfaces/type"
import { bKeyBoardTarget } from "../FileSystem/util"
import { Freadline } from "@/Parser/_readline"
import { ChronicleNode } from "@/Parser/Node"
import { Parser } from "@/Parser/Parser"
import { article } from "@/Parser/db"
import { v4 } from "uuid"

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
	return { originalMarkdown: "", type: "paragraph" }
}

// //* sum 添加新的节点
// export let addNewNode = async function (
// 	event: KeyboardEvent | FocusEvent,
// 	bParsed: { value: boolean },
// 	currentNode: cTreeNode
// ) {
// 	let target = event.target as unknown as HTMLElement

// 	//修改保存当前的node
// 	if (!bParsed.value) {
// 		let originalText = target.innerText
// 		let parsedMarkdown = marked.parse(originalText)
// 		target.innerHTML = parsedMarkdown

// 		bParsed.value = true
// 		currentNode.originalMarkdown = originalText
// 	}
// 	if (bKeyBoardTarget(event)) {
// 		let target = event.target as HTMLElement

// 		// 代码块
// 		if (/^`{3}[a-zA-z]+/.test(target.innerText)) {
// 			let language = /^`{3}([a-z]+)/.exec(target.innerText)![1]

// 			let newNode: cCodeBlockNode = {
// 				originalMarkdown: "",
// 				type: "codeBlock",
// 				language: language
// 			}
// 			nodes.value.splice(nodes.value.indexOf(currentNode), 1, newNode)
// 			return
// 		}

// 		let newNode: cTreeNode = {
// 			originalMarkdown: "",
// 			type: "paragraph"
// 		}
// 		await nodes.value.splice(nodes.value.indexOf(currentNode) + 1, 0, newNode)
// 		target.blur()

// 		let nextElement: HTMLElement = target.nextElementSibling as HTMLElement
// 		nextElement.focus()
// 	}
// }

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

// //* 存储NodeList，保存文件
// export function saveArticle() {
// 	let markdown: string[] = []
// 	console.log(nodes);

// 	for (const node of nodes.value) {
// 		console.log(node);

// 		if (node.type === "codeBlock") {
// 			markdown.push("```" + (node as cCodeBlockNode).language + "\n" + node.originalMarkdown + "\n```\n")
// 		} else {
// 			markdown.push(node.originalMarkdown)
// 		}
// 	}

// 	fsp.writeFileSync(`${path.resolve(currentFile.value)}`, markdown.join("\n"))

// 	console.log("file saved");
// }
export let test_path = path.resolve(process.cwd(), "test.md")

//* 加载NodeList,加载文件
export function loadNodeLists(fileName: string) {
	let markdown: string[] = fsp.readFileSync(`${fileName}`).toString().split("\n")
	let codeFlag = false
	let codeMarkdown: string[] = []
	let language = ""
	Freadline(test_path).then(markdown => {
		markdown.forEach(line => {
			if (/^`{3}[a-zA-z]+/.test(line)) {
				codeFlag = true
				language = /^`{3}([a-z]+)/.exec(line)![1]
			}
			else if (codeFlag) {
				codeMarkdown.push(line)
			}
			else if (line === "```") {
				let parser = new Parser("")
				parser.id = v4()
				parser.type = ChronicleNode.codeblock
				parser.language = language
				parser.content = codeMarkdown.join("\n")
				article.value.push(parser)
				codeFlag = false
				codeMarkdown = []
				language = ""
			}
			else if (/^#+ (.+)/.test(line)) {
				let result = /^(#+) (.+)/.exec(line)
				let parser = new Parser("")
				parser.type = ChronicleNode.header
				parser.level = result![1].length
				parser.text = result![2]
				article.value.push(parser)
			}
			else {
				let parser = new Parser("")
				parser.type = ChronicleNode.paragraph
				parser.content = line
				article.value.push(parser)
			}
		});
	})

}
