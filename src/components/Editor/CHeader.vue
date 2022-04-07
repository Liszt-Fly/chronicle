<script setup lang="ts">
import { article } from '@/Parser/db';
import { ChronicleNode } from '@/Parser/Node';
import { Parser } from '@/Parser/Parser';
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
    Parser.currentNodeParser.type = ChronicleNode.paragraph
    let index: number = article.value.indexOf(Parser.currentNodeParser)
    article.value.splice(index, 1, props.parser!)
    //* 设置光标到末尾


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
        :id="parser!.text"
    ></div>
</template>

<style scoped>
div {
    min-height: 20px;
}
</style>
