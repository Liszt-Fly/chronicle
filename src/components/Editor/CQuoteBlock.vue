<script setup lang="ts">
import { Parser } from '@/Parser/Parser';
import { emoji, random } from '@/api/Emoji'
import { onMounted, ref } from 'vue';
import { moveToLineEnd } from '@/Parser/_moveToLineEnd';
let content = ref<HTMLElement | null>();
let props = defineProps({
    parser: Parser
})
onMounted(() => {
    Parser.currentNodeParser = props.parser!
    console.log("当前的Parser发生了变化")
    moveToLineEnd(content.value!)
})
const click = () => {
    Parser.currentNodeParser = props.parser!
}
</script>

<template>
    <div class="container" contenteditable="false" @click="click">
        <span class="icon" v-html="emoji[random()].content"></span>
        <span contenteditable="true" class="text" ref="content">{{ props.parser?.text }}</span>
    </div>
</template>

<style scoped>
.container {
    background-color: #f1c40f;
    border-radius: 5px;
    color: white;
    -webkit-box-shadow: -3px -3px 9px 0px rgba(0, 0, 0, 0.64);
    box-shadow: -3px -3px 9px 0px rgba(0, 0, 0, 0.64);
    padding: 10px;
    position: relative;
}
.text {
    padding-left: 10px;
}
</style>
