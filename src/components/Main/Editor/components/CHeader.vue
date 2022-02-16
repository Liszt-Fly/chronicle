<script setup lang="ts">
import { gotoEnd } from '@/api/Cursror/GoToEnd';
import { article } from '@/Parser/db';
import { ChronicleNode } from '@/Parser/Node';
import { Parser } from '@/Parser/Parser';
import { c } from '@codemirror/legacy-modes/mode/clike';
import { onMounted, ref, watch } from 'vue';

// let content = ref<String>("")
const props = defineProps({
    parser: Parser
})
let emits = defineEmits(['render'])

let Block = ref<HTMLElement | null>()
onMounted(() => {

    Block.value!.innerText = props.parser!.text
})


const click = () => {
    Parser.currentNodeParser = props.parser!
    //* click将会从Parse渲染状态回到Normal状态
    props.parser!.type = ChronicleNode.paragraph
    //* 设置光标到末尾
    console.log("click")




}
</script>

<template>
    <div
        @click="click"
        tabindex="-1"
        ref="Block"
        class="header"
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
