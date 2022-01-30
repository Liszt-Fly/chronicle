<script setup lang="ts">
import { onMounted, ref, Ref } from "vue"
import { v4 } from "uuid"
import { EditorSelection, EditorState } from "@codemirror/state"
import { keymap, EditorView } from "@codemirror/view"
import "codemirror/mode/javascript/javascript.js"
import { javascriptLanguage } from "@codemirror/lang-javascript"
import { python, pythonLanguage } from '@codemirror/lang-python'
import { syntaxTree } from "@codemirror/language"
import { autocompletion } from "@codemirror/autocomplete"
import { oneDarkHighlightStyle } from "@codemirror/theme-one-dark"
import { cCodeBlockNode, cTreeNode } from "@/types/type"
import { cursorDocEnd } from '@codemirror/commands'
import { currentFile, paragraphs } from "@/api/configdb"

const props = defineProps({
	paragraph: {
		type: Object as () => cCodeBlockNode,
	},
})

let codeBlock = ref<HTMLElement | null>(null)
let currentNode: cCodeBlockNode = props.paragraph!
function saveNode(event: FocusEvent) {
	currentNode = {
		title: v4(),
		language: language.value,
		originalMarkdown: (event.target as HTMLElement).innerText,
		type: currentNode.type,
	}
}
const completePropertyAfter = ["PropertyName", ".", "?."]
const dontCompleteIn = [
	"TemplateString",
	"LineComment",
	"BlockComment",
	"VariableDefinition",
	"PropertyDefinition",
]
function completeProperties(from: any, object: any) {
	let options = []
	for (let name in object) {
		options.push({
			label: name,
			type: typeof object[name] == "function" ? "function" : "variable",
		})
	}
	return {
		from,
		options,
		span: /^[\w$]*$/,
	}
}

function _optionalChain(ops: string | any[]) {
	let lastAccessLHS: undefined = undefined
	let value = ops[0]
	let i = 1
	while (i < ops.length) {
		const op = ops[i]
		const fn = ops[i + 1]
		i += 2
		if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
			return undefined
		}
		if (op === "access" || op === "optionalAccess") {
			lastAccessLHS = value
			value = fn(value)
		} else if (op === "call" || op === "optionalCall") {
			value = fn((...args: any) => value.call(lastAccessLHS, ...args))
			lastAccessLHS = undefined
		}
	}
	return value
}
function completeFromGlobalScope(context: any) {
	let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)

	if (
		completePropertyAfter.includes(nodeBefore.name) &&
		_optionalChain([
			nodeBefore,
			"access",
			(_: any) => _.parent,
			"optionalAccess",
			(_2: any) => _2.name,
		]) == "MemberExpression"
	) {
		let object = nodeBefore.parent.getChild("Expression")
		if (
			_optionalChain([object, "optionalAccess", (_3: any) => _3.name]) ==
			"VariableName"
		) {
			let from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from
			let variableName = context.state.sliceDoc(object.from, object.to)
			if (typeof window[variableName] == "object")
				return completeProperties(from, window[variableName])
		}
	} else if (nodeBefore.name == "VariableName") {
		return completeProperties(nodeBefore.from, window)
	} else if (context.explicit && !dontCompleteIn.includes(nodeBefore.name)) {
		return completeProperties(context.pos, window)
	}
	return null
}
const globalJavaScriptCompletions = javascriptLanguage.data.of({
	autocomplete: completeFromGlobalScope,
})

let language: Ref<string> = ref(currentNode.language)
let code: Ref<string> = ref("")
let content: Ref<HTMLTextAreaElement | null> = ref(null)
onMounted(() => {


	let mytheme = EditorView.theme({}, { dark: true });



	function addNode(es: EditorView): boolean {
		//saveCurrentNode
		currentNode.originalMarkdown = es.contentDOM.innerText
		// saveNodeLists(paragraphs.value,currentFile.value)
		//如果当前节点是最后的节点，新增一个节点
		if (paragraphs.value.indexOf(currentNode) == paragraphs.value.length - 1) {

			let newNode: cTreeNode = {
				title: v4(),
				originalMarkdown: "",
				type: "paragraph",
			}
			paragraphs.value.push(newNode)

			console.log(paragraphs.value.length)
		}

		return false;
	}
	let editorview = new EditorView({

		state: EditorState.create({
			extensions: [
				javascriptLanguage,
				globalJavaScriptCompletions,
				mytheme,
				oneDarkHighlightStyle,
				pythonLanguage,
				keymap.of([{ key: "Tab", run: (editorview) => { addNode(editorview); return true; } }, { key: "ArrowDown", run: cursorDocEnd }]),
				autocompletion(),
			],
		}),
		parent: codeBlock.value!,
	})
	function setSel(state: EditorState, selection: any) {
		return state.update({ selection, scrollIntoView: true, userEvent: "select" });
	}

	const cursorDocEnds = (state: any, dispatch: any) => {
		dispatch(setSel(state, { anchor: state.doc.length }))
	};


	editorview.focus()
	cursorDocEnds(editorview.state, editorview.dispatch)
})




</script>

<template>
	<div class="code-block" ref="codeBlock">
		<div class="appendix">
			<div class="pink"></div>
			<div class="yellow"></div>
			<div class="green"></div>
		</div>
		<div class="language" spellcheck="false">{{ currentNode.language }}</div>
	</div>
</template>
<style scoped lang="scss">
.editor .code-block {
	position: relative;
	margin-bottom: 1rem;
}
.CodeMirror {
	border: none;
	width: 100%;
	height: 300px;
}
.language {
	margin-right: auto;
	display: inline-block;
	position: absolute;
	right: 10px;
	top: 5px;
	font-size: 0.8rem;
}
</style>
