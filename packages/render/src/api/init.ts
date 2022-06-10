// 项目默认地址
import path from 'path'
//* development mode
export let chronicleUserPath = path.resolve(process.cwd(), "packages", "render", "src", "user")
//* development mode 
export let configFile = path.resolve(chronicleUserPath, "config", "chronicle.config.json")
export let defaultConfigFile = path.resolve(chronicleUserPath, "config", "chronicle.config.default.json")
import fs from "fs"
const configFileData = fs.readFileSync(configFile) as unknown as string
let config = JSON.parse(configFileData)
export let theme = config.theme ? ("light" + ".scss") : ("dark" + ".scss")

// 样式初始化
let initTheme = () => {
	const theme_path = path.resolve(chronicleUserPath, "themes", theme)

	const head = document.head || document.getElementsByTagName('head')[0];

	let globalStyle = document.createElement('style');
	globalStyle.innerText = fs.readFileSync(theme_path) as unknown as string
	head.appendChild(globalStyle);

	document.getElementsByTagName("html")[0].className = config.theme ? "light" : "dark"
}

// 字体初始化
let initFont = () => {
	let global_font = config.global_font
	let code_font = config.code_font

	const head = document.head || document.getElementsByTagName('head')[0];

	let fontStyle = document.createElement('style');
	fontStyle.innerText = `
	body {
		font-family: ${global_font};
	}
	.cm-editor .cm-content {
		font-family: ${code_font};
	}`
	head.appendChild(fontStyle);
}

export const locale = config.locale

// 初始化设置
export let initSetting = () => {
	initTheme()
	initFont()
}