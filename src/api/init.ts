// 项目默认地址
import path from 'path'
export let chroniclePath = process.cwd() + "/example"
export let chronicleArticlePath = path.resolve(chroniclePath, "assets")
export let configFile = chroniclePath + "/chronicle.config.json"
export let defaultConfigFile = chroniclePath + "/chronicle.config.default.json"
const fs = window.require('fs');

const configFileData = fs.readFileSync(configFile)
let config = JSON.parse(configFileData)

// 样式初始化
let initTheme = () => {
	let global_theme = config.global_theme
	let editor_theme = config.editor_theme
	let code_theme = config.code_theme

	const global_theme_path = `${chroniclePath}/themes/Global/${global_theme}.css`
	const editor_theme_path = `${chroniclePath}/themes/Editor/${editor_theme}.css`
	const code_theme_path = `${chroniclePath}/themes/Editor/Code/${code_theme}.css`

	const head = document.head || document.getElementsByTagName('head')[0];

	let globalStyle = document.createElement('style');
	globalStyle.innerText = fs.readFileSync(global_theme_path)
	head.appendChild(globalStyle);

	let editorStyle = document.createElement('style');
	editorStyle.innerText = fs.readFileSync(editor_theme_path)
	head.appendChild(editorStyle);

	let codeStyle = document.createElement('style');
	codeStyle.innerText = fs.readFileSync(code_theme_path)
	head.appendChild(codeStyle);
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