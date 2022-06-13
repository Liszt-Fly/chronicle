// 项目默认地址
import path from 'path'

export let chronicleUserPath = path.resolve(process.cwd(), "packages", "render", "src", "user")

export let configFile = path.resolve(chronicleUserPath, "config", "chronicle.config.json")
export let defaultConfigFile = path.resolve(chronicleUserPath, "config", "chronicle.config.default.json")
import fs from "fs"
import { ref, Ref } from 'vue'
const configFileData = fs.readFileSync(configFile) as unknown as string
let config = JSON.parse(configFileData)
export let theme = config.theme
export let vditorTheme: any = ref("classic")
// 样式初始化
let initTheme = () => {
	const head = document.head || document.getElementsByTagName('head')[0];

	let color = config.color
	let global_en_font = config.global_en_font
	let global_cn_font = config.global_cn_font
	let code_font = config.code_font

	let globalStyle = document.createElement('style');
	globalStyle.innerText = `html.${config.theme ? "light" : "dark"} {
		--el-color-primary:${color};
		--chronicle-global-en-font: ${global_en_font};
		--chronicle-global-cn-font: ${global_cn_font};
		--chronicle-code-font: ${code_font};
	}`
	head.appendChild(globalStyle);

	document.getElementsByTagName("html")[0].className = config.theme ? "light" : "dark"
}

export const locale = config.locale

// 初始化设置
export let initSetting = () => {
	initTheme()
}