import fs from 'fs'
export interface msfile {
	name?: string
	isDirectory?: boolean
	children?: msfile[] | null
	stat?: fs.Stats
	path?: string
}

export interface cNode {
	text: string
	type: string
}

export interface cAlertNode extends cNode {
	color: string
}

export interface cCodeBlockNode extends cNode {
	language: string
}

export interface Iconfig {
	[key: string]: string
}