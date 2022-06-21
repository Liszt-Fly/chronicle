// 项目默认地址
import path from 'path'
import fs from "fs"
import { ref } from 'vue'
import fsp from "fs-extra"
import { trashBin } from '@/data/configdb'
import { fileTree } from './FileTree/fileTree'
import { fileNode } from './FileTree/fileNode'
export let chronicleUserPath = path.resolve(process.cwd(), "packages", "render", "src", "user")

export let appearanceFile = path.resolve(chronicleUserPath, "config", "chronicle.appearance.json")
export let appearanceFileDefault = path.resolve(chronicleUserPath, "config", "chronicle.appearance.default.json")
export let shortcutFile = path.resolve(chronicleUserPath, "config", "chronicle.shortcut.json")
export let shortcutFileDefault = path.resolve(chronicleUserPath, "config", "chronicle.shortcut.default.json")
export let generalFile = path.resolve(chronicleUserPath, "config", "chronicle.general.json")
export let generalFileDefault = path.resolve(chronicleUserPath, "config", "chronicle.general.default.json")

const appearanceFileData = fs.readFileSync(appearanceFile) as unknown as string
let appearance = JSON.parse(appearanceFileData)
const generalFileData = fs.readFileSync(generalFile) as unknown as string
let general = JSON.parse(generalFileData)
const shortcutFileData = fs.readFileSync(shortcutFile) as unknown as string
let shortcut = JSON.parse(shortcutFileData)

export let theme = appearance.theme
export let vditorTheme: "classic" | "dark" = appearance.theme ? "classic" : "dark"
const head = document.head || document.getElementsByTagName('head')[0];

// 样式初始化
let initAppearance = () => {

	const color = appearance.color
	const global_en_font = appearance.global_en_font
	const global_cn_font = appearance.global_cn_font
	const code_font = appearance.code_font
	const trotting_horse = appearance.trotting_horse
	const font_size = appearance.font_size
	const line_height = appearance.line_height
	const paragraph_space = appearance.paragraph_space
	const line_width = appearance.line_width

	if (trotting_horse)
		document.getElementById("app")!.className += 'trotting_horse';

	let globalStyle = document.createElement('style');
	globalStyle.innerText = `
		html.${appearance.theme ? "light" : "dark"} {
			--el-color-primary: ${color};
			--chronicle-global-en-font: ${global_en_font};
			--chronicle-global-cn-font: ${global_cn_font};
			--el-font-family: ${global_en_font}, ${global_cn_font};
			--chronicle-code-font: ${code_font};
		}
		
		.vditor-reset {
			font-size: ${font_size}px;
			line-height: ${line_height}rem;
		}
		
		.vditor-reset p {
			margin-bottom: ${paragraph_space}rem;
		}
		
		body .editor {
			width: ${line_width}%  !important;
		}	
	`
	head.appendChild(globalStyle);

	document.getElementsByTagName("html")[0].className = appearance.theme ? "light" : "dark"
}

// 通用初始化
let initGeneral = () => {
	const head = document.head || document.getElementsByTagName('head')[0];

	const devTools = general.devTools
	const tooltips = general.tooltips

	let generalStyle = document.createElement('style');
	generalStyle.innerText = `
	.devTools{
		display: ${devTools ? 'inline-flex' : 'none'}
	}
	${tooltips ? ".el-popper.is-customized {\
		/* Set padding to ensure the height is 32px */\
		padding: 6px 12px;\
		border: 1px solid var(--el-border-color-light);\
		background: var(--bg-color);\
	  }\
	  \
	  .el-popper.is-customized .el-popper__arrow::before {\
		background: var(--bg-color);\
		border: 1px solid var(--el-border-color-light);\
    	background: var(--el-bg-color-overlay);\
		right: 0;\
	  }" : ".el-popper.is-customized {display: none !important;}"
		}
	`
	head.appendChild(generalStyle);
}

// 快捷键初始化
let initShortcut = () => {

}

//垃圾箱初始化

let initTrashBin = () => {
	if (!fsp.existsSync(path.resolve(chronicleUserPath, ".trash"))) {
		fsp.mkdirSync(path.resolve(chronicleUserPath, ".trash"))
	}
	let trashRoot = new fileNode(path.resolve(chronicleUserPath, ".trash"), ".trash")
	trashBin.value = new fileTree(trashRoot)

}

export const locale = general.locale
export const workspaceName = general.workspaceName

// 初始化设置
export let initSetting = () => {
	initAppearance()
	initGeneral()
	initShortcut()
	initTrashBin()
}