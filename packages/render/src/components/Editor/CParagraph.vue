<script setup lang="ts">
import { article, bContentedible } from '@/Parser/db';
import { Parser } from '@/Parser/Parser';
import { onMounted, ref, watch } from 'vue';
import { moveToLineEnd } from '@/Parser/_moveToLineEnd';

let paragraph = ref<HTMLElement | null>()
let props = defineProps({
    parser: Parser
})

let content = ref<string>(props.parser!.content)
watch(article, () => {
    //刷新
    content.value = props.parser!.content
}, { deep: true })
onMounted(() => {

    Parser.currentNodeParser = props.parser!

    if (props.parser!.bEmphasized == true || props.parser!.bDeleted == true) {

        paragraph.value!.innerHTML = props.parser!.text
    }

    else {

        paragraph.value!.innerText = props.parser!.content
    }

    //鼠标自动聚焦到段落末尾
    moveToLineEnd(paragraph.value!)

})
const click = () => {

    bContentedible.value = true
    if (props.parser!.bEmphasized == true) {

        props.parser!.bEmphasized = false


        // moveToLineEnd(paragraph.value!)
    }
    if (props.parser!.bDeleted == true) {
        props.parser!.bDeleted = false


    }
    paragraph.value!.innerText = props.parser!.content
    Parser.currentNodeParser = props.parser!

    //鼠标自动聚焦到段落末尾
    moveToLineEnd(paragraph.value!)
}

</script>

<template>
    <div ref="paragraph" @click="click"></div>
</template>

<style scoped>
div {
    min-height: 20px;
}
</style>
