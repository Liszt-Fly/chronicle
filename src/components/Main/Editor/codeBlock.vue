<script setup lang="ts">

import { marked } from "marked"
import { ref, Ref } from "vue"
import { cCodeBlockNode } from "@/api/NavBar/FileSystem/type"
import { v4 } from "uuid"
import prettier from 'prettier/standalone.js'
import parserBabel from 'prettier/esm/parser-babel.mjs'
const props = defineProps({
	paragraph: {
		type: Object as () => cCodeBlockNode,
	},
})

let codeHint = ref<HTMLElement | null>()
let error: Ref<boolean> = ref(false)

let currentNode: cCodeBlockNode = props.paragraph!
function saveNode(language: string, event: FocusEvent) {
	currentNode = {
		title: v4(),
		language: currentNode.language,
		originalMarkdown: (event.target as HTMLElement).innerText,
		type: currentNode.type,
	}
}
function render(event: FocusEvent) {
	let target = event.target as HTMLElement
	(target.childNodes[0] as HTMLElement).innerHTML = `<div>${(target.childNodes[0] as HTMLElement).innerText}</div>`

	try {
		switch (currentNode.language) {
			case 'js':
				target.innerText = (prettier.format(target.innerText, {
					parser: "babel",
					plugins: [parserBabel]
				}))

				target.innerHTML = marked.parse(
					"```" + currentNode.language + "\n" + target.innerText.trim() + "\n```"
				)
				break;
			case 'php':
				break;
		}

		error.value = false
	} catch (err) {
		console.log(err)
		error.value = true
		codeHint.value!.innerText = String(err)
	}
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
