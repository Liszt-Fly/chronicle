<script setup lang="ts">
import EditorVue from '@/views/Main/Editor.vue';
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
