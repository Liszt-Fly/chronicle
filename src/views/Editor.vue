<script setup lang="ts">
import { onMounted, Ref, ref, watch, watchEffect } from "vue"
import fsp from 'fs-extra'
import path from 'path'
import { currentFile } from "@/api/configdb"
import { initMarked, loadNodeLists, default_path } from "@/api/Editor/Editor"
import FileSystem from "@/components/FileSystem/FileSystem.vue"
import { Parser } from "@/Parser/Parser"
import { article, bContentedible } from "@/Parser/db"
import { ChronicleNode } from "@/Parser/Node"
import { createNode } from "@/Parser/_createNode"
import { insertNode } from "@/Parser/_insertNode"
import { moveCursorToNextLine } from "@/api/cursor"
import { moveToLineEnd } from "@/Parser/_moveToLineEnd"
import { toCodeBlock } from "@/api/ToMd/ToMd"
import { Freadline } from "@/Parser/_readline"
import { v4 } from "uuid"
let editor = ref<HTMLElement | null>()
//存储文章
function save(event: KeyboardEvent) {
	if (event.keyCode == 83) {
		let content = ""
		console.log(article.value);
		
		article.value.forEach(e => {
			if (e.type == ChronicleNode.codeblock) {
				content += toCodeBlock(e) + "\n"
			}
			else {
				content += e.content + '\n'
			}
		})
		fsp.writeFileSync(currentFile.value, content)
		console.log("保存成功")
	}
}
onMounted(() => {
	//TODO 加载文章情况待更新

	//* 创建默认新节点
	loadNodeLists(default_path)
})

watchEffect(() => {
	if (currentFile.value != "") {
		article.value = []
		loadNodeLists(currentFile.value)
	}
})

//敲击回车键的时候渲染上面的内容
const enter = (event: KeyboardEvent) => {
	let target = event.target as HTMLDivElement
	let item = Parser.currentNodeParser
	let index: number = article.value.indexOf(item)
	item.content = editor.value!.children[index].textContent!
	item.parse()
	if (item.type == ChronicleNode.codeblock) {
		bContentedible.value = false
		return
	}
	//TODO 待完善 TABLE回归正常节点
	if (item.type == ChronicleNode.table) {
		event.preventDefault()
		return
	}
	event.preventDefault()
	article.value.splice(index, 1, item)
	insertNode(index + 1)
	moveCursorToNextLine(target, index)
}

const backspace = (event: KeyboardEvent) => {
	if (Parser.currentNodeParser.type == ChronicleNode.codeblock) {
		return
	}
	let target = event.target as HTMLDivElement
	let item = Parser.currentNodeParser
	let index: number = article.value.indexOf(item)
	//* 当行清0回退到上一行
	console.log(editor.value!.children[index].textContent)
	if (editor.value!.children[index].textContent == "") {
		event.preventDefault()
		//把当前数组删掉
		article.value.splice(index, 1)
		Parser.currentNodeParser = article.value[index - 1]
		Parser.currentNodeParser.type = ChronicleNode.paragraph
		//* 光标回到上一行的末尾
		moveToLineEnd(target.children[index - 1] as HTMLElement)
	}
}

</script>

<template >
	<div class="column">
		<div class="column-left">
			<!-- 中间调整大小 -->
			<div class="resize-bar"></div>
			<div class="resize-line"></div>

			<!-- 左侧文件系统 -->
			<div class="resize-save">
				<FileSystem></FileSystem>
			</div>
		</div>
		<div class="column-right">
			<!-- 右侧 editor -->
			<div
				class="editor"
				:contenteditable="bContentedible"
				ref="editor"
				@keydown.enter="enter($event)"
				@keydown.backspace="backspace($event)"
				@keydown.ctrl="save"
			>
				<component
					:is="parser.type"
					v-for="parser in article"
					:parser="parser"
					:key="parser.id"
					:level="parser.level"
				></component>
			</div>
		</div>
	</div>
</template>

<style scoped>
.column {
	overflow: hidden;
}

.column-left {
	height: 100vh;
	background-color: #fff;
	position: relative;
	float: left;
}

.column-right {
	overflow: hidden;
	height: 100vh;
}

.resize-save {
	position: absolute;
	top: 0;
	right: 2px;
	bottom: 0;
	left: 0;
	overflow-x: hidden;
	height: 100vh;
}

.resize-bar {
	height: inherit;
	resize: horizontal;
	cursor: ew-resize;
	cursor: col-resize;
	opacity: 0;
	overflow: scroll;
	max-width: 80vw;
	min-width: 120px;
}

/* 拖拽线 */
.resize-line {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	pointer-events: none;
}

.resize-bar::-webkit-scrollbar {
	width: 200px;
	height: inherit;
}
</style>
