//sum 虚拟Node节点操作
import { marked } from "marked"
import fsp from "fs-extra"

import path from "path"
import { Freadline } from "@/Parser/_readline"
import { ChronicleNode } from "@/Parser/Node"
import { Parser } from "@/Parser/Parser"
import { article } from "@/Parser/db"
import { v4 } from "uuid"
import { insertNode } from "@/Parser/_insertNode"

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
export let test_path = path.resolve(process.cwd(), "example", "assets", "Standard.md")

//* 加载NodeList,加载文件
export function loadNodeLists(fileName: string) {
	if (fsp.readFileSync(fileName).length == 0) {
		insertNode(0)
		return
	}
	let markdown: string[] = fsp.readFileSync(`${fileName}`).toString().split("\n")
	let codeFlag = false
	let codeMarkdown: string[] = []
	let language = ""

	Freadline(fileName).then(markdown => {
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
