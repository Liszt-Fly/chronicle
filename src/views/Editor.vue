<script setup lang="ts">
import { marked } from "marked"
import { createElementBlock, onMounted, ref, watch } from "vue"

import hljs from "highlight.js"

import fsp from 'fs-extra'
import Paragraph from "@/components/CDOM/paragraph.vue"
import { cTreeNode } from "@/composables/type"
let rContainer = ref<HTMLBaseElement | null>(null)
let p: cTreeNode[]
let res = fsp.readJSONSync('./mikeedu.json')

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    langPrefix: "hljs",
})


function addElement() {
    let div: HTMLDivElement = document.createElement("div")!
    div.contentEditable = "true"
    div.style.outline = "none"

    rContainer.value!.appendChild(div)

    div.focus()
    let text = ""
    let md = ""
    let bBlock = false
    div.addEventListener("keydown", (event) => {
        let target = event.target as HTMLDivElement

        if (!bBlock) {
            bBlock = true
            if (event.keyCode == 13) {
                if (target.innerText.startsWith("```") && target.innerText.length > 3 && !target.innerText.endsWith("```")) {

                }

                else {
                    event.preventDefault()
                    text = target.innerText

                    md = marked.parse(text)

                    target.innerHTML = md
                    addElement()
                }
            }
        }
        bBlock = false
    })
    div.addEventListener("focus", (event) => {
        let target = event.target as HTMLDivElement
        target.innerText = text

        // event.target.innerHTML = text
    })
    div.addEventListener("blur", (event) => {
        let target = event.target as HTMLDivElement
        if (!bBlock) {
            bBlock = true
            text = target.innerText
            md = marked.parse(text)
            console.log(md)
            target.innerHTML = md
        }
        bBlock = false
    })
}

</script>

<template>
    <div class="container" ref="rContainer">
        <Paragraph v-if="res.length != 0" v-for="r in res" :content="r.originalMarkdown"></Paragraph>
        <Paragraph v-else content=" "></Paragraph>
    </div>
</template>

<style lang="scss">
.container {
    height: 100vh;
    font-size: 1rem;
    width: 77vw;
    white-space: pre-wrap;
}
</style>
