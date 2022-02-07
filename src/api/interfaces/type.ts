import { EditorView } from '@codemirror/view'
import fs from 'fs'
export interface msfile {
	name?: string
	isDirectory?: boolean
	children?: msfile[] | null
	stat?: fs.Stats
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

export interface abstractNode {
	//uuid
	title: string,
	content: string,
	type: string,
}

export interface Iconfig {
	[key: string]:string
}