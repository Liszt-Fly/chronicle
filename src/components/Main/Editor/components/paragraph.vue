<script setup lang="ts">
import { addNewNode, recoverSourceCodeMode } from "@/api/Editor/Editor"
import { cNode } from "@/api/interfaces/type";
import { onMounted, reactive, ref } from "vue"
const props = defineProps({
	value: {
		type: Object as () => cNode,
	},
})
//sum DOM
let value = ref<HTMLElement | null>(null)
//对于新生成的节点，进行Focus
onMounted(() => {
	value.value?.focus()
})
//当前paragraph所使用的node
let currentNode: cNode = props.value!
let bParsed = reactive({ value: false }) //是否转化为markdown
</script>

<template>
	<div
		class="paragraph"
		contenteditable="true"
		ref="value"
		spellcheck="false"
		@keydown.enter.prevent="addNewNode($event, bParsed, currentNode)"
		@blur="addNewNode($event, bParsed, currentNode)"
		@focus="recoverSourceCodeMode($event, bParsed, currentNode)"
	></div>
</template>

<style>
.paragraph {
	min-height: 24px;
}
</style>
