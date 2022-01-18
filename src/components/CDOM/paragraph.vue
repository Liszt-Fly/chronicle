<template>
    <div
        ref="paragraph"
        class="chronicle-paragraph"
        contenteditable="true"
        spellcheck="false"
        @focus="recover($event)"
        @blur="addNewParagraph($event)"
    >{{ content }}</div>
</template>
<script lang="ts" setup>
defineProps({
    content: {
        type: String, default: ""
    }
})
import { onMounted, ref } from 'vue'
import { cTreeNode } from '@/composables/type';
import { v4 } from 'uuid'
import { paragraphs } from '@/composables/config';
import { marked } from 'marked';
import fsp from 'fs-extra'
let savedParagraph: cTreeNode | null
let paragraph = ref<HTMLDivElement | null>(null)
let start = false
onMounted(() => {
    setTimeout(() => {
        setInterval(() => {
            fsp.writeJSONSync('./mikeedu.json', paragraphs.value)
        }, 1000)
    }, 2000);
})
function recover(event: FocusEvent) {

    if (savedParagraph) {
        console.log(savedParagraph.originalMarkdown)
        let target = event.target as unknown as HTMLElement
        target.innerText = savedParagraph.originalMarkdown
    }

}
function addNewParagraph(event: KeyboardEvent | FocusEvent) {
    start = true
    event.preventDefault()
    let target = event.target as unknown as HTMLElement
    let text = ""
    let md = ""
    text = target.innerText
    md = marked.parse(text)
    console.log(text)
    //保存现在的paragraph
    if (!savedParagraph) {
        let hash = v4()
        savedParagraph = { title: hash, createdOrModifiedTime: new Date(), content: paragraph.value!, originalMarkdown: text }
        paragraphs.value.push(savedParagraph)

    }
    else {
        savedParagraph.createdOrModifiedTime = new Date()
        savedParagraph.content = paragraph.value!
        savedParagraph.originalMarkdown = text
    }


    //所见即所得
    target.innerHTML = md
    console.log(paragraphs.value)
}

function loadFile() {
    for (let i = 0; i <= paragraphs.value.length; i++) {
        console.log(paragraphs.value[i])
    }
}
</script>
<style style="less">
.chronicle-paragraph {
    outline: none;
    font-family: "Fira Code";
}
</style>