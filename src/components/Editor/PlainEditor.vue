<script setup lang="ts">
import { marked } from "marked"
import { ref, watch } from "vue";

marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
})

let markdown = ref("");
let html = ref(null)
watch(markdown, (newValue, oldValue) => {
    console.log(html.value);
    (html.value as unknown as HTMLDivElement).innerHTML = marked.parse(markdown.value)
})

</script>

<template>
    <div class="plainEditor">
        <textarea class="markdown" v-model="markdown" spellcheck="false"></textarea>
        <div class="editor" ref="html"></div>
    </div>
</template>

<style>
.plainEditor {
    display: flex;
    flex-direction: row;
    height: calc(100% - 0.2rem);
}

.markdown {
    width: 50%;
    border: none;
    font-family: "Sarasa UI SC";
    font-size: 1rem;
    border-right: 0.2rem solid whitesmoke;
}

.editor {
    width: 50%;
    height: 100%;
}
</style>