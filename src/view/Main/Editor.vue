<script setup lang="ts">
import {
	createElementBlock,
	onMounted,
	ref,
	watch,
	getCurrentInstance,
	watchEffect,
} from "vue"

import { currentFile, paragraphs } from "@/api/config"

import { initMarked } from "@/api/init"
import { loadNodeLists, saveNodeLists } from "@/api/Editor/Editor"
import CodeBlock from "@/components/Editor/codeBlock.vue"

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
		<template v-for="paragraph in paragraphs" :key="paragraph.title">
			<component :is="paragraph.type" :paragraph="paragraph"></component>
		</template>
	</div>
</template>

