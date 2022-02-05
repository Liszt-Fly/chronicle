<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from "vue"
import { currentFile, paragraphs } from "@/api/configdb"
import { initMarked, loadNodeLists, saveArticle } from "@/api/Editor/Editor"
import FileSystem from "@/components/Main/Editor/FileSystem/FileSystem.vue"
import CodeBlock from "@/components/Main/Editor/components/codeBlock.vue";

let rContainer = ref<HTMLBaseElement | null>(null)
function save(event: KeyboardEvent) {
	if ((event.metaKey || event.ctrlKey) && event.keyCode == 83 && currentFile.value != "") {
		saveArticle(paragraphs.value, currentFile.value)
	}
}
initMarked()
onMounted(() => {
	watchEffect(() => {
		if (currentFile.value != "") {

			console.log("开始执行")
			paragraphs.value = loadNodeLists(currentFile.value)
		}
		else {

		}
	})
})

let editable: Ref<boolean> = ref(false)
let edit = function () {
	editable.value = !editable.value
}
</script>

<template>
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
			<div class="editor" ref="rContainer" @keydown="save($event)" :contenteditable="editable">
				<template v-for="paragraph in paragraphs" :key="paragraph.title">
					<component :is="paragraph.type" :paragraph="paragraph"></component>
				</template>
			</div>
		</div>
	</div>

	<div class="selection" @click="edit()" title="点击改变选择模式">
		<span v-show="editable">框选模式开 ✅</span>
		<span v-show="!editable">框选模式关 ❎</span>
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
	min-width: 20vw;
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
