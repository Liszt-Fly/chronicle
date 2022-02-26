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