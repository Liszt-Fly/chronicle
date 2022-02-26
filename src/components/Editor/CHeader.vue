<script setup lang="ts">
import { article } from '@/Parser/db';
import { ChronicleNode } from '@/Parser/Node';
import { Parser } from '@/Parser/Parser';
import { c } from '@codemirror/legacy-modes/mode/clike';
import { onMounted, ref, watch } from 'vue';


const props = defineProps({
    parser: Parser
})

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
        :class="'h' + parser!.level!"
        :data-level="'H' + parser?.level"
    ></div>
</template>

<style scoped>
div {
    min-height: 20px;
}
</style>
