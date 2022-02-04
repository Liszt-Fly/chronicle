<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { v4 } from "uuid";
import { EditorSelection, EditorState } from "@codemirror/state";
import { keymap, EditorView } from "@codemirror/view";
import "codemirror/mode/javascript/javascript.js";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { python, pythonLanguage } from "@codemirror/lang-python";
import { syntaxTree } from "@codemirror/language";
import { autocompletion } from "@codemirror/autocomplete";
import { oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
import { cCodeBlockNode, cTreeNode } from "@/api/interfaces/type";
import { cursorDocEnd } from "@codemirror/commands";
import { currentFile, paragraphs } from "@/api/configdb";

const props = defineProps({
	paragraph: {
		type: Object as () => cCodeBlockNode,
	},
});

let codeBlock = ref<HTMLElement | null>(null);
let currentNode: cCodeBlockNode = props.paragraph!;

const completePropertyAfter = ["PropertyName", ".", "?."];
const dontCompleteIn = [
	"TemplateString",
	"LineComment",
	"BlockComment",
	"VariableDefinition",
	"PropertyDefinition",
];
function completeProperties(from: any, object: any) {
	let options = [];
	for (let name in object) {
		options.push({
			label: name,
			type: typeof object[name] == "function" ? "function" : "variable",
		});
	}
	return {
		from,
		options,
		span: /^[\w$]*$/,
	};
}

function _optionalChain(ops: string | any[]) {
	let lastAccessLHS: undefined = undefined;
	let value = ops[0];
	let i = 1;
	while (i < ops.length) {
		const op = ops[i];
		const fn = ops[i + 1];
		i += 2;
		if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
			return undefined;
		}
		if (op === "access" || op === "optionalAccess") {
			lastAccessLHS = value;
			value = fn(value);
		} else if (op === "call" || op === "optionalCall") {
			value = fn((...args: any) => value.call(lastAccessLHS, ...args));
			lastAccessLHS = undefined;
		}
	}
	return value;
}
function completeFromGlobalScope(context: any) {
	let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);

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
		let object = nodeBefore.parent.getChild("Expression");
		if (
			_optionalChain([object, "optionalAccess", (_3: any) => _3.name]) == "VariableName"
		) {
			let from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from;
			let variableName = context.state.sliceDoc(object.from, object.to);
			if (typeof window[variableName] == "object")
				return completeProperties(from, window[variableName]);
		}
	} else if (nodeBefore.name == "VariableName") {
		return completeProperties(nodeBefore.from, window);
	} else if (context.explicit && !dontCompleteIn.includes(nodeBefore.name)) {
		return completeProperties(context.pos, window);
	}
	return null;
}
const globalJavaScriptCompletions = javascriptLanguage.data.of({
	autocomplete: completeFromGlobalScope,
});

let language: Ref<string> = ref(currentNode.language);
let code: Ref<string> = ref("");
let content: Ref<HTMLTextAreaElement | null> = ref(null);
onMounted(() => {
	let mytheme = EditorView.theme({}, { dark: true });

	function addNode(es: EditorView) {

		//saveCurrentNode
		currentNode.originalMarkdown = es.contentDOM.innerText
		// saveNodeLists(paragraphs.value,currentFile.value)
		//如果当前节点是最后的节点，新增一个节点

		let newNode: cTreeNode = {
			title: v4(),
			originalMarkdown: "",
			type: "paragraph",
		};
		paragraphs.value.splice(paragraphs.value.indexOf(currentNode) + 1, 0, newNode)


		console.log(paragraphs.value.length);
	}

	let editorview = new EditorView({

		state: EditorState.create({
			doc: currentNode.originalMarkdown ? currentNode.originalMarkdown : "test",
			extensions: [
				javascriptLanguage,
				globalJavaScriptCompletions,
				mytheme,
				oneDarkHighlightStyle,
				pythonLanguage,
				keymap.of([
					{
						key: "Ctrl-Enter",
						run: (editorview) => {
							addNode(editorview);
							return true;
						},
					},
					{ key: "ArrowDown", run: cursorDocEnd },
				]),
				autocompletion(),
			],
		}),
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
	<div class="code-block" ref="codeBlock">
		<div class="appendix">
			<div class="pink"></div>
			<div class="yellow"></div>
			<div class="green"></div>
		</div>
		<div class="language" spellcheck="false">
			<!-- <span>{{ currentNode.language }}</span> -->
			<i class="bi bi-front"></i>
		</div>
	</div>
</template>
<style lang="scss">
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
</style>

