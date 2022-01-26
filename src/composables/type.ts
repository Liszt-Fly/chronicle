export interface msfile {
	name?: string
	isDirectory?: boolean
	children?: msfile[] | null
}
export interface cTree {
	children?: cTreeNode | null
}

export interface cTreeNode {
	title: string
	originalMarkdown: string
}

export interface cCodeBlock extends cTreeNode {
	language: string
}
