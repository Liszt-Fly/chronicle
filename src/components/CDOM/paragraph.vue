<script setup lang="ts">import { paragraphs } from '@/composables/config';
import { cTreeNode } from '@/composables/type';
import { bKeyBoardTarget } from '@/composables/util';
const props = defineProps({
    paragraph: {
        type: Object as () => cTreeNode
    }
})
import { marked } from 'marked';
import { v4 } from 'uuid';
import { onMounted, ref } from 'vue';
let paragraph = ref<HTMLElement | null>(null)
onMounted(() => {
    paragraph.value?.focus()
})
let currentNode: cTreeNode = props.paragraph!
let bParsed = ref(false)//是否转化为markdown
function addNewNode(event: KeyboardEvent | FocusEvent) {
    //修改保存当前的node
    if (!bParsed.value) {

        event.preventDefault()
        let target = event.target as unknown as HTMLElement;
        let originalText = target.innerText
        let parsedMarkdown = marked.parse(originalText)
        target.innerHTML = parsedMarkdown
        bParsed.value = true
        currentNode.originalMarkdown = originalText
    }
    if (bKeyBoardTarget(event)) {
        //当前节点是最后一个节点
        if (paragraphs.value.indexOf(currentNode) == paragraphs.value.length - 1) {
            let newNode: cTreeNode = { title: v4(), originalMarkdown: "test" }
            paragraphs.value.push(newNode)
            let target = event.target as HTMLElement
            target.blur()
        }
    }
}

function recoverState(event: FocusEvent) {
    if (bParsed.value) {
        let target = event.target as unknown as HTMLElement
        target.innerText = currentNode.originalMarkdown
        bParsed.value = false
    }
}
</script>

<template>
    <div
        contenteditable="true"
        ref="paragraph"
        @keydown.enter.prevent="addNewNode($event)"
        @blur="addNewNode($event)"
        @focus="recoverState($event)"
    ></div>
</template>

<style scoped>
</style>
