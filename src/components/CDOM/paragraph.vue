<script setup lang="ts">
import { addNewNode, recoverSourceCode } from "@/composables/cDom"
import { cTreeNode } from "@/composables/type"
import { onMounted, reactive, Ref, ref } from "vue"
//sum Props
const props = defineProps({
    paragraph: {
        type: Object as () => cTreeNode,
    },
})
//sum Methods
const addNode = addNewNode
const recoverSourceCodeMode = recoverSourceCode
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
        @keydown.enter.prevent="addNode($event, bParsed, currentNode)"
        @blur="addNode($event, bParsed, currentNode)"
        @focus="recoverSourceCodeMode($event, currentNode, bParsed)"
    ></div>
</template>

<style scoped>
/* debug样式 */
div {
    border: solid 1px orangered;
}
</style>
