<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from "vue"
import { currentFile, paragraphs } from "@/api/configdb"
import { initMarked, loadNodeLists, saveArticle } from "@/api/Editor/Editor"
import FileSystem from "@/components/Main/Editor/FileSystem/FileSystem.vue"
import CodeBlock from "@/components/Main/Editor/components/codeBlock.vue";

let rContainer = ref<HTMLBaseElement | null>(null)
function save(event: KeyboardEvent) {
	if ((event.metaKey || event.altKey) && event.keyCode == 83 && currentFile.value != "") {
		saveArticle(paragraphs.value, currentFile.value)
	}
}
initMarked()
onMounted(() => {
	watchEffect(() => {
		if (currentFile.value != "") {
			paragraphs.value = loadNodeLists(currentFile.value)

		} else {
			console.log("当前无文件")
		}
	})
})

let editable: Ref<boolean> = ref(false)
let edit = function () {
	editable.value = !editable.value
}
</script>

<template>
	<div style="display: flex;">
		<FileSystem></FileSystem>
		<div class="editor" ref="rContainer" @keydown="save($event)" :contenteditable="editable">
			<template v-for="paragraph in paragraphs" :key="paragraph.title">
				<component :is="paragraph.type" :paragraph="paragraph"></component>
			</template>
		</div>
		<div class="selection" @click="edit()" title="点击改变选择模式">
			<span v-show="editable">框选模式开 ✅</span>
			<span v-show="!editable">框选模式关 ❎</span>
		</div>
	</div>

</template>
