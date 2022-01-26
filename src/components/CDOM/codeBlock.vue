<script setup lang="ts">
import { marked } from "marked"
import prettier from "prettier/esm/standalone.mjs"
import parserBabel from "prettier/esm/parser-babel.mjs"
function render(event: FocusEvent) {
	let target = event.target as HTMLElement
	;(target.childNodes[0] as HTMLElement).innerHTML = `<div>${
		(target.childNodes[0] as HTMLElement).innerText
	}</div>`
	console.log(target.childNodes[1])

	// prettier.format("type Query { hello: String }", {
	// 	parser: "graphql",
	// 	plugins: prettierPlugins,
	// })

	console.log(
		(target.innerHTML = prettier.format(target.innerText, {
			parser: "babel",
			plugins: [parserBabel],
		}))
	)
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
</template>

<style scoped lang="scss">
.code-block {
	background-color: #131313;
	border-radius: 5px;
	min-height: 100px;
	padding-left: 5px;
	padding-top: 10px;
	width: 60%;
	.buttons {
		display: flex;
		margin-bottom: 20px;
		div {
			width: 0.5rem;
			height: 0.5rem;
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
code {
	border: none !important;
	outline: none;
}
</style>
