<template>
	<div class="editor">
		<textarea id="content-box" v-model="markdownContent"></textarea>
		<div class="res" v-html="htmlcontent"></div>
	</div>
</template>

<script>
// @ts-nocheck

import { marked } from "marked"
export default {
	data() {
		return {
			htmlcontent: "",
			markdownContent: "",
		}
	},
	watch: {
		markdownContent(n, o) {
			this.htmlcontent = marked.parse(n)
		},
	},
}
</script>

<style lang="scss" scoped>
.editor {
	width: 75vw;
	height: 100vh;
	display: flex;

	#content-box {
		width: 45vw;
		height: 100vh;
		resize: none;
		border: none;
		outline: none;
		z-index: 1;
		font-family: "Cascadia Code";
	}
	.res {
		width: 45vw;
		height: 100vh;
		border: none;
		outline: none;
	}
}
</style>
