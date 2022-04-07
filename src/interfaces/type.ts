import fs from 'fs'
export interface msfile {
	name?: string
	isDirectory?: boolean
	children?: msfile[] | null
	stat?: fs.Stats
	path?: string
}
export interface Iconfig {
	[key: string]: string
}
export interface Emoji {
	name: string,
	content: string
}

export interface qFile {
	name: string,
	children: qFile[] | null,
	path: string
}