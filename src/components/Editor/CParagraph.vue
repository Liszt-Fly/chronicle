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
    console.log("我进行了挂载！")
    console.log(props.parser!)
    console.log(props.parser!.content)
    Parser.currentNodeParser = props.parser!

    if (props.parser!.bEmphasized == true || props.parser!.bDeleted == true) {
        console.log("从未执行过")
        paragraph.value!.innerHTML = props.parser!.text
    }

    else {
        console.log(`内容为:${props.parser!.content}`)
        paragraph.value!.innerText = props.parser!.content
    }

    //鼠标自动聚焦到段落末尾
    moveToLineEnd(paragraph.value!)

})
const click = () => {
    console.log("paragraph click")
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
