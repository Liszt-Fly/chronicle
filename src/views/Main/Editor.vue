<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from "vue"
import { currentFile, nodes } from "@/api/configdb"
import { initMarked, loadNodeLists, saveArticle } from "@/api/Editor/Editor"
import FileSystem from "@/components/Main/Editor/FileSystem/FileSystem.vue"
initMarked()
onMounted(() => {
	watchEffect(() => {
		if (currentFile.value != "") {
			nodes.value = []
			nodes.value = loadNodeLists(currentFile.value)
		}
	})
})

let editable: Ref<boolean> = ref(false)
let edit = function () {
	editable.value = !editable.value
}
</script>

<template >
	<div class="column" @keydown="save($event)">
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
			<div class="editor" :contenteditable="editable">
				<template v-for="node in nodes" :key="node">
					<component :is="node.type" :paragraph="node"></component>
				</template>
			</div>
		</div>
	</div>

	<div class="selection" @click="edit()" title="点击改变选择模式">
		<span v-show="editable">{{ $t("editor.edit_mode_on") }}</span>
		<span v-show="!editable">{{ $t("editor.edit_mode_off") }}</span>
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
