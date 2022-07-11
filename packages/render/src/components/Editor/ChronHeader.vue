<template>
    <div class="chron" ref="header" @click="focus">
        <template v-if="node.RenderedContent == undefined || node.RenderedContent.length == 0">
            <div>Header</div>
        </template>
        <template v-else>
            <div :style="{fontSize:40-4*node.level+'px'}"> KSP{{ node.RenderedContent }}</div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { Parser } from '@/Core/parser';
import { ChronComponent, ParserType } from '@/Core/ParserType';
import { onMounted, ref } from 'vue';
const props = defineProps({
    node: Object as () => Parser
})
const header = ref<HTMLDivElement | null>(null)
let parser = new Parser("", ChronComponent.HEADING)
onMounted(() => {
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
    outline: none;

}
</style>