<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue"
import { currentFile, paragraphs } from "@/api/config"
import { initMarked } from "@/api/init"
import { loadNodeLists, saveNodeLists } from "@/api/Editor/Editor"
import CodeBlock from "@/components/Editor/codeBlock.vue"
import EnhancedCodeBlock from "@/components/Main/Editor/enhancedCodeBlock.vue"
import CodeBlock1 from "@/components/Main/Editor/codeBlock.vue"

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
<style lang="scss"></style>
