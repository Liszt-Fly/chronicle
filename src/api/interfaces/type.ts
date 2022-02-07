import fs from 'fs'
export interface msfile {
	name?: string
	isDirectory?: boolean
	children?: msfile[] | null
	stat?: fs.Stats
	path?: string
}

export interface cTreeNode {
	originalMarkdown: string
}

export interface abstractNode {
	//uuid
	title: string,
	content: string,
	type: string,
}

export interface Iconfig {
	[key: string]: string
}