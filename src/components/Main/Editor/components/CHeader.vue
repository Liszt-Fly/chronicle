<script setup lang="ts">
import { article } from '@/Parser/db';
import { Parser } from '@/Parser/Parser';
import { c } from '@codemirror/legacy-modes/mode/clike';
import { onMounted, ref, watch } from 'vue';

// let content = ref<String>("")
const props = defineProps({
    parser: Parser
})
let emits = defineEmits(['render'])
onMounted(() => {

    Block.value!.innerText = props.parser!.text
})
let Block = ref<HTMLElement | null>()
const click = () => {
    //将原先focus的内容进行渲染

    // article.value.map(item => {

    //     if (item.id == Parser.currentNodeId) {

    //         let index = article.value.indexOf(item)
    //     }
    // })

    Parser.currentParser = props.parser!
    props.parser!.bMarked = false
    emits("render")

    // let range = document.createRange()
    // range.setEndBefore(Block.value!)
    // range.collapse(false);
    // let sel = window.getSelection();
    // sel!.removeAllRanges();

    // sel!.addRange(range);
}
</script>

<template>
    <div
        @click="click"
        tabindex="-1"
        ref="Block"
        :data-level="'H' + parser?.level"
        :style="{ fontSize: 35 - 3 * (parser!.level!) + 'px' }"
    ></div>
</template>

<style scoped>
* {
    color: orange;
    font-size: 18px;
}
div {
    min-height: 20px;
}
div::before {
    content: attr(data-level);
    left: -2;
    color: #ddd;
    border: solid 1px #ddd;
}
</style>
