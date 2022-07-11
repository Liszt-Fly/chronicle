<template>
    <div class="chron" ref="header" @click="focus" contenteditable="false">
        <template v-if="parser.RenderedContent == undefined || parser.RenderedContent.length == 0">
            <div>Header</div>
        </template>
        <template v-else>
            <div :style="{fontSize:40-4*parser.level+'px'}" v-html="parser.RenderedContent "
            > </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { Parser } from '@/Core/parser';
import { ChronComponent, ParserType } from '@/Core/ParserType';
import { onMounted, ref } from 'vue';
import {ParserNode} from "@/Core/ParserNode";
const props = defineProps({
    parser: Object as () => Parser,

})
const header = ref<HTMLDivElement | null>(null)
onMounted(() => {
})
const focus = () => {
    props.parser!.type = ChronComponent.PARAGRAPH
    console.log('props.node', props.parser)
}
</script>

<style lang="scss" scoped>
.chron {}

.chron:focus {
    outline: none;

}
</style>