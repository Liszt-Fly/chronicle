// 项目默认地址
export let chroniclePath = process.cwd() + "/example"
export let configFile = chroniclePath + "/chronicle.config.json"
export let defaultConfigFile = chroniclePath + "/chronicle.config.default.json"

const fs = window.require('fs');

const configFileData = fs.readFileSync(configFile)
let config = JSON.parse(configFileData)

// 样式初始化
export let addStyle = () => {
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