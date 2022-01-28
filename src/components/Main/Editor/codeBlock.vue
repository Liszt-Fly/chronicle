<script setup lang="ts">
import { marked } from "marked"
import { onMounted, ref, Ref } from "vue"
import { cCodeBlockNode } from "@/api/NavBar/FileSystem/type"
import phpPlugin from "@prettier/plugin-php/standalone.js"
import { v4 } from "uuid"
import prettier from "prettier/standalone.js"
import parserBabel from "prettier/esm/parser-babel.mjs"
import { addNewNode } from "@/api/Editor/Editor"
import prettierJava from "prettier-plugin-java"
import CodeMirror from "codemirror"
import "codemirror/mode/javascript/javascript.js"
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
let content: Ref<HTMLTextAreaElement | null> = ref(null)
onMounted(() => {
	let editor = CodeMirror.fromTextArea(content.value!, {
		mode: "javascript",
		theme: "ayu-dark",

	})
})

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

			<!-- <div class="code-language" contenteditable="true" spellcheck="false">
				{{ language }}
			</div> -->
		</div>
		<textarea ref="content"></textarea>
	</div>
	<div class="code-hint" v-show="error" ref="codeHint"></div>
</template>
<style>
.CodeMirror {
	border: none;
	width: 100%;
	height: 200px;
	background-color: #222;
}
</style>
