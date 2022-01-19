<script setup lang="ts">
import { marked } from "marked";
import { createElementBlock, onMounted, ref, watch, getCurrentInstance } from "vue";
import hljs from "highlight.js";
import { v4 } from 'uuid'
import paragraph from "@/components/CDOM/paragraph.vue";
import { paragraphs } from "@/composables/config";
import { cTreeNode } from "@/composables/type";
let rContainer = ref<HTMLBaseElement | null>(null);
let initialNode: cTreeNode = { title: v4(), originalMarkdown: " " }
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    langPrefix: "hljs",
});

onMounted(() => {
    paragraphs.value.push(initialNode)
});
</script>

<template>
    <div class="container" ref="rContainer">
        <paragraph v-for="paragraph in paragraphs" :paragraph="paragraph"></paragraph>
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
