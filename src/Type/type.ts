import { EditorView } from '@codemirror/view'
export interface msfile {
	name?: string
	isDirectory?: boolean
	children?: msfile[] | null
	path?: string
}

export interface cTree {
	children?: cTreeNode | null
}

export interface cTreeNode {

	title: string
	originalMarkdown: string
	type: string
	editorView?: any

}

export interface cCodeBlockNode extends cTreeNode {
	language: string
}
