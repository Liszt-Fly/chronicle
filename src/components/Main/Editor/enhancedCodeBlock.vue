<script setup lang="ts">
import { onMounted, ref } from "vue"
let test = ref<HTMLTextAreaElement | null>(null)
onMounted(() => {})
</script>

<template>
	<textarea ref="test"></textarea>
</template>

<style scoped lang="scss">
@import url();
.CodeMirror {
	border: solid 5px #ddd;
	width: 200px;
	height: 400px;
	background: #222;
}
</style>
