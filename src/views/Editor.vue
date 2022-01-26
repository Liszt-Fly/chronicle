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
import CodeBlock from "@/components/CDOM/codeBlock.vue"

let rContainer = ref<HTMLBaseElement | null>(null)

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
	<div class="editor" ref="rContainer">
		<paragraph
			v-for="paragraph in paragraphs"
			:key="paragraph.title"
			:paragraph="paragraph"
		></paragraph>
		<!-- <CodeBlock></CodeBlock> -->
	</div>
</template>

<style lang="scss">
.editor {
	height: 100vh;
	font-size: 1rem;
	width: 77vw;
	overflow-y: scroll;
	padding: 20px;
	box-sizing: border-box;
	div {
		white-space: pre-wrap;
		word-break: break-all;
		word-wrap: break-word;
	}
}
</style>
