//sum 虚拟Node节点操作
import { marked } from "marked"
import fsp from "fs-extra"

import path from "path"
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
export let test_path = path.resolve(process.cwd(), "example", "assets", "Standard.md")

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
			else if (line === "```") {
				let parser = new Parser("")
				parser.id = v4()
				parser.type = ChronicleNode.codeblock
				parser.language = language
				parser.text = codeMarkdown.join("\n")
				article.value.push(parser)
				codeFlag = false
				codeMarkdown = []
				language = ""
			}
			else if (codeFlag) {
				codeMarkdown.push(line)
			}
			else if (/^#+ (.+)/.test(line)) {
				let result = /^(#+) (.+)/.exec(line)
				let parser = new Parser("")
				parser.type = ChronicleNode.header
				parser.content = line;
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
