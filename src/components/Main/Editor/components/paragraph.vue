<script setup lang="ts">
import { addNewNode, recoverSourceCodeMode } from "@/api/Editor/Editor"
import { cTreeNode } from "@/types/type";
import { onMounted, reactive, Ref, ref } from "vue"
//sum Props
let edible:Ref<boolean> =ref(false)

const props = defineProps({
	paragraph: {
		type: Object as () => cTreeNode,
	},
})
let modify=()=>{
edible.value=true;
}
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

		tabindex="-1"
		contenteditable="true" class="reading"
		ref="paragraph"
		spellcheck="false"
		@active="modify"
		@keydown.enter.prevent="addNewNode($event, bParsed, currentNode)"
		@blur="addNewNode($event, bParsed, currentNode)"
		@focus="recoverSourceCodeMode($event, bParsed, currentNode)"
		style="min-height: 24px;"

	></div>
</template>
<style>
.reading{}
.reading:active{
	border:solid 1px green;
}
.reading:focus{
	border:solid 1px red;
}
</style>