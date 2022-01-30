<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue"
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
</script>

<template>
	<div class="extendedPanel">
		<FileSystem></FileSystem>
	</div>
	<div class="editor" ref="rContainer" @keydown="save($event)">
		<template v-for="paragraph in paragraphs" :key="paragraph.title">
			<component :is="paragraph.type" :paragraph="paragraph"></component>
		</template>
	</div>
</template>
<style lang="scss">
</style>
