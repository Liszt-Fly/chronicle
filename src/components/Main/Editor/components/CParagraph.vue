<script setup lang="ts">
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
    Parser.currentNodeId = props.parser!.id
    paragraph.value!.innerText = content.value

})
const click = () => {
    //将原先focus的内容进行渲染

    article.value.map(item => {

        if (item.id == Parser.currentNodeId) {

            let index = article.value.indexOf(item)
            emits("render", index)




        }
    })
    Parser.currentNodeId = props.parser!.id
    props.parser!.bMarked = false
    paragraph.value!.innerHTML = props.parser!.content!
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
