<script setup lang="ts">
import {
	createElementBlock,
	onMounted,
	ref,
	watch,
	getCurrentInstance,
} from "vue"
import { v4 } from "uuid"
import paragraph from "@/components/CDOM/paragraph.vue"
import { paragraphs } from "@/composables/config"
import { cTreeNode } from "@/composables/type"
import { initMarked, initNode } from "@/composables/init"
import { loadNodeLists, saveNodeLists } from "@/composables/cDom"
let rContainer = ref<HTMLBaseElement | null>(null)
let initialedNode = initNode()
initMarked()
onMounted(() => {
	// paragraphs.value.push(initialedNode)
	paragraphs.value = loadNodeLists("unl")
	setInterval(() => {
		saveNodeLists(paragraphs.value, "unl")
	}, 5000)
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
