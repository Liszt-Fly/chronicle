// 项目默认地址
import path from 'path'
import fs from "fs"
import { ref } from 'vue'

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
export let vditorTheme: any = ref("classic")

// 样式初始化
let initAppearance = () => {
	const head = document.head || document.getElementsByTagName('head')[0];

	let color = appearance.color
	let global_en_font = appearance.global_en_font
	let global_cn_font = appearance.global_cn_font
	let code_font = appearance.code_font
	let tooltips = appearance.tooltips

	let globalStyle = document.createElement('style');
	globalStyle.innerText = `html.${appearance.theme ? "light" : "dark"} {
		--el-color-primary:${color};
		--chronicle-global-en-font: ${global_en_font};
		--chronicle-global-cn-font: ${global_cn_font};
		--chronicle-code-font: ${code_font};
	}
	${tooltips ? '' : '.el-popper:not(.el-select__popper) { display: none  !important;}'}
	`
	head.appendChild(globalStyle);

	document.getElementsByTagName("html")[0].className = appearance.theme ? "light" : "dark"
}

// 通用初始化
let initGeneral = () => {
	const head = document.head || document.getElementsByTagName('head')[0];

	let devTools = general.devTools

	let generalStyle = document.createElement('style');
	generalStyle.innerText = `
	.devTools{
		display: ${devTools ? 'inline-flex' : 'none'}
	`
	head.appendChild(generalStyle);
}

// 快捷键初始化
let initShortcut = () => {

}

export const locale = appearance.locale

// 初始化设置
export let initSetting = () => {
	initAppearance()
	initGeneral()
	initShortcut()
}