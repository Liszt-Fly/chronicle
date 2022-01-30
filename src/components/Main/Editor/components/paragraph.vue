<script setup lang="ts">
import { addNewNode, recoverSourceCodeMode } from "@/api/Editor/Editor"
import { cTreeNode } from "@/types/type";
import { onMounted, reactive, Ref, ref } from "vue"
//sum Props
const props = defineProps({
	paragraph: {
		type: Object as () => cTreeNode,
	},
})

//sum DOM
let paragraph = ref<HTMLElement | null>(null)
//对于新生成的节点，进行Focus
onMounted(() => {
	paragraph.value?.focus()
})
//当前paragraph所使用的node
let currentNode: cTreeNode = props.paragraph!
let bParsed = reactive({ value: false }) //是否转化为markdown
</script>

<template>
	<div
		contenteditable="true"
		ref="paragraph"
		spellcheck="false"
		@keydown.enter.prevent="addNewNode($event, bParsed, currentNode)"
		@blur="addNewNode($event, bParsed, currentNode)"
		@focus="recoverSourceCodeMode($event, bParsed, currentNode)"
		style="min-height: 24px;"
	></div>
</template>
