<script setup lang="ts">
import { marked } from "marked"
import prettier from "prettier/esm/standalone.mjs"
import parserBabel from "prettier/esm/parser-babel.mjs"
import { ref, Ref } from "vue"

let codeHint = ref<HTMLElement | null>()
let error: Ref<boolean> = ref(false)

function render(event: FocusEvent) {
	let target = event.target as HTMLElement
	;(target.childNodes[0] as HTMLElement).innerHTML = `<div>${
		(target.childNodes[0] as HTMLElement).innerText
	}</div>`
	console.log(target.childNodes[1])

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

	target.innerHTML = marked.parse("```js\n" + target.innerText.trim() + "\n```")
}
</script>

<template>
	<div class="code-block">
		<div class="buttons">
			<div class="pink"></div>
			<div class="yellow"></div>
			<div class="green"></div>
		</div>
		<div class="content" contenteditable="true" @blur="render($event)"></div>
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
