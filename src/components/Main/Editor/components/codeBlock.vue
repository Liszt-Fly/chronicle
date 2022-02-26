<script setup lang="ts">
import { onMounted, ref, Ref, watchEffect } from "vue";
import { EditorState, Extension } from "@codemirror/state";
import { keymap, EditorView } from "@codemirror/view";
import "codemirror/mode/javascript/javascript.js";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { pythonLanguage } from "@codemirror/lang-python";
import { syntaxTree } from "@codemirror/language";
import { autocompletion } from "@codemirror/autocomplete";
import { oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
import { cCodeBlockNode, cNode } from "@/api/interfaces/type";
import { cursorDocEnd } from "@codemirror/commands";
import { nodes } from "@/api/configdb";
import { StreamLanguage } from "@codemirror/stream-parser"
import { dart } from '@codemirror/legacy-modes/mode/clike'
import { htmlLanguage } from "@codemirror/lang-html"
import { Parser } from "@/Parser/Parser";
import { article, bContentedible } from "@/Parser/db";
import { insertNode } from "@/Parser/_insertNode";
import { moveCursorToNextLine } from "@/api/cursor";
const props = defineProps({
	parser: Parser
});

let codeBlock = ref<HTMLElement | null>(null);

let extensions: Ref<Extension[]> = ref([])

let mytheme = EditorView.theme({}, { dark: true });
let editorstate: EditorState
let editorview: EditorView

const save = () => {


	let content = editorview.contentDOM.innerText
	props.parser!.content = content
	console.log(content)

}
watchEffect(() => {

	//TODO 此处有问题，使用Vue响应式处理，先清空，再添加
	switch (props.parser!.language) {
		case 'javascript': case 'js': case 'JAVASCRIPT':

			extensions.value.push(javascriptLanguage)
		case 'python': case 'PYTHON': case 'py':

			extensions.value.push(pythonLanguage)
		case 'dart': case 'DART':

			extensions.value.push(StreamLanguage.define(dart))
		case 'html': case "HTML":
			extensions.value.push(htmlLanguage)
	}

})
const click = () => {
	Parser.currentNodeParser = props.parser!
	bContentedible.value = false;
}

const blur = () => {
	bContentedible.value = true
	save()
}
onMounted(() => {
	editorstate = EditorState.create({
		doc: props.parser!.text ? props.parser!.text : "//This is a codeBlock...",
		extensions: [
			mytheme,
			oneDarkHighlightStyle,
			...extensions.value,
			keymap.of([
				{
					key: "Ctrl-Enter",
					run: (editorview) => {
						setTimeout(() => {
							//保存当前的内容

							bContentedible.value = true;
							save()
							let item = Parser.currentNodeParser
							let index: number = article.value.indexOf(item)
							insertNode(index + 1)
							moveCursorToNextLine(codeBlock.value as HTMLElement, index)
						}, 0);
						return true;
					},
				},
				{ key: "ArrowDown", run: cursorDocEnd },
			]),

		],
	})
	Parser.currentNodeParser = props.parser!

	editorview = new EditorView({
		state: editorstate,
		parent: codeBlock.value!,
	});

	function setSel(state: EditorState, selection: any) {
		return state.update({ selection, scrollIntoView: true, userEvent: "select" });
	}
	const cursorDocEnds = (state: any, dispatch: any) => {
		dispatch(setSel(state, { anchor: state.doc.length }));
	};
	editorview.focus();
	cursorDocEnds(editorview.state, editorview.dispatch);
});
</script>

<template>
	<div class="code-block" ref="codeBlock" @click="click" @blur="blur">
		<div class="appendix" contenteditable="false">
			<div class="pink"></div>
			<div class="yellow"></div>
			<div class="green"></div>
		</div>
		<div class="language" spellcheck="false" contenteditable="false">
			<span>{{ props.parser!.language }}</span>
			<el-divider direction="vertical"></el-divider>
			<i class="bi bi-front"></i>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.code-block {
	position: relative;
}
.appendix {
	display: flex;
	position: absolute;
	div {
		left: 0;
		top: 0;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		margin-right: 10px;
	}
}
.pink {
	background-color: #ec5e50;
}
.yellow {
	background-color: #f4b63d;
}
.green {
	background-color: #4ebd45;
}
.el-divider {
	margin-bottom: 0 !important;
}
</style>

