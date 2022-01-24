<script setup lang="ts">
import {
	createElementBlock,
	onMounted,
	ref,
	watch,
	getCurrentInstance,
	watchEffect,
} from "vue"

import paragraph from "@/components/CDOM/paragraph.vue"
import { currentFile, paragraphs } from "@/composables/config"

import { initMarked } from "@/composables/init"
import { loadNodeLists, saveNodeLists } from "@/composables/cDom"
import { Menu } from "@electron/remote"
import { fileSystemMenu } from "@/composables/menu"
let rContainer = ref<HTMLBaseElement | null>(null)

initMarked()
onMounted(() => {
	watchEffect(() => {
		if (currentFile.value != "") {
			paragraphs.value = loadNodeLists(currentFile.value)
			setInterval(() => {
				saveNodeLists(paragraphs.value, currentFile.value)
			}, 5000)
		} else {
			console.log("当前无文件")
		}
	})
})
</script>

<template>
	<div class="editor" ref="rContainer">
		<paragraph
			v-for="paragraph in paragraphs"
			:paragraph="paragraph"
		></paragraph>
	</div>
</template>

<style lang="scss">
.editor {
	height: 100vh;
	font-size: 1rem;
	width: 77vw;
	white-space: pre-wrap;
}
</style>
