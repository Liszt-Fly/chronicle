<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from "vue"
import { currentFile, nodes } from "@/api/configdb"
import { initMarked, loadNodeLists, saveArticle } from "@/api/Editor/Editor"
import FileSystem from "@/components/Main/Editor/FileSystem/FileSystem.vue"
import { Parser } from "@/Parser/Parser"
import { article } from "@/Parser/db"
import { ChronicleNode } from "@/Parser/Node"
import { createNode } from "@/Parser/_createNode"
import { insertNode } from "@/Parser/_insertNode"
import { moveCursorToNextLine } from "@/api/cursor"
let editor = ref<HTMLElement | null>()
initMarked()
onMounted(() => {
	//TODO 加载文章情况待更新
	//* 创建默认新节点
	Parser.currentNodeParser = createNode()
})

watchEffect(() => {
	if (currentFile.value != "") {
		nodes.value = []
		nodes.value = loadNodeLists(currentFile.value)
	}
})
const render = (index: number) => {

	console.log(index)
	let item = article.value[index]
	item.type = ChronicleNode.header
	article.value.splice(index, 1, item)

}

//敲击回车键的时候渲染上面的内容
const enter = (event: KeyboardEvent) => {
	let target = event.target as HTMLDivElement
	let item = Parser.currentNodeParser
	let index: number | undefined = article.value.indexOf(item)
	item.content = editor.value!.children[index].textContent!
	item.parse()
	article.value.splice(index, 1, item)
	insertNode(index + 1)
	moveCursorToNextLine(target, index)
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
				contenteditable="true"
				ref="editor"
				tabindex="-1"
				@keydown.enter.prevent="enter($event)"
			>
				<component
					:is="parser.type"
					v-for="parser in article"
					:parser="parser"
					:key="parser.id"
					:level="parser.level"
					@render="render"
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
