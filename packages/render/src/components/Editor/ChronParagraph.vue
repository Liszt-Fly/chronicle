<template>
    <div contenteditable="true" class="chron" ref="paragraph" @keydown="input" @blur="render">
        {{ node?.content ? node.content : "" }}
    </div>
</template>

<script lang="ts" setup>
import { Parser } from '@/Core/parser';
import { ChronComponent, ParserType } from '@/Core/ParserType';
import { onMounted, ref } from 'vue';

const props = defineProps({
    node: Object as () => Parser
})
const paragraph = ref<HTMLDivElement | null>(null)

onMounted(() => {
    props.node!.content = paragraph.value!.innerText
})
const input = (e: KeyboardEvent) => {

    switch (e.key) {
        case ("Enter"):
            e.preventDefault()
            render()

    }
}

const render = () => {
    props.node!.render(paragraph.value!)
    props.node!.type = ChronComponent.HEADING
}
</script>

<style lang="scss">
.chron:focus {
    outline: none
}
</style>