<script setup lang="ts">
import { onMounted, ref, Ref } from "vue"
import { v4 } from "uuid"
import { EditorState } from "@codemirror/state"
import {keymap, EditorView } from "@codemirror/view"
import "codemirror/mode/javascript/javascript.js"
import { javascriptLanguage } from "@codemirror/lang-javascript"
import {python, pythonLanguage} from '@codemirror/lang-python'
import { syntaxTree } from "@codemirror/language"
import { autocompletion } from "@codemirror/autocomplete"
import { oneDark,oneDarkHighlightStyle } from "@codemirror/theme-one-dark"
import { cCodeBlockNode, cTreeNode } from "@/Type/type"
import {insertNewline} from '@codemirror/commands'
import { saveNodeLists } from "@/api/Editor/Editor"
import { currentFile, paragraphs } from "@/api/configdb"

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
let codeblock = ref<HTMLElement | null>()
let language: Ref<string> = ref(currentNode.language)
let code: Ref<string> = ref("")
let content: Ref<HTMLTextAreaElement | null> = ref(null)
onMounted(() => {
  let mytheme= EditorView.theme({
	     "&": {

        color: "#2c313a",
        backgroundColor: "#222222",


    },
    ".cm-content": {
        caretColor: "#ddd",
		fontFamily:"'cascadia code'"
    },
    "&.cm-focused .cm-cursor": { borderLeftColor: "#ddd" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: "#F9F9F9" },
    ".cm-panels": { backgroundColor: "#252525", color: "#F9F9F9" },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
        backgroundColor: "#72a1ff59",
        outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
        backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#252525" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
        backgroundColor: "#bad0f847",
        outline: "1px solid #515a6b"
    },
    ".cm-gutters": {
        backgroundColor: "#222222",
        color: "#ddd",
        border: "none"
    },
    ".cm-activeLineGutter": {
        backgroundColor: "#222222"
    },
    ".cm-foldPlaceholder": {
        backgroundColor: "#222222",
        border: "none",
        color: "#ddd"
    },
    ".cm-tooltip": {
        border: "none",
        backgroundColor: "#131313"
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
        borderTopColor:"#131313",
        borderBottomColor: "#ddd"
    },
    ".cm-tooltip-autocomplete": {
        "& > ul > li[aria-selected]": {
            backgroundColor: "#131313",
            color: "#ddd"
        }
    }
}, { dark: true });
function addNode(es:EditorView):boolean{
//saveCurrentNode
currentNode.originalMarkdown=es.contentDOM.innerText
// saveNodeLists(paragraphs.value,currentFile.value)
//如果当前节点是最后的节点，新增一个节点
if(paragraphs.value.indexOf(currentNode)==paragraphs.value.length-1){

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

			doc: "// If you want to go out of the block, just type tab",
			extensions: [
				javascriptLanguage,
				globalJavaScriptCompletions,
				mytheme,
				oneDarkHighlightStyle,
				pythonLanguage,
				keymap.of([{key:"Tab",run:(editorview)=>{addNode(editorview);return true;}}]),
				autocompletion(),
			],
		}),
		parent: codeblock.value!,
	})
 if(currentNode.originalMarkdown!=""){
	 editorview.contentDOM.innerText=currentNode.originalMarkdown
 }
 else{
	 editorview.contentDOM.innerText=""
 }


})


</script>

<template>
	<div class="code-block" ref="codeblock">
		<div class="appendix">
			<div class="pink"></div>
			<div class="yellow"></div>
			<div class="green"></div>
		</div>
	<div class="language" >{{currentNode.language}}</div>
	</div>

</template>
<style scoped lang="scss">

.editor .code-block {
	position:relative;
    background-color: #222;
	margin-bottom: 1rem;
	width:80%;
}
.CodeMirror {
	border: none;
	width: 100%;
	height: 300px;

}
.language{
	margin-right: auto;
	display:inline-block;
	position:absolute;
	right:10px;
	top:5px;
}
</style>
