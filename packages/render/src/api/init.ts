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

const primary_colors = {
	// 翡翠
	"#9fd7b6": `--el-color-primary: #9fd7b6;
    			--el-color-primary-light-3: #bce3cc;
    			--el-color-primary-light-5: #cfebdb;
    			--el-color-primary-light-7: #e2f3e9;
				--el-color-primary-light-8: #ecf7f0;
				--el-color-primary-light-9: #f5fbf8;
				--el-color-primary-dark-2: #7fac92;`,
	// 冷杉
	"#8c99aa": `--el-color-primary: #81a28b;
				--el-color-primary-light-3: #a7beae;
				--el-color-primary-light-5: #c0d1c5;
				--el-color-primary-light-7: #d9e3dc;
				--el-color-primary-light-8: #e6ece8;
				--el-color-primary-light-9: #f2f6f3;
				--el-color-primary-dark-2: #67826f;`,
	// 花青
	"#5a5ec6": `--el-color-primary: #5a5ec6;
				--el-color-primary-light-3: #8c8ed7;
				--el-color-primary-light-5: #adafe3;
				--el-color-primary-light-7: #cecfee;
				--el-color-primary-light-8: #dedff4;
				--el-color-primary-light-9: #efeff9;
				--el-color-primary-dark-2: #484b9e;`,

	// 胭脂
	"#ed764c": `--el-color-primary: #ed764c;
				--el-color-primary-light-3: #f29f82;
				--el-color-primary-light-5: #f6bba6;
				--el-color-primary-light-7: #fad6c9;
				--el-color-primary-light-8: #fbe4db;
				--el-color-primary-light-9: #fdf1ed;
				--el-color-primary-dark-2: #be5e3d;`,

	// 丹
	"#ffb11b": `--el-color-primary: #ffb11b;
				--el-color-primary-light-3: #ffc85f;
				--el-color-primary-light-5: #ffd88d;
				--el-color-primary-light-7: #ffe8bb;
				--el-color-primary-light-8: #ffefd1;
				--el-color-primary-light-9: #fff7e8;
				--el-color-primary-dark-2: #cc8e16;`
}

// 样式初始化
let initAppearance = () => {
	const color: string = appearance.color
	const primary_color: string = primary_colors[color]
	const global_en_font = appearance.global_en_font
	const global_cn_font = appearance.global_cn_font
	const code_font = appearance.code_font
	const trotting_horse = appearance.trotting_horse
	const font_size = appearance.font_size
	const line_height = appearance.line_height
	const paragraph_space = appearance.paragraph_space
	const line_width = appearance.line_width
	// const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

	if (trotting_horse)
		document.getElementById("app")!.className += 'trotting_horse';

	let globalStyle = document.createElement('style');
	globalStyle.innerText = `
		html.${appearance.theme ? "light" : "dark"} {
			// --el-color-primary: ${color};
			--chronicle-global-en-font: ${global_en_font};
			--chronicle-global-cn-font: ${global_cn_font};
			--el-font-family: ${global_en_font}, ${global_cn_font};
			--chronicle-code-font: ${code_font};
			--brand-height: 40px;
			${primary_color}
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
		background: var(--el-bg-color-overlay);\
		z-index: 9999;\
	  }\
	  \
	  .el-popper.is-customized .el-popper__arrow::before {\
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