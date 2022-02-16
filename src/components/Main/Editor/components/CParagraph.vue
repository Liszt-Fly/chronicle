<script setup lang="ts">
import { gotoEnd } from '@/api/Cursror/GoToEnd';
import { article } from '@/Parser/db';
import { Parser } from '@/Parser/Parser';
import { onMounted, ref, watch } from 'vue';
let paragraph = ref<HTMLElement | null>()
let props = defineProps({
    parser: Parser
})
let emits = defineEmits(['render'])
let content = ref<string>(props.parser!.content)
watch(article, () => {
    //刷新
    content.value = props.parser!.content


}, { deep: true })
onMounted(() => {

    Parser.currentNodeParser = props.parser!
    paragraph.value!.innerText = content.value


})
const click = () => {
    console.log("paragraph click")
    Parser.currentNodeParser = props.parser!

    //将原先focus的内容进行渲染
    //     if (props.parser !== Parser.currentNodeParser) {
    //         emits("render")
    //     }

    //     Parser.currentNodeParser = props.parser!
    //     props.parser!.bMarked = false
    //     paragraph.value!.innerHTML = props.parser!.content!
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
