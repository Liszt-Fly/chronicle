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
    bContentedible.value = true
    paragraph.value!.innerText = content.value
    //鼠标自动聚焦到段落末尾
    moveToLineEnd(paragraph.value!)

})
const click = () => {
    console.log("paragraph click")
    bContentedible.value = true
    Parser.currentNodeParser = props.parser!
}

</script>

<template>
    <div>
        <div ref="paragraph" @click="click"></div>
    </div>
</template>

<style scoped>
div {
    min-height: 20px;
}
</style>
