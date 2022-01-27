<script setup lang="ts">
import { marked } from "marked"
import prettier from "prettier/esm/standalone.mjs"
import parserBabel from "prettier/esm/parser-babel.mjs"
import { reactive, ref, Ref } from "vue"
import { addNewNode } from "@/composables/cDom"
import { cCodeBlockNode } from "@/composables/type"
import { v4 } from "uuid"
import { paragraphs } from "@/composables/config"
const props = defineProps({
	paragraph: {
		type: Object as () => cCodeBlockNode,
	},
})
let codeHint = ref<HTMLElement | null>()
let error: Ref<boolean> = ref(false)
let bParsed = reactive({ value: false }) //是否转化为markdown
let currentNode: cCodeBlockNode = props.paragraph!
function saveNode(language: string, event: FocusEvent) {
	currentNode = {
		title: v4(),
		language: currentNode.language,
		originalMarkdown: (event.target as HTMLElement).innerText,
		type: "codeBlock",
	}
}
function render(event: FocusEvent) {
	let target = event.target as HTMLElement
	;(target.childNodes[0] as HTMLElement).innerHTML = `<div>${
		(target.childNodes[0] as HTMLElement).innerText
	}</div>`

	try {
		target.innerHTML = prettier.format(target.innerText, {
			parser: "babel",
			plugins: [parserBabel],
		})
		error.value = false
	} catch (err) {
		console.log(err)

		error.value = true
		codeHint.value!.innerText = err as unknown as string
	}

	target.innerHTML = marked.parse(
		"```java\n" + target.innerText.trim() + "\n```"
	)
}
</script>

<template>
	<div class="code-block">
		<div class="buttons">
			<div class="pink"></div>
			<div class="yellow"></div>
			<div class="green"></div>
		</div>
		<div
			spellcheck="false"
			class="content"
			contenteditable="true"
			@blur="render($event), saveNode('js', $event)"
		></div>
	</div>
	<div class="hint" v-show="error" ref="codeHint"></div>
</template>

<style scoped lang="scss">
.code-block {
	background-color: #131313;
	border-radius: 5px;
	min-height: 100px;
	padding: 8px;
	width: 88%;
	margin: auto;
	font-family: "cascadia code";
	.buttons {
		display: flex;
		margin-bottom: 20px;
		div {
			width: 0.7rem;
			height: 0.7rem;
			border-radius: 50%;
			margin-right: 10px;
		}
		div:nth-child(1) {
			background-color: #ec5e50;
		}
		div:nth-child(2) {
			background-color: #f4b63d;
		}
		div:nth-child(3) {
			background-color: #4ebd45;
		}
	}
	.content {
		border: none;
		outline: none;
		padding: 0;
	}
}

.hint {
	width: 88%;
	margin: auto;
	font-size: 12px;
	background-color: #ff00001c;
	padding: 8px;
	border-radius: 8px;
	margin-top: 4px;
	font-family: "cascadia code", "Sarasa UI SC", "Open Sans", "Clear Sans",
		"Helvetica Neue", Helvetica, Arial, "Segoe UI Emoji", sans-serif;
}
</style>
