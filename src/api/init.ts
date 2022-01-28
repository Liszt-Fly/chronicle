//sum 配置init初始化的ts文件

import { marked } from "marked"
import hljs from "highlight.js"
import { cTreeNode } from "./NavBar/FileSystem/type"
import { v4 } from "uuid"

//sum markedjs初始化
export function initMarked() {
	marked.setOptions({
		renderer: new marked.Renderer(),
		highlight: function (code) {
			return hljs.highlightAuto(code).value
		},
		pedantic: false,
		gfm: true,
		breaks: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		xhtml: false,
		langPrefix: "hljs",
	})
}
//sum 如果是空白文件进行初始化最初节点
export function initNode(): cTreeNode {
	return { title: v4(), originalMarkdown: " ", type: "paragraph" }
}
