<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from "vue"
import { currentFile, paragraphs } from "@/api/configdb"
import { initMarked } from "@/api/init"
import { loadNodeLists, saveArticle } from "@/api/Editor/Editor"

import FileSystem from "@/components/Main/Editor/FileSystem/FileSystem.vue"

let rContainer = ref<HTMLBaseElement | null>(null)
function save(event: KeyboardEvent) {
	if (event.metaKey && event.keyCode == 83 && currentFile.value != "") {
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
		<div class="extendedPanel">
			<FileSystem></FileSystem>
		</div>
		<div class="magic" @click="edit()" title="点击改变选择模式">
			<i
				:class="[
					'bi',
					{ 'bi-pencil-square': editable },
					{ 'bi-eye': !editable },
				]"
			></i>
		</div>

		<div class="editor" ref="rContainer" @keydown="save($event)" :contenteditable="editable">
			<template v-for="paragraph in paragraphs" :key="paragraph.title">
				<component :is="paragraph.type" :paragraph="paragraph"></component>
			</template>
		</div>
	</div>
</template>

<style>
.magic {
	position: fixed;
	top: 20px;
	right: 20px;
	width: 32px;
	height: 32px;
	text-align: center;
	background-color: #fff;
	border-radius: 5px;
	display: grid;
	color: #444;
	justify-items: center;
	align-items: center;
	cursor: pointer;
}
</style>