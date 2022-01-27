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
		; (target.childNodes[0] as HTMLElement).innerHTML = `<div>${(target.childNodes[0] as HTMLElement).innerText
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
	<div class="code-hint" v-show="error" ref="codeHint"></div>
</template>

