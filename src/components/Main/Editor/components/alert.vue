<script setup lang="ts">
import { cAlertNode } from "@/api/interfaces/type";
import { addNewNode, recoverSourceCodeMode } from "@/api/Editor/Editor"
import { reactive } from "vue";

const props = defineProps({
    value: {
        type: Object as () => cAlertNode,
    },
});
let currentNode: cAlertNode = props.value!;
let bParsed = reactive({ value: false }) //是否转化为markdown

</script>

<template>
    <div
        ref="currentNode.text "
        spellcheck="false"
        class="alert"
        contenteditable="true"
        :style="{ backgroundColor: currentNode.color }"
        @keydown.enter.prevent="addNewNode($event, bParsed, currentNode)"
        @blur="addNewNode($event, bParsed, currentNode)"
    >{{ currentNode.text }}</div>
</template>

<style lang="scss" scoped>
.alert {
    padding: 8px;
    border-radius: 5px;
}
</style>