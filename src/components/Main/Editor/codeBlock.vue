<script setup lang="ts">
import { marked } from "marked"
import { ref, Ref } from "vue"
import { cCodeBlockNode } from "@/api/NavBar/FileSystem/type"
import phpPlugin from "@prettier/plugin-php/standalone.js"
import { v4 } from "uuid"
import prettier from "prettier/standalone.js"
import parserBabel from "prettier/esm/parser-babel.mjs"
import { addNewNode } from "@/api/Editor/Editor"
const props = defineProps({
	paragraph: {
		type: Object as () => cCodeBlockNode,
	},
})

let codeHint = ref<HTMLElement | null>()
let error: Ref<boolean> = ref(false)

let currentNode: cCodeBlockNode = props.paragraph!
function saveNode(event: FocusEvent) {
	currentNode = {
		title: v4(),
		language: language.value,
		originalMarkdown: (event.target as HTMLElement).innerText,
		type: currentNode.type,
	}
}

let language: Ref<string> = ref(currentNode.language)
let code: Ref<string> = ref("")

function highlight(event: FocusEvent) {
	let target = event.target as HTMLElement
	try {
		switch (currentNode.language) {
			case "js" || "javascript" || "JS":
				prettier.format(target.innerText, {
					parser: "babel",
					plugins: [parserBabel],
				})
				break
			case "php":
				prettier.format(target.innerText, {
					parser: "php",
					plugins: [phpPlugin],
				})
				break
		}
		error.value = false
	} catch (err) {
		console.log(err)
		error.value = true
		codeHint.value!.innerText = String(err)
	}
	code.value = target.innerText
}

function enter(e: KeyboardEvent) {
	if (e.shiftKey) {
	} else {
		e.preventDefault()
		currentNode.originalMarkdown = "521312313"
	}
}
</script>

<template>
	<div class="code-block">
		<div class="appendix">
			<div class="pink"></div>
			<div class="yellow"></div>
			<div class="green"></div>
			<div class="code-language" contenteditable="true" spellcheck="false">
				{{ language }}
			</div>
		</div>
		<!-- <div
			spellcheck="false"
			class="content"
			contenteditable="true"
			@blur="render($event), saveNode('js', $event)"
		></div>-->
		<highlightjs
			spellcheck="false"
			contenteditable="true"
			:language="language"
			:code="code"
			@blur="highlight($event), saveNode($event)"
			@keydown.enter="enter($event)"
		/>
	</div>
	<div class="code-hint" v-show="error" ref="codeHint"></div>
</template>
