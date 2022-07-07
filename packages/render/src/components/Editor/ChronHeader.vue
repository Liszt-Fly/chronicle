<template>
    <div class="chron" ref="header" @click="focus">
        <template v-if="node!.RenderedContent == undefined || node!.RenderedContent.length == 0">
            <div>Header</div>
        </template>
        <template v-else>
            <div> 我是一个Header::&nbsp;{{ node!.RenderedContent }}</div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { Parser } from '@/Core/parser';
import { ChronComponent, ParserType } from '@/Core/ParserType';
import { marked } from 'marked';
import { onMounted, ref } from 'vue';
const props = defineProps({
    node: Object as () => Parser
})
const header = ref<HTMLDivElement | null>(null)
let parser = new Parser("", ChronComponent.HEADING, ParserType.INLINE)
onMounted(() => {
    console.log('props.node!.RenderedContent', props.node!.RenderedContent)
    parser.content = props.node!.RenderedContent
})
const focus = () => {
    props.node!.type = ChronComponent.PARAGRAPH
    console.log('props.node', props.node)
}
</script>

<style lang="scss" scoped>
.chron {}

.chron:focus {
    outline: none
}
</style>